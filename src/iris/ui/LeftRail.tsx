'use client';

/**
 * Left rail: vertical icon navigation (Figma UI3 style). Switches the left
 * panel between Layers / Assets / Comments views and navigates Home.
 */

import { CircleHelp, Home, Images, Layers3, MessageSquare } from 'lucide-react';
import { useIris } from '../engine/store';
import { cn } from '@/lib/utils';

export function LeftRail() {
  const view = useIris((s) => s.leftPanelView);
  const open = useIris((s) => s.leftPanelOpen);
  const setLeftPanelView = useIris((s) => s.setLeftPanelView);
  const goHome = useIris((s) => s.goHome);
  const setShortcutsOpen = useIris((s) => s.setShortcutsOpen);
  const presenting = useIris((s) => s.presenting);

  if (presenting) return null;

  const railBtn = (active: boolean): string =>
    cn(
      'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
      active ? 'bg-[#383838] text-white' : 'text-[#9A9A9A] hover:bg-[#333333] hover:text-[#E5E5E5]',
    );

  return (
    <nav
      aria-label="Primary"
      className="flex w-[52px] shrink-0 flex-col items-center gap-1 border-r border-[#2A2A2A] bg-[#1E1E1E] py-2"
    >
      <button
        type="button"
        className={railBtn(false)}
        aria-label="Home — file browser"
        title="Home"
        onClick={() => goHome()}
      >
        <Home size={18} strokeWidth={1.75} aria-hidden />
      </button>

      <div className="my-1 h-px w-6 bg-[#2E2E2E]" aria-hidden />

      <button
        type="button"
        className={railBtn(open && view === 'layers')}
        aria-label="Pages and layers"
        aria-pressed={open && view === 'layers'}
        title="Pages and layers"
        onClick={() => setLeftPanelView('layers', true)}
      >
        <Layers3 size={18} strokeWidth={1.75} aria-hidden />
      </button>
      <button
        type="button"
        className={railBtn(open && view === 'assets')}
        aria-label="Assets"
        aria-pressed={open && view === 'assets'}
        title="Assets"
        onClick={() => setLeftPanelView('assets', true)}
      >
        <Images size={18} strokeWidth={1.75} aria-hidden />
      </button>
      <button
        type="button"
        className={railBtn(open && view === 'comments')}
        aria-label="Comments"
        aria-pressed={open && view === 'comments'}
        title="Comments"
        onClick={() => setLeftPanelView('comments', true)}
      >
        <MessageSquare size={18} strokeWidth={1.75} aria-hidden />
      </button>

      <div className="mt-auto">
        <button
          type="button"
          className={railBtn(false)}
          aria-label="Help and keyboard shortcuts"
          title="Help (?)"
          onClick={() => setShortcutsOpen(true)}
        >
          <CircleHelp size={18} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
    </nav>
  );
}
