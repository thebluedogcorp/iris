/**
 * Iris session — PREVIEW / GIMMICK IMPLEMENTATION.
 *
 * This module simulates an account entirely in localStorage so the marketing
 * site + studio can flow end-to-end before real auth exists.
 *
 * ROADMAP: replace this file with NextAuth.js (Google OAuth provider) as part
 * of the "Iris Cloud" milestone. The public surface (getSession / signIn /
 * signOut / subscribe) is intentionally shaped like a real session module so
 * the swap is a drop-in change: components keep calling the same functions.
 */

export interface IrisSession {
  name: string;
  email: string;
  createdAt: number;
}

const STORAGE_KEY = 'iris.session.v1';
const EVENT = 'iris:session';

/* ------------------------------------------------------------------ */
/* storage                                                             */
/* ------------------------------------------------------------------ */

export function getSession(): IrisSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as IrisSession;
    if (!parsed || typeof parsed.email !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Simulates a network round-trip so the UI exercises its loading states. */
export function signIn(name: string, email: string): Promise<IrisSession> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const session: IrisSession = {
        name: name.trim() || email.split('@')[0],
        email: email.trim(),
        createdAt: Date.now(),
      };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } catch {
        /* storage full / disabled — session simply won't persist */
      }
      window.dispatchEvent(new CustomEvent(EVENT));
      resolve(session);
    }, 650);
  });
}

export function signOut(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Subscribe to sign-in / sign-out. Returns an unsubscribe function. */
export function subscribe(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** "A B" / "Ada" → "AB" / "A" — avatar initials for the account chip. */
export function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'IR';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
