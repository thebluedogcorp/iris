'use client';

/**
 * Comment layer: DOM overlay pins anchored to world-space comment positions.
 * Pins are positioned in canvas CSS pixels (rulers offset included); the
 * active pin opens an inline popover for editing / resolving / deleting.
 */

import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { useIris } from '../engine/store';
import { RULER, worldToScreen } from '../engine/geometry';
import type { IrisComment } from '../engine/model';

/** Compact "2m ago" style relative timestamp. */
function timeAgo(ts: number): string {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 45) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return new Date(ts).toLocaleDateString();
}

interface CommentCardProps {
  comment: IrisComment;
  onSave: (text: string) => void;
  onDelete: () => void;
  onToggleResolve: () => void;
}

/**
 * Edit popover shown next to the active pin. Mounted with a `key` of the
 * comment id so switching comments re-initializes the draft text, and the
 * textarea auto-focuses on mount.
 */
function CommentCard({ comment, onSave, onDelete, onToggleResolve }: CommentCardProps) {
  const [text, setText] = useState(comment.text);

  return (
    <div
      className="pointer-events-auto absolute left-9 top-1/2 w-[260px] -translate-y-1/2 rounded-lg border border-[#3E3E3E] bg-[#2C2C2C] p-3 shadow-2xl"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      role="group"
      aria-label={`Comment by ${comment.author}`}
    >
      <div className="flex items-center gap-2">
        <span className="truncate text-[12px] font-semibold text-white">{comment.author}</span>
        <span className="shrink-0 text-[11px] text-[#9A9A9A]">{timeAgo(comment.ts)}</span>
        <button
          type="button"
          aria-label="Delete comment"
          title="Delete comment"
          className="ml-auto rounded p-1 text-[#9A9A9A] transition-colors hover:bg-[#383838] hover:text-white"
          onClick={onDelete}
        >
          <Trash2 size={13} />
        </button>
      </div>
      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment…"
        rows={3}
        aria-label="Comment text"
        className="mt-2 w-full resize-none rounded-md border border-[#3E3E3E] bg-[#1E1E1E] p-2 text-[12px] leading-snug text-white placeholder:text-[#6F6F6F] focus:outline-none"
      />
      <div className="mt-2 flex items-center justify-between gap-2">
        <button
          type="button"
          className="flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#383838] hover:text-white"
          onClick={onToggleResolve}
        >
          <Check size={12} />
          {comment.resolved ? 'Unresolve' : 'Resolve'}
        </button>
        <button
          type="button"
          className="rounded-md bg-[#0D99FF] px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-[#0B87E0]"
          onClick={() => onSave(text)}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export function CommentLayer() {
  const doc = useIris((s) => s.doc);
  const currentPageId = useIris((s) => s.currentPageId);
  const viewport = useIris((s) => s.viewport);
  const rulers = useIris((s) => s.viewFlags.rulers);
  const activeCommentId = useIris((s) => s.activeCommentId);
  const showComments = useIris((s) => s.showComments);
  const presenting = useIris((s) => s.presenting);
  const setActiveComment = useIris((s) => s.setActiveComment);
  const updateComment = useIris((s) => s.updateComment);
  const deleteComment = useIris((s) => s.deleteComment);

  if (!showComments || presenting) return null;

  const comments = doc.comments.filter((c) => c.pageId === currentPageId);
  const origin = rulers ? RULER : 0;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-label="Comments">
      {comments.map((c) => {
        const p = worldToScreen(viewport, c.x, c.y);
        const isActive = c.id === activeCommentId;
        return (
          <div
            key={c.id}
            className={`absolute ${isActive ? 'z-30' : 'z-10'}`}
            style={{
              left: origin + p.x,
              top: origin + p.y,
              transform: 'translate(-14px, -14px)',
            }}
          >
            <button
              type="button"
              className={`pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                c.resolved ? 'bg-[#383838] ring-1 ring-[#4E4E4E]' : 'bg-[#0D99FF] ring-2 ring-white'
              }`}
              aria-label={`${c.resolved ? 'Resolved comment' : 'Comment'} by ${c.author}${
                isActive ? ' (active)' : ''
              }`}
              aria-pressed={isActive}
              title={c.text || 'Comment'}
              onClick={() => setActiveComment(isActive ? null : c.id)}
            >
              {c.resolved ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9A9A9A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <span className="text-[11px] font-semibold text-white">
                  {c.author.trim().charAt(0).toUpperCase()}
                </span>
              )}
            </button>
            {isActive ? (
              <CommentCard
                key={c.id}
                comment={c}
                onSave={(text) => {
                  if (text.trim() === '') deleteComment(c.id);
                  else updateComment(c.id, { text });
                  setActiveComment(null);
                }}
                onDelete={() => deleteComment(c.id)}
                onToggleResolve={() => updateComment(c.id, { resolved: !c.resolved })}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
