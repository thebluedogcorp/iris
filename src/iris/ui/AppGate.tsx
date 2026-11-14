'use client';

/**
 * Iris application gate — owns the top-level product flow:
 *
 *   landing (marketing site) → account (preview auth) → studio (IrisApp)
 *
 * A persisted (simulated) session skips straight to the studio; signing out
 * from the studio homepage returns here. Everything stays on the single "/"
 * route — phase changes are pure client state, so deep links such as
 * /?doc=<id> keep working across the gate.
 */

import { useEffect, useState } from 'react';
import { getSession, subscribe } from '../auth/session';
import { LandingPage } from '../marketing/LandingPage';
import { AuthPage } from '../auth/AuthPage';
import IrisApp from './IrisApp';

type Phase = 'landing' | 'auth' | 'app';

export default function AppGate() {
  /* The gate renders client-only (ssr: false in page.tsx), so the session
   * can be adopted synchronously in the initial state — no flash of the
   * wrong phase and no effect-triggered re-render. */
  const [phase, setPhase] = useState<Phase>(() => (getSession() ? 'app' : 'landing'));

  /* Sign-out (from the studio account chip) returns to the landing page. */
  useEffect(() => {
    return subscribe(() => {
      if (!getSession()) setPhase('landing');
    });
  }, []);

  if (phase === 'landing') {
    return <LandingPage onEnter={() => setPhase(getSession() ? 'app' : 'auth')} />;
  }

  if (phase === 'auth') {
    return <AuthPage onDone={() => setPhase('app')} onBack={() => setPhase('landing')} />;
  }

  return <IrisApp />;
}
