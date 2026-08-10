import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { getYouTubeThumbnail } from "@/utils/youtube";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import {
  marketingHeroH1Class,
  marketingListingHeroLeadClass,
} from "@/lib/marketing-typography";
import { formatPublishedDate } from "@/lib/format-published";

const NEWS_PATH = PATHS.NEWS;
const canonicalUrl = `${SITE_BASE_URL}${NEWS_PATH}`;

const NEWS_LIST_SELECT =
  "id, slug, title, excerpt, featured_image, youtube_url, author_name, author_designation, published_date, is_featured";

const LIST_GUTTER =
  "w-full px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-10";

const LIST_MAX_WIDTH = "mx-auto max-w-[1920px]";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "News — Mobile Testing Updates & Announcements",
  description:
    "Product updates, partnerships, and mobile testing insights from QApilot—stay current on AI-native QA.",
  path: NEWS_PATH,
  ogDescription: "Latest announcements, product updates, and insights from QApilot.",
  twitterDescription: "News and announcements on AI-native mobile testing from QApilot.",
});

export const revalidate = 120;

type NewsListRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  youtube_url: string | null;
  author_name: string | null;
  author_designation: string | null;
  published_date: string | null;
  is_featured: boolean | null;
};

function resolveCardImageUrl(item: NewsListRow): string | undefined {
  if (item.featured_image) return item.featured_image;
  if (item.youtube_url) return getYouTubeThumbnail(item.youtube_url) ?? undefined;
  return undefined;
}

function stripJsonLdContext(node: object): Record<string, unknown> {
  const o = { ...(node as Record<string, unknown>) };
  delete o["@context"];
  return o;
}

function NewsImagePlaceholder() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground"
      aria-hidden
    >
      <FileText className="h-12 w-12 opacity-40" strokeWidth={1.25} />
    </div>
  );
}

