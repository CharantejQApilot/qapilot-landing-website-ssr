import { PATHS } from "@/lib/routes";

export type QaGuideTier = "draft" | "index_worthy";

export function draftUrlPath(slug: string): string {
  return `/seo-drafts/${slug}`;
}

/** Published guide URL (flat. No topic segment). */
export function publishedUrlPath(slug: string): string {
  return `${PATHS.QA_GUIDE}/${slug}`;
}

/** Legacy path before flat URLs; use for redirects only. */
export function legacyPublishedUrlPath(cluster: string, slug: string): string {
  return `${PATHS.QA_GUIDE}/${cluster}/${slug}`;
}

export function metaRobotsForTier(tier: QaGuideTier): string {
  return tier === "index_worthy" ? "index,follow" : "noindex,nofollow";
}

export function isSitemapEligible(tier: QaGuideTier, status: string): boolean {
  return tier === "index_worthy" && status === "published";
}
