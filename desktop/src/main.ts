/**
 * Iris desktop — Electron main process.
 *
 * Responsibilities:
 *   - boot the studio (static Next.js export) through a private `app://`
 *     scheme, so the app is fully offline with no localhost server, no
 *     firewall prompts and full History API support for /?doc=<id> routes;
 *   - drive the frameless window (the custom title bar lives in the web app
 *     and talks to us over IPC through the preload bridge);
 *   - persist window bounds between launches;
 *   - auto-update via electron-updater against GitHub Releases, forwarding
 *     lifecycle events to the renderer for unobtrusive in-app toasts.
 */

import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  protocol,
  shell,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import fs from 'node:fs';
import path from 'node:path';

/* ------------------------------------------------------------------ */
/* environment                                                         */
/* ------------------------------------------------------------------ */

/** `--dev` loads the local Next dev server (http://localhost:3000). */
const isDev = process.argv.includes('--dev') || !app.isPackaged;

/** Root of the bundled static site (production only). */
const WEB_ROOT = isDev ? '' : path.join(__dirname, '../app-web');

/** Persisted window bounds / maximize state. */
const STATE_FILE = () => path.join(app.getPath('userData'), 'window-state.json');

/* ------------------------------------------------------------------ */
/* single instance                                                     */
/* ------------------------------------------------------------------ */

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const [win] = BrowserWindow.getAllWindows();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

/* ------------------------------------------------------------------ */
/* app:// — private standard scheme serving the static export          */
/* ------------------------------------------------------------------ */

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: { standard: true, secure: true, supportFetchAPI: true },
  },
]);

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.wasm': 'application/wasm',
};

function registerAppProtocol(): void {
  protocol.handle('app', (request) => {
    if (isDev) return new Response('dev mode serves from localhost', { status: 500 });
    return new Promise<Response>((resolve) => {
      try {
        const url = new URL(request.url);
        let pathname = decodeURIComponent(url.pathname);
        if (pathname === '/' || pathname === '') pathname = '/index.html';

        const root = path.normalize(WEB_ROOT);
        const filePath = path.normalize(path.join(root, pathname));
        if (!filePath.startsWith(root)) {
          resolve(new Response('forbidden', { status: 403 }));
          return;
        }

        void fs.promises.readFile(filePath).then(
          (data) => {
            const ext = path.extname(filePath).toLowerCase();
            const headers: Record<string, string> = {
              'content-type': MIME[ext] ?? 'application/octet-stream',
            };
            /* Next.js static assets are content-hashed — cache forever. */
            if (pathname.startsWith('/_next/static/')) {
              headers['cache-control'] = 'public, max-age=31536000, immutable';
            }
            resolve(new Response(new Uint8Array(data), { headers }));
          },
          () => {
            /* SPA-style fallback: unknown paths get the app shell. */
            void fs.promises.readFile(path.join(root, 'index.html')).then(
              (shell) =>
                resolve(
                  new Response(new Uint8Array(shell), {
                    headers: { 'content-type': 'text/html; charset=utf-8' },
                  }),
                ),
              () => resolve(new Response('not found', { status: 404 })),
            );
          },
        );
      } catch {
        resolve(new Response('bad request', { status: 400 }));
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/* window state persistence                                            */
/* ------------------------------------------------------------------ */

interface WindowState {
  x?: number;
  y?: number;
  width: number;
  height: number;
  maximized: boolean;
}

function loadWindowState(): WindowState {
  const defaults: WindowState = { width: 1440, height: 900, maximized: false };
  try {
    const raw = fs.readFileSync(STATE_FILE(), 'utf-8');
    const parsed = JSON.parse(raw) as Partial<WindowState>;
    if (typeof parsed.width === 'number' && typeof parsed.height === 'number') {
      return { ...defaults, ...parsed };
    }
  } catch {
    /* first launch / corrupt state — use defaults */
  }
  return defaults;
}

function persistWindowState(win: BrowserWindow): void {
  if (win.isDestroyed()) return;
  const bounds = win.getNormalBounds();
  const state: WindowState = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    maximized: win.isMaximized(),
  };
  try {
    fs.mkdirSync(path.dirname(STATE_FILE()), { recursive: true });
    fs.writeFileSync(STATE_FILE(), JSON.stringify(state));
  } catch {
    /* best-effort persistence */
  }
}

/* ------------------------------------------------------------------ */
/* main window                                                         */
/* ------------------------------------------------------------------ */

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  const state = loadWindowState();

  mainWindow = new BrowserWindow({
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    minWidth: 960,
    minHeight: 620,
    backgroundColor: '#1E1E1E',
    show: false,
    frame: false, // the studio draws its own title bar (see TitleBar.tsx)
    title: 'Iris',
    icon: path.join(__dirname, '../build/icons/256x256.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
    },
  });

  if (state.maximized) {
    /* maximize before showing to avoid a visible resize flash */
    mainWindow.maximize();
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  /*
   * Safety net: if the renderer ever stalls before `ready-to-show` (e.g. a
   * blocking preload or a failed load), show the window anyway after 8s so
   * the app never sits invisible in the taskbar with no window.
   */
  const showFallback = setTimeout(() => {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
      mainWindow.show();
    }
  }, 8_000);
  mainWindow.once('closed', () => clearTimeout(showFallback));

  mainWindow.webContents.on('did-fail-load', (_event, code, desc, url) => {
    console.error(`[iris] failed to load ${url} — ${code} ${desc}`);
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
      mainWindow.show();
    }
  });

  /* keep the renderer's window controls in sync */
  const sendMaximize = (maximized: boolean): void => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('win:maximized-changed', maximized);
    }
  };
  mainWindow.on('maximize', () => sendMaximize(true));
  mainWindow.on('unmaximize', () => sendMaximize(false));
  mainWindow.on('close', () => {
    if (mainWindow) persistWindowState(mainWindow);
  });

  /* security: the window never navigates away from the app */
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) void shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const allowed = isDev ? url.startsWith('http://localhost:3000') : url.startsWith('app://');
    if (!allowed) {
      event.preventDefault();
      if (/^https?:/i.test(url)) void shell.openExternal(url);
    }
  });

  /* DevTools on F12 / Ctrl+Shift+I (no default menu in a frameless app) */
  mainWindow.webContents.on('before-input-event', (_event, input) => {
    if (input.type !== 'keyDown') return;
    const key = input.key.toLowerCase();
    if (key === 'f12' || (key === 'i' && input.control && input.shift)) {
      mainWindow?.webContents.toggleDevTools();
    }
  });

  if (isDev) {
    void mainWindow.loadURL('http://localhost:3000');
  } else {
    void mainWindow.loadURL('app://local/');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/* ------------------------------------------------------------------ */
/* IPC — window controls + environment info (preload bridge surface)   */
/* ------------------------------------------------------------------ */

function registerIpc(): void {
  ipcMain.on('win:minimize', () => mainWindow?.minimize());
  ipcMain.on('win:toggle-maximize', () => {
    if (!mainWindow) return;
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  });
  ipcMain.on('win:close', () => mainWindow?.close());
  ipcMain.handle('win:is-maximized', () => mainWindow?.isMaximized() ?? false);
  /*
   * NOTE: the preload fetches the version with `ipcRenderer.sendSync` (it must
   * be available synchronously on `window.irisDesktop`). A sendSync needs a
   * matching `ipcMain.on` that sets `event.returnValue` — `ipcMain.handle`
   * serves `invoke()` only and never replies to sendSync, which would freeze
   * the renderer forever on startup (the window would never appear).
   */
  ipcMain.on('app:get-version', (event) => {
    event.returnValue = app.getVersion();
  });
}

/* ------------------------------------------------------------------ */
/* auto-update (electron-updater → GitHub Releases)                    */
/* ------------------------------------------------------------------ */

function broadcast(event: unknown): void {
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send('update-event', event);
  }
}

