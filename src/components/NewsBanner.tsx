import Link from "next/link";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";

/** Top promo banner from Supabase — server-rendered for crawlers. */
export default async function NewsBanner() {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;
  const { data: bannerNews, error } = await supabase
    .from("news_updates")
    .select("slug, banner_text")
    .eq("published", true)
    .eq("is_banner", true)
    .single();

  if (error?.code === "PGRST116" || !bannerNews?.slug || !bannerNews?.banner_text) {
    return null;
  }

  return (
    <Link
      href={`/news/${bannerNews.slug}`}
      id="news-banner"
      className="block bg-brand-dark text-white hover:opacity-95 transition-opacity"
    >
      <div className="section-full py-2.5">
        <div className="flex items-center justify-center text-center">
          <span className="text-xl mr-2" aria-hidden>
            🎉
          </span>
          <span className="text-sm font-medium">{bannerNews.banner_text}</span>
        </div>
      </div>
    </Link>
  );
}
