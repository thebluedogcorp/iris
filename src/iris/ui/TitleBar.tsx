'use client';

/**
 * Title bar: iris logo, native-style menu bar (File / Edit / View / Help),
 * a centered document-name editor with dirty indicator, and a badge.
 */

import { useEffect, useState, type ReactNode } from 'react';
import { useShallow } from 'zustand/react/shallow';
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
import { clearRecents, getRecents, openIrisFile, saveIrisFile, type RecentDoc } from '../engine/files';

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
function IrisLogo() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <g fill="#8B5CF6">
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" />
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(120 8 8)" />
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(240 8 8)" />
      </g>
      <circle cx="8" cy="8" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/** One top-level menu (File / Edit / View / Help). */
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
          className="h-7 rounded px-2 text-[12px] text-[#C9C9C9] hover:bg-[#383838] data-[state=open]:bg-[#383838]"
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

  const actions = useIris(
    useShallow((s) => ({
      newDoc: s.newDoc,
      loadDoc: s.loadDoc,
      goHome: s.goHome,
      setDocName: s.setDocName,
      setExportOpen: s.setExportOpen,
      setShortcutsOpen: s.setShortcutsOpen,
      setViewFlag: s.setViewFlag,
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
      groupSelection: s.groupSelection,
      ungroupSelection: s.ungroupSelection,
      zorder: s.zorder,
    })),
  );

  const [recents, setRecents] = useState<RecentDoc[]>([]);
  const [nameDraft, setNameDraft] = useState(docName);

  /* keep the draft in sync when the doc name changes elsewhere (undo / open) */
  useEffect(() => {
    setNameDraft(docName);
  }, [docName]);

  const commitName = (): void => {
    const trimmed = nameDraft.trim();
    if (trimmed && trimmed !== docName) actions.setDocName(trimmed);
    else setNameDraft(docName);
  };

  return (
    <header className="relative flex h-9 items-center gap-1 border-b border-[#3E3E3E] bg-[#1E1E1E] px-2">
      {/* left: logo + menus */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => actions.goHome()}
          title="Back to files"
          aria-label="Iris — back to files"
          className="flex h-7 w-7 items-center justify-center rounded hover:bg-[#383838]"
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
          <MenuEntry label="Export…" action={() => actions.setExportOpen(true)} />
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
        </TopMenu>

        <TopMenu label="Help">
          <MenuEntry label="Keyboard Shortcuts" action={() => actions.setShortcutsOpen(true)} />
          <DropdownMenuSeparator className={SEP_CLS} />
          <DropdownMenuItem className="text-[12px] text-[#8B8B8B]" disabled>
            Iris v1 — local-first, MIT licensed
          </DropdownMenuItem>
        </TopMenu>
      </div>

      {/* center: document name + dirty dot */}
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${dirty ? 'bg-[#8B5CF6]' : 'bg-[#5B5B5B]'}`}
          title={dirty ? 'Unsaved changes' : 'All changes saved'}
          aria-hidden="true"
        />
        <input
          className="w-40 rounded bg-transparent text-center text-[12px] font-medium text-white focus:bg-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#4E4E4E]"
          value={nameDraft}
          aria-label="Document name"
          spellCheck={false}
          onChange={(e) => setNameDraft(e.target.value)}
          onBlur={commitName}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              commitName();
              e.currentTarget.blur();
            } else if (e.key === 'Escape') {
              setNameDraft(docName);
              e.currentTarget.blur();
            }
          }}
        />
      </div>

      {/* right: badge */}
      <div className="ml-auto">
        <span className="rounded border border-[#3E3E3E] px-1.5 py-0.5 text-[10px] text-[#9A9A9A]">
          Local-first
        </span>
      </div>
    </header>
  );
}
