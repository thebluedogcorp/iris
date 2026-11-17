/**
 * Iris pointer/keyboard interaction layer — a state machine driving
 * marquee / move / resize / rotate / draw / pan / pen / path-edit / text /
 * ruler-guides / eyedropper / pinch-zoom.
 */

import { ID, IrisDoc, IrisNode, NodeType, PathPoint, rootAncestorOf } from './model';
import {
  HandleKind,
  Mat,
  Rect,
  RULER,
  Vec,
  Viewport,
  boundsOfNodes,
  computeSnap,
  frameAtPoint,
  frameBodyAtPoint,
  frameLabelAtPoint,
  hitTestDeep,
  mApply,
  mApplyVec,
  mInvert,
  mMul,
  mRotate,
  mTranslate,
  marqueeCandidates,
  nodeLocalMatrix,
  nodeWorldAABB,
  nodeWorldMatrix,
  normalizeAngle,
  parentWorldMatrix,
  resolveClick,
  screenToWorld,
  selectionHandleGeometry,
  transformRect,
} from './geometry';
import { overlay } from './overlay';
import { useIris, HandleId, type Tool } from './store';
import { requestDraw, samplePixel, connectorAnchorWorld } from './renderer';
import { importImageFiles, openIrisBlob, openIrisFile, pickImageFiles, saveIrisFile } from './files';
import { pushRecentColor } from './colors';

type Interaction =
  | { kind: 'none' }
  | { kind: 'pan'; startScreen: Vec; startVp: Viewport }
  | { kind: 'marquee'; startWorld: Vec; additive: boolean }
  | {
      kind: 'move';
      startWorld: Vec;
      moved: boolean;
      ownsHistory: boolean;
      startNodes: { id: ID; x: number; y: number; parentId: ID | null }[];
      /** auto-layout reorder drag (children of one layout frame) */
      layoutDrag?: { frameId: ID; ids: ID[]; index: number; left: boolean };
    }
  | {
      kind: 'resize';
      handle: HandleKind;
      startWorld: Vec;
      startNodes: IrisNode[];
      startBox: Rect;
      worldInvs: Map<ID, Mat>;
      parentInvs: Map<ID, Mat>;
      startAABBs: Map<ID, Rect>;
      singleId: ID | null;
      singleWorldInv: Mat;
      moved: boolean;
    }
  | { kind: 'rotate'; center: Vec; startAngle: number; startNodes: IrisNode[]; worldMats: Map<ID, Mat>; parentInvs: Map<ID, Mat>; moved: boolean }
  | {
      kind: 'scale';
      anchor: Vec;
      startDist: number;
      startNodes: IrisNode[];
      startBox: Rect;
      startCenters: Map<ID, Vec>;
      parentInvs: Map<ID, Mat>;
      moved: boolean;
    }
  | { kind: 'pencil'; points: Vec[]; parentId: ID | null }
  | { kind: 'draw'; type: NodeType; startWorld: Vec; parentId: ID | null }
  | { kind: 'penHandle' }
  | { kind: 'pathPoint'; index: number; ptsWorld: (PathPoint & { wx: number; wy: number })[]; moved: boolean }
  | { kind: 'pathHandle'; index: number; which: 'in' | 'out'; moved: boolean }
  | { kind: 'guideDrag'; axis: 'x' | 'y'; index: number; entered: boolean }
  | { kind: 'eyedrop' }
  | { kind: 'connect'; hotspotId: ID; fromW: Vec };

let canvas: HTMLCanvasElement | null = null;
let interaction: Interaction = { kind: 'none' };
let hoverHandle: HandleId | null = null;

/* two-pointer pinch state */
const activePointers = new Map<number, { x: number; y: number }>();
let pinch: { startDist: number; startMid: Vec; startVp: Viewport } | null = null;

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function S() {
  return useIris.getState();
}

function contentOrigin(): number {
  return S().viewFlags.rulers ? RULER : 0;
}

function canvasRect(): DOMRect {
  return canvas ? canvas.getBoundingClientRect() : new DOMRect(0, 0, 0, 0);
}

/** Pointer coords are client-based (window listeners keep working during
 *  drags outside the canvas and for synthetic/automated events). */
function eventWorld(e: { clientX: number; clientY: number }): Vec {
  const s = S();
  const o = contentOrigin();
  const r = canvasRect();
  return screenToWorld(s.viewport, e.clientX - r.left - o, e.clientY - r.top - o);
}

function eventContent(e: { clientX: number; clientY: number }): Vec {
  const o = contentOrigin();
  const r = canvasRect();
  return { x: e.clientX - r.left - o, y: e.clientY - r.top - o };
}

