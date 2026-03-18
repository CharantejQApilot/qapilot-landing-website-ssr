"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Link from "next/link";

interface BannerNews {
  slug: string;
  banner_text: string;
}

const NewsBanner = () => {
  const { data: bannerNews, isLoading } = useQuery({
    queryKey: ["banner-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_updates")
        .select("slug, banner_text")
        .eq("published", true)
        .eq("is_banner", true)
        .single();
      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }
      return data as BannerNews;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  if (isLoading) {
    return <div id="news-banner" className="h-[44px]" />;
  }

  if (!bannerNews) return null;

  return (
    <>
      <Link
        href={`/news/${bannerNews.slug}`}
        id="news-banner"
        className="block bg-brand-dark text-white hover:opacity-95 transition-opacity"
      >
        <div className="section-full py-2.5">
          <div className="flex items-center justify-center text-center">
            <span className="text-xl mr-2">🎉</span>
            <span className="text-sm font-medium">
              {bannerNews.banner_text}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NewsBanner;
