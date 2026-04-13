import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { NewsBannerPromo } from "@/components/NewsBannerPromo";

type PromoPayload =
  | { kind: "news"; slug: string; text: string }
  | { kind: "blog"; slug: string; text: string };

async function fetchPromoBanner(): Promise<PromoPayload | null> {
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

/** Top promo banner from Supabase — server-fetched; thin client shell avoids self-`Link` RSC issues on Vercel. */
export default async function NewsBanner() {
  let payload: PromoPayload | null = null;
  try {
    payload = await fetchPromoBanner();
  } catch (err) {
    console.error("[NewsBanner] Failed to load promo banner", err);
  }
  if (!payload) return null;

  const href =
    payload.kind === "news" ? `/news/${payload.slug}` : `/blogs/${payload.slug}`;
  return <NewsBannerPromo href={href} text={payload.text} />;
}
