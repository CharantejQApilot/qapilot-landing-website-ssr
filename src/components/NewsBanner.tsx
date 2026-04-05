import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
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

/** Top promo banner from Supabase — server-rendered for crawlers. News takes precedence over blogs. */
export default async function NewsBanner() {
  noStore();
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;

  // Use limit(1) + first row — NOT maybeSingle(): multiple is_banner rows would make PostgREST
  // return an error and hide the banner entirely.
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
    return <PromoBannerLink href={`/news/${bannerNews.slug}`} text={newsText} />;
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

  return <PromoBannerLink href={`/blogs/${bannerBlog.slug}`} text={blogText} />;
}
