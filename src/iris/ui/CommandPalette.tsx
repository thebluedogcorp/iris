'use client';

/**
 * Actions menu / command palette (Figma Ctrl+K).
 *
 * Searchable list of every tool, edit, object, layout, view and canvas
 * command. Opens from the toolbar Actions button or Ctrl/Cmd+K.
 */

import { useEffect } from 'react';
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignHorizontalDistributeCenter,
  AlignStartHorizontal,
  AlignStartVertical,
  AlignVerticalDistributeCenter,
  ArrowDown,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUp,
  ArrowUpToLine,
  Braces,
  Circle,
  Clipboard,
  ClipboardPaste,
  Copy,
  Code2,
  Eye,
  EyeOff,
  FilePlus2,
  FolderOpen,
  Frame,
  Grid3x3,
  Group,
  Hand,
  Hexagon,
  Home,
  ImagePlus,
  Layers,
  LayoutPanelLeft,
  Lock,
  LockOpen,
  MessageCircle,
  Minus,
  MousePointer2,
  MousePointerClick,
  MoveUpRight,
  Play,
  Pencil,
  PenTool,
  Plus,
  Presentation,
  Redo2,
  Ruler,
  Save,
  Scissors,
  Scale,
  Slash,
  Square,
  Star,
  Trash2,
  Type,
  Undo2,
  UserRoundPlus,
  WrapText,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { useIris, type AlignMode, type Tool } from '../engine/store';
import { FRAME_PRESETS, type FramePreset } from '../engine/model';
import { openIrisFile, pickImageFiles, saveIrisFile } from '../engine/files';

interface Cmd {
  id: string;
  label: string;
  shortcut?: string;
  Icon: LucideIcon;
  run: () => void;
  group: string;
}

