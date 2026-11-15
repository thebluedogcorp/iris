/**
 * Iris desktop — preload.
 *
 * Exposes the tiny, typed `window.irisDesktop` bridge consumed by the studio
 * (see src/iris/desktop/bridge.ts in the web app). Everything flows through
 * contextBridge + IPC — no Node APIs leak into the renderer.
 */

import { contextBridge, ipcRenderer } from 'electron';

type Cb<T> = (value: T) => void;

/* multi-listener plumbing for the two push channels */
const updateListeners = new Set<Cb<unknown>>();
const maximizeListeners = new Set<Cb<boolean>>();

ipcRenderer.on('update-event', (_event, payload) => {
  for (const listener of updateListeners) listener(payload);
});

ipcRenderer.on('win:maximized-changed', (_event, maximized: boolean) => {
  for (const listener of maximizeListeners) listener(maximized);
});

contextBridge.exposeInMainWorld('irisDesktop', {
  platform: process.platform,
  version: ipcRenderer.sendSync('app:get-version') as string,

  win: {
    minimize: (): void => ipcRenderer.send('win:minimize'),
    toggleMaximize: (): void => ipcRenderer.send('win:toggle-maximize'),
    close: (): void => ipcRenderer.send('win:close'),
    isMaximized: (): Promise<boolean> => ipcRenderer.invoke('win:is-maximized'),
    onMaximizeChanged: (cb: Cb<boolean>): (() => void) => {
      maximizeListeners.add(cb);
      return () => maximizeListeners.delete(cb);
    },
  },

  updates: {
    check: (): Promise<unknown> => ipcRenderer.invoke('updates:check'),
    install: (): void => ipcRenderer.send('updates:install'),
    onEvent: (cb: Cb<unknown>): (() => void) => {
      updateListeners.add(cb);
      return () => updateListeners.delete(cb);
    },
  },
});
