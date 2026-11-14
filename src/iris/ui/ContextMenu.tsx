'use client';

/**
 * Hand-rolled floating context menu (no Radix) rendered at the last
 * right-click position. Clamped to the viewport, closes on outside
 * pointerdown, Escape, window blur, or any other contextmenu event.
 */

import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useIris } from '../engine/store';

const MENU_WIDTH = 200;
const MENU_MAX_HEIGHT = 320;

interface CtxAction {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  run: () => void;
}

type CtxEntry = CtxAction | { sep: true };

function CtxItem({
  label,
  shortcut,
  disabled,
  onClick,
}: {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className="flex h-7 w-full items-center px-2.5 text-left text-[12px] text-[#E5E5E5] hover:bg-[#474747] disabled:pointer-events-none disabled:opacity-40"
      onPointerDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      onClick={onClick}
    >
      {label}
      {shortcut ? <span className="ml-auto pl-6 text-[11px] text-[#8B8B8B]">{shortcut}</span> : null}
    </button>
  );
}

export function ContextMenu() {
  const contextMenu = useIris((s) => s.contextMenu);
  const close = useIris((s) => s.closeContextMenu);
  const selection = useIris((s) => s.selection);
  const hasClipboard = useIris((s) => !!s.clipboard);

  const actions = useIris(
    useShallow((s) => ({
      paste: s.paste,
      copySelection: s.copySelection,
      duplicateSelection: s.duplicateSelection,
      deleteSelection: s.deleteSelection,
      groupSelection: s.groupSelection,
      ungroupSelection: s.ungroupSelection,
      zorder: s.zorder,
      selectAll: s.selectAll,
    })),
  );

  const menuRef = useRef<HTMLDivElement | null>(null);
  const open = contextMenu !== null;

  useEffect(() => {
    if (!open) return;
    /* Capture-phase so we run before the canvas tool handlers. Clicks that
       land inside the menu itself are ignored (items also stop propagation). */
    const onPointerDown = (e: PointerEvent): void => {
      const node = menuRef.current;
      if (node && e.target instanceof Node && node.contains(e.target)) return;
      close();
    };
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') close();
    };
    const onContextMenu = (): void => close();
    const onBlur = (): void => close();
    window.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('contextmenu', onContextMenu, true);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('contextmenu', onContextMenu, true);
      window.removeEventListener('blur', onBlur);
    };
  }, [open, close]);

  if (!contextMenu) return null;

  const { x, y, worldX, worldY } = contextMenu;
  const hasSelection = selection.length > 0;
  const pasteHere = (): void => actions.paste({ x: worldX, y: worldY });

  const entries: CtxEntry[] = hasSelection
    ? [
        { label: 'Copy', shortcut: 'Ctrl+C', run: actions.copySelection },
        { label: 'Paste Here', disabled: !hasClipboard, run: pasteHere },
        { label: 'Duplicate', shortcut: 'Ctrl+D', run: () => actions.duplicateSelection() },
        { label: 'Delete', shortcut: 'Del', run: actions.deleteSelection },
        { sep: true },
        { label: 'Group', shortcut: 'Ctrl+G', run: actions.groupSelection },
        { label: 'Ungroup', shortcut: 'Ctrl+Shift+G', run: actions.ungroupSelection },
        { sep: true },
        { label: 'Bring Forward', shortcut: ']', run: () => actions.zorder('forward') },
        { label: 'Send Backward', shortcut: '[', run: () => actions.zorder('backward') },
        { label: 'Bring to Front', shortcut: 'Ctrl+]', run: () => actions.zorder('front') },
        { label: 'Send to Back', shortcut: 'Ctrl+[', run: () => actions.zorder('back') },
      ]
    : [
        { label: 'Paste Here', disabled: !hasClipboard, run: pasteHere },
        { label: 'Select All', shortcut: 'Ctrl+A', run: actions.selectAll },
      ];

  /* clamp so the menu never spills off-screen */
  const left = x + MENU_WIDTH > window.innerWidth ? Math.max(0, x - MENU_WIDTH) : x;
  const top = y + MENU_MAX_HEIGHT > window.innerHeight ? Math.max(0, y - MENU_MAX_HEIGHT) : y;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Canvas context menu"
      className="fixed z-50 min-w-[190px] select-none rounded-md border border-[#4E4E4E] bg-[#2C2C2C] py-1 shadow-2xl"
      style={{ left, top }}
      onPointerDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {entries.map((entry, i) =>
        'sep' in entry ? (
          <div key={`sep-${i}`} className="my-1 h-px bg-[#3E3E3E]" role="separator" />
        ) : (
          <CtxItem
            key={entry.label}
            label={entry.label}
            shortcut={entry.shortcut}
            disabled={entry.disabled}
            onClick={() => {
              close();
              entry.run();
            }}
          />
        ),
      )}
    </div>
  );
}
