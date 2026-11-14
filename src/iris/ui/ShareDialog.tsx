'use client';

/**
 * Share dialog: simulated local-first sharing — copyable preview link,
 * link permission level and the owner row.
 */

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useIris } from '../engine/store';

type LinkPermission = 'view' | 'comment';

export function ShareDialog() {
  const shareOpen = useIris((s) => s.shareOpen);
  const setShareOpen = useIris((s) => s.setShareOpen);
  const docName = useIris((s) => s.doc.name);
  const docId = useIris((s) => s.docId);
  const toast = useIris((s) => s.toast);
  const [permission, setPermission] = useState<LinkPermission>('view');

  /* close on Escape while open */
  useEffect(() => {
    if (!shareOpen) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setShareOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shareOpen, setShareOpen]);

  if (!shareOpen) return null;

  const link = `https://iris.local/preview/${docId ?? 'untitled'}`;

  const copyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      /* clipboard API unavailable (e.g. insecure context) — legacy fallback */
      try {
        const ta = document.createElement('textarea');
        ta.value = link;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      } catch {
        toast('Could not copy the link');
        return;
      }
    }
    toast('Link copied to clipboard');
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50"
      onClick={() => setShareOpen(false)}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share"
        className="w-[440px] max-w-[92vw] rounded-xl border border-[#3E3E3E] bg-[#2C2C2C] p-5 shadow-2xl"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold text-white">Share</h2>
            <p className="mt-0.5 truncate text-[12px] text-[#9A9A9A]">
              &ldquo;{docName}&rdquo; · local-first preview
            </p>
          </div>
          <button
            type="button"
            aria-label="Close share dialog"
            onClick={() => setShareOpen(false)}
            className="rounded p-1 text-[#9A9A9A] transition-colors hover:bg-[#383838] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* preview-build notice */}
        <div className="mt-4 rounded-lg border border-[#3E3E3E] bg-[#1E1E1E] p-3 text-[11.5px] leading-relaxed text-[#9A9A9A]">
          This is a preview build — sharing is simulated. Your file is stored locally in this browser
          and never leaves your machine.
        </div>

        {/* link row */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={link}
            aria-label="Share link"
            onFocus={(e) => e.currentTarget.select()}
            className="h-9 min-w-0 flex-1 rounded-md border border-[#3E3E3E] bg-[#1E1E1E] px-2.5 text-[12px] text-[#C9C9C9] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => void copyLink()}
            className="h-9 shrink-0 rounded-md bg-[#0D99FF] px-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#0B87E0]"
          >
            Copy link
          </button>
        </div>

        {/* permissions row */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <label htmlFor="iris-share-permission" className="text-[12px] text-[#C9C9C9]">
            Anyone with the link
          </label>
          <select
            id="iris-share-permission"
            value={permission}
            onChange={(e) => setPermission(e.target.value as LinkPermission)}
            className="h-9 appearance-none rounded-md border border-[#3E3E3E] bg-[#1E1E1E] px-2 text-[12px] text-white focus:outline-none"
          >
            <option value="view">Can view</option>
            <option value="comment">Can comment</option>
          </select>
        </div>

        {/* collaborators */}
        <p className="mt-3 text-[11px] uppercase tracking-wide text-[#9A9A9A]">Collaborators</p>
        <div className="mt-2 flex items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0D99FF] text-[10px] font-semibold text-white">
            TU
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] text-[#E5E5E5]">Test User</p>
            <p className="truncate text-[11px] text-[#9A9A9A]">you@iris.studio</p>
          </div>
          <span className="shrink-0 text-[11px] text-[#9A9A9A]">Owner</span>
        </div>

        {/* footer note */}
        <p className="mt-4 text-[11px] text-[#6F6F6F]">Real-time collaboration arrives with Iris Sync.</p>
      </div>
    </div>
  );
}
