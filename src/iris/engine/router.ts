/**
 * Minimal client-side routing for Iris: the file browser (homepage) lives at
 * "/" and an open document at "/?doc=<id>". Uses the History API directly so
 * switching documents never reloads the page; popstate events are synced back
 * into the store by the app shell (Back / Forward work as expected).
 */

export type IrisRoute = { kind: 'home' } | { kind: 'doc'; id: string };

/** Parse the current location into a route (home when no ?doc= is present). */
export function routeFromLocation(): IrisRoute {
  if (typeof window === 'undefined') return { kind: 'home' };
  try {
    const id = new URLSearchParams(window.location.search).get('doc');
    return id ? { kind: 'doc', id } : { kind: 'home' };
  } catch {
    return { kind: 'home' };
  }
}

export function hrefForRoute(route: IrisRoute): string {
  return route.kind === 'doc' ? `/?doc=${encodeURIComponent(route.id)}` : '/';
}

/** Add a new history entry (does not reload — purely client side). */
export function pushRoute(route: IrisRoute): void {
  if (typeof window === 'undefined') return;
  try {
    window.history.pushState(null, '', hrefForRoute(route));
  } catch {
    /* ignore */
  }
}

/** Replace the current history entry (used to clean stale URLs). */
export function replaceRoute(route: IrisRoute): void {
  if (typeof window === 'undefined') return;
  try {
    window.history.replaceState(null, '', hrefForRoute(route));
  } catch {
    /* ignore */
  }
}
