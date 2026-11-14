/**
 * Iris pointer/keyboard interaction layer — a state machine driving
 * marquee / move / resize / rotate / draw / pan / pen / path-edit / text.
 */

import { ID, IrisNode, NodeType, PathPoint } from './model';
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
import { requestDraw } from './renderer';
import { importImageFiles, openIrisBlob, openIrisFile, saveIrisFile } from './files';

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
  | { kind: 'draw'; type: NodeType; startWorld: Vec; parentId: ID | null }
  | { kind: 'penHandle' }
  | { kind: 'pathPoint'; index: number; ptsWorld: (PathPoint & { wx: number; wy: number })[]; moved: boolean }
  | { kind: 'pathHandle'; index: number; which: 'in' | 'out'; moved: boolean };

let canvas: HTMLCanvasElement | null = null;
let interaction: Interaction = { kind: 'none' };
let hoverHandle: HandleId | null = null;

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
  if (t === 'move') return 'default';
  if (t === 'text') return 'text';
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
  s.addNode(
    'path',
    {
      x: minX,
      y: minY,
      w: Math.max(maxX - minX, 1),
      h: Math.max(maxY - minY, 1),
      points,
      closed: canClose,
      fill: canClose ? '#D9D9D9' : null,
      stroke: canClose ? null : '#B3B3B3',
      strokeWidth: 1,
    },
    null,
  );
  s.setTool('move');
  requestDraw();
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

  // finish text editing if active
  if (s.editingTextId) s.setEditingText(null);

  // middle button or space => pan
  if (e.button === 1 || overlay.spaceDown) {
    interaction = { kind: 'pan', startScreen: { x: e.clientX, y: e.clientY }, startVp: { ...s.viewport } };
    setCursor('grabbing');
    return;
  }
  if (e.button === 2) return; // context menu handles right click

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

  if (tool === 'frame' || tool === 'rect' || tool === 'ellipse' || tool === 'line') {
    const frame = frameAtPoint(s.doc, s.currentPageId, world);
    interaction = {
      kind: 'draw',
      type: tool as NodeType,
      startWorld: world,
      parentId: frame?.id ?? null,
    };
    requestDraw();
    return;
  }

  // move tool --------------------------------------------------------
  // handle hit?
  const hh = hitHandle(content);
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

  // object hit?
  const hit = hitTestDeep(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
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
    return;
  }

  // empty: marquee
  interaction = { kind: 'marquee', startWorld: world, additive: e.shiftKey };
  overlay.marquee = { x: world.x, y: world.y, w: 0, h: 0 };
  requestDraw();
}

function onPointerMove(e: PointerEvent): void {
  const s = S();
  const world = eventWorld(e);
  const content = eventContent(e);
  overlay.pointerWorld = world;

  if (interaction.kind === 'none') {
    if (!pointerInCanvas(e)) {
      if (s.hoverId) s.setHover(null);
      return;
    }
    // hover + cursor
    if (s.editingTextId) return;
    if (s.tool === 'move') {
      const hh = hitHandle(content);
      if (hh !== hoverHandle) {
        hoverHandle = hh;
        setCursor(hh ? handleCursor(hh) : overlay.spaceDown ? 'grab' : 'default');
      }
      if (!hh) {
        const hit = hitTestDeep(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
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
    case 'pan': {
      s.setViewport({
        ...interaction.startVp,
        x: interaction.startVp.x + (e.clientX - interaction.startScreen.x),
        y: interaction.startVp.y + (e.clientY - interaction.startScreen.y),
      });
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
      }
      if (e.shiftKey) {
        if (Math.abs(dx) > Math.abs(dy)) dy = 0;
        else dx = 0;
      }
      // snapping (unless ctrl held)
      overlay.guides = [];
      if (!e.ctrlKey && !e.metaKey) {
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
      const b = world;
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
        diagonal: interaction.type === 'line' ? { x1: a.x, y1: a.y, x2: b.x, y2: b.y } : null,
      };
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
  const world = eventWorld(e);
  switch (interaction.kind) {
    case 'pan': {
      interaction = { kind: 'none' };
      setCursor(toolCursor());
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
      const dx = world.x - a.x;
      const dy = world.y - a.y;
      const rect = {
        x: Math.min(a.x, world.x),
        y: Math.min(a.y, world.y),
        w: Math.abs(dx),
        h: Math.abs(dy),
      };
      const flip = dx !== 0 && dy !== 0 ? (dx > 0) !== (dy > 0) : false;
      const tiny =
        type === 'line'
          ? Math.hypot(rect.w, rect.h) * s.viewport.zoom < 3
          : rect.w * s.viewport.zoom < 3 || rect.h * s.viewport.zoom < 3;
      if (tiny && type !== 'text') {
        requestDraw();
        return;
      }
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
          w: Math.max(local.w, type === 'line' ? 0 : 1),
          h: Math.max(local.h, type === 'line' ? 0 : 1),
        };
        if (type === 'line') patch.flip = flip;
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
    let newW: number;
    let newH: number;
    if (alt) {
      newW = fx === 0 ? n0.w : Math.abs(2 * (q.x - n0.w / 2));
      newH = fy === 0 ? n0.h : Math.abs(2 * (q.y - n0.h / 2));
    } else {
      newW = fx === 0 ? n0.w : fx > 0 ? q.x : n0.w - q.x;
      newH = fy === 0 ? n0.h : fy > 0 ? q.y : n0.h - q.y;
    }
    // clamp
    const minW = n0.type === 'line' ? 0 : 1;
    const minH = n0.type === 'line' ? 0 : 1;
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
    const h = Math.max(1, n0.h * sy);
    if (n0.type === 'frame' || n0.type === 'group') {
      // setNodeRect also scales children
      rectUpdates.push({ id: n0.id, rect: { x: local.x, y: local.y, w, h } });
      continue;
    }
    const patch: Partial<IrisNode> = { x: local.x, y: local.y, w, h };
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
  if (!hit) return;
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
  if (s.exportOpen || s.shortcutsOpen) return;
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
        s.copySelection();
        return;
      case 'x':
        e.preventDefault();
        s.cutSelection();
        return;
      case 'v':
        e.preventDefault();
        s.paste(null);
        return;
      case 'd':
        e.preventDefault();
        if (s.selection.length) s.duplicateSelection();
        return;
      case 'a':
        e.preventDefault();
        s.selectAll();
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

  switch (e.key) {
    case 'v':
    case 'V':
      switchTool('move');
      return;
    case 'f':
    case 'F':
      switchTool('frame');
      return;
    case 'r':
    case 'R':
      switchTool('rect');
      return;
    case 'o':
    case 'O':
      switchTool('ellipse');
      return;
    case 'l':
    case 'L':
      switchTool('line');
      return;
    case 't':
    case 'T':
      switchTool('text');
      return;
    case 'p':
    case 'P':
      switchTool('pen');
      return;
    case 'h':
    case 'H':
      switchTool('hand');
      return;
    case 'Escape': {
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
      if (interaction.kind === 'marquee') {
        overlay.marquee = null;
        interaction = { kind: 'none' };
        requestDraw();
        return;
      }
      if (s.selection.length) {
        s.setSelection([]);
        return;
      }
      if (s.tool !== 'move') s.setTool('move');
      return;
    }
    case 'Enter': {
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
    case 'Delete':
    case 'Backspace':
      e.preventDefault();
      s.deleteSelection();
      return;
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'ArrowUp':
    case 'ArrowDown': {
      e.preventDefault();
      if (!s.selection.length) return;
      const step = e.shiftKey ? 10 : 1;
      const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
      const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
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
