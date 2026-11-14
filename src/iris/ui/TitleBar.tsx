'use client';

/**
 * Title bar, two rows (per spec screenshots):
 *   Row 1 — app menu bar: Iris logo, File / Insert / Edit / View / Help,
 *           right side: save status + presentation toggle.
 *   Row 2 — tab bar: home button, the document tab (name + close), "+" new
 *           doc, right side: quick actions search + window controls.
 */

import { useEffect, useState, type ReactNode } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  ChevronDown,
  Cloud,
  Minus,
  Play,
  Plus,
  Search,
  Square,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIris } from '../engine/store';
import { clearRecents, getRecents, openIrisFile, pickImageFiles, saveIrisFile, type RecentDoc } from '../engine/files';
import { screenToWorld } from '../engine/geometry';

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const ITEM_CLS = 'text-[12px] text-[#E5E5E5] focus:bg-[#474747] focus:text-white';
const HINT_CLS = 'ml-auto pl-6 text-[11px] text-[#8B8B8B]';
const SEP_CLS = 'bg-[#3E3E3E]';
const MENU_CLS = 'border-[#4E4E4E] bg-[#2C2C2C] text-white';

/**
 * Radix returns focus to the trigger after the menu closes; blur it on the
 * next tick so the engine's global keyboard shortcuts keep working.
 */
function blurActive(): void {
  setTimeout(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  }, 0);
}

/** Compact relative time for the recents list, e.g. "2h ago". */
function timeAgo(ts: number): string {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 45) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  const w = Math.floor(d / 7);
  if (w < 5) return `${w}w ago`;
  return new Date(ts).toLocaleDateString();
}

/* ------------------------------------------------------------------ */
/* small building blocks                                               */
/* ------------------------------------------------------------------ */

