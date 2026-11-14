'use client';

/**
 * Bottom-center floating toolbar (Figma UI3 style, per spec screenshots).
 * Grouped tools with chevron dropdowns: Move / Frame / Shape / Pen / Text /
 * Actions, then Comment, a divider and the view toggles (hand, rulers, grid,
 * inspect). Dropdown rows: checkmark + icon + label + right-aligned shortcut,
 * selected row highlighted in Iris blue.
 */

import { useEffect, useRef, useState } from 'react';
import {
  Braces,
  Check,
  ChevronDown,
  Circle,
  Code2,
  Frame,
  Grid3x3,
  Hand,
  Hexagon,
  ImagePlus,
  MessageCircle,
  MousePointer2,
  MoveUpRight,
  Pencil,
  PenTool,
  Presentation,
  Ruler,
  Save,
  Scale,
  Slash,
  Square,
  Star,
  Type,
  type LucideIcon,
} from 'lucide-react';
import { useIris, type Tool } from '../engine/store';
import { pickImageFiles } from '../engine/files';

/* ------------------------------------------------------------------ */
/* tool definitions                                                    */
/* ------------------------------------------------------------------ */

interface ToolOption {
  tool?: Tool;
  label: string;
  shortcut?: string;
  Icon: LucideIcon;
  /** custom action (e.g. place image) instead of switching tools */
  run?: () => void;
}

interface ToolGroup {
  id: string;
  /** tools revealed in the dropdown */
  options: ToolOption[];
  /** fallback icon when no option in this group is active */
  Icon: LucideIcon;
  ariaLabel: string;
}

const GROUPS: ToolGroup[] = [
  {
    id: 'move',
    ariaLabel: 'Move tools',
    Icon: MousePointer2,
    options: [
      { tool: 'move', label: 'Move', shortcut: 'V', Icon: MousePointer2 },
      { tool: 'scale', label: 'Scale', shortcut: 'K', Icon: Scale },
      { tool: 'hand', label: 'Hand', shortcut: 'H', Icon: Hand },
    ],
  },
  {
    id: 'frame',
    ariaLabel: 'Frame tools',
    Icon: Frame,
    options: [
      { tool: 'frame', label: 'Frame', shortcut: 'F', Icon: Frame },
      { tool: 'section', label: 'Section', shortcut: 'Shift+S', Icon: Square },
      { tool: 'slice', label: 'Slice', shortcut: 'S', Icon: Slash },
    ],
  },
  {
    id: 'shape',
    ariaLabel: 'Shape tools',
    Icon: Square,
    options: [
      { tool: 'rect', label: 'Rectangle', shortcut: 'R', Icon: Square },
      { tool: 'line', label: 'Line', shortcut: 'L', Icon: Slash },
      { tool: 'arrow', label: 'Arrow', shortcut: 'Shift+L', Icon: MoveUpRight },
      { tool: 'ellipse', label: 'Ellipse', shortcut: 'O', Icon: Circle },
      { tool: 'polygon', label: 'Polygon', shortcut: 'Y', Icon: Hexagon },
      { tool: 'star', label: 'Star', Icon: Star },
      { label: 'Image / video…', shortcut: 'Ctrl+Shift+K', Icon: ImagePlus, run: () => void pickImageFiles() },
    ],
  },
  {
    id: 'pen',
    ariaLabel: 'Pen tools',
    Icon: PenTool,
    options: [
      { tool: 'pen', label: 'Pen', shortcut: 'P', Icon: PenTool },
      { tool: 'pencil', label: 'Pencil', shortcut: 'Shift+P', Icon: Pencil },
    ],
  },
  {
    id: 'text',
    ariaLabel: 'Text tools',
    Icon: Type,
    options: [{ tool: 'text', label: 'Text', shortcut: 'T', Icon: Type }],
  },
];

/* ------------------------------------------------------------------ */
/* dropdowns                                                           */
/* ------------------------------------------------------------------ */

function useDropdownCloser(ref: React.RefObject<HTMLDivElement | null>, onClose: () => void) {
  useEffect(() => {
    const onDown = (e: PointerEvent): void => {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) onClose();
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey, true);
    };
  }, [ref, onClose]);
}

