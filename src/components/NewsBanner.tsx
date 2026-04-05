import Link from "next/link";
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
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;

  const { data: bannerNews } = await supabase
    .from("news_updates")
    .select("slug, banner_text")
    .eq("published", true)
    .eq("is_banner", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (bannerNews?.slug && bannerNews.banner_text) {
    return <PromoBannerLink href={`/news/${bannerNews.slug}`} text={bannerNews.banner_text} />;
  }

  const { data: bannerBlog } = await supabase
    .from("blogs")
    .select("slug, banner_text")
    .eq("published", true)
    .eq("is_banner", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!bannerBlog?.slug || !bannerBlog.banner_text) {
    return null;
  }

  return <PromoBannerLink href={`/blogs/${bannerBlog.slug}`} text={bannerBlog.banner_text} />;
}
