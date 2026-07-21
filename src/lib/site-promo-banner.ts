import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";

export type SitePromoPayload =
  | { kind: "news"; slug: string; text: string }
  | { kind: "blog"; slug: string; text: string }
  | { kind: "custom"; href: string; text: string; external: boolean };

type HardcodedBanner = {
  text: string;
  href: string;
  /** Open in a new tab (for pages outside this Next.js app, e.g. event pages). */
  external: boolean;
};

/**
 * Hardcoded banners for content that isn't managed in the admin dashboard
 * (e.g. event/webinar pages). The first entry wins and takes precedence over
 * CMS (news/blog) banners. Managed manually — comment out or remove entries
 * when they're no longer relevant.
 */
const HARDCODED_PROMO_BANNERS: HardcodedBanner[] = [];

/** Shared by `/api/site-promo` and any server code that needs the active promo row. */
export async function fetchSitePromoBanner(): Promise<SitePromoPayload | null> {
  const hardcoded = HARDCODED_PROMO_BANNERS[0];
  if (hardcoded) {
    return {
      kind: "custom",
      href: hardcoded.href,
      text: hardcoded.text,
      external: hardcoded.external,
    };
  }

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
