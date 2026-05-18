import { PATHS } from "@/lib/routes";

export type QaGuideTier = "draft" | "index_worthy";

export function draftUrlPath(slug: string): string {
  return `/seo-drafts/${slug}`;
}

export function publishedUrlPath(cluster: string, slug: string): string {
  return `${PATHS.QA_GUIDE}/${cluster}/${slug}`;
}

export function clusterHubPath(cluster: string): string {
  return `${PATHS.QA_GUIDE}/${cluster}`;
}

export function metaRobotsForTier(tier: QaGuideTier): string {
  return tier === "index_worthy" ? "index,follow" : "noindex,nofollow";
}

export function isSitemapEligible(tier: QaGuideTier, status: string): boolean {
  return tier === "index_worthy" && status === "published";
}
