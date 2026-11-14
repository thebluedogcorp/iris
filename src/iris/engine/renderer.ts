/**
 * Iris canvas renderer: scene draw pass + selection overlay + snap guides +
 * rulers + pixel grid. Framework-agnostic; redraws are scheduled via
 * requestDraw() from store subscriptions and tool interactions.
 */

import { ID, IrisDoc, IrisNode } from './model';
import {
  Rect,
  RULER,
  Vec,
  boundsOfNodes,
  firstBaseline,
  fontString,
  mApply,
  measureText,
  nodeWorldAABB,
  nodeWorldMatrix,
  path2dForPoints,
  screenToWorld,
  selectionHandleGeometry,
  visibleWorldRect,
  worldToScreen,
} from './geometry';
import { overlay } from './overlay';
import { useIris } from './store';
import { getImage, onImageCacheChange } from './imageCache';

export const ACCENT = '#8B5CF6';
export const ACCENT_LIGHT = '#C4B5FD';
const SNAP = '#FF3B30';
const CANVAS_BG = '#242424';
const RULER_BG = '#1E1E1E';
const RULER_BORDER = '#3E3E3E';
const RULER_TEXT = '#7A7A7A';

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let raf = 0;

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

/** Draw a set of nodes (world transform assumed applied on ctx). */
export function drawNodes(
  c: CanvasRenderingContext2D,
  doc: IrisDoc,
  pageId: ID,
  alpha: number,
  ids?: ID[],
): void {
  const page = doc.pagesById[pageId];
  if (!page) return;
  const targets: IrisNode[] = ids
    ? ids.map((id) => doc.nodesById[id]).filter((n): n is IrisNode => !!n && n.visible)
    : page.nodeIds.map((id) => doc.nodesById[id]).filter((n): n is IrisNode => !!n && n.visible);
  for (const n of targets) drawNode(c, doc, n, alpha);
}

