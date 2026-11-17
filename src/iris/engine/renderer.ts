/**
 * Iris canvas renderer: scene draw pass + selection overlay + snap guides +
 * rulers + pixel grid + layout grid + ruler guides.
 *
 * Scene pass note: drawNode() applies each node's LOCAL matrix on top of the
 * parent's already-applied world matrix — this is what makes content inside
 * frames/groups render in the right place (applying full world matrices
 * recursively would double-transform nested content).
 */

import { ID, IrisDoc, IrisNode } from './model';
import {
  IDENTITY,
  Mat,
  RULER,
  Rect,
  Vec,
  arrowPath2d,
  applyTextCase,
  boundsOfNodes,
  dashArray,
  firstBaseline,
  fontString,
  gradientLine,
  mApply,
  mMul,
  measureText,
  nodeLocalMatrix,
  nodeWorldAABB,
  nodeWorldMatrix,
  path2dForPoints,
  regularPath2d,
  screenToWorld,
  selectionHandleGeometry,
  visibleWorldRect,
  worldToScreen,
} from './geometry';
import { overlay } from './overlay';
import { useIris } from './store';
import { getImage, onImageCacheChange } from './imageCache';

export const ACCENT = '#0D99FF';
export const ACCENT_LIGHT = '#7EC9FF';
const SNAP = '#FF3B30';
const DEFAULT_CANVAS_BG = '#242424';
const RULER_BG = '#1E1E1E';
const RULER_BORDER = '#3E3E3E';
const RULER_TEXT = '#7A7A7A';
const GUIDE_COLOR = '#F26BFF';

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let raf = 0;
/** set during the scene pass: render shapes as outlines (wireframe view) */
let outlineMode = false;
/** set during export passes: skip editor-only visuals (slices) */
let exportPass = false;

export function setExportPass(v: boolean): void {
  exportPass = v;
}

export function requestDraw(): void {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    draw();
  });
}

function resize(): void {
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (w === 0 || h === 0) return;
  const pw = Math.round(w * dpr);
  const ph = Math.round(h * dpr);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph;
  }
  const st = useIris.getState();
  if (Math.abs(st.canvasSize.w - w) > 0.5 || Math.abs(st.canvasSize.h - h) > 0.5) {
    st.setCanvasSize(w, h);
  }
}

export function initRenderer(c: HTMLCanvasElement): () => void {
  canvas = c;
  ctx = c.getContext('2d');
  const ro = new ResizeObserver(() => {
    resize();
    requestDraw();
  });
  ro.observe(c);
  const unsubStore = useIris.subscribe(() => requestDraw());
  const unsubImages = onImageCacheChange(() => requestDraw());
  resize();
  requestDraw();
  return () => {
    ro.disconnect();
    unsubStore();
    unsubImages();
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    canvas = null;
    ctx = null;
  };
}

