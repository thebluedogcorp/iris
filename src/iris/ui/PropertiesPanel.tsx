'use client';

/**
 * Right panel: alignment, position/size, appearance, fill/stroke,
 * text properties, frame clip toggle and quick export.
 */

import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
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
  type LucideIcon,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useIris, useSelectedNodes, type AlignMode } from '../engine/store';
import { boundsOfNodes } from '../engine/geometry';
import { exportPNG, exportSVG } from '../engine/export';
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
];

const FONT_WEIGHTS: { value: number; label: string }[] = [
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semibold' },
  { value: 700, label: 'Bold' },
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

export function PropertiesPanel() {
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
    })),
  );

  const sliderActiveRef = useRef(false);

  const page = doc.pagesById[currentPageId];
  const single = nodes.length === 1 ? nodes[0] : null;
  const ids = nodes.map((n) => n.id);
  const bbox = selection.length > 0 ? boundsOfNodes(doc, selection) : null;

  const showFill = single && ['rect', 'ellipse', 'frame', 'path', 'text'].includes(single.type);
  const showStroke = single && ['rect', 'ellipse', 'line', 'path', 'frame'].includes(single.type);
  const showText = single?.type === 'text';
  const showRadius = single && (single.type === 'rect' || single.type === 'frame');
  const showClip = single?.type === 'frame';

  /* ---------------- empty state ---------------- */
  if (nodes.length === 0) {
    return (
      <aside className="flex h-full w-48 flex-col border-l border-[#3E3E3E] bg-[#2C2C2C] sm:w-52 lg:w-60">
        <div className="flex h-9 shrink-0 items-center px-3">
          <span className="iris-section-title text-[11px]">Design</span>
        </div>
        <div className="iris-scroll flex-1 overflow-y-auto">
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
          <Section title="Quick tips">
            <ul className="space-y-1.5 text-[11px] leading-4 text-[#9A9A9A]">
              <li>V Move · F Frame · R Rect · O Ellipse</li>
              <li>L Line · P Pen · T Text · H Hand</li>
              <li>Space + drag to pan · Ctrl + wheel to zoom</li>
              <li>Double-click text or a vector to edit it</li>
              <li>Ctrl + G groups the selection</li>
              <li>Everything is saved locally, automatically</li>
            </ul>
          </Section>
        </div>
      </aside>
    );
  }

  /* ---------------- selection state ---------------- */
  return (
    <aside className="flex h-full w-48 flex-col border-l border-[#3E3E3E] bg-[#2C2C2C] sm:w-52 lg:w-60">
      <div className="flex h-9 shrink-0 items-center px-3">
        <span className="iris-section-title text-[11px]">
          {single ? single.name : `${nodes.length} selected`}
        </span>
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
        </Section>

        {/* Fill */}
        {showFill && single ? (
          <Section title="Fill">
            <ColorField
              value={single.fill}
              ariaLabel="Fill"
              onChange={(v) => actions.updateNodes([single.id], { fill: v }, { history: 'fill' })}
            />
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
                className="data-[state=checked]:bg-[#8B5CF6] data-[state=unchecked]:bg-[#383838]"
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
    </aside>
  );
}
