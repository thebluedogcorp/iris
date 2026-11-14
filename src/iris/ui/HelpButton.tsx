'use client';

/**
 * Bottom-right help button: opens the keyboard shortcuts overlay.
 */

import { CircleHelp } from 'lucide-react';
import { useIris } from '../engine/store';

export function HelpButton() {
  const setShortcutsOpen = useIris((s) => s.setShortcutsOpen);

  return (
    <button
      type="button"
      aria-label="Help and keyboard shortcuts"
      title="Help (?)"
      onClick={() => setShortcutsOpen(true)}
      className="absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#3E3E3E] bg-[#2C2C2C] shadow-lg transition-colors hover:bg-[#383838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
    >
      <CircleHelp size={18} color="#C9C9C9" />
    </button>
  );
}
