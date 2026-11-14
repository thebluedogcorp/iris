'use client';

/**
 * Solid color field: swatch (native picker), hex input, clear button.
 */

import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ColorFieldProps {
  value: string | null;
  onChange: (v: string | null) => void;
  allowNone?: boolean;
  ariaLabel?: string;
}

function normalizeHex(raw: string): string | null {
  let s = raw.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(s)) {
    s = s
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(s)) return null;
  return `#${s.toUpperCase()}`;
}

export function ColorField({ value, onChange, allowNone = true, ariaLabel = 'Color' }: ColorFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const textRef = useRef<HTMLInputElement>(null);

  const display = draft ?? (value ?? '');

  const commit = (): void => {
    if (draft === null) return;
    const norm = normalizeHex(draft);
    if (norm) onChange(norm);
    setDraft(null);
  };

  return (
    <div className="flex items-center gap-1.5">
      <label
        className="relative block h-[18px] w-[18px] shrink-0 cursor-pointer overflow-hidden rounded-[4px] border border-[#4E4E4E]"
        style={{
          background: value
            ? value
            : 'repeating-conic-gradient(#5A5A5A 0% 25%, #3A3A3A 0% 50%) 50% / 8px 8px',
        }}
        title={value ?? 'No fill'}
      >
        <input
          type="color"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          value={value ?? '#D9D9D9'}
          aria-label={`${ariaLabel} picker`}
          onChange={(e) => {
            const hex = e.target.value.toUpperCase();
            setDraft(null);
            onChange(hex);
          }}
        />
      </label>
      <input
        ref={textRef}
        type="text"
        className={cn('iris-input flex-1 font-medium uppercase')}
        placeholder="None"
        aria-label={`${ariaLabel} hex value`}
        value={display}
        spellCheck={false}
        disabled={!allowNone && value === null}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            commit();
            textRef.current?.blur();
          } else if (e.key === 'Escape') {
            setDraft(null);
            textRef.current?.blur();
          }
          e.stopPropagation();
        }}
      />
      {allowNone && value !== null ? (
        <button
          type="button"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#9A9A9A] hover:bg-[#474747] hover:text-white"
          aria-label={`Remove ${ariaLabel.toLowerCase()}`}
          title="Remove"
          onClick={() => onChange(null)}
        >
          <X size={12} strokeWidth={2} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
