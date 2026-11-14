/**
 * Iris store (zustand): document, pages, selection, tool, viewport,
 * snapshot-based undo/redo with coalescing, clipboard, alignment,
 * grouping, z-order, doc settings (grid/guides/bg), style clipboard
 * and localStorage autosave.
 */

import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import {
  ID,
  IrisComment,
  IrisDoc,
  IrisNode,
  NodeType,
  FramePreset,
  createDefaultDoc,
  createNode,
  createPage,
  nextName,
  normalizeDoc,
  collectSubtree,
  isDescendantOf,
  isContainer,
  DEFAULT_SETTINGS,
  type DocSettings,
} from './model';
import {
  HandleKind,
  Mat,
  Rect,
  Viewport,
  boundsOfNodes,
  mApply,
  mApplyVec,
  mInvert,
  mMul,
  mTranslate,
  mRotate,
  nodeLocalMatrix,
  nodeWorldAABB,
  nodeWorldMatrix,
  parentWorldMatrix,
  screenToWorld,
  setNodeWorldTransform,
  unionRects,
} from './geometry';
import {
  createLibraryDoc,
  getStoredDoc,
  importDocIntoLibrary,
  migrateLegacyLibrary,
  renameDocInLibrary,
  saveDocToLibrary,
} from './library';
import { buildTemplate } from './templates';
import { IrisRoute, pushRoute, replaceRoute, routeFromLocation } from './router';

export type Tool =
  | 'move'
  | 'hand'
  | 'frame'
  | 'rect'
  | 'ellipse'
  | 'line'
  | 'text'
  | 'pen'
  | 'polygon'
  | 'star'
  | 'arrow'
  | 'eyedropper'
  | 'image'
  | 'scale'
  | 'section'
  | 'slice'
  | 'pencil'
  | 'comment';

export type AlignMode = 'left' | 'hcenter' | 'right' | 'top' | 'vcenter' | 'bottom' | 'hdist' | 'vdist';

export type HandleId = HandleKind | 'rot';

interface Snapshot {
  doc: IrisDoc;
  selection: ID[];
  currentPageId: ID;
}

interface Clipboard {
  /** cloned nodes (subtrees of the copied roots), keyed by fresh-independent original ids */
  nodes: IrisNode[];
  rootIds: ID[];
  /** world bbox of the roots at copy time */
  origin: Rect;
  pageId: ID;
  count: number;
}

export interface ContextMenuState {
  x: number;
  y: number;
  worldX: number;
  worldY: number;
}

export interface ViewFlags {
  rulers: boolean;
  pixelGrid: boolean;
  outline: boolean;
}

export type LeftPanelView = 'layers' | 'assets' | 'comments';

export type RightPanelTab = 'design' | 'prototype';

export interface ToastAction {
  label: string;
  run: () => void;
}

export interface IrisStore {
  /* state */
  doc: IrisDoc;
  currentPageId: ID;
  selection: ID[];
  tool: Tool;
  viewport: Viewport;
  editingTextId: ID | null;
  editingPathId: ID | null;
  hoverId: ID | null;
  viewFlags: ViewFlags;
  past: Snapshot[];
  future: Snapshot[];
  clipboard: Clipboard | null;
  contextMenu: ContextMenuState | null;
  exportOpen: boolean;
  shortcutsOpen: boolean;
  toasts: { id: number; msg: string; action?: ToastAction }[];
  savedName: string | null;
  dirty: boolean;
  /** id of the library document backing the editor; null on the homepage */
  docId: ID | null;
  /** current screen: file browser (home) or an open document */
  route: IrisRoute;
  canvasSize: { w: number; h: number };
  /** copied style payload for copy/paste style */
  styleClipboard: Partial<IrisNode> | null;

  /* editor chrome state */
  /** fullscreen prototype presentation */
  presenting: boolean;
  /** dev/inspect mode (SVG code panel) */
  inspectMode: boolean;
  /** share dialog open */
  shareOpen: boolean;
  /** active left-panel view */
  leftPanelView: LeftPanelView;
  leftPanelOpen: boolean;
  /** comment pin being edited */
  activeCommentId: ID | null;
  /** show comment pins on canvas */
  showComments: boolean;
  /** right panel tab (design / prototype) */
  rightTab: RightPanelTab;

  /* tool / view */
  setTool: (tool: Tool) => void;
  setHover: (id: ID | null) => void;
  setCanvasSize: (w: number, h: number) => void;
  setViewFlag: (key: keyof ViewFlags, value: boolean) => void;
  setViewport: (vp: Viewport) => void;
  panBy: (dx: number, dy: number) => void;
  zoomAt: (factor: number, screenX?: number, screenY?: number) => void;
  setZoom: (z: number) => void;
  zoomToFit: () => void;
  zoomToSelection: () => void;
  zoomReset: () => void;

  /* pages */
  setCurrentPage: (id: ID) => void;
  addPage: () => void;
  deletePage: (id: ID) => void;
  renamePage: (id: ID, name: string) => void;
  duplicatePage: (id: ID) => void;
  movePage: (id: ID, dir: -1 | 1) => void;
  setDocName: (name: string) => void;

  /* selection */
  setSelection: (ids: ID[]) => void;
  toggleSelection: (id: ID) => void;
  selectAll: () => void;
  selectSameType: () => void;

  /* history */
  pushHistory: (label?: string) => void;
  historyBegin: () => void;
  historyCommit: () => void;
  historyCancel: () => void;
  undo: () => void;
  redo: () => void;

  /* nodes */
  addNode: (type: NodeType, patch: Partial<IrisNode>, parentId?: ID | null) => ID;
  updateNodes: (
    ids: ID[],
    patch: Partial<IrisNode> | ((n: IrisNode) => Partial<IrisNode>),
    opts?: { history?: boolean | string },
  ) => void;
  setNodeRect: (
    id: ID,
    rect: { x: number; y: number; w: number; h: number },
    opts?: { history?: boolean | string },
  ) => void;
  deleteNodes: (ids: ID[]) => void;
  deleteSelection: () => void;
  copySelection: () => void;
  cutSelection: () => void;
  paste: (at?: { x: number; y: number } | null) => void;
  duplicateSelection: (offset?: { dx: number; dy: number }) => ID[];
  groupSelection: () => void;
  ungroupSelection: () => void;
  reorderNodes: (ids: ID[], parentId: ID | null, index: number) => void;
  zorder: (mode: 'front' | 'back' | 'forward' | 'backward') => void;
  alignSelection: (mode: AlignMode) => void;
  resizeSelectionBox: (w: number, h: number) => void;
  moveSelectionWorld: (dx: number, dy: number, label?: string) => void;
  renameNode: (id: ID, name: string) => void;

  /* transforms */
  flipSelection: (axis: 'h' | 'v') => void;
  rotateSelectionBy: (deg: number) => void;
  toggleLockSelection: () => void;
  unlockAllOnPage: () => void;
  toggleHideSelection: () => void;

  /* style */
  copyStyle: () => void;
  pasteStyle: () => void;

  /* doc settings */
  setSettings: (patch: Partial<DocSettings>) => void;
  setGridSettings: (patch: Partial<DocSettings['grid']>) => void;
  addGuide: (axis: 'x' | 'y', at: number) => void;
  moveGuide: (axis: 'x' | 'y', index: number, at: number) => void;
  removeGuide: (axis: 'x' | 'y', index: number) => void;
  clearGuides: () => void;

  /* editing */
  setEditingText: (id: ID | null) => void;
  setEditingPath: (id: ID | null) => void;

  /* images */
  importImage: (src: string, w: number, h: number, at?: { x: number; y: number }, parentId?: ID | null) => ID;

  /* files */
  newDoc: () => void;
  newDocFromTemplate: (templateId: string) => void;
  loadDoc: (doc: unknown, savedName?: string | null, fitView?: boolean) => void;
  markSaved: (name: string) => void;
  openDoc: (id: ID, opts?: { push?: boolean }) => void;
  goHome: (opts?: { push?: boolean }) => void;
  /** re-read the URL route (popstate) and load/leave the doc accordingly */
  syncRoute: () => void;
  /** persist the active document immediately (clears the debounce timer) */
  flushSave: () => void;

