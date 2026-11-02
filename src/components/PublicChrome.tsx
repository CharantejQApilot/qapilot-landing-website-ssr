"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Admin and auth stay free of marketing chrome without reading request headers. */
export function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  if (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/auth" ||
    pathname.startsWith("/auth/")
  ) {
    return null;
  }
  return <>{children}</>;
}
