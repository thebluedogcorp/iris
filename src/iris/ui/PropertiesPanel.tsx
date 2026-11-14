'use client';

/**
 * Right panel: alignment, position/size + transforms (flip/rotate), appearance
 * (opacity/blend), fill (solid + gradient), stroke (color/weight/dash), effects
 * (shadow/blur), shape params (polygon/star/arrow), text properties, frame
 * clip, document settings and quick export.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  ChevronDown,
  Code2,
  Play,
  Share2,
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignHorizontalDistributeCenter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignStartHorizontal,
  AlignStartVertical,
  AlignVerticalDistributeCenter,
  ArrowDown,
  ArrowUp,
  ArrowDownToLine,
  ArrowUpToLine,
  FlipHorizontal,
  FlipVertical,
  Eye,
  EyeOff,
  Lock,
  RotateCw,
  RotateCcw,
  Unlock,
  type LucideIcon,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useIris, useSelectedNodes, type AlignMode } from '../engine/store';
import { boundsOfNodes } from '../engine/geometry';
import { BLEND_MODES, FRAME_PRESETS, type ArrowHead, type DashStyle, type TextCase } from '../engine/model';
import { exportPNG, exportSVG, svgStringOfSelection } from '../engine/export';
import { cn } from '@/lib/utils';
import { NumberField } from './NumberField';
import { ColorField } from './ColorField';

const FONT_FAMILIES = [
  'Inter',
  'Arial',
  'Helvetica',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Palatino',
];

const FONT_WEIGHTS: { value: number; label: string }[] = [
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semibold' },
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extrabold' },
];

const TEXT_CASES: { value: TextCase; label: string }[] = [
  { value: 'as-typed', label: 'As typed' },
  { value: 'upper', label: 'UPPERCASE' },
  { value: 'lower', label: 'lowercase' },
  { value: 'title', label: 'Title Case' },
];

const DASH_STYLES: { value: DashStyle; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
];

const ARROW_HEADS: { value: ArrowHead; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'arrow', label: 'Arrow' },
  { value: 'triangle', label: 'Filled' },
  { value: 'line', label: 'Chevron' },
];

const ALIGN_TOOLS: { mode: AlignMode; label: string; Icon: LucideIcon }[] = [
  { mode: 'left', label: 'Align left', Icon: AlignStartVertical },
  { mode: 'hcenter', label: 'Align horizontal centers', Icon: AlignCenterVertical },
  { mode: 'right', label: 'Align right', Icon: AlignEndVertical },
  { mode: 'top', label: 'Align top', Icon: AlignStartHorizontal },
  { mode: 'vcenter', label: 'Align vertical centers', Icon: AlignCenterHorizontal },
  { mode: 'bottom', label: 'Align bottom', Icon: AlignEndHorizontal },
  { mode: 'hdist', label: 'Distribute horizontally', Icon: AlignHorizontalDistributeCenter },
  { mode: 'vdist', label: 'Distribute vertically', Icon: AlignVerticalDistributeCenter },
];

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#3E3E3E] px-3 py-3">
      {title ? (
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]">
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-[26px] w-4 shrink-0 items-center justify-start text-[10px] text-[#9A9A9A]">
      {children}
    </span>
  );
}

function IconBtn({
  label,
  Icon,
  onClick,
  disabled,
  active,
}: {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-7 w-7 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-35',
        active ? 'bg-[#474747] text-white' : 'text-[#C9C9C9] hover:bg-[#474747] hover:text-white',
      )}
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon size={13} strokeWidth={1.75} aria-hidden />
    </button>
  );
}

function DesignTab() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const selection = useIris((s) => s.selection);
  const nodes = useSelectedNodes();

  const actions = useIris(
    useShallow((s) => ({
      alignSelection: s.alignSelection,
      updateNodes: s.updateNodes,
      setNodeRect: s.setNodeRect,
      resizeSelectionBox: s.resizeSelectionBox,
      moveSelectionWorld: s.moveSelectionWorld,
      renamePage: s.renamePage,
      setEditingText: s.setEditingText,
      zorder: s.zorder,
      flipSelection: s.flipSelection,
      rotateSelectionBy: s.rotateSelectionBy,
      toggleLockSelection: s.toggleLockSelection,
      toggleHideSelection: s.toggleHideSelection,
      setGridSettings: s.setGridSettings,
      setSettings: s.setSettings,
      clearGuides: s.clearGuides,
      unlockAllOnPage: s.unlockAllOnPage,
    })),
  );

  const sliderActiveRef = useRef(false);

  const page = doc.pagesById[currentPageId];
  const single = nodes.length === 1 ? nodes[0] : null;
  const ids = nodes.map((n) => n.id);
  const bbox = selection.length > 0 ? boundsOfNodes(doc, selection) : null;
  const settings = doc.settings;

  const FILLABLE = ['rect', 'ellipse', 'frame', 'path', 'text', 'polygon', 'star'];
  const STROKABLE = ['rect', 'ellipse', 'line', 'path', 'frame', 'polygon', 'star', 'arrow'];
  const showFill = single && FILLABLE.includes(single.type);
  const showStroke = single && STROKABLE.includes(single.type);
  const showText = single?.type === 'text';
  const showRadius = single && (single.type === 'rect' || single.type === 'frame' || single.type === 'image');
  const showClip = single?.type === 'frame';
  const showPolygon = single?.type === 'polygon';
  const showStar = single?.type === 'star';
  const showArrowHeads = single?.type === 'arrow';

  /* ---------------- empty state ---------------- */
  if (nodes.length === 0) {
    return (
      <div className="iris-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
          <Section title="Page">
            {page ? (
              <input
                key={page.id}
                className="iris-input"
                defaultValue={page.name}
                aria-label="Page name"
                spellCheck={false}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (v && v !== page.name) actions.renamePage(page.id, v);
                  else e.target.value = page.name;
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                }}
              />
            ) : null}
          </Section>

          <Section title="Canvas">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#C9C9C9]">Background</span>
                <div className="w-24">
                  <ColorField
                    value={settings.bg}
                    allowNone={false}
                    ariaLabel="Canvas background"
                    onChange={(v) => actions.setSettings({ bg: v ?? '#242424' })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#C9C9C9]">Layout grid</span>
                <Switch
                  checked={settings.grid.show}
                  aria-label="Show layout grid"
                  className="data-[state=checked]:bg-[#0D99FF] data-[state=unchecked]:bg-[#383838]"
                  onCheckedChange={(v) => actions.setGridSettings({ show: v })}
                />
              </div>
              {settings.grid.show ? (
                <>
                  <div className="flex items-center gap-1">
                    <FieldLabel>G</FieldLabel>
                    <NumberField
                      value={settings.grid.size}
                      min={1}
                      max={200}
                      ariaLabel="Grid size"
                      onChange={(v) => actions.setGridSettings({ size: Math.max(1, v) })}
                    />
                    <span className="ml-1 text-[10px] text-[#6F6F6F]">px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#C9C9C9]">Snap to grid</span>
                    <Switch
                      checked={settings.grid.snap}
                      aria-label="Snap to grid"
                      className="data-[state=checked]:bg-[#0D99FF] data-[state=unchecked]:bg-[#383838]"
                      onCheckedChange={(v) => actions.setGridSettings({ snap: v })}
                    />
                  </div>
                </>
              ) : null}
              {(settings.guidesX.length > 0 || settings.guidesY.length > 0) && (
                <button
                  type="button"
                  className="h-7 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white"
                  onClick={actions.clearGuides}
                >
                  Clear {settings.guidesX.length + settings.guidesY.length} guide
                  {settings.guidesX.length + settings.guidesY.length === 1 ? '' : 's'}
                </button>
              )}
            </div>
          </Section>

          <Section title="Quick tips">
            <ul className="space-y-1.5 text-[11px] leading-4 text-[#9A9A9A]">
              <li>V Move · K Scale · F Frame · Shift+S Section</li>
              <li>R Rect · O Ellipse · L Line · Shift+L Arrow</li>
              <li>P Pen · Shift+P Pencil · T Text · C Comment</li>
              <li>Ctrl+Enter to present · Shift+R rulers</li>
              <li>Space + drag to pan · Ctrl + wheel to zoom</li>
              <li>Drag from a ruler to create a guide</li>
              <li>Layers list the topmost layer first</li>
              <li>Everything is saved locally, automatically</li>
            </ul>
          </Section>
      </div>
    );
  }

  /* ---------------- selection state ---------------- */
  return (
    <div className="iris-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="flex h-9 shrink-0 items-center gap-1 px-3">
        <span className="iris-section-title truncate text-[11px]">
          {single ? single.name : `${nodes.length} selected`}
        </span>
        <div className="ml-auto flex shrink-0 items-center gap-0.5">
          <IconBtn
            label={single?.locked ? 'Unlock' : 'Lock'}
            Icon={single?.locked ? Unlock : Lock}
            onClick={actions.toggleLockSelection}
          />
          <IconBtn
            label={nodes.every((n) => n.visible) ? 'Hide' : 'Show'}
            Icon={nodes.every((n) => n.visible) ? Eye : EyeOff}
            onClick={actions.toggleHideSelection}
          />
        </div>
      </div>

      <div className="iris-scroll flex-1 overflow-y-auto">
        {/* Align */}
        <Section>
          <div className="flex items-center justify-between gap-0.5" role="group" aria-label="Alignment">
            {ALIGN_TOOLS.map(({ mode, label, Icon }) => {
              const disabled = (mode === 'hdist' || mode === 'vdist') && nodes.length < 2;
              return (
                <button
                  key={mode}
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white disabled:pointer-events-none disabled:opacity-35"
                  title={label}
                  aria-label={label}
                  disabled={disabled}
                  onClick={() => actions.alignSelection(mode)}
                >
                  <Icon size={14} strokeWidth={1.75} aria-hidden />
                </button>
              );
            })}
          </div>
        </Section>

        {/* Position / size */}
        <Section>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex items-center gap-1">
              <FieldLabel>X</FieldLabel>
              {single ? (
                <NumberField
                  value={single.x}
                  ariaLabel="X position"
                  onChange={(v) => actions.updateNodes([single.id], { x: v }, { history: 'x' })}
                />
              ) : (
                <NumberField
                  value={bbox ? Math.round(bbox.x * 100) / 100 : 0}
                  ariaLabel="X position"
                  onChange={(v) => bbox && actions.moveSelectionWorld(v - bbox.x, 0, 'bbox')}
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <FieldLabel>Y</FieldLabel>
              {single ? (
                <NumberField
                  value={single.y}
                  ariaLabel="Y position"
                  onChange={(v) => actions.updateNodes([single.id], { y: v }, { history: 'y' })}
                />
              ) : (
                <NumberField
                  value={bbox ? Math.round(bbox.y * 100) / 100 : 0}
                  ariaLabel="Y position"
                  onChange={(v) => bbox && actions.moveSelectionWorld(0, v - bbox.y, 'bbox')}
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <FieldLabel>W</FieldLabel>
              {single ? (
                <NumberField
                  value={single.w}
                  min={0}
                  ariaLabel="Width"
                  disabled={single.type === 'text' && single.autoWidth}
                  onChange={(v) =>
                    actions.setNodeRect(
                      single.id,
                      { x: single.x, y: single.y, w: Math.max(1, v), h: single.h },
                      { history: 'wh' },
                    )
                  }
                />
              ) : (
                <NumberField
                  value={bbox ? Math.round(bbox.w * 100) / 100 : 0}
                  min={1}
                  ariaLabel="Width"
                  disabled={!bbox}
                  onChange={(v) => actions.resizeSelectionBox(v, bbox?.h ?? 1)}
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <FieldLabel>H</FieldLabel>
              {single ? (
                <NumberField
                  value={single.h}
                  min={0}
                  ariaLabel="Height"
                  disabled={single.type === 'text'}
                  title={single.type === 'text' ? 'Text height is automatic' : undefined}
                  onChange={(v) =>
                    actions.setNodeRect(
                      single.id,
                      { x: single.x, y: single.y, w: single.w, h: Math.max(1, v) },
                      { history: 'wh' },
                    )
                  }
                />
              ) : (
                <NumberField
                  value={bbox ? Math.round(bbox.h * 100) / 100 : 0}
                  min={1}
                  ariaLabel="Height"
                  disabled={!bbox}
                  onChange={(v) => actions.resizeSelectionBox(bbox?.w ?? 1, v)}
                />
              )}
            </div>
            {single ? (
              <>
                <div className="flex items-center gap-1">
                  <FieldLabel>∠</FieldLabel>
                  <NumberField
                    value={single.rotation}
                    min={-360}
                    max={360}
                    ariaLabel="Rotation"
                    onChange={(v) => actions.updateNodes([single.id], { rotation: v }, { history: 'rotation' })}
                  />
                </div>
                {showRadius ? (
                  <div className="flex items-center gap-1">
                    <FieldLabel>⌒</FieldLabel>
                    <NumberField
                      value={single.cornerRadius}
                      min={0}
                      ariaLabel="Corner radius"
                      onChange={(v) => actions.updateNodes([single.id], { cornerRadius: Math.max(0, v) }, { history: 'radius' })}
                    />
                  </div>
                ) : (
                  <span />
                )}
              </>
            ) : null}
          </div>
          {/* transform row */}
          <div className="mt-2 flex items-center justify-between gap-0.5" role="group" aria-label="Transform">
            <IconBtn label="Flip horizontal — Shift+H" Icon={FlipHorizontal} onClick={() => actions.flipSelection('h')} />
            <IconBtn label="Flip vertical — Shift+V" Icon={FlipVertical} onClick={() => actions.flipSelection('v')} />
            <IconBtn label="Rotate 90° counter-clockwise" Icon={RotateCcw} onClick={() => actions.rotateSelectionBy(-90)} />
            <IconBtn label="Rotate 90° clockwise" Icon={RotateCw} onClick={() => actions.rotateSelectionBy(90)} />
            <div className="mx-0.5 h-5 w-px bg-[#3E3E3E]" aria-hidden />
            <IconBtn label="Send backward — [" Icon={ArrowDown} onClick={() => actions.zorder('backward')} />
            <IconBtn label="Bring forward — ]" Icon={ArrowUp} onClick={() => actions.zorder('forward')} />
            <IconBtn label="Send to back — Ctrl+[" Icon={ArrowDownToLine} onClick={() => actions.zorder('back')} />
            <IconBtn label="Bring to front — Ctrl+]" Icon={ArrowUpToLine} onClick={() => actions.zorder('front')} />
          </div>
        </Section>

        {/* Appearance */}
        <Section>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]">
              Opacity
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Slider
              value={[Math.round((single ? single.opacity : 1) * 100)]}
              min={0}
              max={100}
              step={1}
              aria-label="Opacity"
              onValueChange={(v) => {
                if (!sliderActiveRef.current) {
                  sliderActiveRef.current = true;
                  useIris.getState().historyBegin();
                }
                actions.updateNodes(ids, { opacity: v[0] / 100 }, { history: false });
              }}
              onValueCommit={() => {
                sliderActiveRef.current = false;
                useIris.getState().historyCommit();
              }}
            />
            <div className="w-14 shrink-0">
              <NumberField
                value={Math.round((single ? single.opacity : 1) * 100)}
                min={0}
                max={100}
                ariaLabel="Opacity percent"
                onChange={(v) => actions.updateNodes(ids, { opacity: v / 100 }, { history: 'opacity' })}
              />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <FieldLabel>⧉</FieldLabel>
            <select
              className="iris-select"
              aria-label="Blend mode"
              value={single?.blend ?? 'normal'}
              onChange={(e) =>
                actions.updateNodes(ids, { blend: e.target.value as (typeof BLEND_MODES)[number] }, { history: 'blend' })
              }
            >
              {BLEND_MODES.map((b) => (
                <option key={b} value={b}>
                  {b === 'normal' ? 'Normal' : b.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </Section>

        {/* Fill */}
        {showFill && single ? (
          <Section title="Fill">
            <ColorField
              value={single.fill}
              ariaLabel="Fill"
              onChange={(v) => actions.updateNodes([single.id], { fill: v }, { history: 'fill' })}
            />
            <div className="mt-2.5 rounded-md border border-[#3E3E3E] p-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]">
                  Gradient
                </span>
                <Switch
                  checked={!!single.fillGradient}
                  aria-label="Gradient fill"
                  className="data-[state=checked]:bg-[#0D99FF] data-[state=unchecked]:bg-[#383838]"
                  onCheckedChange={(on) =>
                    actions.updateNodes(
                      [single.id],
                      {
                        fillGradient: on
                          ? single.fillGradient ?? { type: 'linear', angle: 90, from: single.fill ?? '#0D99FF', to: '#7EC9FF' }
                          : null,
                      },
                      { history: 'gradient' },
                    )
                  }
                />
              </div>
              {single.fillGradient ? (
                <div className="mt-2 flex flex-col gap-1.5">
                  <select
                    className="iris-select"
                    aria-label="Gradient type"
                    value={single.fillGradient.type}
                    onChange={(e) =>
                      actions.updateNodes(
                        [single.id],
                        { fillGradient: { ...single.fillGradient!, type: e.target.value as 'linear' | 'radial' } },
                        { history: 'gradient' },
                      )
                    }
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>
                  {single.fillGradient.type === 'linear' ? (
                    <div className="flex items-center gap-1">
                      <FieldLabel>∠</FieldLabel>
                      <NumberField
                        value={single.fillGradient.angle}
                        min={-360}
                        max={360}
                        ariaLabel="Gradient angle"
                        onChange={(v) =>
                          actions.updateNodes(
                            [single.id],
                            { fillGradient: { ...single.fillGradient!, angle: v } },
                            { history: 'gradient' },
                          )
                        }
                      />
                    </div>
                  ) : null}
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1">
                      <ColorField
                        value={single.fillGradient.from}
                        allowNone={false}
                        ariaLabel="Gradient start color"
                        onChange={(v) =>
                          actions.updateNodes(
                            [single.id],
                            { fillGradient: { ...single.fillGradient!, from: v ?? '#0D99FF' } },
                            { history: 'gradient' },
                          )
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <ColorField
                        value={single.fillGradient.to}
                        allowNone={false}
                        ariaLabel="Gradient end color"
                        onChange={(v) =>
                          actions.updateNodes(
                            [single.id],
                            { fillGradient: { ...single.fillGradient!, to: v ?? '#7EC9FF' } },
                            { history: 'gradient' },
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </Section>
        ) : null}

        {/* Stroke */}
        {showStroke && single ? (
          <Section title="Stroke">
            <div className="flex flex-col gap-1.5">
              <ColorField
                value={single.stroke}
                ariaLabel="Stroke"
                onChange={(v) => actions.updateNodes([single.id], { stroke: v }, { history: 'stroke' })}
              />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex items-center gap-1">
                  <FieldLabel>W</FieldLabel>
                  <NumberField
                    value={single.strokeWidth}
                    min={0}
                    max={100}
                    ariaLabel="Stroke weight"
                    onChange={(v) =>
                      actions.updateNodes([single.id], { strokeWidth: Math.max(0, v) }, { history: 'strokeW' })
                    }
                  />
                </div>
                <select
                  className="iris-select"
                  aria-label="Stroke style"
                  value={single.dash}
                  onChange={(e) =>
                    actions.updateNodes([single.id], { dash: e.target.value as DashStyle }, { history: 'strokeW' })
                  }
                >
                  {DASH_STYLES.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Section>
        ) : null}

        {/* Effects */}
        {single ? (
          <Section title="Effects">
            <div className="flex flex-col gap-2.5">
              <div className="rounded-md border border-[#3E3E3E] p-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#C9C9C9]">Drop shadow</span>
                  <Switch
                    checked={!!single.shadow}
                    aria-label="Drop shadow"
                    className="data-[state=checked]:bg-[#0D99FF] data-[state=unchecked]:bg-[#383838]"
                    onCheckedChange={(on) =>
                      actions.updateNodes(
                        [single.id],
                        { shadow: on ? single.shadow ?? { x: 0, y: 4, blur: 12, color: '#000000' } : null },
                        { history: 'shadow' },
                      )
                    }
                  />
                </div>
                {single.shadow ? (
                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    <div className="flex items-center gap-1">
                      <FieldLabel>X</FieldLabel>
                      <NumberField
                        value={single.shadow.x}
                        ariaLabel="Shadow X"
                        onChange={(v) =>
                          actions.updateNodes(
                            [single.id],
                            { shadow: { ...single.shadow!, x: v } },
                            { history: 'shadow' },
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <FieldLabel>Y</FieldLabel>
                      <NumberField
                        value={single.shadow.y}
                        ariaLabel="Shadow Y"
                        onChange={(v) =>
                          actions.updateNodes(
                            [single.id],
                            { shadow: { ...single.shadow!, y: v } },
                            { history: 'shadow' },
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <FieldLabel>B</FieldLabel>
                      <NumberField
                        value={single.shadow.blur}
                        min={0}
                        ariaLabel="Shadow blur"
                        onChange={(v) =>
                          actions.updateNodes(
                            [single.id],
                            { shadow: { ...single.shadow!, blur: Math.max(0, v) } },
                            { history: 'shadow' },
                          )
                        }
                      />
                    </div>
                    <div className="col-span-3">
                      <ColorField
                        value={single.shadow.color}
                        allowNone={false}
                        ariaLabel="Shadow color"
                        onChange={(v) =>
                          actions.updateNodes(
                            [single.id],
                            { shadow: { ...single.shadow!, color: v ?? '#000000' } },
                            { history: 'shadow' },
                          )
                        }
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <FieldLabel>¤</FieldLabel>
                <span className="w-16 shrink-0 text-[11px] text-[#C9C9C9]">Layer blur</span>
                <NumberField
                  value={single.blur}
                  min={0}
                  max={100}
                  ariaLabel="Layer blur"
                  onChange={(v) => actions.updateNodes([single.id], { blur: Math.max(0, v) }, { history: 'blur' })}
                />
              </div>
            </div>
          </Section>
        ) : null}

        {/* Polygon / Star params */}
        {showPolygon && single ? (
          <Section title="Polygon">
            <div className="flex items-center gap-1">
              <FieldLabel>N</FieldLabel>
              <NumberField
                value={single.sides}
                min={3}
                max={24}
                step={1}
                ariaLabel="Sides"
                onChange={(v) => actions.updateNodes([single.id], { sides: Math.min(24, Math.max(3, Math.round(v))) }, { history: 'sides' })}
              />
              <span className="ml-1 text-[10px] text-[#6F6F6F]">sides</span>
            </div>
          </Section>
        ) : null}
        {showStar && single ? (
          <Section title="Star">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <FieldLabel>N</FieldLabel>
                <NumberField
                  value={single.starPoints}
                  min={3}
                  max={24}
                  step={1}
                  ariaLabel="Points"
                  onChange={(v) => actions.updateNodes([single.id], { starPoints: Math.min(24, Math.max(3, Math.round(v))) }, { history: 'points' })}
                />
                <span className="ml-1 text-[10px] text-[#6F6F6F]">points</span>
              </div>
              <div className="flex items-center gap-2">
                <FieldLabel>R</FieldLabel>
                <Slider
                  value={[Math.round(single.innerRadius * 100)]}
                  min={10}
                  max={95}
                  step={1}
                  aria-label="Inner radius"
                  onValueChange={(v) => {
                    if (!sliderActiveRef.current) {
                      sliderActiveRef.current = true;
                      useIris.getState().historyBegin();
                    }
                    actions.updateNodes([single.id], { innerRadius: v[0] / 100 }, { history: false });
                  }}
                  onValueCommit={() => {
                    sliderActiveRef.current = false;
                    useIris.getState().historyCommit();
                  }}
                />
                <span className="w-8 shrink-0 text-right text-[10px] tabular-nums text-[#9A9A9A]">
                  {Math.round(single.innerRadius * 100)}%
                </span>
              </div>
            </div>
          </Section>
        ) : null}

        {/* Arrow heads */}
        {showArrowHeads && single ? (
          <Section title="Arrow">
            <div className="grid grid-cols-2 gap-1.5">
              <select
                className="iris-select"
                aria-label="Start head"
                value={single.arrowStart}
                onChange={(e) =>
                  actions.updateNodes([single.id], { arrowStart: e.target.value as ArrowHead }, { history: 'arrow' })
                }
              >
                {ARROW_HEADS.map((h) => (
                  <option key={h.value} value={h.value}>
                    Start: {h.label}
                  </option>
                ))}
              </select>
              <select
                className="iris-select"
                aria-label="End head"
                value={single.arrowEnd}
                onChange={(e) =>
                  actions.updateNodes([single.id], { arrowEnd: e.target.value as ArrowHead }, { history: 'arrow' })
                }
              >
                {ARROW_HEADS.map((h) => (
                  <option key={h.value} value={h.value}>
                    End: {h.label}
                  </option>
                ))}
              </select>
            </div>
          </Section>
        ) : null}

        {/* Text */}
        {showText && single ? (
          <Section title="Text">
            <div className="flex flex-col gap-2">
              <select
                className="iris-select"
                aria-label="Font family"
                value={single.fontFamily}
                onChange={(e) =>
                  actions.updateNodes([single.id], { fontFamily: e.target.value }, { history: 'font' })
                }
              >
                {FONT_FAMILIES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex items-center gap-1">
                  <FieldLabel>Aa</FieldLabel>
                  <NumberField
                    value={single.fontSize}
                    min={1}
                    ariaLabel="Font size"
                    onChange={(v) => actions.updateNodes([single.id], { fontSize: Math.max(1, v) }, { history: 'font' })}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <FieldLabel>LH</FieldLabel>
                  <NumberField
                    value={single.lineHeight}
                    min={0.5}
                    step={0.05}
                    ariaLabel="Line height"
                    onChange={(v) =>
                      actions.updateNodes([single.id], { lineHeight: Math.max(0.5, v) }, { history: 'lh' })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex items-center gap-1">
                  <FieldLabel>VA</FieldLabel>
                  <NumberField
                    value={single.letterSpacing}
                    step={0.1}
                    ariaLabel="Letter spacing"
                    onChange={(v) =>
                      actions.updateNodes([single.id], { letterSpacing: v }, { history: 'spacing' })
                    }
                  />
                </div>
                <select
                  className="iris-select"
                  aria-label="Text case"
                  value={single.textCase}
                  onChange={(e) =>
                    actions.updateNodes([single.id], { textCase: e.target.value as TextCase }, { history: 'case' })
                  }
                >
                  {TEXT_CASES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-1.5">
                <select
                  className="iris-select"
                  aria-label="Font weight"
                  value={single.fontWeight}
                  onChange={(e) =>
                    actions.updateNodes([single.id], { fontWeight: Number(e.target.value) }, { history: 'font' })
                  }
                >
                  {FONT_WEIGHTS.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </select>
                <div className="flex gap-0.5" role="group" aria-label="Text alignment">
                  {(
                    [
                      { a: 'left', label: 'Align text left', Icon: AlignLeft },
                      { a: 'center', label: 'Align text center', Icon: AlignCenter },
                      { a: 'right', label: 'Align text right', Icon: AlignRight },
                    ] as const
                  ).map(({ a, label, Icon }) => (
                    <button
                      key={a}
                      type="button"
                      title={label}
                      aria-label={label}
                      aria-pressed={single.textAlign === a}
                      className={cn(
                        'flex h-[26px] flex-1 items-center justify-center rounded-md border border-transparent transition-colors',
                        single.textAlign === a
                          ? 'border-[#4E4E4E] bg-[#474747] text-white'
                          : 'text-[#C9C9C9] hover:bg-[#383838]',
                      )}
                      onClick={() => actions.updateNodes([single.id], { textAlign: a }, { history: 'alignText' })}
                    >
                      <Icon size={12} strokeWidth={2} aria-hidden />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  aria-pressed={single.underline}
                  className={cn(
                    'h-7 flex-1 rounded-md text-[11px] underline decoration-1 underline-offset-2 transition-colors',
                    single.underline ? 'bg-[#474747] text-white' : 'bg-[#383838] text-[#C9C9C9] hover:bg-[#474747] hover:text-white',
                  )}
                  aria-label="Underline"
                  onClick={() => actions.updateNodes([single.id], { underline: !single.underline }, { history: 'textDeco' })}
                >
                  Underline
                </button>
                <button
                  type="button"
                  aria-pressed={single.strike}
                  className={cn(
                    'h-7 flex-1 rounded-md text-[11px] line-through transition-colors',
                    single.strike ? 'bg-[#474747] text-white' : 'bg-[#383838] text-[#C9C9C9] hover:bg-[#474747] hover:text-white',
                  )}
                  aria-label="Strikethrough"
                  onClick={() => actions.updateNodes([single.id], { strike: !single.strike }, { history: 'textDeco' })}
                >
                  Strike
                </button>
                <button
                  type="button"
                  aria-pressed={single.autoWidth}
                  title="Auto width"
                  className={cn(
                    'h-7 flex-1 rounded-md text-[11px] transition-colors',
                    single.autoWidth ? 'bg-[#474747] text-white' : 'bg-[#383838] text-[#C9C9C9] hover:bg-[#474747] hover:text-white',
                  )}
                  onClick={() => actions.updateNodes([single.id], { autoWidth: !single.autoWidth }, { history: 'autowidth' })}
                >
                  Auto
                </button>
              </div>
              <button
                type="button"
                className="h-7 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white"
                onClick={() => actions.setEditingText(single.id)}
              >
                Edit text
              </button>
            </div>
          </Section>
        ) : null}

        {/* Frame clip */}
        {showClip && single ? (
          <Section title="Frame">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#C9C9C9]">Clip content</span>
              <Switch
                checked={single.clip}
                aria-label="Clip content"
                className="data-[state=checked]:bg-[#0D99FF] data-[state=unchecked]:bg-[#383838]"
                onCheckedChange={(v) => actions.updateNodes([single.id], { clip: v }, { history: 'clip' })}
              />
            </div>
          </Section>
        ) : null}

        {/* Export */}
        <Section title="Export">
          <div className="flex gap-1.5">
            <button
              type="button"
              className="h-7 flex-1 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white"
              onClick={() => void exportPNG('selection', 1)}
            >
              PNG 1x
            </button>
            <button
              type="button"
              className="h-7 flex-1 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white"
              onClick={() => void exportPNG('selection', 2)}
            >
              PNG 2x
            </button>
            <button
              type="button"
              className="h-7 flex-1 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white"
              onClick={() => exportSVG('selection')}
            >
              SVG
            </button>
          </div>
          <p className="mt-1.5 text-[10px] text-[#6F6F6F]">Exports the current selection</p>
        </Section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panel chrome (Figma UI3 header: avatar · present · Share, tabs,     */
/* zoom dropdown) + frame presets + inspect + prototype views          */
/* ------------------------------------------------------------------ */

const ZOOM_PRESETS: { label: string; value: number | 'fit' | 'sel' }[] = [
  { label: '25%', value: 0.25 },
  { label: '50%', value: 0.5 },
  { label: '100%', value: 1 },
  { label: '200%', value: 2 },
  { label: '400%', value: 4 },
  { label: 'Zoom to fit', value: 'fit' },
  { label: 'Zoom to selection', value: 'sel' },
];

function ZoomDropdown() {
  const zoom = useIris((s) => s.viewport.zoom);
  const setZoom = useIris((s) => s.setZoom);
  const zoomToFit = useIris((s) => s.zoomToFit);
  const zoomToSelection = useIris((s) => s.zoomToSelection);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent): void => {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey, true);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex h-7 items-center gap-1 rounded-md px-2 text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#383838] hover:text-white"
        aria-label="Zoom level — open presets"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Zoom"
        onClick={() => setOpen((v) => !v)}
      >
        {Math.round(zoom * 100)}%
        <ChevronDown size={11} strokeWidth={2} aria-hidden />
      </button>
      {open ? (
        <div
          role="menu"
          aria-label="Zoom presets"
          className="absolute right-0 top-full z-50 mt-1 w-[170px] rounded-lg border border-[#4E4E4E] bg-[#1E1E1E] py-1 shadow-2xl"
          style={{ animation: 'iris-menu-in-down 90ms ease-out' }}
        >
          {ZOOM_PRESETS.map((zp) => (
            <button
              key={zp.label}
              type="button"
              role="menuitem"
              className="mx-1 flex h-8 w-[calc(100%-8px)] items-center rounded-md px-2 text-left text-[12px] text-[#E5E5E5] hover:bg-[#3A3A3A]"
              onClick={() => {
                setOpen(false);
                if (zp.value === 'fit') zoomToFit();
                else if (zp.value === 'sel') zoomToSelection();
                else setZoom(zp.value);
              }}
            >
              {zp.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const goHome = useIris((s) => s.goHome);
  const toast = useIris((s) => s.toast);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent): void => {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey, true);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex h-7 items-center gap-1 rounded-full text-[11px] font-semibold text-white transition-transform hover:scale-[1.04]"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Account"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0D99FF] text-[10px]">
          TU
        </span>
        <ChevronDown size={11} strokeWidth={2} aria-hidden className="text-[#9A9A9A]" />
      </button>
      {open ? (
        <div
          role="menu"
          aria-label="Account"
          className="absolute left-0 top-full z-50 mt-1 w-[220px] rounded-lg border border-[#4E4E4E] bg-[#1E1E1E] p-2 shadow-2xl"
          style={{ animation: 'iris-menu-in-down 90ms ease-out' }}
        >
          <div className="flex items-center gap-2 px-1.5 py-1.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D99FF] text-[11px] font-bold">
              TU
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-semibold text-white">Test User</span>
              <span className="block truncate text-[10px] text-[#9A9A9A]">you@iris.studio</span>
            </span>
          </div>
          <div className="my-1 h-px bg-[#3E3E3E]" />
          <div className="px-1.5 py-1 text-[10px] text-[#6F6F6F]">
            Free plan · local-first preview
          </div>
          <div className="my-1 h-px bg-[#3E3E3E]" />
          <button
            type="button"
            role="menuitem"
            className="mx-0.5 flex h-8 w-[calc(100%-4px)] items-center rounded-md px-2 text-left text-[12px] text-[#E5E5E5] hover:bg-[#3A3A3A]"
            onClick={() => {
              setOpen(false);
              toast('Signed out (simulated) — see you soon');
              goHome();
            }}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Frame size presets shown while the Frame tool is active (Figma behavior). */
function FramePresets() {
  const tool = useIris((s) => s.tool);
  const addFramePreset = useIris((s) => s.addFramePreset);
  if (tool !== 'frame' && tool !== 'section') return null;

  const groups = [...new Set(FRAME_PRESETS.map((p) => p.group))];
  return (
    <div>
      {groups.map((g) => (
        <Section key={g} title={g}>
          <div className="flex flex-col gap-1">
            {FRAME_PRESETS.filter((p) => p.group === g).map((p) => (
              <button
                key={p.id}
                type="button"
                className="flex h-8 items-center justify-between rounded-md border border-[#3E3E3E] bg-[#1E1E1E] px-2.5 text-[11px] text-[#E5E5E5] transition-colors hover:border-[#0D99FF] hover:bg-[#252525]"
                onClick={() => addFramePreset(p)}
              >
                <span>{p.name}</span>
                <span className="text-[10px] text-[#6F6F6F]">
                  {p.w} × {p.h}
                </span>
              </button>
            ))}
          </div>
        </Section>
      ))}
      <Section>
        <p className="text-[10px] leading-4 text-[#6F6F6F]">
          Click a preset to drop it at the center of the view, or drag on the canvas for a custom size.
        </p>
      </Section>
    </div>
  );
}

/** Dev-mode inspect tab: SVG markup of the current selection. */
function InspectTab() {
  const selection = useIris((s) => s.selection);
  const svg = useMemo(
    () => (selection.length ? svgStringOfSelection() : null),
    // recompute whenever the selection identity changes
    [selection],
  );

  if (selection.length === 0) {
    return (
      <div className="p-4">
        <p className="text-[11px] leading-5 text-[#9A9A9A]">
          Inspect mode shows the SVG markup of your selection.
          <br />
          Select an object on the canvas to inspect its code.
        </p>
      </div>
    );
  }
  if (!svg) {
    return (
      <div className="p-4">
        <p className="text-[11px] text-[#9A9A9A]">This selection cannot be serialized to SVG.</p>
      </div>
    );
  }
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[11px] font-semibold text-white">SVG</span>
        <button
          type="button"
          className="rounded-md bg-[#0D99FF] px-2.5 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-[#0B87E0]"
          onClick={() => {
            void navigator.clipboard?.writeText(svg).then(
              () => useIris.getState().toast('SVG markup copied'),
              () => useIris.getState().toast('Could not copy'),
            );
          }}
        >
          Copy
        </button>
      </div>
      <pre className="iris-scroll mx-3 mb-3 flex-1 overflow-auto rounded-lg border border-[#3E3E3E] bg-[#1E1E1E] p-3 font-mono text-[10px] leading-4 text-[#C9C9C9]">
        {svg}
      </pre>
    </div>
  );
}

/** Prototype tab: presentation controls. */
function PrototypeTab() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const setPresenting = useIris((s) => s.setPresenting);
  const page = doc.pagesById[currentPageId];
  const frames = (page?.nodeIds ?? [])
    .map((id) => doc.nodesById[id])
    .filter((n): n is NonNullable<typeof n> => !!n && n.type === 'frame');

  return (
    <div className="iris-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
      <Section title="Prototype">
        <button
          type="button"
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#0D99FF] text-[12px] font-semibold text-white transition-colors hover:bg-[#0B87E0]"
          onClick={() => setPresenting(true)}
        >
          <Play size={13} strokeWidth={2.2} aria-hidden />
          Present {frames.length > 0 ? `(${frames.length} frame${frames.length === 1 ? '' : 's'})` : ''}
        </button>
        <p className="mt-2 text-[10px] leading-4 text-[#6F6F6F]">
          Present your frames full-screen. Use ← → to move between frames, Esc to exit. Also
          Ctrl+Enter anywhere.
        </p>
      </Section>
      <Section title="Flow">
        {frames.length === 0 ? (
          <p className="text-[11px] leading-5 text-[#6F6F6F]">
            No frames on this page yet. Press F and drag to create your first screen.
          </p>
        ) : (
          <ol className="flex flex-col gap-1">
            {frames.map((f, i) => (
              <li
                key={f.id}
                className="flex h-8 items-center gap-2 rounded-md border border-[#3E3E3E] bg-[#1E1E1E] px-2.5 text-[11px] text-[#E5E5E5]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded bg-[#252525] text-[9px] text-[#9A9A9A]">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate">{f.name}</span>
                <span className="text-[10px] text-[#6F6F6F]">
                  {Math.round(f.w)}×{Math.round(f.h)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </Section>
    </div>
  );
}

export function PropertiesPanel() {
  const rightTab = useIris((s) => s.rightTab);
  const setRightTab = useIris((s) => s.setRightTab);
  const inspectMode = useIris((s) => s.inspectMode);
  const setInspectMode = useIris((s) => s.setInspectMode);
  const setShareOpen = useIris((s) => s.setShareOpen);
  const setPresenting = useIris((s) => s.setPresenting);
  const presenting = useIris((s) => s.presenting);
  const tool = useIris((s) => s.tool);

  if (presenting) return null;

  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col border-l border-[#2A2A2A] bg-[#2C2C2C] xl:w-[268px]">
      {/* header: account · present · share */}
      <div className="flex h-11 shrink-0 items-center gap-1.5 border-b border-[#2A2A2A] px-2.5">
        <AccountMenu />
        <button
          type="button"
          className="iris-icon-btn h-7! w-7!"
          aria-label="Start presentation"
          title="Present (Ctrl+Enter)"
          onClick={() => setPresenting(true)}
        >
          <Play size={14} strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          className="ml-auto flex h-7 items-center gap-1.5 rounded-lg bg-[#0D99FF] px-3 text-[11px] font-semibold text-white transition-colors hover:bg-[#0B87E0]"
          aria-label="Share"
          onClick={() => setShareOpen(true)}
        >
          <Share2 size={12} strokeWidth={2.2} aria-hidden />
          Share
        </button>
      </div>

      {/* tabs + zoom */}
      <div className="flex h-9 shrink-0 items-center gap-1 border-b border-[#2A2A2A] px-2.5">
        {(['design', 'prototype'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={rightTab === t}
            className={`relative h-9 px-2 text-[11px] font-semibold capitalize transition-colors ${
              rightTab === t ? 'text-white' : 'text-[#9A9A9A] hover:text-[#E5E5E5]'
            }`}
            onClick={() => setRightTab(t)}
          >
            {t}
            {rightTab === t ? (
              <span className="absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-[#0D99FF]" aria-hidden />
            ) : null}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className="iris-icon-btn h-7! w-7!"
            data-active={inspectMode}
            aria-pressed={inspectMode}
            aria-label="Inspect code"
            title="Inspect code"
            onClick={() => setInspectMode(!inspectMode)}
          >
            <Code2 size={14} strokeWidth={1.75} aria-hidden />
          </button>
          <ZoomDropdown />
        </div>
      </div>

      {/* content */}
      {inspectMode ? (
        <InspectTab />
      ) : rightTab === 'prototype' ? (
        <PrototypeTab />
      ) : tool === 'frame' || tool === 'section' ? (
        <div className="iris-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
          <FramePresets />
        </div>
      ) : (
        <DesignTab />
      )}
    </aside>
  );
}
