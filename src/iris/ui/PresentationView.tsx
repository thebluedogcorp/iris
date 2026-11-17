'use client';

/**
 * Fullscreen prototype player (field guide §5). Plays the current page's flows:
 * hotspots authored on layers fire interactions — navigate (with animated
 * transitions), back, external URLs, overlays, close-overlay and scroll-to.
 * Scrollable frames (overflow: scroll) wheel-scroll and clamp to content.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MousePointerClick, RotateCcw, Undo2 } from 'lucide-react';
import { useIris } from '../engine/store';
import { nodeWorldAABB, boundsOfNodes } from '../engine/geometry';
import { drawNodes, setExportPass } from '../engine/renderer';
import { loadImage } from '../engine/imageCache';
import {
  collectSubtree,
  type ID,
  type IrisInteraction,
  type IrisNode,
  type ProtoAnimation,
  type ProtoEasing,
  type ProtoTrigger,
} from '../engine/model';

const MARGIN = 32;

/* ------------------------------------------------------------------ */
/* Fit transforms (world → screen)                                     */
/* ------------------------------------------------------------------ */

interface Fit {
  scale: number;
  tx: number;
  ty: number;
}

function fitFrame(doc: ReturnType<typeof useIris.getState>['doc'], frame: IrisNode, w: number, h: number): Fit {
  const aabb = nodeWorldAABB(doc, frame);
  const fw = Math.max(aabb.w, 1);
  const fh = Math.max(aabb.h, 1);
  const scale = Math.min(Math.max(w - MARGIN * 2, 1) / fw, Math.max(h - MARGIN * 2, 1) / fh);
  const tx = (w - fw * scale) / 2 - aabb.x * scale;
  const ty = (h - fh * scale) / 2 - aabb.y * scale;
  return { scale, tx, ty };
}

function overlayFit(
  doc: ReturnType<typeof useIris.getState>['doc'],
  frame: IrisNode,
  w: number,
  h: number,
  ix: IrisInteraction,
): Fit {
  const aabb = nodeWorldAABB(doc, frame);
  const fw = Math.max(aabb.w, 1);
  const fh = Math.max(aabb.h, 1);
  const scale = Math.min(Math.max(w - MARGIN * 2, 1) / fw, Math.max(h - MARGIN * 2, 1) / fh);
  let cx = (w - fw * scale) / 2;
  let cy = (h - fh * scale) / 2;
  const inset = 24;
  switch (ix.overlayPos) {
    case 'top-left':
      cx = inset;
      cy = inset;
      break;
    case 'top-center':
      cy = inset;
      break;
    case 'top-right':
      cx = w - inset - fw * scale;
      cy = inset;
      break;
    case 'bottom-left':
      cx = inset;
      cy = h - inset - fh * scale;
      break;
    case 'bottom-center':
      cy = h - inset - fh * scale;
      break;
    case 'bottom-right':
      cx = w - inset - fw * scale;
      cy = h - inset - fh * scale;
      break;
    case 'manual':
      cx += ix.overlayX;
      cy += ix.overlayY;
      break;
    default:
      break; // center
  }
  return { scale, tx: cx - aabb.x * scale, ty: cy - aabb.y * scale };
}

/* ------------------------------------------------------------------ */
/* Hotspots                                                            */
/* ------------------------------------------------------------------ */

interface Hotspot {
  id: ID;
  /** world-space rect */
  x: number;
  y: number;
  w: number;
  h: number;
  ixs: IrisInteraction[];
}

function hotspotsOf(doc: ReturnType<typeof useIris.getState>['doc'], frameId: ID): Hotspot[] {
  const frame = doc.nodesById[frameId];
  if (!frame) return [];
  const out: Hotspot[] = [];
  for (const n of collectSubtree(doc, frameId)) {
    if (!n.visible || n.id === frameId || !n.interactions?.length) continue;
    const b = nodeWorldAABB(doc, n);
    out.push({ id: n.id, x: b.x, y: b.y, w: b.w, h: b.h, ixs: n.interactions });
  }
  return out;
}