/** Sample the rendered pixel color under a client-space point (eyedropper). */
export function samplePixel(clientX: number, clientY: number): string | null {
  if (!canvas || !ctx) return null;
  const r = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const x = Math.round((clientX - r.left) * dpr);
  const y = Math.round((clientY - r.top) * dpr);
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return null;
  try {
    const d = ctx.getImageData(x, y, 1, 1).data;
    const hex = (v: number) => v.toString(16).padStart(2, '0');
    return `#${hex(d[0])}${hex(d[1])}${hex(d[2])}`.toUpperCase();
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Scene pass (shared with PNG export)                                 */
/* ------------------------------------------------------------------ */

function roundRectPath(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  c.beginPath();
  if (rr <= 0) {
    c.rect(x, y, w, h);
    return;
  }
  c.moveTo(x + rr, y);
  c.arcTo(x + w, y, x + w, y + h, rr);
  c.arcTo(x + w, y + h, x, y + h, rr);
  c.arcTo(x, y + h, x, y, rr);
  c.arcTo(x, y, x + w, y, rr);
  c.closePath();
}

/** Current uniform-ish scale of the ctx transform (for hairline widths). */
function ctxScale(c: CanvasRenderingContext2D): number {
  try {
    const t = c.getTransform();
    const det = t.a * t.d - t.b * t.c;
    return Math.sqrt(Math.abs(det)) || 1;
  } catch {
    return 1;
  }
}

/** Resolve a node's paint: solid color or gradient object. */
function paintOf(c: CanvasRenderingContext2D, n: IrisNode): string | CanvasGradient | null {
  if (n.fillGradient) {
    const g = n.fillGradient;
    let grad: CanvasGradient;
    if (g.type === 'radial') {
      const r = Math.max(n.w, n.h) / 2;
      grad = c.createRadialGradient(n.w / 2, n.h / 2, 0, n.w / 2, n.h / 2, Math.max(r, 0.01));
    } else {
      const l = gradientLine(n.w, n.h, g.angle);
      grad = c.createLinearGradient(l.x1, l.y1, l.x2, l.y2);
    }
    grad.addColorStop(0, g.from);
    grad.addColorStop(1, g.to);
    return grad;
  }
  return n.fill;
}

interface PaintOpts {
  /** skip fills (outline view) */
  noFill?: boolean;
}

/** Shared fill+stroke painting for closed shapes given a prepared path. */
function paintPath(
  c: CanvasRenderingContext2D,
  n: IrisNode,
  path: Path2D,
  opts: PaintOpts = {},
): void {
  const fill = outlineMode && !opts.noFill ? null : paintOf(c, n);
  if (fill) {
    c.fillStyle = fill;
    c.fill(path);
  }
  if (n.stroke && n.strokeWidth > 0) {
    c.strokeStyle = n.stroke;
    c.lineWidth = n.strokeWidth;
    const dash = dashArray(n.dash, n.strokeWidth);
    if (dash.length) c.setLineDash(dash);
    c.stroke(path);
    if (dash.length) c.setLineDash([]);
  } else if (outlineMode && !fill) {
    /* outline mode with no paint at all: show a hairline */
    c.strokeStyle = 'rgba(255,255,255,0.45)';
    c.lineWidth = 1 / ctxScale(c);
    c.stroke(path);
  }
}

/** Draw a set of nodes (ctx is expected to be in the PARENT-of-roots space). */
export function drawNodes(
  c: CanvasRenderingContext2D,
  doc: IrisDoc,
  pageId: IrisDoc['pages'][number],
  alpha: number,
  ids?: ID[],
): void {
  const page = doc.pagesById[pageId];
  if (!page) return;
  const targets: IrisNode[] = ids
    ? ids.map((id) => doc.nodesById[id]).filter((n): n is IrisNode => !!n && n.visible)
    : page.nodeIds.map((id) => doc.nodesById[id]).filter((n): n is IrisNode => !!n && n.visible);
  for (const n of targets) drawNode(c, doc, n, alpha, IDENTITY);
}

function drawNode(
  c: CanvasRenderingContext2D,
  doc: IrisDoc,
  n: IrisNode,
  alpha: number,
  parentWorld: Mat,
): void {
  if (!n.visible) return;
  const ga = alpha * n.opacity;
  const local = nodeLocalMatrix(n);
  const world = mMul(parentWorld, local);
  c.save();
  c.transform(local.a, local.b, local.c, local.d, local.e, local.f);
  c.globalAlpha = ga;
  if (n.blend && n.blend !== 'normal') c.globalCompositeOperation = n.blend;
  if (n.blur > 0) {
    try {
      c.filter = `blur(${n.blur}px)`;
    } catch {
      /* canvas filters unsupported */
    }
  }

  const applyShadow = (): void => {
    if (n.shadow) {
      c.shadowColor = n.shadow.color;
      c.shadowOffsetX = n.shadow.x;
      c.shadowOffsetY = n.shadow.y;
      c.shadowBlur = n.shadow.blur;
    }
  };
  const clearShadow = (): void => {
    c.shadowColor = 'transparent';
    c.shadowBlur = 0;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
  };

  if (n.type === 'group') {
    for (const childId of n.children) {
      const child = doc.nodesById[childId];
      if (child) drawNode(c, doc, child, ga, world);
    }
    c.restore();
    return;
  }

  if (n.type === 'frame') {
    const framePaint = paintOf(c, n);
    if (framePaint && !outlineMode) {
      roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
      applyShadow();
      c.fillStyle = framePaint;
      c.fill();
      clearShadow();
    }
    if (n.clip) {
      roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
      c.clip();
    }
    for (const childId of n.children) {
      const child = doc.nodesById[childId];
      if (child) drawNode(c, doc, child, ga, world);
    }
    if (n.stroke && n.strokeWidth > 0) {
      roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
      c.strokeStyle = n.stroke;
      c.lineWidth = n.strokeWidth;
      const dash = dashArray(n.dash, n.strokeWidth);
      if (dash.length) c.setLineDash(dash);
      c.stroke();
      if (dash.length) c.setLineDash([]);
    }
    c.restore();
    return;
  }

  if (n.type === 'section') {
    // section: translucent backdrop + border + big label (children render on top
    // of the backdrop — sections never clip and never own children at draw time)
    roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
    if (!outlineMode) {
      applyShadow();
      c.fillStyle = paintOf(c, n) ?? 'rgba(136,136,136,0.10)';
      c.fill();
      clearShadow();
    }
    if (n.stroke && n.strokeWidth > 0) {
      roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
      c.strokeStyle = n.stroke;
      c.lineWidth = n.strokeWidth;
      const dash = dashArray(n.dash, n.strokeWidth);
      if (dash.length) c.setLineDash(dash);
      c.stroke();
      if (dash.length) c.setLineDash([]);
    }
    c.restore();
    return;
  }

  if (n.type === 'slice') {
    // slice: dashed editor-only marker with a diagonal cross (skipped on export)
    if (exportPass) {
      c.restore();
      return;
    }
    c.strokeStyle = n.stroke ?? '#F24822';
    c.lineWidth = 1;
    const dash = dashArray('dashed', 1);
    c.setLineDash(dash);
    c.strokeRect(0, 0, n.w, n.h);
    c.setLineDash([]);
    c.globalAlpha = ga * 0.5;
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(n.w, n.h);
    c.moveTo(n.w, 0);
    c.lineTo(0, n.h);
    c.stroke();
    c.globalAlpha = ga;
    c.restore();
    return;
  }

  switch (n.type) {
    case 'rect': {
      const p = new Path2D();
      const rr = Math.max(0, Math.min(n.cornerRadius, n.w / 2, n.h / 2));
      if (rr <= 0) p.rect(0, 0, n.w, n.h);
      else {
        p.moveTo(rr, 0);
        p.arcTo(n.w, 0, n.w, n.h, rr);
        p.arcTo(n.w, n.h, 0, n.h, rr);
        p.arcTo(0, n.h, 0, 0, rr);
        p.arcTo(0, 0, n.w, 0, rr);
        p.closePath();
      }
      applyShadow();
      paintPath(c, n, p);
      clearShadow();
      break;
    }
    case 'ellipse': {
      const p = new Path2D();
      p.ellipse(n.w / 2, n.h / 2, Math.abs(n.w / 2), Math.abs(n.h / 2), 0, 0, Math.PI * 2);
      applyShadow();
      paintPath(c, n, p);
      clearShadow();
      break;
    }
    case 'polygon':
    case 'star': {
      const p = regularPath2d(n);
      applyShadow();
      paintPath(c, n, p);
      clearShadow();
      break;
    }
    case 'line': {
      const p = new Path2D();
      if (n.flip) {
        p.moveTo(n.w, 0);
        p.lineTo(0, n.h);
      } else {
        p.moveTo(0, 0);
        p.lineTo(n.w, n.h);
      }
      c.strokeStyle = n.stroke ?? '#000000';
      c.lineWidth = Math.max(n.strokeWidth, 0.5);
      const dash = dashArray(n.dash, n.strokeWidth);
      if (dash.length) c.setLineDash(dash);
      c.stroke(p);
      if (dash.length) c.setLineDash([]);
      break;
    }
    case 'arrow': {
      const { shaft, heads } = arrowPath2d(n);
      c.strokeStyle = n.stroke ?? '#000000';
      c.lineWidth = Math.max(n.strokeWidth, 0.5);
      const dash = dashArray(n.dash, n.strokeWidth);
      if (dash.length) c.setLineDash(dash);
      c.stroke(shaft);
      if (dash.length) c.setLineDash([]);
      for (const head of heads) {
        c.fillStyle = n.stroke ?? '#000000';
        c.fill(head);
        c.stroke(head);
      }
      break;
    }
    case 'path': {
      const p = path2dForPoints(n.points, n.closed);
      applyShadow();
      paintPath(c, n, p);
      clearShadow();
      break;
    }
    case 'text': {
      const tm = textMetrics(n);
      c.font = fontString(n);
      try {
        (c as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${n.letterSpacing ?? 0}px`;
      } catch {
        /* not supported */
      }
      c.fillStyle = n.fill ?? '#000000';
      c.textBaseline = 'alphabetic';
      c.textAlign = n.textAlign === 'center' ? 'center' : n.textAlign === 'right' ? 'right' : 'left';
      const x = n.textAlign === 'center' ? n.w / 2 : n.textAlign === 'right' ? n.w : 0;
      const base = firstBaseline(n, tm.ascent, tm.descent);
      const lineH = n.fontSize * n.lineHeight;
      tm.lines.forEach((line, i) => {
        c.fillText(line, x, base + i * lineH);
        const width = c.measureText(line).width;
        const x0 = n.textAlign === 'center' ? x - width / 2 : n.textAlign === 'right' ? x - width : x;
        const y = base + i * lineH;
        if (n.underline) {
          c.fillRect(x0, y + n.fontSize * 0.08, width, Math.max(1, n.fontSize * 0.06));
        }
        if (n.strike) {
          c.fillRect(x0, y - n.fontSize * 0.32, width, Math.max(1, n.fontSize * 0.06));
        }
      });
      try {
        (c as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px';
      } catch {
        /* ignore */
      }
      break;
    }
    case 'image': {
      const img = n.src ? getImage(n.src) : null;
      if (img && !outlineMode) {
        if (n.cornerRadius > 0) {
          roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
          c.save();
          c.clip();
          c.drawImage(img, 0, 0, n.w, n.h);
          c.restore();
        } else {
          c.drawImage(img, 0, 0, n.w, n.h);
        }
      } else {
        c.strokeStyle = 'rgba(255,255,255,0.28)';
        c.lineWidth = 1 / ctxScale(c);
        c.setLineDash([6 * c.lineWidth, 4 * c.lineWidth]);
        c.strokeRect(0, 0, n.w, n.h);
        c.setLineDash([]);
        c.globalAlpha = ga * 0.5;
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(n.w, n.h);
        c.moveTo(n.w, 0);
        c.lineTo(0, n.h);
        c.stroke();
      }
      break;
    }
  }
  c.restore();
}

/** Draw a text node's lines with a custom transform (used by guides badge etc.). */
export function applyTextTransform(text: string, textCase: IrisNode['textCase']): string {
  return applyTextCase(text, textCase);
}

/* text metrics cache keyed by node identity */
const textCache = new WeakMap<
  IrisNode,
  { text: string; w: number; auto: boolean; family: string; size: number; spacing: number; tcase: string; metrics: ReturnType<typeof measureText> }
>();

function textMetrics(n: IrisNode): ReturnType<typeof measureText> {
  const cached = textCache.get(n);
  if (
    cached &&
    cached.text === n.text &&
    cached.w === n.w &&
    cached.auto === n.autoWidth &&
    cached.family === n.fontFamily &&
    cached.size === n.fontSize &&
    cached.spacing === n.letterSpacing &&
    cached.tcase === n.textCase
  ) {
    return cached.metrics;
  }
  const metrics = measureText(n);
  textCache.set(n, {
    text: n.text,
    w: n.w,
    auto: n.autoWidth,
    family: n.fontFamily,
    size: n.fontSize,
    spacing: n.letterSpacing,
    tcase: n.textCase,
    metrics,
  });
  return metrics;
}

/* ------------------------------------------------------------------ */
/* Main draw                                                           */
/* ------------------------------------------------------------------ */

function draw(): void {
  const s = useIris.getState();
  if (!canvas || !ctx) return;
  const c = ctx;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  const vp = s.viewport;
  const ox = s.viewFlags.rulers ? RULER : 0;
  const oy = s.viewFlags.rulers ? RULER : 0;

  outlineMode = !!s.viewFlags.outline;

  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.clearRect(0, 0, W, H);
  const bg = /^#[0-9a-fA-F]{3,8}$/.test(s.doc.settings?.bg ?? '') ? s.doc.settings.bg : DEFAULT_CANVAS_BG;
  c.fillStyle = bg;
  c.fillRect(0, 0, W, H);

  // world layer
  c.save();
  c.translate(ox + vp.x, oy + vp.y);
  c.scale(vp.zoom, vp.zoom);
  drawNodes(c, s.doc, s.currentPageId, 1);
  c.restore();

  // pixel grid
  if (s.viewFlags.pixelGrid && vp.zoom >= 8) {
    const view = visibleWorldRect(vp, W, H, ox, oy);
    c.strokeStyle = vp.zoom >= 32 ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)';
    c.lineWidth = 1;
    c.beginPath();
    for (let x = Math.ceil(view.x); x <= view.x + view.w; x++) {
      const sx = Math.round(x * vp.zoom + vp.x + ox) + 0.5;
      c.moveTo(sx, oy);
      c.lineTo(sx, H);
    }
    for (let y = Math.ceil(view.y); y <= view.y + view.h; y++) {
      const sy = Math.round(y * vp.zoom + vp.y + oy) + 0.5;
      c.moveTo(ox, sy);
      c.lineTo(W, sy);
    }
    c.stroke();
  }

  // layout grid
  const grid = s.doc.settings?.grid;
  if (grid?.show && grid.size >= 1 && vp.zoom * grid.size >= 4) {
    const view = visibleWorldRect(vp, W, H, ox, oy);
    c.strokeStyle = 'rgba(255,255,255,0.07)';
    c.lineWidth = 1;
    c.beginPath();
    for (let x = Math.ceil(view.x / grid.size) * grid.size; x <= view.x + view.w; x += grid.size) {
      const sx = Math.round(x * vp.zoom + vp.x + ox) + 0.5;
      c.moveTo(sx, oy);
      c.lineTo(sx, H);
    }
    for (let y = Math.ceil(view.y / grid.size) * grid.size; y <= view.y + view.h; y += grid.size) {
      const sy = Math.round(y * vp.zoom + vp.y + oy) + 0.5;
      c.moveTo(ox, sy);
      c.lineTo(W, sy);
    }
    c.stroke();
  }

  // overlay layer (content-space coords: includes vp pan, not ruler origin)
  c.save();
  c.translate(ox, oy);
  drawOverlay(c, s, W - ox, H - oy);
  c.restore();

  if (s.viewFlags.rulers) drawRulers(c, s, W, H, ox, oy);

  // frame labels (screen space, above everything except rulers)
  drawFrameLabels(c, s, ox, oy, W, H);
}

function drawOverlay(c: CanvasRenderingContext2D, s: ReturnType<typeof useIris.getState>, W: number, H: number): void {
  const vp = s.viewport;
  const doc = s.doc;
  const toScreen = (p: Vec): Vec => worldToScreen(vp, p.x, p.y);

  const page = doc.pagesById[s.currentPageId];

  // empty page hint
  if (page && page.nodeIds.length === 0 && !overlay.penDraft) {
    c.fillStyle = '#5F5F5F';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.font = '600 13px Inter, system-ui, sans-serif';
    c.fillText('Nothing here yet', W / 2, H / 2 - 16);
    c.font = '12px Inter, system-ui, sans-serif';
    c.fillStyle = '#4E4E4E';
    c.fillText(
      'Press F for a frame · R rectangle · O ellipse · T text · P pen · Shift+P pencil · C comment',
      W / 2,
      H / 2 + 8,
    );
    c.textAlign = 'left';
    c.textBaseline = 'alphabetic';
  }

  // ruler guides
  const guides = doc.settings ?? { guidesX: [], guidesY: [] };
  if (guides.guidesX?.length || guides.guidesY?.length) {
    c.strokeStyle = GUIDE_COLOR;
    c.lineWidth = 1;
    c.setLineDash([]);
    for (const gx of guides.guidesX ?? []) {
      const x = Math.round(gx * vp.zoom + vp.x) + 0.5;
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x, H);
      c.stroke();
    }
    for (const gy of guides.guidesY ?? []) {
      const y = Math.round(gy * vp.zoom + vp.y) + 0.5;
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(W, y);
      c.stroke();
    }
  }
  // guide drag preview
  if (overlay.guideDrag) {
    c.strokeStyle = GUIDE_COLOR;
    c.lineWidth = 1;
    c.beginPath();
    if (overlay.guideDrag.axis === 'x') {
      const x = Math.round(overlay.guideDrag.at * vp.zoom + vp.x) + 0.5;
      c.moveTo(x, 0);
      c.lineTo(x, H);
    } else {
      const y = Math.round(overlay.guideDrag.at * vp.zoom + vp.y) + 0.5;
      c.moveTo(0, y);
      c.lineTo(W, y);
    }
    c.stroke();
  }

  // hover outline
  const hover = s.hoverId ? doc.nodesById[s.hoverId] : undefined;
  if (
    hover &&
    s.tool === 'move' &&
    !s.selection.includes(hover.id) &&
    !overlay.marquee &&
    !s.editingTextId &&
    !s.editingPathId
  ) {
    drawNodeOutline(c, doc, hover, vp, 'rgba(255,255,255,0.5)', 1);
  }

  // selection outlines
  for (const id of s.selection) {
    const n = doc.nodesById[id];
    if (n) drawNodeOutline(c, doc, n, vp, ACCENT, 1.5);
  }

  // selection handles
  if (
    s.selection.length > 0 &&
    (s.tool === 'move' || s.tool === 'scale') &&
    !s.editingTextId &&
    !s.editingPathId
  ) {
    const geo = selectionHandleGeometry(doc, s.selection, vp);
    if (geo) {
      // box
      c.strokeStyle = ACCENT;
      c.lineWidth = 1;
      if (geo.poly) {
        c.beginPath();
        geo.poly.forEach((p, i) => (i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)));
        c.closePath();
        c.stroke();
      } else {
        c.strokeRect(geo.rect.x, geo.rect.y, geo.rect.w, geo.rect.h);
      }
      // rotation handle (move tool only)
      if (s.tool === 'move') {
      const topMid = geo.pts.find((p) => p.kind === 'n')!;
      c.beginPath();
      c.moveTo(topMid.x, topMid.y);
      c.lineTo(geo.rot.x, geo.rot.y);
      c.stroke();
      c.beginPath();
      c.arc(geo.rot.x, geo.rot.y, 4, 0, Math.PI * 2);
      c.fillStyle = '#FFFFFF';
      c.fill();
      c.strokeStyle = ACCENT;
      c.stroke();
      }
      // handles (scale tool: corners only)
      for (const p of geo.pts) {
        if (s.tool === 'scale' && !(p.kind === 'nw' || p.kind === 'ne' || p.kind === 'sw' || p.kind === 'se')) continue;
        c.fillStyle = '#FFFFFF';
        c.strokeStyle = ACCENT;
        c.lineWidth = 1;
        c.beginPath();
        c.rect(p.x - 3.75, p.y - 3.75, 7.5, 7.5);
        c.fill();
        c.stroke();
      }
    }
  }

  // path edit mode
  if (s.editingPathId) {
    const n = doc.nodesById[s.editingPathId];
    if (n && n.type === 'path') {
      const m = nodeWorldMatrix(doc, n);
      const active = overlay.pathEdit?.activePoint ?? null;
      n.points.forEach((p, i) => {
        const pos = toScreen(mApply(m, p.x, p.y));
        const isActive = i === active;
        c.fillStyle = isActive ? ACCENT : '#FFFFFF';
        c.strokeStyle = ACCENT;
        c.lineWidth = 1;
        c.beginPath();
        c.rect(pos.x - 3.5, pos.y - 3.5, 7, 7);
        c.fill();
        c.stroke();
        if (isActive && (p.hx !== 0 || p.hy !== 0)) {
          const out = toScreen(mApply(m, p.x + p.hx, p.y + p.hy));
          const inn = toScreen(mApply(m, p.x - p.hx, p.y - p.hy));
          c.strokeStyle = 'rgba(255,255,255,0.7)';
          c.beginPath();
          c.moveTo(inn.x, inn.y);
          c.lineTo(pos.x, pos.y);
          c.lineTo(out.x, out.y);
          c.stroke();
          for (const h of [inn, out]) {
            c.beginPath();
            c.arc(h.x, h.y, 3, 0, Math.PI * 2);
            c.fillStyle = ACCENT;
            c.fill();
          }
        }
      });
    }
  }

  // snap guides
  if (overlay.guides.length > 0) {
    c.strokeStyle = SNAP;
    c.lineWidth = 1;
    for (const g of overlay.guides) {
      c.beginPath();
      if (g.axis === 'x') {
        const x = Math.round(g.at * vp.zoom + vp.x) + 0.5;
        const y1 = g.from * vp.zoom + vp.y;
        const y2 = g.to * vp.zoom + vp.y;
        c.moveTo(x, y1);
        c.lineTo(x, y2);
        c.moveTo(x - 3, y1);
        c.lineTo(x + 3, y1);
        c.moveTo(x - 3, y2);
        c.lineTo(x + 3, y2);
      } else {
        const y = Math.round(g.at * vp.zoom + vp.y) + 0.5;
        const x1 = g.from * vp.zoom + vp.x;
        const x2 = g.to * vp.zoom + vp.x;
        c.moveTo(x1, y);
        c.lineTo(x2, y);
        c.moveTo(x1, y - 3);
        c.lineTo(x1, y + 3);
        c.moveTo(x2, y - 3);
        c.lineTo(x2, y + 3);
      }
      c.stroke();
    }
  }

  // size badge during resize / draw
  if (overlay.dragBadge) {
    const b = overlay.dragBadge;
    const p = toScreen({ x: b.x, y: b.y });
    const label = `${Math.round(b.w)} × ${Math.round(b.h)}`;
    c.font = '600 11px Inter, system-ui, sans-serif';
    const tw = c.measureText(label).width;
    let bx = p.x;
    let by = p.y - 26;
    if (by < 4) by = p.y + 8;
    if (bx < 4) bx = 4;
    if (bx + tw + 12 > W) bx = W - tw - 16;
    c.fillStyle = ACCENT;
    roundRectPath(c, bx, by, tw + 12, 18, 4);
    c.fill();
    c.fillStyle = '#FFFFFF';
    c.textBaseline = 'middle';
    c.fillText(label, bx + 6, by + 9.5);
    c.textBaseline = 'alphabetic';
  }

  // draw-tool preview
  if (overlay.drawPreview) {
    const dp = overlay.drawPreview;
    const p1 = toScreen({ x: dp.rect.x, y: dp.rect.y });
    const p2 = toScreen({ x: dp.rect.x + dp.rect.w, y: dp.rect.y + dp.rect.h });
    const x = Math.min(p1.x, p2.x);
    const y = Math.min(p1.y, p2.y);
    const w = Math.abs(p2.x - p1.x);
    const h = Math.abs(p2.y - p1.y);
    c.strokeStyle = ACCENT;
    c.lineWidth = 1;
    if ((dp.type === 'line' || dp.type === 'arrow') && dp.diagonal) {
      const a = toScreen({ x: dp.diagonal.x1, y: dp.diagonal.y1 });
      const b = toScreen({ x: dp.diagonal.x2, y: dp.diagonal.y2 });
      c.beginPath();
      c.moveTo(a.x, a.y);
      c.lineTo(b.x, b.y);
      c.stroke();
    } else if (dp.type === 'ellipse') {
      c.beginPath();
      c.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      c.stroke();
    } else if (dp.type === 'frame' || dp.type === 'section') {
      c.fillStyle = 'rgba(255,255,255,0.08)';
      c.fillRect(x, y, w, h);
      c.strokeRect(x, y, w, h);
    } else if (dp.type === 'slice') {
      c.setLineDash([5, 4]);
      c.strokeRect(x, y, w, h);
      c.setLineDash([]);
      c.globalAlpha *= 0.5;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + w, y + h);
      c.moveTo(x + w, y);
      c.lineTo(x, y + h);
      c.stroke();
      c.globalAlpha /= 0.5;
    } else if (dp.type === 'text') {
      c.setLineDash([4, 3]);
      c.strokeRect(x, y, Math.max(w, 2), Math.max(h, 16));
      c.setLineDash([]);
    } else if (dp.type === 'star' || dp.type === 'polygon') {
      c.beginPath();
      const k = dp.type === 'star' ? 10 : 6;
      const rx = w / 2;
      const ry = h / 2;
      for (let i = 0; i < k; i++) {
        const r = dp.type === 'star' && i % 2 === 1 ? 0.45 : 1;
        const a = -Math.PI / 2 + (i * Math.PI) / (k / 2);
        const px = x + rx + rx * r * Math.cos(a);
        const py = y + ry + ry * r * Math.sin(a);
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.stroke();
    } else {
      c.strokeRect(x, y, w, h);
    }
  }

  // marquee
  if (overlay.marquee) {
    const r = overlay.marquee;
    const p1 = toScreen({ x: r.x, y: r.y });
    const p2 = toScreen({ x: r.x + r.w, y: r.y + r.h });
    const x = Math.min(p1.x, p2.x);
    const y = Math.min(p1.y, p2.y);
    c.fillStyle = 'rgba(139,92,246,0.08)';
    c.fillRect(x, y, Math.abs(p2.x - p1.x), Math.abs(p2.y - p1.y));
    c.strokeStyle = ACCENT;
    c.lineWidth = 1;
    c.strokeRect(x, y, Math.abs(p2.x - p1.x), Math.abs(p2.y - p1.y));
  }

  // eyedropper magnifier
  if (s.tool === 'eyedropper' && overlay.pointerWorld) {
    const p = toScreen(overlay.pointerWorld);
    c.strokeStyle = ACCENT;
    c.lineWidth = 1;
    roundRectPath(c, p.x + 12, p.y - 16, 64, 22, 4);
    c.fillStyle = '#1E1E1E';
    c.fill();
    c.stroke();
    c.fillStyle = overlay.pickedColor ?? '#FFFFFF';
    c.fillRect(p.x + 16, p.y - 12, 14, 14);
    c.fillStyle = '#FFFFFF';
    c.font = '600 10px Inter, system-ui, sans-serif';
    c.textBaseline = 'middle';
    c.fillText(overlay.pickedColor ?? '#—', p.x + 34, p.y - 5);
    c.textBaseline = 'alphabetic';
  }

  // auto-layout guides (rose): gaps + padding of a selected layout frame,
  // and the reorder insertion bar while dragging children
  drawLayoutGuides(c, s, toScreen);

  // pen draft
  if (overlay.penDraft && overlay.penDraft.points.length > 0) {
    const draft = overlay.penDraft;
    c.save();
    c.translate(vp.x, vp.y);
    c.scale(vp.zoom, vp.zoom);
    const p = path2dForPoints(draft.points, false);
    c.strokeStyle = ACCENT;
    c.lineWidth = 1.5 / vp.zoom;
    c.stroke(p);
    if (draft.cursor && !draft.dragging) {
      const last = draft.points[draft.points.length - 1];
      c.setLineDash([4 / vp.zoom, 3 / vp.zoom]);
      c.beginPath();
      c.moveTo(last.x, last.y);
      c.lineTo(draft.cursor.x, draft.cursor.y);
      c.stroke();
      c.setLineDash([]);
    }
    // handles of last point while dragging
    if (draft.dragging) {
      const last = draft.points[draft.points.length - 1];
      if (last.hx !== 0 || last.hy !== 0) {
        c.strokeStyle = 'rgba(255,255,255,0.7)';
        c.lineWidth = 1 / vp.zoom;
        c.beginPath();
        c.moveTo(last.x - last.hx, last.y - last.hy);
        c.lineTo(last.x, last.y);
        c.lineTo(last.x + last.hx, last.y + last.hy);
        c.stroke();
      }
    }
    c.restore();
    // points in screen space
    draft.points.forEach((p, i) => {
      const pos = toScreen(p);
      if (i === 0) {
        // close-path target
        c.strokeStyle = ACCENT;
        c.lineWidth = 1.5;
        c.beginPath();
        c.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
        c.stroke();
        const near =
          draft.cursor && Math.hypot(draft.cursor.x - p.x, draft.cursor.y - p.y) * vp.zoom < 10;
        if (near) {
          c.fillStyle = ACCENT;
          c.fill();
        }
      }
      c.fillStyle = i === draft.points.length - 1 ? ACCENT : '#FFFFFF';
      c.strokeStyle = ACCENT;
      c.lineWidth = 1;
      c.beginPath();
      c.rect(pos.x - 3.5, pos.y - 3.5, 7, 7);
      c.fill();
      c.stroke();
    });
  }

  // pencil (freehand) draft stroke
  if (overlay.pencilDraft && overlay.pencilDraft.length > 1) {
    const pts = overlay.pencilDraft;
    c.save();
    c.translate(vp.x, vp.y);
    c.scale(vp.zoom, vp.zoom);
    c.strokeStyle = ACCENT;
    c.lineWidth = 1.5 / vp.zoom;
    c.lineJoin = 'round';
    c.lineCap = 'round';
    c.beginPath();
    pts.forEach((p, i) => (i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)));
    c.stroke();
    c.restore();
  }
}

function drawNodeOutline(
  c: CanvasRenderingContext2D,
  doc: IrisDoc,
  n: IrisNode,
  vp: { x: number; y: number; zoom: number },
  color: string,
  width: number,
): void {
  const m = nodeWorldMatrix(doc, n);
  const corners = [
    mApply(m, 0, 0),
    mApply(m, n.w, 0),
    mApply(m, n.w, n.h),
    mApply(m, 0, n.h),
  ].map((p) => worldToScreen(vp, p.x, p.y));
  c.strokeStyle = color;
  c.lineWidth = width;
  c.beginPath();
  corners.forEach((p, i) => (i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y)));
  c.closePath();
  c.stroke();
}

/* ------------------------------------------------------------------ */
/* Auto-layout guides (Figma rose)                                     */
/* ------------------------------------------------------------------ */

const ROSE = '#FF2472';

/** rose distance annotation: line + arrowheads + value label */
function roseMeasure(
  c: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  label: string,
): void {
  const horiz = Math.abs(x2 - x1) >= Math.abs(y2 - y1);
  c.strokeStyle = ROSE;
  c.fillStyle = ROSE;
  c.lineWidth = 1;
  c.setLineDash([]);
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
  // arrowheads
  const ah = 3.5;
  c.beginPath();
  if (horiz) {
    const d = x2 >= x1 ? 1 : -1;
    c.moveTo(x1, y1);
    c.lineTo(x1 + d * ah, y1 - ah * 0.6);
    c.lineTo(x1 + d * ah, y1 + ah * 0.6);
    c.closePath();
    c.moveTo(x2, y2);
    c.lineTo(x2 - d * ah, y2 - ah * 0.6);
    c.lineTo(x2 - d * ah, y2 + ah * 0.6);
    c.closePath();
  } else {
    const d = y2 >= y1 ? 1 : -1;
    c.moveTo(x1, y1);
    c.lineTo(x1 - ah * 0.6, y1 + d * ah);
    c.lineTo(x1 + ah * 0.6, y1 + d * ah);
    c.closePath();
    c.moveTo(x2, y2);
    c.lineTo(x2 - ah * 0.6, y2 - d * ah);
    c.lineTo(x2 + ah * 0.6, y2 - d * ah);
    c.closePath();
  }
  c.fill();
  // label pill
  c.font = '600 9px Inter, system-ui, sans-serif';
  const tw = c.measureText(label).width;
  const padX = 4;
  const bw = tw + padX * 2;
  const bh = 13;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;
  const bx = cx - bw / 2;
  const by = cy - bh / 2;
  c.fillStyle = '#1E1E1E';
  roundRectPath(c, bx, by, bw, bh, 3);
  c.fill();
  c.strokeStyle = ROSE;
  c.lineWidth = 1;
  c.stroke();
  c.fillStyle = ROSE;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText(label, cx, cy + 0.5);
  c.textAlign = 'left';
  c.textBaseline = 'alphabetic';
}

/** Gap + padding annotations for a selected auto-layout frame and the
 *  rose insertion bar during a reorder drag. */
function drawLayoutGuides(
  c: CanvasRenderingContext2D,
  s: ReturnType<typeof useIris.getState>,
  toScreen: (p: Vec) => Vec,
): void {
  const doc = s.doc;
  const vp = s.viewport;

  // insertion bar during a reorder drag
  const ld = overlay.layoutDrag;
  if (ld) {
    const frame = doc.nodesById[ld.frameId];
    if (frame?.layout) {
      const horiz = frame.layout.mode === 'horizontal';
      const others = frame.children
        .filter((id) => !ld.ids.includes(id))
        .map((id) => doc.nodesById[id])
        .filter((n): n is IrisNode => !!n);
      const m = nodeWorldMatrix(doc, frame);
      const tl = toScreen(mApply(m, 0, 0));
      const br = toScreen(mApply(m, frame.w, frame.h));
      const pad = frame.layout.padding;
      const padL = toScreen(mApply(m, pad.left, 0));
      const padT = toScreen(mApply(m, 0, pad.top));
      const padR = toScreen(mApply(m, frame.w - pad.right, 0));
      const padB = toScreen(mApply(m, 0, frame.h - pad.bottom));
      let a: number;
      let b: number;
      if (ld.index <= 0) {
        a = horiz ? padL.x : padT.y;
        b = a;
      } else if (ld.index >= others.length) {
        a = horiz ? padR.x : padB.y;
        b = a;
      } else {
        const prev = others[ld.index - 1];
        const pm = nodeWorldMatrix(doc, prev);
        const pEdge = horiz ? toScreen(mApply(pm, prev.w, 0)).x : toScreen(mApply(pm, 0, prev.h)).y;
        const next = others[ld.index];
        const nm = nodeWorldMatrix(doc, next);
        const nEdge = horiz ? toScreen(mApply(nm, 0, 0)).x : toScreen(mApply(nm, 0, 0)).y;
        a = pEdge;
        b = nEdge;
      }
      c.fillStyle = ROSE;
      if (horiz) {
        const x = (a + b) / 2;
        c.globalAlpha = 0.9;
        roundRectPath(c, x - 1.5, tl.y + 2, 3, Math.max(4, br.y - tl.y - 4), 1.5);
        c.fill();
        c.globalAlpha = 1;
      } else {
        const y = (a + b) / 2;
        c.globalAlpha = 0.9;
        roundRectPath(c, tl.x + 2, y - 1.5, Math.max(4, br.x - tl.x - 4), 3, 1.5);
        c.fill();
        c.globalAlpha = 1;
      }
    }
  }

  // spacing annotations when a single layout frame is selected
  if (s.selection.length !== 1) return;
  const frame = doc.nodesById[s.selection[0]];
  if (!frame || !frame.layout || s.editingTextId) return;
  if (vp.zoom < 0.2) return;
  const L = frame.layout;
  const horiz = L.mode === 'horizontal';
  const kids = frame.children
    .map((id) => doc.nodesById[id])
    .filter((n): n is IrisNode => !!n && n.visible !== false);
  if (kids.length === 0) return;

  const m = nodeWorldMatrix(doc, frame);
  const corners = [toScreen(mApply(m, 0, 0)), toScreen(mApply(m, frame.w, frame.h))];
  const kidBoxes = kids.map((k) => {
    const km = nodeWorldMatrix(doc, k);
    return {
      tl: toScreen(mApply(km, 0, 0)),
      br: toScreen(mApply(km, k.w, k.h)),
    };
  });

  // gap annotations between adjacent children along the main axis
  for (let i = 1; i < kids.length; i++) {
    const A = kidBoxes[i - 1];
    const B = kidBoxes[i];
    const gapPx = horiz ? B.tl.x - A.br.x : B.tl.y - A.br.y;
    if (gapPx < 3) continue;
    const midY = (Math.max(A.tl.y, B.tl.y) + Math.min(A.br.y, B.br.y)) / 2;
    const midX = (Math.max(A.tl.x, B.tl.x) + Math.min(A.br.x, B.br.x)) / 2;
    if (horiz) roseMeasure(c, A.br.x, midY, B.tl.x, midY, String(Math.round(L.gap)));
    else roseMeasure(c, midX, A.br.y, midX, B.tl.y, String(Math.round(L.gap)));
  }

  // padding annotations on the inner edges
  const pad = L.padding;
  const contentL = Math.min(...kidBoxes.map((b) => b.tl.x));
  const contentT = Math.min(...kidBoxes.map((b) => b.tl.y));
  const contentR = Math.max(...kidBoxes.map((b) => b.br.x));
  const contentB = Math.max(...kidBoxes.map((b) => b.br.y));
  const midCx = (contentL + contentR) / 2;
  const midCy = (contentT + contentB) / 2;
  if (pad.top > 0 && contentT - corners[0].y >= 3)
    roseMeasure(c, midCx, corners[0].y, midCx, contentT, String(Math.round(pad.top)));
  if (pad.bottom > 0 && corners[1].y - contentB >= 3)
    roseMeasure(c, midCx, corners[1].y, midCx, contentB, String(Math.round(pad.bottom)));
  if (pad.left > 0 && contentL - corners[0].x >= 3)
    roseMeasure(c, corners[0].x, midCy, contentL, midCy, String(Math.round(pad.left)));
  if (pad.right > 0 && corners[1].x - contentR >= 3)
    roseMeasure(c, corners[1].x, midCy, contentR, midCy, String(Math.round(pad.right)));
}

/* ------------------------------------------------------------------ */
/* Rulers                                                              */
/* ------------------------------------------------------------------ */

function niceStep(minPx: number, zoom: number): number {
  const raw = minPx / zoom;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const mult of [1, 2, 5, 10]) {
    if (mult * pow >= raw) return mult * pow;
  }
  return 10 * pow;
}

function fmtTick(v: number): string {
  const r = Math.round(v * 100) / 100;
  return String(r);
}

function drawRulers(
  c: CanvasRenderingContext2D,
  s: ReturnType<typeof useIris.getState>,
  W: number,
  H: number,
  ox: number,
  oy: number,
): void {
  const vp = s.viewport;
  c.fillStyle = RULER_BG;
  c.fillRect(0, 0, W, RULER);
  c.fillRect(0, 0, RULER, H);
  c.strokeStyle = RULER_BORDER;
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(0, RULER - 0.5);
  c.lineTo(W, RULER - 0.5);
  c.moveTo(RULER - 0.5, 0);
  c.lineTo(RULER - 0.5, H);
  c.stroke();

  const step = niceStep(60, vp.zoom);
  const x0 = screenToWorld(vp, ox, 0).x;
  const x1 = screenToWorld(vp, W, 0).x;
  const y0 = screenToWorld(vp, 0, oy).y;
  const y1 = screenToWorld(vp, 0, H).y;

  c.font = '9px Inter, system-ui, sans-serif';
  c.fillStyle = RULER_TEXT;
  c.strokeStyle = RULER_TEXT;
  c.textBaseline = 'alphabetic';
  c.textAlign = 'left';

  c.beginPath();
  for (let x = Math.ceil(x0 / step) * step; x <= x1; x += step) {
    const sx = Math.round(x * vp.zoom + vp.x + ox) + 0.5;
    c.moveTo(sx, RULER - 5);
    c.lineTo(sx, RULER);
    c.fillText(fmtTick(x), sx + 3, RULER - 7);
  }
  for (let y = Math.ceil(y0 / step) * step; y <= y1; y += step) {
    const sy = Math.round(y * vp.zoom + vp.y + oy) + 0.5;
    c.moveTo(RULER - 5, sy);
    c.lineTo(RULER, sy);
    c.save();
    c.translate(RULER - 7, sy + 3);
    c.rotate(-Math.PI / 2);
    c.fillText(fmtTick(y), 0, 0);
    c.restore();
  }
  c.stroke();

  // selection extent bands
  if (s.selection.length > 0) {
    const box = boundsOfNodes(s.doc, s.selection);
    if (box) {
      const sx1 = box.x * vp.zoom + vp.x + ox;
      const sx2 = (box.x + box.w) * vp.zoom + vp.x + ox;
      const sy1 = box.y * vp.zoom + vp.y + oy;
      const sy2 = (box.y + box.h) * vp.zoom + vp.y + oy;
      c.fillStyle = 'rgba(139,92,246,0.35)';
      c.fillRect(sx1, RULER - 3, sx2 - sx1, 3);
      c.fillRect(RULER - 3, sy1, 3, sy2 - sy1);
    }
  }

  // guide markers on rulers
  const guides = s.doc.settings;
  if (guides) {
    c.fillStyle = GUIDE_COLOR;
    for (const gx of guides.guidesX ?? []) {
      const px = Math.round(gx * vp.zoom + vp.x + ox) + 0.5;
      c.beginPath();
      c.moveTo(px, RULER - 8);
      c.lineTo(px - 4, RULER - 1);
      c.lineTo(px + 4, RULER - 1);
      c.closePath();
      c.fill();
    }
    for (const gy of guides.guidesY ?? []) {
      const py = Math.round(gy * vp.zoom + vp.y + oy) + 0.5;
      c.beginPath();
      c.moveTo(RULER - 8, py);
      c.lineTo(RULER - 1, py - 4);
      c.lineTo(RULER - 1, py + 4);
      c.closePath();
      c.fill();
    }
  }

  // pointer marker
  if (overlay.pointerWorld) {
    const px = overlay.pointerWorld.x * vp.zoom + vp.x + ox;
    const py = overlay.pointerWorld.y * vp.zoom + vp.y + oy;
    c.strokeStyle = '#9A9A9A';
    c.beginPath();
    c.moveTo(Math.round(px) + 0.5, 0);
    c.lineTo(Math.round(px) + 0.5, RULER);
    c.moveTo(0, Math.round(py) + 0.5);
    c.lineTo(RULER, Math.round(py) + 0.5);
    c.stroke();
  }
}

/* ------------------------------------------------------------------ */
/* Frame labels                                                        */
/* ------------------------------------------------------------------ */

function drawFrameLabels(
  c: CanvasRenderingContext2D,
  s: ReturnType<typeof useIris.getState>,
  ox: number,
  oy: number,
  W: number,
  H: number,
): void {
  const vp = s.viewport;
  const page = s.doc.pagesById[s.currentPageId];
  if (!page) return;
  c.textAlign = 'left';
  for (const id of page.nodeIds) {
    const n = s.doc.nodesById[id];
    if (!n || !n.visible) continue;
    const box = nodeWorldAABB(s.doc, n);
    const x = box.x * vp.zoom + vp.x + ox;
    const y = box.y * vp.zoom + vp.y + oy;
    if (x > W || y > H || x + box.w * vp.zoom < 0) continue;
    if (n.type === 'frame') {
      if (y < RULER + 14) continue;
      c.font = '11px Inter, system-ui, sans-serif';
      c.fillStyle = s.selection.includes(id) ? ACCENT_LIGHT : '#8A8A8A';
      c.fillText(n.name, x, y - 6);
    } else if (n.type === 'section') {
      // big section label, inside the top-left corner
      const fs = Math.max(12, Math.min(18, 14 * vp.zoom));
      c.font = `600 ${fs}px Inter, system-ui, sans-serif`;
      c.fillStyle = s.selection.includes(id) ? ACCENT_LIGHT : 'rgba(214,214,214,0.85)';
      c.fillText(n.name, x + 16 * vp.zoom, y + 26 * vp.zoom);
    }
  }
}