function ToolDropdown({
  options,
  onClose,
}: {
  options: ToolOption[];
  onClose: () => void;
}) {
  const tool = useIris((s) => s.tool);
  const setTool = useIris((s) => s.setTool);
  const ref = useRef<HTMLDivElement>(null);
  useDropdownCloser(ref, onClose);

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Tool options"
      className="absolute bottom-full left-1/2 z-50 mb-2 w-[218px] -translate-x-1/2 rounded-lg border border-[#4E4E4E] bg-[#1E1E1E] py-1 shadow-2xl"
      style={{ animation: 'iris-menu-in 90ms ease-out' }}
    >
      {options.map((opt) => {
        const active = !!opt.tool && tool === opt.tool;
        return (
          <button
            key={opt.label}
            type="button"
            role="menuitemradio"
            aria-checked={active}
            onClick={() => {
              if (opt.run) opt.run();
              else if (opt.tool) setTool(opt.tool);
              onClose();
            }}
            className={`mx-1 flex h-8 w-[calc(100%-8px)] items-center gap-2.5 rounded-md px-2 text-left text-[12px] transition-colors ${
              active ? 'bg-[#0D99FF] text-white' : 'text-[#E5E5E5] hover:bg-[#3A3A3A]'
            }`}
          >
            <span className="flex w-3.5 shrink-0 justify-center" aria-hidden>
              {active ? <Check size={12} strokeWidth={2.5} /> : null}
            </span>
            <opt.Icon size={14} strokeWidth={1.75} aria-hidden className="shrink-0 opacity-90" />
            <span className="truncate">{opt.label}</span>
            {opt.shortcut ? (
              <span className={`ml-auto pl-4 text-[11px] ${active ? 'text-white/80' : 'text-[#8B8B8B]'}`}>
                {opt.shortcut}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/** A dropdown opened from the Actions ({}) button — quick utility actions. */
function ActionsDropdown({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDropdownCloser(ref, onClose);
  const setPresenting = useIris((s) => s.setPresenting);
  const setExportOpen = useIris((s) => s.setExportOpen);
  const setShortcutsOpen = useIris((s) => s.setShortcutsOpen);

  const items: ToolOption[] = [
    { label: 'Presentation', shortcut: 'Ctrl+Enter', Icon: Presentation, run: () => setPresenting(true) },
    { label: 'Export…', shortcut: 'Ctrl+Shift+E', Icon: Save, run: () => setExportOpen(true) },
    { label: 'Place image', shortcut: 'Ctrl+Shift+K', Icon: ImagePlus, run: () => void pickImageFiles() },
    { label: 'Keyboard shortcuts', shortcut: '?', Icon: Braces, run: () => setShortcutsOpen(true) },
  ];

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Actions"
      className="absolute bottom-full left-1/2 z-50 mb-2 w-[218px] -translate-x-1/2 rounded-lg border border-[#4E4E4E] bg-[#1E1E1E] py-1 shadow-2xl"
      style={{ animation: 'iris-menu-in 90ms ease-out' }}
    >
      {items.map((it) => (
        <button
          key={it.label}
          type="button"
          role="menuitem"
          onClick={() => {
            it.run?.();
            onClose();
          }}
          className="mx-1 flex h-8 w-[calc(100%-8px)] items-center gap-2.5 rounded-md px-2 text-left text-[12px] text-[#E5E5E5] transition-colors hover:bg-[#3A3A3A]"
        >
          <span className="w-3.5 shrink-0" aria-hidden />
          <it.Icon size={14} strokeWidth={1.75} aria-hidden className="shrink-0 opacity-90" />
          <span className="truncate">{it.label}</span>
          {it.shortcut ? <span className="ml-auto pl-4 text-[11px] text-[#8B8B8B]">{it.shortcut}</span> : null}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* toolbar                                                             */
/* ------------------------------------------------------------------ */

export function Toolbar() {
  const tool = useIris((s) => s.tool);
  const setTool = useIris((s) => s.setTool);
  const viewFlags = useIris((s) => s.viewFlags);
  const setViewFlag = useIris((s) => s.setViewFlag);
  const inspectMode = useIris((s) => s.inspectMode);
  const setInspectMode = useIris((s) => s.setInspectMode);

  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div
      className="flex max-w-full flex-wrap items-center justify-center gap-0.5 rounded-xl border border-[#3E3E3E] bg-[#2C2C2C] p-1 shadow-[0_8px_28px_rgba(0,0,0,0.45)]"
      role="toolbar"
      aria-label="Tools"
    >
      {GROUPS.map((g) => {
        const activeOpt = g.options.find((o) => o.tool === tool);
        const Icon = activeOpt?.Icon ?? g.Icon;
        const active = !!activeOpt;
        return (
          <div key={g.id} className="relative">
            <button
              type="button"
              className={`group flex h-9 items-center gap-0.5 rounded-lg px-1.5 transition-colors ${
                active ? 'bg-[#0D99FF] text-white' : 'text-[#D0D0D0] hover:bg-[#3A3A3A] hover:text-white'
              }`}
              data-active={active}
              aria-pressed={active}
              aria-label={g.ariaLabel}
              aria-haspopup="menu"
              aria-expanded={openGroup === g.id}
              title={g.ariaLabel}
              onClick={() => setOpenGroup(openGroup === g.id ? null : g.id)}
            >
              <Icon size={17} strokeWidth={1.75} aria-hidden />
              <ChevronDown
                size={10}
                strokeWidth={2.25}
                aria-hidden
                className={active ? 'text-white/85' : 'text-[#8B8B8B] group-hover:text-[#C9C9C9]'}
              />
            </button>
            {openGroup === g.id ? (
              <ToolDropdown options={g.options} onClose={() => setOpenGroup(null)} />
            ) : null}
          </div>
        );
      })}

      {/* actions {} */}
      <div className="relative">
        <button
          type="button"
          className="group flex h-9 items-center gap-0.5 rounded-lg px-1.5 text-[#D0D0D0] transition-colors hover:bg-[#3A3A3A] hover:text-white"
          aria-label="Actions"
          aria-haspopup="menu"
          aria-expanded={openGroup === 'actions'}
          title="Actions"
          onClick={() => setOpenGroup(openGroup === 'actions' ? null : 'actions')}
        >
          <Braces size={17} strokeWidth={1.75} aria-hidden />
          <ChevronDown size={10} strokeWidth={2.25} aria-hidden className="text-[#8B8B8B] group-hover:text-[#C9C9C9]" />
        </button>
        {openGroup === 'actions' ? <ActionsDropdown onClose={() => setOpenGroup(null)} /> : null}
      </div>

      {/* comment — no dropdown */}
      <button
        type="button"
        className="iris-pill-btn"
        data-active={tool === 'comment'}
        aria-pressed={tool === 'comment'}
        aria-label="Comment (C)"
        title="Comment (C)"
        onClick={() => setTool(tool === 'comment' ? 'move' : 'comment')}
      >
        <MessageCircle size={17} strokeWidth={1.75} aria-hidden />
      </button>

      <div className="mx-1 h-6 w-px bg-[#3E3E3E]" aria-hidden />

      {/* view toggles */}
      <button
        type="button"
        className="iris-pill-btn"
        data-active={tool === 'hand'}
        aria-pressed={tool === 'hand'}
        aria-label="Hand (H)"
        title="Hand (H)"
        onClick={() => setTool(tool === 'hand' ? 'move' : 'hand')}
      >
        <Hand size={17} strokeWidth={1.75} aria-hidden />
      </button>
      <button
        type="button"
        className="iris-pill-btn"
        data-active={viewFlags.rulers}
        aria-pressed={viewFlags.rulers}
        aria-label="Rulers (Shift+R)"
        title="Rulers (Shift+R)"
        onClick={() => setViewFlag('rulers', !viewFlags.rulers)}
      >
        <Ruler size={17} strokeWidth={1.75} aria-hidden />
      </button>
      <button
        type="button"
        className="iris-pill-btn"
        data-active={viewFlags.pixelGrid}
        aria-pressed={viewFlags.pixelGrid}
        aria-label="Pixel grid"
        title="Pixel grid"
        onClick={() => setViewFlag('pixelGrid', !viewFlags.pixelGrid)}
      >
        <Grid3x3 size={17} strokeWidth={1.75} aria-hidden />
      </button>
      <button
        type="button"
        className="iris-pill-btn"
        data-active={inspectMode}
        aria-pressed={inspectMode}
        aria-label="Inspect code"
        title="Inspect code"
        onClick={() => setInspectMode(!inspectMode)}
      >
        <Code2 size={17} strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}
