/**
 * Iris file I/O — browser-shim implementation of the Electron IPC layer.
 * - .iris documents are plain JSON ({ app, version, doc }) downloaded/uploaded
 * - recents live in localStorage (with a doc snapshot so they can be reopened)
 * - images are imported as dataURLs
 */

import { IrisDoc } from './model';
import { useIris } from './store';
import { downloadBlob } from './export';
import { frameAtPoint, screenToWorld } from './geometry';

export interface RecentDoc {
  name: string;
  savedAt: number;
  doc: IrisDoc | null;
}

const RECENTS_KEY = 'iris.recents.v1';
const MAX_RECENTS = 8;
const MAX_RECENT_SIZE = 1_500_000;

export function getRecents(): RecentDoc[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as RecentDoc[];
    return Array.isArray(list) ? list.slice(0, MAX_RECENTS) : [];
  } catch {
    return [];
  }
}

function writeRecents(list: RecentDoc[]): void {
  try {
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, MAX_RECENTS)));
  } catch {
    /* ignore */
  }
}

export function addRecent(doc: IrisDoc): void {
  const list = getRecents().filter((r) => r.name !== doc.name);
  let snapshot: IrisDoc | null = null;
  try {
    const json = JSON.stringify(doc);
    if (json.length <= MAX_RECENT_SIZE) snapshot = doc;
  } catch {
    snapshot = null;
  }
  writeRecents([{ name: doc.name, savedAt: Date.now(), doc: snapshot }, ...list]);
}

export function removeRecent(name: string): void {
  writeRecents(getRecents().filter((r) => r.name !== name));
}

export function clearRecents(): void {
  writeRecents([]);
}

/* ------------------------------------------------------------------ */
/* Save / open                                                         */
/* ------------------------------------------------------------------ */

export async function saveIrisFile(opts?: { as?: boolean }): Promise<void> {
  const s = useIris.getState();
  const name = s.savedName ?? s.doc.name;
  const payload = JSON.stringify({ app: 'iris', version: 1, doc: s.doc }, null, 2);
  downloadBlob(new Blob([payload], { type: 'application/json' }), `${name}.iris`);
  s.markSaved(name);
  addRecent(s.doc);
  s.toast(`Saved ${name}.iris`);
}

function parseIrisFile(file: File): Promise<IrisDoc> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const doc = parsed?.doc ?? parsed;
        if (!doc || typeof doc !== 'object' || !Array.isArray(doc.pages)) {
          throw new Error('bad file');
        }
        resolve(doc);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('read error'));
    reader.readAsText(file);
  });
}

export function openIrisFile(): void {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.iris,.json,application/json';
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const doc = await parseIrisFile(file);
      useIris.getState().loadDoc(doc, file.name.replace(/\.iris$/i, ''), true);
      useIris.getState().toast(`Opened ${file.name}`);
    } catch {
      useIris.getState().toast('Could not read that file — is it a .iris document?');
    }
  };
  input.click();
}

export async function openIrisBlob(file: File): Promise<void> {
  try {
    const doc = await parseIrisFile(file);
    useIris.getState().loadDoc(doc, file.name.replace(/\.iris$/i, ''), true);
    useIris.getState().toast(`Opened ${file.name}`);
  } catch {
    useIris.getState().toast('Could not read that file');
  }
}

/* ------------------------------------------------------------------ */
/* Image import                                                        */
/* ------------------------------------------------------------------ */

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('read error'));
    reader.readAsDataURL(file);
  });
}

function imageSize(src: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth || 100, h: img.naturalHeight || 100 });
    img.onerror = () => resolve({ w: 100, h: 100 });
    img.src = src;
  });
}

/** Import image files at a world position (or viewport center), cascading multiples. */
export async function importImageFiles(files: File[] | FileList, at?: { x: number; y: number }): Promise<void> {
  const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
  if (list.length === 0) return;
  const s = useIris.getState();
  const center =
    at ??
    (() => {
      const { viewport, canvasSize } = useIris.getState();
      return screenToWorld(viewport, canvasSize.w / 2 - 10, canvasSize.h / 2 - 10);
    })();
  let i = 0;
  for (const file of list) {
    try {
      const src = await readAsDataURL(file);
      const { w, h } = await imageSize(src);
      const place = { x: center.x + i * 24, y: center.y + i * 24 };
      const st = useIris.getState();
      const parent = frameAtPoint(st.doc, st.currentPageId, place);
      useIris.getState().importImage(src, w, h, place, parent?.id ?? null);
      i += 1;
    } catch {
      /* skip bad file */
    }
  }
  if (i > 0) s.toast(`Imported ${i} image${i > 1 ? 's' : ''}`);
}

/** File picker for the toolbar image button; optionally places at a world point. */
export function pickImageFiles(at?: { x: number; y: number }): void {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = true;
  input.onchange = () => {
    if (input.files?.length) void importImageFiles(input.files, at);
  };
  input.click();
}
