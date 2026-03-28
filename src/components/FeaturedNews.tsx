import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { getYouTubeThumbnail } from "@/utils/youtube";
import { PATHS } from "@/lib/routes";

export type FeaturedNewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_date: string | null;
};

type FeaturedBlogRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_date: string | null;
  youtube_url: string | null;
};

type CardKind = "news" | "blog";

function WhatsNewCard({
  kind,
  item,
  showDividerAfter,
}: {
  kind: CardKind;
  item: FeaturedNewsItem | FeaturedBlogRow;
  /** Vertical on mobile; right border between columns on md+ */
  showDividerAfter: boolean;
}) {
  const href = kind === "news" ? `/news/${item.slug}` : `/blogs/${item.slug}`;
  const thumb =
    item.featured_image ||
    (kind === "blog" && "youtube_url" in item && item.youtube_url
      ? getYouTubeThumbnail(item.youtube_url)
      : null);
  const kindLabel = kind === "news" ? "News" : "Blog";
  const altPrefix = kind === "news" ? "QApilot News" : "QApilot Blog";

  return (
    <Link
      href={href}
      className={`group block transition-all duration-300 hover:bg-muted/30 ${
        showDividerAfter ? "border-b md:border-b-0 md:border-r border-border" : ""
      }`}
    >
      {thumb && (
        <div className="aspect-video overflow-hidden border-b border-border">
          <img
            src={thumb}
            alt={`${item.title} - ${altPrefix}`}
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
        <span className="mb-2 inline-block rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {kindLabel}
        </span>
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
              {new Date(item.published_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          <span className="text-foreground font-medium flex items-center group-hover:translate-x-1 transition-transform">
            Read <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Server-rendered: featured news + featured blogs for SEO (full HTML in first response). */
export default async function FeaturedNews() {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;

  const [newsRes, blogsRes] = await Promise.all([
    supabase
      .from("news_updates")
      .select("id, title, slug, excerpt, featured_image, published_date")
      .eq("published", true)
      .eq("is_featured", true)
      .order("published_date", { ascending: false })
      .limit(2),
    supabase
      .from("blogs")
      .select("id, title, slug, excerpt, featured_image, published_date, youtube_url")
      .eq("published", true)
      .eq("is_featured", true)
      .order("published_date", { ascending: false })
      .limit(2),
  ]);

  const featuredNews = (newsRes.data ?? []) as FeaturedNewsItem[];
  const featuredBlogs = (blogsRes.data ?? []) as FeaturedBlogRow[];

  if (!featuredNews.length && !featuredBlogs.length) {
    return null;
  }

  return (
    <section
      className="relative bg-background overflow-hidden border-t border-border section-edge w-full"
      aria-labelledby="featured-news-heading"
    >
      <div className="section-full pt-10 pb-12 md:pt-14 md:pb-14 2xl:pt-16 2xl:pb-16">
        <header className="mb-14 w-full rounded-2xl border border-border bg-muted/20 px-6 py-8 shadow-sm md:px-10 md:py-10 2xl:mb-20 2xl:px-12 2xl:py-12 relative overflow-hidden">
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
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base leading-relaxed">
                  Product news, announcements, and long-form guides from the team.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 md:justify-end md:pb-0.5">
                <Link
                  href={PATHS.NEWS}
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary 2xl:text-base transition-all hover:gap-3"
                >
                  All updates
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <span className="hidden sm:inline text-border" aria-hidden>
                  |
                </span>
                <Link
                  href={PATHS.BLOGS}
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary 2xl:text-base transition-all hover:gap-3"
                >
                  Blog
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-10 md:gap-12">
          {featuredNews.length > 0 && (
            <div>
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">
                  News &amp; product updates
                </h3>
                <Link
                  href={PATHS.NEWS}
                  className="text-sm font-medium text-primary hover:underline underline-offset-4 w-fit"
                >
                  View all news
                </Link>
              </div>
              <div className="border border-border rounded-2xl overflow-hidden">
                <div
                  className={`grid ${featuredNews.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1 max-w-2xl"}`}
                >
                  {featuredNews.map((item, index) => (
                    <WhatsNewCard
                      key={item.id}
                      kind="news"
                      item={item}
                      showDividerAfter={index < featuredNews.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {featuredBlogs.length > 0 && (
            <div>
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">
                  Featured from the blog
                </h3>
                <Link
                  href={PATHS.BLOGS}
                  className="text-sm font-medium text-primary hover:underline underline-offset-4 w-fit"
                >
                  All posts
                </Link>
              </div>
              <div className="border border-border rounded-2xl overflow-hidden">
                <div
                  className={`grid ${featuredBlogs.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1 max-w-2xl"}`}
                >
                  {featuredBlogs.map((item, index) => (
                    <WhatsNewCard
                      key={item.id}
                      kind="blog"
                      item={item}
                      showDividerAfter={index < featuredBlogs.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
