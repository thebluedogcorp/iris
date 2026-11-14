/**
 * Shared image cache for dataURL images (renderer + export).
 */

interface Entry {
  img: HTMLImageElement;
  loaded: boolean;
  failed: boolean;
}

const entries = new Map<string, Entry>();
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((l) => l());
}

/** Returns the loaded image, or null (starts loading on first call). */
export function getImage(src: string): HTMLImageElement | null {
  let e = entries.get(src);
  if (!e) {
    if (typeof Image === 'undefined') return null;
    const img = new Image();
    e = { img, loaded: false, failed: false };
    entries.set(src, e);
    img.onload = () => {
      e!.loaded = true;
      notify();
    };
    img.onerror = () => {
      e!.failed = true;
    };
    img.src = src;
  }
  return e.loaded && !e.failed ? e.img : null;
}

/** Awaitable load (for PNG export). */
export function loadImage(src: string): Promise<HTMLImageElement> {
  const e = entries.get(src);
  if (e && e.loaded) return Promise.resolve(e.img);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      entries.set(src, { img, loaded: true, failed: false });
      notify();
      resolve(img);
    };
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

export function onImageCacheChange(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
