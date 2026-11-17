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
  | 'arrow'
  | 'section'
  | 'slice';

export type TextAlign = 'left' | 'center' | 'right';
export type TextCase = 'as-typed' | 'upper' | 'lower' | 'title';
export type DashStyle = 'solid' | 'dashed' | 'dotted';
export type ArrowHead = 'none' | 'arrow' | 'triangle' | 'line';

/** Auto Layout configuration on a frame (Figma Shift+A). */
export interface AutoLayout {
  /** flow direction of children along the main axis */
  mode: 'vertical' | 'horizontal';
  /** space between children along the main axis */
  gap: number;
  /** space between wrapped lines (wrap only) */
  wrapGap: number;
  /** inner spacing of the frame */
  padding: { top: number; right: number; bottom: number; left: number };
  /** main-axis distribution */
  justify: 'start' | 'center' | 'end' | 'space-between';
  /** counter-axis alignment */
  align: 'start' | 'center' | 'end';
  /** wrap children onto new lines (horizontal mode) */
  wrap: boolean;
}

/** Per-axis sizing behavior (frames with layout, children of a layout parent). */
export type AxisSizing = 'fixed' | 'hug' | 'fill';

/* ------------------------------------------------------------------ */
/* Prototyping (field guide §5)                                        */
/* ------------------------------------------------------------------ */

/** What fires an interaction. */
export type ProtoTrigger = 'click' | 'hover' | 'press' | 'keydown' | 'delay';

/** What the interaction does when it fires. */
export type ProtoAction =
  | 'navigate' /** go to the destination frame */
  | 'back' /** return to the previous screen */
  | 'url' /** open an external link */
  | 'overlay' /** show the destination frame on top of the current screen */
  | 'close-overlay' /** dismiss the open overlay */
  | 'scroll-to'; /** scroll a frame to reveal the destination node */

/** Screen-to-screen transition (playback). */
export type ProtoAnimation =
  | 'instant'
  | 'dissolve'
  | 'smart-animate'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'move-in-left'
  | 'move-in-right'
  | 'move-in-top'
  | 'move-in-bottom'
  | 'move-out-left'
  | 'move-out-right'
  | 'move-out-top'
  | 'move-out-bottom'
  | 'push-left'
  | 'push-right'
  | 'push-up'
  | 'push-down';

export type ProtoEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';

/** Where an overlay frame lands over the base screen. */
export type OverlayPosition =
  | 'center'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'manual';

/** One prototype interaction (hotspot → trigger → action). */
export interface IrisInteraction {
  id: ID;
  trigger: ProtoTrigger;
  /** key name for the keydown trigger (e.g. "a", "Enter") */
  key: string | null;
  /** milliseconds for the delay trigger */
  delayMs: number;
  action: ProtoAction;
  /** destination frame (navigate / overlay) or target node (scroll-to) */
  destinationId: ID | null;
  /** external link for the url action */
  url: string | null;
  overlayPos: OverlayPosition;
  /** manual overlay offsets from the centered position */
  overlayX: number;
  overlayY: number;
  /** clicking outside the overlay closes it */
  overlayCloseOutside: boolean;
  /** backdrop color behind the overlay (null = default) */
  overlayBg: string | null;
  animation: ProtoAnimation;
  durationMs: number;
  easing: ProtoEasing;
}

/** A named user journey with an entry screen. */
export interface IrisFlow {
  id: ID;
  name: string;
  pageId: ID;
  /** entry frame (top-level) */
  startNodeId: ID;
}

/** Frame scroll behavior in prototypes (design-time clipping uses `clip`). */
export type FrameOverflow = 'visible' | 'hidden' | 'scroll';

export const PROTO_TRIGGERS: ProtoTrigger[] = ['click', 'hover', 'press', 'keydown', 'delay'];
export const PROTO_ACTIONS: ProtoAction[] = [
  'navigate',
  'back',
  'url',
  'overlay',
  'close-overlay',
  'scroll-to',
];
export const PROTO_ANIMATIONS: ProtoAnimation[] = [
  'instant',
  'dissolve',
  'smart-animate',
  'slide-left',
  'slide-right',
  'slide-up',
  'slide-down',
  'move-in-left',
  'move-in-right',
  'move-in-top',
  'move-in-bottom',
  'move-out-left',
  'move-out-right',
  'move-out-top',
  'move-out-bottom',
  'push-left',
  'push-right',
  'push-up',
  'push-down',
];
export const PROTO_EASINGS: ProtoEasing[] = ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'spring'];
export const OVERLAY_POSITIONS: OverlayPosition[] = [
  'center',
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'manual',
];

/** Default interaction: On click → Navigate to (no destination yet). */
export function createInteraction(patch: Partial<IrisInteraction> = {}): IrisInteraction {
  return {
    id: patch.id ?? uid(),
    trigger: 'click',
    key: null,
    delayMs: 800,
    action: 'navigate',
    destinationId: null,
    url: null,
    overlayPos: 'center',
    overlayX: 0,
    overlayY: 0,
    overlayCloseOutside: true,
    overlayBg: 'rgba(0,0,0,0.30)',
    animation: 'instant',
    durationMs: 300,
    easing: 'ease-out',
    ...patch,
  };
}

