/**
 * Auto Layout solver (Figma-style).
 *
 * A frame with `layout != null` arranges its children along a main axis with
 * gap + padding, counter-axis alignment, optional wrapping, and per-axis
 * sizing modes (fixed / hug / fill). The solver runs after every document
 * mutation (see store.commit) and positions children by writing their local
 * x/y — children of a layout frame are therefore position-controlled by the
 * layout, exactly like Figma.
 *
 * Sizing semantics:
 *  - frame (with layout): `hug`  → axis size derives from content
 *                         `fixed` → keeps its stored size
 *                         `fill`  → only meaningful when nested in another
 *                                   layout frame (stretches to parent space)
 *  - child of a layout frame: `fixed` → keeps stored main/counter size
 *                             `fill`  → stretches (counter axis: to the frame
 *                                       inner size; main axis: shares leftover)
 *                             `hug`   → same as fixed; text nodes always hug
 *                                       their measured text on the main axis.
 */

import type { AutoLayout, ID, IrisDoc, IrisNode } from './model';
import { measureText } from './geometry';
import { overlay } from './overlay';

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** A node's content size before layout assigns anything. */
export function naturalSize(n: IrisNode): { w: number; h: number } {
  if (n.type === 'text') {
    const m = measureText(n, n.autoWidth ? undefined : n.w);
    const w = n.autoWidth ? Math.max(1, Math.ceil(m.width)) : n.w;
    return { w, h: Math.max(1, Math.ceil(m.height)) };
  }
  return { w: n.w, h: n.h };
}

/** ids currently being dragged inside a layout frame (solver leaves them alone) */
function dragIds(): Set<ID> {
  const ld = overlay.layoutDrag;
  return ld && !ld.left ? new Set<ID>(ld.ids) : new Set<ID>();
}

interface LineBox {
  /** child slots in this wrapped line */
  items: { node: IrisNode; main: number; cross: number }[];
  mainSize: number;
  crossSize: number;
}

/* ------------------------------------------------------------------ */
/* single-frame layout pass                                            */
/* ------------------------------------------------------------------ */

/**
 * Lay out one auto-layout frame. Assumes any nested auto-layout frames have
 * already had their own pass run (deepest-first ordering from relayoutPage).
 */
