'use client';

import {
  Circle,
  Frame,
  Group,
  Hexagon,
  Image as ImageIcon,
  MoveUpRight,
  PenTool,
  Slash,
  Square,
  Star as StarIcon,
  Type,
  type LucideIcon,
} from 'lucide-react';
import type { NodeType } from '../engine/model';

const ICONS: Record<NodeType, LucideIcon> = {
  frame: Frame,
  group: Group,
  rect: Square,
  ellipse: Circle,
  line: Slash,
  path: PenTool,
  text: Type,
  image: ImageIcon,
  polygon: Hexagon,
  star: StarIcon,
  arrow: MoveUpRight,
};

export function NodeTypeIcon({
  type,
  className,
  size = 12,
}: {
  type: NodeType;
  className?: string;
  size?: number;
}) {
  const Icon = ICONS[type];
  return <Icon className={className} size={size} strokeWidth={1.75} aria-hidden />;
}