/** Sanitize an unknown payload into valid interactions (load-time). */
function normalizeInteractions(raw: unknown): IrisInteraction[] {
  if (!Array.isArray(raw)) return [];
  const out: IrisInteraction[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Partial<IrisInteraction>;
    const num = (v: unknown, d: number, min: number, max: number): number =>
      typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : d;
    out.push(
      createInteraction({
        id: typeof r.id === 'string' ? r.id : uid(),
        trigger: PROTO_TRIGGERS.includes(r.trigger as ProtoTrigger) ? (r.trigger as ProtoTrigger) : 'click',
        key: typeof r.key === 'string' ? r.key.slice(0, 32) : null,
        delayMs: num(r.delayMs, 800, 0, 60000),
        action: PROTO_ACTIONS.includes(r.action as ProtoAction) ? (r.action as ProtoAction) : 'navigate',
        destinationId: typeof r.destinationId === 'string' ? r.destinationId : null,
        url: typeof r.url === 'string' ? r.url.slice(0, 512) : null,
        overlayPos: OVERLAY_POSITIONS.includes(r.overlayPos as OverlayPosition)
          ? (r.overlayPos as OverlayPosition)
          : 'center',
        overlayX: num(r.overlayX, 0, -100000, 100000),
        overlayY: num(r.overlayY, 0, -100000, 100000),
        overlayCloseOutside: r.overlayCloseOutside !== false,
        overlayBg: typeof r.overlayBg === 'string' ? r.overlayBg.slice(0, 64) : null,
        animation: PROTO_ANIMATIONS.includes(r.animation as ProtoAnimation)
          ? (r.animation as ProtoAnimation)
          : 'instant',
        durationMs: num(r.durationMs, 300, 0, 10000),
        easing: PROTO_EASINGS.includes(r.easing as ProtoEasing) ? (r.easing as ProtoEasing) : 'ease-out',
      }),
    );
  }
  return out;
}

/** Sanitize flows (load-time); requires resolved pages + nodes. */
function normalizeFlows(raw: unknown, doc: IrisDoc): IrisFlow[] {
  if (!Array.isArray(raw)) return [];
  const out: IrisFlow[] = [];
  let n = 0;
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Partial<IrisFlow>;
    if (typeof r.startNodeId !== 'string' || !doc.nodesById[r.startNodeId]) continue;
    const pageId = typeof r.pageId === 'string' && doc.pages.includes(r.pageId) ? r.pageId : doc.pages[0];
    n += 1;
    out.push({
      id: typeof r.id === 'string' ? r.id : uid(),
      name: typeof r.name === 'string' && r.name.trim() ? r.name.slice(0, 64) : `Flow ${n}`,
      pageId,
      startNodeId: r.startNodeId,
    });
  }
  return out;
}

export const DEFAULT_AUTO_LAYOUT: AutoLayout = {
  mode: 'vertical',
  gap: 10,
  wrapGap: 10,
  padding: { top: 10, right: 10, bottom: 10, left: 10 },
  justify: 'start',
  align: 'start',
  wrap: false,
};

/** Sanitize an unknown payload into a valid AutoLayout (load-time). */
export function normalizeAutoLayout(raw: unknown): AutoLayout | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Partial<AutoLayout>;
  const num = (v: unknown, d: number): number =>
    typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : d;
  const p = (r.padding ?? {}) as Partial<AutoLayout['padding']>;
  return {
    mode: r.mode === 'horizontal' ? 'horizontal' : 'vertical',
    gap: num(r.gap, 10),
    wrapGap: num(r.wrapGap, 10),
    padding: { top: num(p.top, 10), right: num(p.right, 10), bottom: num(p.bottom, 10), left: num(p.left, 10) },
    justify: (['start', 'center', 'end', 'space-between'] as const).includes(r.justify as never)
      ? (r.justify as AutoLayout['justify'])
      : 'start',
    align: (['start', 'center', 'end'] as const).includes(r.align as never) ? (r.align as AutoLayout['align']) : 'start',
    wrap: !!r.wrap,
  };
}

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
  /* auto layout (frames only; null = regular frame) */
  layout: AutoLayout | null;
  /** horizontal sizing mode (auto-layout frames and children of a layout parent) */
  sizingH: AxisSizing;
  /** vertical sizing mode */
  sizingV: AxisSizing;
  /* prototype */
  /** prototype interactions authored on this layer (hotspots) */
  interactions: IrisInteraction[];
  /** frame overflow behavior in prototypes (frames only) */
  overflow: FrameOverflow;
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
  /** canvas comment pins */
  comments: IrisComment[];
  /** prototype flows on this document */
  flows: IrisFlow[];
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
  section: 'Section',
  slice: 'Slice',
};

/** Canvas comment pin (Figma-style). Stored on the document, per page. */
export interface IrisComment {
  id: ID;
  pageId: ID;
  /** world-space anchor */
  x: number;
  y: number;
  text: string;
  author: string;
  ts: number;
  resolved: boolean;
}

