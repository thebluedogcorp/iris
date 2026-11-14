'use client';

/**
 * Bottom status bar: document state, object/page counts, pointer coordinates,
 * selection size, contextual tool hint, and the zoom cluster with presets.
 */

import { useEffect, useMemo, useState } from 'react';
import { Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIris, type Tool } from '../engine/store';
import { overlay } from '../engine/overlay';
import { boundsOfNodes } from '../engine/geometry';

const TOOL_HINTS: Record<Tool, string> = {
  move: 'Drag to select · Space + drag to pan · Double-click to edit',
  hand: 'Drag to pan the canvas · H',
  frame: 'Drag to create a frame — frames clip their contents',
  rect: 'Drag to draw · Shift for a square',
  ellipse: 'Drag to draw · Shift for a circle',
  line: 'Drag to draw · Shift for 45° steps',
  text: 'Click to add text · Type to edit · Esc to finish',
  pen: 'Click for corner points · Drag for curves · Click first point or Enter to finish',
  polygon: 'Drag to draw a polygon · Shift for equal sides',
  star: 'Drag to draw a star · Shift for equal sides',
  arrow: 'Drag to draw an arrow · Shift for 45° steps',
  eyedropper: 'Click any pixel to sample its color',
  image: 'Click the canvas to place an image there',
};

const ZOOM_PRESETS: { label: string; value: number | 'fit' }[] = [
  { label: '25%', value: 0.25 },
  { label: '50%', value: 0.5 },
  { label: '100%', value: 1 },
  { label: '200%', value: 2 },
  { label: '400%', value: 4 },
  { label: 'Zoom to fit', value: 'fit' },
];

export function StatusBar() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const selection = useIris((s) => s.selection);
  const tool = useIris((s) => s.tool);
  const zoom = useIris((s) => s.viewport.zoom);
  const savedName = useIris((s) => s.savedName);
  const dirty = useIris((s) => s.dirty);
  const zoomAt = useIris((s) => s.zoomAt);
  const zoomReset = useIris((s) => s.zoomReset);
  const zoomToFit = useIris((s) => s.zoomToFit);
  const setZoom = useIris((s) => s.setZoom);

  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  /* poll the mutable overlay for the live pointer position */
  useEffect(() => {
    const id = window.setInterval(() => {
      setPointer((prev) => {
        const p = overlay.pointerWorld;
        if (!p) return prev === null ? null : prev;
        if (prev && Math.abs(prev.x - p.x) < 0.01 && Math.abs(prev.y - p.y) < 0.01) return prev;
        return { x: p.x, y: p.y };
      });
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  const nodeCount = useMemo(
    () => Object.values(doc.nodesById).filter((n) => n.pageId === currentPageId).length,
    [doc, currentPageId],
  );

  const selBox = useMemo(
    () => (selection.length ? boundsOfNodes(doc, selection) : null),
    [doc, selection],
  );

  return (
    <footer className="flex h-8 items-center gap-3 border-t border-[#3E3E3E] bg-[#1E1E1E] px-3 text-[11px] text-[#9A9A9A]">
      {/* left: doc state */}
      <div className="flex min-w-0 items-center gap-2 whitespace-nowrap">
        <span
          className={`h-1 w-1 shrink-0 rounded-full ${dirty ? 'bg-[#8B5CF6]' : 'bg-[#5B5B5B]'}`}
          title={dirty ? 'Unsaved changes' : 'All changes saved'}
          aria-hidden="true"
        />
        <span className="truncate text-[#C9C9C9]">{doc.name}</span>
        <span className="hidden sm:inline">{savedName ? `· saved as ${savedName}.iris` : '· not saved yet'}</span>
      </div>

      {/* counts */}
      <div className="hidden whitespace-nowrap sm:inline">
        {nodeCount} {nodeCount === 1 ? 'object' : 'objects'} · {doc.pages.length}{' '}
        {doc.pages.length === 1 ? 'page' : 'pages'}
      </div>

      {/* selection size */}
      {selBox ? (
        <div className="hidden whitespace-nowrap text-[#C9C9C9] md:inline">
          {Math.round(selBox.w)} × {Math.round(selBox.h)}
        </div>
      ) : null}

      {/* center: tool hint (hidden below lg) */}
      <p className="hidden flex-1 text-center lg:block">{TOOL_HINTS[tool]}</p>

      {/* coordinates */}
      <div className="ml-auto hidden w-28 shrink-0 text-right font-mono text-[10px] tabular-nums text-[#7A7A7A] md:block">
        {pointer ? `X ${Math.round(pointer.x)}  Y ${Math.round(pointer.y)}` : ''}
      </div>

      {/* right: zoom cluster */}
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          className="iris-icon-btn h-6! w-6!"
          title="Zoom out — Ctrl+-"
          aria-label="Zoom out"
          onClick={() => zoomAt(1 / 1.2)}
        >
          <ZoomOut size={13} strokeWidth={1.75} aria-hidden />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="h-6 w-14 rounded text-center text-[11px] text-[#C9C9C9] hover:bg-[#383838]"
              title="Zoom presets"
              aria-label="Zoom level — open presets"
            >
              {Math.round(zoom * 100)}%
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-[#4E4E4E] bg-[#2C2C2C] text-white">
            {ZOOM_PRESETS.map((p) => (
              <DropdownMenuItem
                key={p.label}
                className="text-[12px] text-[#E5E5E5] focus:bg-[#474747] focus:text-white"
                onSelect={() => {
                  if (p.value === 'fit') zoomToFit();
                  else setZoom(p.value);
                }}
              >
                {p.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          type="button"
          className="iris-icon-btn h-6! w-6!"
          title="Zoom in — Ctrl+="
          aria-label="Zoom in"
          onClick={() => zoomAt(1.2)}
        >
          <ZoomIn size={13} strokeWidth={1.75} aria-hidden />
        </button>
        <div className="mx-1 h-4 w-px bg-[#3E3E3E]" aria-hidden="true" />
        <button
          type="button"
          className="iris-icon-btn h-6! w-6!"
          title="Zoom to fit — Shift+1"
          aria-label="Zoom to fit"
          onClick={zoomToFit}
        >
          <Maximize size={13} strokeWidth={1.75} aria-hidden />
        </button>
        <button
          type="button"
          className="h-6 rounded px-2 text-[11px] text-[#C9C9C9] hover:bg-[#383838]"
          title="Zoom to 100%"
          aria-label="Zoom to 100 percent"
          onClick={zoomReset}
        >
          1:1
        </button>
      </div>
    </footer>
  );
}
