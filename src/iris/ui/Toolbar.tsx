'use client';

/**
 * Floating horizontal toolbar: shape tools, image import, hand + eyedropper.
 * Positioning is handled by the parent — this is just the bar itself.
 */

import {
  Circle,
  Frame,
  Hand,
  Hexagon,
  ImagePlus,
  Images,
  MousePointer2,
  MoveUpRight,
  Pipette,
  PenTool,
  Slash,
  Square,
  Star,
  Type,
  type LucideIcon,
} from 'lucide-react';
import { useIris, type Tool } from '../engine/store';
import { pickImageFiles } from '../engine/files';

interface ToolDef {
  tool: Tool;
  label: string;
  key: string;
  Icon: LucideIcon;
}

const TOOLS: ToolDef[] = [
  { tool: 'move', label: 'Move', key: 'V', Icon: MousePointer2 },
  { tool: 'frame', label: 'Frame', key: 'F', Icon: Frame },
  { tool: 'rect', label: 'Rect', key: 'R', Icon: Square },
  { tool: 'ellipse', label: 'Ellipse', key: 'O', Icon: Circle },
  { tool: 'polygon', label: 'Polygon', key: 'Y', Icon: Hexagon },
  { tool: 'star', label: 'Star', key: 'S', Icon: Star },
  { tool: 'line', label: 'Line', key: 'L', Icon: Slash },
  { tool: 'arrow', label: 'Arrow', key: 'A', Icon: MoveUpRight },
  { tool: 'pen', label: 'Pen', key: 'P', Icon: PenTool },
  { tool: 'text', label: 'Text', key: 'T', Icon: Type },
  { tool: 'image', label: 'Place image', key: 'M', Icon: Images },
  { tool: 'eyedropper', label: 'Eyedropper', key: 'I', Icon: Pipette },
];

export function Toolbar() {
  const tool = useIris((s) => s.tool);
  const setTool = useIris((s) => s.setTool);

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-[#3E3E3E] bg-[#2C2C2C]/95 p-1 shadow-xl"
      role="toolbar"
      aria-label="Tools"
    >
      {TOOLS.map(({ tool: t, label, key, Icon }) => (
        <button
          key={t}
          type="button"
          className="iris-icon-btn h-8! w-8!"
          data-active={tool === t}
          aria-pressed={tool === t}
          title={`${label} (${key})`}
          aria-label={`${label} (${key})`}
          onClick={() => setTool(t)}
        >
          <Icon size={16} strokeWidth={1.75} aria-hidden />
        </button>
      ))}

      <button
        type="button"
        className="iris-icon-btn h-8! w-8!"
        title="Import image"
        aria-label="Import image"
        onClick={() => pickImageFiles()}
      >
        <ImagePlus size={16} strokeWidth={1.75} aria-hidden />
      </button>

      <div className="mx-1 h-5 w-px bg-[#3E3E3E]" aria-hidden="true" />

      <button
        type="button"
        className="iris-icon-btn h-8! w-8!"
        data-active={tool === 'hand'}
        aria-pressed={tool === 'hand'}
        title="Hand (H)"
        aria-label="Hand (H)"
        onClick={() => setTool('hand')}
      >
        <Hand size={16} strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}
