'use client';

/**
 * Iris desktop bridge.
 *
 * When the studio runs inside the Iris desktop app (Electron), the preload
 * script exposes a small, typed API on `window.irisDesktop`. On the web this
 * property simply does not exist — every helper below degrades gracefully so
 * the same UI code powers both targets.
 *
 * Surface (kept intentionally tiny):
 *   platform / version — environment info for Help · About
 *   win                — real window controls for the frameless window
 *   updates            — auto-update checks, progress, install + restart
 */

export type DesktopUpdateEvent =
  | { type: 'checking-for-update' }
  | { type: 'update-available'; version: string }
  | { type: 'update-not-available'; version: string }
  | { type: 'download-progress'; percent: number }
  | { type: 'update-downloaded'; version: string }
  | { type: 'error'; message: string };

export interface DesktopBridge {
  platform: string;
  version: string;
  win: {
    minimize(): void;
    toggleMaximize(): void;
    close(): void;
    isMaximized(): Promise<boolean>;
    onMaximizeChanged(cb: (maximized: boolean) => void): () => void;
  };
  updates: {
    /** Resolves with a summary — does not throw; check `ok`. */
    check(): Promise<
      | { ok: true; updateAvailable: boolean; version: string }
      | { ok: false; message: string }
    >;
    /** Quit, install the downloaded update and relaunch. */
    install(): void;
    onEvent(cb: (e: DesktopUpdateEvent) => void): () => void;
  };
}

declare global {
  interface Window {
    irisDesktop?: DesktopBridge;
  }
}

/** The live bridge, or `undefined` when running on the web. */
export function desktopBridge(): DesktopBridge | undefined {
  return typeof window === 'undefined' ? undefined : window.irisDesktop;
}

/** True when the studio is running inside the Iris desktop app. */
export function isDesktop(): boolean {
  return desktopBridge() !== undefined;
}
