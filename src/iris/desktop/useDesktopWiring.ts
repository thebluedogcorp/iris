'use client';

/**
 * Desktop integration wiring, mounted once from <IrisApp/>:
 *
 *  - tags <html> with `.iris-desktop` so CSS can enable window drag regions
 *    (`-webkit-app-region`) inside the frameless desktop window only;
 *  - subscribes to auto-update events and surfaces them through the studio
 *    toast system: silent background checks, a toast while downloading and a
 *    "Restart" action once the update is ready to install.
 *
 * On the web both steps are inert no-ops.
 */

import { useEffect } from 'react';
import { useIris } from '../engine/store';
import { desktopBridge, type DesktopUpdateEvent } from './bridge';

export function useDesktopWiring(): void {
  /* drag-region CSS hook */
  useEffect(() => {
    const bridge = desktopBridge();
    if (!bridge) return;
    document.documentElement.classList.add('iris-desktop');
    return () => document.documentElement.classList.remove('iris-desktop');
  }, []);

  /* auto-update lifecycle → toasts */
  useEffect(() => {
    const bridge = desktopBridge();
    if (!bridge) return;

    const off = bridge.updates.onEvent((e: DesktopUpdateEvent) => {
      const toast = useIris.getState().toast;
      switch (e.type) {
        case 'update-available':
          toast(`Iris ${e.version} is available — downloading…`);
          break;
        case 'update-downloaded':
          toast(`Iris ${e.version} is ready to install`, {
            label: 'Restart',
            run: () => desktopBridge()?.updates.install(),
          });
          break;
        case 'error':
          toast('Update check failed — you can retry from Help');
          break;
        /* checking / not-available / progress are surfaced on demand
         * (manual checks + download progress via the Help menu). */
        default:
          break;
      }
    });

    return off;
  }, []);
}
