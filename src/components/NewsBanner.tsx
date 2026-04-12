import Link from "next/link";
import { unstable_cache } from "next/cache";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";

function PromoBannerLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      id="news-banner"
      className="block bg-brand-dark text-white transition-opacity hover:opacity-95"
    >
      <div className="section-full py-2.5">
        <div className="flex items-center justify-center text-center">
          <span className="mr-2 text-xl" aria-hidden>
            🎉
          </span>
          <span className="text-sm font-medium">{text}</span>
        </div>
      </div>
    </Link>
  );
}

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

const getCachedPromoBanner = unstable_cache(fetchPromoBanner, ["site-promo-banner"], {
  revalidate: 120,
  tags: ["promo-banner"],
});

/** Top promo banner from Supabase — server-rendered; cached 120s to reduce TTFB vs per-request noStore. */
export default async function NewsBanner() {
  const payload = await getCachedPromoBanner();
  if (!payload) return null;

  const href =
    payload.kind === "news" ? `/news/${payload.slug}` : `/blogs/${payload.slug}`;
  return <PromoBannerLink href={href} text={payload.text} />;
}