  /* ui */
  toast: (msg: string, action?: ToastAction) => void;
  dismissToast: (id: number) => void;
  openContextMenu: (x: number, y: number, worldX: number, worldY: number) => void;
  closeContextMenu: () => void;
  setExportOpen: (open: boolean) => void;
  setShortcutsOpen: (open: boolean) => void;

  /* comments */
  addComment: (x: number, y: number, text: string) => ID;
  updateComment: (id: ID, patch: Partial<IrisComment>) => void;
  deleteComment: (id: ID) => void;
  setActiveComment: (id: ID | null) => void;
  setShowComments: (v: boolean) => void;

  /* editor chrome */
  setPresenting: (v: boolean) => void;
  setInspectMode: (v: boolean) => void;
  setShareOpen: (v: boolean) => void;
  setLeftPanelView: (view: LeftPanelView, toggle?: boolean) => void;
  toggleLeftPanel: () => void;
  setRightTab: (tab: RightPanelTab) => void;

  /* frame presets */
  addFramePreset: (preset: FramePreset) => ID;
}

/* ------------------------------------------------------------------ */

const HISTORY_LIMIT = 100;
const DEFAULT_VIEWPORT: Viewport = { x: 120, y: 120, zoom: 1 };

function deepClone<T>(v: T): T {
  if (typeof structuredClone === 'function') return structuredClone(v);
  return JSON.parse(JSON.stringify(v)) as T;
}

function draftOf(doc: IrisDoc): IrisDoc {
  return {
    name: doc.name,
    pages: doc.pages,
    pagesById: { ...doc.pagesById },
    nodesById: { ...doc.nodesById },
    settings: {
      ...doc.settings,
      grid: { ...doc.settings.grid },
      guidesX: [...doc.settings.guidesX],
      guidesY: [...doc.settings.guidesY],
    },
    comments: doc.comments ? doc.comments.map((c) => ({ ...c })) : [],
  };
}

function putNode(draft: IrisDoc, id: ID, patch: Partial<IrisNode> | ((n: IrisNode) => Partial<IrisNode>)): void {
  const old = draft.nodesById[id];
  if (!old) return;
  draft.nodesById[id] = { ...old, ...(typeof patch === 'function' ? patch(old) : patch) };
}

function putPage(draft: IrisDoc, id: ID, patch: Partial<{ name: string; nodeIds: ID[] }>): void {
  const old = draft.pagesById[id];
  if (!old) return;
  draft.pagesById[id] = { ...old, ...patch };
}

function removeChildRef(draft: IrisDoc, pageId: ID, parentId: ID | null, childId: ID): void {
  if (parentId === null) {
    const page = draft.pagesById[pageId];
    if (page) putPage(draft, pageId, { nodeIds: page.nodeIds.filter((c) => c !== childId) });
  } else {
    const p = draft.nodesById[parentId];
    if (p) putNode(draft, parentId, { children: p.children.filter((c) => c !== childId) });
  }
}

function insertChildRef(draft: IrisDoc, pageId: ID, parentId: ID | null, childId: ID, index?: number): void {
  if (parentId === null) {
    const page = draft.pagesById[pageId];
    if (!page) return;
    const list = page.nodeIds.filter((c) => c !== childId);
    const at = index === undefined || index < 0 || index > list.length ? list.length : index;
    list.splice(at, 0, childId);
    putPage(draft, pageId, { nodeIds: list });
  } else {
    const p = draft.nodesById[parentId];
    if (!p) return;
    const list = p.children.filter((c) => c !== childId);
    const at = index === undefined || index < 0 || index > list.length ? list.length : index;
    list.splice(at, 0, childId);
    putNode(draft, parentId, { children: list });
  }
}

/** Extract rotation/x/y so the node's local matrix equals `m` (node size fixed). */
function applyLocalMatrix(node: IrisNode, m: Mat): void {
  const r = setNodeWorldTransform(node, m);
  node.x = r.x;
  node.y = r.y;
  node.rotation = r.rotation;
}

/** Scale all descendants of a container by (sx, sy) in the container's local space. */
function scaleSubtree(draft: IrisDoc, rootId: ID, sx: number, sy: number, scaleFont: boolean): void {
  const root = draft.nodesById[rootId];
  if (!root || !root.children) return;
  const visit = (id: ID) => {
    const n = draft.nodesById[id];
    if (!n) return;
    const patch: Partial<IrisNode> = {
      x: n.x * sx,
      y: n.y * sy,
      w: Math.max(0.5, n.w * sx),
      h: Math.max(0.5, n.h * sy),
    };
    if (scaleFont) {
      const s = (Math.abs(sx) + Math.abs(sy)) / 2;
      if (Math.abs(s - 1) > 0.001) {
        patch.fontSize = Math.max(1, n.fontSize * s);
        patch.cornerRadius = Math.max(0, n.cornerRadius * s);
      }
    }
    if (n.points.length) {
      patch.points = n.points.map((p) => ({ x: p.x * sx, y: p.y * sy, hx: p.hx * sx, hy: p.hy * sy }));
    }
    putNode(draft, id, patch);
    n.children.forEach(visit);
  };
  root.children.forEach(visit);
}

let toastSeq = 1;
let autosaveTimer: ReturnType<typeof setTimeout> | null = null;
let lastHistoryLabel: string | undefined;
let lastHistoryAt = 0;
/** pending interaction snapshot (drag begin/commit) */
let pendingSnapshot: Snapshot | null = null;

/** Persist the active document into the library (callers debounce). */
function saveAutosave(state: IrisStore): void {
  if (typeof window === 'undefined') return;
  if (!state.docId) return;
  saveDocToLibrary(state.docId, state.doc, {
    currentPageId: state.currentPageId,
    viewport: state.viewport,
  });
}

function scheduleAutosave(get: () => IrisStore): void {
  if (autosaveTimer) clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(() => saveAutosave(get()), 800);
}

interface BootState {
  doc: IrisDoc;
  docId: ID;
  pageId: ID;
  viewport: Viewport;
}

/**
 * One-time boot: run the legacy storage migration, then restore the document
 * named in the URL (?doc=<id>). Returns null when starting at the homepage.
 */
function bootIris(): BootState | null {
  if (typeof window === 'undefined') return null;
  migrateLegacyLibrary();
  const route = routeFromLocation();
  if (route.kind !== 'doc') return null;
  const stored = getStoredDoc(route.id);
  if (!stored) {
    replaceRoute({ kind: 'home' }); // stale URL — clean it up
    return null;
  }
  const doc = stored.doc;
  const pageId =
    stored.currentPageId && doc.pages.includes(stored.currentPageId) ? stored.currentPageId : doc.pages[0];
  return { doc, docId: route.id, pageId, viewport: stored.viewport ?? DEFAULT_VIEWPORT };
}

/* ------------------------------------------------------------------ */

