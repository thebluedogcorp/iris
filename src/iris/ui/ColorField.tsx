'use client';

/**
 * Solid color field: swatch (native picker), hex input, clear button, and a
 * drop-down with recent colors + a saved palette (persisted in localStorage).
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRecentColors, getSwatches, pushRecentColor, toggleSwatch } from '../engine/colors';

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

function SwatchGrid({
  colors,
  onPick,
  emptyLabel,
}: {
  colors: string[];
  onPick: (hex: string) => void;
  emptyLabel: string;
}) {
  if (colors.length === 0) {
    return <p className="px-1 py-1.5 text-[10px] text-[#6F6F6F]">{emptyLabel}</p>;
  }
  return (
    <div className="grid grid-cols-7 gap-1">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          className="h-5 w-5 rounded-[4px] border border-[#5A5A5A] transition-transform hover:scale-110"
          style={{ background: c }}
          title={c}
          aria-label={`Use ${c}`}
          onClick={() => onPick(c)}
        />
      ))}
    </div>
  );
}

export function ColorField({ value, onChange, allowNone = true, ariaLabel = 'Color' }: ColorFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [swatches, setSwatches] = useState<string[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  const display = draft ?? (value ?? '');

  const refresh = (): void => {
    setRecent(getRecentColors());
    setSwatches(getSwatches());
  };

  const toggleOpen = (): void => {
    setOpen((o) => {
      if (!o) refresh();
      return !o;
    });
  };

  /* close on outside click */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent): void => {
      if (rootRef.current && e.target instanceof Node && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('pointerdown', onDown, true);
    return () => window.removeEventListener('pointerdown', onDown, true);
  }, [open]);

  const commit = (): void => {
    if (draft === null) return;
    const norm = normalizeHex(draft);
    if (norm) {
      onChange(norm);
      pushRecentColor(norm);
    }
    setDraft(null);
  };

  const pick = (hex: string): void => {
    onChange(hex);
    pushRecentColor(hex);
    setDraft(null);
    setOpen(false);
  };

  const saveSwatch = (): void => {
    if (!value) return;
    const added = toggleSwatch(value);
    refresh();
    void added;
  };

  return (
    <div className="relative flex items-center gap-1.5" ref={rootRef}>
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
            pushRecentColor(hex);
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
      <button
        type="button"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#9A9A9A] transition-colors hover:bg-[#474747] hover:text-white"
        aria-label={`${ariaLabel} palette`}
        title="Color palette"
        aria-expanded={open}
        onClick={toggleOpen}
      >
        <ChevronDown size={12} strokeWidth={2} aria-hidden />
      </button>
      {allowNone && value !== null ? (
        <button
          type="button"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#9A9A9A] transition-colors hover:bg-[#474747] hover:text-white"
          aria-label={`Remove ${ariaLabel.toLowerCase()}`}
          title="Remove"
          onClick={() => onChange(null)}
        >
          <X size={12} strokeWidth={2} aria-hidden />
        </button>
      ) : null}

      {open ? (
        <div
          className="absolute right-0 top-7 z-50 w-56 rounded-md border border-[#4E4E4E] bg-[#2C2C2C] p-2 shadow-2xl"
          role="dialog"
          aria-label={`${ariaLabel} palette`}
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]">Recent</span>
          </div>
          <SwatchGrid colors={recent} onPick={pick} emptyLabel="No recent colors yet" />
          <div className="mt-2 mb-1 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]">Palette</span>
            <button
              type="button"
              className="flex h-5 w-5 items-center justify-center rounded text-[#9A9A9A] hover:bg-[#474747] hover:text-white"
              aria-label="Save current color to palette"
              title="Save current color to palette"
              onClick={saveSwatch}
            >
              <Plus size={11} strokeWidth={2} aria-hidden />
            </button>
          </div>
          <SwatchGrid
            colors={swatches}
            onPick={pick}
            emptyLabel="Save colors here with the + button"
          />
        </div>
      ) : null}
    </div>
  );
}
