'use client';

/**
 * Right panel (Figma reference restyle): selection header (type + lock/hide),
 * Position (alignment strip, X/Y, rotation, z-order), Layout (dimensions with
 * proportional lock, frame clip), Appearance (opacity, blend, corner radius /
 * shape counts, star inner radius), Fill (solid + gradient), Stroke, Effects
 * (shadow/blur), arrowheads, text properties, quick export, and document
 * settings when nothing is selected.
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
  AlignHorizontalSpaceAround,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignStartHorizontal,
  AlignStartVertical,
  AlignVerticalDistributeCenter,
  AlignVerticalSpaceAround,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  WrapText,
  X,
  Check,
  ArrowDownToLine,
  ArrowUpToLine,
  FlipHorizontal,
  FlipVertical,
  Eye,
  EyeOff,
  Link2,
  Link2Off,
  Lock,
  Minus,
  Plus,
  RotateCw,
  RotateCcw,
  Trash2,
  Unlock,
  type LucideIcon,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useIris, useSelectedNodes, type AlignMode } from '../engine/store';
import { boundsOfNodes } from '../engine/geometry';
import {
  BLEND_MODES,
  FRAME_PRESETS,
  NODE_TYPE_LABEL,
  OVERLAY_POSITIONS,
  PROTO_ACTIONS,
  PROTO_ANIMATIONS,
  PROTO_EASINGS,
  PROTO_TRIGGERS,
  type ArrowHead,
  type AxisSizing,
  type DashStyle,
  type FrameOverflow,
  type ID,
  type IrisDoc,
  type IrisInteraction,
  type IrisNode,
  type NodeType,
  type OverlayPosition,
  type ProtoAction,
  type ProtoAnimation,
  type ProtoEasing,
  type ProtoTrigger,
  type TextCase,
} from '../engine/model';
import { getRecentColors, getSwatches } from '../engine/colors';
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

/* Prototype (interaction) human labels — shared by selects and summary rows. */
const TRIGGER_LABELS: Record<ProtoTrigger, string> = {
  click: 'On click',
  hover: 'On hover',
  press: 'On press',
  keydown: 'On key',
  delay: 'After delay',
};

const ACTION_LABELS: Record<ProtoAction, string> = {
  navigate: 'Navigate to',
  back: 'Back',
  url: 'Open URL',
  overlay: 'Open overlay',
  'close-overlay': 'Close overlay',
  'scroll-to': 'Scroll to',
};

const ANIMATION_LABELS: Record<ProtoAnimation, string> = {
  instant: 'Instant',
  dissolve: 'Dissolve',
  'smart-animate': 'Smart animate',
  'slide-left': 'Slide left',
  'slide-right': 'Slide right',
  'slide-up': 'Slide up',
  'slide-down': 'Slide down',
  'move-in-left': 'Move in left',
  'move-in-right': 'Move in right',
  'move-in-top': 'Move in top',
  'move-in-bottom': 'Move in bottom',
  'move-out-left': 'Move out left',
  'move-out-right': 'Move out right',
  'move-out-top': 'Move out top',
  'move-out-bottom': 'Move out bottom',
  'push-left': 'Push left',
  'push-right': 'Push right',
  'push-up': 'Push up',
  'push-down': 'Push down',
};

const EASING_LABELS: Record<ProtoEasing, string> = {
  linear: 'Linear',
  'ease-in': 'Ease in',
  'ease-out': 'Ease out',
  'ease-in-out': 'Ease in and out',
  spring: 'Spring',
};

const OVERLAY_POS_LABELS: Record<OverlayPosition, string> = {
  center: 'Center',
  'top-left': 'Top left',
  'top-center': 'Top center',
  'top-right': 'Top right',
  'bottom-left': 'Bottom left',
  'bottom-center': 'Bottom center',
  'bottom-right': 'Bottom right',
  manual: 'Manual',
};

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

const ZORDER_TOOLS: {
  mode: 'front' | 'back' | 'forward' | 'backward';
  label: string;
  Icon: LucideIcon;
}[] = [
  { mode: 'backward', label: 'Send backward — [', Icon: ArrowDown },
  { mode: 'forward', label: 'Bring forward — ]', Icon: ArrowUp },
  { mode: 'back', label: 'Send to back — Ctrl+[', Icon: ArrowDownToLine },
  { mode: 'front', label: 'Bring to front — Ctrl+]', Icon: ArrowUpToLine },
];

/** Selection header label: the node type, capitalized ("Frame", "Path", …). */
const typeLabel = (t: NodeType): string => (t === 'path' ? 'Path' : NODE_TYPE_LABEL[t]);

function Section({
  title,
  action,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#1E1E1E] px-3 py-3">
      {title || action ? (
        <div className="mb-2 flex items-center justify-between gap-1">
          {title ? <div className="text-[12px] font-semibold text-[#E5E5E5]">{title}</div> : null}
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/** Gray 11px label that sits above its control row. */
function RowLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 text-[11px] text-[#9A9A9A]">{children}</div>;
}

/** Collapsible section with a right-aligned + / − indicator (Figma panel style). */
function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#1E1E1E]">
      <button
        type="button"
        className="flex h-9 w-full items-center justify-between gap-1.5 px-3 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-[12px] font-semibold text-[#E5E5E5]">{title}</span>
        <span
          className="flex h-5 w-5 items-center justify-center rounded text-[12px] font-semibold leading-none text-[#9A9A9A] transition-colors hover:bg-[#383838] hover:text-white"
          aria-hidden
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? <div className="px-3 pb-3">{children}</div> : null}
    </div>
  );
}

/** Recent + saved color swatches (re-reads localStorage as the selection changes). */
function StyleSwatches() {
  const selection = useIris((s) => s.selection);
  const updateNodes = useIris((s) => s.updateNodes);
  const hasFillable = useIris((s) => {
    const n = s.doc.nodesById[s.selection[0] ?? ''];
    return !!n && ['rect', 'ellipse', 'frame', 'path', 'text', 'polygon', 'star', 'section'].includes(n.type);
  });
  const colors = useMemo<string[]>(
    () => [...getRecentColors(), ...getSwatches()],
    [selection],
  );

  if (colors.length === 0) {
    return (
      <p className="text-[10px] leading-4 text-[#6F6F6F]">
        Colors you pick appear here. Use the eyedropper (I) or a fill picker to build your palette.
      </p>
    );
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          className="h-6 w-6 rounded-md border border-[#4E4E4E] transition-transform hover:scale-105"
          style={{ background: c }}
          title={hasFillable && selection.length ? `Apply ${c} to fill` : c}
          aria-label={`Swatch ${c}`}
          onClick={() => {
            if (hasFillable && selection.length) updateNodes(selection, { fill: c }, { history: 'fill' });
          }}
        />
      ))}
    </div>
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
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-35',
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

/* ------------------------------------------------------------------ */
/* Auto layout                                                         */
/* ------------------------------------------------------------------ */

