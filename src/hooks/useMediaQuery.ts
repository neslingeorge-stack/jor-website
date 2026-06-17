"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 *
 * Implemented with `useSyncExternalStore` so the value is read directly from
 * the browser's `matchMedia` store. This avoids the cascading re-render that a
 * `setState`-in-effect approach causes and stays correct across concurrent
 * rendering. On the server the query is treated as not matching, which keeps
 * the initial client render consistent with SSR (no hydration mismatch).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