/** Iris flower mark: three petals rotated 0/120/240 degrees + white core. */
function IrisLogo({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <g fill="#0D99FF">
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" />
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(120 8 8)" />
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(240 8 8)" />
      </g>
      <circle cx="8" cy="8" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/** One top-level menu (File / Insert / Edit / View / Help). */
function TopMenu({
  label,
  onOpenChange,
  children,
}: {
  label: string;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-6 rounded px-2 text-[12px] text-[#C9C9C9] hover:bg-[#383838] data-[state=open]:bg-[#383838]"
        >
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={MENU_CLS}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** A plain menu entry that runs a store action, then blurs focus. */
function MenuEntry({
  label,
  shortcut,
  disabled,
  action,
}: {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  action: () => void;
}) {
  return (
    <DropdownMenuItem
      className={ITEM_CLS}
      disabled={disabled}
      onSelect={() => {
        blurActive();
        action();
      }}
    >
      {label}
      {shortcut ? <span className={HINT_CLS}>{shortcut}</span> : null}
    </DropdownMenuItem>
  );
}

/* ------------------------------------------------------------------ */
/* TitleBar                                                            */
/* ------------------------------------------------------------------ */

export function TitleBar() {
  const docName = useIris((s) => s.doc.name);
  const dirty = useIris((s) => s.dirty);
  const hasSelection = useIris((s) => s.selection.length > 0);
  const canUndo = useIris((s) => s.past.length > 0);
  const canRedo = useIris((s) => s.future.length > 0);
  const hasClipboard = useIris((s) => !!s.clipboard);
  const rulers = useIris((s) => s.viewFlags.rulers);
  const pixelGrid = useIris((s) => s.viewFlags.pixelGrid);
  const outline = useIris((s) => s.viewFlags.outline);
  const gridShow = useIris((s) => s.doc.settings.grid.show);
  const gridSnap = useIris((s) => s.doc.settings.grid.snap);
  const guideCount = useIris(
    (s) => s.doc.settings.guidesX.length + s.doc.settings.guidesY.length,
  );
  const inspectMode = useIris((s) => s.inspectMode);

  const actions = useIris(
    useShallow((s) => ({
      newDoc: s.newDoc,
      loadDoc: s.loadDoc,
      goHome: s.goHome,
      setExportOpen: s.setExportOpen,
      setShortcutsOpen: s.setShortcutsOpen,
      setViewFlag: s.setViewFlag,
      setInspectMode: s.setInspectMode,
      setPresenting: s.setPresenting,
      zoomAt: s.zoomAt,
      zoomReset: s.zoomReset,
      zoomToFit: s.zoomToFit,
      zoomToSelection: s.zoomToSelection,
      undo: s.undo,
      redo: s.redo,
      copySelection: s.copySelection,
      cutSelection: s.cutSelection,
      paste: s.paste,
      duplicateSelection: s.duplicateSelection,
      deleteSelection: s.deleteSelection,
      selectAll: s.selectAll,
      selectSameType: s.selectSameType,
      groupSelection: s.groupSelection,
      ungroupSelection: s.ungroupSelection,
      zorder: s.zorder,
      flipSelection: s.flipSelection,
      rotateSelectionBy: s.rotateSelectionBy,
      toggleLockSelection: s.toggleLockSelection,
      unlockAllOnPage: s.unlockAllOnPage,
      toggleHideSelection: s.toggleHideSelection,
      copyStyle: s.copyStyle,
      pasteStyle: s.pasteStyle,
      hasStyleClipboard: !!s.styleClipboard,
      addNode: s.addNode,
      setGridSettings: s.setGridSettings,
      clearGuides: s.clearGuides,
      viewport: s.viewport,
      canvasSize: s.canvasSize,
      toast: s.toast,
    })),
  );

  const [recents, setRecents] = useState<RecentDoc[]>([]);

  /** insert a centered frame of a preset size */
  const insertFrame = (w: number, h: number, name: string): void => {
    const { viewport, canvasSize } = actions;
    const center = screenToWorld(viewport, Math.max(0, canvasSize.w / 2 - 10), Math.max(0, canvasSize.h / 2 - 10));
    actions.addNode('frame', { x: center.x - w / 2, y: center.y - h / 2, w, h, name }, null);
  };

  const toggleFullscreen = (): void => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => undefined);
  };

  return (
    <header className="relative z-30 shrink-0">
      {/* ── row 1: app menu bar ─────────────────────────────────── */}
      <div className="flex h-8 items-center gap-1 border-b border-[#2A2A2A] bg-[#1E1E1E] px-2">
        <button
          type="button"
          onClick={() => actions.goHome()}
          title="Iris — back to files"
          aria-label="Iris — back to files"
          className="flex h-6 w-7 items-center justify-center rounded hover:bg-[#383838]"
        >
          <IrisLogo />
        </button>

        <TopMenu
          label="File"
          onOpenChange={(open) => {
            if (open) setRecents(getRecents());
          }}
        >
          <MenuEntry label="Back to Files" action={() => actions.goHome()} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="New Document" action={actions.newDoc} />
          <MenuEntry label="Open…" shortcut="Ctrl+O" action={() => openIrisFile()} />
          <MenuEntry label="Save" shortcut="Ctrl+S" action={() => void saveIrisFile()} />
          <MenuEntry label="Save As…" shortcut="Ctrl+Shift+S" action={() => void saveIrisFile({ as: true })} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Export…" shortcut="Ctrl+Shift+E" action={() => actions.setExportOpen(true)} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={ITEM_CLS}>Open Recent</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className={`${MENU_CLS} w-60`}>
              {recents.length === 0 ? (
                <DropdownMenuItem className={ITEM_CLS} disabled>
                  No recent documents
                </DropdownMenuItem>
              ) : (
                <>
                  {recents.map((r) => (
                    <DropdownMenuItem
                      key={`${r.name}:${r.savedAt}`}
                      className={ITEM_CLS}
                      disabled={!r.doc}
                      title={r.doc ? `Open ${r.name}` : 'Snapshot unavailable'}
                      onSelect={() => {
                        if (!r.doc) return;
                        blurActive();
                        actions.loadDoc(r.doc, r.name, true);
                      }}
                    >
                      <span className="min-w-0 truncate">{r.name}</span>
                      <span className={`${HINT_CLS} shrink-0 pl-4`}>{timeAgo(r.savedAt)}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className={SEP_CLS} />
                  <DropdownMenuItem
                    className={ITEM_CLS}
                    onSelect={() => {
                      blurActive();
                      clearRecents();
                      setRecents([]);
                    }}
                  >
                    Clear recent list
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </TopMenu>

        <TopMenu label="Insert">
          <MenuEntry label="Frame" shortcut="F" action={() => useIris.getState().setTool('frame')} />
          <MenuEntry label="Section" shortcut="Shift+S" action={() => useIris.getState().setTool('section')} />
          <MenuEntry label="Slice" shortcut="S" action={() => useIris.getState().setTool('slice')} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Rectangle" shortcut="R" action={() => useIris.getState().setTool('rect')} />
          <MenuEntry label="Line" shortcut="L" action={() => useIris.getState().setTool('line')} />
          <MenuEntry label="Arrow" shortcut="Shift+L" action={() => useIris.getState().setTool('arrow')} />
          <MenuEntry label="Ellipse" shortcut="O" action={() => useIris.getState().setTool('ellipse')} />
          <MenuEntry label="Polygon" shortcut="Y" action={() => useIris.getState().setTool('polygon')} />
          <MenuEntry label="Star" action={() => useIris.getState().setTool('star')} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Text" shortcut="T" action={() => useIris.getState().setTool('text')} />
          <MenuEntry label="Pen" shortcut="P" action={() => useIris.getState().setTool('pen')} />
          <MenuEntry label="Pencil" shortcut="Shift+P" action={() => useIris.getState().setTool('pencil')} />
          <MenuEntry label="Comment" shortcut="C" action={() => useIris.getState().setTool('comment')} />
          <MenuEntry label="Image…" shortcut="Ctrl+Shift+K" action={() => pickImageFiles()} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <DropdownMenuItem className="text-[11px] text-[#8B8B8B]" disabled>
            Frame presets
          </DropdownMenuItem>
          <MenuEntry label="Phone — 390×844" action={() => insertFrame(390, 844, 'Phone')} />
          <MenuEntry label="Tablet — 820×1180" action={() => insertFrame(820, 1180, 'Tablet')} />
          <MenuEntry label="Desktop — 1440×900" action={() => insertFrame(1440, 900, 'Desktop')} />
          <MenuEntry label="Watch — 198×242" action={() => insertFrame(198, 242, 'Watch')} />
          <MenuEntry label="Story — 1080×1920" action={() => insertFrame(1080, 1920, 'Story')} />
          <MenuEntry label="A4 — 794×1123" action={() => insertFrame(794, 1123, 'A4')} />
        </TopMenu>

        <TopMenu label="Edit">
          <MenuEntry label="Undo" shortcut="Ctrl+Z" disabled={!canUndo} action={actions.undo} />
          <MenuEntry label="Redo" shortcut="Ctrl+Shift+Z" disabled={!canRedo} action={actions.redo} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Copy" shortcut="Ctrl+C" disabled={!hasSelection} action={actions.copySelection} />
          <MenuEntry label="Cut" shortcut="Ctrl+X" disabled={!hasSelection} action={actions.cutSelection} />
          <MenuEntry label="Paste" shortcut="Ctrl+V" disabled={!hasClipboard} action={() => actions.paste(null)} />
          <MenuEntry
            label="Duplicate"
            shortcut="Ctrl+D"
            disabled={!hasSelection}
            action={() => actions.duplicateSelection()}
          />
          <MenuEntry label="Delete" disabled={!hasSelection} action={actions.deleteSelection} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Select All" shortcut="Ctrl+A" action={actions.selectAll} />
          <MenuEntry
            label="Select Same Type"
            shortcut="Ctrl+Shift+A"
            disabled={!hasSelection}
            action={actions.selectSameType}
          />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Copy Style" shortcut="Ctrl+Alt+C" disabled={!hasSelection} action={actions.copyStyle} />
          <MenuEntry
            label="Paste Style"
            shortcut="Ctrl+Alt+V"
            disabled={!hasSelection || !actions.hasStyleClipboard}
            action={actions.pasteStyle}
          />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Flip Horizontal" shortcut="Shift+H" disabled={!hasSelection} action={() => actions.flipSelection('h')} />
          <MenuEntry label="Flip Vertical" shortcut="Shift+V" disabled={!hasSelection} action={() => actions.flipSelection('v')} />
          <MenuEntry label="Rotate 90° CW" disabled={!hasSelection} action={() => actions.rotateSelectionBy(90)} />
          <MenuEntry label="Rotate 90° CCW" disabled={!hasSelection} action={() => actions.rotateSelectionBy(-90)} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Lock / Unlock" shortcut="Ctrl+L" disabled={!hasSelection} action={actions.toggleLockSelection} />
          <MenuEntry label="Unlock All on Page" shortcut="Ctrl+Shift+L" action={actions.unlockAllOnPage} />
          <MenuEntry label="Hide / Show" shortcut="Ctrl+Shift+H" disabled={!hasSelection} action={actions.toggleHideSelection} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Group" shortcut="Ctrl+G" disabled={!hasSelection} action={actions.groupSelection} />
          <MenuEntry
            label="Ungroup"
            shortcut="Ctrl+Shift+G"
            disabled={!hasSelection}
            action={actions.ungroupSelection}
          />
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry
            label="Bring Forward"
            shortcut="]"
            disabled={!hasSelection}
            action={() => actions.zorder('forward')}
          />
          <MenuEntry
            label="Send Backward"
            shortcut="["
            disabled={!hasSelection}
            action={() => actions.zorder('backward')}
          />
          <MenuEntry
            label="Bring to Front"
            shortcut="Ctrl+]"
            disabled={!hasSelection}
            action={() => actions.zorder('front')}
          />
          <MenuEntry
            label="Send to Back"
            shortcut="Ctrl+["
            disabled={!hasSelection}
            action={() => actions.zorder('back')}
          />
        </TopMenu>

        <TopMenu label="View">
          <MenuEntry label="Zoom In" shortcut="Ctrl+=" action={() => actions.zoomAt(1.2)} />
          <MenuEntry label="Zoom Out" shortcut="Ctrl+-" action={() => actions.zoomAt(1 / 1.2)} />
          <MenuEntry label="Reset Zoom" shortcut="Ctrl+0" action={actions.zoomReset} />
          <MenuEntry label="Zoom to Fit" shortcut="Shift+1" action={actions.zoomToFit} />
          <MenuEntry label="Zoom to Selection" shortcut="Shift+2" action={actions.zoomToSelection} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <DropdownMenuCheckboxItem
            className={ITEM_CLS}
            checked={rulers}
            onCheckedChange={(v) => {
              blurActive();
              actions.setViewFlag('rulers', v);
            }}
          >
            Rulers
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className={ITEM_CLS}
            checked={pixelGrid}
            onCheckedChange={(v) => {
              blurActive();
              actions.setViewFlag('pixelGrid', v);
            }}
          >
            Pixel Grid
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className={ITEM_CLS}
            checked={outline}
            onCheckedChange={(v) => {
              blurActive();
              actions.setViewFlag('outline', v);
            }}
          >
            Outline Mode
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className={ITEM_CLS}
            checked={gridShow}
            onCheckedChange={(v) => {
              blurActive();
              actions.setGridSettings({ show: v });
            }}
          >
            Layout Grid
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className={ITEM_CLS}
            checked={gridSnap}
            onCheckedChange={(v) => {
              blurActive();
              actions.setGridSettings({ snap: v });
            }}
          >
            Snap to Grid
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className={ITEM_CLS}
            checked={inspectMode}
            onCheckedChange={(v) => {
              blurActive();
              actions.setInspectMode(v);
            }}
          >
            Inspect Code Mode
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator className={SEP_CLS} />
          <MenuEntry label="Clear Guides" disabled={guideCount === 0} action={actions.clearGuides} />
          <MenuEntry label="Fullscreen" action={toggleFullscreen} />
        </TopMenu>

        <TopMenu label="Help">
          <MenuEntry label="Keyboard Shortcuts" shortcut="?" action={() => actions.setShortcutsOpen(true)} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <DropdownMenuItem className="text-[12px] text-[#8B8B8B]" disabled>
            Iris v2 — local-first, MIT licensed
          </DropdownMenuItem>
        </TopMenu>

        {/* right: save status + present */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className="flex h-6 items-center gap-1.5 rounded px-1.5 text-[11px] text-[#9A9A9A] hover:bg-[#383838] hover:text-[#E5E5E5]"
            title={dirty ? 'Unsaved changes — autosaves locally' : 'All changes saved locally'}
            aria-label={dirty ? 'Unsaved changes' : 'All changes saved'}
            onClick={() => void saveIrisFile()}
          >
            <Cloud size={14} strokeWidth={1.75} aria-hidden className={dirty ? 'text-[#0D99FF]' : ''} />
            <span className="hidden sm:inline">{dirty ? 'Saving…' : 'Saved'}</span>
          </button>
          <button
            type="button"
            className="flex h-6 items-center gap-1.5 rounded px-1.5 text-[11px] text-[#C9C9C9] hover:bg-[#383838] hover:text-white"
            title="Presentation — Ctrl+Enter"
            aria-label="Start presentation"
            onClick={() => actions.setPresenting(true)}
          >
            <Play size={13} strokeWidth={2} aria-hidden />
            <span className="hidden sm:inline">Present</span>
          </button>
        </div>
      </div>

      {/* ── row 2: tab bar ──────────────────────────────────────── */}
      <div className="flex h-9 items-center gap-1 border-b border-[#2A2A2A] bg-[#2C2C2C] px-1.5">
        <button
          type="button"
          className="iris-icon-btn h-7! w-7!"
          aria-label="Home — file browser"
          title="Home"
          onClick={() => actions.goHome()}
        >
          <IrisLogo size={15} />
        </button>

        {/* the document tab */}
        <div className="group flex h-7 max-w-[220px] items-center gap-1.5 rounded-t-lg border border-b-0 border-[#3E3E3E] bg-[#1E1E1E] px-2.5" role="tab" aria-selected="true">
          <IrisLogo size={12} />
          <span className="min-w-0 truncate text-[11px] font-medium text-[#E5E5E5]">{docName}</span>
          <span
            className={`h-1 w-1 shrink-0 rounded-full ${dirty ? 'bg-[#0D99FF]' : 'bg-transparent'}`}
            title={dirty ? 'Unsaved changes' : 'Saved'}
            aria-hidden="true"
          />
          <button
            type="button"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[#9A9A9A] transition-colors hover:bg-[#474747] hover:text-white"
            aria-label="Close file — back to files"
            title="Close"
            onClick={() => actions.goHome()}
          >
            <X size={12} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <button
          type="button"
          className="iris-icon-btn h-7! w-7!"
          aria-label="New document"
          title="New document"
          onClick={() => actions.newDoc()}
        >
          <Plus size={15} strokeWidth={2} aria-hidden />
        </button>

        {/* right: quick actions + window controls */}
        <div className="ml-auto flex items-center gap-0.5">
          <button
            type="button"
            className="flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] text-[#9A9A9A] transition-colors hover:bg-[#383838] hover:text-[#E5E5E5]"
            aria-label="Search menu"
            title="Search menu (Ctrl+/)"
            onClick={() => actions.setShortcutsOpen(true)}
          >
            <Search size={13} strokeWidth={2} aria-hidden />
            <span className="hidden md:inline">Search</span>
            <ChevronDown size={11} strokeWidth={2} aria-hidden className="hidden md:inline" />
          </button>

          <div className="mx-1 h-4 w-px bg-[#3E3E3E]" aria-hidden />

          <button
            type="button"
            className="iris-icon-btn h-7! w-8!"
            aria-label="Minimize (preview)"
            title="Minimize"
            onClick={() => actions.toast('Window controls are decorative in the web preview')}
          >
            <Minus size={13} strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            className="iris-icon-btn h-7! w-8!"
            aria-label="Toggle fullscreen"
            title="Fullscreen"
            onClick={toggleFullscreen}
          >
            <Square size={12} strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            className="flex h-7 w-8 items-center justify-center rounded-md text-[#9A9A9A] transition-colors hover:bg-[#F24822] hover:text-white"
            aria-label="Close file — back to files"
            title="Close"
            onClick={() => actions.goHome()}
          >
            <X size={14} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