/** Fixed / Hug / Fill dropdown attached to a W or H field. */
function SizingMenu({
  mode,
  options,
  onChange,
  label,
}: {
  mode: AxisSizing;
  options: AxisSizing[];
  onChange: (m: AxisSizing) => void;
  label: string;
}) {
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
  const LABEL: Record<AxisSizing, string> = {
    fixed: 'Fixed',
    hug: 'Hug contents',
    fill: 'Fill container',
  };
  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        className="flex h-[26px] w-5 items-center justify-center rounded-md text-[#8B8B8B] transition-colors hover:bg-[#383838] hover:text-white"
        aria-label={`${label} sizing: ${LABEL[mode]}`}
        aria-haspopup="menu"
        aria-expanded={open}
        title={`${label} sizing — ${LABEL[mode]}`}
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronDown size={10} strokeWidth={2.25} aria-hidden />
      </button>
      {open ? (
        <div
          role="menu"
          aria-label={`${label} sizing`}
          className="absolute right-0 top-full z-50 mt-1 w-[150px] rounded-lg border border-[#4E4E4E] bg-[#1E1E1E] py-1 shadow-2xl"
          style={{ animation: 'iris-menu-in 90ms ease-out' }}
        >
          {options.map((o) => (
            <button
              key={o}
              type="button"
              role="menuitemradio"
              aria-checked={o === mode}
              className={`mx-1 flex h-8 w-[calc(100%-8px)] items-center gap-2 rounded-md px-2 text-left text-[12px] transition-colors ${
                o === mode ? 'text-white' : 'text-[#E5E5E5] hover:bg-[#3A3A3A]'
              }`}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
            >
              <span className="flex w-3.5 shrink-0 justify-center" aria-hidden>
                {o === mode ? <Check size={12} strokeWidth={2.5} /> : null}
              </span>
              {LABEL[o]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Auto layout section: direction, gap, padding, align/justify, wrap. */
function AutoLayoutSection({ node }: { node: IrisNode }) {
  const updateAutoLayout = useIris((s) => s.updateAutoLayout);
  const removeAutoLayout = useIris((s) => s.removeAutoLayout);
  const L = node.layout;
  if (!L) return null;
  const horiz = L.mode === 'horizontal';
  const pad = L.padding;

  const justifyIcons = horiz
    ? [AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal, AlignHorizontalSpaceAround]
    : [AlignStartVertical, AlignCenterVertical, AlignEndVertical, AlignVerticalSpaceAround];
  const justifyLabels = horiz
    ? ['Pack start', 'Pack center', 'Pack end', 'Space between']
    : ['Pack top', 'Pack center', 'Pack bottom', 'Space between'];
  const alignIcons = horiz
    ? [AlignStartVertical, AlignCenterVertical, AlignEndVertical]
    : [AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal];
  const alignLabels = horiz
    ? ['Align top', 'Align middle', 'Align bottom']
    : ['Align left', 'Align center', 'Align right'];
  const justifyValues: AutoLayoutJustify[] = ['start', 'center', 'end', 'space-between'];
  const alignValues: AutoLayoutAlign[] = ['start', 'center', 'end'];

  return (
    <Section
      title="Auto layout"
      action={
        <IconBtn label="Remove auto layout — Alt+Shift+A" Icon={X} onClick={removeAutoLayout} />
      }
    >
      <div className="flex flex-col gap-2.5">
        {/* direction */}
        <div className="flex items-center gap-1.5">
          <div className="flex flex-1 rounded-md bg-[#1E1E1E]" role="group" aria-label="Direction">
            <button
              type="button"
              className={cn(
                'flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md text-[11px] transition-colors',
                !horiz ? 'bg-[#474747] text-white' : 'text-[#C9C9C9] hover:bg-[#383838] hover:text-white',
              )}
              aria-pressed={!horiz}
              onClick={() => updateAutoLayout(node.id, { mode: 'vertical' })}
            >
              <ArrowDown size={13} strokeWidth={2} aria-hidden /> Vertical
            </button>
            <button
              type="button"
              className={cn(
                'ml-px flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md text-[11px] transition-colors',
                horiz ? 'bg-[#474747] text-white' : 'text-[#C9C9C9] hover:bg-[#383838] hover:text-white',
              )}
              aria-pressed={horiz}
              onClick={() => updateAutoLayout(node.id, { mode: 'horizontal' })}
            >
              <ArrowRight size={13} strokeWidth={2} aria-hidden /> Horizontal
            </button>
          </div>
          <IconBtn
            label="Wrap children"
            Icon={WrapText}
            active={L.wrap}
            disabled={!horiz}
            onClick={() => updateAutoLayout(node.id, { wrap: !L.wrap })}
          />
        </div>

        {/* gap */}
        <div className={L.wrap && horiz ? 'grid grid-cols-2 gap-1.5' : ''}>
          <div>
            <RowLabel>{L.wrap && horiz ? 'Gap' : 'Gap'}</RowLabel>
            <NumberField
              value={L.gap}
              min={0}
              max={200}
              icon={<span className="text-[10px] font-semibold">⇔</span>}
              ariaLabel="Gap between children"
              onChange={(v) => updateAutoLayout(node.id, { gap: Math.max(0, v) })}
            />
          </div>
          {L.wrap && horiz ? (
            <div>
              <RowLabel>Row gap</RowLabel>
              <NumberField
                value={L.wrapGap}
                min={0}
                max={200}
                icon={<span className="text-[10px] font-semibold">⇕</span>}
                ariaLabel="Gap between wrapped rows"
                onChange={(v) => updateAutoLayout(node.id, { wrapGap: Math.max(0, v) })}
              />
            </div>
          ) : null}
        </div>

        {/* padding */}
        <div>
          <RowLabel>Padding</RowLabel>
          <div className="grid grid-cols-2 gap-1.5">
            <NumberField
              value={pad.top}
              min={0}
              icon={<span className="text-[10px] font-semibold">T</span>}
              ariaLabel="Padding top"
              onChange={(v) => updateAutoLayout(node.id, { padding: { top: Math.max(0, v) } })}
            />
            <NumberField
              value={pad.right}
              min={0}
              icon={<span className="text-[10px] font-semibold">R</span>}
              ariaLabel="Padding right"
              onChange={(v) => updateAutoLayout(node.id, { padding: { right: Math.max(0, v) } })}
            />
            <NumberField
              value={pad.bottom}
              min={0}
              icon={<span className="text-[10px] font-semibold">B</span>}
              ariaLabel="Padding bottom"
              onChange={(v) => updateAutoLayout(node.id, { padding: { bottom: Math.max(0, v) } })}
            />
            <NumberField
              value={pad.left}
              min={0}
              icon={<span className="text-[10px] font-semibold">L</span>}
              ariaLabel="Padding left"
              onChange={(v) => updateAutoLayout(node.id, { padding: { left: Math.max(0, v) } })}
            />
          </div>
        </div>

        {/* align (counter axis) + justify (main axis) */}
        <div>
          <RowLabel>{horiz ? 'Align vertical' : 'Align horizontal'}</RowLabel>
          <div className="flex rounded-md bg-[#1E1E1E]" role="group" aria-label="Counter-axis alignment">
            {alignValues.map((v, i) => (
              <button
                key={v}
                type="button"
                className={cn(
                  'flex h-7 flex-1 items-center justify-center text-[#C9C9C9] transition-colors hover:bg-[#383838] hover:text-white',
                  i > 0 && 'border-l border-[#2A2A2A]',
                  L.align === v && 'bg-[#474747] text-white',
                )}
                title={alignLabels[i]}
                aria-label={alignLabels[i]}
                aria-pressed={L.align === v}
                onClick={() => updateAutoLayout(node.id, { align: v })}
              >
                {(() => {
                  const Icon = alignIcons[i];
                  return <Icon size={13} strokeWidth={1.75} aria-hidden />;
                })()}
              </button>
            ))}
          </div>
        </div>
        <div>
          <RowLabel>{horiz ? 'Justify horizontal' : 'Justify vertical'}</RowLabel>
          <div className="flex rounded-md bg-[#1E1E1E]" role="group" aria-label="Main-axis distribution">
            {justifyValues.map((v, i) => (
              <button
                key={v}
                type="button"
                className={cn(
                  'flex h-7 flex-1 items-center justify-center text-[#C9C9C9] transition-colors hover:bg-[#383838] hover:text-white',
                  i > 0 && 'border-l border-[#2A2A2A]',
                  L.justify === v && 'bg-[#474747] text-white',
                )}
                title={justifyLabels[i]}
                aria-label={justifyLabels[i]}
                aria-pressed={L.justify === v}
                onClick={() => updateAutoLayout(node.id, { justify: v })}
              >
                {(() => {
                  const Icon = justifyIcons[i];
                  return <Icon size={13} strokeWidth={1.75} aria-hidden />;
                })()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

type AutoLayoutJustify = 'start' | 'center' | 'end' | 'space-between';
type AutoLayoutAlign = 'start' | 'center' | 'end';

function DesignTab() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const selection = useIris((s) => s.selection);
  const nodes = useSelectedNodes();
  const [proportional, setProportional] = useState(false);

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
      addAutoLayout: s.addAutoLayout,
      removeAutoLayout: s.removeAutoLayout,
      updateSizing: s.updateSizing,
    })),
  );

  const sliderActiveRef = useRef(false);

  const page = doc.pagesById[currentPageId];
  const single = nodes.length === 1 ? nodes[0] : null;
  const ids = nodes.map((n) => n.id);
  const bbox = selection.length > 0 ? boundsOfNodes(doc, selection) : null;
  const settings = doc.settings;
  const allVisible = nodes.every((n) => n.visible);

  /* auto-layout context */
  const layoutParent = single?.parentId ? doc.nodesById[single.parentId] : undefined;
  const inLayoutPanel = !!layoutParent?.layout;
  const isLayoutFrame = !!single?.layout;
  const showSizingMenus = !!(single && (isLayoutFrame || inLayoutPanel));
  /** effective horizontal sizing (text autoWidth behaves as hug) */
  const effSizingH: AxisSizing =
    single?.type === 'text' && single.autoWidth ? 'hug' : (single?.sizingH ?? 'fixed');
  const wOptions: AxisSizing[] = isLayoutFrame
    ? inLayoutPanel
      ? ['fixed', 'hug', 'fill']
      : ['fixed', 'hug']
    : single?.type === 'text'
      ? ['fixed', 'fill', 'hug']
      : ['fixed', 'fill'];
  const hOptions: AxisSizing[] = isLayoutFrame
    ? inLayoutPanel
      ? ['fixed', 'hug', 'fill']
      : ['fixed', 'hug']
    : ['fixed', 'fill'];

  const FILLABLE = ['rect', 'ellipse', 'frame', 'path', 'text', 'polygon', 'star'];
  const STROKABLE = ['rect', 'ellipse', 'line', 'path', 'frame', 'polygon', 'star', 'arrow'];
  const showFill = single && FILLABLE.includes(single.type);
  const showStroke = single && STROKABLE.includes(single.type);
  const showText = single?.type === 'text';
  const showRadius = single && ['rect', 'frame', 'image', 'section'].includes(single.type);
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
            <div className="mt-2.5">
              <RowLabel>Background</RowLabel>
              <ColorField
                value={settings.bg}
                allowNone={false}
                ariaLabel="Page background"
                onChange={(v) => actions.setSettings({ bg: v ?? '#242424' })}
              />
            </div>
          </Section>

          <Section title="Canvas">
            <div className="flex flex-col gap-2.5">
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
                  <div>
                    <RowLabel>Size</RowLabel>
                    <div className="flex items-center gap-1.5">
                      <NumberField
                        value={settings.grid.size}
                        min={1}
                        max={200}
                        icon={<span className="text-[10px] font-semibold">G</span>}
                        ariaLabel="Grid size"
                        onChange={(v) => actions.setGridSettings({ size: Math.max(1, v) })}
                      />
                      <span className="shrink-0 text-[10px] text-[#6F6F6F]">px</span>
                    </div>
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
                  className="h-8 rounded-md border border-[#1E1E1E] bg-[#1E1E1E] text-[11px] text-[#E5E5E5] transition-colors hover:border-[#0D99FF]"
                  onClick={actions.clearGuides}
                >
                  Clear {settings.guidesX.length + settings.guidesY.length} guide
                  {settings.guidesX.length + settings.guidesY.length === 1 ? '' : 's'}
                </button>
              )}
            </div>
          </Section>

          <CollapsibleSection title="Styles" defaultOpen={false}>
            <StyleSwatches />
          </CollapsibleSection>

          <CollapsibleSection title="Export" defaultOpen={false}>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                className="h-8 rounded-md border border-[#1E1E1E] bg-[#1E1E1E] text-[11px] text-[#E5E5E5] transition-colors hover:border-[#0D99FF]"
                onClick={() => void exportPNG('page', 2)}
              >
                Export page — PNG 2x
              </button>
              <button
                type="button"
                className="h-8 rounded-md border border-[#1E1E1E] bg-[#1E1E1E] text-[11px] text-[#E5E5E5] transition-colors hover:border-[#0D99FF]"
                onClick={() => exportSVG('page')}
              >
                Export page — SVG
              </button>
              <p className="text-[10px] leading-4 text-[#6F6F6F]">
                Select objects to export just those, or open Export… (Ctrl+Shift+E) for full options.
              </p>
            </div>
          </CollapsibleSection>
      </div>
    );
  }

  /* ---------------- selection state ---------------- */
  return (
    <div className="iris-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
      {/* selection header: type name + lock / visibility */}
      <div className="flex h-9 shrink-0 items-center gap-1 px-3">
        <span className="truncate text-[13px] font-semibold text-white">
          {single ? typeLabel(single.type) : `${nodes.length} selected`}
        </span>
        <div className="ml-auto flex shrink-0 items-center gap-0.5">
          <IconBtn
            label={single?.locked ? 'Unlock' : 'Lock'}
            Icon={single?.locked ? Unlock : Lock}
            onClick={actions.toggleLockSelection}
          />
          <IconBtn
            label={allVisible ? 'Hide' : 'Show'}
            Icon={allVisible ? Eye : EyeOff}
            onClick={actions.toggleHideSelection}
          />
        </div>
      </div>

      <div className="iris-scroll flex-1 overflow-y-auto">
        {/* 0 · Auto layout (layout frames only) */}
        {single?.layout ? <AutoLayoutSection node={single} /> : null}

        {/* 1 · Position: alignment, X/Y, rotation, z-order */}
        <Section title="Position">
          <div className="flex flex-col gap-2.5">
            <div>
              <RowLabel>Alignment</RowLabel>
              <div className="flex items-center gap-1.5" role="group" aria-label="Alignment">
                <div className="flex min-w-0 flex-1 rounded-md bg-[#1E1E1E]">
                  {ALIGN_TOOLS.slice(0, 6).map(({ mode, label, Icon }, i) => (
                    <button
                      key={mode}
                      type="button"
                      className={cn(
                        'flex h-7 min-w-0 flex-1 items-center justify-center text-[#C9C9C9] transition-colors hover:bg-[#383838] hover:text-white disabled:pointer-events-none disabled:opacity-35',
                        i > 0 && 'border-l border-[#2A2A2A]',
                      )}
                      title={label}
                      aria-label={label}
                      onClick={() => actions.alignSelection(mode)}
                    >
                      <Icon size={14} strokeWidth={1.75} aria-hidden />
                    </button>
                  ))}
                </div>
                <div className="flex shrink-0 rounded-md bg-[#1E1E1E]">
                  {ALIGN_TOOLS.slice(6).map(({ mode, label, Icon }, i) => (
                    <button
                      key={mode}
                      type="button"
                      disabled={nodes.length < 2}
                      className={cn(
                        'flex h-7 w-7 items-center justify-center text-[#C9C9C9] transition-colors hover:bg-[#383838] hover:text-white disabled:pointer-events-none disabled:opacity-35',
                        i > 0 && 'border-l border-[#2A2A2A]',
                      )}
                      title={label}
                      aria-label={label}
                      onClick={() => actions.alignSelection(mode)}
                    >
                      <Icon size={14} strokeWidth={1.75} aria-hidden />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <RowLabel>Position</RowLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {single ? (
                  <NumberField
                    value={single.x}
                    icon={<span className="text-[10px] font-semibold">X</span>}
                    ariaLabel="X position"
                    disabled={inLayoutPanel}
                    title={inLayoutPanel ? 'Position is controlled by auto layout' : undefined}
                    onChange={(v) => actions.updateNodes([single.id], { x: v }, { history: 'x' })}
                  />
                ) : (
                  <NumberField
                    value={bbox ? Math.round(bbox.x * 100) / 100 : 0}
                    icon={<span className="text-[10px] font-semibold">X</span>}
                    ariaLabel="X position"
                    onChange={(v) => bbox && actions.moveSelectionWorld(v - bbox.x, 0, 'bbox')}
                  />
                )}
                {single ? (
                  <NumberField
                    value={single.y}
                    icon={<span className="text-[10px] font-semibold">Y</span>}
                    ariaLabel="Y position"
                    disabled={inLayoutPanel}
                    title={inLayoutPanel ? 'Position is controlled by auto layout' : undefined}
                    onChange={(v) => actions.updateNodes([single.id], { y: v }, { history: 'y' })}
                  />
                ) : (
                  <NumberField
                    value={bbox ? Math.round(bbox.y * 100) / 100 : 0}
                    icon={<span className="text-[10px] font-semibold">Y</span>}
                    ariaLabel="Y position"
                    onChange={(v) => bbox && actions.moveSelectionWorld(0, v - bbox.y, 'bbox')}
                  />
                )}
              </div>
            </div>

            <div>
              <RowLabel>Rotation</RowLabel>
              <div className="flex items-center gap-1">
                <NumberField
                  value={single ? single.rotation : 0}
                  min={-360}
                  max={360}
                  disabled={!single}
                  title={single ? undefined : 'Rotation applies to a single object'}
                  icon={<RotateCw size={11} strokeWidth={2} aria-hidden />}
                  ariaLabel="Rotation"
                  onChange={(v) =>
                    single && actions.updateNodes([single.id], { rotation: v }, { history: 'rotation' })
                  }
                />
                <IconBtn
                  label="Flip horizontal — Shift+H"
                  Icon={FlipHorizontal}
                  onClick={() => actions.flipSelection('h')}
                />
                <IconBtn
                  label="Flip vertical — Shift+V"
                  Icon={FlipVertical}
                  onClick={() => actions.flipSelection('v')}
                />
                <IconBtn
                  label="Rotate 90° counter-clockwise"
                  Icon={RotateCcw}
                  onClick={() => actions.rotateSelectionBy(-90)}
                />
                <IconBtn
                  label="Rotate 90° clockwise"
                  Icon={RotateCw}
                  onClick={() => actions.rotateSelectionBy(90)}
                />
              </div>
            </div>

            <div className="h-px bg-[#1E1E1E]" aria-hidden />
            <div className="flex rounded-md bg-[#1E1E1E]" role="group" aria-label="Z-order">
              {ZORDER_TOOLS.map(({ mode, label, Icon }, i) => (
                <button
                  key={mode}
                  type="button"
                  className={cn(
                    'flex h-7 flex-1 items-center justify-center text-[#C9C9C9] transition-colors hover:bg-[#383838] hover:text-white',
                    i > 0 && 'border-l border-[#2A2A2A]',
                  )}
                  title={label}
                  aria-label={label}
                  onClick={() => actions.zorder(mode)}
                >
                  <Icon size={14} strokeWidth={1.75} aria-hidden />
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* 2 · Layout: dimensions (+ proportional lock), frame clip */}
        <Section title="Layout">
          {single && (single.type === 'frame' || single.type === 'group') && !single.layout ? (
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[11px] text-[#E5E5E5]">Auto layout</span>
              <IconBtn label="Add auto layout — Shift+A" Icon={Plus} onClick={actions.addAutoLayout} />
            </div>
          ) : null}
          <div>
            <RowLabel>Dimensions</RowLabel>
            <div className="flex items-center gap-1.5">
              {single ? (
                <NumberField
                  value={single.w}
                  min={0}
                  icon={<span className="text-[10px] font-semibold">W</span>}
                  ariaLabel="Width"
                  disabled={
                    (single.type === 'text' && single.autoWidth) ||
                    single.sizingH === 'fill' ||
                    (isLayoutFrame && single.sizingH === 'hug')
                  }
                  title={
                    single.sizingH === 'fill'
                      ? 'Width fills the container'
                      : isLayoutFrame && single.sizingH === 'hug'
                        ? 'Width hugs the content'
                        : undefined
                  }
                  onChange={(v) => {
                    const w = Math.max(1, v);
                    const h =
                      proportional && single.type !== 'text' && single.w !== 0
                        ? Math.max(1, Math.round((w * single.h) / single.w))
                        : single.h;
                    if (single.sizingH === 'fill' || single.sizingH === 'hug') {
                      actions.updateNodes([single.id], { sizingH: 'fixed' }, { history: 'sizing' });
                    }
                    actions.setNodeRect(single.id, { x: single.x, y: single.y, w, h }, { history: 'wh' });
                  }}
                />
              ) : (
                <NumberField
                  value={bbox ? Math.round(bbox.w * 100) / 100 : 0}
                  min={1}
                  icon={<span className="text-[10px] font-semibold">W</span>}
                  ariaLabel="Width"
                  disabled={!bbox}
                  onChange={(v) => {
                    const w = Math.max(1, v);
                    const h =
                      proportional && bbox && bbox.w !== 0
                        ? Math.max(1, Math.round((w * bbox.h) / bbox.w))
                        : (bbox?.h ?? 1);
                    actions.resizeSelectionBox(w, h);
                  }}
                />
              )}
              {showSizingMenus && single ? (
                <SizingMenu
                  mode={effSizingH}
                  options={wOptions}
                  label="Width"
                  onChange={(m) => actions.updateSizing([single.id], 'h', m)}
                />
              ) : null}
              {single ? (
                <NumberField
                  value={single.h}
                  min={0}
                  icon={<span className="text-[10px] font-semibold">H</span>}
                  ariaLabel="Height"
                  disabled={
                    single.type === 'text' ||
                    single.sizingV === 'fill' ||
                    (isLayoutFrame && single.sizingV === 'hug')
                  }
                  title={
                    single.type === 'text'
                      ? 'Text height is automatic'
                      : single.sizingV === 'fill'
                        ? 'Height fills the container'
                        : isLayoutFrame && single.sizingV === 'hug'
                          ? 'Height hugs the content'
                          : undefined
                  }
                  onChange={(v) => {
                    const h = Math.max(1, v);
                    const w =
                      proportional && single.h !== 0
                        ? Math.max(1, Math.round((h * single.w) / single.h))
                        : single.w;
                    if (single.sizingV === 'fill' || single.sizingV === 'hug') {
                      actions.updateNodes([single.id], { sizingV: 'fixed' }, { history: 'sizing' });
                    }
                    actions.setNodeRect(single.id, { x: single.x, y: single.y, w, h }, { history: 'wh' });
                  }}
                />
              ) : (
                <NumberField
                  value={bbox ? Math.round(bbox.h * 100) / 100 : 0}
                  min={1}
                  icon={<span className="text-[10px] font-semibold">H</span>}
                  ariaLabel="Height"
                  disabled={!bbox}
                  onChange={(v) => {
                    const h = Math.max(1, v);
                    const w =
                      proportional && bbox && bbox.h !== 0
                        ? Math.max(1, Math.round((h * bbox.w) / bbox.h))
                        : (bbox?.w ?? 1);
                    actions.resizeSelectionBox(w, h);
                  }}
                />
              )}
              {showSizingMenus && single ? (
                <SizingMenu
                  mode={single.sizingV}
                  options={hOptions}
                  label="Height"
                  onChange={(m) => actions.updateSizing([single.id], 'v', m)}
                />
              ) : null}
              <button
                type="button"
                className={cn(
                  'flex h-[26px] w-7 shrink-0 items-center justify-center rounded-md transition-colors',
                  proportional
                    ? 'bg-[#474747] text-white'
                    : 'text-[#9A9A9A] hover:bg-[#383838] hover:text-white',
                )}
                aria-pressed={proportional}
                aria-label={proportional ? 'Disable proportional scaling' : 'Enable proportional scaling'}
                title="Proportional scale"
                onClick={() => setProportional((p) => !p)}
              >
                {proportional ? (
                  <Link2 size={13} strokeWidth={2} aria-hidden />
                ) : (
                  <Link2Off size={13} strokeWidth={2} aria-hidden />
                )}
              </button>
            </div>
          </div>
          {showClip && single ? (
            <div className="mt-2.5">
              <RowLabel>Overflow</RowLabel>
              <select
                className="iris-select"
                aria-label="Frame overflow"
                value={single.overflow}
                onChange={(e) => {
                  const v = e.target.value as FrameOverflow;
                  actions.updateNodes([single.id], { overflow: v, clip: v !== 'visible' }, { history: 'overflow' });
                }}
              >
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
                <option value="scroll">Scroll</option>
              </select>
              <p className="mt-1 text-[10px] leading-4 text-[#6F6F6F]">Scroll frames scroll in the prototype.</p>
            </div>
          ) : null}
        </Section>

        {/* 3 · Appearance: opacity + blend, corner radius / shape counts */}
        <Section title="Appearance">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <RowLabel>Opacity</RowLabel>
              <NumberField
                value={Math.round((single ? single.opacity : 1) * 100)}
                min={0}
                max={100}
                icon={<span className="text-[10px] font-semibold">%</span>}
                ariaLabel="Opacity percent"
                onChange={(v) => actions.updateNodes(ids, { opacity: v / 100 }, { history: 'opacity' })}
              />
            </div>
            {showRadius && single ? (
              <div>
                <RowLabel>Corner radius</RowLabel>
                <NumberField
                  value={single.cornerRadius}
                  min={0}
                  icon={<span className="text-[10px] font-semibold">⌒</span>}
                  ariaLabel="Corner radius"
                  onChange={(v) =>
                    actions.updateNodes([single.id], { cornerRadius: Math.max(0, v) }, { history: 'radius' })
                  }
                />
              </div>
            ) : showPolygon && single ? (
              <div>
                <RowLabel>Count</RowLabel>
                <NumberField
                  value={single.sides}
                  min={3}
                  max={24}
                  step={1}
                  icon={<span className="text-[10px] font-semibold">N</span>}
                  ariaLabel="Sides"
                  onChange={(v) =>
                    actions.updateNodes(
                      [single.id],
                      { sides: Math.min(24, Math.max(3, Math.round(v))) },
                      { history: 'sides' },
                    )
                  }
                />
              </div>
            ) : showStar && single ? (
              <div>
                <RowLabel>Count</RowLabel>
                <NumberField
                  value={single.starPoints}
                  min={3}
                  max={24}
                  step={1}
                  icon={<span className="text-[10px] font-semibold">N</span>}
                  ariaLabel="Points"
                  onChange={(v) =>
                    actions.updateNodes(
                      [single.id],
                      { starPoints: Math.min(24, Math.max(3, Math.round(v))) },
                      { history: 'points' },
                    )
                  }
                />
              </div>
            ) : null}
          </div>
          <div className="mt-2">
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
          {showStar && single ? (
            <div className="mt-2">
              <RowLabel>Inner radius</RowLabel>
              <div className="flex items-center gap-2">
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
          ) : null}
        </Section>

        {/* 4 · Fill (solid + gradient) */}
        {showFill && single ? (
          <Section
            title="Fill"
            action={
              <button
                type="button"
                className="flex h-5 w-5 items-center justify-center rounded text-[#9A9A9A] transition-colors hover:bg-[#383838] hover:text-white"
                aria-label="Add fill"
                title="Add fill"
                onClick={() =>
                  actions.updateNodes([single.id], { fill: single.fill ?? '#D9D9D9' }, { history: 'fill' })
                }
              >
                <Plus size={12} strokeWidth={2} aria-hidden />
              </button>
            }
          >
            <div className="flex items-center gap-1">
              <div className="min-w-0 flex-1">
                <ColorField
                  value={single.fill}
                  ariaLabel="Fill"
                  onChange={(v) => actions.updateNodes([single.id], { fill: v }, { history: 'fill' })}
                />
              </div>
              <IconBtn
                label={allVisible ? 'Hide' : 'Show'}
                Icon={allVisible ? Eye : EyeOff}
                onClick={actions.toggleHideSelection}
              />
              {single.fill !== null ? (
                <IconBtn
                  label="Remove fill"
                  Icon={Minus}
                  onClick={() => actions.updateNodes([single.id], { fill: null }, { history: 'fill' })}
                />
              ) : null}
            </div>
            <div className="mt-2.5 rounded-md border border-[#1E1E1E] p-2">
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
                    <NumberField
                      value={single.fillGradient.angle}
                      min={-360}
                      max={360}
                      icon={<span className="text-[10px] font-semibold">∠</span>}
                      ariaLabel="Gradient angle"
                      onChange={(v) =>
                        actions.updateNodes(
                          [single.id],
                          { fillGradient: { ...single.fillGradient!, angle: v } },
                          { history: 'gradient' },
                        )
                      }
                    />
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

        {/* 5 · Stroke */}
        {showStroke && single ? (
          <CollapsibleSection key={`stroke-${single.id}`} title="Stroke" defaultOpen={single.stroke !== null}>
            <div className="flex flex-col gap-1.5">
              <ColorField
                value={single.stroke}
                ariaLabel="Stroke"
                onChange={(v) => actions.updateNodes([single.id], { stroke: v }, { history: 'stroke' })}
              />
              <div className="grid grid-cols-2 gap-1.5">
                <NumberField
                  value={single.strokeWidth}
                  min={0}
                  max={100}
                  icon={<span className="text-[10px] font-semibold">W</span>}
                  ariaLabel="Stroke weight"
                  onChange={(v) =>
                    actions.updateNodes([single.id], { strokeWidth: Math.max(0, v) }, { history: 'strokeW' })
                  }
                />
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
          </CollapsibleSection>
        ) : null}

        {/* 6 · Effects: drop shadow + layer blur */}
        {single ? (
          <CollapsibleSection key={`fx-${single.id}`} title="Effects" defaultOpen={!!single.shadow || single.blur > 0}>
            <div className="flex flex-col gap-2.5">
              <div className="rounded-md border border-[#1E1E1E] p-2">
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
                    <NumberField
                      value={single.shadow.x}
                      icon={<span className="text-[10px] font-semibold">X</span>}
                      ariaLabel="Shadow X"
                      onChange={(v) =>
                        actions.updateNodes(
                          [single.id],
                          { shadow: { ...single.shadow!, x: v } },
                          { history: 'shadow' },
                        )
                      }
                    />
                    <NumberField
                      value={single.shadow.y}
                      icon={<span className="text-[10px] font-semibold">Y</span>}
                      ariaLabel="Shadow Y"
                      onChange={(v) =>
                        actions.updateNodes(
                          [single.id],
                          { shadow: { ...single.shadow!, y: v } },
                          { history: 'shadow' },
                        )
                      }
                    />
                    <NumberField
                      value={single.shadow.blur}
                      min={0}
                      icon={<span className="text-[10px] font-semibold">B</span>}
                      ariaLabel="Shadow blur"
                      onChange={(v) =>
                        actions.updateNodes(
                          [single.id],
                          { shadow: { ...single.shadow!, blur: Math.max(0, v) } },
                          { history: 'shadow' },
                        )
                      }
                    />
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
              <div>
                <RowLabel>Layer blur</RowLabel>
                <NumberField
                  value={single.blur}
                  min={0}
                  max={100}
                  ariaLabel="Layer blur"
                  onChange={(v) => actions.updateNodes([single.id], { blur: Math.max(0, v) }, { history: 'blur' })}
                />
              </div>
            </div>
          </CollapsibleSection>
        ) : null}

        {/* 7 · Arrowheads */}
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

        {/* 8 · Text */}
        {showText && single ? (
          <Section title="Text">
            <div className="flex flex-col gap-2">
              <RowLabel>Typography</RowLabel>
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
                <NumberField
                  value={single.fontSize}
                  min={1}
                  icon={<span className="text-[10px] font-semibold">Aa</span>}
                  ariaLabel="Font size"
                  onChange={(v) => actions.updateNodes([single.id], { fontSize: Math.max(1, v) }, { history: 'font' })}
                />
                <NumberField
                  value={single.lineHeight}
                  min={0.5}
                  step={0.05}
                  icon={<span className="text-[10px] font-semibold">LH</span>}
                  ariaLabel="Line height"
                  onChange={(v) =>
                    actions.updateNodes([single.id], { lineHeight: Math.max(0.5, v) }, { history: 'lh' })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
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
              <div className="flex items-center gap-1.5">
                <NumberField
                  value={single.letterSpacing}
                  step={0.1}
                  icon={<span className="text-[10px] font-semibold">A|A</span>}
                  ariaLabel="Letter spacing"
                  onChange={(v) =>
                    actions.updateNodes([single.id], { letterSpacing: v }, { history: 'spacing' })
                  }
                />
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

        {/* 9 · Export */}
        <CollapsibleSection key={`export-${ids.join(',')}`} title="Export" defaultOpen={false}>
          <div>
            <div className="flex gap-1.5">
              <button
                type="button"
                className="h-8 flex-1 rounded-md border border-[#1E1E1E] bg-[#1E1E1E] text-[11px] text-[#E5E5E5] transition-colors hover:border-[#0D99FF]"
                onClick={() => void exportPNG('selection', 1)}
              >
                PNG 1x
              </button>
              <button
                type="button"
                className="h-8 flex-1 rounded-md border border-[#1E1E1E] bg-[#1E1E1E] text-[11px] text-[#E5E5E5] transition-colors hover:border-[#0D99FF]"
                onClick={() => void exportPNG('selection', 2)}
              >
                PNG 2x
              </button>
              <button
                type="button"
                className="h-8 flex-1 rounded-md border border-[#1E1E1E] bg-[#1E1E1E] text-[11px] text-[#E5E5E5] transition-colors hover:border-[#0D99FF]"
                onClick={() => exportSVG('selection')}
              >
                SVG
              </button>
            </div>
            <p className="mt-1.5 text-[10px] text-[#6F6F6F]">Exports the current selection</p>
          </div>
        </CollapsibleSection>
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
                className="flex h-8 items-center justify-between rounded-md border border-[#1E1E1E] bg-[#1E1E1E] px-2.5 text-[11px] text-[#E5E5E5] transition-colors hover:border-[#0D99FF]"
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

/* ------------------------------------------------------------------ */
/* Prototype tab: interactions on the selection, flows, presenting     */
/* ------------------------------------------------------------------ */

/** Top-level frames of a page — prototype destinations and flow starts. */
function pageFrames(doc: IrisDoc, pageId: ID): IrisNode[] {
  const page = doc.pagesById[pageId];
  return (page?.nodeIds ?? [])
    .map((id) => doc.nodesById[id])
    .filter((n): n is IrisNode => !!n && n.type === 'frame');
}

/** Does this action need a destination node (navigate / overlay / scroll-to)? */
function needsDestination(action: ProtoAction): boolean {
  return action === 'navigate' || action === 'overlay' || action === 'scroll-to';
}

/** Human trigger text for an interaction summary row. */
function triggerSummary(ix: IrisInteraction): string {
  if (ix.trigger === 'keydown') return `On key (${ix.key ?? '—'})`;
  if (ix.trigger === 'delay') return `After ${ix.delayMs} ms`;
  return TRIGGER_LABELS[ix.trigger];
}

/** Tail of a summary row: destination / URL value, or a red "None" when missing. */
function interactionTail(doc: IrisDoc, ix: IrisInteraction): { text: string; missing: boolean } {
  if (ix.action === 'url') {
    return ix.url ? { text: ix.url, missing: false } : { text: 'None', missing: true };
  }
  if (!needsDestination(ix.action)) return { text: '', missing: false };
  const dest = ix.destinationId ? doc.nodesById[ix.destinationId] : undefined;
  return dest ? { text: `“${dest.name}”`, missing: false } : { text: 'None', missing: true };
}

/** Read-only input that binds the next non-modifier keypress (Escape clears). */
function KeyCapture({ value, onChange }: { value: string | null; onChange: (key: string | null) => void }) {
  return (
    <input
      className="iris-input"
      readOnly
      value={value ?? ''}
      placeholder="Press a key"
      aria-label="Interaction key"
      title="Press any key to bind — Escape clears"
      onKeyDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'Escape') onChange(null);
        else if (!['Shift', 'Control', 'Alt', 'Meta', 'Tab'].includes(e.key)) onChange(e.key);
      }}
    />
  );
}

/** Compact interaction summary row: click to select (expand), trash to remove. */
function InteractionRow({ node, ix, active }: { node: IrisNode; ix: IrisInteraction; active: boolean }) {
  const doc = useIris((s) => s.doc);
  const removeInteraction = useIris((s) => s.removeInteraction);
  const setActiveInteractionId = useIris((s) => s.setActiveInteractionId);
  const tail = interactionTail(doc, ix);
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className={cn(
          'flex h-8 min-w-0 flex-1 items-center rounded-md border px-2.5 text-left text-[11px] transition-colors',
          active
            ? 'border-[#0D99FF] bg-[rgba(13,153,255,0.08)] text-white'
            : 'border-[#3E3E3E] bg-[#1E1E1E] text-[#E5E5E5] hover:border-[#0D99FF]',
        )}
        aria-pressed={active}
        title={`${triggerSummary(ix)} → ${ACTION_LABELS[ix.action]}${tail.text ? ` ${tail.text}` : ''}`}
        onClick={() => setActiveInteractionId(active ? null : ix.id)}
      >
        <span className="truncate">
          {triggerSummary(ix)}
          <span className="text-[#6F6F6F]" aria-hidden>
            {' '}
            →{' '}
          </span>
          {ACTION_LABELS[ix.action]}
          {tail.text ? (
            tail.missing ? (
              <span className="text-[#F24822]"> {tail.text}</span>
            ) : (
              <span> {tail.text}</span>
            )
          ) : null}
        </span>
      </button>
      <button
        type="button"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#9A9A9A] transition-colors hover:bg-[#383838] hover:text-[#F24822]"
        aria-label={`Remove interaction: ${ACTION_LABELS[ix.action]}`}
        title="Remove interaction"
        onClick={(e) => {
          e.stopPropagation();
          removeInteraction(node.id, ix.id);
        }}
      >
        <Trash2 size={12} strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}

/** Figma-style "Interaction details" card for the active interaction.
 *  Remounts per interaction (keyed by ix.id), so uncontrolled inputs below
 *  always start from the current interaction value. */
function InteractionDetails({ node, ix }: { node: IrisNode; ix: IrisInteraction }) {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const updateInteraction = useIris((s) => s.updateInteraction);
  const set = (patch: Partial<IrisInteraction>): void => updateInteraction(node.id, ix.id, patch);

  /* destination options: top-level frames (label w/ size); in scroll-to mode
     also their direct children, one level deep, prefixed with ↳ */
  const scrollMode = ix.action === 'scroll-to';
  const destOptions: { id: ID; label: string }[] = [];
  for (const f of pageFrames(doc, currentPageId)) {
    destOptions.push({ id: f.id, label: `${f.name} (${Math.round(f.w)}×${Math.round(f.h)})` });
    if (scrollMode) {
      for (const childId of f.children) {
        const c = doc.nodesById[childId];
        if (c) destOptions.push({ id: c.id, label: `↳ ${c.name}` });
      }
    }
  }
  /* keep a deeper/legacy destination selectable */
  const currentDest = ix.destinationId ? doc.nodesById[ix.destinationId] : undefined;
  if (currentDest && !destOptions.some((o) => o.id === currentDest.id)) {
    destOptions.push({ id: currentDest.id, label: currentDest.name });
  }

  return (
    <div className="mt-2 flex flex-col gap-2 rounded-lg border border-[#3E3E3E] bg-[#1E1E1E] p-2.5">
      {/* 1 · trigger */}
      <div>
        <RowLabel>Trigger</RowLabel>
        <select
          className="iris-select"
          aria-label="Interaction trigger"
          value={ix.trigger}
          onChange={(e) => set({ trigger: e.target.value as ProtoTrigger })}
        >
          {PROTO_TRIGGERS.map((t) => (
            <option key={t} value={t}>
              {TRIGGER_LABELS[t]}
            </option>
          ))}
        </select>
        {ix.trigger === 'keydown' ? (
          <div className="mt-1.5">
            <KeyCapture value={ix.key} onChange={(key) => set({ key })} />
          </div>
        ) : null}
        {ix.trigger === 'delay' ? (
          <div className="mt-1.5 flex items-center gap-1.5">
            <NumberField
              value={ix.delayMs}
              min={0}
              max={60000}
              step={50}
              icon={<span className="text-[10px] font-semibold">ms</span>}
              ariaLabel="Trigger delay in milliseconds"
              onChange={(v) => set({ delayMs: v })}
            />
            <span className="shrink-0 text-[10px] text-[#6F6F6F]">delay</span>
          </div>
        ) : null}
      </div>

      {/* 2 · action */}
      <div>
        <RowLabel>Action</RowLabel>
        <select
          className="iris-select"
          aria-label="Interaction action"
          value={ix.action}
          onChange={(e) => set({ action: e.target.value as ProtoAction })}
        >
          {PROTO_ACTIONS.map((a) => (
            <option key={a} value={a}>
              {ACTION_LABELS[a]}
            </option>
          ))}
        </select>
        {ix.action === 'url' ? (
          <input
            className="iris-input mt-1.5"
            defaultValue={ix.url ?? ''}
            placeholder="https://"
            aria-label="Interaction URL"
            spellCheck={false}
            onBlur={(e) => {
              const v = e.target.value.trim();
              if (v !== (ix.url ?? '')) set({ url: v || null });
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
            }}
          />
        ) : null}
      </div>

      {/* 3 · destination */}
      {needsDestination(ix.action) ? (
        <div>
          <RowLabel>{scrollMode ? 'Target' : 'Destination'}</RowLabel>
          <select
            className="iris-select"
            aria-label={scrollMode ? 'Scroll target' : 'Destination frame'}
            value={ix.destinationId ?? ''}
            onChange={(e) => set({ destinationId: e.target.value || null })}
          >
            <option value="">None</option>
            {destOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {/* 4 · overlay settings */}
      {ix.action === 'overlay' ? (
        <div className="flex flex-col gap-2">
          <div>
            <RowLabel>Position</RowLabel>
            <select
              className="iris-select"
              aria-label="Overlay position"
              value={ix.overlayPos}
              onChange={(e) => set({ overlayPos: e.target.value as OverlayPosition })}
            >
              {OVERLAY_POSITIONS.map((p) => (
                <option key={p} value={p}>
                  {OVERLAY_POS_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
          {ix.overlayPos === 'manual' ? (
            <div className="grid grid-cols-2 gap-1.5">
              <NumberField
                value={ix.overlayX}
                icon={<span className="text-[10px] font-semibold">X</span>}
                ariaLabel="Overlay X offset"
                onChange={(v) => set({ overlayX: v })}
              />
              <NumberField
                value={ix.overlayY}
                icon={<span className="text-[10px] font-semibold">Y</span>}
                ariaLabel="Overlay Y offset"
                onChange={(v) => set({ overlayY: v })}
              />
            </div>
          ) : null}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#C9C9C9]">Close when clicking outside</span>
            <Switch
              checked={ix.overlayCloseOutside}
              aria-label="Close overlay when clicking outside"
              className="data-[state=checked]:bg-[#0D99FF] data-[state=unchecked]:bg-[#383838]"
              onCheckedChange={(v) => set({ overlayCloseOutside: v })}
            />
          </div>
          <div>
            <RowLabel>Background</RowLabel>
            <ColorField
              value={ix.overlayBg}
              ariaLabel="Overlay background"
              onChange={(v) => set({ overlayBg: v })}
            />
          </div>
        </div>
      ) : null}

      {/* 5 · animation */}
      <div>
        <RowLabel>Animation</RowLabel>
        <select
          className="iris-select"
          aria-label="Transition animation"
          value={ix.animation}
          onChange={(e) => set({ animation: e.target.value as ProtoAnimation })}
        >
          {PROTO_ANIMATIONS.map((a) => (
            <option key={a} value={a}>
              {ANIMATION_LABELS[a]}
            </option>
          ))}
        </select>
      </div>

      {/* 6 · duration + easing (hidden for instant transitions) */}
      {ix.animation !== 'instant' ? (
        <div>
          <RowLabel>Duration</RowLabel>
          <div className="grid grid-cols-2 gap-1.5">
            <NumberField
              value={ix.durationMs}
              min={0}
              max={10000}
              step={50}
              icon={<span className="text-[10px] font-semibold">ms</span>}
              ariaLabel="Animation duration in milliseconds"
              onChange={(v) => set({ durationMs: v })}
            />
            <select
              className="iris-select"
              aria-label="Easing"
              value={ix.easing}
              onChange={(e) => set({ easing: e.target.value as ProtoEasing })}
            >
              {PROTO_EASINGS.map((es) => (
                <option key={es} value={es}>
                  {EASING_LABELS[es]}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Prototype "Interactions" section for the single selected node. */
function InteractionsSection({ node }: { node: IrisNode }) {
  const addInteraction = useIris((s) => s.addInteraction);
  const activeInteractionId = useIris((s) => s.activeInteractionId);
  const active = node.interactions.find((ix) => ix.id === activeInteractionId) ?? null;

  return (
    <Section
      title="Interactions"
      action={<IconBtn label="Add interaction" Icon={Plus} onClick={() => addInteraction(node.id)} />}
    >
      {node.interactions.length === 0 ? (
        <p className="text-[11px] leading-5 text-[#6F6F6F]">
          No interactions yet. Drag the connector node on canvas, or press + to add one.
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {node.interactions.map((ix) => (
            <InteractionRow key={ix.id} node={node} ix={ix} active={ix.id === activeInteractionId} />
          ))}
        </div>
      )}
      {active ? <InteractionDetails key={active.id} node={node} ix={active} /> : null}
    </Section>
  );
}

/** Prototype "Flow" section: starting point of the selected top-level frame
 *  plus every flow on the current page. */
function FlowSection() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const nodes = useSelectedNodes();
  const setFlowStart = useIris((s) => s.setFlowStart);
  const removeFlow = useIris((s) => s.removeFlow);
  const renameFlow = useIris((s) => s.renameFlow);
  const setSelection = useIris((s) => s.setSelection);
  const setPresenting = useIris((s) => s.setPresenting);

  const single = nodes.length === 1 ? nodes[0] : null;
  const isTopFrame = !!single && single.type === 'frame' && single.parentId === null;
  const flows = doc.flows.filter((f) => f.pageId === currentPageId);
  const ownFlow = isTopFrame && single ? flows.find((f) => f.startNodeId === single.id) : undefined;

  return (
    <Section title="Flow">
      {isTopFrame && single ? (
        ownFlow ? (
          <div className="mb-2 flex flex-col gap-1">
            <input
              key={ownFlow.id}
              className="h-7 w-full rounded-md border border-[#3E3E3E] bg-[#1E1E1E] px-2 text-[11px] text-[#E5E5E5] outline-none focus:border-[#0D99FF]"
              defaultValue={ownFlow.name}
              aria-label="Flow name"
              spellCheck={false}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v && v !== ownFlow.name) renameFlow(ownFlow.id, v);
                else e.target.value = ownFlow.name;
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  (e.target as HTMLInputElement).blur();
                } else if (e.key === 'Escape') {
                  e.currentTarget.value = ownFlow.name;
                  (e.target as HTMLInputElement).blur();
                }
              }}
            />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] text-[#6F6F6F]">
                <Play size={10} strokeWidth={0} fill="currentColor" className="text-[#0D99FF]" aria-hidden />
                Flow starting point
              </span>
              <button
                type="button"
                className="text-[11px] text-[#9A9A9A] transition-colors hover:text-[#F24822]"
                aria-label={`Remove flow ${ownFlow.name}`}
                onClick={() => removeFlow(ownFlow.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="mb-2 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-[#3E3E3E] bg-[#1E1E1E] text-[11px] text-[#E5E5E5] transition-colors hover:border-[#0D99FF]"
            onClick={() => setFlowStart(single.id)}
          >
            <Plus size={12} strokeWidth={2} aria-hidden />
            Set as starting point
          </button>
        )
      ) : null}

      {flows.length === 0 ? (
        <p className="text-[11px] leading-5 text-[#6F6F6F]">
          No flows yet. Select a top-level frame and set it as a starting point.
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {flows.map((flow) => {
            const startFrame = doc.nodesById[flow.startNodeId];
            return (
              <div key={flow.id} className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex h-8 min-w-0 flex-1 items-center gap-1.5 rounded-md px-1.5 text-left text-[11px] text-[#E5E5E5] transition-colors hover:bg-[#383838]"
                  title={`Select ${startFrame?.name ?? 'start frame'}`}
                  aria-label={`Flow ${flow.name} — select start frame ${startFrame?.name ?? ''}`.trim()}
                  onClick={() => setSelection([flow.startNodeId])}
                >
                  <Play
                    size={10}
                    strokeWidth={0}
                    fill="currentColor"
                    className="shrink-0 text-[#0D99FF]"
                    aria-hidden
                  />
                  <span className="shrink-0 truncate font-medium">{flow.name}</span>
                  {startFrame ? <span className="min-w-0 truncate text-[10px] text-[#6F6F6F]">{startFrame.name}</span> : null}
                </button>
                <IconBtn
                  label={`Present flow ${flow.name}`}
                  Icon={Play}
                  onClick={() => setPresenting(true, flow.startNodeId)}
                />
                <button
                  type="button"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#9A9A9A] transition-colors hover:bg-[#383838] hover:text-[#F24822]"
                  aria-label={`Remove flow ${flow.name}`}
                  title="Remove flow"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFlow(flow.id);
                  }}
                >
                  <Trash2 size={12} strokeWidth={1.75} aria-hidden />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

/** Prototype "Present" section: launch presentation + connection visibility. */
function PresentSection() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const setPresenting = useIris((s) => s.setPresenting);
  const connections = useIris((s) => s.viewFlags.connections);
  const setViewFlag = useIris((s) => s.setViewFlag);
  const firstFlow = doc.flows.find((f) => f.pageId === currentPageId);

  return (
    <Section title="Present">
      <button
        type="button"
        className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#0D99FF] text-[12px] font-semibold text-white transition-colors hover:bg-[#0B87E0]"
        onClick={() => setPresenting(true, firstFlow?.startNodeId ?? null)}
      >
        <Play size={13} strokeWidth={2.2} aria-hidden />
        Present
      </button>
      <p className="mt-2 text-[10px] leading-4 text-[#6F6F6F]">
        Play your prototype: click hotspots to navigate. Esc exits, R restarts. Ctrl+Enter anywhere.
      </p>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[11px] text-[#C9C9C9]">
          Show connections <span className="text-[10px] text-[#6F6F6F]">· Shift+E</span>
        </span>
        <Switch
          checked={connections}
          aria-label="Show prototype connections"
          className="data-[state=checked]:bg-[#0D99FF] data-[state=unchecked]:bg-[#383838]"
          onCheckedChange={(v) => setViewFlag('connections', v)}
        />
      </div>
    </Section>
  );
}

/** Prototype tab: interactions on the selection + flows + presenting. */
function PrototypeTab() {
  const nodes = useSelectedNodes();
  const single = nodes.length === 1 ? nodes[0] : null;

  return (
    <div className="iris-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
      {single ? (
        <InteractionsSection node={single} />
      ) : (
        <Section>
          <p className="text-[11px] leading-5 text-[#6F6F6F]">Select a layer to author interactions.</p>
        </Section>
      )}
      <FlowSection />
      <PresentSection />
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
            className={cn(
              'h-7 rounded-md px-2.5 text-[11px] font-semibold capitalize transition-colors',
              rightTab === t ? 'bg-[#1E1E1E] text-white' : 'text-[#9A9A9A] hover:text-white',
            )}
            onClick={() => setRightTab(t)}
          >
            {t}
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
