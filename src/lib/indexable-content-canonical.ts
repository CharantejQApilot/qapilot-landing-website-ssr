import { SITE_BASE_URL } from "@/lib/constants";

/** Top-level segments for CMS / catalog detail pages that need strong canonical signals. */
const INDEXABLE_DETAIL_PREFIXES = new Set([
  "blogs",
  "news",
  "careers",
  "events",
]);

/**
 * Resolve an absolute canonical URL for indexable dynamic detail pages, or null.
 * Used by middleware to emit `Link: rel="canonical"` for crawlers.
 */
export function getIndexableContentCanonical(pathname: string): string | null {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/" || normalized.startsWith("/seo-drafts")) {
    return null;
  }

  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  if (segments[0] === "qa-guide") {
    if (segments.length === 2) {
      return `${SITE_BASE_URL}/qa-guide/${encodeURIComponent(segments[1])}`;
    }
    if (segments.length === 3) {
      // Legacy /qa-guide/:cluster/:slug → flat published URL
      return `${SITE_BASE_URL}/qa-guide/${encodeURIComponent(segments[2])}`;
    }
    return null;
  }

  if (segments.length === 2 && INDEXABLE_DETAIL_PREFIXES.has(segments[0])) {
    return `${SITE_BASE_URL}/${segments[0]}/${encodeURIComponent(segments[1])}`;
  }

  return null;
}
