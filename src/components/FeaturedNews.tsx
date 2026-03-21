import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";

export type FeaturedNewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_date: string | null;
};

/** Server-rendered featured news for SEO/crawlers (full HTML in first response). */
export default async function FeaturedNews() {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;
  const { data: featuredNews, error } = await supabase
    .from("news_updates")
    .select("id, title, slug, excerpt, featured_image, published_date")
    .eq("published", true)
    .eq("is_featured", true)
    .order("published_date", { ascending: false })
    .limit(3);

  if (error || !featuredNews?.length) {
    return null;
  }

  return (
    <section
      className="relative bg-background overflow-hidden border-t border-border section-edge w-full"
      aria-labelledby="featured-news-heading"
    >
      <div className="section-full pt-10 pb-12 md:pt-14 md:pb-14 2xl:pt-16 2xl:pb-16">
        <header
          className="mb-14 w-full rounded-2xl border border-border bg-muted/20 px-6 py-8 shadow-sm md:px-10 md:py-10 2xl:mb-20 2xl:px-12 2xl:py-12 relative overflow-hidden"
        >
          <span
            className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl"
            aria-hidden
          />
          <div className="relative pl-4 md:pl-5">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-3 md:mb-4">
                  Latest Updates
                </p>
                <h2
                  id="featured-news-heading"
                  className="font-heading text-2xl font-bold text-foreground tracking-tight leading-snug sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-[3.25rem]"
                >
                  What&apos;s <span className="text-primary">New</span>?
                </h2>
              </div>
              <Link
                href="/news"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary 2xl:text-base transition-all hover:gap-3 md:pb-0.5"
              >
                View all updates
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </header>

        <div className="border border-border rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {featuredNews.map((item, index) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className={`group block transition-all duration-300 hover:bg-muted/30 ${
                  index < featuredNews.length - 1
                    ? "border-b md:border-b-0 md:border-r border-border"
                    : ""
                }`}
              >
                {item.featured_image && (
                  <div className="aspect-video overflow-hidden border-b border-border">
                    <img
                      src={item.featured_image}
                      alt={`${item.title} - QApilot News`}
                      width={640}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      style={{ aspectRatio: "16/9" }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 2xl:p-8">
                  <h3 className="font-heading text-lg 2xl:text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm 2xl:text-base leading-relaxed">
                      {item.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {item.published_date && (
                      <time dateTime={item.published_date}>
                        {new Date(item.published_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
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
}
