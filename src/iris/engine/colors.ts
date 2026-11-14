/**
 * Recent colors + saved swatch palette, persisted in localStorage.
 * Non-reactive by design: pickers re-read on open.
 */

const RECENT_KEY = 'iris.colors.recent.v1';
const SWATCH_KEY = 'iris.colors.swatches.v1';
const MAX_RECENT = 14;
const MAX_SWATCHES = 24;

function readList(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(list) ? list.filter((v): v is string => typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* quota — ignore */
  }
}

export function getRecentColors(): string[] {
  return readList(RECENT_KEY);
}

export function pushRecentColor(hex: string): void {
  const norm = hex.toUpperCase();
  if (!/^#[0-9A-F]{6}$/.test(norm)) return;
  const list = [norm, ...readList(RECENT_KEY).filter((c) => c !== norm)].slice(0, MAX_RECENT);
  writeList(RECENT_KEY, list);
}

export function getSwatches(): string[] {
  return readList(SWATCH_KEY);
}

/** Toggle a color in the saved palette; returns true when added. */
export function toggleSwatch(hex: string): boolean {
  const norm = hex.toUpperCase();
  const list = readList(SWATCH_KEY);
  const exists = list.includes(norm);
  const next = exists ? list.filter((c) => c !== norm) : [norm, ...list].slice(0, MAX_SWATCHES);
  writeList(SWATCH_KEY, next);
  return !exists;
}
