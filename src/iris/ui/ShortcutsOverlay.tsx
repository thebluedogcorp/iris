'use client';

/**
 * Keyboard shortcuts overlay: a responsive two-column grid of shortcut
 * groups shown in a dialog controlled by the store.
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useIris } from '../engine/store';

interface ShortcutRow {
  keys: string[];
  label: string;
}

interface ShortcutGroup {
  title: string;
  rows: ShortcutRow[];
}

const GROUPS: ShortcutGroup[] = [
  {
    title: 'Tools',
    rows: [
      { keys: ['V'], label: 'Move' },
      { keys: ['F'], label: 'Frame' },
      { keys: ['R'], label: 'Rectangle' },
      { keys: ['O'], label: 'Ellipse' },
      { keys: ['Y'], label: 'Polygon' },
      { keys: ['S'], label: 'Star' },
      { keys: ['L'], label: 'Line' },
      { keys: ['A'], label: 'Arrow' },
      { keys: ['P'], label: 'Pen' },
      { keys: ['T'], label: 'Text' },
      { keys: ['M'], label: 'Place image' },
      { keys: ['I'], label: 'Eyedropper' },
      { keys: ['H'], label: 'Hand' },
    ],
  },
  {
    title: 'View',
    rows: [
      { keys: ['Space+Drag'], label: 'Pan' },
      { keys: ['Ctrl+Wheel'], label: 'Zoom' },
      { keys: ['Alt+Wheel'], label: 'Pan horizontally' },
      { keys: ['Ctrl+0'], label: '100%' },
      { keys: ['Shift+1'], label: 'Zoom to fit' },
      { keys: ['Shift+2'], label: 'Zoom to selection' },
      { keys: ['Ctrl+=', 'Ctrl+-'], label: 'Zoom in / out' },
      { keys: ['Ruler drag'], label: 'Create a guide' },
    ],
  },
  {
    title: 'Edit',
    rows: [
      { keys: ['Ctrl+Z', 'Ctrl+Shift+Z'], label: 'Undo / Redo' },
      { keys: ['Ctrl+C', 'Ctrl+V', 'Ctrl+X'], label: 'Copy / Paste / Cut' },
      { keys: ['Ctrl+D'], label: 'Duplicate' },
      { keys: ['Delete'], label: 'Delete' },
      { keys: ['Ctrl+A'], label: 'Select all' },
      { keys: ['Ctrl+Shift+A'], label: 'Select same type' },
      { keys: ['Ctrl+Alt+C / V'], label: 'Copy / paste style' },
    ],
  },
  {
    title: 'Transform',
    rows: [
      { keys: ['Drag'], label: 'Move' },
      { keys: ['Shift+Drag'], label: 'Constrain axis' },
      { keys: ['Alt+Drag'], label: 'Duplicate' },
      { keys: ['Arrows'], label: 'Nudge 1px' },
      { keys: ['Shift+Arrows'], label: 'Nudge 10px' },
      { keys: ['Shift+H', 'Shift+V'], label: 'Flip H / V' },
      { keys: ['Ctrl+L'], label: 'Lock / unlock' },
      { keys: ['Ctrl+Shift+H'], label: 'Hide / show' },
      { keys: ['Enter'], label: 'Edit object' },
      { keys: ['Esc'], label: 'Back out' },
    ],
  },
  {
    title: 'Layers',
    rows: [
      { keys: ['Ctrl+G', 'Ctrl+Shift+G'], label: 'Group / Ungroup' },
      { keys: [']', '['], label: 'Forward / Backward' },
      { keys: ['Ctrl+]', 'Ctrl+['], label: 'Front / Back' },
      { keys: ['Double-click'], label: 'Enter group / edit text' },
    ],
  },
  {
    title: 'Files',
    rows: [
      { keys: ['Ctrl+S'], label: 'Save .iris' },
      { keys: ['Ctrl+O'], label: 'Open' },
      { keys: ['Ctrl+Shift+S'], label: 'Save as' },
      { keys: ['Ctrl+Shift+E'], label: 'Export' },
    ],
  },
];

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="rounded border border-[#4E4E4E] bg-[#383838] px-1.5 py-px font-sans text-[10px] text-white">
      {children}
    </kbd>
  );
}

export function ShortcutsOverlay() {
  const shortcutsOpen = useIris((s) => s.shortcutsOpen);
  const setShortcutsOpen = useIris((s) => s.setShortcutsOpen);

  return (
    <Dialog open={shortcutsOpen} onOpenChange={(o) => setShortcutsOpen(o)}>
      <DialogContent className="iris-scroll max-h-[70vh] gap-4 overflow-y-auto border-[#4E4E4E] bg-[#2C2C2C] p-5 text-white sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="text-[13px] font-semibold text-white">Keyboard shortcuts</DialogTitle>
          <DialogDescription className="text-[12px] text-[#9A9A9A]">
            Iris works best with shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {GROUPS.map((g) => (
            <section key={g.title}>
              <h3 className="mb-1.5 text-[11px] font-semibold text-white">{g.title}</h3>
              <ul>
                {g.rows.map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center justify-between gap-6 py-0.5 text-[11px] text-[#C9C9C9]"
                  >
                    <span>{r.label}</span>
                    <span className="flex shrink-0 items-center gap-1">
                      {r.keys.map((k, i) => (
                        <span key={k} className="flex items-center gap-1">
                          {i > 0 && <span className="text-[#6F6F6F]">/</span>}
                          <Kbd>{k}</Kbd>
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
