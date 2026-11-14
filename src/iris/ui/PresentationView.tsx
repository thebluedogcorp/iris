'use client';

/**
 * Fullscreen presentation mode: plays through the current page's top-level
 * frames one at a time, each fitted and centered in the window.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIris } from '../engine/store';
import { nodeWorldAABB } from '../engine/geometry';
import { drawNodes, setExportPass } from '../engine/renderer';
import { loadImage } from '../engine/imageCache';
import { collectSubtree } from '../engine/model';
import type { IrisNode } from '../engine/model';

/** Window margin around the presented frame. */
const MARGIN = 32;

export function PresentationView() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const setPresenting = useIris((s) => s.setPresenting);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderToken = useRef(0);
  const [index, setIndex] = useState(0);

  /* top-level frames of the current page, in page order */
  const frames = useMemo<IrisNode[]>(() => {
    const page = doc.pagesById[currentPageId];
    if (!page) return [];
    return page.nodeIds
      .map((id) => doc.nodesById[id])
      .filter((n): n is IrisNode => !!n && n.type === 'frame');
  }, [doc, currentPageId]);

  const total = frames.length;
  const idx = total === 0 ? 0 : Math.min(index, total - 1);
  const frame = total > 0 ? frames[idx] : null;

  const next = useCallback((): void => {
    setIndex((i) => (total > 0 ? Math.min(i + 1, total - 1) : 0));
  }, [total]);

  const prev = useCallback((): void => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  /* render the current frame onto the full-window canvas */
  const render = useCallback(async (): Promise<void> => {
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

    /* backdrop right away so resizes never show stale pixels */
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#1E1E1E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const f = frame;
    if (!f) return;

    /* make sure every image in the frame subtree is decoded first */
    const srcs: string[] = [];
    for (const n of collectSubtree(doc, f.id)) {
      if (n.type === 'image' && n.src) srcs.push(n.src);
    }
    await Promise.all(srcs.map((s) => loadImage(s)));
    if (token !== renderToken.current) return; // superseded by a newer render

    /* fit the frame's world AABB into the window, centered */
    const aabb = nodeWorldAABB(doc, f);
    const fw = Math.max(aabb.w, 1);
    const fh = Math.max(aabb.h, 1);
    const availW = Math.max(w - MARGIN * 2, 1);
    const availH = Math.max(h - MARGIN * 2, 1);
    const scale = Math.min(availW / fw, availH / fh);
    const tx = (w - fw * scale) / 2 - aabb.x * scale;
    const ty = (h - fh * scale) / 2 - aabb.y * scale;

    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, tx * dpr, ty * dpr);
    setExportPass(true);
    try {
      drawNodes(ctx, doc, currentPageId, 1, [f.id]);
    } finally {
      setExportPass(false);
    }
  }, [doc, currentPageId, frame]);

  /* draw on mount and whenever the target changes */
  useEffect(() => {
    void render();
  }, [render]);

  /* redraw on window resize (also covers devicePixelRatio changes) */
  useEffect(() => {
    const onResize = (): void => {
      void render();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [render]);

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      let handled = true;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          next();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          prev();
          break;
        case 'Home':
          setIndex(0);
          break;
        case 'End':
          setIndex(Math.max(0, total - 1));
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
  }, [total, next, prev, setPresenting]);

  return (
    <div className="fixed inset-0 z-[80] bg-[#1E1E1E]" role="dialog" aria-modal="true" aria-label="Presentation">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-pointer"
        onClick={next}
        aria-label="Presentation canvas — click to advance to the next frame"
      />

      {total === 0 ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="text-[14px] text-[#9A9A9A]">No frames to present — press Esc to exit</p>
        </div>
      ) : (
        <div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#3E3E3E] bg-[rgba(30,30,30,0.9)] px-3 py-1.5 shadow-lg backdrop-blur"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Previous frame"
            title="Previous frame"
            disabled={idx === 0}
            onClick={prev}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#E5E5E5] transition-colors hover:bg-[#383838] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex min-w-0 flex-col items-center leading-tight">
            <span className="max-w-[240px] truncate text-[12px] text-[#E5E5E5]">
              {frame ? frame.name : ''}
            </span>
            <span className="text-[11px] text-[#9A9A9A]">
              {idx + 1} / {total}
            </span>
          </div>
          <button
            type="button"
            aria-label="Next frame"
            title="Next frame"
            disabled={idx === total - 1}
            onClick={next}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#E5E5E5] transition-colors hover:bg-[#383838] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <p className="pointer-events-none absolute right-4 top-4 text-[11px] text-[#6F6F6F]">Esc to exit</p>
    </div>
  );
}
