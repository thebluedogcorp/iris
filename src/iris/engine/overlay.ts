/**
 * Mutable interaction overlay state, owned by tools.ts, read by renderer.ts.
 * Kept outside of zustand for 60fps pointer interactions; every mutation is
 * followed by renderer.requestDraw().
 */

import type { NodeType, PathPoint } from './model';
import type { ID } from './model';
import type { Rect, SnapGuide } from './geometry';

export interface PenDraft {
  points: PathPoint[];
  cursor: { x: number; y: number } | null;
  dragging: boolean;
}

export interface PathEditState {
  activePoint: number | null;
  dragKind: 'point' | 'handleOut' | 'handleIn' | null;
  hoverPoint: number | null;
}

export interface DrawPreview {
  type: NodeType;
  rect: Rect;
  flip: boolean;
  diagonal: { x1: number; y1: number; x2: number; y2: number } | null;
}

export interface GuideDrag {
  axis: 'x' | 'y';
  /** world coordinate */
  at: number;
  /** index in doc.settings.guidesX/Y (-1 while pulling a new guide) */
  index: number;
  /** pointer left the ruler area → live */
  entered: boolean;
}

/** Active drag of children inside an auto-layout frame (reorder mode). */
export interface LayoutDrag {
  /** the auto-layout frame the children belong to */
  frameId: ID;
  /** dragged child ids (solver skips positioning them) */
  ids: ID[];
  /** provisional insertion index among the frame's children */
  index: number;
  /** true once the drag left the frame (reparent flow) */
  left: boolean;
}

export interface OverlayState {
  marquee: Rect | null;
  guides: SnapGuide[];
  dragBadge: Rect | null;
  penDraft: PenDraft | null;
  pathEdit: PathEditState | null;
  drawPreview: DrawPreview | null;
  /** freehand pencil stroke points (world space) */
  pencilDraft: { x: number; y: number }[] | null;
  cursor: string | null;
  pointerWorld: { x: number; y: number } | null;
  spaceDown: boolean;
  rendering: boolean;
  /** active ruler-guide drag */
  guideDrag: GuideDrag | null;
  /** last color sampled by the eyedropper */
  pickedColor: string | null;
  /** active auto-layout reorder drag */
  layoutDrag: LayoutDrag | null;
}

export const overlay: OverlayState = {
  marquee: null,
  guides: [],
  dragBadge: null,
  penDraft: null,
  pathEdit: null,
  drawPreview: null,
  pencilDraft: null,
  cursor: null,
  pointerWorld: null,
  spaceDown: false,
  rendering: false,
  guideDrag: null,
  pickedColor: null,
  layoutDrag: null,
};

export function clearTransient(): void {
  overlay.marquee = null;
  overlay.guides = [];
  overlay.dragBadge = null;
  overlay.guideDrag = null;
  overlay.layoutDrag = null;
}