function drawNode(c: CanvasRenderingContext2D, doc: IrisDoc, n: IrisNode, alpha: number): void {
  if (!n.visible) return;
  const ga = alpha * n.opacity;
  const m = nodeWorldMatrix(doc, n);
  c.save();
  c.transform(m.a, m.b, m.c, m.d, m.e, m.f);
  c.globalAlpha = ga;

  if (n.type === 'group') {
    for (const childId of n.children) {
      const child = doc.nodesById[childId];
      if (child) drawNode(c, doc, child, ga);
    }
    c.restore();
    return;
  }

  if (n.type === 'frame') {
    if (n.fill) {
      roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
      c.fillStyle = n.fill;
      c.fill();
    }
    if (n.clip) {
      roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
      c.clip();
    }
    for (const childId of n.children) {
      const child = doc.nodesById[childId];
      if (child) drawNode(c, doc, child, ga);
    }
    if (n.stroke && n.strokeWidth > 0) {
      roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
      c.strokeStyle = n.stroke;
      c.lineWidth = n.strokeWidth;
      c.stroke();
    }
    c.restore();
    return;
  }

  switch (n.type) {
    case 'rect': {
      roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
      if (n.fill) {
        c.fillStyle = n.fill;
        c.fill();
      }
      if (n.stroke && n.strokeWidth > 0) {
        c.strokeStyle = n.stroke;
        c.lineWidth = n.strokeWidth;
        c.stroke();
      }
      break;
    }
    case 'ellipse': {
      c.beginPath();
      c.ellipse(n.w / 2, n.h / 2, Math.abs(n.w / 2), Math.abs(n.h / 2), 0, 0, Math.PI * 2);
      if (n.fill) {
        c.fillStyle = n.fill;
        c.fill();
      }
      if (n.stroke && n.strokeWidth > 0) {
        c.strokeStyle = n.stroke;
        c.lineWidth = n.strokeWidth;
        c.stroke();
      }
      break;
    }
    case 'line': {
      c.beginPath();
      if (n.flip) {
        c.moveTo(n.w, 0);
        c.lineTo(0, n.h);
      } else {
        c.moveTo(0, 0);
        c.lineTo(n.w, n.h);
      }
      c.strokeStyle = n.stroke ?? '#000000';
      c.lineWidth = Math.max(n.strokeWidth, 0.5);
      c.stroke();
      break;
    }
    case 'path': {
      const p = path2dForPoints(n.points, n.closed);
      if (n.fill) {
        c.fillStyle = n.fill;
        c.fill(p);
      }
      if (n.stroke && n.strokeWidth > 0) {
        c.strokeStyle = n.stroke;
        c.lineWidth = n.strokeWidth;
        c.stroke(p);
      }
      break;
    }
    case 'text': {
      const tm = textMetrics(n);
      c.font = fontString(n);
      c.fillStyle = n.fill ?? '#000000';
      c.textBaseline = 'alphabetic';
      c.textAlign = n.textAlign === 'center' ? 'center' : n.textAlign === 'right' ? 'right' : 'left';
      const x = n.textAlign === 'center' ? n.w / 2 : n.textAlign === 'right' ? n.w : 0;
      const base = firstBaseline(n, tm.ascent, tm.descent);
      const lineH = n.fontSize * n.lineHeight;
      tm.lines.forEach((line, i) => {
        c.fillText(line, x, base + i * lineH);
      });
      break;
    }
    case 'image': {
      const img = n.src ? getImage(n.src) : null;
      if (img) {
        c.drawImage(img, 0, 0, n.w, n.h);
      } else {
        c.strokeStyle = 'rgba(255,255,255,0.28)';
        c.lineWidth = 1 / useIris.getState().viewport.zoom;
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

/* text metrics cache keyed by node identity */
const textCache = new WeakMap<
  IrisNode,
  { text: string; w: number; auto: boolean; family: string; size: number; metrics: ReturnType<typeof measureText> }
>();

function textMetrics(n: IrisNode): ReturnType<typeof measureText> {
  const cached = textCache.get(n);
  if (
    cached &&
    cached.text === n.text &&
    cached.w === n.w &&
    cached.auto === n.autoWidth &&
    cached.family === n.fontFamily &&
    cached.size === n.fontSize
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

  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.clearRect(0, 0, W, H);
  c.fillStyle = CANVAS_BG;
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
    c.fillText('Press F for a frame · R rectangle · O ellipse · T text · P pen', W / 2, H / 2 + 8);
    c.textAlign = 'left';
    c.textBaseline = 'alphabetic';
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
  if (s.selection.length > 0 && s.tool === 'move' && !s.editingTextId && !s.editingPathId) {
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
      // rotation handle
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
      // handles
      for (const p of geo.pts) {
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
    if (dp.type === 'line' && dp.diagonal) {
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
    } else if (dp.type === 'frame') {
      c.fillStyle = 'rgba(255,255,255,0.08)';
      c.fillRect(x, y, w, h);
      c.strokeRect(x, y, w, h);
    } else if (dp.type === 'text') {
      c.setLineDash([4, 3]);
      c.strokeRect(x, y, Math.max(w, 2), Math.max(h, 16));
      c.setLineDash([]);
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
  c.font = '11px Inter, system-ui, sans-serif';
  c.textAlign = 'left';
  for (const id of page.nodeIds) {
    const n = s.doc.nodesById[id];
    if (!n || n.type !== 'frame' || !n.visible) continue;
    const box = nodeWorldAABB(s.doc, n);
    const x = box.x * vp.zoom + vp.x + ox;
    const y = box.y * vp.zoom + vp.y + oy;
    if (x > W || y > H || x + box.w * vp.zoom < 0) continue;
    if (y < RULER + 14) continue;
    c.fillStyle = s.selection.includes(id) ? ACCENT_LIGHT : '#8A8A8A';
    c.fillText(n.name, x, y - 6);
  }
}
