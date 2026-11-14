'use client';

/**
 * Left panel: pages list + layers tree with visibility/lock toggles,
 * inline rename, multi-select and pointer-based drag reordering.
 */

import { useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ChevronRight, Eye, EyeOff, Lock, Plus, Trash2 } from 'lucide-react';
import { ID, IrisNode, isContainer, isDescendantOf } from '../engine/model';
import { useIris } from '../engine/store';
import { cn } from '@/lib/utils';
import { NodeTypeIcon } from './nodeIcon';

type DropMode = 'before' | 'after' | 'into';

interface DragState {
  ids: ID[];
  over: { rowId: ID; mode: DropMode } | null;
}

interface RenameTarget {
  kind: 'page' | 'node';
  id: ID;
}

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
      className="h-5 min-w-0 flex-1 rounded-sm bg-[#1E1E1E] px-1 text-[11px] text-white outline-none ring-1 ring-[#8B5CF6]"
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

/* ------------------------------------------------------------------ */

export function LayersPanel() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const selection = useIris((s) => s.selection);

  const actions = useIris(
    useShallow((s) => ({
      setCurrentPage: s.setCurrentPage,
      addPage: s.addPage,
      deletePage: s.deletePage,
      renamePage: s.renamePage,
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
  const dragRef = useRef<DragState | null>(null);
  const anchorRef = useRef<ID | null>(null);

  const page = doc.pagesById[currentPageId];

  const toggleCollapsed = (id: ID): void => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /** Flattened list of visible row ids (for shift-range selection). */
  const flattenVisible = (): ID[] => {
    if (!page) return [];
    const out: ID[] = [];
    const visit = (id: ID): void => {
      out.push(id);
      const n = doc.nodesById[id];
      if (n && isContainer(n) && !collapsed.has(id)) n.children.forEach(visit);
    };
    page.nodeIds.forEach(visit);
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
      else mode = rel < 0.5 ? 'before' : 'after';
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
        if (cur.ids.includes(target.id)) return;
        const parentId = target.parentId;
        const list =
          parentId === null
            ? (s.doc.pagesById[s.currentPageId]?.nodeIds ?? [])
            : (s.doc.nodesById[parentId]?.children ?? []);
        const afterRemoval = list.filter((id) => !cur.ids.includes(id));
        const idx = afterRemoval.indexOf(target.id);
        if (idx < 0) return;
        s.reorderNodes(cur.ids, parentId, cur.over.mode === 'before' ? idx : idx + 1);
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const dropClassFor = (id: ID): string => {
    if (!drag?.over || drag.over.rowId !== id) return '';
    if (drag.over.mode === 'into') return 'outline outline-1 -outline-offset-1 outline-[#8B5CF6]';
    if (drag.over.mode === 'before') return 'shadow-[inset_0_2px_0_#8B5CF6]';
    return 'shadow-[inset_0_-2px_0_#8B5CF6]';
  };

  /* ---------------------------------------------------------------- */

  const renderRow = (node: IrisNode, depth: number): React.ReactNode => {
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
            ? 'bg-[rgba(139,92,246,0.16)] text-white shadow-[inset_2px_0_0_#8B5CF6]'
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

  const renderTree = (parentId: ID | null, depth: number): React.ReactNode => {
    if (!page) return null;
    const children =
      parentId === null
        ? page.nodeIds.map((id) => doc.nodesById[id]).filter(Boolean)
        : (doc.nodesById[parentId]?.children ?? []).map((id) => doc.nodesById[id]).filter(Boolean);
    return children.map((n) => (
      <div key={n.id}>
        {renderRow(n as IrisNode, depth)}
        {isContainer(n as IrisNode) && !collapsed.has(n.id) && renderTree(n.id, depth + 1)}
      </div>
    ));
  };

  /* ---------------------------------------------------------------- */

  return (
    <aside className="flex h-full w-48 flex-col border-r border-[#3E3E3E] bg-[#2C2C2C] sm:w-52 lg:w-60">
      {/* Pages */}
      <div className="shrink-0 border-b border-[#3E3E3E]">
        <div className="flex h-9 items-center px-3">
          <span className="iris-section-title text-[10px] uppercase tracking-wider text-[#9A9A9A]">
            Pages
          </span>
          <div className="ml-auto">
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
        <div className="pb-1.5" role="listbox" aria-label="Pages">
          {doc.pages.map((pid) => {
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
                  'group flex h-6 cursor-default select-none items-center gap-1.5 pl-3 pr-2 text-[11px]',
                  isCurrent
                    ? 'bg-[#383838] font-medium text-white'
                    : 'text-[#C9C9C9] hover:bg-[#333333]',
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
                    {doc.pages.length > 1 ? (
                      <button
                        type="button"
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[#9A9A9A] opacity-0 hover:bg-[#474747] hover:text-white group-hover:opacity-100"
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
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Layers header */}
      <div className="flex h-9 shrink-0 items-center px-3">
        <span className="iris-section-title text-[10px] uppercase tracking-wider text-[#9A9A9A]">
          Layers
        </span>
      </div>

      {/* Tree */}
      <div className="iris-scroll relative flex-1 overflow-y-auto pb-4" role="tree" aria-label="Layers">
        {page && page.nodeIds.length > 0 ? (
          renderTree(null, 0)
        ) : (
          <p className="px-4 py-8 text-center text-[11px] leading-5 text-[#6F6F6F]">
            No objects yet
            <br />
            Draw on the canvas or press R
          </p>
        )}
      </div>
    </aside>
  );
}