export default async function NewsPage() {
  const supabase = tryCreateServerSupabaseClient();
  const { data } = supabase
    ? await supabase
        .from("news_updates")
        .select(NEWS_LIST_SELECT)
        .eq("published", true)
        .order("published_date", { ascending: false })
    : { data: null as null };

  const list = (data as NewsListRow[] | null) ?? [];

  const itemListElements =
    list.length > 0
      ? list.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.title,
          item: `${SITE_BASE_URL}${NEWS_PATH}/${item.slug}`,
        }))
      : undefined;

  const collectionPage: Record<string, unknown> = {
    "@type": "CollectionPage",
    name: "QApilot News & Updates",
    description:
      "Stay updated with the latest news, product updates, and industry insights from QApilot.",
    url: canonicalUrl,
    publisher: { "@type": "Organization", name: "QApilot" },
  };
  if (itemListElements) {
    collectionPage.mainEntity = {
      "@type": "ItemList",
      numberOfItems: itemListElements.length,
      itemListElement: itemListElements,
    };
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      collectionPage,
      stripJsonLdContext(
        buildBreadcrumbList([
          { name: "Home", path: PATHS.HOME },
          { name: "News", path: NEWS_PATH },
        ]),
      ),
    ],
  };

  const featuredNews = list.filter((n) => n.is_featured);
  const regularNews = list.filter((n) => !n.is_featured);
  const singleFeatured = featuredNews.length === 1;

  const gridFeatured = singleFeatured
    ? "mx-auto grid w-full max-w-4xl list-none grid-cols-1 gap-8 sm:gap-10 xl:max-w-5xl"
    : "mx-auto grid w-full max-w-7xl list-none grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:justify-items-stretch xl:gap-12 [&>li:last-child:nth-child(odd)]:md:col-span-2 [&>li:last-child:nth-child(odd)]:md:max-w-3xl [&>li:last-child:nth-child(odd)]:md:justify-self-center [&>li:last-child:nth-child(odd)]:md:w-full";

  const gridAll =
    "mx-auto grid w-full max-w-7xl list-none gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MarketingPageShell background="none">
        <main className="relative w-full">
          <div className="w-full border-b border-border bg-gradient-to-b from-primary-light/50 via-background to-background bg-dot-pattern-subtle">
            <div className="section-full py-16 md:py-24 lg:py-28 2xl:py-32">
              <header className="relative w-full text-center lg:text-left">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:mb-5">
                  QApilot news
                </p>
                <h1 className={marketingHeroH1Class}>
                  <span className="text-gradient">News &amp; updates</span>
                </h1>
                <p className={marketingListingHeroLeadClass}>
                  Stay up to date with the latest announcements and updates
                  from QApilot.
                </p>
              </header>
            </div>
          </div>

          <div className={`bg-background ${LIST_GUTTER} py-14 md:py-20`}>
            <div className={`${LIST_MAX_WIDTH} bg-dot-pattern-subtle`}>
              <section
                aria-labelledby="news-intro"
                className="mx-auto mb-14 max-w-4xl text-center md:mb-16"
              >
                <h2
                  id="news-intro"
                  className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl"
                >
                  Latest QApilot news and community updates
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  <p>
                    This news hub highlights product launches, partnerships, conference
                    sponsorships, and community events from the QApilot team. Follow along for
                    announcements about AI-native mobile testing, enterprise rollouts, and how we
                    collaborate with QA leaders worldwide.
                  </p>
                  <p>
                    From DevFest and QE Conclave to customer success stories and executive
                    interviews, each update explains what changed and why it matters for mobile
                    release quality. Check back for the newest posts or browse the archive below.
                  </p>
                </div>
              </section>
              {list.length === 0 ? (
                <div className="flex flex-col items-center py-24 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                    <FileText
                      className="h-10 w-10 text-muted-foreground"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    No news yet
                  </h2>
                  <p className="mt-2 max-w-md text-muted-foreground">
                    New updates will appear here soon.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
                  {featuredNews.length > 0 ? (
                    <section
                      aria-labelledby="news-featured"
                      className="flex flex-col items-center"
                    >
                      <div className="mb-8 flex w-full max-w-3xl flex-col items-center gap-2 text-center md:mb-12">
                        <h2
                          id="news-featured"
                          className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                        >
                          Featured
                        </h2>
                        <p className="text-base text-muted-foreground md:text-lg">
                          Highlights from the team — start here.
                        </p>
                      </div>
                      <ul className={gridFeatured}>
                        {featuredNews.map((item, index) => {
                          const imgSrc = resolveCardImageUrl(item);
                          const featuredDateLabel = formatPublishedDate(
                            item.published_date,
                            "MMMM d, yyyy",
                          );
                          return (
                            <li key={item.id}>
                              <Link
                                href={`/news/${item.slug}`}
                                className="group block h-full rounded-2xl border-2 border-primary/15 bg-card shadow-md outline-none ring-offset-background transition-shadow hover:border-primary/25 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <article className="flex h-full flex-col overflow-hidden rounded-2xl">
                                  <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-muted md:aspect-[2/1]">
                                    {imgSrc ? (
                                      <img
                                        src={imgSrc}
                                        alt={`${item.title} — QApilot news`}
                                        width={960}
                                        height={540}
                                        loading={
                                          index === 0 ? "eager" : "lazy"
                                        }
                                        fetchPriority={
                                          index === 0 ? "high" : undefined
                                        }
                                        decoding="async"
                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                      />
                                    ) : (
                                      <NewsImagePlaceholder />
                                    )}
                                  </div>
                                  <div className="flex flex-1 flex-col gap-4 p-7 sm:gap-5 sm:p-9 md:p-10 lg:p-11">
                                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary sm:text-sm">
                                      <span>Featured</span>
                                      {featuredDateLabel ? (
                                        <span className="text-muted-foreground">
                                          {featuredDateLabel}
                                        </span>
                                      ) : null}
                                    </div>
                                    <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary sm:text-2xl md:text-3xl xl:text-4xl xl:leading-tight">
                                      {item.title}
                                    </h3>
                                    {item.excerpt ? (
                                      <p className="line-clamp-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                                        {item.excerpt}
                                      </p>
                                    ) : null}
                                    <div className="mt-auto border-t border-border pt-5 text-sm text-muted-foreground md:text-base">
                                      {item.author_name ? (
                                        <p className="font-medium text-foreground">
                                          {item.author_name}
                                        </p>
                                      ) : null}
                                      {item.author_designation ? (
                                        <p>{item.author_designation}</p>
                                      ) : null}
                                    </div>
                                  </div>
                                </article>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ) : null}

                  {regularNews.length > 0 ? (
                    <section
                      aria-labelledby="news-all"
                      className="border-t border-border pt-16 md:pt-20"
                    >
                      <div className="mb-8 flex flex-col items-center gap-2 text-center md:mb-12">
                        <h2
                          id="news-all"
                          className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                        >
                          {featuredNews.length > 0
                            ? "All updates"
                            : "Updates"}
                        </h2>
                        <p className="mx-auto max-w-2xl text-center text-base text-muted-foreground md:text-lg">
                          Browse every published announcement.
                        </p>
                      </div>
                      <ul className={gridAll}>
                        {regularNews.map((item) => {
                          const imgSrc = resolveCardImageUrl(item);
                          const regularDateLabel = formatPublishedDate(
                            item.published_date,
                            "MMM d, yyyy",
                          );
                          return (
                            <li key={item.id}>
                              <Link
                                href={`/news/${item.slug}`}
                                className="group block h-full rounded-2xl border border-border bg-card outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <article className="flex h-full flex-col overflow-hidden rounded-2xl">
                                  <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-muted">
                                    {imgSrc ? (
                                      <img
                                        src={imgSrc}
                                        alt={`${item.title} — QApilot news`}
                                        width={800}
                                        height={450}
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                      />
                                    ) : (
                                      <NewsImagePlaceholder />
                                    )}
                                  </div>
                                  <div className="flex flex-1 flex-col gap-2 p-6 sm:gap-3 sm:p-7 md:p-8">
                                    {regularDateLabel ? (
                                      <time
                                        dateTime={item.published_date}
                                        className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                                      >
                                        {regularDateLabel}
                                      </time>
                                    ) : null}
                                    <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary md:text-xl">
                                      {item.title}
                                    </h3>
                                    {item.excerpt ? (
                                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {item.excerpt}
                                      </p>
                                    ) : null}
                                    <div className="mt-3 text-sm text-muted-foreground">
                                      {item.author_name ? (
                                        <p className="font-medium text-foreground">
                                          {item.author_name}
                                        </p>
                                      ) : null}
                                      {item.author_designation ? (
                                        <p>{item.author_designation}</p>
                                      ) : null}
                                    </div>
                                  </div>
                                </article>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </main>
      </MarketingPageShell>
    </>
  );
}
