import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { PATHS } from "@/lib/routes";

/** Preferred slugs for the two Featured Resources cards (Deep Links, Debug Mode). */
export const FEATURED_RESOURCE_BLOG_SLUGS = [
  "deep-links-jump-straight-to-what-matters",
  "debug-mode-precision-in-every-step",
] as const;

/**
 * Resolves CTA hrefs for FeaturedResourcesSection: use published preferred slugs,
 * otherwise fill from recent published posts (featured first), else `/blogs`.
 */
export async function getFeaturedResourcesCtaLinks(): Promise<
  readonly [string, string]
> {
  const fallback = PATHS.BLOGS;
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    return [fallback, fallback] as const;
  }

  const preferred = [...FEATURED_RESOURCE_BLOG_SLUGS];
  const { data: preferredRows } = await supabase
    .from("blogs")
    .select("slug")
    .eq("published", true)
    .in("slug", preferred);

  const publishedPreferred = new Set(
    (preferredRows ?? []).map((r) => r.slug).filter(Boolean) as string[],
  );

  const links: [string, string] = [
    publishedPreferred.has(preferred[0])
      ? `${PATHS.BLOGS}/${preferred[0]}`
      : fallback,
    publishedPreferred.has(preferred[1])
      ? `${PATHS.BLOGS}/${preferred[1]}`
      : fallback,
  ];

  const missingSlots = [0, 1].filter((i) => links[i] === fallback);
  if (missingSlots.length === 0) {
    return links;
  }

  const used = new Set<string>(
    preferred.filter((s) => publishedPreferred.has(s)),
  );

  const { data: candidates } = await supabase
    .from("blogs")
    .select("slug, is_featured, published_date")
    .eq("published", true)
    .order("is_featured", { ascending: false, nullsFirst: false })
    .order("published_date", { ascending: false, nullsFirst: false })
    .limit(12);

  const fillerSlugs = (candidates ?? [])
    .map((r) => r.slug)
    .filter((s): s is string => Boolean(s) && !used.has(s));

  let u = 0;
  for (const i of missingSlots) {
    const slug = fillerSlugs[u++];
    if (slug) {
      links[i] = `${PATHS.BLOGS}/${slug}`;
      used.add(slug);
    }
  }

  return links;
}
