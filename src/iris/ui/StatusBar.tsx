'use client';

/**
 * Bottom status bar: document state, object/page counts, contextual tool
 * hint, and the zoom cluster.
 */

import { useMemo } from 'react';
import { Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import { useIris, type Tool } from '../engine/store';

const TOOL_HINTS: Record<Tool, string> = {
  move: 'Drag to select · Space + drag to pan · Double-click to edit',
  hand: 'Drag to pan the canvas · H',
  frame: 'Drag to create a frame — frames clip their contents',
  rect: 'Drag to draw · Hold Shift later for constraints',
  ellipse: 'Drag to draw · Hold Shift later for constraints',
  line: 'Drag to draw · Hold Shift later for constraints',
  text: 'Click to add text · Type to edit · Esc to finish',
  pen: 'Click for corner points · Drag for curves · Click first point or Enter to finish',
};

export function StatusBar() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const tool = useIris((s) => s.tool);
  const zoom = useIris((s) => s.viewport.zoom);
  const savedName = useIris((s) => s.savedName);
  const dirty = useIris((s) => s.dirty);
  const zoomAt = useIris((s) => s.zoomAt);
  const zoomReset = useIris((s) => s.zoomReset);
  const zoomToFit = useIris((s) => s.zoomToFit);

  const nodeCount = useMemo(
    () => Object.values(doc.nodesById).filter((n) => n.pageId === currentPageId).length,
    [doc, currentPageId],
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
        <span>{savedName ? `· saved as ${savedName}.iris` : '· not saved yet'}</span>
      </div>

      {/* counts */}
      <div className="whitespace-nowrap">
        {nodeCount} {nodeCount === 1 ? 'object' : 'objects'} · {doc.pages.length}{' '}
        {doc.pages.length === 1 ? 'page' : 'pages'}
      </div>

      {/* center: tool hint (hidden below lg) */}
      <p className="hidden flex-1 text-center lg:block">{TOOL_HINTS[tool]}</p>

      {/* right: zoom cluster */}
      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          className="iris-icon-btn h-6! w-6!"
          title="Zoom out — Ctrl+-"
          aria-label="Zoom out"
          onClick={() => zoomAt(1 / 1.2)}
        >
          <ZoomOut size={13} strokeWidth={1.75} aria-hidden />
        </button>
        <button
          type="button"
          className="h-6 w-14 rounded text-center text-[11px] text-[#C9C9C9] hover:bg-[#383838]"
          title="Reset zoom — Ctrl+0"
          aria-label="Reset zoom"
          onClick={zoomReset}
        >
          {Math.round(zoom * 100)}%
        </button>
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
