/**
 * Iris geometry: 2D matrix math, bounds, hit-testing, snapping, text metrics.
 * Canvas-style matrices: x' = a*x + c*y + e ; y' = b*x + d*y + f
 */

import {
  ID,
  IrisDoc,
  IrisNode,
  PathPoint,
  TextCase,
} from './model';

export interface Mat {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export interface Vec {
  x: number;
  y: number;
}

/** Axis-aligned box in world (or parent) space. */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const IDENTITY: Mat = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

export function mat(a: number, b: number, c: number, d: number, e: number, f: number): Mat {
  return { a, b, c, d, e, f };
}

/** Compose: mMul(m, n) applies n first, then m. */
export function mMul(m: Mat, n: Mat): Mat {
  return {
    a: m.a * n.a + m.c * n.b,
    b: m.b * n.a + m.d * n.b,
    c: m.a * n.c + m.c * n.d,
    d: m.b * n.c + m.d * n.d,
    e: m.a * n.e + m.c * n.f + m.e,
    f: m.b * n.e + m.d * n.f + m.f,
  };
}

export function mTranslate(x: number, y: number): Mat {
  return { a: 1, b: 0, c: 0, d: 1, e: x, f: y };
}

export function mScale(x: number, y: number): Mat {
  return { a: x, b: 0, c: 0, d: y, e: 0, f: 0 };
}

export function mRotate(deg: number): Mat {
  const r = (deg * Math.PI) / 180;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  return { a: cos, b: sin, c: -sin, d: cos, e: 0, f: 0 };
}

export function mApply(m: Mat, x: number, y: number): Vec {
  return { x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f };
}

/** Apply only the linear part (for direction/delta vectors). */
export function mApplyVec(m: Mat, x: number, y: number): Vec {
  return { x: m.a * x + m.c * y, y: m.b * x + m.d * y };
}

export function mInvert(m: Mat): Mat {
  const det = m.a * m.d - m.b * m.c;
  if (Math.abs(det) < 1e-12) return { ...IDENTITY };
  return {
    a: m.d / det,
    b: -m.b / det,
    c: -m.c / det,
    d: m.a / det,
    e: (m.c * m.f - m.d * m.e) / det,
    f: (m.b * m.e - m.a * m.f) / det,
  };
}

/* ------------------------------------------------------------------ */
/* Node transforms                                                     */
/* ------------------------------------------------------------------ */

/** local -> parent matrix (flip about center, then rotation about center). */
export function nodeLocalMatrix(n: IrisNode): Mat {
  const flip = n.flipH || n.flipV;
  if (!n.rotation && !flip) return mTranslate(n.x, n.y);
  const cx = n.w / 2;
  const cy = n.h / 2;
  let m = mTranslate(n.x, n.y);
  m = mMul(m, mTranslate(cx, cy));
  if (n.rotation) m = mMul(m, mRotate(n.rotation));
  if (flip) m = mMul(m, mScale(n.flipH ? -1 : 1, n.flipV ? -1 : 1));
  m = mMul(m, mTranslate(-cx, -cy));
  return m;
}

/** Center-flip matrix of a node (identity when not flipped). */
function centerFlipMatrix(n: Pick<IrisNode, 'w' | 'h' | 'flipH' | 'flipV'>): Mat {
  if (!n.flipH && !n.flipV) return { ...IDENTITY };
  return mMul(
    mMul(mTranslate(n.w / 2, n.h / 2), mScale(n.flipH ? -1 : 1, n.flipV ? -1 : 1)),
    mTranslate(-n.w / 2, -n.h / 2),
  );
}

/** local -> world matrix. */
export function nodeWorldMatrix(doc: IrisDoc, n: IrisNode): Mat {
  let m = nodeLocalMatrix(n);
  let pid = n.parentId;
  while (pid) {
    const p = doc.nodesById[pid];
    if (!p) break;
    m = mMul(nodeLocalMatrix(p), m);
    pid = p.parentId;
  }
  return m;
}

export function parentWorldMatrix(doc: IrisDoc, n: IrisNode): Mat {
  if (!n.parentId) return { ...IDENTITY };
  const p = doc.nodesById[n.parentId];
  if (!p) return { ...IDENTITY };
  return nodeWorldMatrix(doc, p);
}

/** Compute the x/y/rotation a node needs so that its world matrix equals `target`. */
export function setNodeWorldTransform(n: IrisNode, target: Mat): { x: number; y: number; rotation: number } {
  /* remove the node's center-flip so the remainder is a pure rot+translate */
  const L = mMul(target, mInvert(centerFlipMatrix(n)));
  let rot = (Math.atan2(L.b, L.a) * 180) / Math.PI;
  rot = normalizeAngle(rot);
  // Rc = rotation about center of the (w, h) box at origin
  const rc = mMul(mMul(mTranslate(n.w / 2, n.h / 2), mRotate(rot)), mTranslate(-n.w / 2, -n.h / 2));
  const t = mMul(L, mInvert(rc));
  return { x: t.e, y: t.f, rotation: rot };
}

export function normalizeAngle(deg: number): number {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

export function nodeLocalCorners(n: IrisNode): Vec[] {
  return [
    { x: 0, y: 0 },
    { x: n.w, y: 0 },
    { x: n.w, y: n.h },
    { x: 0, y: n.h },
  ];
}

export function transformRect(m: Mat, r: Rect): Rect {
  const pts = [
    mApply(m, r.x, r.y),
    mApply(m, r.x + r.w, r.y),
    mApply(m, r.x + r.w, r.y + r.h),
    mApply(m, r.x, r.y + r.h),
  ];
  return aabbOfPoints(pts);
}

export function aabbOfPoints(pts: Vec[]): Rect {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of pts) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

/** World AABB of a node (groups: union of children). */
export function nodeWorldAABB(doc: IrisDoc, n: IrisNode): Rect {
  if (n.type === 'group') {
    if (n.children.length === 0) return transformRect(nodeWorldMatrix(doc, n), { x: 0, y: 0, w: n.w, h: n.h });
    const rects = n.children
      .map((c) => doc.nodesById[c])
      .filter(Boolean)
      .map((c) => nodeWorldAABB(doc, c));
    return unionRects(rects);
  }
  return transformRect(nodeWorldMatrix(doc, n), { x: 0, y: 0, w: n.w, h: n.h });
}

export function unionRects(rects: Rect[]): Rect {
  if (rects.length === 0) return { x: 0, y: 0, w: 0, h: 0 };
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const r of rects) {
    minX = Math.min(minX, r.x);
    minY = Math.min(minY, r.y);
    maxX = Math.max(maxX, r.x + r.w);
    maxY = Math.max(maxY, r.y + r.h);
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

export function boundsOfNodes(doc: IrisDoc, ids: ID[]): Rect | null {
  const rects = ids
    .map((id) => doc.nodesById[id])
    .filter(Boolean)
    .map((n) => nodeWorldAABB(doc, n));
  if (rects.length === 0) return null;
  return unionRects(rects);
}

export function rectsIntersect(a: Rect, b: Rect): boolean {
  return a.x <= b.x + b.w && a.x + a.w >= b.x && a.y <= b.y + b.h && a.y + a.h >= b.y;
}

export function rectContains(outer: Rect, inner: Rect): boolean {
  return (
    inner.x >= outer.x &&
    inner.y >= outer.y &&
    inner.x + inner.w <= outer.x + outer.w &&
    inner.y + inner.h <= outer.y + outer.h
  );
}

export function pointInRect(r: Rect, p: Vec): boolean {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

export function expandRect(r: Rect, pad: number): Rect {
  return { x: r.x - pad, y: r.y - pad, w: r.w + pad * 2, h: r.h + pad * 2 };
}

export function distToSegment(p: Vec, a: Vec, b: Vec): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq < 1e-9) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

/* ------------------------------------------------------------------ */
/* Viewport                                                            */
/* ------------------------------------------------------------------ */

export interface Viewport {
  /** screen px offset of world origin (canvas CSS px, relative to content origin) */
  x: number;
  y: number;
  zoom: number;
}

export const RULER = 20;

export function worldToScreen(vp: Viewport, x: number, y: number): Vec {
  return { x: x * vp.zoom + vp.x, y: y * vp.zoom + vp.y };
}

export function screenToWorld(vp: Viewport, x: number, y: number): Vec {
  return { x: (x - vp.x) / vp.zoom, y: (y - vp.y) / vp.zoom };
}

/** Visible world rect for a canvas of cssW x cssH with content origin offset. */
export function visibleWorldRect(vp: Viewport, cssW: number, cssH: number, originX: number, originY: number): Rect {
  const a = screenToWorld(vp, originX, originY);
  const b = screenToWorld(vp, cssW, cssH);
  return { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y };
}

/* ------------------------------------------------------------------ */
/* Hit testing                                                         */
/* ------------------------------------------------------------------ */

let hitCtx: CanvasRenderingContext2D | null = null;
function getHitCtx(): CanvasRenderingContext2D | null {
  if (hitCtx) return hitCtx;
  if (typeof document === 'undefined') return null;
  const c = document.createElement('canvas');
  c.width = 8;
  c.height = 8;
  hitCtx = c.getContext('2d');
  return hitCtx;
}

/** Build a Path2D for a path node in LOCAL coordinates. */
export function path2dForPoints(points: PathPoint[], closed: boolean): Path2D {
  const p = new Path2D();
  if (points.length === 0) return p;
  p.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    if (prev.hx === 0 && prev.hy === 0 && cur.hx === 0 && cur.hy === 0) {
      p.lineTo(cur.x, cur.y);
    } else {
      p.bezierCurveTo(
        prev.x + prev.hx,
        prev.y + prev.hy,
        cur.x - cur.hx,
        cur.y - cur.hy,
        cur.x,
        cur.y,
      );
    }
  }
  if (closed && points.length > 1) {
    const last = points[points.length - 1];
    const first = points[0];
    if (last.hx === 0 && last.hy === 0 && first.hx === 0 && first.hy === 0) {
      p.closePath();
    } else {
      p.bezierCurveTo(
        last.x + last.hx,
        last.y + last.hy,
        first.x - first.hx,
        first.y - first.hy,
        first.x,
        first.y,
      );
      p.closePath();
    }
  }
  return p;
}

/* ------------------------------------------------------------------ */
/* Regular polygon / star geometry                                     */
/* ------------------------------------------------------------------ */

/** Vertices (local coords) of a regular polygon inscribed in the w×h box. */
export function polygonPoints(n: Pick<IrisNode, 'w' | 'h' | 'sides'>): Vec[] {
  const k = Math.max(3, Math.round(n.sides));
  const rx = n.w / 2;
  const ry = n.h / 2;
  const pts: Vec[] = [];
  for (let i = 0; i < k; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / k;
    pts.push({ x: rx + rx * Math.cos(a), y: ry + ry * Math.sin(a) });
  }
  return pts;
}

/** Vertices (local coords) of a star inscribed in the w×h box. */
export function starPointsOf(n: Pick<IrisNode, 'w' | 'h' | 'starPoints' | 'innerRadius'>): Vec[] {
  const k = Math.max(3, Math.round(n.starPoints));
  const rx = n.w / 2;
  const ry = n.h / 2;
  const inner = Math.min(0.95, Math.max(0.05, n.innerRadius));
  const pts: Vec[] = [];
  for (let i = 0; i < k * 2; i++) {
    const isOuter = i % 2 === 0;
    const r = isOuter ? 1 : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / k;
    pts.push({ x: rx + rx * r * Math.cos(a), y: ry + ry * r * Math.sin(a) });
  }
  return pts;
}

/** Build a Path2D for a polygon or star node in LOCAL coordinates. */
export function regularPath2d(n: IrisNode): Path2D {
  const pts = n.type === 'star' ? starPointsOf(n) : polygonPoints(n);
  const p = new Path2D();
  if (pts.length === 0) return p;
  p.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) p.lineTo(pts[i].x, pts[i].y);
  p.closePath();
  return p;
}

/* ------------------------------------------------------------------ */
/* Arrow geometry                                                      */
/* ------------------------------------------------------------------ */

/** Endpoints of an arrow/line segment in local coords. */
export function segmentEnds(n: Pick<IrisNode, 'w' | 'h' | 'flip'>): { a: Vec; b: Vec } {
  return n.flip
    ? { a: { x: n.w, y: 0 }, b: { x: 0, y: n.h } }
    : { a: { x: 0, y: 0 }, b: { x: n.w, y: n.h } };
}

/** Head size for an arrow stroke width. */
export function arrowHeadSize(strokeWidth: number): number {
  return Math.max(8, strokeWidth * 4.5);
}

/** Triangular head path at point `tip` pointing along `dir` (unit vector). */
function arrowHeadPath(tip: Vec, dir: Vec, size: number, inset: number): Path2D {
  const p = new Path2D();
  const px = -dir.y;
  const py = dir.x;
  const back = { x: tip.x - dir.x * size, y: tip.y - dir.y * size };
  p.moveTo(tip.x, tip.y);
  p.lineTo(back.x + px * size * 0.4, back.y + py * size * 0.4);
  p.lineTo(back.x - px * size * 0.4, back.y - py * size * 0.4);
  p.closePath();
  void inset;
  return p;
}

/** Full arrow path (shaft + heads) in local coords; also returns head fills. */
export function arrowPath2d(n: IrisNode): { shaft: Path2D; heads: Path2D[] } {
  const { a, b } = segmentEnds(n);
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const dir = { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
  const size = arrowHeadSize(n.strokeWidth);
  const heads: Path2D[] = [];
  const shaft = new Path2D();
  if (n.arrowEnd !== 'none') {
    const tipB = { x: b.x - dir.x * size * 0.85, y: b.y - dir.y * size * 0.85 };
    shaft.moveTo(a.x, a.y);
    shaft.lineTo(tipB.x, tipB.y);
    if (n.arrowEnd !== 'line') heads.push(arrowHeadPath(b, dir, size, 0));
    else {
      const h = new Path2D();
      const px = -dir.y;
      const py = dir.x;
      const back = { x: b.x - dir.x * size * 0.7, y: b.y - dir.y * size * 0.7 };
      h.moveTo(back.x + px * size * 0.4, back.y + py * size * 0.4);
      h.lineTo(b.x, b.y);
      h.lineTo(back.x - px * size * 0.4, back.y - py * size * 0.4);
      heads.push(h);
    }
  } else {
    shaft.moveTo(a.x, a.y);
    shaft.lineTo(b.x, b.y);
  }
  if (n.arrowStart !== 'none') {
    const d2 = { x: -dir.x, y: -dir.y };
    if (n.arrowStart !== 'line') heads.push(arrowHeadPath(a, d2, size, 0));
    else {
      const h = new Path2D();
      const px = -d2.y;
      const py = d2.x;
      const back = { x: a.x - d2.x * size * 0.7, y: a.y - d2.y * size * 0.7 };
      h.moveTo(back.x + px * size * 0.4, back.y + py * size * 0.4);
      h.lineTo(a.x, a.y);
      h.lineTo(back.x - px * size * 0.4, back.y - py * size * 0.4);
      heads.push(h);
    }
  }
  return { shaft, heads };
}

/* ------------------------------------------------------------------ */
/* Gradient helper                                                     */
/* ------------------------------------------------------------------ */

/** Line endpoints (local coords) spanning a w×h box at `angleDeg`. */
export function gradientLine(w: number, h: number, angleDeg: number): { x1: number; y1: number; x2: number; y2: number } {
  const a = (angleDeg * Math.PI) / 180;
  const cx = w / 2;
  const cy = h / 2;
  const len = Math.abs(w * Math.cos(a)) + Math.abs(h * Math.sin(a));
  const dx = (Math.cos(a) * len) / 2;
  const dy = (Math.sin(a) * len) / 2;
  return { x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy };
}

/** Point-in-shape test for a single node in WORLD coordinates. */
export function hitTestNode(doc: IrisDoc, n: IrisNode, worldPt: Vec, tolerance: number): boolean {
  if (!n.visible || n.locked) return false;
  const inv = mInvert(nodeWorldMatrix(doc, n));
  const p = mApply(inv, worldPt.x, worldPt.y);
  switch (n.type) {
    case 'rect':
    case 'frame':
    case 'text':
    case 'image':
    case 'polygon':
    case 'star': {
      if (p.x < -tolerance || p.y < -tolerance || p.x > n.w + tolerance || p.y > n.h + tolerance) return false;
      // rounded corner check for rects with radius
      if ((n.type === 'rect' || n.type === 'frame') && n.cornerRadius > 0) {
        const r = Math.min(n.cornerRadius, n.w / 2, n.h / 2);
        const inXBand = p.x >= r && p.x <= n.w - r;
        const inYBand = p.y >= r && p.y <= n.h - r;
        if (inXBand || inYBand) return true;
        const cx = p.x < n.w / 2 ? r : n.w - r;
        const cy = p.y < n.h / 2 ? r : n.h - r;
        return (p.x - cx) ** 2 + (p.y - cy) ** 2 <= (r + tolerance) ** 2;
      }
      return true;
    }
    case 'ellipse': {
      const rx = Math.max(n.w / 2, 0.001);
      const ry = Math.max(n.h / 2, 0.001);
      const dx = (p.x - n.w / 2) / (rx + tolerance);
      const dy = (p.y - n.h / 2) / (ry + tolerance);
      return dx * dx + dy * dy <= 1;
    }
    case 'line': {
      const { a, b } = segmentEnds(n);
      return distToSegment(p, a, b) <= Math.max(tolerance, n.strokeWidth / 2 + tolerance * 0.5);
    }
    case 'arrow': {
      const ctxA = getHitCtx();
      const { shaft, heads } = arrowPath2d(n);
      if (ctxA) {
        ctxA.lineWidth = Math.max(n.strokeWidth, 1) + tolerance * 2;
        ctxA.strokeStyle = '#000';
        if (ctxA.isPointInStroke(shaft, p.x, p.y)) return true;
        for (const head of heads) if (ctxA.isPointInPath(head, p.x, p.y)) return true;
        return false;
      }
      const ends = segmentEnds(n);
      return distToSegment(p, ends.a, ends.b) <= Math.max(tolerance, n.strokeWidth / 2 + tolerance * 0.5) + 6;
    }
    case 'polygon':
    case 'star': {
      const ctxP = getHitCtx();
      const path = regularPath2d(n);
      if (!ctxP) return pointInRect({ x: 0, y: 0, w: n.w, h: n.h }, p);
      if (n.fill && ctxP.isPointInPath(path, p.x, p.y)) return true;
      ctxP.lineWidth = Math.max(n.strokeWidth, 1) + tolerance * 2;
      ctxP.strokeStyle = '#000';
      return ctxP.isPointInStroke(path, p.x, p.y);
    }
    case 'path': {
      const ctx = getHitCtx();
      if (!ctx) return pointInRect({ x: 0, y: 0, w: n.w, h: n.h }, p);
      const path = path2dForPoints(n.points, n.closed);
      if (n.fill && ctx.isPointInPath(path, p.x, p.y)) return true;
      ctx.lineWidth = Math.max(n.strokeWidth, 1) + tolerance * 2;
      ctx.strokeStyle = '#000';
      return ctx.isPointInStroke(path, p.x, p.y);
    }
    case 'group':
      return false;
  }
  return false;
}

/** Deepest node under a world point (children before parents), or null. */
export function hitTestDeep(doc: IrisDoc, pageId: ID, worldPt: Vec, tolerance: number): IrisNode | null {
  const page = doc.pagesById[pageId];
  if (!page) return null;
  const visit = (id: ID): IrisNode | null => {
    const n = doc.nodesById[id];
    if (!n || !n.visible || n.locked) return null;
    if (n.type === 'group' || n.type === 'frame') {
      for (let i = n.children.length - 1; i >= 0; i--) {
        const r = visit(n.children[i]);
        if (r) return r;
      }
      if (n.type === 'frame') {
        const inv = mInvert(nodeWorldMatrix(doc, n));
        const p = mApply(inv, worldPt.x, worldPt.y);
        if (p.x >= 0 && p.y >= 0 && p.x <= n.w && p.y <= n.h) return n;
      }
      return null;
    }
    return hitTestNode(doc, n, worldPt, tolerance) ? n : null;
  };
  for (let i = page.nodeIds.length - 1; i >= 0; i--) {
    const r = visit(page.nodeIds[i]);
    if (r) return r;
  }
  return null;
}

/**
 * Figma-style click resolution:
 *  - deep (ctrl/cmd click): the exact node
 *  - normal: climb through GROUP ancestors (frames are selectable directly)
 */
export function resolveClick(doc: IrisDoc, exact: IrisNode, deep: boolean): ID {
  if (deep) return exact.id;
  let cur = exact;
  while (cur.parentId) {
    const parent = doc.nodesById[cur.parentId];
    if (!parent || parent.type !== 'group') break;
    cur = parent;
  }
  return cur.id;
}

/** Deepest frame that fully contains a world rect (for marquee context). */
export function deepestFrameContaining(doc: IrisDoc, pageId: ID, rect: Rect): IrisNode | null {
  const page = doc.pagesById[pageId];
  if (!page) return null;
  let best: IrisNode | null = null;
  const visit = (id: ID) => {
    const n = doc.nodesById[id];
    if (!n || !n.visible) return;
    if (n.type === 'frame' && rectContains(nodeWorldAABB(doc, n), rect)) {
      if (!best || nodeWorldAABB(doc, best).w * nodeWorldAABB(doc, best).h > n.w * n.h) best = n;
    }
    if (n.children) n.children.forEach(visit);
  };
  page.nodeIds.forEach(visit);
  return best;
}

/** Candidate node ids a marquee should select. */
export function marqueeCandidates(doc: IrisDoc, pageId: ID, rect: Rect): ID[] {
  const page = doc.pagesById[pageId];
  if (!page) return [];
  const roots = page.nodeIds
    .map((id) => doc.nodesById[id])
    .filter((n): n is IrisNode => !!n && n.visible && !n.locked);
  const hitting = roots.filter((n) => rectsIntersect(nodeWorldAABB(doc, n), rect));
  if (hitting.length > 0) return hitting.map((n) => n.id);
  const frame = deepestFrameContaining(doc, pageId, rect);
  if (frame) {
    return frame.children
      .map((id) => doc.nodesById[id])
      .filter(
        (n): n is IrisNode =>
          !!n && n.visible && !n.locked && rectsIntersect(nodeWorldAABB(doc, n), rect),
      )
      .map((n) => n.id);
  }
  return [];
}

/** Deepest frame containing a world point (for new-object parenting).
 *  Prefers frames higher in z-order, then deeper in the tree.
 *  `excludeIds` (and their descendants) are ignored — used while dragging
 *  nodes so a dragged frame cannot become its own parent. */
export function frameAtPoint(
  doc: IrisDoc,
  pageId: ID,
  worldPt: Vec,
  excludeIds?: ID[],
): IrisNode | null {
  const page = doc.pagesById[pageId];
  if (!page) return null;
  const excluded = new Set<ID>(excludeIds ?? []);
  let best: IrisNode | null = null;
  const visitDeep = (id: ID) => {
    const n = doc.nodesById[id];
    if (!n || !n.visible || excluded.has(id)) return;
    // children (topmost sibling first) take priority over the frame itself
    for (let i = n.children.length - 1; i >= 0; i--) visitDeep(n.children[i]);
    if (n.type === 'frame' && !best) {
      const p = mApply(mInvert(nodeWorldMatrix(doc, n)), worldPt.x, worldPt.y);
      if (p.x >= 0 && p.y >= 0 && p.x <= n.w && p.y <= n.h) best = n;
    }
  };
  for (let i = page.nodeIds.length - 1; i >= 0; i--) visitDeep(page.nodeIds[i]);
  return best;
}

/* ------------------------------------------------------------------ */
/* Snapping                                                            */
/* ------------------------------------------------------------------ */

export interface SnapGuide {
  axis: 'x' | 'y';
  /** world coordinate of the guide line */
  at: number;
  from: number;
  to: number;
}

export interface SnapResult {
  dx: number;
  dy: number;
  guides: SnapGuide[];
}

/** Smart snapping: align moving rect edges/centers to candidate edges/centers. */
export function computeSnap(moving: Rect, candidates: Rect[], threshold: number): SnapResult {
  let bestX: { d: number; guide: SnapGuide } | null = null;
  let bestY: { d: number; guide: SnapGuide } | null = null;
  const mxs = [moving.x, moving.x + moving.w / 2, moving.x + moving.w];
  const mys = [moving.y, moving.y + moving.h / 2, moving.y + moving.h];
  for (const c of candidates) {
    const cxs = [c.x, c.x + c.w / 2, c.x + c.w];
    const cys = [c.y, c.y + c.h / 2, c.y + c.h];
    for (const m of mxs) {
      for (const s of cxs) {
        const d = s - m;
        if (Math.abs(d) <= threshold && (!bestX || Math.abs(d) < Math.abs(bestX.d))) {
          bestX = {
            d,
            guide: {
              axis: 'x',
              at: s,
              from: Math.min(moving.y, c.y),
              to: Math.max(moving.y + moving.h, c.y + c.h),
            },
          };
        }
      }
    }
    for (const m of mys) {
      for (const s of cys) {
        const d = s - m;
        if (Math.abs(d) <= threshold && (!bestY || Math.abs(d) < Math.abs(bestY.d))) {
          bestY = {
            d,
            guide: {
              axis: 'y',
              at: s,
              from: Math.min(moving.x, c.x),
              to: Math.max(moving.x + moving.w, c.x + c.w),
            },
          };
        }
      }
    }
  }
  const guides: SnapGuide[] = [];
  if (bestX) guides.push(bestX.guide);
  if (bestY) guides.push(bestY.guide);
  return { dx: bestX ? bestX.d : 0, dy: bestY ? bestY.d : 0, guides };
}

/* ------------------------------------------------------------------ */
/* Text metrics                                                        */
/* ------------------------------------------------------------------ */

let measureCtx: CanvasRenderingContext2D | null = null;
function getMeasureCtx(): CanvasRenderingContext2D | null {
  if (measureCtx) return measureCtx;
  if (typeof document === 'undefined') return null;
  const c = document.createElement('canvas');
  c.width = 8;
  c.height = 8;
  measureCtx = c.getContext('2d');
  return measureCtx;
}

/** CSS font-family string shared by canvas, textarea overlay and SVG export. */
export function cssFontFamily(family: string): string {
  const quote = (f: string) => (/^[\w-]+$/.test(f) ? f : `"${f.replace(/"/g, '')}"`);
  return `${family.split(',').map((f) => quote(f.trim())).join(', ')}, ui-sans-serif, system-ui, sans-serif`;
}

export function fontString(n: Pick<IrisNode, 'fontWeight' | 'fontSize' | 'fontFamily'>): string {
  return `${n.fontWeight} ${n.fontSize}px ${cssFontFamily(n.fontFamily)}`;
}

/** Apply a text-case transform to a string. */
export function applyTextCase(text: string, textCase: TextCase): string {
  switch (textCase) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    default:
      return text;
  }
}

/** Dash array for a dash style (canvas / SVG). */
export function dashArray(style: IrisNode['dash'], strokeWidth: number): number[] {
  const s = Math.max(1, strokeWidth);
  if (style === 'dashed') return [s * 4, s * 3];
  if (style === 'dotted') return [s * 0.01, s * 2.2];
  return [];
}

export interface TextMetrics {
  lines: string[];
  width: number;
  height: number;
  ascent: number;
  descent: number;
}

/** Lay out a text node: split on newlines, wrap at node.w unless autoWidth. */
export function measureText(
  n: Pick<IrisNode, 'text' | 'fontWeight' | 'fontSize' | 'fontFamily' | 'lineHeight' | 'autoWidth' | 'w' | 'textAlign' | 'letterSpacing' | 'textCase'>,
  wrapWidth?: number,
): TextMetrics {
  const ctx = getMeasureCtx();
  const fs = fontString(n);
  const maxW = wrapWidth ?? n.w;
  const spacing = n.letterSpacing ?? 0;
  const paragraphs = applyTextCase(n.text ?? '', n.textCase ?? 'as-typed').split('\n');
  const lines: string[] = [];
  if (ctx) {
    ctx.font = fs;
    try {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${spacing}px`;
    } catch {
      /* letterSpacing unsupported — approximate below */
    }
  }
  const measure = (s: string) =>
    ctx ? ctx.measureText(s).width + spacing * Math.max(0, s.length - 1) : s.length * n.fontSize * 0.55;
  for (const para of paragraphs) {
    if (n.autoWidth || maxW <= 0 || para === '') {
      lines.push(para);
      continue;
    }
    const words = para.split(' ');
    let cur = '';
    for (const w of words) {
      const attempt = cur === '' ? w : `${cur} ${w}`;
      if (measure(attempt) <= maxW || cur === '') {
        cur = attempt;
      } else {
        lines.push(cur);
        cur = w;
      }
    }
    lines.push(cur);
  }
  let width = 0;
  for (const l of lines) width = Math.max(width, measure(l));
  let ascent = n.fontSize * 0.8;
  let descent = n.fontSize * 0.2;
  if (ctx) {
    ctx.font = fs;
    const m = ctx.measureText('Hg');
    if (m.actualBoundingBoxAscent) ascent = m.actualBoundingBoxAscent;
    if (m.actualBoundingBoxDescent) descent = m.actualBoundingBoxDescent;
    try {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px';
    } catch {
      /* ignore */
    }
  }
  const lineH = n.fontSize * n.lineHeight;
  return {
    lines,
    width,
    height: Math.max(lineH, lines.length * lineH),
    ascent,
    descent,
  };
}

/** First baseline y (in node-local px) matching browser line-box centering. */
export function firstBaseline(n: Pick<IrisNode, 'fontSize' | 'lineHeight'>, ascent: number, descent: number): number {
  const lineH = n.fontSize * n.lineHeight;
  return (lineH - (ascent + descent)) / 2 + ascent;
}

/* ------------------------------------------------------------------ */
/* Selection handle geometry (screen space)                            */
/* ------------------------------------------------------------------ */

export type HandleKind = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

export interface HandleGeometry {
  /** 8 handles in screen coords */
  pts: { kind: HandleKind; x: number; y: number }[];
  /** rotation handle in screen coords */
  rot: { x: number; y: number };
  center: { x: number; y: number };
  /** for single rotated node: the transformed box outline in screen coords */
  poly: Vec[] | null;
  /** axis-aligned screen rect (used for multi-selection) */
  rect: { x: number; y: number; w: number; h: number };
  /** world AABB of selection */
  worldBox: Rect;
  single: boolean;
  nodeIds: ID[];
}

const CORNER_LOCAL: Record<HandleKind, [number, number]> = {
  nw: [0, 0],
  n: [0.5, 0],
  ne: [1, 0],
  e: [1, 0.5],
  se: [1, 1],
  s: [0.5, 1],
  sw: [0, 1],
  w: [0, 0.5],
};

export function selectionHandleGeometry(doc: IrisDoc, ids: ID[], vp: Viewport): HandleGeometry | null {
  const nodes = ids.map((id) => doc.nodesById[id]).filter(Boolean) as IrisNode[];
  if (nodes.length === 0) return null;
  const worldBox = boundsOfNodes(doc, ids);
  if (!worldBox) return null;
  const single = nodes.length === 1;
  const node = nodes[0];

  let corners: Vec[]; // world coords of the 4 box corners
  if (single) {
    const m = nodeWorldMatrix(doc, node);
    corners = nodeLocalCorners(node).map((c) => mApply(m, c.x, c.y));
  } else {
    corners = [
      { x: worldBox.x, y: worldBox.y },
      { x: worldBox.x + worldBox.w, y: worldBox.y },
      { x: worldBox.x + worldBox.w, y: worldBox.y + worldBox.h },
      { x: worldBox.x, y: worldBox.y + worldBox.h },
    ];
  }
  const screen = corners.map((c) => worldToScreen(vp, c.x, c.y));
  // corner order: nw, ne, se, sw
  const lerp = (a: Vec, b: Vec, t: number): Vec => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  const order: HandleKind[] = ['nw', 'ne', 'se', 'sw'];
  const pts: { kind: HandleKind; x: number; y: number }[] = [];
  order.forEach((k, i) => {
    pts.push({ kind: k, x: screen[i].x, y: screen[i].y });
  });
  pts.push({ kind: 'n', ...lerp(screen[0], screen[1], 0.5) });
  pts.push({ kind: 'e', ...lerp(screen[1], screen[2], 0.5) });
  pts.push({ kind: 's', ...lerp(screen[3], screen[2], 0.5) });
  pts.push({ kind: 'w', ...lerp(screen[0], screen[3], 0.5) });

  const center = lerp(lerp(screen[0], screen[2], 0.5), lerp(screen[1], screen[3], 0.5), 0.5);
  // rotation handle: extend outward from top edge midpoint
  const topMid = lerp(screen[0], screen[1], 0.5);
  let ux = topMid.x - center.x;
  let uy = topMid.y - center.y;
  const ul = Math.hypot(ux, uy) || 1;
  ux /= ul;
  uy /= ul;
  const rot = { x: topMid.x + ux * 22, y: topMid.y + uy * 22 };

  const minX = Math.min(...screen.map((p) => p.x));
  const minY = Math.min(...screen.map((p) => p.y));
  const maxX = Math.max(...screen.map((p) => p.x));
  const maxY = Math.max(...screen.map((p) => p.y));

  return {
    pts,
    rot,
    center,
    poly: single && Math.abs(node.rotation) > 0.01 ? screen : null,
    rect: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
    worldBox,
    single,
    nodeIds: ids,
  };
}

/* ------------------------------------------------------------------ */
/* Color helpers                                                       */
/* ------------------------------------------------------------------ */

export function isHexColor(s: string | null | undefined): boolean {
  return !!s && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(s);
}

export function hexToRgba(hex: string, alpha: number): string {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16) || 0;
  const g = parseInt(h.slice(2, 4), 16) || 0;
  const b = parseInt(h.slice(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
