/**
 * Internal-only surfaces (admin console, login). Must not be indexed or tracked.
 * Keep aligned with ROBOTS_DISALLOW_PATHS in robots-txt.ts.
 */
export function isInternalPath(pathname: string): boolean {
  return pathname === "/auth" || pathname.startsWith("/auth/") || pathname.startsWith("/admin");
}

export const INTERNAL_ROUTE_HEADER = "x-internal-route";

export function isInternalRouteRequest(headers: Headers): boolean {
  return headers.get(INTERNAL_ROUTE_HEADER) === "1";
}