/** Raw coords relative to the canvas (ruler area included). */
function eventCanvas(e: { clientX: number; clientY: number }): Vec {
  const r = canvasRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

function pointerInCanvas(e: { clientX: number; clientY: number }): boolean {
  const r = canvasRect();
  return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
}

function setCursor(css: string): void {
  if (canvas) canvas.style.cursor = css;
}

function toolCursor(): string {
  const t = S().tool;
  if (overlay.spaceDown || t === 'hand') return 'grab';
  if (t === 'move' || t === 'scale') return 'default';
  if (t === 'text') return 'text';
  if (t === 'eyedropper') return 'crosshair';
  if (t === 'comment') return 'crosshair';
  return 'crosshair';
}

function switchTool(t: Tool): void {
  if (overlay.penDraft) finishPen(false);
  S().setTool(t);
  setCursor(toolCursor());
}

function handleCursor(h: HandleId): string {
  switch (h) {
    case 'nw':
    case 'se':
      return 'nwse-resize';
    case 'ne':
    case 'sw':
      return 'nesw-resize';
    case 'n':
    case 's':
      return 'ns-resize';
    case 'e':
    case 'w':
      return 'ew-resize';
    case 'rot':
      return 'grab';
  }
}

function hitHandle(content: Vec): HandleId | null {
  const s = S();
  if (s.tool !== 'move' || s.selection.length === 0 || s.editingTextId || s.editingPathId) return null;
  const geo = selectionHandleGeometry(s.doc, s.selection, s.viewport);
  if (!geo) return null;
  if (Math.hypot(content.x - geo.rot.x, content.y - geo.rot.y) <= 8) return 'rot';
  for (const p of geo.pts) {
    if (Math.hypot(content.x - p.x, content.y - p.y) <= 7) return p.kind;
  }
  return null;
}

/** Prototype connector node under the pointer? Returns the hotspot node id. */
function connectorHotAt(content: Vec): ID | null {
  const s = S();
  if (!s.viewFlags.connections || s.presenting) return null;
  if (s.selection.length !== 1) return null;
  if (s.tool !== 'move' && s.rightTab !== 'prototype') return null;
  if (s.editingTextId || s.editingPathId) return null;
  const n = s.doc.nodesById[s.selection[0]];
  if (!n || !n.visible) return null;
  const a = connectorAnchorWorld(s.doc, n);
  const sx = a.x * s.viewport.zoom + s.viewport.x;
  const sy = a.y * s.viewport.zoom + s.viewport.y;
  return Math.hypot(content.x - sx, content.y - sy) <= 10 ? n.id : null;
}

/** Resolve a valid destination frame under a world point during a connect drag. */
function connectorDropTarget(doc: IrisDoc, pageId: ID, world: Vec, hotspotId: ID): ID | null {
  /* frame BODIES count here (unlike selection, empty interiors are valid
   * drop targets — Figma highlights the destination screen) */
  const frame = frameBodyAtPoint(doc, pageId, world);
  if (!frame) return null;
  const hotRoot = rootAncestorOf(doc, hotspotId);
  if (frame.id === hotRoot.id) return null; // can't connect a layer to its own screen
  return frame.id;
}

/** Nodes whose ancestor is also in the list are removed (for resize). */
function topOnly(ids: ID[]): ID[] {
  const s = S();
  return ids.filter((id) => {
    let p = s.doc.nodesById[id]?.parentId;
    while (p) {
      if (ids.includes(p)) return false;
      p = s.doc.nodesById[p]?.parentId;
    }
    return true;
  });
}

const DRAW_TOOLS: NodeType[] = ['frame', 'rect', 'ellipse', 'line', 'polygon', 'star', 'arrow', 'section', 'slice'];

/** Constrain a draw drag with Shift: squares for boxes, 45° for lines. */
function constrainDraw(a: Vec, b: Vec, type: NodeType, shift: boolean): Vec {
  if (!shift) return b;
  if (type === 'line' || type === 'arrow') {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const ang = Math.atan2(dy, dx);
    const len = Math.hypot(dx, dy);
    const snap = Math.round(ang / (Math.PI / 4)) * (Math.PI / 4);
    return { x: a.x + Math.cos(snap) * len, y: a.y + Math.sin(snap) * len };
  }
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const size = Math.max(Math.abs(dx), Math.abs(dy));
  return { x: a.x + Math.sign(dx || 1) * size, y: a.y + Math.sign(dy || 1) * size };
}

/** Snap a value to the layout grid when enabled. */
function snapGridValue(v: number): number {
  const s = S();
  const size = s.doc.settings?.grid;
  if (!size?.snap || size.size < 1) return v;
  return Math.round(v / size.size) * size.size;
}

/** Snap a rect's origin/size to the grid when enabled. */
function snapGridRect(r: Rect): Rect {
  const s = S();
  const grid = s.doc.settings?.grid;
  if (!grid?.snap || grid.size < 1) return r;
  const x = Math.round(r.x / grid.size) * grid.size;
  const y = Math.round(r.y / grid.size) * grid.size;
  const w = Math.max(0, Math.round(r.w / grid.size) * grid.size);
  const h = Math.max(0, Math.round(r.h / grid.size) * grid.size);
  return { x, y, w, h };
}

/** Distance from pointer to an existing guide line (screen px), or null. */
function guideUnderPointer(world: Vec): { axis: 'x' | 'y'; index: number; at: number } | null {
  const s = S();
  const zoom = s.viewport.zoom;
  const settings = s.doc.settings;
  for (let i = 0; i < (settings.guidesX?.length ?? 0); i++) {
    const at = settings.guidesX[i];
    if (Math.abs(world.x - at) * zoom <= 4) return { axis: 'x', index: i, at };
  }
  for (let i = 0; i < (settings.guidesY?.length ?? 0); i++) {
    const at = settings.guidesY[i];
    if (Math.abs(world.y - at) * zoom <= 4) return { axis: 'y', index: i, at };
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* pen                                                                 */
/* ------------------------------------------------------------------ */

function finishPen(closed: boolean): void {
  const draft = overlay.penDraft;
  overlay.penDraft = null;
  if (!draft || draft.points.length < 2) {
    requestDraw();
    return;
  }
  const pts = draft.points;
  const minX = Math.min(...pts.map((p) => p.x));
  const minY = Math.min(...pts.map((p) => p.y));
  const maxX = Math.max(...pts.map((p) => p.x));
  const maxY = Math.max(...pts.map((p) => p.y));
  const points: PathPoint[] = pts.map((p) => ({ x: p.x - minX, y: p.y - minY, hx: p.hx, hy: p.hy }));
  const s = S();
  const canClose = closed && points.length >= 3;
  const frame = frameAtPoint(s.doc, s.currentPageId, { x: minX, y: minY });
  let x = minX;
  let y = minY;
  let parentId: ID | null = frame?.id ?? null;
  if (parentId) {
    const parent = s.doc.nodesById[parentId];
    if (parent) {
      const inv = mInvert(nodeWorldMatrix(s.doc, parent));
      const local = mApply(inv, minX, minY);
      x = local.x;
      y = local.y;
    }
  }
  s.addNode(
    'path',
    {
      x,
      y,
      w: Math.max(maxX - minX, 1),
      h: Math.max(maxY - minY, 1),
      points,
      closed: canClose,
      fill: canClose ? '#D9D9D9' : null,
      stroke: canClose ? null : '#B3B3B3',
      strokeWidth: 1,
    },
    parentId,
  );
  s.setTool('move');
  requestDraw();
}

/* ------------------------------------------------------------------ */
/* pencil (freehand)                                                   */
/* ------------------------------------------------------------------ */

function finishPencil(): void {
  const ia = interaction as Extract<Interaction, { kind: 'pencil' }>;
  const pts = ia.points;
  overlay.pencilDraft = null;
  interaction = { kind: 'none' };
  if (pts.length < 2) {
    requestDraw();
    return;
  }
  // simplify: drop near-duplicate points (screen-space ~2px)
  const zoom = S().viewport.zoom;
  const simp: Vec[] = [pts[0]];
  for (const p of pts.slice(1)) {
    const last = simp[simp.length - 1];
    if (Math.hypot(p.x - last.x, p.y - last.y) * zoom > 2) simp.push(p);
  }
  if (simp.length < 2) {
    requestDraw();
    return;
  }
  const minX = Math.min(...simp.map((p) => p.x));
  const minY = Math.min(...simp.map((p) => p.y));
  const maxX = Math.max(...simp.map((p) => p.x));
  const maxY = Math.max(...simp.map((p) => p.y));
  const s = S();
  const parentId = ia.parentId;
  let x = minX;
  let y = minY;
  if (parentId) {
    const parent = s.doc.nodesById[parentId];
    if (parent) {
      const inv = mInvert(nodeWorldMatrix(s.doc, parent));
      const local = mApply(inv, minX, minY);
      x = local.x;
      y = local.y;
    }
  }
  const last = simp[simp.length - 1];
  const first = simp[0];
  const closed = Math.hypot(last.x - first.x, last.y - first.y) * zoom < 8;
  s.addNode(
    'path',
    {
      x,
      y,
      w: Math.max(maxX - minX, 1),
      h: Math.max(maxY - minY, 1),
      points: simp.map((p) => ({ x: p.x - minX, y: p.y - minY, hx: 0, hy: 0 })),
      closed,
      fill: closed ? '#D9D9D9' : null,
      stroke: closed ? null : '#B3B3B3',
      strokeWidth: 1,
    },
    parentId,
  );
  s.setTool('move');
  requestDraw();
}

/* ------------------------------------------------------------------ */
/* scale tool                                                          */
/* ------------------------------------------------------------------ */

function applyScale(ia: Extract<Interaction, { kind: 'scale' }>, k: number): void {
  const s = S();
  const updates: { id: ID; patch: Partial<IrisNode> }[] = [];
  const rectUpdates: { id: ID; rect: { x: number; y: number; w: number; h: number } }[] = [];
  for (const n0 of ia.startNodes) {
    const c0 = ia.startCenters.get(n0.id)!;
    const cx = ia.anchor.x + (c0.x - ia.anchor.x) * k;
    const cy = ia.anchor.y + (c0.y - ia.anchor.y) * k;
    const w = Math.max(0.5, n0.w * k);
    const h = Math.max(0.5, n0.h * k);
    // world position of the (rotated) local origin
    const theta = (n0.rotation * Math.PI) / 180;
    const ox = -w / 2;
    const oy = -h / 2;
    const originWorld = {
      x: cx + Math.cos(theta) * ox - Math.sin(theta) * oy,
      y: cy + Math.sin(theta) * ox + Math.cos(theta) * oy,
    };
    const Pinv = ia.parentInvs.get(n0.id)!;
    const local = mApply(Pinv, originWorld.x, originWorld.y);
    if (n0.type === 'frame' || n0.type === 'group' || n0.type === 'section') {
      rectUpdates.push({ id: n0.id, rect: { x: local.x, y: local.y, w, h } });
      continue;
    }
    const patch: Partial<IrisNode> = { x: local.x, y: local.y, w, h };
    if (n0.type === 'text') patch.fontSize = Math.max(1, n0.fontSize * k);
    if (n0.cornerRadius) patch.cornerRadius = Math.max(0, n0.cornerRadius * k);
    if (n0.type === 'path' && n0.points.length) {
      patch.points = n0.points.map((p) => ({ x: p.x * k, y: p.y * k, hx: p.hx * k, hy: p.hy * k }));
    }
    if (n0.type === 'line' || n0.type === 'arrow') patch.strokeWidth = Math.max(0.5, n0.strokeWidth * k);
    updates.push({ id: n0.id, patch });
  }
  if (updates.length) {
    s.updateNodes(
      updates.map((u) => u.id),
      (node) => {
        const u = updates.find((x) => x.id === node.id)!;
        return u.patch;
      },
      { history: false },
    );
  }
  for (const r of rectUpdates) {
    s.setNodeRect(r.id, r.rect, { history: false });
  }
  overlay.dragBadge = {
    x: ia.anchor.x + (ia.startBox.x - ia.anchor.x) * k,
    y: ia.anchor.y + (ia.startBox.y - ia.anchor.y) * k,
    w: ia.startBox.w * k,
    h: ia.startBox.h * k,
  };
}

/* ------------------------------------------------------------------ */
/* re-parenting on drop (Figma-style)                                  */
/* ------------------------------------------------------------------ */

/** After a move drag ends: re-parent roots whose bbox center is over a
 *  different frame (or back to the page when outside every frame). */
function reparentOnDrop(startNodes: { id: ID; parentId: ID | null }[]): void {
  const s = S();
  const roots = topOnly(startNodes.map((n) => n.id));
  if (roots.length === 0) return;
  const box = boundsOfNodes(s.doc, roots);
  if (!box) return;
  const center = { x: box.x + box.w / 2, y: box.y + box.h / 2 };
  // exclude dragged subtrees so a dragged frame cannot capture itself
  const target = frameAtPoint(s.doc, s.currentPageId, center, roots);
  const targetId = target?.id ?? null;
  const moving = roots.filter((id) => {
    const n = s.doc.nodesById[id];
    return !!n && n.parentId !== targetId;
  });
  if (moving.length === 0) return;
  s.reorderNodes(moving, targetId, -1);
}

/* ------------------------------------------------------------------ */
/* auto-layout reorder drag                                            */
/* ------------------------------------------------------------------ */

type LayoutDragState = { frameId: ID; ids: ID[]; index: number; left: boolean };

/** Live-update an auto-layout reorder drag: ghost follows the pointer,
 *  insertion index is recomputed and the children order updated so siblings
 *  re-flow around the target slot (Figma behavior). */
function updateLayoutDrag(ld: LayoutDragState, world: Vec): void {
  const s = S();
  const frame = s.doc.nodesById[ld.frameId];
  if (!frame || !frame.layout) return;
  const horiz = frame.layout.mode === 'horizontal';

  // 1. ghost: dragged nodes follow the pointer in frame-local space
  const inv = mInvert(nodeWorldMatrix(s.doc, frame));
  const local = mApplyVec(inv, world.x - (interaction as Extract<Interaction, { kind: 'move' }>).startWorld.x, world.y - (interaction as Extract<Interaction, { kind: 'move' }>).startWorld.y);
  const updates: { id: ID; x: number; y: number }[] = [];
  for (const start of (interaction as Extract<Interaction, { kind: 'move' }>).startNodes) {
    updates.push({ id: start.id, x: start.x + local.x, y: start.y + local.y });
  }
  if (updates.length) {
    s.updateNodes(
      updates.map((u) => u.id),
      (node) => {
        const u = updates.find((x) => x.id === node.id)!;
        return { x: u.x, y: u.y };
      },
      { history: false },
    );
  }

  // 2. insertion index among the *other* children (main-axis midpoint rule)
  const p = mApply(mInvert(nodeWorldMatrix(s.doc, frame)), world.x, world.y);
  const others = frame.children.filter((c) => !ld.ids.includes(c));
  let index = 0;
  for (const cid of others) {
    const c = s.doc.nodesById[cid];
    if (!c) continue;
    const center = horiz ? c.x + c.w / 2 : c.y + c.h / 2;
    const pointer = horiz ? p.x : p.y;
    if (center < pointer) index += 1;
  }
  if (index === ld.index) return; // nothing to do
  ld.index = index;

  // 3. reorder the children array and let the solver re-flow
  const next = [...others.slice(0, index), ...ld.ids, ...others.slice(index)];
  s.updateNodes([frame.id], { children: next }, { history: false });
  overlay.layoutDrag = { frameId: frame.id, ids: ld.ids, index, left: false };
}

/** Arrow keys inside an auto-layout frame move the selection one slot.
 *  Returns true when the selection was a contiguous block that got reordered. */
function arrowReorderInLayout(dir: -1 | 1): boolean {
  const s = S();
  const sel = s.selection.map((id) => s.doc.nodesById[id]).filter(Boolean) as IrisNode[];
  if (sel.length === 0) return false;
  const parentId = sel[0].parentId;
  if (!parentId || sel.some((n) => n.parentId !== parentId)) return false;
  const frame = s.doc.nodesById[parentId];
  if (!frame?.layout) return false;
  const idxs = sel.map((n) => frame.children.indexOf(n.id)).sort((a, b) => a - b);
  if (idxs.some((i) => i < 0)) return false;
  for (let i = 1; i < idxs.length; i++) {
    if (idxs[i] !== idxs[i - 1] + 1) return false; // not a contiguous block
  }
  const first = idxs[0];
  const last = idxs[idxs.length - 1];
  if (dir < 0 && first === 0) return true; // already at the start
  if (dir > 0 && last === frame.children.length - 1) return true; // at the end
  const children = [...frame.children];
  const block = children.splice(first, sel.length);
  const at = dir < 0 ? first - 1 : first + 1;
  children.splice(at, 0, ...block);
  s.updateNodes([frame.id], { children }, { history: 'auto-layout' });
  return true;
}

/* ------------------------------------------------------------------ */
/* eyedropper                                                          */
/* ------------------------------------------------------------------ */

function applyPickedColor(hex: string): void {
  const s = S();
  pushRecentColor(hex);
  overlay.pickedColor = hex;
  const sel = s.doc.nodesById[s.selection[0] ?? ''];
  if (sel && ['rect', 'ellipse', 'frame', 'path', 'text', 'polygon', 'star'].includes(sel.type)) {
    s.updateNodes([sel.id], { fill: hex }, { history: 'fill' });
    s.toast(`Picked ${hex} — applied to fill`);
  } else {
    s.toast(`Picked ${hex} — select a shape to apply it`);
  }
}

/* ------------------------------------------------------------------ */
/* pointer handlers                                                    */
/* ------------------------------------------------------------------ */

function onPointerDown(e: PointerEvent): void {
  if (!canvas) return;
  try {
    canvas.setPointerCapture(e.pointerId);
  } catch {
    /* synthetic pointer (test automation) — events are followed on window */
  }
  const s = S();
  const world = eventWorld(e);
  const content = eventContent(e);
  const raw = eventCanvas(e);

  // touch bookkeeping for pinch
  if (e.pointerType === 'touch') {
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointers.size === 2) {
      // begin pinch: cancel whatever interaction was running
      cancelInteraction();
      const pts = [...activePointers.values()];
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      pinch = { startDist: Math.max(1, d), startMid: mid, startVp: { ...s.viewport } };
      return;
    }
  }

  // finish text editing if active
  if (s.editingTextId) s.setEditingText(null);

  // middle button or space => pan
  if (e.button === 1 || overlay.spaceDown) {
    interaction = { kind: 'pan', startScreen: { x: e.clientX, y: e.clientY }, startVp: { ...s.viewport } };
    setCursor('grabbing');
    return;
  }
  if (e.button === 2) return; // context menu handles right click

  // ruler guide pulls (only near the ruler strips themselves)
  if (s.viewFlags.rulers && (raw.x < RULER || raw.y < RULER)) {
    const inLeftRuler = raw.x < RULER;
    const inTopRuler = raw.y < RULER;
    if (inLeftRuler && !inTopRuler) {
      interaction = { kind: 'guideDrag', axis: 'x', index: -1, entered: false };
      overlay.guideDrag = { axis: 'x', at: world.x, index: -1, entered: false };
      return;
    }
    if (inTopRuler && !inLeftRuler) {
      interaction = { kind: 'guideDrag', axis: 'y', index: -1, entered: false };
      overlay.guideDrag = { axis: 'y', at: world.y, index: -1, entered: false };
      return;
    }
    // corner: fall through
  }

  // dragging an existing guide line on the canvas (move tool only)
  if (s.tool === 'move' && !s.editingTextId && !s.editingPathId) {
    const hit = guideUnderPointer(world);
    if (hit) {
      interaction = { kind: 'guideDrag', axis: hit.axis, index: hit.index, entered: true };
      overlay.guideDrag = { axis: hit.axis, at: hit.at, index: hit.index, entered: true };
      S().historyBegin();
      return;
    }
  }

  // path edit mode
  if (s.editingPathId) {
    const n = s.doc.nodesById[s.editingPathId];
    if (n && n.type === 'path') {
      const W = nodeWorldMatrix(s.doc, n);
      const vp = s.viewport;
      const ptScreen = (p: Vec) => ({ x: p.x * vp.zoom + vp.x, y: p.y * vp.zoom + vp.y });
      const activeIdx = overlay.pathEdit?.activePoint ?? null;
      // handle hit for the active point
      if (activeIdx !== null && n.points[activeIdx]) {
        const p = n.points[activeIdx];
        if (p.hx !== 0 || p.hy !== 0) {
          const anchor = mApply(W, p.x, p.y);
          const out = mApply(W, p.x + p.hx, p.y + p.hy);
          const inn = mApply(W, p.x - p.hx, p.y - p.hy);
          const aS = ptScreen(anchor);
          const oS = ptScreen(out);
          const iS = ptScreen(inn);
          if (Math.hypot(content.x - oS.x, content.y - oS.y) <= 7) {
            interaction = { kind: 'pathHandle', index: activeIdx, which: 'out', moved: false };
            s.historyBegin();
            return;
          }
          if (Math.hypot(content.x - iS.x, content.y - iS.y) <= 7) {
            interaction = { kind: 'pathHandle', index: activeIdx, which: 'in', moved: false };
            s.historyBegin();
            return;
          }
        }
      }
      // point hit
      for (let i = 0; i < n.points.length; i++) {
        const p = n.points[i];
        const sp = ptScreen(mApply(W, p.x, p.y));
        if (Math.hypot(content.x - sp.x, content.y - sp.y) <= 7) {
          overlay.pathEdit = { activePoint: i, dragKind: 'point', hoverPoint: i };
          const ptsWorld = n.points.map((pt) => {
            const w = mApply(W, pt.x, pt.y);
            return { ...pt, wx: w.x, wy: w.y };
          });
          interaction = { kind: 'pathPoint', index: i, ptsWorld, moved: false };
          s.historyBegin();
          requestDraw();
          return;
        }
      }
      // click empty: exit path edit, fall through to normal handling
      s.setEditingPath(null);
      overlay.pathEdit = null;
      requestDraw();
    }
  }

  const tool = s.tool;

  if (tool === 'hand') {
    interaction = { kind: 'pan', startScreen: { x: e.clientX, y: e.clientY }, startVp: { ...s.viewport } };
    setCursor('grabbing');
    return;
  }

  if (tool === 'eyedropper') {
    interaction = { kind: 'eyedrop' };
    const hex = samplePixel(e.clientX, e.clientY);
    if (hex) applyPickedColor(hex);
    else s.toast('Nothing to sample there');
    requestDraw();
    return;
  }

  if (tool === 'image') {
    pickImageFiles(world);
    return;
  }

  if (tool === 'comment') {
    // clicking adds a comment pin; the CommentLayer UI opens the editor
    const id = s.addComment(world.x, world.y, '');
    s.setActiveComment(id);
    requestDraw();
    return;
  }

  if (tool === 'pencil') {
    const frame = frameAtPoint(s.doc, s.currentPageId, world);
    interaction = { kind: 'pencil', points: [world], parentId: frame?.id ?? null };
    overlay.pencilDraft = [world];
    requestDraw();
    return;
  }

  if (tool === 'pen') {
    if (!overlay.penDraft) overlay.penDraft = { points: [], cursor: world, dragging: false };
    const draft = overlay.penDraft;
    // click near first point => close
    if (draft.points.length >= 3) {
      const first = draft.points[0];
      if (Math.hypot(world.x - first.x, world.y - first.y) * s.viewport.zoom < 10) {
        finishPen(true);
        return;
      }
    }
    draft.points.push({ x: world.x, y: world.y, hx: 0, hy: 0 });
    draft.dragging = true;
    interaction = { kind: 'penHandle' };
    requestDraw();
    return;
  }

  if (tool === 'text') {
    // clicking existing text edits it
    const hit = hitTestDeep(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
    if (hit && hit.type === 'text') {
      s.setEditingText(hit.id);
      interaction = { kind: 'none' };
      return;
    }
    const frame = frameAtPoint(s.doc, s.currentPageId, world);
    interaction = { kind: 'draw', type: 'text', startWorld: world, parentId: frame?.id ?? null };
    return;
  }

  if ((DRAW_TOOLS as string[]).includes(tool)) {
    // sections + slices always live at the page level (Figma behavior)
    const frame = tool === 'section' || tool === 'slice' ? null : frameAtPoint(s.doc, s.currentPageId, world);
    interaction = {
      kind: 'draw',
      type: tool as NodeType,
      startWorld: world,
      parentId: frame?.id ?? null,
    };
    requestDraw();
    return;
  }

  // scale tool -------------------------------------------------------
  if (tool === 'scale') {
    const hh = hitHandle(content);
    const ids = topOnly(s.selection);
    if (
      hh &&
      (hh === 'nw' || hh === 'ne' || hh === 'sw' || hh === 'se') &&
      ids.length > 0
    ) {
      const nodes = ids.map((id) => s.doc.nodesById[id]).filter(Boolean) as IrisNode[];
      const startBox = boundsOfNodes(s.doc, ids);
      if (nodes.length && startBox) {
        const anchor = {
          x: hh.includes('w') ? startBox.x + startBox.w : startBox.x,
          y: hh.includes('n') ? startBox.y + startBox.h : startBox.y,
        };
        const startCenters = new Map<ID, Vec>();
        const parentInvs = new Map<ID, Mat>();
        for (const n of nodes) {
          const box = nodeWorldAABB(s.doc, n);
          startCenters.set(n.id, { x: box.x + box.w / 2, y: box.y + box.h / 2 });
          parentInvs.set(n.id, mInvert(parentWorldMatrix(s.doc, n)));
        }
        s.historyBegin();
        interaction = {
          kind: 'scale',
          anchor,
          startDist: Math.max(1, Math.hypot(world.x - anchor.x, world.y - anchor.y)),
          startNodes: nodes.map((n) => ({ ...n })),
          startBox,
          startCenters,
          parentInvs,
          moved: false,
        };
        return;
      }
    }
    // fall through: scale tool otherwise behaves like move (select + drag)
  }

  // move tool --------------------------------------------------------
  // prototype connector node hit? → start authoring a connection
  const connHit = connectorHotAt(content);
  if (connHit) {
    const n = s.doc.nodesById[connHit];
    if (n) {
      const fromW = connectorAnchorWorld(s.doc, n);
      interaction = { kind: 'connect', hotspotId: connHit, fromW };
      overlay.connectDrag = { hotspotId: connHit, fromW, toW: world, overFrameId: null };
      setCursor('crosshair');
      requestDraw();
      return;
    }
  }
  // handle hit? (not for the scale tool — its handles are scale-only)
  const hh = s.tool === 'scale' ? null : hitHandle(content);
  if (hh) {
    const ids = topOnly(s.selection);
    const nodes = ids.map((id) => s.doc.nodesById[id]).filter(Boolean) as IrisNode[];
    if (nodes.length === 0) return;
    const startBox = boundsOfNodes(s.doc, ids)!;
    const worldInvs = new Map<ID, Mat>();
    const parentInvs = new Map<ID, Mat>();
    const startAABBs = new Map<ID, Rect>();
    for (const n of nodes) {
      worldInvs.set(n.id, mInvert(nodeWorldMatrix(s.doc, n)));
      parentInvs.set(n.id, mInvert(parentWorldMatrix(s.doc, n)));
      startAABBs.set(n.id, nodeWorldAABB(s.doc, n));
    }
    if (hh === 'rot') {
      const center = { x: startBox.x + startBox.w / 2, y: startBox.y + startBox.h / 2 };
      const worldMats = new Map<ID, Mat>();
      for (const n of nodes) worldMats.set(n.id, nodeWorldMatrix(s.doc, n));
      interaction = {
        kind: 'rotate',
        center,
        startAngle: Math.atan2(world.y - center.y, world.x - center.x),
        startNodes: nodes.map((n) => ({ ...n })),
        worldMats,
        parentInvs,
        moved: false,
      };
      s.historyBegin();
      return;
    }
    interaction = {
      kind: 'resize',
      handle: hh,
      startWorld: world,
      startNodes: nodes.map((n) => ({ ...n })),
      startBox,
      worldInvs,
      parentInvs,
      startAABBs,
      singleId: nodes.length === 1 ? nodes[0].id : null,
      singleWorldInv: worldInvs.get(nodes[0].id)!,
      moved: false,
    };
    s.historyBegin();
    return;
  }

  // object hit? frame name labels are dedicated selection targets and take
  // priority over everything below them (Figma behavior)
  const hit =
    frameLabelAtPoint(s.doc, s.currentPageId, content, s.viewport) ??
    hitTestDeep(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
  if (hit) {
    const deep = e.ctrlKey || e.metaKey;
    const resolved = resolveClick(s.doc, hit, deep);
    let dragIds: ID[];
    if (e.shiftKey) {
      if (s.selection.includes(resolved)) {
        dragIds = s.selection;
      } else {
        s.setSelection([...s.selection, resolved]);
        dragIds = [...s.selection, resolved];
      }
    } else if (s.selection.includes(resolved)) {
      dragIds = s.selection;
    } else {
      s.setSelection([resolved]);
      dragIds = [resolved];
    }
    // alt-drag duplicates
    if (e.altKey) {
      const newIds = S().duplicateSelection({ dx: 0, dy: 0 });
      dragIds = newIds.length ? newIds : dragIds;
      interaction = {
        kind: 'move',
        startWorld: world,
        moved: false,
        ownsHistory: false,
        startNodes: dragIds
          .map((id) => S().doc.nodesById[id])
          .filter(Boolean)
          .map((n) => ({ id: n.id, x: n.x, y: n.y, parentId: n.parentId })),
      };
      const altParent = interaction.startNodes[0]?.parentId ?? null;
      if (
        altParent &&
        interaction.startNodes.length > 0 &&
        interaction.startNodes.every((n) => n.parentId === altParent) &&
        S().doc.nodesById[altParent]?.layout
      ) {
        interaction.layoutDrag = {
          frameId: altParent,
          ids: interaction.startNodes.map((n) => n.id),
          index: -1,
          left: false,
        };
      }
      return;
    }
    s.historyBegin();
    interaction = {
      kind: 'move',
      startWorld: world,
      moved: false,
      ownsHistory: true,
      startNodes: dragIds
        .map((id) => s.doc.nodesById[id])
        .filter(Boolean)
        .map((n) => ({ id: n.id, x: n.x, y: n.y, parentId: n.parentId })),
    };
    // auto-layout reorder drag: all selected roots live in one layout frame
    const firstParentId = (interaction.startNodes[0]?.parentId ?? null) as ID | null;
    if (
      firstParentId &&
      interaction.startNodes.length > 0 &&
      interaction.startNodes.every((n) => n.parentId === firstParentId)
    ) {
      const pf = s.doc.nodesById[firstParentId];
      if (pf?.layout) {
        interaction.layoutDrag = {
          frameId: pf.id,
          ids: interaction.startNodes.map((n) => n.id),
          index: -1,
          left: false,
        };
      }
    }
    return;
  }

  // empty: marquee
  interaction = { kind: 'marquee', startWorld: world, additive: e.shiftKey };
  overlay.marquee = { x: world.x, y: world.y, w: 0, h: 0 };
  requestDraw();
}

/** Abort the running interaction gracefully (pinch takeover, etc.). */
function cancelInteraction(): void {
  const s = S();
  if (interaction.kind === 'move' || interaction.kind === 'resize' || interaction.kind === 'rotate' || interaction.kind === 'scale') {
    if ('ownsHistory' in interaction && interaction.ownsHistory) s.historyCancel();
    else if (interaction.kind === 'scale') s.historyCancel();
  }
  if (interaction.kind === 'pathPoint' || interaction.kind === 'pathHandle') s.historyCancel();
  interaction = { kind: 'none' };
  overlay.marquee = null;
  overlay.drawPreview = null;
  overlay.layoutDrag = null;
  overlay.dragBadge = null;
  overlay.guides = [];
  overlay.guideDrag = null;
  overlay.pencilDraft = null;
  overlay.connectDrag = null;
  overlay.connectorHot = false;
  requestDraw();
}

function onPointerMove(e: PointerEvent): void {
  const s = S();
  const world = eventWorld(e);
  const content = eventContent(e);
  const raw = eventCanvas(e);
  overlay.pointerWorld = world;

  // touch pointer tracking + pinch handling
  if (e.pointerType === 'touch' && activePointers.has(e.pointerId)) {
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && activePointers.size >= 2) {
      const pts = [...activePointers.values()];
      const p0 = pts[0];
      const p1 = pts[1];
      const d = Math.max(1, Math.hypot(p0.x - p1.x, p0.y - p1.y));
      const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      const zoom = Math.min(256, Math.max(0.02, (pinch.startVp.zoom * d) / pinch.startDist));
      const k = zoom / pinch.startVp.zoom;
      const o = contentOrigin();
      const r = canvasRect();
      const cx = mid.x - r.left - o;
      const cy = mid.y - r.top - o;
      const scx = pinch.startMid.x - r.left - o;
      const scy = pinch.startMid.y - r.top - o;
      s.setViewport({
        zoom,
        x: cx - (scx - pinch.startVp.x) * k,
        y: cy - (scy - pinch.startVp.y) * k,
      });
      return;
    }
  }

  if (interaction.kind === 'none') {
    if (!pointerInCanvas(e)) {
      if (s.hoverId) s.setHover(null);
      return;
    }
    // hover + cursor
    if (s.editingTextId) return;
    if (s.tool === 'eyedropper') {
      setCursor('crosshair');
      requestDraw();
      return;
    }
    if (s.tool === 'move' || s.tool === 'scale') {
      const conn = connectorHotAt(content);
      if (conn !== null) {
        if (!overlay.connectorHot) overlay.connectorHot = true;
        setCursor('pointer');
        if (s.hoverId) s.setHover(null);
        requestDraw();
        return;
      }
      if (overlay.connectorHot) {
        overlay.connectorHot = false;
        requestDraw();
      }
      let hh = hitHandle(content);
      if (s.tool === 'scale' && hh && !(hh === 'nw' || hh === 'ne' || hh === 'sw' || hh === 'se')) hh = null;
      if (hh !== hoverHandle) {
        hoverHandle = hh;
        setCursor(hh ? handleCursor(hh) : overlay.spaceDown ? 'grab' : 'default');
      }
      if (!hh) {
        const hit =
          frameLabelAtPoint(s.doc, s.currentPageId, content, s.viewport) ??
          hitTestDeep(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
        const id = hit?.id ?? null;
        if (id !== s.hoverId) s.setHover(id);
      } else if (s.hoverId) {
        s.setHover(null);
      }
    } else {
      if (s.hoverId) s.setHover(null);
      setCursor(toolCursor());
      if (s.tool === 'pen' && overlay.penDraft) {
        overlay.penDraft.cursor = world;
        requestDraw();
      }
    }
    requestDraw(); // ruler pointer marker
    return;
  }

  switch (interaction.kind) {
    case 'connect': {
      const cd = overlay.connectDrag;
      if (cd) {
        cd.toW = world;
        cd.overFrameId = connectorDropTarget(s.doc, s.currentPageId, world, interaction.hotspotId);
      }
      requestDraw();
      return;
    }
    case 'pan': {
      s.setViewport({
        ...interaction.startVp,
        x: interaction.startVp.x + (e.clientX - interaction.startScreen.x),
        y: interaction.startVp.y + (e.clientY - interaction.startScreen.y),
      });
      return;
    }
    case 'guideDrag': {
      const inCanvasArea = raw.x > RULER && raw.y > RULER;
      const at = interaction.axis === 'x' ? snapGridValue(world.x) : snapGridValue(world.y);
      interaction.entered = interaction.entered || inCanvasArea;
      overlay.guideDrag = { axis: interaction.axis, at, index: interaction.index, entered: interaction.entered };
      requestDraw();
      return;
    }
    case 'marquee': {
      const x = Math.min(interaction.startWorld.x, world.x);
      const y = Math.min(interaction.startWorld.y, world.y);
      overlay.marquee = {
        x,
        y,
        w: Math.abs(world.x - interaction.startWorld.x),
        h: Math.abs(world.y - interaction.startWorld.y),
      };
      requestDraw();
      return;
    }
    case 'move': {
      let dx = world.x - interaction.startWorld.x;
      let dy = world.y - interaction.startWorld.y;
      if (!interaction.moved) {
        if (Math.hypot(dx, dy) * s.viewport.zoom < 2.5) return;
        interaction.moved = true;
        if (interaction.layoutDrag && !interaction.layoutDrag.left) {
          overlay.layoutDrag = {
            frameId: interaction.layoutDrag.frameId,
            ids: interaction.layoutDrag.ids,
            index: interaction.layoutDrag.index,
            left: false,
          };
        }
      }
      // auto-layout reorder drag
      if (interaction.layoutDrag && !interaction.layoutDrag.left) {
        const frame = s.doc.nodesById[interaction.layoutDrag.frameId];
        if (!frame || !frame.layout) {
          interaction.layoutDrag = undefined;
        } else {
          const inv = mInvert(nodeWorldMatrix(s.doc, frame));
          const p = mApply(inv, world.x, world.y);
          const EDGE = 10;
          const inside = p.x >= -EDGE && p.y >= -EDGE && p.x <= frame.w + EDGE && p.y <= frame.h + EDGE;
          if (inside) {
            updateLayoutDrag(interaction.layoutDrag, world);
            requestDraw();
            return;
          }
          // left the frame: release to the page and continue as a free move
          interaction.layoutDrag.left = true;
          overlay.layoutDrag = null;
          s.reorderNodes(interaction.layoutDrag.ids, null, -1);
          interaction.startWorld = world;
          interaction.startNodes = interaction.startNodes
            .map((sn) => sn.id)
            .map((id) => s.doc.nodesById[id])
            .filter(Boolean)
            .map((n) => ({ id: n.id, x: n.x, y: n.y, parentId: n.parentId }));
          requestDraw();
          return;
        }
      }
      if (e.shiftKey) {
        if (Math.abs(dx) > Math.abs(dy)) dy = 0;
        else dx = 0;
      }
      // grid snap (unless ctrl held)
      if (!e.ctrlKey && !e.metaKey && s.doc.settings?.grid?.snap) {
        const startBox = boundsOfNodes(s.doc, interaction.startNodes.map((n) => n.id));
        if (startBox) {
          const size = s.doc.settings.grid.size;
          const tx = Math.round((startBox.x + dx) / size) * size;
          const ty = Math.round((startBox.y + dy) / size) * size;
          dx += tx - (startBox.x + dx);
          dy += ty - (startBox.y + dy);
        }
      }
      // smart snapping (unless ctrl held and grid snap is off)
      overlay.guides = [];
      if (!e.ctrlKey && !e.metaKey && !s.doc.settings?.grid?.snap) {
        const startBox = boundsOfNodes(s.doc, interaction.startNodes.map((n) => n.id));
        if (startBox) {
          const moving: Rect = { x: startBox.x + dx, y: startBox.y + dy, w: startBox.w, h: startBox.h };
          const cands: Rect[] = snapCandidates(interaction.startNodes.map((n) => n.id));
          const snap = computeSnap(moving, cands, 6 / s.viewport.zoom);
          dx += snap.dx;
          dy += snap.dy;
          overlay.guides = snap.guides;
        }
      }
      const updates: { id: ID; x: number; y: number }[] = [];
      for (const start of interaction.startNodes) {
        const n = s.doc.nodesById[start.id];
        if (!n) continue;
        const P = parentWorldMatrix(s.doc, n);
        const local = mApplyVec(mInvert(P), dx, dy);
        updates.push({ id: start.id, x: start.x + local.x, y: start.y + local.y });
      }
      if (updates.length) {
        s.updateNodes(
          updates.map((u) => u.id),
          (node) => {
            const u = updates.find((x) => x.id === node.id)!;
            return { x: u.x, y: u.y };
          },
          { history: false },
        );
      }
      requestDraw();
      return;
    }
    case 'resize': {
      applyResize(interaction, world, e.shiftKey, e.altKey);
      interaction.moved = true;
      requestDraw();
      return;
    }
    case 'rotate': {
      const ang = Math.atan2(world.y - interaction.center.y, world.x - interaction.center.x);
      let deltaDeg = ((ang - interaction.startAngle) * 180) / Math.PI;
      if (e.shiftKey) deltaDeg = Math.round(deltaDeg / 15) * 15;
      interaction.moved = true;
      const R = mMul(mMul(mTranslate(interaction.center.x, interaction.center.y), mRotate(deltaDeg)), mTranslate(-interaction.center.x, -interaction.center.y));
      const updates: { id: ID; x: number; y: number; rotation: number }[] = [];
      for (const n0 of interaction.startNodes) {
        const W = interaction.worldMats.get(n0.id)!;
        const target = mMul(R, W);
        const Pinv = interaction.parentInvs.get(n0.id)!;
        const L = mMul(Pinv, target);
        let rot = normalizeAngle((Math.atan2(L.b, L.a) * 180) / Math.PI);
        const rc = mMul(mMul(mTranslate(n0.w / 2, n0.h / 2), mRotate(rot)), mTranslate(-n0.w / 2, -n0.h / 2));
        const t = mMul(L, mInvert(rc));
        updates.push({ id: n0.id, x: t.e, y: t.f, rotation: rot });
      }
      s.updateNodes(
        updates.map((u) => u.id),
        (node) => {
          const u = updates.find((x) => x.id === node.id)!;
          return { x: u.x, y: u.y, rotation: u.rotation };
        },
        { history: false },
      );
      requestDraw();
      return;
    }
    case 'draw': {
      const a = interaction.startWorld;
      const b = constrainDraw(a, world, interaction.type, e.shiftKey);
      const rect = {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        w: Math.abs(b.x - a.x),
        h: Math.abs(b.y - a.y),
      };
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      overlay.dragBadge = rect;
      overlay.drawPreview = {
        type: interaction.type,
        rect,
        flip: dx !== 0 && dy !== 0 ? (dx > 0) !== (dy > 0) : false,
        diagonal: interaction.type === 'line' || interaction.type === 'arrow' ? { x1: a.x, y1: a.y, x2: b.x, y2: b.y } : null,
      };
      requestDraw();
      return;
    }
    case 'pencil': {
      const pts = interaction.points;
      const last = pts[pts.length - 1];
      if (Math.hypot(world.x - last.x, world.y - last.y) * s.viewport.zoom > 1.5) {
        pts.push(world);
        overlay.pencilDraft = pts;
        requestDraw();
      }
      return;
    }
    case 'scale': {
      const k = Math.max(
        0.02,
        Math.hypot(world.x - interaction.anchor.x, world.y - interaction.anchor.y) / interaction.startDist,
      );
      applyScale(interaction, k);
      interaction.moved = true;
      requestDraw();
      return;
    }
    case 'penHandle': {
      const draft = overlay.penDraft;
      if (draft && draft.points.length > 0) {
        const p = draft.points[draft.points.length - 1];
        p.hx = world.x - p.x;
        p.hy = world.y - p.y;
        draft.cursor = world;
        requestDraw();
      }
      return;
    }
    case 'pathPoint': {
      const n = s.doc.nodesById[s.editingPathId ?? ''];
      if (!n || n.type !== 'path') return;
      interaction.ptsWorld[interaction.index] = {
        ...interaction.ptsWorld[interaction.index],
        wx: world.x,
        wy: world.y,
      };
      interaction.moved = true;
      applyPathPoints(n, interaction.ptsWorld);
      requestDraw();
      return;
    }
    case 'pathHandle': {
      const n = s.doc.nodesById[s.editingPathId ?? ''];
      if (!n || n.type !== 'path') return;
      const W = nodeWorldMatrix(s.doc, n);
      const p = n.points[interaction.index];
      if (!p) return;
      const anchor = mApply(W, p.x, p.y);
      let hx = world.x - anchor.x;
      let hy = world.y - anchor.y;
      if (interaction.which === 'in') {
        hx = -hx;
        hy = -hy;
      }
      const ptsWorld = n.points.map((pt, i) => {
        const w = mApply(W, pt.x, pt.y);
        return { ...pt, wx: w.x, wy: w.y };
      });
      ptsWorld[interaction.index] = { ...ptsWorld[interaction.index], hx, hy };
      interaction.moved = true;
      applyPathPoints(n, ptsWorld);
      requestDraw();
      return;
    }
  }
}

function onPointerUp(e: PointerEvent): void {
  const s = S();

  // touch bookkeeping
  if (e.pointerType === 'touch') {
    activePointers.delete(e.pointerId);
    if (pinch) {
      if (activePointers.size < 2) {
        pinch = null;
        interaction = { kind: 'none' };
      }
      return;
    }
  }

  const world = eventWorld(e);
  switch (interaction.kind) {
    case 'connect': {
      const cd = overlay.connectDrag;
      const hotspotId = interaction.hotspotId;
      overlay.connectDrag = null;
      interaction = { kind: 'none' };
      setCursor(toolCursor());
      if (cd?.overFrameId) {
        const destId = cd.overFrameId;
        const ixId = s.addInteraction(hotspotId, { destinationId: destId });
        const dest = s.doc.nodesById[destId];
        s.toast(`On click → “${dest?.name ?? 'frame'}” — configure in the Prototype panel`, {
          label: 'Edit',
          run: () => {
            useIris.getState().setRightTab('prototype');
            useIris.getState().setActiveInteractionId(ixId);
          },
        });
      }
      requestDraw();
      return;
    }
    case 'pencil': {
      finishPencil();
      return;
    }
    case 'scale': {
      if (interaction.moved) s.historyCommit();
      else s.historyCancel();
      overlay.dragBadge = null;
      interaction = { kind: 'none' };
      requestDraw();
      return;
    }
    case 'pan': {
      interaction = { kind: 'none' };
      setCursor(toolCursor());
      return;
    }
    case 'guideDrag': {
      const gd = overlay.guideDrag;
      const wasExisting = interaction.index >= 0;
      const inCanvasArea = gd ? eventCanvas(e).x > RULER && eventCanvas(e).y > RULER : false;
      overlay.guideDrag = null;
      const idx = interaction.index;
      const axis = interaction.axis;
      interaction = { kind: 'none' };
      if (gd && idx >= 0 && !inCanvasArea) {
        // dragged an existing guide back into the ruler → remove
        s.removeGuide(axis, idx);
      } else if (gd && inCanvasArea) {
        if (wasExisting) {
          // commit the pre-drag snapshot first so the move is one undo step
          s.historyCommit();
          s.moveGuide(axis, idx, gd.at);
        } else {
          s.addGuide(axis, gd.at);
        }
      } else {
        s.historyCancel();
      }
      requestDraw();
      return;
    }
    case 'marquee': {
      const additive = interaction.additive;
      const rect = overlay.marquee;
      overlay.marquee = null;
      interaction = { kind: 'none' };
      if (rect && rect.w * s.viewport.zoom > 3 && rect.h * s.viewport.zoom > 3) {
        const ids = marqueeCandidates(s.doc, s.currentPageId, rect);
        if (additive) {
          s.setSelection([...s.selection, ...ids]);
        } else {
          s.setSelection(ids);
        }
      } else if (!additive) {
        s.setSelection([]);
      }
      requestDraw();
      return;
    }
    case 'move': {
      const ld = interaction.layoutDrag;
      overlay.layoutDrag = null;
      if (ld && !ld.left && interaction.moved) {
        // reorder drag finished inside the frame: run a no-op commit so the
        // solver snaps the dragged nodes into their new slots
        s.updateNodes([], {}, { history: false });
        if (interaction.ownsHistory) s.historyCommit();
        overlay.guides = [];
        interaction = { kind: 'none' };
        requestDraw();
        return;
      }
      if (interaction.moved) {
        reparentOnDrop(interaction.startNodes);
      }
      if (interaction.ownsHistory) {
        if (interaction.moved) s.historyCommit();
        else s.historyCancel();
      }
      overlay.guides = [];
      interaction = { kind: 'none' };
      requestDraw();
      return;
    }
    case 'resize':
    case 'rotate': {
      if (interaction.moved) s.historyCommit();
      else s.historyCancel();
      overlay.dragBadge = null;
      interaction = { kind: 'none' };
      requestDraw();
      return;
    }
    case 'draw': {
      const type = interaction.type;
      const parentId = interaction.parentId;
      const a = interaction.startWorld;
      overlay.drawPreview = null;
      overlay.dragBadge = null;
      interaction = { kind: 'none' };
      const b = constrainDraw(a, world, type, e.shiftKey);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      let rect = {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        w: Math.abs(dx),
        h: Math.abs(dy),
      };
      const flip = dx !== 0 && dy !== 0 ? (dx > 0) !== (dy > 0) : false;
      const tiny =
        type === 'line' || type === 'arrow'
          ? Math.hypot(rect.w, rect.h) * s.viewport.zoom < 3
          : rect.w * s.viewport.zoom < 3 || rect.h * s.viewport.zoom < 3;
      if (tiny && type !== 'text') {
        requestDraw();
        return;
      }
      // grid snapping for drawn shapes
      rect = snapGridRect(rect);
      // world rect -> parent space
      const parent = parentId ? s.doc.nodesById[parentId] : null;
      let local = rect;
      if (parent) {
        const inv = mInvert(nodeWorldMatrix(s.doc, parent));
        local = transformRect(inv, rect);
      }
      if (type === 'text') {
        const id = s.addNode(
          'text',
          {
            x: local.x,
            y: local.y,
            w: Math.max(local.w, 16),
            h: Math.max(local.h, 18),
            autoWidth: tiny,
          },
          parentId,
        );
        s.setEditingText(id);
      } else {
        const patch: Partial<IrisNode> = {
          x: local.x,
          y: local.y,
          w: Math.max(local.w, type === 'line' || type === 'arrow' ? 0 : 1),
          h: Math.max(local.h, type === 'line' || type === 'arrow' ? 0 : 1),
        };
        if (type === 'line' || type === 'arrow') patch.flip = flip;
        s.addNode(type, patch, parentId);
        s.setTool('move');
      }
      requestDraw();
      return;
    }
    case 'penHandle': {
      const draft = overlay.penDraft;
      if (draft && draft.points.length > 0) {
        const p = draft.points[draft.points.length - 1];
        if (Math.hypot(p.hx, p.hy) * s.viewport.zoom < 4) {
          p.hx = 0;
          p.hy = 0;
        }
        draft.dragging = false;
      }
      interaction = { kind: 'none' };
      requestDraw();
      return;
    }
    case 'pathPoint':
    case 'pathHandle': {
      if (interaction.moved) s.historyCommit();
      else s.historyCancel();
      interaction = { kind: 'none' };
      requestDraw();
      return;
    }
    case 'eyedrop': {
      interaction = { kind: 'none' };
      return;
    }
  }
}

/* ------------------------------------------------------------------ */
/* resize math                                                         */
/* ------------------------------------------------------------------ */

function applyResize(ia: Extract<Interaction, { kind: 'resize' }>, world: Vec, shift: boolean, alt: boolean): void {
  const s = S();
  if (ia.singleId) {
    const n0 = ia.startNodes.find((n) => n.id === ia.singleId)!;
    const q = mApply(ia.singleWorldInv, world.x, world.y);
    const h = ia.handle;
    const fx = h.includes('e') ? 1 : h.includes('w') ? -1 : 0;
    const fy = h.includes('s') ? 1 : h.includes('n') ? -1 : 0;
    // auto-layout: resizing a fill child converts it to fixed on that axis;
    // resizing a hug frame converts the hug to fixed (Figma behavior)
    {
      const parent = n0.parentId ? s.doc.nodesById[n0.parentId] : undefined;
      const conv: Partial<IrisNode> = {};
      if (parent?.layout) {
        if (fx !== 0 && n0.sizingH === 'fill') conv.sizingH = 'fixed';
        if (fy !== 0 && n0.sizingV === 'fill') conv.sizingV = 'fixed';
      }
      if (n0.layout) {
        if (fx !== 0 && n0.sizingH === 'hug') conv.sizingH = 'fixed';
        if (fy !== 0 && n0.sizingV === 'hug') conv.sizingV = 'fixed';
      }
      if (Object.keys(conv).length) s.updateNodes([n0.id], conv, { history: false });
    }
    let newW: number;
    let newH: number;
    if (alt) {
      newW = fx === 0 ? n0.w : Math.abs(2 * (q.x - n0.w / 2));
      newH = fy === 0 ? n0.h : Math.abs(2 * (q.y - n0.h / 2));
    } else {
      newW = fx === 0 ? n0.w : fx > 0 ? q.x : n0.w - q.x;
      newH = fy === 0 ? n0.h : fy > 0 ? q.y : n0.h - q.y;
    }
    // grid snap
    if (s.doc.settings?.grid?.snap) {
      const size = s.doc.settings.grid.size;
      newW = Math.max(newW, size) === newW ? Math.round(newW / size) * size : newW;
      newH = Math.max(newH, size) === newH ? Math.round(newH / size) * size : newH;
    }
    // clamp
    const minW = n0.type === 'line' || n0.type === 'arrow' ? 0 : 1;
    const minH = n0.type === 'line' || n0.type === 'arrow' ? 0 : 1;
    if (newW < minW) newW = minW;
    if (newH < minH) newH = minH;
    // aspect lock (corners)
    if (shift && fx !== 0 && fy !== 0 && n0.w > 0 && n0.h > 0) {
      const ratio = n0.h / n0.w;
      if (newW * ratio > newH) newH = newW * ratio;
      else newW = newH / ratio;
    }
    // anchor in local coords (opposite handle / center)
    const anchorLocal: Vec = alt
      ? { x: n0.w / 2, y: n0.h / 2 }
      : { x: fx > 0 ? 0 : fx < 0 ? n0.w : n0.w / 2, y: fy > 0 ? 0 : fy < 0 ? n0.h : n0.h / 2 };
    const L0 = nodeLocalMatrix(n0);
    const A = mApply(L0, anchorLocal.x, anchorLocal.y); // parent coords (fixed)
    // new anchor local (same relative position in the new box)
    const anchorNew: Vec = alt
      ? { x: newW / 2, y: newH / 2 }
      : { x: fx > 0 ? 0 : fx < 0 ? newW : newW / 2, y: fy > 0 ? 0 : fy < 0 ? newH : newH / 2 };
    const theta = n0.rotation;
    const cx = anchorNew.x - newW / 2;
    const cy = anchorNew.y - newH / 2;
    const r = mRotate(theta);
    const rotVec = { x: r.a * cx + r.c * cy + newW / 2, y: r.b * cx + r.d * cy + newH / 2 };
    const newX = A.x - rotVec.x;
    const newY = A.y - rotVec.y;
    s.setNodeRect(ia.singleId, { x: newX, y: newY, w: newW, h: newH }, { history: false });
    // badge
    const n1 = s.doc.nodesById[ia.singleId];
    if (n1) overlay.dragBadge = nodeWorldAABB(s.doc, n1);
    return;
  }

  // multi resize (world AABB)
  const box = ia.startBox;
  const h = ia.handle;
  const q = world;
  const fx = h.includes('e') ? 1 : h.includes('w') ? -1 : 0;
  const fy = h.includes('s') ? 1 : h.includes('n') ? -1 : 0;
  let newW: number;
  let newH: number;
  if (alt) {
    newW = fx === 0 ? box.w : Math.abs(2 * (q.x - (box.x + box.w / 2)));
    newH = fy === 0 ? box.h : Math.abs(2 * (q.y - (box.y + box.h / 2)));
  } else {
    newW = fx === 0 ? box.w : fx > 0 ? q.x - box.x : box.x + box.w - q.x;
    newH = fy === 0 ? box.h : fy > 0 ? q.y - box.y : box.y + box.h - q.y;
  }
  if (newW < 1) newW = 1;
  if (newH < 1) newH = 1;
  if (shift && fx !== 0 && fy !== 0 && box.w > 0 && box.h > 0) {
    const ratio = box.h / box.w;
    if (newW * ratio > newH) newH = newW * ratio;
    else newW = newH / ratio;
  }
  const sx = newW / box.w;
  const sy = newH / box.h;
  const originX = alt ? box.x + box.w / 2 - newW / 2 : fx > 0 ? box.x : fx < 0 ? box.x + box.w - newW : box.x + (box.w - newW) / 2;
  const originY = alt ? box.y + box.h / 2 - newH / 2 : fy > 0 ? box.y : fy < 0 ? box.y + box.h - newH : box.y + (box.h - newH) / 2;

  const updates: { id: ID; patch: Partial<IrisNode> }[] = [];
  const rectUpdates: { id: ID; rect: { x: number; y: number; w: number; h: number } }[] = [];
  for (const n0 of ia.startNodes) {
    const a = ia.startAABBs.get(n0.id)!;
    const nx = originX + (a.x - box.x) * sx;
    const ny = originY + (a.y - box.y) * sy;
    const Pinv = ia.parentInvs.get(n0.id)!;
    const local = mApply(Pinv, nx, ny);
    const w = Math.max(1, n0.w * sx);
    const hh = Math.max(1, n0.h * sy);
    if (n0.type === 'frame' || n0.type === 'group') {
      // setNodeRect also scales children
      rectUpdates.push({ id: n0.id, rect: { x: local.x, y: local.y, w, h: hh } });
      continue;
    }
    const patch: Partial<IrisNode> = { x: local.x, y: local.y, w, h: hh };
    if (n0.type === 'text') patch.fontSize = Math.max(1, n0.fontSize * ((sx + sy) / 2));
    if (n0.cornerRadius) patch.cornerRadius = Math.max(0, n0.cornerRadius * ((sx + sy) / 2));
    if (n0.type === 'path' && n0.points.length) {
      patch.points = n0.points.map((p) => ({ x: p.x * sx, y: p.y * sy, hx: p.hx * sx, hy: p.hy * sy }));
    }
    updates.push({ id: n0.id, patch });
  }
  if (updates.length) {
    s.updateNodes(
      updates.map((u) => u.id),
      (node) => {
        const u = updates.find((x) => x.id === node.id)!;
        return u.patch;
      },
      { history: false },
    );
  }
  for (const r of rectUpdates) {
    s.setNodeRect(r.id, r.rect, { history: false });
  }
  overlay.dragBadge = { x: originX, y: originY, w: newW, h: newH };
}

/** Snap candidates: siblings of the dragged nodes + their parent frame edges. */
function snapCandidates(ids: ID[]): Rect[] {
  const s = S();
  const doc = s.doc;
  const parents = new Set<ID | null>(ids.map((id) => doc.nodesById[id]?.parentId ?? null));
  const out: Rect[] = [];
  const page = doc.pagesById[s.currentPageId];
  if (!page) return out;
  const inSelection = (id: ID): boolean => {
    for (const sid of ids) {
      if (sid === id) return true;
      let p: ID | null = doc.nodesById[id]?.parentId ?? null;
      while (p) {
        if (p === sid) return true;
        p = doc.nodesById[p]?.parentId ?? null;
      }
    }
    return false;
  };
  const pushSiblings = (parentId: ID | null) => {
    const list =
      parentId === null
        ? page.nodeIds.map((id) => doc.nodesById[id])
        : (doc.nodesById[parentId]?.children ?? []).map((id) => doc.nodesById[id]);
    for (const n of list) {
      if (!n || !n.visible || inSelection(n.id)) continue;
      out.push(nodeWorldAABB(doc, n));
    }
  };
  if (parents.size === 1) {
    const parentId = [...parents][0];
    pushSiblings(parentId);
    const p = parentId ? doc.nodesById[parentId] : null;
    if (p && p.type === 'frame') out.push(nodeWorldAABB(doc, p));
  } else {
    pushSiblings(null);
  }
  return out;
}

/** Apply world-space points to a path node (normalizing bounds + origin). */
function applyPathPoints(n: IrisNode, ptsWorld: (PathPoint & { wx: number; wy: number })[]): void {
  const s = S();
  const minX = Math.min(...ptsWorld.map((p) => p.wx));
  const minY = Math.min(...ptsWorld.map((p) => p.wy));
  const maxX = Math.max(...ptsWorld.map((p) => p.wx));
  const maxY = Math.max(...ptsWorld.map((p) => p.wy));
  const Pinv = mInvert(parentWorldMatrix(s.doc, n));
  const origin = mApply(Pinv, minX, minY);
  const points: PathPoint[] = ptsWorld.map((p) => ({
    x: p.wx - minX,
    y: p.wy - minY,
    hx: p.hx,
    hy: p.hy,
  }));
  s.updateNodes(
    [n.id],
    {
      x: origin.x,
      y: origin.y,
      w: Math.max(maxX - minX, 1),
      h: Math.max(maxY - minY, 1),
      points,
    },
    { history: false },
  );
}

/* ------------------------------------------------------------------ */
/* double click / wheel / context menu                                 */
/* ------------------------------------------------------------------ */

function onDoubleClick(e: MouseEvent): void {
  const s = S();
  if (overlay.penDraft) {
    // double click ends the pen path (drop a duplicated last point if coincident)
    const pts = overlay.penDraft.points;
    if (pts.length >= 2) {
      const last = pts[pts.length - 1];
      const prev = pts[pts.length - 2];
      if (Math.hypot(last.x - prev.x, last.y - prev.y) * s.viewport.zoom < 4) pts.pop();
    }
    finishPen(false);
    return;
  }
  if (s.editingTextId) return;
  const world = eventWorld(e);
  const hit = hitTestDeep(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
  if (!hit) {
    // double-click on a frame's empty background enters (selects) the frame
    const frame = frameAtPoint(s.doc, s.currentPageId, world);
    if (frame) s.setSelection([frame.id]);
    return;
  }
  if (hit.type === 'text') {
    s.setEditingText(hit.id);
    return;
  }
  if (hit.type === 'path') {
    s.setEditingPath(hit.id);
    overlay.pathEdit = { activePoint: null, dragKind: null, hoverPoint: null };
    requestDraw();
    return;
  }
  if (hit.type === 'image' && hit.src) {
    // double-click image: replace its source
    pickImageFiles(eventWorld(e));
    return;
  }
  // deep select into groups/frames
  s.setSelection([hit.id]);
}

function onWheel(e: WheelEvent): void {
  e.preventDefault();
  const s = S();
  if (e.ctrlKey || e.metaKey) {
    const content = eventContent(e);
    s.zoomAt(Math.exp(-e.deltaY * 0.0015), content.x, content.y);
    return;
  }
  const mult = e.deltaMode === 1 ? 16 : 1;
  let dx = e.deltaX * mult;
  let dy = e.deltaY * mult;
  if (e.altKey) {
    // alt+wheel: horizontal pan
    dx = dy;
    dy = 0;
  }
  if (e.shiftKey && dx === 0) {
    dx = dy;
    dy = 0;
  }
  s.panBy(-dx, -dy);
}

function onContextMenu(e: MouseEvent): void {
  e.preventDefault();
  const s = S();
  if (s.editingTextId) s.setEditingText(null);
  const world = eventWorld(e);
  const hit = hitTestDeep(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
  if (hit) {
    const resolved = resolveClick(s.doc, hit, e.ctrlKey || e.metaKey);
    if (!s.selection.includes(resolved)) s.setSelection([resolved]);
  }
  s.openContextMenu(e.clientX, e.clientY, world.x, world.y);
}

/* ------------------------------------------------------------------ */
/* keyboard                                                            */
/* ------------------------------------------------------------------ */

function isTypingTarget(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
}

function onKeyDown(e: KeyboardEvent): void {
  const s = S();
  if (isTypingTarget(e.target)) {
    if (e.key === 'Escape') (e.target as HTMLElement).blur();
    return;
  }
  if (s.exportOpen || s.shortcutsOpen || s.presenting || s.paletteOpen) return;
  const mod = e.ctrlKey || e.metaKey;

  if (e.key === ' ') {
    if (!overlay.spaceDown) {
      overlay.spaceDown = true;
      setCursor('grab');
    }
    if (e.target === document.body) e.preventDefault();
    return;
  }

  if (mod) {
    switch (e.key.toLowerCase()) {
      case 'z':
        e.preventDefault();
        if (e.shiftKey) s.redo();
        else s.undo();
        return;
      case 'y':
        e.preventDefault();
        s.redo();
        return;
      case 'c':
        e.preventDefault();
        if (e.altKey) s.copyStyle();
        else s.copySelection();
        return;
      case 'x':
        e.preventDefault();
        s.cutSelection();
        return;
      case 'v':
        e.preventDefault();
        if (e.altKey) s.pasteStyle();
        else s.paste(null);
        return;
      case 'd':
        e.preventDefault();
        if (s.selection.length) s.duplicateSelection();
        return;
      case 'a':
        e.preventDefault();
        if (e.shiftKey) s.selectSameType();
        else s.selectAll();
        return;
      case 'g':
        e.preventDefault();
        if (e.shiftKey) s.ungroupSelection();
        else s.groupSelection();
        return;
      case 's':
        e.preventDefault();
        void saveIrisFile({ as: e.shiftKey });
        return;
      case 'e':
        if (e.shiftKey) {
          e.preventDefault();
          s.setExportOpen(true);
        }
        return;
      case 'o':
        e.preventDefault();
        openIrisFile();
        return;
      case 'k':
        if (e.shiftKey) {
          e.preventDefault();
          switchTool('image');
        } else {
          e.preventDefault();
          s.setPaletteOpen(true);
        }
        return;
      case 'enter':
        e.preventDefault();
        s.setPresenting(true);
        return;
      case 'l':
        e.preventDefault();
        if (e.shiftKey) s.unlockAllOnPage();
        else if (s.selection.length) s.toggleLockSelection();
        return;
      case 'h':
        if (e.shiftKey) {
          e.preventDefault();
          if (s.selection.length) s.toggleHideSelection();
        }
        return;
      case '0':
        e.preventDefault();
        s.zoomReset();
        return;
      case '=':
      case '+':
        e.preventDefault();
        s.zoomAt(1.2);
        return;
      case '-':
        e.preventDefault();
        s.zoomAt(1 / 1.2);
        return;
      case ']':
        e.preventDefault();
        s.zorder(e.shiftKey ? 'back' : 'forward');
        return;
      case '[':
        e.preventDefault();
        s.zorder(e.shiftKey ? 'front' : 'backward');
        return;
    }
    return;
  }

  if (e.shiftKey && (e.code === 'Digit1' || e.code === 'Digit2')) {
    e.preventDefault();
    if (e.code === 'Digit1') s.zoomToFit();
    else s.zoomToSelection();
    return;
  }

  // Shift+H / Shift+V → flip (before tool switching)
  if (e.shiftKey && (e.key === 'H' || e.key === 'V')) {
    if (s.selection.length) {
      s.flipSelection(e.key === 'H' ? 'h' : 'v');
      return;
    }
  }

  // Shift+R → toggle rulers
  if (e.shiftKey && (e.key === 'R' || e.key === 'r')) {
    s.setViewFlag('rulers', !s.viewFlags.rulers);
    return;
  }

  // Shift+A → add auto layout · Alt+Shift+A → remove auto layout
  if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    if (e.altKey) s.removeAutoLayout();
    else s.addAutoLayout();
    return;
  }

  // Shift+E → toggle prototype connections visibility (field guide §10)
  if (e.shiftKey && (e.key === 'E' || e.key === 'e') && !e.altKey) {
    s.setViewFlag('connections', !s.viewFlags.connections);
    s.toast(s.viewFlags.connections ? 'Prototype connections shown' : 'Prototype connections hidden');
    return;
  }

  switch (e.key.toLowerCase()) {
    case 'v':
      switchTool('move');
      return;
    case 'k':
      switchTool('scale');
      return;
    case 'f':
      switchTool('frame');
      return;
    case 'r':
      switchTool('rect');
      return;
    case 'o':
      switchTool('ellipse');
      return;
    case 'l':
      switchTool(e.shiftKey ? 'arrow' : 'line');
      return;
    case 't':
      switchTool('text');
      return;
    case 'p':
      switchTool(e.shiftKey ? 'pencil' : 'pen');
      return;
    case 'h':
      if (e.shiftKey) break; // handled above (flip)
      switchTool('hand');
      return;
    case 'y':
      switchTool('polygon');
      return;
    case 's':
      switchTool(e.shiftKey ? 'section' : 'slice');
      return;
    case 'c':
      switchTool('comment');
      return;
    case 'i':
      switchTool('eyedropper');
      return;
    case 'm':
      switchTool('image');
      return;
    case 'escape': {
      if (overlay.penDraft) {
        finishPen(false);
        return;
      }
      if (overlay.pencilDraft) {
        overlay.pencilDraft = null;
        if (interaction.kind === 'pencil') interaction = { kind: 'none' };
        requestDraw();
        return;
      }
      if (s.presenting) {
        s.setPresenting(false);
        return;
      }
      if (s.editingPathId) {
        s.setEditingPath(null);
        overlay.pathEdit = null;
        requestDraw();
        return;
      }
      if (interaction.kind === 'marquee') {
        overlay.marquee = null;
        interaction = { kind: 'none' };
        requestDraw();
        return;
      }
      if (s.activeCommentId) {
        s.setActiveComment(null);
        return;
      }
      if (s.selection.length) {
        s.setSelection([]);
        return;
      }
      if (s.tool !== 'move') s.setTool('move');
      return;
    }
    case 'enter': {
      if (overlay.penDraft) {
        finishPen(false);
        return;
      }
      if (s.editingPathId) {
        s.setEditingPath(null);
        overlay.pathEdit = null;
        requestDraw();
        return;
      }
      if (s.selection.length === 1) {
        const n = s.doc.nodesById[s.selection[0]];
        if (!n) return;
        if (n.type === 'text') {
          s.setEditingText(n.id);
          return;
        }
        if (n.type === 'path') {
          s.setEditingPath(n.id);
          overlay.pathEdit = { activePoint: null, dragKind: null, hoverPoint: null };
          requestDraw();
          return;
        }
        if (n.children.length > 0) {
          s.setSelection([n.children[0]]);
          return;
        }
      }
      return;
    }
    case 'delete':
    case 'backspace':
      e.preventDefault();
      s.deleteSelection();
      return;
    case 'arrowleft':
    case 'arrowright':
    case 'arrowup':
    case 'arrowdown': {
      e.preventDefault();
      if (!s.selection.length) return;
      const step = e.shiftKey ? 10 : 1;
      const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
      const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
      // children of an auto-layout frame: arrow keys reorder (Figma)
      const parentId = s.doc.nodesById[s.selection[0]]?.parentId ?? null;
      const pf = parentId ? s.doc.nodesById[parentId] : undefined;
      if (
        pf?.layout &&
        s.selection.every((id) => s.doc.nodesById[id]?.parentId === parentId)
      ) {
        // reading order: Right/Down = forward, Left/Up = backward
        const dir: -1 | 1 = dx + dy > 0 ? 1 : -1;
        arrowReorderInLayout(dir);
        return;
      }
      s.moveSelectionWorld(dx, dy, 'nudge');
      return;
    }
    case '1':
      if (e.shiftKey) {
        e.preventDefault();
        s.zoomToFit();
      }
      return;
    case '2':
      if (e.shiftKey) {
        e.preventDefault();
        s.zoomToSelection();
      }
      return;
  }
}

function onKeyUp(e: KeyboardEvent): void {
  if (e.key === ' ') {
    overlay.spaceDown = false;
    setCursor(toolCursor());
  }
}

/* ------------------------------------------------------------------ */
/* paste / drag-drop                                                   */
/* ------------------------------------------------------------------ */

function onPaste(e: ClipboardEvent): void {
  if (isTypingTarget(e.target)) return;
  const files = Array.from(e.clipboardData?.files ?? []);
  const images = files.filter((f) => f.type.startsWith('image/'));
  if (images.length > 0) {
    e.preventDefault();
    void importImageFiles(images);
  }
}

function onDragOver(e: DragEvent): void {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
}

function onDrop(e: DragEvent): void {
  e.preventDefault();
  const files = Array.from(e.dataTransfer?.files ?? []);
  if (files.length === 0) return;
  const iris = files.find((f) => /\.iris$/i.test(f.name));
  if (iris) {
    void openIrisBlob(iris);
    return;
  }
  const images = files.filter((f) => f.type.startsWith('image/'));
  if (images.length > 0) {
    const world = eventWorld(e);
    void importImageFiles(images, world);
  }
}

/* ------------------------------------------------------------------ */
/* init                                                                */
/* ------------------------------------------------------------------ */

export function initTools(c: HTMLCanvasElement): () => void {
  canvas = c;
  interaction = { kind: 'none' };
  overlay.spaceDown = false;
  overlay.penDraft = null;
  overlay.pathEdit = null;
  overlay.guideDrag = null;
  activePointers.clear();
  pinch = null;

  const down = (e: PointerEvent) => onPointerDown(e);
  const move = (e: PointerEvent) => onPointerMove(e);
  const up = (e: PointerEvent) => onPointerUp(e);
  const dbl = (e: MouseEvent) => onDoubleClick(e);
  const wheel = (e: WheelEvent) => onWheel(e);
  const ctxMenu = (e: MouseEvent) => onContextMenu(e);
  const keyDown = (e: KeyboardEvent) => onKeyDown(e);
  const keyUp = (e: KeyboardEvent) => onKeyUp(e);
  const paste = (e: ClipboardEvent) => onPaste(e);
  const dragOver = (e: DragEvent) => onDragOver(e);
  const drop = (e: DragEvent) => onDrop(e);

  c.addEventListener('pointerdown', down);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
  c.addEventListener('dblclick', dbl);
  c.addEventListener('wheel', wheel, { passive: false });
  c.addEventListener('contextmenu', ctxMenu);
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
  window.addEventListener('paste', paste);
  c.addEventListener('dragover', dragOver);
  c.addEventListener('drop', drop);
  setCursor(toolCursor());

  return () => {
    c.removeEventListener('pointerdown', down);
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
    c.removeEventListener('dblclick', dbl);
    c.removeEventListener('wheel', wheel);
    c.removeEventListener('contextmenu', ctxMenu);
    window.removeEventListener('keydown', keyDown);
    window.removeEventListener('keyup', keyUp);
    window.removeEventListener('paste', paste);
    c.removeEventListener('dragover', dragOver);
    c.removeEventListener('drop', drop);
    canvas = null;
  };
}
