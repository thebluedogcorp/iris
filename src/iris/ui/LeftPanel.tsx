'use client';

/**
 * Left panel (Figma UI3 style): file header + Drafts breadcrumb, then one of
 * three views — Layers (pages + layer tree), Assets (images in this file) or
 * Comments (list of pins).
 *
 * LAYER ORDERING (Figma convention): the tree lists the TOPMOST layer FIRST —
 * i.e. children render in reverse array order. Dragging a row upward moves it
 * toward the front. This matches Figma exactly.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Lock,
  MessageSquare,
  PanelLeftClose,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { ID, IrisNode, isContainer, isDescendantOf } from '../engine/model';
import { useIris } from '../engine/store';
import { cn } from '@/lib/utils';
import { NodeTypeIcon } from './nodeIcon';

type DropMode = 'above' | 'below' | 'into';

interface DragState {
  ids: ID[];
  over: { rowId: ID; mode: DropMode } | null;
}

interface RenameTarget {
  kind: 'page' | 'node';
  id: ID;
}

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

function InlineRename({
  initial,
  onCommit,
  onCancel,
}: {
  initial: string;
  onCommit: (v: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initial);
  return (
    <input
      autoFocus
      className="h-5 min-w-0 flex-1 rounded-sm bg-[#1E1E1E] px-1 text-[11px] text-white outline-none ring-1 ring-[#0D99FF]"
      value={value}
      aria-label="Rename"
      spellCheck={false}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        if (value.trim()) onCommit(value.trim());
        else onCancel();
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
          if (value.trim()) onCommit(value.trim());
          else onCancel();
        } else if (e.key === 'Escape') onCancel();
      }}
    />
  );
}

function timeAgo(ts: number): string {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 45) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d < 7 ? `${d}d ago` : new Date(ts).toLocaleDateString();
}

/* ------------------------------------------------------------------ */
/* main panel                                                          */
/* ------------------------------------------------------------------ */

