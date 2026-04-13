import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";

export type SitePromoPayload =
  | { kind: "news"; slug: string; text: string }
  | { kind: "blog"; slug: string; text: string };

/** Shared by `/api/site-promo` and any server code that needs the active promo row. */
export async function fetchSitePromoBanner(): Promise<SitePromoPayload | null> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;

  const { data: newsRows } = await supabase
    .from("news_updates")
    .select("slug, banner_text")
    .eq("published", true)
    .eq("is_banner", true)
    .order("updated_at", { ascending: false })
    .limit(1);

  const bannerNews = newsRows?.[0];
  const newsText = bannerNews?.banner_text?.trim();
  if (bannerNews?.slug && newsText) {
    return { kind: "news", slug: bannerNews.slug, text: newsText };
  }

  const { data: blogRows } = await supabase
    .from("blogs")
    .select("slug, banner_text")
    .eq("published", true)
    .eq("is_banner", true)
    .order("updated_at", { ascending: false })
    .limit(1);

  const bannerBlog = blogRows?.[0];
  const blogText = bannerBlog?.banner_text?.trim();
  if (!bannerBlog?.slug || !blogText) {
    return null;
  }

  return { kind: "blog", slug: bannerBlog.slug, text: blogText };
}
