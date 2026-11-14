/**
 * Iris document library — multi-document persistence in localStorage.
 *
 * Layout:
 *   iris.library.v2          -> LibEntry[]  (metadata + thumbnail, no scene data)
 *   iris.doc.v2.<id>         -> StoredDoc   (full IrisDoc + last page + viewport)
 *
 * Thumbnails are small JPEG dataURLs rendered from the first page with the
 * shared canvas renderer, regenerated (throttled) whenever a doc is autosaved.
 *
 * A one-time migration imports the legacy single-slot autosave
 * (iris.autosave.v1) and any .iris snapshots kept in the old recents list
 * (iris.recents.v1) so existing work shows up on the homepage.
 */

import { ID, IrisDoc, createDefaultDoc, normalizeDoc, uid } from './model';
import { Viewport, boundsOfNodes } from './geometry';
import { drawNodes } from './renderer';
import { loadImage } from './imageCache';

export interface LibEntry {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  pageCount: number;
  nodeCount: number;
  /** small JPEG dataURL of the first page; null while pending / empty docs */
  thumb: string | null;
}

export interface StoredDoc {
  doc: IrisDoc;
  currentPageId: ID | null;
  viewport: Viewport | null;
  savedAt: number;
}

const INDEX_KEY = 'iris.library.v2';
const DOC_KEY_PREFIX = 'iris.doc.v2.';
const LEGACY_AUTOSAVE_KEY = 'iris.autosave.v1';
const LEGACY_RECENTS_KEY = 'iris.recents.v1';
const LEGACY_MIGRATED_KEY = 'iris.library.migrated.v1';

const THUMB_W = 480;
const THUMB_H = 300;
const THUMB_PAD = 30;
/** don't re-render a doc thumbnail more often than this */
const THUMB_MIN_INTERVAL = 4000;

const lastThumbAt = new Map<string, number>();

/* ------------------------------------------------------------------ */
/* index + doc storage                                                 */
/* ------------------------------------------------------------------ */

function readIndex(): LibEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(INDEX_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as LibEntry[];
    return Array.isArray(list)
      ? list.filter((e) => e && typeof e.id === 'string' && typeof e.name === 'string')
      : [];
  } catch {
    return [];
  }
}

