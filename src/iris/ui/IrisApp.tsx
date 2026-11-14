'use client';

/**
 * Iris application shell. Routes between the file browser (homepage) and the
 * editor based on the store route (?doc=<id> ↔ /), keeps the browser history
 * in sync (Back / Forward), and hosts the shared toast viewport.
 */

import { useEffect } from 'react';
import { useIris } from '../engine/store';
import { HomeBrowser } from './HomeBrowser';
import { TitleBar } from './TitleBar';
import { LayersPanel } from './LayersPanel';
import { PropertiesPanel } from './PropertiesPanel';
import { CanvasView } from './CanvasView';
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';
import { ContextMenu } from './ContextMenu';
import { ExportDialog } from './ExportDialog';
import { ShortcutsOverlay } from './ShortcutsOverlay';

export default function IrisApp() {
  const route = useIris((s) => s.route);
  const toasts = useIris((s) => s.toasts);

  /* browser Back / Forward adopt the URL route */
  useEffect(() => {
    const onPop = () => useIris.getState().syncRoute();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <div className="iris-app fixed inset-0 flex flex-col overflow-hidden bg-[#1E1E1E] font-sans text-white antialiased">
      {route.kind === 'home' ? (
        <HomeBrowser />
      ) : (
        <div className="flex h-full min-h-0 select-none flex-col">
          <TitleBar />

          <div className="flex min-h-0 flex-1">
            <LayersPanel />

            <main className="relative min-w-0 flex-1" aria-label="Canvas area">
              <CanvasView />
              <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center px-4">
                <div className="pointer-events-auto">
                  <Toolbar />
                </div>
              </div>
            </main>

            <PropertiesPanel />
          </div>

          <StatusBar />
          <ContextMenu />
          <ExportDialog />
          <ShortcutsOverlay />
        </div>
      )}

      {/* shared toasts */}
      <div
        className="pointer-events-none fixed bottom-12 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-1.5"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2 rounded-md border border-[#4E4E4E] bg-[#383838] px-3 py-1.5 text-[11px] text-white shadow-xl"
          >
            <span>{t.msg}</span>
            {t.action ? (
              <button
                type="button"
                className="rounded bg-[#8B5CF6] px-2 py-0.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#7C3AED]"
                onClick={() => {
                  t.action?.run();
                  useIris.getState().dismissToast(t.id);
                }}
              >
                {t.action.label}
              </button>
            ) : null}
            <button
              type="button"
              className="flex h-5 w-5 items-center justify-center rounded text-[#9A9A9A] transition-colors hover:bg-[#474747] hover:text-white"
              aria-label="Dismiss"
              onClick={() => useIris.getState().dismissToast(t.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
