"use client";

import { usePathname } from "next/navigation";

/** Pathname before the navigation that is rendering now. */
let lastPath: string | null = null;
let currentPath: string | null = null;

export function peekLastPath() {
  return lastPath;
}

/**
 * Shifts the previous path during render. The layout adopts the new
 * pathname before the page mounts, so an effect would already see the
 * destination and the page could not tell where the visitor came from.
 */
export function RouteMemory() {
  const pathname = usePathname();
  if (typeof window !== "undefined" && pathname !== currentPath) {
    lastPath = currentPath;
    currentPath = pathname;
  }
  return null;
}
