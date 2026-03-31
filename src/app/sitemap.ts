import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";

/** Regenerate periodically; blog slugs merged from Supabase when configured. */
export const revalidate = 3600;

const staticPages: MetadataRoute.Sitemap = [
  { url: `${SITE_BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
  {
    url: `${SITE_BASE_URL}${PATHS.PRODUCT}`,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.AUTONOMOUS_TESTING}`,
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.INTELLIGENT_BUG_DETECTION}`,
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.ENTERPRISE}`,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.ABOUT}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_FLUTTER}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.BRING_YOUR_OWN_AGENT}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.AGENTIC_ARCHITECTURE}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.NEWS}`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.BLOGS}`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.CAREERS}`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FAQS}`,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.LABS}`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.SECURITY_REPORTS}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.AI_SELF_HEALING}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_RELEASE_MANAGER}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_QA_ENGINEER}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_QA_LEADER}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_PRODUCT_OWNER}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_SRE}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.TERMS}`,
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = tryCreateServerSupabaseClient();
  const blogEntries: MetadataRoute.Sitemap = [];

  if (supabase) {
    const { data } = await supabase
      .from("blogs")
      .select("slug, published_date")
      .eq("published", true)
      .order("published_date", { ascending: false });

    for (const row of data ?? []) {
      if (!row.slug) continue;
      blogEntries.push({
        url: `${SITE_BASE_URL}${PATHS.BLOGS}/${row.slug}`,
        lastModified: row.published_date
          ? new Date(row.published_date)
          : undefined,
        changeFrequency: "weekly",
        priority: 0.75,
      });
    }
  }

  return [...staticPages, ...blogEntries];
}
