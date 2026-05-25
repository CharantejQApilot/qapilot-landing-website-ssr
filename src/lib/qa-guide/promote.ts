import {
  draftUrlPath,
  metaRobotsForTier,
  publishedUrlPath,
  type QaGuideTier,
} from "@/lib/qa-guide/urls";

export type QaGuideRow = {
  id: string;
  slug: string;
  topic_cluster: string;
  tier: QaGuideTier;
  status: string;
  url_path: string;
  previous_url_path: string | null;
  meta_robots: string;
  published_date: string | null;
};

export type PromotePatch = {
  tier?: QaGuideTier;
  status?: "draft" | "published";
  topic_cluster?: string;
};

/** Single human gate: index_worthy + published + live URL + index robots. */
export function applyTierTransition(
  row: Pick<QaGuideRow, "slug" | "topic_cluster" | "url_path">,
  patch: PromotePatch,
): Partial<QaGuideRow> {
  const tier = patch.tier ?? "draft";
  const status = patch.status ?? (tier === "index_worthy" ? "published" : "draft");
  const cluster = patch.topic_cluster ?? row.topic_cluster;

  if (tier === "index_worthy") {
    const newPath = publishedUrlPath(row.slug);
    return {
      tier: "index_worthy",
      status: "published",
      topic_cluster: cluster,
      url_path: newPath,
      previous_url_path: row.url_path !== newPath ? row.url_path : null,
      meta_robots: metaRobotsForTier("index_worthy"),
      published_date: new Date().toISOString(),
    };
  }

  const newPath = draftUrlPath(row.slug);
  return {
    tier: "draft",
    status: "draft",
    topic_cluster: cluster,
    url_path: newPath,
    previous_url_path: row.url_path !== newPath ? row.url_path : null,
    meta_robots: metaRobotsForTier("draft"),
    published_date: null,
  };
}

export function buildDraftInsertFields(
  slug: string,
  topicCluster: string,
): Pick<QaGuideRow, "tier" | "status" | "url_path" | "meta_robots" | "published_date"> {
  return {
    tier: "draft",
    status: "draft",
    url_path: draftUrlPath(slug),
    meta_robots: metaRobotsForTier("draft"),
    published_date: null,
  };
}