function layoutFrame(doc: IrisDoc, frame: IrisNode): void {
  const L = frame.layout;
  if (!L) return;
  const pad = L.padding;
  const horiz = L.mode === 'horizontal';
  const dragged = dragIds();

  const kids = frame.children.map((id) => doc.nodesById[id]).filter((n): n is IrisNode => !!n);
  if (kids.length === 0) {
    // hug to padding only
    if (frame.sizingH === 'hug') frame.w = Math.max(0, pad.left + pad.right);
    if (frame.sizingV === 'hug') frame.h = Math.max(0, pad.top + pad.bottom);
    return;
  }

  // inner space available on each axis (null while hugging)
  const innerW = frame.sizingH === 'hug' ? null : Math.max(0, frame.w - pad.left - pad.right);
  const innerH = frame.sizingV === 'hug' ? null : Math.max(0, frame.h - pad.top - pad.bottom);
  const innerMain = horiz ? innerW : innerH;
  const innerCross = horiz ? innerH : innerW;

  /* ---- 1. resolve child sizes ---------------------------------- */
  interface Slot {
    node: IrisNode;
    w: number;
    h: number;
    main: number; // resolved main size
    cross: number; // resolved cross size (fill resolved per line later)
    crossFill: boolean;
    mainFill: boolean;
  }
  const slots: Slot[] = kids.map((n) => {
    const nat = naturalSize(n);
    const mainFill = horiz ? n.sizingH === 'fill' : n.sizingV === 'fill';
    const crossFill = horiz ? n.sizingV === 'fill' : n.sizingH === 'fill';
    return {
      node: n,
      w: nat.w,
      h: nat.h,
      main: horiz ? nat.w : nat.h,
      cross: horiz ? nat.h : nat.w,
      crossFill,
      mainFill,
    };
  });

  // main-axis fill children share the leftover space (single line only)
  const fillSlots = slots.filter((s) => s.mainFill);
  const canFillMain = fillSlots.length > 0 && innerMain !== null && !(horiz && L.wrap);
  if (canFillMain) {
    const fixed = slots.filter((s) => !s.mainFill).reduce((acc, s) => acc + s.main, 0);
    const gaps = L.gap * Math.max(0, slots.length - 1);
    const leftover = Math.max(0, (innerMain as number) - fixed - gaps);
    const share = leftover / fillSlots.length;
    for (const s of fillSlots) s.main = share;
  }

  /* ---- 2. wrap into lines -------------------------------------- */
  const lines: LineBox[] = [];
  const wrap = horiz && L.wrap && innerMain !== null && !canFillMain;
  if (wrap) {
    let cur: LineBox = { items: [], mainSize: 0, crossSize: 0 };
    for (const s of slots) {
      const extra = cur.items.length ? L.gap + s.main : s.main;
      if (cur.items.length && cur.mainSize + extra > (innerMain as number)) {
        lines.push(cur);
        cur = { items: [], mainSize: 0, crossSize: 0 };
      }
      cur.items.push({ node: s.node, main: s.main, cross: s.cross });
      cur.mainSize += cur.items.length > 1 ? L.gap + s.main : s.main;
    }
    if (cur.items.length) lines.push(cur);
  } else {
    const line: LineBox = { items: [], mainSize: 0, crossSize: 0 };
    for (const s of slots) {
      line.items.push({ node: s.node, main: s.main, cross: s.cross });
      line.mainSize += line.items.length > 1 ? L.gap + s.main : s.main;
    }
    lines.push(line);
  }

  // per-line cross sizes (counter fill children stretch to the line)
  for (const line of lines) {
    let cross = 0;
    for (const it of line.items) cross = Math.max(cross, it.cross);
    // a counter-fill child stretches to the available cross space
    if (innerCross !== null) {
      for (const it of line.items) {
        const isFill = horiz ? it.node.sizingV === 'fill' : it.node.sizingH === 'fill';
        if (isFill) it.cross = Math.max(it.cross, innerCross);
      }
      // line cross becomes inner cross when any child fills (or hug uses max)
      if (line.items.some((it) => (horiz ? it.node.sizingV : it.node.sizingH) === 'fill')) {
        cross = Math.max(cross, innerCross);
      }
    }
    line.crossSize = cross;
  }

  /* ---- 3. position children ------------------------------------ */
  const crossTotal = lines.reduce((acc, l) => acc + l.crossSize, 0) + L.wrapGap * (lines.length - 1);
  let crossCursor = pad.top;
  if (horiz && frame.sizingV === 'fixed' && innerH !== null && L.align === 'center') {
    crossCursor = pad.top + Math.max(0, (innerH - crossTotal) / 2);
  } else if (horiz && frame.sizingV === 'fixed' && innerH !== null && L.align === 'end') {
    crossCursor = pad.top + Math.max(0, innerH - crossTotal);
  }

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    const lineInner = innerMain !== null ? innerMain : line.mainSize;
    let mainCursor = horiz ? pad.left : pad.top;
    if (L.justify === 'center') mainCursor += Math.max(0, (lineInner - line.mainSize) / 2);
    else if (L.justify === 'end') mainCursor += Math.max(0, lineInner - line.mainSize);

    // space-between: spread the leftover between children
    const gapsCount = Math.max(1, line.items.length - 1);
    const spreadGap =
      L.justify === 'space-between' && line.items.length > 1
        ? L.gap + Math.max(0, lineInner - line.mainSize) / gapsCount
        : L.gap;

    for (let ii = 0; ii < line.items.length; ii++) {
      const it = line.items[ii];
      if (ii > 0) mainCursor += spreadGap;

      // counter-axis alignment inside the line
      let crossOff = 0;
      if (L.align === 'center') crossOff = (line.crossSize - it.cross) / 2;
      else if (L.align === 'end') crossOff = line.crossSize - it.cross;
      const crossPos = crossCursor + crossOff;

      const n = it.node;
      const isDragged = dragged.has(n.id);
      const newW = horiz ? it.main : it.cross;
      const newH = horiz ? it.cross : it.main;
      const patch: Partial<IrisNode> = {};
      // sizes: write when they changed through layout (fill stretch, text hug)
      if (Math.abs(n.w - newW) > 0.01 || Math.abs(n.h - newH) > 0.01) {
        patch.w = Math.max(0.5, newW);
        patch.h = Math.max(0.5, newH);
        if (n.type === 'line' || n.type === 'arrow') patch.w = Math.max(0, newW);
      }
      // position: controlled by layout (unless being dragged)
      if (!isDragged) {
        const x = horiz ? mainCursor : crossPos;
        const y = horiz ? crossPos : mainCursor;
        if (Math.abs(n.x - x) > 0.01 || Math.abs(n.y - y) > 0.01) {
          patch.x = x;
          patch.y = y;
        }
      }
      if (Object.keys(patch).length) doc.nodesById[n.id] = { ...n, ...patch };
      mainCursor += it.main;
    }
    crossCursor += line.crossSize + (li < lines.length - 1 ? L.wrapGap : 0);
  }

  /* ---- 4. hug the frame ----------------------------------------- */
  const mainTotal = lines.reduce((acc, l) => Math.max(acc, l.mainSize), 0);
  if (frame.sizingH === 'hug') {
    const w = Math.max(0, (horiz ? mainTotal : crossTotal) + pad.left + pad.right);
    if (Math.abs(frame.w - w) > 0.01) frame.w = w;
  }
  if (frame.sizingV === 'hug') {
    const h = Math.max(0, (horiz ? crossTotal : mainTotal) + pad.top + pad.bottom);
    if (Math.abs(frame.h - h) > 0.01) frame.h = h;
  }

  /* ---- 5. re-pass nested layout frames stretched by fill ---------- */
  for (const s of slots) {
    if (!s.node.layout) continue;
    const fresh = doc.nodesById[s.node.id];
    if (!fresh || !fresh.layout) continue;
    const stretched =
      (horiz && (s.node.sizingV === 'fill' || fresh.h !== s.node.h)) ||
      (!horiz && (s.node.sizingH === 'fill' || fresh.w !== s.node.w));
    if (stretched) layoutFrame(doc, fresh);
  }
}

