/**
 * Mutable interaction overlay state, owned by tools.ts, read by renderer.ts.
 * Kept outside of zustand for 60fps pointer interactions; every mutation is
 * followed by renderer.requestDraw().
 */

import type { NodeType, PathPoint } from './model';
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

export interface OverlayState {
  marquee: Rect | null;
  guides: SnapGuide[];
  dragBadge: Rect | null;
  penDraft: PenDraft | null;
  pathEdit: PathEditState | null;
  drawPreview: DrawPreview | null;
  cursor: string | null;
  pointerWorld: { x: number; y: number } | null;
  spaceDown: boolean;
  rendering: boolean;
}

export const overlay: OverlayState = {
  marquee: null,
  guides: [],
  dragBadge: null,
  penDraft: null,
  pathEdit: null,
  drawPreview: null,
  cursor: null,
  pointerWorld: null,
  spaceDown: false,
  rendering: false,
};

export function clearTransient(): void {
  overlay.marquee = null;
  overlay.guides = [];
  overlay.dragBadge = null;
}
