'use client';

/**
 * Figma-style number input: click to type, drag horizontally to scrub,
 * arrow keys to step. Commits on Enter / blur / drag end.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface NumberFieldProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
  title?: string;
}

function fmt(v: number): string {
  const r = Math.round(v * 100) / 100;
  return String(r);
}

export function NumberField({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className,
  icon,
  ariaLabel,
  title,
}: NumberFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ startX: number; startVal: number; moved: boolean } | null>(null);

  const clamp = (v: number): number => {
    let out = v;
    if (min !== undefined && out < min) out = min;
    if (max !== undefined && out > max) out = max;
    return out;
  };

  useEffect(() => {
    // keep in sync when value changes externally while not editing
    if (draft === null && document.activeElement !== inputRef.current) return;
    // no-op: draft state governs display while focused
  }, [value, draft]);

  const commitDraft = (): void => {
    if (draft === null) return;
    const parsed = parseFloat(draft.replace(',', '.'));
    if (!Number.isNaN(parsed)) onChange(clamp(parsed));
    setDraft(null);
  };

  const display = draft ?? fmt(value);

  const onPointerDown = (e: React.PointerEvent<HTMLInputElement>): void => {
    if (disabled) return;
    if (document.activeElement === inputRef.current) return; // typing mode
    dragRef.current = { startX: e.clientX, startVal: value, moved: false };
    (e.currentTarget as HTMLInputElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLInputElement>): void => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < 3) return;
    d.moved = true;
    const mult = e.shiftKey ? 10 : 1;
    onChange(clamp(d.startVal + dx * step * mult));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLInputElement>): void => {
    const d = dragRef.current;
    dragRef.current = null;
    try {
      (e.currentTarget as HTMLInputElement).releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
    if (d && !d.moved) {
      // plain click -> focus for typing
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  };

  return (
    <div className={cn('relative flex-1', className)}>
      {icon ? (
        <span className="pointer-events-none absolute left-1.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]" aria-hidden>
          {icon}
        </span>
      ) : null}
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        disabled={disabled}
        aria-label={ariaLabel}
        title={title}
        className={cn(
          'iris-input text-right tabular-nums',
          icon && 'pl-5',
          !disabled && 'cursor-ew-resize',
        )}
        value={display}
        spellCheck={false}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commitDraft}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            commitDraft();
            inputRef.current?.blur();
          } else if (e.key === 'Escape') {
            setDraft(null);
            inputRef.current?.blur();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            onChange(clamp(value + step * (e.shiftKey ? 10 : 1)));
            setDraft(null);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            onChange(clamp(value - step * (e.shiftKey ? 10 : 1)));
            setDraft(null);
          }
          e.stopPropagation();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </div>
  );
}
