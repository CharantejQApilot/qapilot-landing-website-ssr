"use client";

import { useEffect } from "react";

/**
 * On load, scrolls to `window.location.hash` or resets scroll to top when no hash.
 */
export function HashScrollOnMount() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const t = window.setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, []);

  return null;
}
