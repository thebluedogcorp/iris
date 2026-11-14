/**
 * Iris document model.
 * Document -> Pages -> Nodes (flat node map + parent/children links).
 * All geometry is stored in a node's LOCAL space relative to its parent:
 *   - x, y  : top-left of the un-rotated box, in parent coordinates
 *   - w, h  : size of the un-rotated box
 *   - rotation : degrees, rotating about the box CENTER
 */

export type ID = string;

export type NodeType =
  | 'frame'
  | 'group'
  | 'rect'
  | 'ellipse'
  | 'line'
  | 'path'
  | 'text'
  | 'image'
  | 'polygon'
  | 'star'
  | 'arrow';

export type TextAlign = 'left' | 'center' | 'right';
export type TextCase = 'as-typed' | 'upper' | 'lower' | 'title';
export type DashStyle = 'solid' | 'dashed' | 'dotted';
export type ArrowHead = 'none' | 'arrow' | 'triangle' | 'line';

/** A pen-tool point. (x, y) is the anchor; (hx, hy) is the "out" handle offset
 *  from the anchor. The "in" handle is mirrored: (-hx, -hy). (0,0) = corner point. */
export interface PathPoint {
  x: number;
  y: number;
  hx: number;
  hy: number;
}

/** Two-stop gradient fill. */
export interface GradientFill {
  type: 'linear' | 'radial';
  /** degrees, linear only */
  angle: number;
  from: string;
  to: string;
}

export interface ShadowEffect {
  x: number;
  y: number;
  blur: number;
  color: string;
}

export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

export interface IrisNode {
  id: ID;
  type: NodeType;
  name: string;
  pageId: ID;
  parentId: ID | null;
  /** top-left in parent space (un-rotated) */
  x: number;
  y: number;
  w: number;
  h: number;
  /** degrees, about the box center */
  rotation: number;
  /** 0..1 */
  opacity: number;
  visible: boolean;
  locked: boolean;
  /** solid CSS color or null */
  fill: string | null;
  stroke: string | null;
  strokeWidth: number;
  /** rect / frame corner radius */
  cornerRadius: number;
  /* text */
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textAlign: TextAlign;
  /** multiplier of fontSize */
  lineHeight: number;
  /** grow width to fit text (single-line-ish behavior) */
  autoWidth: boolean;
  /** px between characters */
  letterSpacing: number;
  textCase: TextCase;
  underline: boolean;
  strike: boolean;
  /* path */
  points: PathPoint[];
  closed: boolean;
  /* image */
  src: string | null;
  /* container */
  children: ID[];
  /** frame clips its children */
  clip: boolean;
  /** line only: when true the segment runs (w,0) -> (0,h) instead of (0,0) -> (w,h) */
  flip: boolean;
  /* polygon */
  sides: number;
  /* star */
  starPoints: number;
  /** 0..1 ratio of inner to outer radius */
  innerRadius: number;
  /* arrow */
  arrowStart: ArrowHead;
  arrowEnd: ArrowHead;
  /* appearance extras */
  fillGradient: GradientFill | null;
  shadow: ShadowEffect | null;
  /** layer blur radius in px */
  blur: number;
  blend: BlendMode;
  dash: DashStyle;
  /** mirror horizontally about the box center */
  flipH: boolean;
  /** mirror vertically about the box center */
  flipV: boolean;
}

export interface IrisPage {
  id: ID;
  name: string;
  /** z-ordered root node ids (last = top) */
  nodeIds: ID[];
}

export interface DocSettings {
  /** layout grid */
  grid: { size: number; show: boolean; snap: boolean };
  /** canvas backdrop color */
  bg: string;
  /** ruler guides at world coordinates */
  guidesX: number[];
  guidesY: number[];
}

export interface IrisDoc {
  name: string;
  /** page order */
  pages: ID[];
  pagesById: Record<ID, IrisPage>;
  nodesById: Record<ID, IrisNode>;
  settings: DocSettings;
}

export const NODE_TYPE_LABEL: Record<NodeType, string> = {
  frame: 'Frame',
  group: 'Group',
  rect: 'Rectangle',
  ellipse: 'Ellipse',
  line: 'Line',
  path: 'Vector',
  text: 'Text',
  image: 'Image',
  polygon: 'Polygon',
  star: 'Star',
  arrow: 'Arrow',
};

export const BLEND_MODES: BlendMode[] = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
];

export const DEFAULT_SETTINGS: DocSettings = {
  grid: { size: 8, show: false, snap: false },
  bg: '#242424',
  guidesX: [],
  guidesY: [],
};

let idCounter = 0;

export function uid(): ID {
  idCounter += 1;
  const rand =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 10)
      : Math.random().toString(36).slice(2, 12);
  return `${rand}${idCounter.toString(36)}`;
}