export function LeftPanel() {
  const open = useIris((s) => s.leftPanelOpen);
  const view = useIris((s) => s.leftPanelView);
  const presenting = useIris((s) => s.presenting);

  if (!open || presenting) return null;

  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-[#2A2A2A] bg-[#2C2C2C]">
      <PanelHeader />
      {view === 'layers' ? <LayersView /> : null}
      {view === 'assets' ? <AssetsView /> : null}
      {view === 'comments' ? <CommentsView /> : null}
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* header: file name, breadcrumb, collapse                             */
/* ------------------------------------------------------------------ */

function PanelHeader() {
  const doc = useIris((s) => s.doc);
  const setDocName = useIris((s) => s.setDocName);
  const goHome = useIris((s) => s.goHome);
  const toggleLeftPanel = useIris((s) => s.toggleLeftPanel);
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent): void => {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey, true);
    };
  }, [menuOpen]);

  return (
    <div className="shrink-0 border-b border-[#2A2A2A] px-3 pb-2.5 pt-2.5" ref={ref}>
      <div className="flex items-center gap-1">
        {renaming ? (
          <InlineRename initial={doc.name} onCommit={(v) => { setDocName(v); setRenaming(false); }} onCancel={() => setRenaming(false)} />
        ) : (
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-1 rounded-md px-1 py-0.5 text-left text-[13px] font-semibold text-white hover:bg-[#383838]"
            title="File options"
            aria-label="File options"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="truncate">{doc.name}</span>
            <ChevronDown size={13} strokeWidth={2} aria-hidden className="shrink-0 text-[#9A9A9A]" />
          </button>
        )}
        <button
          type="button"
          className="iris-icon-btn h-7! w-7!"
          aria-label="Hide panel"
          title="Hide panel"
          onClick={toggleLeftPanel}
        >
          <PanelLeftClose size={15} strokeWidth={1.75} aria-hidden />
        </button>

        {menuOpen ? (
          <div
            role="menu"
            aria-label="File options"
            className="absolute left-[60px] top-[44px] z-50 w-[200px] rounded-lg border border-[#4E4E4E] bg-[#1E1E1E] py-1 shadow-2xl"
            style={{ animation: 'iris-menu-in-down 90ms ease-out' }}
          >
            {[
              { label: 'Rename file', run: () => setRenaming(true) },
              { label: 'Back to files', run: () => goHome() },
            ].map((it) => (
              <button
                key={it.label}
                type="button"
                role="menuitem"
                className="mx-1 flex h-8 w-[calc(100%-8px)] items-center rounded-md px-2 text-left text-[12px] text-[#E5E5E5] hover:bg-[#3A3A3A]"
                onClick={() => {
                  setMenuOpen(false);
                  it.run();
                }}
              >
                {it.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* breadcrumb */}
      <div className="mt-1 flex items-center gap-1.5 px-1">
        <button
          type="button"
          className="text-[11px] text-[#9A9A9A] hover:text-[#E5E5E5]"
          onClick={() => goHome()}
        >
          Drafts
        </button>
        <span className="text-[11px] text-[#6F6F6F]" aria-hidden>
          /
        </span>
        <span className="rounded bg-[rgba(13,153,255,0.16)] px-1.5 py-px text-[10px] font-semibold text-[#57B6FF]">
          Free
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* layers view (pages + tree)                                          */
/* ------------------------------------------------------------------ */

function LayersView() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const selection = useIris((s) => s.selection);

  const actions = useIris(
    useShallow((s) => ({
      setCurrentPage: s.setCurrentPage,
      addPage: s.addPage,
      deletePage: s.deletePage,
      renamePage: s.renamePage,
      duplicatePage: s.duplicatePage,
      movePage: s.movePage,
      setSelection: s.setSelection,
      toggleSelection: s.toggleSelection,
      updateNodes: s.updateNodes,
      renameNode: s.renameNode,
      reorderNodes: s.reorderNodes,
    })),
  );

  const [collapsed, setCollapsed] = useState<Set<ID>>(new Set());
  const [renaming, setRenaming] = useState<RenameTarget | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [query, setQuery] = useState('');
  const [pageQuery, setPageQuery] = useState('');
  const dragRef = useRef<DragState | null>(null);
  const anchorRef = useRef<ID | null>(null);

  const page = doc.pagesById[currentPageId];
  const q = query.trim().toLowerCase();
  const pq = pageQuery.trim().toLowerCase();

  const toggleCollapsed = (id: ID): void => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /** Flattened list of visible row ids, TOP FIRST (for shift-range selection). */
  const flattenVisible = (): ID[] => {
    if (!page) return [];
    const out: ID[] = [];
    const visit = (id: ID): void => {
      out.push(id);
      const n = doc.nodesById[id];
      if (n && isContainer(n) && !collapsed.has(id)) {
        for (let i = n.children.length - 1; i >= 0; i--) visit(n.children[i]);
      }
    };
    for (let i = page.nodeIds.length - 1; i >= 0; i--) visit(page.nodeIds[i]);
    return out;
  };

  const onRowClick = (e: React.MouseEvent, node: IrisNode): void => {
    if (e.shiftKey && anchorRef.current) {
      const list = flattenVisible();
      const a = list.indexOf(anchorRef.current);
      const b = list.indexOf(node.id);
      if (a >= 0 && b >= 0) {
        const [lo, hi] = a < b ? [a, b] : [b, a];
        actions.setSelection(list.slice(lo, hi + 1));
        return;
      }
    }
    anchorRef.current = node.id;
    if (e.ctrlKey || e.metaKey) actions.toggleSelection(node.id);
    else actions.setSelection([node.id]);
  };

  /**
   * Drag reordering with Figma semantics: rows list the topmost layer FIRST,
   * so dropping ABOVE a row puts the dragged layer in FRONT of it (i.e. after
   * it in the children array), and dropping BELOW puts it BEHIND (before it
   * in the array).
   */
  const startRowDrag = (e: React.PointerEvent, node: IrisNode): void => {
    if (e.button !== 0) return;
    const startX = e.clientX;
    const startY = e.clientY;
    let started = false;

    const onMove = (ev: PointerEvent): void => {
      if (!started) {
        if (Math.hypot(ev.clientX - startX, ev.clientY - startY) < 5) return;
        started = true;
        const sel = useIris.getState().selection;
        const ids = sel.includes(node.id) ? [...sel] : [node.id];
        if (!sel.includes(node.id)) useIris.getState().setSelection([node.id]);
        dragRef.current = { ids, over: null };
        setDrag(dragRef.current);
      }
      const el = document
        .elementFromPoint(ev.clientX, ev.clientY)
        ?.closest('[data-row-id]') as HTMLElement | null;
      const cur = dragRef.current;
      if (!cur) return;
      if (!el) {
        if (cur.over) {
          cur.over = null;
          setDrag({ ...cur });
        }
        return;
      }
      const rowId = el.dataset.rowId as ID;
      const rowNode = useIris.getState().doc.nodesById[rowId];
      const rect = el.getBoundingClientRect();
      const rel = (ev.clientY - rect.top) / Math.max(1, rect.height);
      let mode: DropMode;
      if (rowNode && isContainer(rowNode) && rel > 0.3 && rel < 0.7) mode = 'into';
      else mode = rel < 0.5 ? 'above' : 'below';
      const over = { rowId, mode };
      if (!cur.over || cur.over.rowId !== rowId || cur.over.mode !== mode) {
        cur.over = over;
        setDrag({ ...cur });
      }
    };

    const onUp = (): void => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      const cur = dragRef.current;
      dragRef.current = null;
      setDrag(null);
      if (!cur || !cur.over) return;
      const s = useIris.getState();
      const target = s.doc.nodesById[cur.over.rowId];
      if (!target) return;
      if (cur.ids.includes(target.id)) return;
      if (cur.over.mode === 'into') {
        if (isDescendantOf(s.doc, target.id, node.id) && cur.ids.includes(node.id)) return;
        s.reorderNodes(cur.ids, target.id, -1);
        setCollapsed((prev) => {
          const next = new Set(prev);
          next.delete(target.id);
          return next;
        });
      } else {
        const parentId = target.parentId;
        const list =
          parentId === null
            ? (s.doc.pagesById[s.currentPageId]?.nodeIds ?? [])
            : (s.doc.nodesById[parentId]?.children ?? []);
        const afterRemoval = list.filter((id) => !cur.ids.includes(id));
        const idx = afterRemoval.indexOf(target.id);
        if (idx < 0) return;
        // 'above' (toward the front) = after the target in the array;
        // 'below' (toward the back) = before the target in the array.
        s.reorderNodes(cur.ids, parentId, cur.over.mode === 'above' ? idx + 1 : idx);
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const dropClassFor = (id: ID): string => {
    if (!drag?.over || drag.over.rowId !== id) return '';
    if (drag.over.mode === 'into') return 'outline outline-1 -outline-offset-1 outline-[#0D99FF]';
    if (drag.over.mode === 'above') return 'shadow-[inset_0_2px_0_#0D99FF]';
    return 'shadow-[inset_0_-2px_0_#0D99FF]';
  };

  /** ids matching the search query (plus their ancestors so the tree stays connected) */
  const matches = useMemo<Set<ID> | null>(() => {
    if (!q) return null;
    const set = new Set<ID>();
    const visit = (id: ID): boolean => {
      const n = doc.nodesById[id];
      if (!n) return false;
      let any = n.name.toLowerCase().includes(q) || n.type.toLowerCase().includes(q);
      for (const c of n.children) {
        if (visit(c)) {
          any = true;
          set.add(c);
        }
      }
      if (any) set.add(id);
      return any;
    };
    page?.nodeIds.forEach((id) => {
      if (visit(id)) set.add(id);
    });
    return set;
  }, [q, doc, page]);

  const renderRow = (node: IrisNode, depth: number): React.ReactNode => {
    if (matches && !matches.has(node.id)) return null;
    const isSel = selection.includes(node.id);
    const container = isContainer(node);
    const expanded = !collapsed.has(node.id);
    const isRenaming = renaming?.kind === 'node' && renaming.id === node.id;
    return (
      <div
        key={node.id}
        data-row-id={node.id}
        role="treeitem"
        aria-selected={isSel}
        aria-expanded={container ? expanded : undefined}
        className={cn(
          'group flex h-7 cursor-default select-none items-center gap-1 pr-1.5 text-[11px]',
          isSel
            ? 'bg-[rgba(13,153,255,0.16)] text-white shadow-[inset_2px_0_0_#0D99FF]'
            : 'text-[#C9C9C9] hover:bg-[#333333]',
          node.visible ? '' : 'opacity-45',
          dropClassFor(node.id),
        )}
        style={{ paddingLeft: 4 + depth * 14 }}
        onClick={(e) => {
          if (!isRenaming) onRowClick(e, node);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (container) toggleCollapsed(node.id);
          else setRenaming({ kind: 'node', id: node.id });
        }}
        onPointerDown={(e) => startRowDrag(e, node)}
      >
        {container ? (
          <button
            type="button"
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm text-[#9A9A9A] hover:bg-[#474747] hover:text-white"
            aria-label={expanded ? `Collapse ${node.name}` : `Expand ${node.name}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapsed(node.id);
            }}
          >
            <ChevronRight
              size={12}
              strokeWidth={2}
              aria-hidden
              className={cn('transition-transform', expanded && 'rotate-90')}
            />
          </button>
        ) : (
          <span className="w-4 shrink-0" aria-hidden />
        )}
        <NodeTypeIcon type={node.type} className="shrink-0 text-[#9A9A9A]" />
        {isRenaming ? (
          <InlineRename
            initial={node.name}
            onCommit={(v) => {
              actions.renameNode(node.id, v);
              setRenaming(null);
            }}
            onCancel={() => setRenaming(null)}
          />
        ) : (
          <>
            <span
              className="min-w-0 flex-1 truncate"
              onDoubleClick={(e) => {
                e.stopPropagation();
                setRenaming({ kind: 'node', id: node.id });
              }}
            >
              {node.name}
            </span>
            {node.interactions?.length ? (
              <span
                className="flex h-4 shrink-0 items-center rounded-sm bg-[#0D99FF]/15 px-1 text-[9px] font-semibold leading-none text-[#0D99FF] group-hover:hidden"
                title={`${node.interactions.length} interaction${node.interactions.length > 1 ? 's' : ''}`}
              >
                {node.interactions.length}⚡
              </span>
            ) : null}
            <div className="flex shrink-0 items-center gap-0.5 opacity-0 group-hover:opacity-100 has-[button[data-visible]]:opacity-100">
              <button
                type="button"
                data-visible={node.locked ? '' : undefined}
                className="flex h-5 w-5 items-center justify-center rounded-sm text-[#9A9A9A] hover:bg-[#474747] hover:text-white"
                aria-label={node.locked ? `Unlock ${node.name}` : `Lock ${node.name}`}
                title={node.locked ? 'Unlock' : 'Lock'}
                onClick={(e) => {
                  e.stopPropagation();
                  actions.updateNodes([node.id], { locked: !node.locked }, { history: 'lock' });
                }}
              >
                <Lock size={11} strokeWidth={2} aria-hidden className={cn(!node.locked && 'hidden group-hover:block')} />
              </button>
              <button
                type="button"
                className="flex h-5 w-5 items-center justify-center rounded-sm text-[#9A9A9A] hover:bg-[#474747] hover:text-white"
                aria-label={node.visible ? `Hide ${node.name}` : `Show ${node.name}`}
                title={node.visible ? 'Hide' : 'Show'}
                onClick={(e) => {
                  e.stopPropagation();
                  actions.updateNodes([node.id], { visible: !node.visible }, { history: 'visible' });
                }}
              >
                {node.visible ? (
                  <Eye size={11} strokeWidth={2} aria-hidden className="group-hover:block" />
                ) : (
                  <EyeOff size={11} strokeWidth={2} aria-hidden />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  /** Renders a sibling list — TOPMOST FIRST (reverse of the z-order array). */
  const renderTree = (parentId: ID | null, depth: number): React.ReactNode => {
    if (!page) return null;
    const children = (
      parentId === null
        ? page.nodeIds.map((id) => doc.nodesById[id])
        : (doc.nodesById[parentId]?.children ?? []).map((id) => doc.nodesById[id])
    ).filter(Boolean);
    return children
      .slice()
      .reverse()
      .map((n) => (
        <div key={n.id}>
          {renderRow(n as IrisNode, depth)}
          {isContainer(n as IrisNode) &&
            (matches ? matches.has(n.id) : !collapsed.has(n.id)) &&
            renderTree(n.id, depth + 1)}
        </div>
      ));
  };

  const pagesFiltered = pq
    ? doc.pages.filter((pid) => doc.pagesById[pid]?.name.toLowerCase().includes(pq))
    : doc.pages;

  return (
    <>
      {/* Pages */}
      <div className="shrink-0 border-b border-[#2A2A2A] pt-2">
        <div className="flex h-7 items-center gap-1 px-3">
          <span className="text-[11px] font-semibold text-white">Pages</span>
          <div className="ml-auto flex items-center gap-0.5">
            <div className="flex h-5 w-4 items-center justify-center" aria-hidden>
              {/* spacer balancing the + button while searching */}
            </div>
            <button
              type="button"
              className="iris-icon-btn h-6 w-6"
              aria-label="Add page"
              title="Add page"
              onClick={() => actions.addPage()}
            >
              <Plus size={14} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
        <div className="px-2.5 pb-1 pt-0.5">
          <div className="flex h-6 items-center gap-1.5 rounded-md bg-[#242424] px-2 focus-within:ring-1 focus-within:ring-[#4E4E4E]">
            <Search size={11} strokeWidth={2} className="shrink-0 text-[#6F6F6F]" aria-hidden />
            <input
              className="h-full min-w-0 flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-[#6F6F6F]"
              placeholder="Search page"
              aria-label="Search pages"
              value={pageQuery}
              spellCheck={false}
              onChange={(e) => setPageQuery(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Escape') setPageQuery('');
              }}
            />
          </div>
        </div>
        <div className="pb-1.5" role="listbox" aria-label="Pages">
          {pagesFiltered.map((pid) => {
            const p = doc.pagesById[pid];
            if (!p) return null;
            const isCurrent = pid === currentPageId;
            const isRenaming = renaming?.kind === 'page' && renaming.id === pid;
            return (
              <div
                key={pid}
                role="option"
                aria-selected={isCurrent}
                className={cn(
                  'group mx-1.5 flex h-6 cursor-default select-none items-center gap-1.5 rounded-md pl-2 pr-1 text-[11px]',
                  isCurrent ? 'bg-[#383838] font-medium text-white' : 'text-[#C9C9C9] hover:bg-[#333333]',
                )}
                onClick={() => actions.setCurrentPage(pid)}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setRenaming({ kind: 'page', id: pid });
                }}
              >
                {isRenaming ? (
                  <InlineRename
                    initial={p.name}
                    onCommit={(v) => {
                      actions.renamePage(pid, v);
                      setRenaming(null);
                    }}
                    onCancel={() => setRenaming(null)}
                  />
                ) : (
                  <>
                    <span className="min-w-0 flex-1 truncate">{p.name}</span>
                    <div className="flex shrink-0 items-center gap-0.5 opacity-0 group-hover:opacity-100">
                      <button
                        type="button"
                        className="flex h-5 w-5 items-center justify-center rounded-sm text-[#9A9A9A] hover:bg-[#474747] hover:text-white"
                        aria-label={`Move ${p.name} up`}
                        title="Move page up"
                        disabled={doc.pages.indexOf(pid) === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.movePage(pid, -1);
                        }}
                      >
                        <ChevronUp size={11} strokeWidth={2} aria-hidden />
                      </button>
                      <button
                        type="button"
                        className="flex h-5 w-5 items-center justify-center rounded-sm text-[#9A9A9A] hover:bg-[#474747] hover:text-white"
                        aria-label={`Move ${p.name} down`}
                        title="Move page down"
                        disabled={doc.pages.indexOf(pid) === doc.pages.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.movePage(pid, 1);
                        }}
                      >
                        <ChevronDown size={11} strokeWidth={2} aria-hidden />
                      </button>
                      <button
                        type="button"
                        className="flex h-5 w-5 items-center justify-center rounded-sm text-[#9A9A9A] hover:bg-[#474747] hover:text-white"
                        aria-label={`Duplicate ${p.name}`}
                        title="Duplicate page"
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.duplicatePage(pid);
                        }}
                      >
                        <Copy size={11} strokeWidth={2} aria-hidden />
                      </button>
                      {doc.pages.length > 1 ? (
                        <button
                          type="button"
                          className="flex h-5 w-5 items-center justify-center rounded-sm text-[#9A9A9A] hover:bg-[#474747] hover:text-white"
                          aria-label={`Delete ${p.name}`}
                          title="Delete page"
                          onClick={(e) => {
                            e.stopPropagation();
                            actions.deletePage(pid);
                          }}
                        >
                          <Trash2 size={11} strokeWidth={2} aria-hidden />
                        </button>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Layers header */}
      <div className="flex h-8 shrink-0 items-center gap-1.5 px-3">
        <span className="text-[11px] font-semibold text-white">Layers</span>
        <span className="text-[10px] text-[#6F6F6F]" aria-hidden>
          · top first
        </span>
      </div>

      {/* layer search */}
      <div className="shrink-0 px-2.5 pb-1.5">
        <div className="flex h-6 items-center gap-1.5 rounded-md bg-[#242424] px-2 focus-within:ring-1 focus-within:ring-[#4E4E4E]">
          <Search size={11} strokeWidth={2} className="shrink-0 text-[#6F6F6F]" aria-hidden />
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-[#6F6F6F]"
            placeholder="Search layers…"
            aria-label="Search layers"
            value={query}
            spellCheck={false}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 'Escape') setQuery('');
            }}
          />
        </div>
      </div>

      {/* Tree — topmost layer first */}
      <div className="iris-scroll relative flex-1 overflow-y-auto pb-4" role="tree" aria-label="Layers">
        {page && page.nodeIds.length > 0 ? (
          renderTree(null, 0)
        ) : (
          <p className="px-4 py-8 text-center text-[11px] leading-5 text-[#6F6F6F]">
            {q ? (
              `Nothing matches “${query}”`
            ) : (
              <>
                No objects yet
                <br />
                Draw on the canvas or press R
              </>
            )}
          </p>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* assets view                                                         */
/* ------------------------------------------------------------------ */

function AssetsView() {
  const doc = useIris((s) => s.doc);
  const importImage = useIris((s) => s.importImage);
  const toast = useIris((s) => s.toast);

  /** unique image assets in the whole file: src -> {src, w, h, name} */
  const assets = useMemo(() => {
    const map = new Map<string, { src: string; w: number; h: number; name: string }>();
    for (const n of Object.values(doc.nodesById)) {
      if (n.type === 'image' && n.src && !map.has(n.src)) {
        map.set(n.src, { src: n.src, w: n.w, h: n.h, name: n.name });
      }
    }
    return [...map.values()];
  }, [doc]);

  return (
    <div className="iris-scroll flex-1 overflow-y-auto p-3">
      <p className="mb-2 text-[11px] text-[#9A9A9A]">
        Images used in this file. Click to place another copy on the canvas.
      </p>
      {assets.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#3E3E3E] p-6 text-center">
          <p className="text-[11px] leading-5 text-[#6F6F6F]">
            No image assets yet.
            <br />
            Drop an image on the canvas or press Ctrl+Shift+K.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {assets.map((a) => (
            <button
              key={a.src}
              type="button"
              className="group overflow-hidden rounded-lg border border-[#3E3E3E] bg-[#1E1E1E] transition-colors hover:border-[#0D99FF]"
              title={`Place ${a.name}`}
              onClick={() => {
                importImage(a.src, a.w, a.h);
                toast(`Placed another copy of ${a.name}`);
              }}
            >
              <img
                src={a.src}
                alt={a.name}
                className="h-20 w-full object-cover"
                draggable={false}
              />
              <span className="block truncate px-2 py-1 text-left text-[10px] text-[#C9C9C9]">{a.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* comments view                                                       */
/* ------------------------------------------------------------------ */

function CommentsView() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const activeCommentId = useIris((s) => s.activeCommentId);
  const setActiveComment = useIris((s) => s.setActiveComment);
  const showComments = useIris((s) => s.showComments);
  const setShowComments = useIris((s) => s.setShowComments);

  const comments = doc.comments.filter((c) => c.pageId === currentPageId);
  const openCount = comments.filter((c) => !c.resolved).length;

  return (
    <div className="iris-scroll flex-1 overflow-y-auto p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] text-[#9A9A9A]">
          {openCount} open · {comments.length - openCount} resolved
        </p>
        <button
          type="button"
          className={cn(
            'rounded-md px-2 py-1 text-[10px] font-semibold transition-colors',
            showComments ? 'bg-[rgba(13,153,255,0.16)] text-[#57B6FF]' : 'text-[#9A9A9A] hover:bg-[#383838]',
          )}
          aria-pressed={showComments}
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? 'Pins on' : 'Pins off'}
        </button>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#3E3E3E] p-6 text-center">
          <MessageSquare size={20} strokeWidth={1.5} className="mx-auto mb-2 text-[#6F6F6F]" aria-hidden />
          <p className="text-[11px] leading-5 text-[#6F6F6F]">
            No comments on this page.
            <br />
            Press C and click the canvas to add one.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {comments.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className={cn(
                  'w-full rounded-lg border p-2.5 text-left transition-colors',
                  activeCommentId === c.id
                    ? 'border-[#0D99FF] bg-[#333333]'
                    : 'border-[#3E3E3E] bg-[#1E1E1E] hover:border-[#4E4E4E]',
                  c.resolved && 'opacity-55',
                )}
                onClick={() => setActiveComment(activeCommentId === c.id ? null : c.id)}
              >
                <span className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0D99FF] text-[9px] font-bold text-white">
                    {c.author.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="truncate text-[11px] font-semibold text-white">{c.author}</span>
                  <span className="ml-auto shrink-0 text-[10px] text-[#6F6F6F]">{timeAgo(c.ts)}</span>
                </span>
                <span className="mt-1 block truncate text-[11px] text-[#C9C9C9]">
                  {c.text || <span className="text-[#6F6F6F]">(empty)</span>}
                </span>
                {c.resolved ? (
                  <span className="mt-1 inline-block rounded bg-[#383838] px-1.5 py-px text-[9px] font-semibold text-[#9A9A9A]">
                    Resolved
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
