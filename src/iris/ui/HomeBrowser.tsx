'use client';

/**
 * Iris homepage — the file browser. Every document in the local library is
 * displayed as a card with a live thumbnail; supports search, sort, grid /
 * list views, rename / duplicate / delete, and instant switching between
 * documents (each open document lives at /?doc=<id>).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Clock,
  Copy,
  Files,
  LayoutGrid,
  List,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIris } from '../engine/store';
import { openIrisFile } from '../engine/files';
import { TEMPLATES } from '../engine/templates';
import { getSession, initialsFor, signOut } from '../auth/session';
import {
  deleteDocInLibrary,
  duplicateDocInLibrary,
  libraryStats,
  listDocs,
  renameDocInLibrary,
  type LibEntry,
} from '../engine/library';

/* ------------------------------------------------------------------ */
/* helpers + shared styles                                             */
/* ------------------------------------------------------------------ */

const MENU_CLS = 'border-[#4E4E4E] bg-[#2C2C2C] text-white';
const ITEM_CLS = 'text-[12px] text-[#E5E5E5] focus:bg-[#474747] focus:text-white';
const DANGER_CLS = 'text-[12px] text-[#FF8A8A] focus:bg-[#474747] focus:text-[#FFA3A3]';

type SortMode = 'updated' | 'created' | 'name';
type NavKey = 'recent' | 'all';

