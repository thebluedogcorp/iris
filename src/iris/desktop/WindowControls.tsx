'use client';

/**
 * Native-feeling window controls for the Iris desktop app (frameless window).
 *
 * Renders nothing on the web — there is no window to control in a browser
 * tab, so the chrome stays clean. Inside the desktop app the buttons drive
 * the real OS window through the preload bridge:
 *
 *   [—] minimize   [□ / ❐] maximize / restore   [✕] close
 *
 * Double-clicking any drag region (title bars) also toggles maximize,
 * matching native Windows behaviour.
 */

import { useEffect, useState } from 'react';
import { Copy, Minus, Square, X } from 'lucide-react';
import { desktopBridge, isDesktop } from './bridge';

export function WindowControls() {
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    const bridge = desktopBridge();
    if (!bridge) return;
    let alive = true;
    bridge.win.isMaximized().then((m) => {
      if (alive) setMaximized(m);
    });
    return bridge.win.onMaximizeChanged((m) => setMaximized(m));
  }, []);

  if (!isDesktop()) return null;

  const btn =
    'flex h-7 w-8 items-center justify-center rounded-md text-[#9A9A9A] transition-colors hover:bg-[#474747] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white';

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Window controls">
      <button
        type="button"
        className={btn}
        aria-label="Minimize window"
        title="Minimize"
        onClick={() => desktopBridge()?.win.minimize()}
      >
        <Minus size={13} strokeWidth={2} aria-hidden />
      </button>
      <button
        type="button"
        className={btn}
        aria-label={maximized ? 'Restore window' : 'Maximize window'}
        title={maximized ? 'Restore' : 'Maximize'}
        onClick={() => desktopBridge()?.win.toggleMaximize()}
      >
        {maximized ? (
          <Copy size={12} strokeWidth={2} aria-hidden />
        ) : (
          <Square size={11} strokeWidth={2} aria-hidden />
        )}
      </button>
      <button
        type="button"
        className="flex h-7 w-11 items-center justify-center rounded-md text-[#9A9A9A] transition-colors hover:bg-[#F24822] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Close window"
        title="Close"
        onClick={() => desktopBridge()?.win.close()}
      >
        <X size={14} strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}

/** Double-click handler for drag regions — toggles maximize in the desktop app. */
export function onDragRegionDoubleClick(): void {
  if (isDesktop()) desktopBridge()?.win.toggleMaximize();
}