/* ------------------------------------------------------------------ */
/* page-wide relayout                                                  */
/* ------------------------------------------------------------------ */

/**
 * Re-run auto layout for every layout frame on a page, deepest-first so
 * nested frames resolve their hug sizes before their parents measure them.
 * Fast no-op when the page has no layout frames.
 */
export function relayoutPage(doc: IrisDoc, pageId: ID): void {
  const page = doc.pagesById[pageId];
  if (!page) return;
  const frames: { id: ID; depth: number }[] = [];
  const visit = (id: ID, depth: number): void => {
    const n = doc.nodesById[id];
    if (!n) return;
    if (n.layout) frames.push({ id, depth });
    for (const c of n.children) visit(c, depth + 1);
  };
  for (const root of page.nodeIds) visit(root, 0);
  if (frames.length === 0) return;
  frames.sort((a, b) => b.depth - a.depth);
  for (const f of frames) {
    const node = doc.nodesById[f.id];
    if (node && node.layout) layoutFrame(doc, node);
  }
}

/* ------------------------------------------------------------------ */
/* layout inference (Shift+A)                                          */
/* ------------------------------------------------------------------ */

/** Infer direction + padding + gap + align from existing child geometry. */
export function inferAutoLayout(frame: Pick<IrisNode, 'w' | 'h'>, kids: Pick<IrisNode, 'x' | 'y' | 'w' | 'h'>[]): AutoLayout {
  const fallback: AutoLayout = {
    mode: 'vertical',
    gap: 10,
    wrapGap: 10,
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
    justify: 'start',
    align: 'start',
    wrap: false,
  };
  if (kids.length === 0) return fallback;

  const minX = Math.min(...kids.map((k) => k.x));
  const minY = Math.min(...kids.map((k) => k.y));
  const maxX = Math.max(...kids.map((k) => k.x + k.w));
  const maxY = Math.max(...kids.map((k) => k.y + k.h));
  const spreadX = maxX - minX;
  const spreadY = maxY - minY;
  const mode: AutoLayout['mode'] = spreadY >= spreadX ? 'vertical' : 'horizontal';

  const pad = {
    top: Math.max(0, Math.min(minY, 40)),
    left: Math.max(0, Math.min(minX, 40)),
    bottom: Math.max(0, Math.min(frame.h - maxY, 40)),
    right: Math.max(0, Math.min(frame.w - maxX, 40)),
  };

  // average spacing between adjacent children along the main axis
  let gap = 10;
  if (kids.length >= 2) {
    const sorted = kids.slice().sort((a, b) => (mode === 'vertical' ? a.y - b.y : a.x - b.x));
    const gaps: number[] = [];
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const cur = sorted[i];
      const g = mode === 'vertical' ? cur.y - (prev.y + prev.h) : cur.x - (prev.x + prev.w);
      if (g >= -2) gaps.push(Math.max(0, Math.round(g)));
    }
    if (gaps.length) gap = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
    else gap = 0;
    gap = Math.min(64, gap);
  }

  // infer counter-axis alignment from child centers vs the content band
  let align: AutoLayout['align'] = 'start';
  if (kids.length >= 2) {
    const crossKey = mode === 'vertical' ? 'x' : 'y';
    const sizeKey = mode === 'vertical' ? 'w' : 'h';
    const centers = kids.map((k) => k[crossKey] + k[sizeKey] / 2);
    const avg = centers.reduce((a, b) => a + b, 0) / centers.length;
    const band = mode === 'vertical' ? { s: minX, e: maxX } : { s: minY, e: maxY };
    const mid = (band.s + band.e) / 2;
    const tol = Math.max(6, (band.e - band.s) * 0.12);
    if (Math.abs(avg - mid) <= tol) align = 'center';
    else if (avg > mid + tol) align = 'end';
  }

  return { mode, gap, wrapGap: Math.max(10, gap), padding: pad, justify: 'start', align, wrap: false };
}