function hotspotScreenRect(h: Hotspot, fit: Fit, scroll: { x: number; y: number }): { x: number; y: number; w: number; h: number } {
  return {
    x: (h.x - scroll.x) * fit.scale + fit.tx,
    y: (h.y - scroll.y) * fit.scale + fit.ty,
    w: h.w * fit.scale,
    h: h.h * fit.scale,
  };
}

function pointInRect(px: number, py: number, r: { x: number; y: number; w: number; h: number }): boolean {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

/* ------------------------------------------------------------------ */
/* Frame screen: one canvas rendering one frame at a fit transform      */
/* ------------------------------------------------------------------ */

function FrameScreen({
  frame,
  fit,
  scroll,
  maxScroll,
  hints,
  className,
  style,
  ariaLabel,
}: {
  frame: IrisNode;
  fit: Fit;
  scroll: { x: number; y: number };
  maxScroll: { x: number; y: number };
  hints: { x: number; y: number; w: number; h: number }[];
  className?: string;
  style?: React.CSSProperties;
  ariaLabel: string;
}) {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderToken = useRef(0);
  const scrollable = frame.overflow === 'scroll';
  const aabb = useMemo(() => nodeWorldAABB(doc, frame), [doc, frame]);

  const draw = useCallback(async (): Promise<void> => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const token = ++renderToken.current;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));

    const srcs: string[] = [];
    for (const n of collectSubtree(doc, frame.id)) {
      if (n.type === 'image' && n.src) srcs.push(n.src);
    }
    if (srcs.length) await Promise.all(srcs.map((s) => loadImage(s)));
    if (token !== renderToken.current) return;

    const F = fit;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(F.scale * dpr, 0, 0, F.scale * dpr, F.tx * dpr, F.ty * dpr);
    setExportPass(true);
    try {
      if (scrollable) {
        drawNodes(ctx, doc, currentPageId, 1, [frame.id], { skipChildren: true });
        ctx.save();
        ctx.beginPath();
        ctx.rect(aabb.x, aabb.y, aabb.w, aabb.h);
        ctx.clip();
        ctx.translate(-scroll.x, -scroll.y);
        drawNodes(ctx, doc, currentPageId, 1, frame.children);
        ctx.restore();
      } else {
        drawNodes(ctx, doc, currentPageId, 1, [frame.id]);
      }
    } finally {
      setExportPass(false);
    }

    /* screen-space chrome: scrollbars + hotspot hints */
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (scrollable && maxScroll.y > 0) {
      const trackX = aabb.x * F.scale + F.tx + aabb.w * F.scale - 3;
      const trackY = aabb.y * F.scale + F.ty;
      const trackH = aabb.h * F.scale;
      const thumbH = Math.max(24, (trackH * (aabb.h / (aabb.h + maxScroll.y))));
      const thumbY = trackY + (scroll.y / maxScroll.y) * (trackH - thumbH);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.beginPath();
      ctx.roundRect(trackX, thumbY, 3, thumbH, 2);
      ctx.fill();
    }
    if (scrollable && maxScroll.x > 0) {
      const trackY2 = aabb.y * F.scale + F.ty + aabb.h * F.scale - 3;
      const trackX2 = aabb.x * F.scale + F.tx;
      const trackW = aabb.w * F.scale;
      const thumbW = Math.max(24, trackW * (aabb.w / (aabb.w + maxScroll.x)));
      const thumbX = trackX2 + (scroll.x / maxScroll.x) * (trackW - thumbW);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.beginPath();
      ctx.roundRect(thumbX, trackY2, thumbW, 3, 2);
      ctx.fill();
    }
    if (hints.length) {
      ctx.strokeStyle = 'rgba(13,153,255,0.85)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      for (const r of hints) {
        ctx.strokeRect(r.x, r.y, r.w, r.h);
      }
      ctx.setLineDash([]);
    }
  }, [doc, currentPageId, frame, fit, scroll, maxScroll, hints, scrollable, aabb]);

  useEffect(() => {
    void draw();
  }, [draw]);

  useEffect(() => {
    const onResize = (): void => {
      void draw();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  return (
    <div className={className} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label={ariaLabel} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Transition CSS                                                      */
/* ------------------------------------------------------------------ */

const KEYFRAMES = `
@keyframes irisFadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes irisFadeOut { from { opacity: 1 } to { opacity: 0 } }
@keyframes irisInL { from { transform: translateX(-100%) } to { transform: translateX(0) } }
@keyframes irisInR { from { transform: translateX(100%) } to { transform: translateX(0) } }
@keyframes irisInT { from { transform: translateY(-100%) } to { transform: translateY(0) } }
@keyframes irisInB { from { transform: translateY(100%) } to { transform: translateY(0) } }
@keyframes irisOutL { from { transform: translateX(0) } to { transform: translateX(-100%) } }
@keyframes irisOutR { from { transform: translateX(0) } to { transform: translateX(100%) } }
@keyframes irisOutT { from { transform: translateY(0) } to { transform: translateY(-100%) } }
@keyframes irisOutB { from { transform: translateY(0) } to { transform: translateY(100%) } }
@keyframes irisOvIn { from { opacity: 0; transform: scale(0.96) } to { opacity: 1; transform: scale(1) } }
.iris-screen { position: absolute; inset: 0; will-change: transform, opacity; }
`;

function easeCss(e: ProtoEasing): string {
  switch (e) {
    case 'linear':
      return 'linear';
    case 'ease-in':
      return 'cubic-bezier(0.42, 0, 1, 1)';
    case 'ease-in-out':
      return 'cubic-bezier(0.42, 0, 0.58, 1)';
    case 'spring':
      return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
    default:
      return 'cubic-bezier(0, 0, 0.58, 1)';
  }
}

/** enter/exit keyframe names for a transition animation. */
function animClasses(a: ProtoAnimation): { enter: string; exit: string } {
  switch (a) {
    case 'slide-left':
      return { enter: 'irisInR', exit: 'irisOutL' };
    case 'slide-right':
      return { enter: 'irisInL', exit: 'irisOutR' };
    case 'slide-up':
      return { enter: 'irisInB', exit: 'irisOutT' };
    case 'slide-down':
      return { enter: 'irisInT', exit: 'irisOutB' };
    case 'move-in-left':
      return { enter: 'irisInL', exit: 'irisFadeOut' };
    case 'move-in-right':
      return { enter: 'irisInR', exit: 'irisFadeOut' };
    case 'move-in-top':
      return { enter: 'irisInT', exit: 'irisFadeOut' };
    case 'move-in-bottom':
      return { enter: 'irisInB', exit: 'irisFadeOut' };
    case 'move-out-left':
      return { enter: 'irisFadeIn', exit: 'irisOutL' };
    case 'move-out-right':
      return { enter: 'irisFadeIn', exit: 'irisOutR' };
    case 'move-out-top':
      return { enter: 'irisFadeIn', exit: 'irisOutT' };
    case 'move-out-bottom':
      return { enter: 'irisFadeIn', exit: 'irisOutB' };
    case 'push-left':
      return { enter: 'irisInR', exit: 'irisOutL' };
    case 'push-right':
      return { enter: 'irisInL', exit: 'irisOutR' };
    case 'push-up':
      return { enter: 'irisInB', exit: 'irisOutT' };
    case 'push-down':
      return { enter: 'irisInT', exit: 'irisOutB' };
    default:
      return { enter: 'irisFadeIn', exit: 'irisFadeOut' };
  }
}

/* ------------------------------------------------------------------ */
/* Presentation view                                                   */
/* ------------------------------------------------------------------ */

interface TransitionState {
  fromId: ID;
  anim: ProtoAnimation;
  durationMs: number;
  easing: ProtoEasing;
}

const ZERO_SCROLL = { x: 0, y: 0 };

export function PresentationView() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const setPresenting = useIris((s) => s.setPresenting);

  /* page frames in order */
  const frames = useMemo<IrisNode[]>(() => {
    const page = doc.pagesById[currentPageId];
    if (!page) return [];
    return page.nodeIds
      .map((id) => doc.nodesById[id])
      .filter((n): n is IrisNode => !!n && n.type === 'frame' && n.visible);
  }, [doc, currentPageId]);

  /* entry frame: explicit start → first flow start → first frame */
  const [entryFrameId] = useState<ID | null>(() => {
    const s = useIris.getState();
    const page = s.doc.pagesById[s.currentPageId];
    if (!page) return null;
    const topIds = new Set(page.nodeIds);
    if (s.presentStartFrameId) {
      const f = s.doc.nodesById[s.presentStartFrameId];
      if (f && topIds.has(f.id)) return f.id;
    }
    const flow = (s.doc.flows ?? []).find((fl) => fl.pageId === s.currentPageId && s.doc.nodesById[fl.startNodeId]);
    if (flow) return flow.startNodeId;
    const first = page.nodeIds.map((id) => s.doc.nodesById[id]).find((n) => n && n.type === 'frame' && n.visible);
    return first ? first.id : null;
  });

  const [currentFrameId, setCurrentFrameId] = useState<ID | null>(entryFrameId);
  const [backStack, setBackStack] = useState<ID[]>([]);
  const [overlay, setOverlay] = useState<{ frameId: ID; ix: IrisInteraction } | null>(null);
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const [hovered, setHovered] = useState<ID | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [vpSize, setVpSize] = useState(() => ({
    w: typeof window === 'undefined' ? 1280 : window.innerWidth,
    h: typeof window === 'undefined' ? 800 : window.innerHeight,
  }));
  const [scroll, setScroll] = useState<{ x: number; y: number }>(ZERO_SCROLL);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const pointerDownRef = useRef<{ x: number; y: number } | null>(null);
  const smoothRafRef = useRef(0);
  const runRef = useRef<(ix: IrisInteraction) => void>(() => undefined);

  const currentFrame = currentFrameId ? doc.nodesById[currentFrameId] : null;
  const total = frames.length;
  const idx = currentFrame ? frames.findIndex((f) => f.id === currentFrame.id) : -1;

  /* ---------- helpers ---------- */

  const clearTimers = useCallback((): void => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
  }, []);

  const scheduleDelays = useCallback(
    (frameId: ID): void => {
      const s = useIris.getState();
      const frame = s.doc.nodesById[frameId];
      if (!frame) return;
      for (const n of collectSubtree(s.doc, frameId)) {
        if (!n.visible) continue;
        for (const ix of n.interactions ?? []) {
          if (ix.trigger !== 'delay') continue;
          timersRef.current.push(
            setTimeout(() => runRef.current(ix), Math.max(0, ix.delayMs)),
          );
        }
      }
    },
    [],
  );

  /* ---------- navigation ---------- */

  const navigateTo = useCallback(
    (destId: ID | null, ix: IrisInteraction | null): void => {
      const s = useIris.getState();
      const dest = destId ? s.doc.nodesById[destId] : null;
      if (!dest || dest.type !== 'frame' || dest.id === currentFrameId) return;
      clearTimers();
      setOverlay(null);
      setScroll(ZERO_SCROLL);
      setBackStack((st) => [...st, currentFrameId ?? ''].filter(Boolean));
      const anim = ix?.animation ?? 'instant';
      const dur = ix?.durationMs ?? 0;
      if (anim === 'instant' || dur <= 0) {
        setTransition(null);
      } else {
        setTransition({ fromId: currentFrameId ?? dest.id, anim, durationMs: dur, easing: ix?.easing ?? 'ease-out' });
        timersRef.current.push(setTimeout(() => setTransition(null), dur));
      }
      setCurrentFrameId(dest.id);
      scheduleDelays(dest.id);
    },
    [clearTimers, currentFrameId, scheduleDelays],
  );

  const goBack = useCallback((): void => {
    if (backStack.length === 0) return;
    const prev = backStack[backStack.length - 1];
    const s = useIris.getState();
    if (!s.doc.nodesById[prev]) return;
    clearTimers();
    setOverlay(null);
    setTransition(null);
    setScroll(ZERO_SCROLL);
    setBackStack((st) => st.slice(0, -1));
    setCurrentFrameId(prev);
    scheduleDelays(prev);
  }, [backStack, clearTimers, scheduleDelays]);

  const stepFrame = useCallback(
    (dir: 1 | -1 | 'home' | 'end'): void => {
      if (total === 0) return;
      let next = 0;
      if (dir === 'home') next = 0;
      else if (dir === 'end') next = total - 1;
      else {
        const cur = idx >= 0 ? idx : 0;
        next = Math.min(total - 1, Math.max(0, cur + dir));
      }
      const target = frames[next];
      if (!target || target.id === currentFrameId) return;
      clearTimers();
      setOverlay(null);
      setTransition(null);
      setScroll(ZERO_SCROLL);
      setCurrentFrameId(target.id);
      scheduleDelays(target.id);
    },
    [clearTimers, currentFrameId, frames, idx, scheduleDelays, total],
  );

  const restart = useCallback((): void => {
    if (!entryFrameId) return;
    clearTimers();
    setOverlay(null);
    setTransition(null);
    setScroll(ZERO_SCROLL);
    setBackStack([]);
    setCurrentFrameId(entryFrameId);
    scheduleDelays(entryFrameId);
  }, [clearTimers, entryFrameId, scheduleDelays]);

  /* ---------- scroll-to (smooth) ---------- */

  const scrollToNode = useCallback(
    (targetId: ID | null): void => {
      if (!currentFrame || currentFrame.overflow !== 'scroll' || !targetId) return;
      const target = doc.nodesById[targetId];
      if (!target) return;
      const fb = nodeWorldAABB(doc, currentFrame);
      const tb = nodeWorldAABB(doc, target);
      const content = boundsOfNodes(doc, currentFrame.children);
      if (!content) return;
      const maxX = Math.max(0, content.x + content.w - fb.x - fb.w);
      const maxY = Math.max(0, content.y + content.h - fb.y - fb.h);
      const destX = Math.min(maxX, Math.max(0, tb.x - fb.x));
      const destY = Math.min(maxY, Math.max(0, tb.y - fb.y));
      const from = { ...scroll };
      const t0 = performance.now();
      const dur = 250;
      cancelAnimationFrame(smoothRafRef.current);
      const tick = (now: number): void => {
        const k = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - k, 3);
        setScroll({ x: from.x + (destX - from.x) * e, y: from.y + (destY - from.y) * e });
        if (k < 1) smoothRafRef.current = requestAnimationFrame(tick);
      };
      smoothRafRef.current = requestAnimationFrame(tick);
    },
    [currentFrame, doc, scroll],
  );

  /* ---------- interaction dispatch (kept in a ref for timers) ---------- */

  const runInteraction = useCallback(
    (ix: IrisInteraction): void => {
      switch (ix.action) {
        case 'navigate':
          navigateTo(ix.destinationId, ix);
          break;
        case 'back':
          goBack();
          break;
        case 'url':
          window.open(ix.url ?? 'about:blank', '_blank', 'noopener,noreferrer');
          break;
        case 'overlay': {
          const s = useIris.getState();
          const dest = ix.destinationId ? s.doc.nodesById[ix.destinationId] : null;
          if (dest && dest.type === 'frame') {
            setOverlay({ frameId: dest.id, ix });
            scheduleDelays(dest.id);
          }
          break;
        }
        case 'close-overlay':
          setOverlay(null);
          break;
        case 'scroll-to':
          scrollToNode(ix.destinationId);
          break;
        default:
          break;
      }
    },
    [goBack, navigateTo, scheduleDelays, scrollToNode],
  );

  useEffect(() => {
    runRef.current = runInteraction;
  }, [runInteraction]);

  /* schedule entry delays once */
  useEffect(() => {
    if (entryFrameId) scheduleDelays(entryFrameId);
    return () => {
      clearTimers();
      cancelAnimationFrame(smoothRafRef.current);
    };
     
  }, []);

  /* ---------- hotspot maps ---------- */

  const baseFit = useMemo<Fit>(
    () => (currentFrame ? fitFrame(doc, currentFrame, vpSize.w, vpSize.h) : { scale: 1, tx: 0, ty: 0 }),
    [doc, currentFrame, vpSize],
  );

  const ovFrame = overlay ? doc.nodesById[overlay.frameId] : null;
  const ovFit = useMemo<Fit>(
    () =>
      overlay && ovFrame ? overlayFit(doc, ovFrame, vpSize.w, vpSize.h, overlay.ix) : { scale: 1, tx: 0, ty: 0 },
    [overlay, ovFrame, doc, vpSize],
  );

  const baseHotspots = useMemo<Hotspot[]>(() => (currentFrame ? hotspotsOf(doc, currentFrame.id) : []), [doc, currentFrame]);
  const ovHotspots = useMemo<Hotspot[]>(() => (ovFrame ? hotspotsOf(doc, ovFrame.id) : []), [doc, ovFrame]);

  const baseHintRects = useMemo(
    () => (showHints ? baseHotspots.map((h) => hotspotScreenRect(h, baseFit, scroll)) : []),
    [showHints, baseHotspots, baseFit, scroll],
  );
  const ovHintRects = useMemo(
    () => (showHints && ovHotspots.length ? ovHotspots.map((h) => hotspotScreenRect(h, ovFit, ZERO_SCROLL)) : []),
    [showHints, ovHotspots, ovFit],
  );

  const maxScroll = useMemo<{ x: number; y: number }>(() => {
    if (!currentFrame || currentFrame.overflow !== 'scroll') return { x: 0, y: 0 };
    const content = boundsOfNodes(doc, currentFrame.children);
    const fb = nodeWorldAABB(doc, currentFrame);
    if (!content) return { x: 0, y: 0 };
    return {
      x: Math.max(0, content.x + content.w - fb.x - fb.w),
      y: Math.max(0, content.y + content.h - fb.y - fb.h),
    };
  }, [doc, currentFrame]);

  const topHotspotAt = useCallback(
    (px: number, py: number): Hotspot | null => {
      if (ovHotspots.length) {
        for (let i = ovHotspots.length - 1; i >= 0; i--) {
          if (pointInRect(px, py, hotspotScreenRect(ovHotspots[i], ovFit, ZERO_SCROLL))) return ovHotspots[i];
        }
      }
      for (let i = baseHotspots.length - 1; i >= 0; i--) {
        if (pointInRect(px, py, hotspotScreenRect(baseHotspots[i], baseFit, scroll))) return baseHotspots[i];
      }
      return null;
    },
    [ovHotspots, ovFit, baseHotspots, baseFit, scroll],
  );

  const fireHotspot = useCallback((hot: Hotspot, trigger: ProtoTrigger): void => {
    for (const ix of hot.ixs) {
      if (ix.trigger === trigger) runInteraction(ix);
    }
  }, [runInteraction]);

  /* ---------- pointer events ---------- */

  const onPointerMove = useCallback(
    (e: React.PointerEvent): void => {
      const hot = topHotspotAt(e.clientX, e.clientY);
      if ((hot?.id ?? null) !== hovered) {
        setHovered(hot?.id ?? null);
        if (hot) fireHotspot(hot, 'hover');
      }
    },
    [fireHotspot, hovered, topHotspotAt],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent): void => {
      pointerDownRef.current = { x: e.clientX, y: e.clientY };
      const hot = topHotspotAt(e.clientX, e.clientY);
      if (hot) fireHotspot(hot, 'press');
    },
    [fireHotspot, topHotspotAt],
  );

  const onStageClick = useCallback(
    (e: React.MouseEvent): void => {
      const down = pointerDownRef.current;
      pointerDownRef.current = null;
      if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 4) return; // was a drag
      if (ovFrame) {
        /* overlay open: clicks inside the overlay frame fire its hotspots;
           clicks outside close (when allowed) or are swallowed */
        const b = nodeWorldAABB(doc, ovFrame);
        const r = {
          x: b.x * ovFit.scale + ovFit.tx,
          y: b.y * ovFit.scale + ovFit.ty,
          w: b.w * ovFit.scale,
          h: b.h * ovFit.scale,
        };
        if (pointInRect(e.clientX, e.clientY, r)) {
          const hot = topHotspotAt(e.clientX, e.clientY);
          if (hot) fireHotspot(hot, 'click');
        } else if (overlay?.ix.overlayCloseOutside !== false) {
          setOverlay(null);
        }
        return;
      }
      const hot = topHotspotAt(e.clientX, e.clientY);
      if (hot) fireHotspot(hot, 'click');
    },
    [doc, fireHotspot, ovFit, ovFrame, overlay, topHotspotAt],
  );

  /* ---------- wheel scroll (non-passive) ---------- */

  const stageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent): void => {
      if (!currentFrame || currentFrame.overflow !== 'scroll') return;
      e.preventDefault();
      setScroll((s) => ({
        x: Math.min(maxScroll.x, Math.max(0, s.x + e.deltaX)),
        y: Math.min(maxScroll.y, Math.max(0, s.y + e.deltaY)),
      }));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [currentFrame, maxScroll]);

  /* ---------- keyboard ---------- */

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      /* hotspot key triggers take priority over player keys */
      const keyMatch = (k: string | null): boolean => {
        if (!k) return false;
        if (k.length === 1) return k.toLowerCase() === e.key.toLowerCase();
        return k === e.key;
      };
      for (const list of [ovHotspots, baseHotspots]) {
        for (const h of list) {
          for (const ix of h.ixs) {
            if (ix.trigger === 'keydown' && keyMatch(ix.key)) {
              e.preventDefault();
              runRef.current(ix);
              return;
            }
          }
        }
      }
      let handled = true;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          stepFrame(1);
          break;
        case ' ':
          stepFrame(1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          stepFrame(-1);
          break;
        case 'Home':
          stepFrame('home');
          break;
        case 'End':
          stepFrame('end');
          break;
        case 'r':
        case 'R':
          restart();
          break;
        case 'Backspace':
          goBack();
          break;
        case 'Escape':
          setPresenting(false);
          break;
        default:
          handled = false;
      }
      if (handled) e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [baseHotspots, goBack, ovHotspots, restart, setPresenting, stepFrame]);

  /* keep vpSize fresh */
  useEffect(() => {
    const onResize = (): void => setVpSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ---------- render ---------- */

  const fromFrame = transition ? doc.nodesById[transition.fromId] : null;
  const anim = transition ? animClasses(transition.anim) : null;
  const screenAnimStyle =
    transition && anim
      ? {
          animationDuration: `${transition.durationMs}ms`,
          animationTimingFunction: easeCss(transition.easing),
          animationFillMode: 'both' as const,
        }
      : undefined;

  return (
    <div className="fixed inset-0 z-[80] bg-[#1E1E1E]" role="dialog" aria-modal="true" aria-label="Presentation">
      <style>{KEYFRAMES}</style>

      <div
        ref={stageRef}
        className="absolute inset-0 overflow-hidden"
        style={{ cursor: hovered ? 'pointer' : 'default' }}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onClick={onStageClick}
      >
        {total === 0 || !currentFrame ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="text-[14px] text-[#9A9A9A]">No frames to present — press Esc to exit</p>
          </div>
        ) : transition && fromFrame && anim ? (
          <>
            <FrameScreen
              key={`from-${transition.fromId}`}
              frame={fromFrame}
              fit={baseFit}
              scroll={ZERO_SCROLL}
              maxScroll={{ x: 0, y: 0 }}
              hints={[]}
              className={`iris-screen ${anim.exit}`}
              style={screenAnimStyle}
              ariaLabel="Previous screen"
            />
            <FrameScreen
              key={`to-${currentFrame.id}`}
              frame={currentFrame}
              fit={baseFit}
              scroll={ZERO_SCROLL}
              maxScroll={{ x: 0, y: 0 }}
              hints={baseHintRects}
              className={`iris-screen ${anim.enter}`}
              style={screenAnimStyle}
              ariaLabel="Current screen"
            />
          </>
        ) : (
          <FrameScreen
            key={currentFrame.id}
            frame={currentFrame}
            fit={baseFit}
            scroll={scroll}
            maxScroll={maxScroll}
            hints={baseHintRects}
            className="iris-screen"
            ariaLabel={`Prototype screen ${currentFrame.name}`}
          />
        )}

        {/* overlay */}
        {overlay && ovFrame && !transition ? (
          <>
            <div
              className="absolute inset-0 z-10"
              style={{ background: overlay.ix.overlayBg ?? 'rgba(0,0,0,0.30)' }}
              onClick={(e) => {
                e.stopPropagation();
                if (overlay.ix.overlayCloseOutside !== false) setOverlay(null);
              }}
              aria-hidden
            />
            <div className="iris-screen z-20" style={{ animation: 'irisOvIn 180ms cubic-bezier(0, 0, 0.58, 1) both' }}>
              <FrameScreen
                key={`ov-${ovFrame.id}`}
                frame={ovFrame}
                fit={ovFit}
                scroll={ZERO_SCROLL}
                maxScroll={{ x: 0, y: 0 }}
                hints={ovHintRects}
                className="absolute inset-0"
                ariaLabel={`Overlay ${ovFrame.name}`}
              />
            </div>
          </>
        ) : null}
      </div>

      {/* bottom pill bar */}
      <div
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#3E3E3E] bg-[rgba(30,30,30,0.9)] px-3 py-1.5 shadow-lg backdrop-blur"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Back to previous screen"
          title="Back (Backspace)"
          disabled={backStack.length === 0}
          onClick={goBack}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#E5E5E5] transition-colors hover:bg-[#383838] disabled:pointer-events-none disabled:opacity-30"
        >
          <Undo2 size={15} />
        </button>
        <button
          type="button"
          aria-label="Previous frame"
          title="Previous frame"
          disabled={total === 0 || idx <= 0}
          onClick={() => stepFrame(-1)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#E5E5E5] transition-colors hover:bg-[#383838] disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex min-w-0 flex-col items-center leading-tight">
          <span className="max-w-[240px] truncate text-[12px] text-[#E5E5E5]">
            {currentFrame ? currentFrame.name : ''}
          </span>
          <span className="text-[11px] text-[#9A9A9A]">
            {idx >= 0 ? `${idx + 1} / ${total}` : '—'}
          </span>
        </div>
        <button
          type="button"
          aria-label="Next frame"
          title="Next frame"
          disabled={total === 0 || idx >= total - 1}
          onClick={() => stepFrame(1)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#E5E5E5] transition-colors hover:bg-[#383838] disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight size={16} />
        </button>
        <button
          type="button"
          aria-label="Restart prototype"
          title="Restart (R)"
          onClick={restart}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#E5E5E5] transition-colors hover:bg-[#383838]"
        >
          <RotateCcw size={14} />
        </button>
        <button
          type="button"
          aria-label="Toggle hotspot hints"
          title="Show hotspot hints"
          data-active={showHints}
          aria-pressed={showHints}
          onClick={() => setShowHints((v) => !v)}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
            showHints ? 'bg-[#0D99FF] text-white' : 'text-[#E5E5E5] hover:bg-[#383838]'
          }`}
        >
          <MousePointerClick size={15} />
        </button>
      </div>

      <div className="pointer-events-none absolute right-4 top-4 flex flex-col items-end gap-0.5">
        <p className="text-[11px] text-[#6F6F6F]">Esc to exit</p>
        <p className="text-[11px] text-[#6F6F6F]">R to restart</p>
      </div>
    </div>
  );
}