export const useIris = create<IrisStore>()((set, get) => {
  // NOTE: the initial doc must be created exactly once — a second
  // createDefaultDoc() would produce a phantom currentPageId.
  const booted = bootIris();
  const initialDoc = booted?.doc ?? createDefaultDoc();
  const initialPageId = booted?.pageId ?? initialDoc.pages[0];
  const initialRoute: IrisRoute = booted ? { kind: 'doc', id: booted.docId } : { kind: 'home' };
  /**
   * Core mutation pipeline: optional history push, clone-on-write doc mutation,
   * selection sanity, autosave scheduling.
   */
  const commit = (
    mutator: (draft: IrisDoc) => void,
    opts?: { history?: boolean | string; selection?: ID[]; skipDirty?: boolean },
  ): void => {
    const state = get();
    const history = opts?.history === undefined ? true : opts.history;
    if (history !== false) {
      const label = typeof history === 'string' ? history : undefined;
      const now = Date.now();
      const coalesce = label !== undefined && label === lastHistoryLabel && now - lastHistoryAt < 700;
      if (!coalesce && state.doc.nodesById && state.doc.pagesById) {
        const snap: Snapshot = {
          doc: deepClone(state.doc),
          selection: [...state.selection],
          currentPageId: state.currentPageId,
        };
        set((s) => ({ past: [...s.past, snap].slice(-HISTORY_LIMIT), future: [] }));
      }
      lastHistoryLabel = label;
      lastHistoryAt = now;
    }
    const draft = draftOf(state.doc);
    mutator(draft);
    const pageId = get().currentPageId;
    let sel = get().selection.filter((id) => {
      const n = draft.nodesById[id];
      return !!n && n.pageId === pageId;
    });
    if (opts?.selection) {
      const valid = opts.selection.filter((id) => draft.nodesById[id] && draft.nodesById[id].pageId === pageId);
      if (valid.length || opts.selection.length === 0) sel = valid;
    }
    const st = get();
    const editingTextId = st.editingTextId && draft.nodesById[st.editingTextId] ? st.editingTextId : null;
    const editingPathId = st.editingPathId && draft.nodesById[st.editingPathId] ? st.editingPathId : null;
    set({ doc: draft, selection: sel, editingTextId, editingPathId, dirty: opts?.skipDirty ? st.dirty : true });
    scheduleAutosave(get);
  };

  const currentPage = (): ID => get().currentPageId;

  /** Shared paste/duplicate: clone source subtrees with a world-space offset. */
  const pasteOrDuplicate = (sourceNodes: IrisNode[], sourceRoots: IrisNode[], dx: number, dy: number): ID[] => {
    if (sourceRoots.length === 0) return [];
    const state = get();
    const pageId = currentPage();
    const idMap = new Map<ID, ID>();
    let counter = 0;
    for (const n of sourceNodes) {
      counter += 1;
      idMap.set(n.id, `${n.id}c${counter}${Math.random().toString(36).slice(2, 6)}`);
    }
    const cloned = sourceNodes.map((n) => ({
      ...n,
      id: idMap.get(n.id)!,
      pageId,
      children: n.children.map((c) => idMap.get(c)).filter((c): c is ID => !!c),
      points: n.points.map((p) => ({ ...p })),
      fillGradient: n.fillGradient ? { ...n.fillGradient } : null,
      shadow: n.shadow ? { ...n.shadow } : null,
    }));
    const worldTargets = new Map<ID, Mat>();
    for (const root of sourceRoots) {
      const W = nodeWorldMatrix(state.doc, root);
      worldTargets.set(idMap.get(root.id)!, mMul(mTranslate(dx, dy), W));
    }
    const newRootIds = sourceRoots.map((r) => idMap.get(r.id)!);
    commit(
      (draft) => {
        for (const c of cloned) {
          let parentId: ID | null = null;
          if (c.parentId) {
            const pid = idMap.get(c.parentId) ?? c.parentId;
            const pn = draft.nodesById[pid];
            if (pn && pn.pageId === pageId && isContainer(pn)) parentId = pid;
          }
          const node: IrisNode = { ...c, parentId };
          const target = worldTargets.get(c.id);
          if (target) applyLocalMatrix(node, target);
          draft.nodesById[c.id] = node;
        }
        for (const c of cloned) {
          const node = draft.nodesById[c.id];
          if (node) insertChildRef(draft, pageId, node.parentId, c.id, undefined);
        }
      },
      { history: 'paste', selection: newRootIds },
    );
    return newRootIds;
  };

  const viewportCenter = (): { x: number; y: number } => {
    const { viewport, canvasSize } = get();
    return screenToWorld(viewport, Math.max(0, canvasSize.w / 2 - 10), Math.max(0, canvasSize.h / 2 - 10));
  };

  /** Style fields copied by copy/paste style. */
  const STYLE_FIELDS: (keyof IrisNode)[] = [
    'fill',
    'stroke',
    'strokeWidth',
    'cornerRadius',
    'opacity',
    'dash',
    'fillGradient',
    'shadow',
    'blur',
    'blend',
    'fontFamily',
    'fontSize',
    'fontWeight',
    'textAlign',
    'lineHeight',
    'letterSpacing',
    'textCase',
    'underline',
    'strike',
  ];

  return {
    doc: initialDoc,
    docId: booted?.docId ?? null,
    route: initialRoute,
    currentPageId: initialPageId,
    selection: [],
    tool: 'move',
    viewport: booted?.viewport ?? DEFAULT_VIEWPORT,
    editingTextId: null,
    editingPathId: null,
    hoverId: null,
    viewFlags: { rulers: true, pixelGrid: true, outline: false },
    past: [],
    future: [],
    clipboard: null,
    contextMenu: null,
    exportOpen: false,
    shortcutsOpen: false,
    toasts: [],
    savedName: null,
    dirty: false,
    canvasSize: { w: 800, h: 600 },
    styleClipboard: null,
    presenting: false,
    inspectMode: false,
    shareOpen: false,
    leftPanelView: 'layers',
    leftPanelOpen: true,
    activeCommentId: null,
    showComments: true,
    rightTab: 'design',

    setLeftPanelView: (view, toggle) =>
      set((s) => {
        if (toggle && s.leftPanelView === view && s.leftPanelOpen) return { leftPanelOpen: false };
        return { leftPanelView: view, leftPanelOpen: true };
      }),
    toggleLeftPanel: () => set((s) => ({ leftPanelOpen: !s.leftPanelOpen })),
    setRightTab: (tab) => set({ rightTab: tab }),
    setPresenting: (v) => set({ presenting: v }),
    setInspectMode: (v) => set({ inspectMode: v }),
    setShareOpen: (v) => set({ shareOpen: v }),

    /* ------------------------- comments ---------------------------- */
    addComment: (x, y, text) => {
      const c: IrisComment = {
        id: `cm${Math.random().toString(36).slice(2, 10)}`,
        pageId: get().currentPageId,
        x,
        y,
        text,
        author: 'You',
        ts: Date.now(),
        resolved: false,
      };
      commit(
        (draft) => {
          draft.comments = [...draft.comments, c];
        },
        { history: 'comment' },
      );
      return c.id;
    },
    updateComment: (id, patch) => {
      commit(
        (draft) => {
          draft.comments = draft.comments.map((c) => (c.id === id ? { ...c, ...patch } : c));
        },
        { history: 'comment' },
      );
    },
    deleteComment: (id) => {
      commit(
        (draft) => {
          draft.comments = draft.comments.filter((c) => c.id !== id);
        },
        { history: 'comment' },
      );
      set((s) => (s.activeCommentId === id ? { activeCommentId: null } : {}));
    },
    setActiveComment: (id) => set({ activeCommentId: id }),
    setShowComments: (v) => set({ showComments: v }),

    /* ------------------------ frame presets ------------------------ */
    addFramePreset: (preset) => {
      // presets always land at the top level of the page (Figma behavior) —
      // centered on the current view, offset if it would overlap existing
      // top-level frames
      const s = get();
      const center = viewportCenter();
      const page = s.doc.pagesById[s.currentPageId];
      let x = center.x - preset.w / 2;
      let y = center.y - preset.h / 2;
      if (page) {
        const overlap = page.nodeIds.some((id) => {
          const n = s.doc.nodesById[id];
          if (!n || n.type !== 'frame') return false;
          const b = nodeWorldAABB(s.doc, n);
          return Math.abs(b.x - x) < 32 && Math.abs(b.y - y) < 32;
        });
        if (overlap) {
          x += 60;
          y += 60;
        }
      }
      return get().addNode(
        'frame',
        {
          x,
          y,
          w: preset.w,
          h: preset.h,
          name: preset.name,
        },
        null,
      );
    },

    /* ------------------------- tool / view ------------------------- */
    setTool: (tool) => {
      const st = get();
      if (st.tool === tool) return;
      if (st.editingTextId) set({ editingTextId: null });
      if (st.editingPathId) set({ editingPathId: null });
      set({ tool });
    },
    setHover: (id) => set({ hoverId: id }),
    setCanvasSize: (w, h) => set({ canvasSize: { w, h } }),
    setViewFlag: (key, value) => set((s) => ({ viewFlags: { ...s.viewFlags, [key]: value } })),
    setViewport: (vp) => {
      set({ viewport: vp });
      scheduleAutosave(get);
    },
    panBy: (dx, dy) => {
      set((s) => ({ viewport: { ...s.viewport, x: s.viewport.x + dx, y: s.viewport.y + dy } }));
      scheduleAutosave(get);
    },
    zoomAt: (factor, screenX, screenY) => {
      const { viewport, canvasSize } = get();
      const z = Math.min(256, Math.max(0.02, viewport.zoom * factor));
      if (Math.abs(z - viewport.zoom) < 1e-9) return;
      const cx = screenX ?? Math.max(0, canvasSize.w / 2 - 10);
      const cy = screenY ?? Math.max(0, canvasSize.h / 2 - 10);
      const k = z / viewport.zoom;
      set({ viewport: { zoom: z, x: cx - (cx - viewport.x) * k, y: cy - (cy - viewport.y) * k } });
      scheduleAutosave(get);
    },
    setZoom: (z) => get().zoomAt(z / get().viewport.zoom),
    zoomToFit: () => {
      const { doc, currentPageId, canvasSize } = get();
      const page = doc.pagesById[currentPageId];
      if (!page) return;
      const rects = page.nodeIds
        .map((id) => doc.nodesById[id])
        .filter(Boolean)
        .map((n) => nodeWorldAABB(doc, n));
      const bounds = rects.length ? unionRects(rects) : { x: 0, y: 0, w: 800, h: 600 };
      const cw = Math.max(50, canvasSize.w - 80);
      const ch = Math.max(50, canvasSize.h - 80);
      const zoom = Math.min(256, Math.max(0.02, Math.min(cw / Math.max(bounds.w, 1), ch / Math.max(bounds.h, 1)) * 0.9));
      set({
        viewport: {
          zoom,
          x: (canvasSize.w - 30) / 2 - (bounds.x + bounds.w / 2) * zoom,
          y: (canvasSize.h - 30) / 2 - (bounds.y + bounds.h / 2) * zoom,
        },
      });
      scheduleAutosave(get);
    },
    zoomToSelection: () => {
      const { doc, selection, canvasSize } = get();
      const bounds = boundsOfNodes(doc, selection);
      if (!bounds) return;
      const cw = Math.max(50, canvasSize.w - 120);
      const ch = Math.max(50, canvasSize.h - 120);
      const zoom = Math.min(64, Math.max(0.02, Math.min(cw / Math.max(bounds.w, 1), ch / Math.max(bounds.h, 1)) * 0.9));
      set({
        viewport: {
          zoom,
          x: (canvasSize.w - 30) / 2 - (bounds.x + bounds.w / 2) * zoom,
          y: (canvasSize.h - 30) / 2 - (bounds.y + bounds.h / 2) * zoom,
        },
      });
      scheduleAutosave(get);
    },
    zoomReset: () => get().setZoom(1),

    /* ---------------------------- pages ---------------------------- */
    setCurrentPage: (id) => {
      const st = get();
      if (!st.doc.pagesById[id] || id === st.currentPageId) return;
      set({ currentPageId: id, selection: [], editingTextId: null, editingPathId: null, hoverId: null });
    },
    addPage: () => {
      const state = get();
      const page = createPage(`Page ${state.doc.pages.length + 1}`);
      commit(
        (draft) => {
          draft.pages = [...draft.pages, page.id];
          draft.pagesById[page.id] = page;
        },
        { history: 'page', selection: [] },
      );
      set({ currentPageId: page.id });
    },
    deletePage: (id) => {
      const state = get();
      if (state.doc.pages.length <= 1) {
        get().toast('A document needs at least one page');
        return;
      }
      const page = state.doc.pagesById[id];
      if (!page) return;
      const doomed = new Set<ID>();
      page.nodeIds.forEach((rootId) => collectSubtree(state.doc, rootId).forEach((n) => doomed.add(n.id)));
      const remaining = state.doc.pages.filter((p) => p !== id);
      commit(
        (draft) => {
          for (const nid of doomed) delete draft.nodesById[nid];
          draft.pages = remaining;
          delete draft.pagesById[id];
        },
        { history: 'page', selection: [] },
      );
      set({ currentPageId: remaining[0] });
      get().toast(`Deleted “${page.name}”`);
    },
    renamePage: (id, name) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      commit((draft) => putPage(draft, id, { name: trimmed }), { history: false });
    },
    duplicatePage: (id) => {
      const state = get();
      const page = state.doc.pagesById[id];
      if (!page) return;
      const copy = createPage(`${page.name} copy`);
      const idMap = new Map<ID, ID>();
      const clone: IrisNode[] = [];
      const visit = (nid: ID): void => {
        const n = state.doc.nodesById[nid];
        if (!n) return;
        const fresh = {
          ...n,
          id: n.id,
          pageId: copy.id,
          points: n.points.map((p) => ({ ...p })),
          fillGradient: n.fillGradient ? { ...n.fillGradient } : null,
          shadow: n.shadow ? { ...n.shadow } : null,
        };
        clone.push(fresh);
        n.children.forEach(visit);
      };
      page.nodeIds.forEach(visit);
      // fresh ids must be generated up-front to remap children
      for (const n of clone) idMap.set(n.id, `${n.id}p${Math.random().toString(36).slice(2, 7)}`);
      const remapped = clone.map((n) => ({
        ...n,
        id: idMap.get(n.id)!,
        parentId: n.parentId ? (idMap.get(n.parentId) ?? null) : null,
        children: n.children.map((c) => idMap.get(c)).filter((c): c is ID => !!c),
      }));
      commit(
        (draft) => {
          draft.pages = [...draft.pages, copy.id];
          draft.pagesById[copy.id] = { ...copy, nodeIds: page.nodeIds.map((nid) => idMap.get(nid)!).filter(Boolean) };
          for (const n of remapped) draft.nodesById[n.id] = n;
        },
        { history: 'page', selection: [] },
      );
      set({ currentPageId: copy.id });
      get().toast(`Duplicated “${page.name}”`);
    },
    movePage: (id, dir) => {
      const state = get();
      const i = state.doc.pages.indexOf(id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= state.doc.pages.length) return;
      commit(
        (draft) => {
          const pages = [...draft.pages];
          const [moved] = pages.splice(i, 1);
          pages.splice(j, 0, moved);
          draft.pages = pages;
        },
        { history: 'page' },
      );
    },
    setDocName: (name) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      set((s) => ({ doc: { ...s.doc, name: trimmed }, dirty: true }));
      const { docId } = get();
      if (docId) renameDocInLibrary(docId, trimmed);
      scheduleAutosave(get);
    },

    /* -------------------------- selection -------------------------- */
    setSelection: (ids) => {
      const { doc, currentPageId } = get();
      const page = doc.pagesById[currentPageId];
      const onPage = new Set<ID>();
      const addTree = (nid: ID) => {
        onPage.add(nid);
        doc.nodesById[nid]?.children.forEach(addTree);
      };
      page?.nodeIds.forEach(addTree);
      const sel: ID[] = [];
      for (const id of ids) {
        if (onPage.has(id) && !sel.includes(id)) sel.push(id);
      }
      set({ selection: sel });
    },
    toggleSelection: (id) => {
      const sel = get().selection;
      get().setSelection(sel.includes(id) ? sel.filter((s) => s !== id) : [...sel, id]);
    },
    selectAll: () => {
      const { doc, currentPageId } = get();
      const page = doc.pagesById[currentPageId];
      if (page) set({ selection: [...page.nodeIds] });
    },
    selectSameType: () => {
      const { doc, selection, currentPageId } = get();
      const page = doc.pagesById[currentPageId];
      if (!page || selection.length === 0) return;
      const types = new Set(selection.map((id) => doc.nodesById[id]?.type).filter(Boolean) as NodeType[]);
      const out: ID[] = [];
      const visit = (nid: ID): void => {
        const n = doc.nodesById[nid];
        if (!n) return;
        if (types.has(n.type)) out.push(nid);
        n.children.forEach(visit);
      };
      page.nodeIds.forEach(visit);
      // keep only top-level entries (drop nested descendants of the selection)
      const top = out.filter((id) => {
        let p = doc.nodesById[id]?.parentId;
        while (p) {
          if (out.includes(p)) return false;
          p = doc.nodesById[p]?.parentId;
        }
        return true;
      });
      if (top.length) set({ selection: top });
      get().toast(`Selected ${top.length} object${top.length === 1 ? '' : 's'} of the same type`);
    },

    /* --------------------------- history --------------------------- */
    pushHistory: (label) => {
      commit(() => {}, { history: label });
    },
    historyBegin: () => {
      const s = get();
      pendingSnapshot = {
        doc: deepClone(s.doc),
        selection: [...s.selection],
        currentPageId: s.currentPageId,
      };
    },
    historyCommit: () => {
      if (!pendingSnapshot) return;
      const snap = pendingSnapshot;
      pendingSnapshot = null;
      set((s) => ({ past: [...s.past, snap].slice(-HISTORY_LIMIT), future: [] }));
      lastHistoryLabel = undefined;
    },
    historyCancel: () => {
      pendingSnapshot = null;
    },
    undo: () => {
      const s = get();
      if (s.past.length === 0) return;
      const prev = s.past[s.past.length - 1];
      const current: Snapshot = {
        doc: deepClone(s.doc),
        selection: [...s.selection],
        currentPageId: s.currentPageId,
      };
      const validPage = prev.doc.pages.includes(prev.currentPageId) ? prev.currentPageId : prev.doc.pages[0];
      const validSelection = prev.selection.filter((id) => prev.doc.nodesById[id] && prev.doc.nodesById[id].pageId === validPage);
      set({
        doc: prev.doc,
        selection: validSelection,
        currentPageId: validPage,
        past: s.past.slice(0, -1),
        future: [current, ...s.future].slice(0, HISTORY_LIMIT),
        editingTextId: null,
        editingPathId: null,
        dirty: true,
      });
      lastHistoryLabel = undefined;
      scheduleAutosave(get);
    },
    redo: () => {
      const s = get();
      if (s.future.length === 0) return;
      const next = s.future[0];
      const current: Snapshot = {
        doc: deepClone(s.doc),
        selection: [...s.selection],
        currentPageId: s.currentPageId,
      };
      const validPage = next.doc.pages.includes(next.currentPageId) ? next.currentPageId : next.doc.pages[0];
      const validSelection = next.selection.filter((id) => next.doc.nodesById[id] && next.doc.nodesById[id].pageId === validPage);
      set({
        doc: next.doc,
        selection: validSelection,
        currentPageId: validPage,
        past: [...s.past, current].slice(-HISTORY_LIMIT),
        future: s.future.slice(1),
        editingTextId: null,
        editingPathId: null,
        dirty: true,
      });
      lastHistoryLabel = undefined;
      scheduleAutosave(get);
    },

    /* ---------------------------- nodes ---------------------------- */
    addNode: (type, patch, parentId) => {
      const state = get();
      const pageId = currentPage();
      const node = createNode(type, pageId, {
        name: nextName(state.doc, type),
        ...patch,
        parentId: parentId ?? null,
      });
      commit(
        (draft) => {
          draft.nodesById[node.id] = node;
          insertChildRef(draft, pageId, parentId ?? null, node.id);
        },
        { selection: [node.id] },
      );
      return node.id;
    },

    updateNodes: (ids, patch, opts) => {
      commit(
        (draft) => {
          for (const id of ids) putNode(draft, id, patch);
        },
        { history: opts?.history },
      );
    },

    setNodeRect: (id, rect, opts) => {
      commit(
        (draft) => {
          const n = draft.nodesById[id];
          if (!n) return;
          const oldW = n.w;
          const oldH = n.h;
          const w = Math.max(n.type === 'line' || n.type === 'arrow' ? 0 : 1, rect.w);
          const h = Math.max(n.type === 'line' || n.type === 'arrow' ? 0 : 1, rect.h);
          putNode(draft, id, { x: rect.x, y: rect.y, w, h });
          if (isContainer(n) && oldW > 0.01 && oldH > 0.01) {
            scaleSubtree(draft, id, w / oldW, h / oldH, true);
          } else if (n.type === 'text' && Math.abs(w - oldW) > 0.01 && Math.abs(h - oldH) > 0.01) {
            const s = ((w / oldW) * 0.5 + (h / oldH) * 0.5);
            putNode(draft, id, { fontSize: Math.max(1, n.fontSize * s), autoWidth: false });
          } else if (n.type === 'text' && Math.abs(w - oldW) > 0.01) {
            putNode(draft, id, { autoWidth: false });
          }
        },
        { history: opts?.history },
      );
    },

    deleteNodes: (ids) => {
      if (ids.length === 0) return;
      const state = get();
      const pageId = currentPage();
      const doomed = new Set<ID>();
      for (const id of ids) collectSubtree(state.doc, id).forEach((n) => doomed.add(n.id));
      if (doomed.size === 0) return;
      commit(
        (draft) => {
          for (const nid of doomed) {
            const n = draft.nodesById[nid];
            if (n) removeChildRef(draft, pageId, n.parentId, nid);
            delete draft.nodesById[nid];
          }
        },
        { history: 'delete', selection: [] },
      );
      get().toast(`Deleted ${doomed.size} object${doomed.size === 1 ? '' : 's'}`, {
        label: 'Undo',
        run: () => get().undo(),
      });
    },
    deleteSelection: () => get().deleteNodes(get().selection),

    copySelection: () => {
      const state = get();
      if (state.selection.length === 0) return;
      const roots = state.selection.map((id) => state.doc.nodesById[id]).filter(Boolean) as IrisNode[];
      const nodes: IrisNode[] = [];
      roots.forEach((r) => collectSubtree(state.doc, r.id).forEach((n) => nodes.push({ ...n, points: n.points.map((p) => ({ ...p })) })));
      const origin = boundsOfNodes(state.doc, state.selection);
      set({
        clipboard: origin
          ? { nodes, rootIds: roots.map((r) => r.id), origin, pageId: state.currentPageId, count: 0 }
          : null,
      });
      get().toast(`Copied ${roots.length} object${roots.length > 1 ? 's' : ''}`);
    },

    cutSelection: () => {
      get().copySelection();
      get().deleteSelection();
    },

    paste: (at) => {
      const state = get();
      const clip = state.clipboard;
      if (!clip) {
        get().toast('Clipboard is empty');
        return;
      }
      const pageId = currentPage();
      const dx = at ? at.x - clip.origin.x : 12 * (clip.count + 1);
      const dy = at ? at.y - clip.origin.y : 12 * (clip.count + 1);
      set({ clipboard: { ...clip, count: clip.count + 1 } });
      const rootIds = clip.rootIds;
      const roots = rootIds.map((id) => clip.nodes.find((n) => n.id === id)).filter(Boolean) as IrisNode[];
      const ids = new Set<ID>();
      const byId = Object.fromEntries(clip.nodes.map((n) => [n.id, n])) as Record<ID, IrisNode>;
      const fakeDoc = { pages: [], pagesById: {}, nodesById: byId, name: '', settings: DEFAULT_SETTINGS } as unknown as IrisDoc;
      roots.forEach((r) => collectSubtree(fakeDoc, r.id).forEach((n) => ids.add(n.id)));
      const nodes = clip.nodes.filter((n) => ids.has(n.id));
      const newRoots = pasteOrDuplicate(nodes, roots, dx, dy);
      if (newRoots.length) get().setSelection(newRoots);
    },

    duplicateSelection: (offset) => {
      const state = get();
      if (state.selection.length === 0) return [];
      const { dx = 10, dy = 10 } = offset ?? {};
      const roots = state.selection.map((id) => state.doc.nodesById[id]).filter(Boolean) as IrisNode[];
      const nodes: IrisNode[] = [];
      roots.forEach((r) => collectSubtree(state.doc, r.id).forEach((n) => nodes.push(n)));
      return pasteOrDuplicate(nodes, roots, dx, dy);
    },

    groupSelection: () => {
      const state = get();
      const nodes = state.selection.map((id) => state.doc.nodesById[id]).filter(Boolean) as IrisNode[];
      if (nodes.length === 0) return;
      const parentId = nodes[0].parentId;
      if (nodes.some((n) => n.parentId !== parentId)) {
        get().toast('Grouping requires objects with the same parent');
        return;
      }
      const pageId = currentPage();
      const rects = nodes.map((n) => {
        const m = nodeLocalMatrix(n);
        return {
          x: Math.min(mApplyVec(m, 0, 0).x, mApplyVec(m, n.w, 0).x, mApplyVec(m, n.w, n.h).x, mApplyVec(m, 0, n.h).x),
          y: Math.min(mApplyVec(m, 0, 0).y, mApplyVec(m, n.w, 0).y, mApplyVec(m, n.w, n.h).y, mApplyVec(m, 0, n.h).y),
        };
      });
      const maxRec = nodes.map((n) => {
        const m = nodeLocalMatrix(n);
        return {
          x: Math.max(mApplyVec(m, 0, 0).x, mApplyVec(m, n.w, 0).x, mApplyVec(m, n.w, n.h).x, mApplyVec(m, 0, n.h).x),
          y: Math.max(mApplyVec(m, 0, 0).y, mApplyVec(m, n.w, 0).y, mApplyVec(m, n.w, n.h).y, mApplyVec(m, 0, n.h).y),
        };
      });
      const x = Math.min(...rects.map((r) => r.x));
      const y = Math.min(...rects.map((r) => r.y));
      const maxX = Math.max(...maxRec.map((r) => r.x));
      const maxY = Math.max(...maxRec.map((r) => r.y));
      const group = createNode('group', pageId, {
        name: nextName(state.doc, 'group'),
        x,
        y,
        w: Math.max(1, maxX - x),
        h: Math.max(1, maxY - y),
        parentId,
        children: [],
      });
      const ordered = nodes.slice().sort((a, b) => {
        const list = parentId === null ? state.doc.pagesById[pageId].nodeIds : state.doc.nodesById[parentId].children;
        return list.indexOf(a.id) - list.indexOf(b.id);
      });
      const insertAt = (() => {
        const list = parentId === null ? state.doc.pagesById[pageId].nodeIds : state.doc.nodesById[parentId].children;
        const idx = Math.max(...ordered.map((n) => list.indexOf(n.id)));
        return idx - ordered.length + 1; // slot of the topmost selected after removals
      })();
      commit(
        (draft) => {
          for (const n of ordered) removeChildRef(draft, pageId, parentId, n.id);
          draft.nodesById[group.id] = { ...group, children: ordered.map((n) => n.id) };
          for (const n of ordered) {
            putNode(draft, n.id, { parentId: group.id, x: n.x - x, y: n.y - y });
          }
          insertChildRef(draft, pageId, parentId, group.id, insertAt);
        },
        { history: 'group', selection: [group.id] },
      );
    },

    ungroupSelection: () => {
      const state = get();
      const containers = state.selection
        .map((id) => state.doc.nodesById[id])
        .filter((n): n is IrisNode => !!n && isContainer(n));
      if (containers.length === 0) {
        get().toast('Select a group or frame to ungroup');
        return;
      }
      const pageId = currentPage();
      const freed: ID[] = [];
      commit(
        (draft) => {
          for (const c of containers) {
            const node = draft.nodesById[c.id];
            if (!node) continue;
            const parentId = node.parentId;
            const list = parentId === null ? draft.pagesById[pageId].nodeIds : draft.nodesById[parentId].children;
            const index = list.indexOf(c.id);
            removeChildRef(draft, pageId, parentId, c.id);
            const childIds = [...node.children];
            let at = index < 0 ? undefined : index;
            for (const childId of childIds) {
              const child = draft.nodesById[childId];
              if (!child) continue;
              const m = mMul(nodeLocalMatrix(node), nodeLocalMatrix(child));
              const fresh = { ...child };
              applyLocalMatrix(fresh, m);
              fresh.parentId = parentId;
              draft.nodesById[childId] = fresh;
              insertChildRef(draft, pageId, parentId, childId, at);
              at = at === undefined ? undefined : at + 1;
              freed.push(childId);
            }
            delete draft.nodesById[c.id];
          }
        },
        { history: 'ungroup', selection: freed },
      );
    },

    reorderNodes: (ids, parentId, index) => {
      const state = get();
      const pageId = currentPage();
      const moving = ids.map((id) => state.doc.nodesById[id]).filter(Boolean) as IrisNode[];
      if (moving.length === 0) return;
      for (const n of moving) {
        if (parentId && (n.id === parentId || isDescendantOf(state.doc, parentId, n.id))) {
          get().toast('Cannot drop an object into its own children');
          return;
        }
      }
      // world matrices before the move
      const worlds = new Map<ID, Mat>();
      moving.forEach((n) => worlds.set(n.id, nodeWorldMatrix(state.doc, n)));
      commit(
        (draft) => {
          for (const n of moving) removeChildRef(draft, pageId, n.parentId, n.id);
          let at = index;
          for (const n of moving) {
            insertChildRef(draft, pageId, parentId, n.id, at);
            at = at + 1;
          }
          for (const n of moving) {
            const world = worlds.get(n.id)!;
            const fresh = draft.nodesById[n.id];
            if (!fresh) continue;
            const updated = { ...fresh, parentId };
            const P = parentId === null ? { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 } : nodeWorldMatrix(draft, draft.nodesById[parentId]);
            applyLocalMatrix(updated, mMul(mInvert(P), world));
            draft.nodesById[n.id] = updated;
          }
        },
        { history: 'reorder', selection: ids },
      );
    },

    zorder: (mode) => {
      const state = get();
      const pageId = currentPage();
      const sel = state.selection;
      if (sel.length === 0) return;
      commit(
        (draft) => {
          const listRef = (parentId: ID | null): ID[] =>
            parentId === null ? [...(draft.pagesById[pageId]?.nodeIds ?? [])] : [...(draft.nodesById[parentId]?.children ?? [])];
          const setList = (parentId: ID | null, list: ID[]) => {
            if (parentId === null) putPage(draft, pageId, { nodeIds: list });
            else putNode(draft, parentId, { children: list });
          };
          for (const id of sel) {
            const n = draft.nodesById[id];
            if (!n) continue;
            const list = listRef(n.parentId);
            const i = list.indexOf(id);
            if (i < 0) continue;
            list.splice(i, 1);
            if (mode === 'front') list.push(id);
            else if (mode === 'back') list.unshift(id);
            else if (mode === 'forward') list.splice(Math.min(list.length, i + 1), 0, id);
            else list.splice(Math.max(0, i - 1), 0, id);
            setList(n.parentId, list);
          }
        },
        { history: 'zorder' },
      );
    },

    alignSelection: (mode) => {
      const state = get();
      const nodes = state.selection.map((id) => state.doc.nodesById[id]).filter(Boolean) as IrisNode[];
      if (nodes.length === 0) return;
      const doc = state.doc;
      const rects = new Map<ID, Rect>(nodes.map((n) => [n.id, nodeWorldAABB(doc, n)]));
      let ref: Rect;
      if (nodes.length > 1) {
        ref = unionRects([...rects.values()]);
      } else {
        // single object: align within its parent frame (no-op at page top level, like Figma)
        const n = nodes[0];
        let p = n.parentId ? doc.nodesById[n.parentId] : undefined;
        while (p && p.type !== 'frame' && p.parentId) p = doc.nodesById[p.parentId];
        if (!p || p.type !== 'frame') return;
        ref = nodeWorldAABB(doc, p);
      }
      const moves: { id: ID; dx: number; dy: number }[] = [];
      if (mode === 'hdist' || mode === 'vdist') {
        if (nodes.length < 2) return;
        const horiz = mode === 'hdist';
        const sorted = nodes.slice().sort((a, b) => {
          const ra = rects.get(a.id)!;
          const rb = rects.get(b.id)!;
          return horiz ? ra.x - rb.x : ra.y - rb.y;
        });
        const first = rects.get(sorted[0].id)!;
        const last = rects.get(sorted[sorted.length - 1].id)!;
        const span = horiz ? last.x + last.w - first.x : last.y + last.h - first.y;
        const total = sorted.reduce((acc, n) => acc + (horiz ? rects.get(n.id)!.w : rects.get(n.id)!.h), 0);
        const gap = (span - total) / (sorted.length - 1);
        let cursor = horiz ? first.x : first.y;
        for (const n of sorted) {
          const r = rects.get(n.id)!;
          const target = cursor;
          const cur = horiz ? r.x : r.y;
          moves.push({ id: n.id, dx: horiz ? target - cur : 0, dy: horiz ? 0 : target - cur });
          cursor += (horiz ? r.w : r.h) + gap;
        }
      } else {
        for (const n of nodes) {
          const r = rects.get(n.id)!;
          let dx = 0;
          let dy = 0;
          if (mode === 'left') dx = ref.x - r.x;
          if (mode === 'hcenter') dx = ref.x + ref.w / 2 - (r.x + r.w / 2);
          if (mode === 'right') dx = ref.x + ref.w - (r.x + r.w);
          if (mode === 'top') dy = ref.y - r.y;
          if (mode === 'vcenter') dy = ref.y + ref.h / 2 - (r.y + r.h / 2);
          if (mode === 'bottom') dy = ref.y + ref.h - (r.y + r.h);
          moves.push({ id: n.id, dx, dy });
        }
      }
      commit(
        (draft) => {
          for (const mv of moves) {
            const n = draft.nodesById[mv.id];
            if (!n || (mv.dx === 0 && mv.dy === 0)) continue;
            const P = parentWorldMatrix(draft, n);
            const local = mApplyVec(mInvert(P), mv.dx, mv.dy);
            putNode(draft, mv.id, { x: n.x + local.x, y: n.y + local.y });
          }
        },
        { history: 'align' },
      );
    },

    resizeSelectionBox: (w, h) => {
      const state = get();
      const box = boundsOfNodes(state.doc, state.selection);
      if (!box || box.w < 0.01 || box.h < 0.01 || w <= 0 || h <= 0) return;
      const sx = w / box.w;
      const sy = h / box.h;
      const doc = state.doc;
      const targets = state.selection.map((id) => doc.nodesById[id]).filter(Boolean) as IrisNode[];
      commit(
        (draft) => {
          for (const n of targets) {
            const a = nodeWorldAABB(doc, n);
            const nx = box.x + (a.x - box.x) * sx;
            const ny = box.y + (a.y - box.y) * sy;
            const P = parentWorldMatrix(draft, draft.nodesById[n.id]);
            const local = mApply(mInvert(P), nx, ny);
            const fresh: Partial<IrisNode> = { x: local.x, y: local.y, w: Math.max(1, n.w * sx), h: Math.max(n.type === 'line' || n.type === 'arrow' ? 0 : 1, n.h * sy) };
            if (n.type === 'text') {
              fresh.fontSize = Math.max(1, n.fontSize * ((sx + sy) / 2));
            }
            if (n.cornerRadius) fresh.cornerRadius = Math.max(0, n.cornerRadius * ((sx + sy) / 2));
            putNode(draft, n.id, fresh);
            if (isContainer(n)) scaleSubtree(draft, n.id, sx, sy, true);
          }
        },
        { history: 'resize' },
      );
    },

    moveSelectionWorld: (dx, dy, label) => {
      if (dx === 0 && dy === 0) return;
      const state = get();
      const doc = state.doc;
      const targets = state.selection.map((id) => doc.nodesById[id]).filter(Boolean) as IrisNode[];
      commit(
        (draft) => {
          for (const n of targets) {
            const P = parentWorldMatrix(draft, draft.nodesById[n.id]);
            const local = mApplyVec(mInvert(P), dx, dy);
            putNode(draft, n.id, { x: n.x + local.x, y: n.y + local.y });
          }
        },
        { history: label ?? 'move' },
      );
    },

    renameNode: (id, name) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      commit((draft) => putNode(draft, id, { name: trimmed }), { history: 'rename' });
    },

    /* -------------------------- transforms ------------------------- */
    flipSelection: (axis) => {
      const state = get();
      if (state.selection.length === 0) return;
      const key = axis === 'h' ? 'flipH' : 'flipV';
      commit(
        (draft) => {
          for (const id of state.selection) {
            const n = draft.nodesById[id];
            if (!n) continue;
            putNode(draft, id, { [key]: !n[key] } as Partial<IrisNode>);
          }
        },
        { history: 'flip' },
      );
      get().toast(axis === 'h' ? 'Flipped horizontally' : 'Flipped vertically');
    },

    rotateSelectionBy: (deg) => {
      const state = get();
      const ids = state.selection;
      if (ids.length === 0) return;
      const box = boundsOfNodes(state.doc, ids);
      if (!box) return;
      const center = { x: box.x + box.w / 2, y: box.y + box.h / 2 };
      const R = mMul(mMul(mTranslate(center.x, center.y), mRotate(deg)), mTranslate(-center.x, -center.y));
      const worlds = new Map<ID, Mat>();
      ids.forEach((id) => {
        const n = state.doc.nodesById[id];
        if (n) worlds.set(id, nodeWorldMatrix(state.doc, n));
      });
      commit(
        (draft) => {
          for (const id of ids) {
            const W = worlds.get(id);
            const n = draft.nodesById[id];
            if (!W || !n) continue;
            const updated = { ...n };
            applyLocalMatrix(updated, mMul(R, W));
            draft.nodesById[id] = updated;
          }
        },
        { history: 'rotate90' },
      );
    },

    toggleLockSelection: () => {
      const state = get();
      if (state.selection.length === 0) return;
      const lock = state.selection.some((id) => !state.doc.nodesById[id]?.locked);
      commit(
        (draft) => {
          for (const id of state.selection) putNode(draft, id, { locked: lock });
        },
        { history: 'lock' },
      );
      get().toast(lock ? 'Locked selection' : 'Unlocked selection');
    },

    unlockAllOnPage: () => {
      const state = get();
      const page = state.doc.pagesById[state.currentPageId];
      if (!page) return;
      const locked: ID[] = [];
      const visit = (nid: ID): void => {
        const n = state.doc.nodesById[nid];
        if (!n) return;
        if (n.locked) locked.push(nid);
        n.children.forEach(visit);
      };
      page.nodeIds.forEach(visit);
      if (locked.length === 0) {
        get().toast('Nothing is locked on this page');
        return;
      }
      commit(
        (draft) => {
          for (const id of locked) putNode(draft, id, { locked: false });
        },
        { history: 'unlockAll' },
      );
      get().toast(`Unlocked ${locked.length} object${locked.length === 1 ? '' : 's'}`);
    },

    toggleHideSelection: () => {
      const state = get();
      if (state.selection.length === 0) return;
      const hide = state.selection.some((id) => state.doc.nodesById[id]?.visible);
      commit(
        (draft) => {
          for (const id of state.selection) putNode(draft, id, { visible: hide });
        },
        { history: 'visible', selection: hide ? [] : state.selection },
      );
      get().toast(hide ? 'Hidden selection' : 'Shown selection');
    },

    /* ---------------------------- style ---------------------------- */
    copyStyle: () => {
      const state = get();
      if (state.selection.length === 0) return;
      const n = state.doc.nodesById[state.selection[0]];
      if (!n) return;
      const style: Partial<IrisNode> = {};
      for (const key of STYLE_FIELDS) {
        const v = n[key];
        if (v === null || v === undefined) continue;
        if (typeof v === 'object') (style as Record<string, unknown>)[key] = { ...(v as object) };
        else (style as Record<string, unknown>)[key] = v;
      }
      set({ styleClipboard: style });
      get().toast(`Copied style of ${n.name}`);
    },

    pasteStyle: () => {
      const state = get();
      const style = state.styleClipboard;
      if (!style) {
        get().toast('No style copied yet');
        return;
      }
      if (state.selection.length === 0) return;
      commit(
        (draft) => {
          for (const id of state.selection) {
            const n = draft.nodesById[id];
            if (!n) continue;
            const patch: Partial<IrisNode> = {};
            for (const [k, v] of Object.entries(style)) {
              if (k === 'fontFamily' && n.type !== 'text') continue;
              if (['fontSize', 'fontWeight', 'textAlign', 'lineHeight', 'letterSpacing', 'textCase', 'underline', 'strike'].includes(k) && n.type !== 'text') continue;
              (patch as Record<string, unknown>)[k] = typeof v === 'object' && v !== null ? { ...(v as object) } : v;
            }
            putNode(draft, id, patch);
          }
        },
        { history: 'pasteStyle' },
      );
      get().toast(`Pasted style onto ${state.selection.length} object${state.selection.length === 1 ? '' : 's'}`);
    },

    /* ------------------------- doc settings ------------------------ */
    setSettings: (patch) => {
      commit(
        (draft) => {
          draft.settings = {
            ...draft.settings,
            ...patch,
            grid: { ...draft.settings.grid, ...(patch.grid ?? {}) },
            guidesX: patch.guidesX ?? [...draft.settings.guidesX],
            guidesY: patch.guidesY ?? [...draft.settings.guidesY],
          };
        },
        { history: 'settings' },
      );
    },
    setGridSettings: (patch) => {
      commit(
        (draft) => {
          draft.settings = { ...draft.settings, grid: { ...draft.settings.grid, ...patch } };
        },
        { history: 'settings' },
      );
    },
    addGuide: (axis, at) => {
      commit(
        (draft) => {
          if (axis === 'x') draft.settings.guidesX = [...draft.settings.guidesX, Math.round(at)];
          else draft.settings.guidesY = [...draft.settings.guidesY, Math.round(at)];
        },
        { history: 'guide' },
      );
    },
    moveGuide: (axis, index, at) => {
      commit(
        (draft) => {
          if (axis === 'x') {
            const list = [...draft.settings.guidesX];
            if (index < 0 || index >= list.length) return;
            list[index] = Math.round(at);
            draft.settings.guidesX = list;
          } else {
            const list = [...draft.settings.guidesY];
            if (index < 0 || index >= list.length) return;
            list[index] = Math.round(at);
            draft.settings.guidesY = list;
          }
        },
        { history: false },
      );
    },
    removeGuide: (axis, index) => {
      commit(
        (draft) => {
          if (axis === 'x') draft.settings.guidesX = draft.settings.guidesX.filter((_, i) => i !== index);
          else draft.settings.guidesY = draft.settings.guidesY.filter((_, i) => i !== index);
        },
        { history: 'guide' },
      );
    },
    clearGuides: () => {
      const s = get();
      if (!s.doc.settings.guidesX.length && !s.doc.settings.guidesY.length) return;
      commit(
        (draft) => {
          draft.settings.guidesX = [];
          draft.settings.guidesY = [];
        },
        { history: 'guide' },
      );
      get().toast('Cleared all guides');
    },

    /* --------------------------- editing --------------------------- */
    setEditingText: (id) => {
      if (id) get().setSelection([id]);
      set({ editingTextId: id, editingPathId: null });
    },
    setEditingPath: (id) => {
      if (id) get().setSelection([id]);
      set({ editingPathId: id, editingTextId: null });
    },

    /* --------------------------- images ---------------------------- */
    importImage: (src, w, h, at, parentId) => {
      const state = get();
      const scale = Math.min(1, 800 / Math.max(w, h, 1));
      const nw = Math.max(1, Math.round(w * scale));
      const nh = Math.max(1, Math.round(h * scale));
      const center = at ?? viewportCenter();
      let x = center.x - nw / 2;
      let y = center.y - nh / 2;
      // when parenting into a frame, convert to parent-local coords
      if (parentId) {
        const parent = state.doc.nodesById[parentId];
        if (parent) {
          const inv = mInvert(nodeWorldMatrix(state.doc, parent));
          const local = mApply(inv, x, y);
          x = local.x;
          y = local.y;
        }
      }
      return get().addNode(
        'image',
        {
          src,
          w: nw,
          h: nh,
          x,
          y,
        },
        parentId ?? null,
      );
    },

    /* ---------------------------- files ---------------------------- */
    flushSave: () => {
      if (autosaveTimer) {
        clearTimeout(autosaveTimer);
        autosaveTimer = null;
      }
      saveAutosave(get());
    },

    newDoc: () => {
      get().flushSave();
      const { id, doc } = createLibraryDoc();
      set({
        doc,
        docId: id,
        route: { kind: 'doc', id },
        currentPageId: doc.pages[0],
        selection: [],
        past: [],
        future: [],
        clipboard: null,
        editingTextId: null,
        editingPathId: null,
        savedName: null,
        dirty: false,
        viewport: DEFAULT_VIEWPORT,
      });
      pushRoute({ kind: 'doc', id });
      get().toast('New document created');
    },

    newDocFromTemplate: (templateId) => {
      get().flushSave();
      const doc = buildTemplate(templateId);
      const entry = importDocIntoLibrary(doc);
      set({
        doc,
        docId: entry.id,
        route: { kind: 'doc', id: entry.id },
        currentPageId: doc.pages[0],
        selection: [],
        past: [],
        future: [],
        clipboard: null,
        editingTextId: null,
        editingPathId: null,
        savedName: null,
        dirty: false,
        viewport: { x: 60, y: 60, zoom: 0.75 },
      });
      pushRoute({ kind: 'doc', id: entry.id });
      get().toast(`Created “${doc.name}”`);
    },

    /**
     * Open an external document (.iris file / recent) — registers it as a new
     * library entry so it shows up on the homepage and can be reopened later.
     */
    loadDoc: (rawDoc, savedName, fitView) => {
      get().flushSave();
      const doc = normalizeDoc(rawDoc);
      if (savedName) doc.name = savedName;
      const entry = importDocIntoLibrary(doc);
      set({
        doc,
        docId: entry.id,
        route: { kind: 'doc', id: entry.id },
        currentPageId: doc.pages[0],
        selection: [],
        past: [],
        future: [],
        clipboard: null,
        editingTextId: null,
        editingPathId: null,
        savedName: savedName ?? null,
        dirty: false,
        viewport: DEFAULT_VIEWPORT,
      });
      pushRoute({ kind: 'doc', id: entry.id });
      if (fitView) get().zoomToFit();
    },

    /** Open a document from the library (homepage card click). */
    openDoc: (id, opts) => {
      const s = get();
      if (s.route.kind === 'doc' && s.route.id === id) return;
      s.flushSave();
      const stored = getStoredDoc(id);
      if (!stored) {
        get().toast('That file could not be opened');
        return;
      }
      const doc = stored.doc;
      const pageId =
        stored.currentPageId && doc.pages.includes(stored.currentPageId) ? stored.currentPageId : doc.pages[0];
      set({
        doc,
        docId: id,
        route: { kind: 'doc', id },
        currentPageId: pageId,
        selection: [],
        past: [],
        future: [],
        clipboard: null,
        editingTextId: null,
        editingPathId: null,
        savedName: null,
        dirty: false,
        viewport: stored.viewport ?? DEFAULT_VIEWPORT,
      });
      if (opts?.push !== false) pushRoute({ kind: 'doc', id });
    },

    /** Leave the editor and return to the file browser (homepage). */
    goHome: (opts) => {
      get().flushSave();
      set({
        route: { kind: 'home' },
        docId: null,
        selection: [],
        editingTextId: null,
        editingPathId: null,
        contextMenu: null,
      });
      if (opts?.push !== false) pushRoute({ kind: 'home' });
    },

    /** Browser Back/Forward: adopt the URL route without pushing history. */
    syncRoute: () => {
      const r = routeFromLocation();
      const s = get();
      if (r.kind === 'doc') {
        if (s.route.kind === 'doc' && s.route.id === r.id) return;
        if (!getStoredDoc(r.id)) {
          replaceRoute({ kind: 'home' });
          if (s.route.kind !== 'home') get().goHome({ push: false });
          get().toast('That file is no longer available');
          return;
        }
        get().openDoc(r.id, { push: false });
        return;
      }
      if (s.route.kind === 'home') return;
      get().goHome({ push: false });
    },

    markSaved: (name) => set({ savedName: name, dirty: false }),

    /* ------------------------------ ui ----------------------------- */
    toast: (msg, action) => {
      const id = toastSeq++;
      set((s) => ({ toasts: [...s.toasts.slice(-3), { id, msg, action }] }));
      setTimeout(() => get().dismissToast(id), action ? 5000 : 2400);
    },
    dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    openContextMenu: (x, y, worldX, worldY) => set({ contextMenu: { x, y, worldX, worldY } }),
    closeContextMenu: () => set({ contextMenu: null }),
    setExportOpen: (open) => set({ exportOpen: open }),
    setShortcutsOpen: (open) => set({ shortcutsOpen: open }),
  };
});

/* ------------------------------------------------------------------ */
/* Convenience hooks                                                   */
/* ------------------------------------------------------------------ */

export function useSelectedNodes(): IrisNode[] {
  return useIris(
    useShallow((s) => s.selection.map((id) => s.doc.nodesById[id]).filter(Boolean) as IrisNode[]),
  );
}

export function useCanvasPage() {
  return useIris((s) => s.doc.pagesById[s.currentPageId] ?? null);
}