function setupAutoUpdater(): void {
  /* Never auto-update an unpacked dev build. */
  if (isDev) {
    ipcMain.handle('updates:check', () => ({
      ok: false,
      message: 'updates are disabled in dev mode',
    }));
    return;
  }

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.logger = null; // keep stdout quiet; the UI reports status

  autoUpdater.on('checking-for-update', () => broadcast({ type: 'checking-for-update' }));
  autoUpdater.on('update-available', (info) =>
    broadcast({ type: 'update-available', version: info.version }),
  );
  autoUpdater.on('update-not-available', (info) =>
    broadcast({ type: 'update-not-available', version: info.version }),
  );
  autoUpdater.on('download-progress', (progress) =>
    broadcast({ type: 'download-progress', percent: Math.round(progress.percent) }),
  );
  autoUpdater.on('update-downloaded', (info) =>
    broadcast({ type: 'update-downloaded', version: info.version }),
  );
  autoUpdater.on('error', (err) =>
    broadcast({
      type: 'error',
      message: (err instanceof Error ? err.message : String(err)).split('\n')[0],
    }),
  );

  ipcMain.handle('updates:check', async () => {
    try {
      const result = await autoUpdater.checkForUpdates();
      const version = result?.updateInfo?.version ?? app.getVersion();
      return {
        ok: true,
        updateAvailable: version !== app.getVersion(),
        version,
      };
    } catch (err) {
      return {
        ok: false,
        message: (err instanceof Error ? err.message : String(err)).split('\n')[0],
      };
    }
  });

  ipcMain.on('updates:install', () => {
    autoUpdater.quitAndInstall(false, true);
  });

  /* Silent background cadence: shortly after launch, then every 4 hours. */
  const silentCheck = (): void => {
    autoUpdater.checkForUpdates().catch(() => undefined);
  };
  const earlyTimer = setTimeout(silentCheck, 15_000);
  const interval = setInterval(silentCheck, 4 * 60 * 60 * 1000);
  earlyTimer.unref?.();
  interval.unref?.();
}

/* ------------------------------------------------------------------ */
/* app lifecycle                                                       */
/* ------------------------------------------------------------------ */

app.setAppUserModelId('com.thebluedogcorp.iris');

app.whenReady().then(() => {
  /* frameless window → no default menu bar; DevTools stays on F12 */
  Menu.setApplicationMenu(null);

  registerAppProtocol();
  registerIpc();
  setupAutoUpdater();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