/** Named frame size presets (shown when the Frame tool is active). */
export interface FramePreset {
  id: string;
  name: string;
  w: number;
  h: number;
  group: string;
}

export const FRAME_PRESETS: FramePreset[] = [
  { id: 'phone-small', name: 'Phone small', w: 320, h: 568, group: 'Phone' },
  { id: 'phone', name: 'Phone', w: 375, h: 812, group: 'Phone' },
  { id: 'phone-large', name: 'Phone large', w: 414, h: 896, group: 'Phone' },
  { id: 'tablet', name: 'Tablet', w: 768, h: 1024, group: 'Tablet' },
  { id: 'tablet-landscape', name: 'Tablet landscape', w: 1024, h: 768, group: 'Tablet' },
  { id: 'desktop', name: 'Desktop', w: 1440, h: 1024, group: 'Desktop' },
  { id: 'desktop-small', name: 'Desktop small', w: 1024, h: 768, group: 'Desktop' },
  { id: 'laptop', name: 'Laptop', w: 1280, h: 800, group: 'Desktop' },
  { id: 'monitor', name: 'Monitor', w: 1920, h: 1080, group: 'Desktop' },
  { id: 'a4', name: 'A4 paper', w: 595, h: 842, group: 'Paper' },
  { id: 'a3', name: 'A3 paper', w: 842, h: 1191, group: 'Paper' },
  { id: 'letter', name: 'US Letter', w: 612, h: 792, group: 'Paper' },
  { id: 'slide-169', name: 'Presentation 16:9', w: 1920, h: 1080, group: 'Slide' },
  { id: 'slide-43', name: 'Presentation 4:3', w: 1024, h: 768, group: 'Slide' },
  { id: 'social-post', name: 'Social post', w: 1080, h: 1080, group: 'Social' },
  { id: 'social-story', name: 'Social story', w: 1080, h: 1920, group: 'Social' },
  { id: 'social-cover', name: 'Social cover', w: 1500, h: 500, group: 'Social' },
  { id: 'watch', name: 'Watch', w: 324, h: 394, group: 'Wearables' },
];

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
      return { w: 100, h: 100, fill: '#FFFFFF', clip: true, overflow: 'hidden', name: 'Frame' };
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
    case 'section':
      return {
        w: 800,
        h: 600,
        fill: 'rgba(136,136,136,0.10)',
        stroke: '#6F6F6F',
        strokeWidth: 1,
        cornerRadius: 12,
        clip: false,
        name: 'Section',
      };
    case 'slice':
      return {
        w: 200,
        h: 150,
        fill: null,
        stroke: '#F24822',
        strokeWidth: 1,
        dash: 'dashed',
        name: 'Slice',
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
    layout: null,
    sizingH: 'fixed',
    sizingV: 'fixed',
    interactions: [],
    overflow: 'visible',
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
    comments: [],
    flows: [],
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
    interactions: n.interactions ? n.interactions.map((ix) => ({ ...ix })) : [],
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
  'section',
  'slice',
];

function normalizeComments(raw: unknown, pages: ID[]): IrisComment[] {
  if (!Array.isArray(raw)) return [];
  const out: IrisComment[] = [];
  for (const c of raw) {
    if (!c || typeof c !== 'object') continue;
    const r = c as Partial<IrisComment>;
    if (typeof r.id !== 'string' || typeof r.x !== 'number' || typeof r.y !== 'number') continue;
    out.push({
      id: r.id,
      pageId: typeof r.pageId === 'string' && pages.includes(r.pageId) ? r.pageId : pages[0],
      x: r.x,
      y: r.y,
      text: typeof r.text === 'string' ? r.text : '',
      author: typeof r.author === 'string' ? r.author : 'You',
      ts: typeof r.ts === 'number' ? r.ts : Date.now(),
      resolved: !!r.resolved,
    });
  }
  return out;
}

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
    comments: [],
    flows: [],
  };
  doc.comments = normalizeComments(src.comments, doc.pages);
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
    const patch = { ...(n as Partial<IrisNode>) };
    patch.layout = normalizeAutoLayout((n as { layout?: unknown }).layout);
    if (patch.sizingH !== 'fill' && patch.sizingH !== 'hug') patch.sizingH = 'fixed';
    if (patch.sizingV !== 'fill' && patch.sizingV !== 'hug') patch.sizingV = 'fixed';
    patch.interactions = normalizeInteractions((n as { interactions?: unknown }).interactions);
    const ov = (n as { overflow?: unknown }).overflow;
    // legacy docs: derive overflow from the clip flag (clipped frames were "hidden")
    patch.overflow = ov === 'hidden' || ov === 'scroll' ? ov : (n as { clip?: unknown }).clip === true ? 'hidden' : 'visible';
    const node = createNode(
      VALID_TYPES.includes(n.type as NodeType) ? (n.type as NodeType) : 'rect',
      typeof n.pageId === 'string' ? n.pageId : doc.pages[0],
      patch,
    );
    doc.nodesById[node.id] = node;
  }
  doc.flows = normalizeFlows((src as { flows?: unknown }).flows, doc);
  return doc;
}
