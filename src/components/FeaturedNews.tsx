"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedNewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_date: string | null;
}

const FeaturedNews = () => {
  const { data: featuredNews, isLoading } = useQuery({
    queryKey: ["featured-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_updates")
        .select("id, title, slug, excerpt, featured_image, published_date")
        .eq("published", true)
        .eq("is_featured", true)
        .order("published_date", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data as FeaturedNewsItem[];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  });

  if (isLoading) {
    return (
      <section className="bg-background py-20 section-edge w-full">
        <div className="section-full" style={{ minHeight: '400px' }} />
      </section>
    );
  }

  if (!featuredNews || featuredNews.length === 0) return null;

  return (
    <section className="relative bg-background overflow-hidden border-t border-border section-edge w-full">
      <div className="section-full py-20 md:py-28 2xl:py-36">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 2xl:mb-16 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
              Latest Updates
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold text-foreground">
              What's New?
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm 2xl:text-base font-medium text-foreground flex items-center gap-2 hover:gap-3 transition-all underline underline-offset-4"
          >
            View all updates <ArrowRight size={16} />
          </Link>
        </div>

        {/* Bordered grid of news cards */}
        <div className="border border-border rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {featuredNews.map((item, index) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className={`group block transition-all duration-300 hover:bg-muted/30 ${
                  index < featuredNews.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''
                }`}
              >
                {item.featured_image && (
                  <div className="aspect-video overflow-hidden border-b border-border">
                    <img
                      src={item.featured_image}
                      alt={`${item.title} - QApilot News`}
                      width={640} height={360}
                      loading="lazy" decoding="async"
                      style={{ aspectRatio: '16/9' }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 2xl:p-8">
                  <h3 className="font-heading text-lg 2xl:text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm 2xl:text-base leading-relaxed">{item.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {item.published_date && (
                      <time>{new Date(item.published_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                    )}
                    <span className="text-foreground font-medium flex items-center group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