function writeIndex(list: LibEntry[]): boolean {
  try {
    window.localStorage.setItem(INDEX_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

function updateIndex(mut: (list: LibEntry[]) => LibEntry[]): boolean {
  return writeIndex(mut(readIndex()));
}

/** All library entries, most recently updated first. */
export function listDocs(): LibEntry[] {
  return [...readIndex()].sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getEntry(id: string): LibEntry | null {
  return readIndex().find((e) => e.id === id) ?? null;
}

export function getStoredDoc(id: string): StoredDoc | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(DOC_KEY_PREFIX + id);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredDoc>;
    if (!parsed || !parsed.doc) return null;
    return {
      doc: normalizeDoc(parsed.doc),
      currentPageId: typeof parsed.currentPageId === 'string' ? parsed.currentPageId : null,
      viewport:
        parsed.viewport && typeof parsed.viewport.x === 'number' && typeof parsed.viewport.zoom === 'number'
          ? (parsed.viewport as Viewport)
          : null,
      savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

function writeStoredDoc(id: string, stored: StoredDoc): boolean {
  try {
    window.localStorage.setItem(DOC_KEY_PREFIX + id, JSON.stringify(stored));
    return true;
  } catch {
    return false; // quota exceeded — keep whatever was there before
  }
}

/* ------------------------------------------------------------------ */
/* thumbnails                                                          */
/* ------------------------------------------------------------------ */

/** Render the first page of a doc into a small JPEG dataURL (white canvas). */
export async function renderDocThumb(doc: IrisDoc): Promise<string | null> {
  if (typeof document === 'undefined') return null;
  const pageId = doc.pages[0];
  const page = doc.pagesById[pageId];
  if (!page) return null;

  const roots = page.nodeIds.map((id) => doc.nodesById[id]).filter((n) => n && n.visible);
  if (roots.length === 0) return null;
  const bounds = boundsOfNodes(doc, roots.map((n) => n.id));
  if (!bounds || bounds.w < 1 || bounds.h < 1) return null;

  /* make sure embedded images are decoded before drawing */
  const srcs = new Set<string>();
  for (const n of Object.values(doc.nodesById)) {
    if (n.type === 'image' && n.src && n.visible) srcs.add(n.src);
  }
  if (srcs.size) await Promise.all([...srcs].map((s) => loadImage(s)));

  const canvas = document.createElement('canvas');
  canvas.width = THUMB_W;
  canvas.height = THUMB_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, THUMB_W, THUMB_H);
  const scale = Math.min(
    (THUMB_W - THUMB_PAD * 2) / bounds.w,
    (THUMB_H - THUMB_PAD * 2) / bounds.h,
    2,
  );
  const ox = (THUMB_W - bounds.w * scale) / 2 - bounds.x * scale;
  const oy = (THUMB_H - bounds.h * scale) / 2 - bounds.y * scale;
  ctx.setTransform(scale, 0, 0, scale, ox, oy);
  drawNodes(ctx, doc, pageId, 1);

  try {
    return canvas.toDataURL('image/jpeg', 0.75);
  } catch {
    return null;
  }
}

function refreshThumb(id: string, doc: IrisDoc, force = false): void {
  const now = Date.now();
  if (!force && now - (lastThumbAt.get(id) ?? 0) < THUMB_MIN_INTERVAL) return;
  lastThumbAt.set(id, now);
  void renderDocThumb(doc).then((thumb) => {
    updateIndex((list) => {
      const i = list.findIndex((e) => e.id === id);
      if (i < 0) return list;
      list[i] = { ...list[i], thumb };
      return list;
    });
  });
}

/* ------------------------------------------------------------------ */
/* library operations                                                  */
/* ------------------------------------------------------------------ */

/**
 * Autosave path: write the doc + update its index entry (name / counts /
 * updatedAt) and maybe refresh the thumbnail (throttled).
 */
export function saveDocToLibrary(
  id: string,
  doc: IrisDoc,
  extra?: { currentPageId?: ID | null; viewport?: Viewport | null },
): boolean {
  if (typeof window === 'undefined') return false;
  const stored: StoredDoc = {
    doc,
    currentPageId: extra?.currentPageId ?? null,
    viewport: extra?.viewport ?? null,
    savedAt: Date.now(),
  };
  const ok = writeStoredDoc(id, stored);
  const existing = getEntry(id);
  if (!existing && !ok) return false;

  const counts = { pageCount: doc.pages.length, nodeCount: Object.keys(doc.nodesById).length };
  const hadContent = !!existing && (existing.nodeCount > 0 || existing.thumb !== null);
  updateIndex((list) => {
    const i = list.findIndex((e) => e.id === id);
    if (i >= 0) {
      list[i] = { ...list[i], name: doc.name, updatedAt: stored.savedAt, ...counts };
      return list;
    }
    return [
      ...list,
      {
        id,
        name: doc.name,
        createdAt: stored.savedAt,
        updatedAt: stored.savedAt,
        ...counts,
        thumb: null,
      },
    ];
  });
  /* skip thumb renders while a doc is still empty; render once content exists */
  if (counts.nodeCount > 0 && !hadContent) refreshThumb(id, doc, true);
  else if (counts.nodeCount > 0) refreshThumb(id, doc);
  return ok;
}

export interface ImportOptions {
  name?: string;
  createdAt?: number;
  updatedAt?: number;
  currentPageId?: ID | null;
  viewport?: Viewport | null;
}

/** Register a doc (fresh id) in the library — used by imports & duplicates. */
export function importDocIntoLibrary(rawDoc: IrisDoc, opts?: ImportOptions): LibEntry {
  const doc: IrisDoc = opts?.name ? { ...rawDoc, name: opts.name } : rawDoc;
  const id = uid();
  const now = Date.now();
  const stored: StoredDoc = {
    doc,
    currentPageId: opts?.currentPageId ?? doc.pages[0] ?? null,
    viewport: opts?.viewport ?? null,
    savedAt: opts?.updatedAt ?? now,
  };
  writeStoredDoc(id, stored);
  const entry: LibEntry = {
    id,
    name: doc.name,
    createdAt: opts?.createdAt ?? now,
    updatedAt: opts?.updatedAt ?? now,
    pageCount: doc.pages.length,
    nodeCount: Object.keys(doc.nodesById).length,
    thumb: null,
  };
  updateIndex((list) => [...list, entry]);
  refreshThumb(id, doc, true);
  return entry;
}

/** Create a brand-new empty document ("Untitled", "Untitled (2)", …). */
export function createLibraryDoc(): { id: string; doc: IrisDoc } {
  const doc = createDefaultDoc();
  const taken = new Set(readIndex().map((e) => e.name));
  doc.name = uniqueName(doc.name, taken);
  const entry = importDocIntoLibrary(doc);
  return { id: entry.id, doc };
}

export function renameDocInLibrary(id: string, name: string): void {
  const trimmed = name.trim();
  if (!trimmed) return;
  updateIndex((list) => list.map((e) => (e.id === id ? { ...e, name: trimmed } : e)));
  const stored = getStoredDoc(id);
  if (stored && stored.doc.name !== trimmed) {
    stored.doc = { ...stored.doc, name: trimmed };
    writeStoredDoc(id, stored);
  }
}

export function deleteDocInLibrary(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(DOC_KEY_PREFIX + id);
  } catch {
    /* ignore */
  }
  updateIndex((list) => list.filter((e) => e.id !== id));
  lastThumbAt.delete(id);
}

export function duplicateDocInLibrary(id: string): LibEntry | null {
  const stored = getStoredDoc(id);
  const entry = getEntry(id);
  if (!stored || !entry) return null;
  const names = new Set(readIndex().map((e) => e.name));
  const m = entry.name.match(/^(.*) \(\d+\)$/);
  const base = m ? m[1] : entry.name;
  return importDocIntoLibrary(stored.doc, {
    name: uniqueName(base, names),
    createdAt: Date.now(),
    currentPageId: stored.currentPageId,
    viewport: stored.viewport,
  });
}

/** Rough stats for the homepage footer (count + bytes used by the library). */
export function libraryStats(): { count: number; bytes: number } {
  const list = readIndex();
  let bytes = 0;
  if (typeof window !== 'undefined') {
    try {
      const idxRaw = window.localStorage.getItem(INDEX_KEY);
      if (idxRaw) bytes += idxRaw.length;
      for (const e of list) {
        const raw = window.localStorage.getItem(DOC_KEY_PREFIX + e.id);
        if (raw) bytes += raw.length;
      }
    } catch {
      /* ignore */
    }
  }
  return { count: list.length, bytes };
}

function uniqueName(base: string, taken: Set<string>): string {
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base} (${n})`)) n += 1;
  return `${base} (${n})`;
}

/* ------------------------------------------------------------------ */
/* one-time migration from the legacy single-doc autosave / recents    */
/* ------------------------------------------------------------------ */

interface LegacyRecent {
  name?: string;
  savedAt?: number;
  doc?: unknown;
}

export function migrateLegacyLibrary(): void {
  if (typeof window === 'undefined') return;
  try {
    if (window.localStorage.getItem(LEGACY_MIGRATED_KEY)) return;

    /* 1) the old single-document autosave — most important WIP doc */
    try {
      const raw = window.localStorage.getItem(LEGACY_AUTOSAVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          doc?: unknown;
          currentPageId?: string;
          viewport?: Viewport;
          savedAt?: number;
        };
        const doc = normalizeDoc(parsed.doc);
        if (Object.keys(doc.nodesById).length > 0) {
          importDocIntoLibrary(doc, {
            createdAt: parsed.savedAt ?? Date.now(),
            updatedAt: parsed.savedAt ?? Date.now(),
            currentPageId: typeof parsed.currentPageId === 'string' ? parsed.currentPageId : null,
            viewport: parsed.viewport ?? null,
          });
        }
      }
    } catch {
      /* ignore bad legacy data */
    }

    /* 2) .iris snapshots that were kept in the old recents list */
    try {
      const rawRecents = window.localStorage.getItem(LEGACY_RECENTS_KEY);
      if (rawRecents) {
        const list = JSON.parse(rawRecents) as LegacyRecent[];
        if (Array.isArray(list)) {
          const names = new Set(readIndex().map((e) => e.name));
          for (const r of list.slice().reverse()) {
            if (!r || !r.doc) continue;
            const doc = normalizeDoc(r.doc);
            if (Object.keys(doc.nodesById).length === 0) continue;
            doc.name = r.name || doc.name;
            if (names.has(doc.name)) continue;
            importDocIntoLibrary(doc, {
              createdAt: r.savedAt ?? Date.now(),
              updatedAt: r.savedAt ?? Date.now(),
            });
            names.add(doc.name);
          }
        }
      }
    } catch {
      /* ignore */
    }

    window.localStorage.setItem(LEGACY_MIGRATED_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}