function defaultsFor(type: NodeType): Partial<IrisNode> {
  switch (type) {
    case 'frame':
      return { w: 100, h: 100, fill: '#FFFFFF', clip: true, name: 'Frame' };
    case 'group':
      return { w: 100, h: 100, fill: null, name: 'Group' };
    case 'rect':
      return { w: 100, h: 100, fill: '#D9D9D9', name: 'Rectangle' };
    case 'ellipse':
      return { w: 100, h: 100, fill: '#D9D9D9', name: 'Ellipse' };
    case 'line':
      return { w: 100, h: 0, fill: null, stroke: '#B3B3B3', strokeWidth: 1, name: 'Line' };
    case 'path':
      return { w: 100, h: 100, fill: null, stroke: '#B3B3B3', strokeWidth: 1, name: 'Vector' };
    case 'text':
      return {
        w: 60,
        h: 18,
        fill: '#000000',
        fontSize: 14,
        lineHeight: 1.25,
        autoWidth: true,
        name: 'Text',
      };
    case 'image':
      return { w: 100, h: 100, fill: null, name: 'Image' };
    case 'polygon':
      return { w: 100, h: 100, fill: '#D9D9D9', sides: 6, name: 'Polygon' };
    case 'star':
      return { w: 100, h: 100, fill: '#D9D9D9', starPoints: 5, innerRadius: 0.45, name: 'Star' };
    case 'arrow':
      return {
        w: 100,
        h: 0,
        fill: null,
        stroke: '#B3B3B3',
        strokeWidth: 1,
        arrowEnd: 'arrow',
        name: 'Arrow',
      };
  }
}

export function createNode(
  type: NodeType,
  pageId: ID,
  patch: Partial<IrisNode> = {},
): IrisNode {
  return {
    id: patch.id ?? uid(),
    type,
    name: NODE_TYPE_LABEL[type],
    pageId,
    parentId: null,
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    rotation: 0,
    opacity: 1,
    visible: true,
    locked: false,
    fill: null,
    stroke: null,
    strokeWidth: 1,
    cornerRadius: 0,
    text: '',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'left',
    lineHeight: 1.25,
    autoWidth: false,
    letterSpacing: 0,
    textCase: 'as-typed',
    underline: false,
    strike: false,
    points: [],
    closed: false,
    src: null,
    children: [],
    clip: false,
    flip: false,
    sides: 6,
    starPoints: 5,
    innerRadius: 0.45,
    arrowStart: 'none',
    arrowEnd: 'arrow',
    fillGradient: null,
    shadow: null,
    blur: 0,
    blend: 'normal',
    dash: 'solid',
    flipH: false,
    flipV: false,
    ...defaultsFor(type),
    ...patch,
  };
}

export function createPage(name: string): IrisPage {
  return { id: uid(), name, nodeIds: [] };
}

export function createDefaultDoc(): IrisDoc {
  const page = createPage('Page 1');
  return {
    name: 'Untitled',
    pages: [page.id],
    pagesById: { [page.id]: page },
    nodesById: {},
    settings: { ...DEFAULT_SETTINGS, grid: { ...DEFAULT_SETTINGS.grid }, guidesX: [], guidesY: [] },
  };
}

/* ------------------------------------------------------------------ */
/* Read helpers                                                        */
/* ------------------------------------------------------------------ */

export function getNode(doc: IrisDoc, id: ID | null | undefined): IrisNode | undefined {
  return id ? doc.nodesById[id] : undefined;
}

export function getPage(doc: IrisDoc, id: ID | null | undefined): IrisPage | undefined {
  return id ? doc.pagesById[id] : undefined;
}

export function isContainer(node: IrisNode): boolean {
  return node.type === 'frame' || node.type === 'group';
}

/** Children of a node (or page roots when parentId is null). */
export function childrenOf(doc: IrisDoc, parentId: ID | null, pageId: ID): IrisNode[] {
  if (parentId === null) {
    const page = getPage(doc, pageId);
    if (!page) return [];
    return page.nodeIds.map((id) => doc.nodesById[id]).filter(Boolean);
  }
  const parent = doc.nodesById[parentId];
  if (!parent) return [];
  return parent.children.map((id) => doc.nodesById[id]).filter(Boolean);
}

/** Depth-first list of a node and all its descendants (self first). */
export function collectSubtree(doc: IrisDoc, id: ID): IrisNode[] {
  const out: IrisNode[] = [];
  const visit = (nid: ID) => {
    const n = doc.nodesById[nid];
    if (!n) return;
    out.push(n);
    n.children.forEach(visit);
  };
  visit(id);
  return out;
}

export function isDescendantOf(doc: IrisDoc, id: ID, maybeAncestor: ID): boolean {
  let cur = doc.nodesById[id];
  while (cur && cur.parentId) {
    if (cur.parentId === maybeAncestor) return true;
    cur = doc.nodesById[cur.parentId];
  }
  return false;
}