export function CommandPalette() {
  const open = useIris((s) => s.paletteOpen);
  const setPaletteOpen = useIris((s) => s.setPaletteOpen);
  const route = useIris((s) => s.route);

  /* keyboard: Ctrl+K toggles, Escape closes (capture so the input never eats them) */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setPaletteOpen(false);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        e.stopPropagation();
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, setPaletteOpen]);

  if (!open) return null;
  if (route.kind !== 'doc') return null;

  const s = useIris.getState();
  const run = (fn: () => void) => {
    setPaletteOpen(false);
    fn();
  };

  const hasSelection = s.selection.length > 0;

  const tools: { tool: Tool; label: string; shortcut: string; Icon: LucideIcon }[] = [
    { tool: 'move', label: 'Move', shortcut: 'V', Icon: MousePointer2 },
    { tool: 'scale', label: 'Scale', shortcut: 'K', Icon: Scale },
    { tool: 'hand', label: 'Hand', shortcut: 'H', Icon: Hand },
    { tool: 'frame', label: 'Frame', shortcut: 'F', Icon: Frame },
    { tool: 'section', label: 'Section', shortcut: 'Shift+S', Icon: Square },
    { tool: 'slice', label: 'Slice', shortcut: 'S', Icon: Slash },
    { tool: 'rect', label: 'Rectangle', shortcut: 'R', Icon: Square },
    { tool: 'line', label: 'Line', shortcut: 'L', Icon: Minus },
    { tool: 'arrow', label: 'Arrow', shortcut: 'Shift+L', Icon: MoveUpRight },
    { tool: 'ellipse', label: 'Ellipse', shortcut: 'O', Icon: Circle },
    { tool: 'polygon', label: 'Polygon', shortcut: 'Y', Icon: Hexagon },
    { tool: 'star', label: 'Star', shortcut: '', Icon: Star },
    { tool: 'pen', label: 'Pen', shortcut: 'P', Icon: PenTool },
    { tool: 'pencil', label: 'Pencil', shortcut: 'Shift+P', Icon: Pencil },
    { tool: 'text', label: 'Text', shortcut: 'T', Icon: Type },
    { tool: 'comment', label: 'Comment', shortcut: 'C', Icon: MessageCircle },
    { tool: 'eyedropper', label: 'Eyedropper', shortcut: 'I', Icon: Braces },
  ];

  const presets: FramePreset[] = [
    FRAME_PRESETS.find((p) => p.id === 'desktop')!,
    FRAME_PRESETS.find((p) => p.id === 'phone')!,
    FRAME_PRESETS.find((p) => p.id === 'tablet')!,
  ];

  const aligns: { mode: AlignMode; label: string; Icon: LucideIcon }[] = [
    { mode: 'left', label: 'Align left', Icon: AlignStartVertical },
    { mode: 'hcenter', label: 'Align horizontal centers', Icon: AlignCenterVertical },
    { mode: 'right', label: 'Align right', Icon: AlignEndVertical },
    { mode: 'top', label: 'Align top', Icon: AlignStartHorizontal },
    { mode: 'vcenter', label: 'Align vertical centers', Icon: AlignCenterHorizontal },
    { mode: 'bottom', label: 'Align bottom', Icon: AlignEndHorizontal },
    { mode: 'hdist', label: 'Distribute horizontally', Icon: AlignHorizontalDistributeCenter },
    { mode: 'vdist', label: 'Distribute vertically', Icon: AlignVerticalDistributeCenter },
  ];

  const cmds: Cmd[] = [
    ...tools.map((t) => ({
      id: `tool-${t.tool}`,
      label: t.label,
      shortcut: t.shortcut || undefined,
      Icon: t.Icon,
      group: 'Tools',
      run: () => s.setTool(t.tool),
    })),
    { id: 'undo', label: 'Undo', shortcut: 'Ctrl+Z', Icon: Undo2, group: 'Edit', run: () => s.undo() },
    { id: 'redo', label: 'Redo', shortcut: 'Ctrl+Shift+Z', Icon: Redo2, group: 'Edit', run: () => s.redo() },
    { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C', Icon: Copy, group: 'Edit', run: () => s.copySelection() },
    { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X', Icon: Scissors, group: 'Edit', run: () => s.cutSelection() },
    { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V', Icon: ClipboardPaste, group: 'Edit', run: () => s.paste(null) },
    {
      id: 'dup',
      label: 'Duplicate',
      shortcut: 'Ctrl+D',
      Icon: Clipboard,
      group: 'Edit',
      run: () => s.duplicateSelection(),
    },
    {
      id: 'del',
      label: 'Delete selection',
      shortcut: 'Del',
      Icon: Trash2,
      group: 'Edit',
      run: () => s.deleteSelection(),
    },
    { id: 'selall', label: 'Select all', shortcut: 'Ctrl+A', Icon: Layers, group: 'Edit', run: () => s.selectAll() },
    {
      id: 'seltype',
      label: 'Select same type',
      shortcut: 'Ctrl+Shift+A',
      Icon: Layers,
      group: 'Edit',
      run: () => s.selectSameType(),
    },
    {
      id: 'group',
      label: 'Group selection',
      shortcut: 'Ctrl+G',
      Icon: Group,
      group: 'Object',
      run: () => s.groupSelection(),
    },
    {
      id: 'ungroup',
      label: 'Ungroup selection',
      shortcut: 'Ctrl+Shift+G',
      Icon: Group,
      group: 'Object',
      run: () => s.ungroupSelection(),
    },
    {
      id: 'z-front',
      label: 'Bring to front',
      shortcut: 'Ctrl+Shift+]',
      Icon: ArrowUpToLine,
      group: 'Object',
      run: () => s.zorder('front'),
    },
    {
      id: 'z-forward',
      label: 'Bring forward',
      shortcut: 'Ctrl+]',
      Icon: ArrowUp,
      group: 'Object',
      run: () => s.zorder('forward'),
    },
    {
      id: 'z-backward',
      label: 'Send backward',
      shortcut: 'Ctrl+[',
      Icon: ArrowDown,
      group: 'Object',
      run: () => s.zorder('backward'),
    },
    {
      id: 'z-back',
      label: 'Send to back',
      shortcut: 'Ctrl+Shift+[',
      Icon: ArrowDownToLine,
      group: 'Object',
      run: () => s.zorder('back'),
    },
    ...aligns.map((a) => ({
      id: `align-${a.mode}`,
      label: a.label,
      Icon: a.Icon,
      group: 'Object',
      run: () => s.alignSelection(a.mode),
    })),
    {
      id: 'lock',
      label: 'Lock / unlock selection',
      shortcut: 'Ctrl+L',
      Icon: Lock,
      group: 'Object',
      run: () => s.toggleLockSelection(),
    },
    {
      id: 'unlock-all',
      label: 'Unlock all on page',
      shortcut: 'Ctrl+Shift+L',
      Icon: LockOpen,
      group: 'Object',
      run: () => s.unlockAllOnPage(),
    },
    {
      id: 'hide',
      label: 'Hide / show selection',
      shortcut: 'Ctrl+Shift+H',
      Icon: EyeOff,
      group: 'Object',
      run: () => s.toggleHideSelection(),
    },
    {
      id: 'flip-h',
      label: 'Flip horizontal',
      shortcut: 'Shift+H',
      Icon: ArrowLeftRight,
      group: 'Object',
      run: () => s.flipSelection('h'),
    },
    {
      id: 'add-layout',
      label: 'Add auto layout',
      shortcut: 'Shift+A',
      Icon: LayoutPanelLeft,
      group: 'Layout',
      run: () => s.addAutoLayout(),
    },
    {
      id: 'remove-layout',
      label: 'Remove auto layout',
      shortcut: 'Alt+Shift+A',
      Icon: WrapText,
      group: 'Layout',
      run: () => s.removeAutoLayout(),
    },
    { id: 'zoom-in', label: 'Zoom in', shortcut: 'Ctrl+ +', Icon: ZoomIn, group: 'View', run: () => s.zoomAt(1.2) },
    { id: 'zoom-out', label: 'Zoom out', shortcut: 'Ctrl+ −', Icon: ZoomOut, group: 'View', run: () => s.zoomAt(1 / 1.2) },
    { id: 'zoom-reset', label: 'Zoom to 100%', shortcut: 'Ctrl+0', Icon: ZoomIn, group: 'View', run: () => s.zoomReset() },
    { id: 'zoom-fit', label: 'Zoom to fit', shortcut: 'Shift+1', Icon: ZoomIn, group: 'View', run: () => s.zoomToFit() },
    {
      id: 'zoom-sel',
      label: 'Zoom to selection',
      shortcut: 'Shift+2',
      Icon: ZoomIn,
      group: 'View',
      run: () => s.zoomToSelection(),
    },
    {
      id: 'rulers',
      label: 'Toggle rulers',
      shortcut: 'Shift+R',
      Icon: Ruler,
      group: 'View',
      run: () => s.setViewFlag('rulers', !s.viewFlags.rulers),
    },
    {
      id: 'pixel-grid',
      label: 'Toggle pixel grid',
      Icon: Grid3x3,
      group: 'View',
      run: () => s.setViewFlag('pixelGrid', !s.viewFlags.pixelGrid),
    },
    {
      id: 'outline',
      label: 'Toggle outline mode',
      Icon: Eye,
      group: 'View',
      run: () => s.setViewFlag('outline', !s.viewFlags.outline),
    },
    {
      id: 'inspect',
      label: 'Toggle inspect code',
      Icon: Code2,
      group: 'View',
      run: () => s.setInspectMode(!s.inspectMode),
    },
    {
      id: 'comments',
      label: 'Toggle comment pins',
      Icon: MessageCircle,
      group: 'View',
      run: () => s.setShowComments(!s.showComments),
    },
    {
      id: 'present',
      label: 'Present prototype',
      shortcut: 'Ctrl+Enter',
      Icon: Presentation,
      group: 'View',
      run: () => {
        const st = useIris.getState();
        const flow = (st.doc.flows ?? []).find(
          (f) => f.pageId === st.currentPageId && st.doc.nodesById[f.startNodeId],
        );
        st.setPresenting(true, flow?.startNodeId ?? null);
      },
    },
    {
      id: 'connections',
      label: 'Toggle prototype connections',
      shortcut: 'Shift+E',
      Icon: MousePointerClick,
      group: 'Prototype',
      run: () => s.setViewFlag('connections', !s.viewFlags.connections),
    },
    {
      id: 'add-interaction',
      label: 'Add interaction: On click → Navigate to',
      Icon: Play,
      group: 'Prototype',
      run: () => {
        const st = useIris.getState();
        const first = st.selection[0];
        if (!first || !st.doc.nodesById[first]) {
          st.toast('Select a layer first');
          return;
        }
        st.addInteraction(first);
        st.setRightTab('prototype');
      },
    },
    {
      id: 'flow-start',
      label: 'Set as flow starting point',
      Icon: Frame,
      group: 'Prototype',
      run: () => {
        const st = useIris.getState();
        const first = st.selection[0];
        const n = first ? st.doc.nodesById[first] : null;
        if (!n || n.parentId !== null || n.type !== 'frame') {
          st.toast('Select a top-level frame first');
          return;
        }
        st.setFlowStart(n.id);
      },
    },
    ...presets.map((p) => ({
      id: `preset-${p.id}`,
      label: `Insert ${p.name} frame`,
      Icon: Frame,
      group: 'Canvas',
      run: () => s.addFramePreset(p),
    })),
    { id: 'add-page', label: 'Add page', Icon: FilePlus2, group: 'Canvas', run: () => s.addPage() },
    {
      id: 'place-image',
      label: 'Place image / video',
      shortcut: 'Ctrl+Shift+K',
      Icon: ImagePlus,
      group: 'Canvas',
      run: () => void pickImageFiles(),
    },
    {
      id: 'export',
      label: 'Export…',
      shortcut: 'Ctrl+Shift+E',
      Icon: Save,
      group: 'File',
      run: () => s.setExportOpen(true),
    },
    {
      id: 'share',
      label: 'Share',
      Icon: UserRoundPlus,
      group: 'File',
      run: () => s.setShareOpen(true),
    },
    { id: 'save', label: 'Save .iris file', shortcut: 'Ctrl+S', Icon: Save, group: 'File', run: () => void saveIrisFile({}) },
    { id: 'open', label: 'Open .iris file', shortcut: 'Ctrl+O', Icon: FolderOpen, group: 'File', run: () => openIrisFile() },
    { id: 'new', label: 'New file', Icon: FilePlus2, group: 'File', run: () => s.newDoc() },
    {
      id: 'home',
      label: 'Back to files',
      Icon: Home,
      group: 'File',
      run: () => s.goHome(),
    },
    {
      id: 'shortcuts',
      label: 'Keyboard shortcuts',
      shortcut: '?',
      Icon: Braces,
      group: 'File',
      run: () => s.setShortcutsOpen(true),
    },
  ];

  const groups = [...new Set(cmds.map((c) => c.group))];

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Actions and commands"
    >
      <div className="absolute inset-0 bg-black/45" onClick={() => setPaletteOpen(false)} aria-hidden />
      <Command
        className="relative w-[540px] max-w-[calc(100vw-40px)] overflow-hidden rounded-xl border border-[#4E4E4E] bg-[#2C2C2C] shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
        style={{ animation: 'iris-menu-in 120ms ease-out' }}
        shouldFilter
        loop
      >
        <CommandInput
          autoFocus
          placeholder="Search tools and actions…"
          className="border-b border-[#3E3E3E] text-[13px] text-white placeholder:text-[#7A7A7A]"
        />
        <CommandList className="max-h-[380px]">
          <CommandEmpty className="py-6 text-center text-[12px] text-[#8B8B8B]">
            No matching commands
          </CommandEmpty>
          {groups.map((g) => (
            <CommandGroup
              key={g}
              heading={g}
              className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2.5 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-[#8B8B8B]"
            >
              {cmds
                .filter((c) => c.group === g)
                .map((c) => (
                  <CommandItem
                    key={c.id}
                    value={`${c.label} ${c.group}`}
                    disabled={(c.group === 'Object' || c.id === 'del' || c.id === 'group' || c.id === 'ungroup' || c.id === 'remove-layout') && !hasSelection}
                    onSelect={() => run(c.run)}
                    className="mx-1.5 flex h-8 gap-2.5 rounded-md px-2 text-[12px] text-[#E5E5E5] data-[selected=true]:bg-[#0D99FF] data-[selected=true]:text-white [&_svg]:size-4 [&_svg]:text-[#A8A8A8] data-[selected=true]:[&_svg]:text-white/85 data-[disabled=true]:opacity-35"
                  >
                    <c.Icon aria-hidden />
                    <span className="truncate">{c.label}</span>
                    {c.shortcut ? (
                      <CommandShortcut className="ml-auto pl-4 text-[11px] text-[#8B8B8B] data-[selected=true]:text-white/80">
                        {c.shortcut}
                      </CommandShortcut>
                    ) : null}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