/** Compact relative time, e.g. "2h ago". */
function timeAgo(ts: number): string {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 45) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  if (d < 35) return `${Math.floor(d / 7)}w ago`;
  return new Date(ts).toLocaleDateString();
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Iris flower mark (three petals + white core). */
function IrisMark({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false" className={className}>
      <g fill="#8B5CF6">
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" />
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(120 8 8)" />
        <ellipse cx="8" cy="4.6" rx="2.7" ry="4.5" transform="rotate(240 8 8)" />
      </g>
      <circle cx="8" cy="8" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* card menus (dropdown "…" button + right-click share the same items)  */
/* ------------------------------------------------------------------ */

interface DocMenuActions {
  onOpen: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

function DocMenuItems({ entry, actions, kind }: { entry: LibEntry; actions: DocMenuActions; kind: 'dropdown' | 'context' }) {
  const Item = kind === 'dropdown' ? DropdownMenuItem : ContextMenuItem;
  const Sep = kind === 'dropdown' ? DropdownMenuSeparator : ContextMenuSeparator;
  return (
    <>
      <Item className={ITEM_CLS} onSelect={() => actions.onOpen()}>
        Open
      </Item>
      <Item className={ITEM_CLS} onSelect={() => actions.onRename()}>
        Rename…
      </Item>
      <Item className={ITEM_CLS} onSelect={() => actions.onDuplicate()}>
        Duplicate
      </Item>
      <Sep className="bg-[#3E3E3E]" />
      <Item className={DANGER_CLS} onSelect={() => actions.onDelete()}>
        Delete…
      </Item>
      <span className="sr-only">Actions for {entry.name}</span>
    </>
  );
}

function CardMenu({ entry, actions }: { entry: LibEntry; actions: DocMenuActions }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`More options for ${entry.name}`}
          onClick={(e) => e.stopPropagation()}
          className="flex size-6 items-center justify-center rounded-md bg-black/55 text-[#C9C9C9] backdrop-blur-sm transition-colors hover:bg-[#383838] hover:text-white"
        >
          <MoreHorizontal className="size-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={MENU_CLS}>
        <DocMenuItems entry={entry} actions={actions} kind="dropdown" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Thumbnail image or the empty-document placeholder. */
function Thumb({ entry, tiny = false }: { entry: LibEntry; tiny?: boolean }) {
  if (entry.thumb) {
    return <img src={entry.thumb} alt={`Preview of ${entry.name}`} draggable={false} className="h-full w-full object-cover" />;
  }
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
      <IrisMark size={tiny ? 18 : 40} className="opacity-25" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* account chip (preview session — sign out returns to the website)    */
/* ------------------------------------------------------------------ */

function AccountChip() {
  const session = getSession();
  if (!session) return null;
  const initials = initialsFor(session.name);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Account: ${session.name}`}
          className="flex size-8 items-center justify-center rounded-full bg-[#8B5CF6] text-[11px] font-semibold text-white ring-offset-2 ring-offset-[#1E1E1E] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          {initials}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={MENU_CLS}>
        <div className="px-2.5 py-2">
          <p className="max-w-[200px] truncate text-[12px] font-medium text-white">{session.name}</p>
          <p className="max-w-[200px] truncate text-[11px] text-[#9A9A9A]">{session.email}</p>
          <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#383838] px-1.5 py-0.5 text-[9.5px] uppercase tracking-wide text-[#C9A7FF]">
            Preview account
          </p>
        </div>
        <DropdownMenuSeparator className="bg-[#3E3E3E]" />
        <DropdownMenuItem
          className={DANGER_CLS}
          onSelect={() => {
            signOut();
            useIris.getState().toast('Signed out — see you soon');
          }}
        >
          Sign out &amp; back to website
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ------------------------------------------------------------------ */
/* HomeBrowser                                                         */
/* ------------------------------------------------------------------ */

export function HomeBrowser() {
  const toast = useIris((s) => s.toast);

  const [entries, setEntries] = useState<LibEntry[]>(() => listDocs());
  const [stats, setStats] = useState(() => libraryStats());
  const [query, setQuery] = useState('');
  const [nav, setNav] = useState<NavKey>('recent');
  const [sort, setSort] = useState<SortMode>('created');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [renameTarget, setRenameTarget] = useState<LibEntry | null>(null);
  const [renameDraft, setRenameDraft] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<LibEntry | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  /** Re-read the library index (+ stats); late refresh catches async thumbs. */
  const refresh = useCallback((late = false) => {
    if (late) {
      setTimeout(() => {
        setEntries(listDocs());
        setStats(libraryStats());
      }, 700);
      return;
    }
    setEntries(listDocs());
    setStats(libraryStats());
  }, []);

  const openRename = useCallback((entry: LibEntry) => {
    setRenameDraft(entry.name);
    setRenameTarget(entry);
  }, []);

  /* "/" focuses search from anywhere on the homepage */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (e.key === '/' && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = entries.filter((e) => e.name.toLowerCase().includes(q));
    if (nav === 'recent' || (nav === 'all' && sort === 'updated')) {
      return [...list].sort((a, b) => b.updatedAt - a.updatedAt);
    }
    if (sort === 'created') return [...list].sort((a, b) => b.createdAt - a.createdAt);
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [entries, query, nav, sort]);

  /* ---------------------------- actions ---------------------------- */

  const open = useCallback((id: string) => {
    useIris.getState().openDoc(id);
  }, []);

  const createNew = useCallback(() => {
    useIris.getState().newDoc();
  }, []);

  const createFromTemplate = useCallback((templateId: string) => {
    useIris.getState().newDocFromTemplate(templateId);
  }, []);

  const importFile = useCallback(() => {
    openIrisFile();
  }, []);

  const menuActions = useCallback(
    (entry: LibEntry): DocMenuActions => ({
      onOpen: () => open(entry.id),
      onRename: () => openRename(entry),
      onDuplicate: () => {
        const dup = duplicateDocInLibrary(entry.id);
        if (dup) toast(`Duplicated “${entry.name}”`);
        refresh();
        refresh(true);
      },
      onDelete: () => setDeleteTarget(entry),
    }),
    [open, openRename, refresh, toast],
  );

  const confirmRename = useCallback(() => {
    if (!renameTarget) return;
    const name = renameDraft.trim();
    if (name && name !== renameTarget.name) {
      renameDocInLibrary(renameTarget.id, name);
      toast(`Renamed to “${name}”`);
    }
    setRenameTarget(null);
    refresh();
  }, [renameTarget, renameDraft, refresh, toast]);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    deleteDocInLibrary(deleteTarget.id);
    /* safety: never leave the editor backed by a deleted doc */
    if (useIris.getState().docId === deleteTarget.id) {
      useIris.setState({ docId: null });
    }
    toast(`Deleted “${deleteTarget.name}”`);
    setDeleteTarget(null);
    refresh();
  }, [deleteTarget, refresh, toast]);

  /* ---------------------------- render ----------------------------- */

  const sectionTitle = nav === 'recent' ? 'Recent files' : 'All files';

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-[#1E1E1E] font-sans text-white antialiased">
      {/* ------------------------------ header ------------------------------ */}
      <header className="flex h-14 shrink-0 select-none items-center gap-2 border-b border-[#3E3E3E] px-3 sm:gap-3 sm:px-4">
        <div className="flex shrink-0 items-center gap-2" aria-label="Iris">
          <IrisMark size={22} />
          <span className="text-[15px] font-semibold tracking-tight">Iris</span>
        </div>

        <div className="mx-1 hidden h-5 w-px bg-[#3E3E3E] md:block" aria-hidden="true" />

        {/* search */}
        <div className="relative ml-auto w-32 min-w-0 flex-1 sm:ml-1 sm:max-w-[300px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#8B8B8B]" aria-hidden="true" />
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setQuery('');
                e.currentTarget.blur();
              } else if (e.key === 'Enter' && visible.length > 0) {
                open(visible[0].id);
              }
            }}
            placeholder="Search files"
            aria-label="Search files"
            spellCheck={false}
            className="h-8 w-full rounded-md border border-transparent bg-[#2C2C2C] pl-8 pr-8 text-[12px] text-white caret-[#8B5CF6] transition-colors placeholder:text-[#7A7A7A] focus:border-[#4E4E4E] focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('');
                searchRef.current?.focus();
              }}
              className="absolute right-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded text-[#8B8B8B] hover:bg-[#383838] hover:text-white"
            >
              <X className="size-3" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-[#4E4E4E] px-1 text-[10px] leading-4 text-[#8B8B8B] sm:block">
              /
            </kbd>
          )}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <AccountChip />
          <button
            type="button"
            onClick={importFile}
            className="hidden h-8 items-center gap-1.5 rounded-md border border-[#4E4E4E] px-2.5 text-[12px] text-[#E5E5E5] transition-colors hover:bg-[#2C2C2C] sm:inline-flex"
          >
            <Upload className="size-3.5" aria-hidden="true" />
            Import
          </button>
          <button
            type="button"
            onClick={createNew}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#8B5CF6] px-2.5 text-[12px] font-medium text-white transition-colors hover:bg-[#7C4DF3] sm:px-3"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">New design file</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* ----------------------------- sidebar ----------------------------- */}
        <aside className="hidden w-52 shrink-0 select-none flex-col border-r border-[#3E3E3E] p-3 md:flex" aria-label="Browse files">
          <p className="px-2 pb-2 pt-1 text-[10px] font-medium uppercase tracking-wider text-[#7A7A7A]">
            Browse
          </p>
          <nav className="flex flex-col gap-0.5">
            <SidebarItem icon={<Clock className="size-3.5" />} label="Recent files" active={nav === 'recent'} onClick={() => setNav('recent')} />
            <SidebarItem icon={<Files className="size-3.5" />} label="All files" active={nav === 'all'} onClick={() => setNav('all')} />
          </nav>

          <div className="mt-auto flex flex-col gap-2 px-1">
            <button
              type="button"
              onClick={importFile}
              className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-[12px] text-[#C9C9C9] transition-colors hover:bg-[#2C2C2C] hover:text-white"
            >
              <Upload className="size-3.5" aria-hidden="true" />
              Import .iris file
            </button>
          </div>
        </aside>

        {/* ------------------------------ main ------------------------------ */}
        <section className="min-w-0 flex-1 overflow-y-auto" aria-label={`${sectionTitle} list`}>
          <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
            {/* section header */}
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-[15px] font-semibold">{sectionTitle}</h1>
              <span className="rounded-full bg-[#2C2C2C] px-2 py-0.5 text-[11px] text-[#9A9A9A]">
                {visible.length} {visible.length === 1 ? 'file' : 'files'}
              </span>

              {/* mobile nav (sidebar is hidden on small screens) */}
              <div className="flex gap-1 md:hidden">
                <button
                  type="button"
                  aria-pressed={nav === 'recent'}
                  onClick={() => setNav('recent')}
                  className={`h-7 rounded-md px-2.5 text-[11px] ${nav === 'recent' ? 'bg-[#383838] text-white' : 'text-[#9A9A9A] hover:bg-[#2C2C2C]'}`}
                >
                  Recent
                </button>
                <button
                  type="button"
                  aria-pressed={nav === 'all'}
                  onClick={() => setNav('all')}
                  className={`h-7 rounded-md px-2.5 text-[11px] ${nav === 'all' ? 'bg-[#383838] text-white' : 'text-[#9A9A9A] hover:bg-[#2C2C2C]'}`}
                >
                  All
                </button>
              </div>

              <div className="ml-auto flex items-center gap-2">
                {nav === 'all' && (
                  <Select value={sort} onValueChange={(v) => setSort(v as SortMode)}>
                    <SelectTrigger
                      aria-label="Sort files"
                      className="h-7 w-[120px] rounded-md border-[#4E4E4E] bg-[#1E1E1E] text-[11px] text-[#C9C9C9] shadow-none"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={MENU_CLS}>
                      <SelectItem className={ITEM_CLS} value="updated">
                        Last updated
                      </SelectItem>
                      <SelectItem className={ITEM_CLS} value="created">
                        Date created
                      </SelectItem>
                      <SelectItem className={ITEM_CLS} value="name">
                        Name
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <div className="flex items-center gap-0.5 rounded-md border border-[#4E4E4E] p-0.5" role="group" aria-label="View">
                  <button
                    type="button"
                    aria-label="Grid view"
                    aria-pressed={view === 'grid'}
                    onClick={() => setView('grid')}
                    className={`flex size-6 items-center justify-center rounded ${view === 'grid' ? 'bg-[#383838] text-white' : 'text-[#9A9A9A] hover:bg-[#2C2C2C]'}`}
                  >
                    <LayoutGrid className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    aria-pressed={view === 'list'}
                    onClick={() => setView('list')}
                    className={`flex size-6 items-center justify-center rounded ${view === 'list' ? 'bg-[#383838] text-white' : 'text-[#9A9A9A] hover:bg-[#2C2C2C]'}`}
                  >
                    <List className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* template picker */}
            {nav === 'all' && !query.trim() && (
              <div className="mb-6">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[#7A7A7A]">
                  Start from a template
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  <button
                    type="button"
                    onClick={createNew}
                    className="group flex h-20 flex-col items-start justify-between rounded-lg border border-dashed border-[#4E4E4E] p-2.5 text-left transition-colors hover:border-[#8B5CF6] hover:bg-[#2C2C2C]"
                  >
                    <Plus className="size-4 text-[#9A9A9A] transition-colors group-hover:text-[#C4B5FD]" aria-hidden />
                    <span className="text-[12px] font-medium text-[#E5E5E5]">Blank file</span>
                  </button>
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => createFromTemplate(t.id)}
                      className="group flex h-20 flex-col items-start justify-between rounded-lg border border-[#3E3E3E] bg-[#262626] p-2.5 text-left transition-colors hover:border-[#8B5CF6] hover:bg-[#2C2C2C]"
                    >
                      <span className="flex size-6 items-center justify-center rounded bg-[#8B5CF6]/15 text-[#C4B5FD]">
                        <TemplateGlyph id={t.id} />
                      </span>
                      <span>
                        <span className="block text-[12px] font-medium text-[#E5E5E5]">{t.name}</span>
                        <span className="block truncate text-[10px] text-[#8A8A8A]">{t.description}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* content */}
            {entries.length === 0 ? (
              <EmptyLibrary onNew={createNew} onImport={importFile} />
            ) : visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="mb-4 size-8 text-[#5B5B5B]" aria-hidden="true" />
                <p className="text-[14px] font-medium text-[#E5E5E5]">No files found</p>
                <p className="mt-1 text-[12px] text-[#9A9A9A]">
                  Nothing matches “{query.trim()}”
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-4 h-8 rounded-md border border-[#4E4E4E] px-3 text-[12px] text-[#E5E5E5] hover:bg-[#2C2C2C]"
                >
                  Clear search
                </button>
              </div>
            ) : view === 'grid' ? (
              <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4">
                {visible.map((entry) => (
                  <li key={entry.id}>
                    <ContextMenu>
                      <ContextMenuTrigger asChild>
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label={`Open ${entry.name}`}
                          onClick={() => open(entry.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              open(entry.id);
                            }
                          }}
                          className="group cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#3E3E3E] bg-[#2A2A2A] transition-colors group-hover:border-[#5B5B5B] group-hover:bg-[#303030]">
                            <Thumb entry={entry} />
                            {/* guard: the dropdown renders in a portal but its React events still
                                bubble through this span — stop them so the card doesn't "open" */}
                            <span
                              className="absolute right-1.5 top-1.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100"
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => e.stopPropagation()}
                              onKeyUp={(e) => e.stopPropagation()}
                            >
                              <CardMenu entry={entry} actions={menuActions(entry)} />
                            </span>
                          </div>
                          <div className="px-0.5 pt-2">
                            <p className="truncate text-[13px] font-medium text-[#E5E5E5]" title={entry.name}>
                              {entry.name}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] text-[#9A9A9A]">
                              Edited {timeAgo(entry.updatedAt)} · {entry.pageCount} {entry.pageCount === 1 ? 'page' : 'pages'}
                            </p>
                          </div>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent className={MENU_CLS}>
                        <DocMenuItems entry={entry} actions={menuActions(entry)} kind="context" />
                      </ContextMenuContent>
                    </ContextMenu>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col">
                {visible.map((entry) => (
                  <li key={entry.id}>
                    <ContextMenu>
                      <ContextMenuTrigger asChild>
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label={`Open ${entry.name}`}
                          onClick={() => open(entry.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              open(entry.id);
                            }
                          }}
                          className="group flex h-14 cursor-pointer items-center gap-3 rounded-md px-2 outline-none hover:bg-[#2A2A2A] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8B5CF6]"
                        >
                          <div className="h-10 w-16 shrink-0 overflow-hidden rounded border border-[#3E3E3E] bg-[#2A2A2A]">
                            <Thumb entry={entry} tiny />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-medium text-[#E5E5E5]" title={entry.name}>
                              {entry.name}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] text-[#9A9A9A]">
                              Edited {timeAgo(entry.updatedAt)} · {entry.pageCount} {entry.pageCount === 1 ? 'page' : 'pages'}
                            </p>
                          </div>
                          <div className="hidden items-center gap-6 text-[11px] text-[#9A9A9A] sm:flex">
                            <span className="w-20 text-right">{entry.nodeCount} objects</span>
                          </div>
                          <span
                            className="opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                            onKeyUp={(e) => e.stopPropagation()}
                          >
                            <CardMenu entry={entry} actions={menuActions(entry)} />
                          </span>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent className={MENU_CLS}>
                        <DocMenuItems entry={entry} actions={menuActions(entry)} kind="context" />
                      </ContextMenuContent>
                    </ContextMenu>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      {/* ------------------------------ footer ------------------------------ */}
      <footer className="mt-auto flex h-9 shrink-0 select-none items-center justify-between border-t border-[#3E3E3E] px-4 text-[11px] text-[#7A7A7A]">
        <span>
          {stats.count} {stats.count === 1 ? 'file' : 'files'} · {formatBytes(stats.bytes)} stored locally in your browser
        </span>
        <span className="hidden sm:inline">Iris — local-first design tool</span>
      </footer>

      {/* ------------------------------ dialogs ------------------------------ */}
      <Dialog open={!!renameTarget} onOpenChange={(o) => !o && setRenameTarget(null)}>
        <DialogContent aria-describedby={undefined} className="border-[#4E4E4E] bg-[#2C2C2C] text-white sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-left text-[14px]">Rename file</DialogTitle>
          </DialogHeader>
          <Input
            value={renameDraft}
            autoFocus
            spellCheck={false}
            aria-label="File name"
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => setRenameDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') confirmRename();
              if (e.key === 'Escape') setRenameTarget(null);
            }}
            className="h-8 rounded-md border-[#4E4E4E] bg-[#1E1E1E] text-[12px] text-white focus-visible:ring-[#8B5CF6]"
          />
          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => setRenameTarget(null)}
              className="h-8 rounded-md border border-[#4E4E4E] px-3 text-[12px] text-[#E5E5E5] hover:bg-[#383838]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmRename}
              disabled={!renameDraft.trim()}
              className="h-8 rounded-md bg-[#8B5CF6] px-3 text-[12px] font-medium text-white hover:bg-[#7C4DF3] disabled:opacity-40"
            >
              Rename
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent className="border-[#4E4E4E] bg-[#2C2C2C] text-white sm:max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left text-[14px]">Delete file?</AlertDialogTitle>
            <AlertDialogDescription className="text-left text-[12px] text-[#9A9A9A]">
              “{deleteTarget?.name}” will be permanently removed from your browser. This can’t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="h-8 rounded-md border border-[#4E4E4E] bg-transparent px-3 text-[12px] text-[#E5E5E5] hover:bg-[#383838]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="h-8 rounded-md bg-[#E5484D] px-3 text-[12px] font-medium text-white hover:bg-[#D93B40]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* small pieces                                                        */
/* ------------------------------------------------------------------ */

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-[12px] transition-colors ${
        active ? 'bg-[#383838] font-medium text-white' : 'text-[#C9C9C9] hover:bg-[#2C2C2C] hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/** Small line-art glyph for each template card. */
function TemplateGlyph({ id }: { id: string }) {
  const cls = 'stroke-current';
  const common = { fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (id) {
    case 'mobile':
      return (
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
          <rect x="4.5" y="1.5" width="7" height="13" rx="1.5" className={cls} {...common} />
          <path d="M4.5 12.5h7" className={cls} {...common} />
        </svg>
      );
    case 'desktop':
      return (
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
          <rect x="1.5" y="2.5" width="13" height="9" rx="1" className={cls} {...common} />
          <path d="M6 13.5h4M8 11.5v2" className={cls} {...common} />
        </svg>
      );
    case 'kanban':
      return (
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
          <rect x="1.5" y="2.5" width="3.5" height="11" rx="0.8" className={cls} {...common} />
          <rect x="6.25" y="2.5" width="3.5" height="8" rx="0.8" className={cls} {...common} />
          <rect x="11" y="2.5" width="3.5" height="6" rx="0.8" className={cls} {...common} />
        </svg>
      );
    case 'poster':
      return (
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
          <path d="M8 1.8 9.7 5.3l3.8.5-2.8 2.6.7 3.8L8 10.4l-3.4 1.8.7-3.8L2.5 5.8l3.8-.5z" className={cls} {...common} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
          <rect x="3" y="3" width="10" height="10" rx="1" className={cls} {...common} />
        </svg>
      );
  }
}

function EmptyLibrary({ onNew, onImport }: { onNew: () => void; onImport: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <IrisMark size={56} />
      <h2 className="mt-5 text-[18px] font-semibold text-white">Your designs live here</h2>
      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[#9A9A9A]">
        Create a new design file or import an existing <span className="font-medium text-[#C9C9C9]">.iris</span> document.
        Everything is stored locally in your browser — no account, no cloud.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onNew}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-[#8B5CF6] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#7C4DF3]"
        >
          <Plus className="size-4" aria-hidden="true" />
          New design file
        </button>
        <button
          type="button"
          onClick={onImport}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-[#4E4E4E] px-4 text-[13px] text-[#E5E5E5] transition-colors hover:bg-[#2C2C2C]"
        >
          <Upload className="size-4" aria-hidden="true" />
          Import .iris
        </button>
      </div>
    </div>
  );
}