/** Top-most ancestor (direct child of the page). */
export function rootAncestorOf(doc: IrisDoc, id: ID): IrisNode {
  let cur = doc.nodesById[id];
  while (cur && cur.parentId) {
    const p = doc.nodesById[cur.parentId];
    if (!p) break;
    cur = p;
  }
  return cur;
}

export function countOfType(doc: IrisDoc, type: NodeType): number {
  return Object.values(doc.nodesById).filter((n) => n.type === type).length;
}

/** Next auto name for a type, e.g. "Frame 3". */
export function nextName(doc: IrisDoc, type: NodeType): string {
  const label = NODE_TYPE_LABEL[type];
  const n = countOfType(doc, type) + 1;
  return n === 1 ? label : `${label} ${n}`;
}

/* ------------------------------------------------------------------ */
/* Clone helpers (paste / duplicate)                                   */
/* ------------------------------------------------------------------ */

export interface ClonedSubtree {
  nodes: IrisNode[];
  rootId: ID;
}

/** Deep-clone a subtree with fresh ids, optionally re-parenting the root. */
export function cloneSubtree(
  nodes: IrisNode[],
  rootId: ID,
  pageId: ID,
  parentId: ID | null,
): ClonedSubtree {
  const idMap = new Map<ID, ID>();
  for (const n of nodes) idMap.set(n.id, uid());
  const cloned = nodes.map((n) => ({
    ...n,
    id: idMap.get(n.id)!,
    pageId,
    parentId: n.id === rootId ? parentId : (idMap.get(n.parentId ?? '') ?? null),
    children: n.children.map((c) => idMap.get(c)!).filter(Boolean),
    points: n.points.map((p) => ({ ...p })),
    fillGradient: n.fillGradient ? { ...n.fillGradient } : null,
    shadow: n.shadow ? { ...n.shadow } : null,
  }));
  return { nodes: cloned, rootId: idMap.get(rootId)! };
}

/* ------------------------------------------------------------------ */
/* Load-time normalization (autosave / .iris files from older builds)  */
/* ------------------------------------------------------------------ */

const VALID_TYPES: NodeType[] = [
  'frame',
  'group',
  'rect',
  'ellipse',
  'line',
  'path',
  'text',
  'image',
  'polygon',
  'star',
  'arrow',
];

function normalizeSettings(raw: unknown): DocSettings {
  const s: DocSettings = { ...DEFAULT_SETTINGS, grid: { ...DEFAULT_SETTINGS.grid }, guidesX: [], guidesY: [] };
  if (!raw || typeof raw !== 'object') return s;
  const src = raw as Partial<DocSettings>;
  if (src.grid && typeof src.grid === 'object') {
    const g = src.grid;
    s.grid = {
      size: typeof g.size === 'number' && g.size >= 1 ? g.size : 8,
      show: !!g.show,
      snap: !!g.snap,
    };
  }
  if (typeof src.bg === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(src.bg)) s.bg = src.bg;
  if (Array.isArray(src.guidesX)) s.guidesX = src.guidesX.filter((v): v is number => typeof v === 'number');
  if (Array.isArray(src.guidesY)) s.guidesY = src.guidesY.filter((v): v is number => typeof v === 'number');
  return s;
}

export function normalizeDoc(raw: unknown): IrisDoc {
  const base = createDefaultDoc();
  if (!raw || typeof raw !== 'object') return base;
  const src = raw as Partial<IrisDoc>;
  const doc: IrisDoc = {
    name: typeof src.name === 'string' ? src.name : 'Untitled',
    pages: Array.isArray(src.pages) && src.pages.length ? src.pages.slice() : base.pages,
    pagesById: {},
    nodesById: {},
    settings: normalizeSettings(src.settings),
  };
  for (const p of Object.values(src.pagesById ?? {})) {
    if (p && typeof p === 'object' && typeof p.id === 'string') {
      doc.pagesById[p.id] = {
        id: p.id,
        name: typeof p.name === 'string' ? p.name : 'Page',
        nodeIds: Array.isArray(p.nodeIds) ? p.nodeIds.filter((id) => typeof id === 'string') : [],
      };
    }
  }
  for (const id of doc.pages) {
    if (!doc.pagesById[id]) {
      const page = createPage('Page');
      page.id = id;
      doc.pagesById[id] = page;
    }
  }
  for (const n of Object.values(src.nodesById ?? {})) {
    if (!n || typeof n !== 'object' || typeof n.id !== 'string') continue;
    const node = createNode(
      VALID_TYPES.includes(n.type as NodeType) ? (n.type as NodeType) : 'rect',
      typeof n.pageId === 'string' ? n.pageId : doc.pages[0],
      n as Partial<IrisNode>,
    );
    doc.nodesById[node.id] = node;
  }
  return doc;
}
