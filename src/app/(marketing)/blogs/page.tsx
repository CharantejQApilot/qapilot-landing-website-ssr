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
import { CmsRemoteImage } from "@/components/CmsRemoteImage";
import {
  marketingHeroH1Class,
  marketingListingHeroLeadClass,
} from "@/lib/marketing-typography";
import { formatPublishedDate } from "@/lib/format-published";

const BLOGS_PATH = PATHS.BLOGS;
const canonicalUrl = `${SITE_BASE_URL}${BLOGS_PATH}`;

const BLOG_LIST_SELECT =
  "id, slug, title, excerpt, featured_image, youtube_url, author_name, author_designation, published_date, is_featured";

const BLOGS_MAX_WIDTH = "mx-auto max-w-[1920px]";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Blogs. Mobile Testing Tips, Guides & Best Practices",
  description:
    "Expert insights on mobile app testing, QA automation, and test strategy. Learn best practices for iOS and Android testing from the QApilot team.",
  path: BLOGS_PATH,
  ogDescription:
    "Expert insights on mobile app testing, QA automation, and test strategy from the QApilot team.",
  twitterDescription:
    "Expert guides and strategies for mobile app testing and QA automation.",
});

export const revalidate = 120;

type BlogListRow = {
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

function resolveCardImageUrl(blog: BlogListRow): string | undefined {
  if (blog.featured_image) return blog.featured_image;
  if (blog.youtube_url)
    return getYouTubeThumbnail(blog.youtube_url) ?? undefined;
  return undefined;
}

function stripJsonLdContext(node: object): Record<string, unknown> {
  const o = { ...(node as Record<string, unknown>) };
  delete o["@context"];
  return o;
}

function BlogImagePlaceholder() {
  return (
    <div
      className="flex h-full min-h-[12rem] w-full items-center justify-center bg-muted text-muted-foreground"
      aria-hidden
    >
      <FileText className="h-12 w-12 opacity-40" strokeWidth={1.25} />
    </div>
  );
}

export default async function BlogsPage() {
  const supabase = tryCreateServerSupabaseClient();
  const { data: blogs } = supabase
    ? await supabase
        .from("blogs")
        .select(BLOG_LIST_SELECT)
        .eq("published", true)
        .order("published_date", { ascending: false })
    : { data: null as null };

  const list = (blogs as BlogListRow[] | null) ?? [];

  const itemListElements =
    list.length > 0
      ? list.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.title,
          item: `${SITE_BASE_URL}${BLOGS_PATH}/${b.slug}`,
        }))
      : undefined;

  const collectionPage: Record<string, unknown> = {
    "@type": "CollectionPage",
    name: "QApilot Blog",
    description:
      "Expert insights on mobile app testing, QA automation, and test strategy.",
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
          { name: "Blogs", path: BLOGS_PATH },
        ]),
      ),
    ],
  };

  const featuredBlogs = list.filter((b) => b.is_featured);
  const regularBlogs = list.filter((b) => !b.is_featured);
  const singleFeatured = featuredBlogs.length === 1;

  /** At `max-w-7xl`, 2 columns → much wider cards than “All posts” (3 columns in same width). */
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
              <header className="relative w-full text-left">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:mb-5">
                  QApilot blog
                </p>
                <h1 className={marketingHeroH1Class}>
                  <span className="text-gradient">
                    Mobile Testing Insights &amp; Best Practices
                  </span>
                </h1>
                <p className={marketingListingHeroLeadClass}>
                  Expert guides, tips, and strategies for mobile app testing and
                  QA automation.
                </p>
              </header>
            </div>
          </div>

          <div className="section-full bg-background py-14 md:py-20">
            <div className={`${BLOGS_MAX_WIDTH} bg-dot-pattern-subtle`}>
              <section
                aria-labelledby="blogs-intro"
                className="mb-14 w-full text-left md:mb-16"
              >
                <h2
                  id="blogs-intro"
                  className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl"
                >
                  What you&apos;ll find on the QApilot blog
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  <p>
                    Our blog covers practical mobile QA for Android, iOS, and
                    Flutter teams. From autonomous testing and self-healing
                    automation to release readiness, device health, and security
                    reporting. Whether you are modernizing a legacy Appium stack
                    or scaling CI/CD for a fintech or consumer app, these
                    articles share patterns we see in the field.
                  </p>
                  <p>
                    Browse featured posts for deep dives, or explore the full
                    archive for how-to guides, opinion pieces, and product
                    thinking from QApilot engineers and partners. New posts are
                    added regularly as mobile testing practices evolve.
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
                    No posts yet
                  </h2>
                  <p className="mt-2 max-w-md text-muted-foreground">
                    New articles will appear here soon.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
                  {featuredBlogs.length > 0 ? (
                    <section
                      aria-labelledby="blogs-featured"
                      className="flex flex-col items-start"
                    >
                      <div className="mb-8 flex w-full flex-col items-start gap-2 text-left md:mb-12">
                        <h2
                          id="blogs-featured"
                          className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                        >
                          Featured
                        </h2>
                        <p className="text-base text-muted-foreground md:text-lg">
                          Highlights from the team. Start here.
                        </p>
                      </div>
                      <ul className={gridFeatured}>
                        {featuredBlogs.map((blog, index) => {
                          const imgSrc = resolveCardImageUrl(blog);
                          const featuredDateLabel = formatPublishedDate(
                            blog.published_date,
                            "MMMM d, yyyy",
                          );
                          return (
                            <li key={blog.id}>
                              <Link
                                href={`/blogs/${blog.slug}`}
                                className="group block h-full rounded-2xl border-2 border-primary/15 bg-card shadow-md outline-none ring-offset-background transition-shadow hover:border-primary/25 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <article className="flex h-full flex-col overflow-hidden rounded-2xl">
                                  <div className="relative aspect-[16/9] w-full min-h-[200px] shrink-0 bg-muted sm:min-h-[220px] md:aspect-[2/1] md:min-h-[240px]">
                                    {imgSrc ? (
                                      <CmsRemoteImage
                                        src={imgSrc}
                                        alt={`${blog.title}. QApilot blog`}
                                        width={960}
                                        height={540}
                                        priority={index === 0}
                                        sizes="(max-width: 768px) 100vw, 960px"
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <BlogImagePlaceholder />
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
                                      {blog.title}
                                    </h3>
                                    {blog.excerpt ? (
                                      <p className="line-clamp-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                                        {blog.excerpt}
                                      </p>
                                    ) : null}
                                    <div className="mt-auto border-t border-border pt-5 text-sm text-muted-foreground md:text-base">
                                      {blog.author_name ? (
                                        <p className="font-medium text-foreground">
                                          {blog.author_name}
                                        </p>
                                      ) : null}
                                      {blog.author_designation ? (
                                        <p>{blog.author_designation}</p>
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

                  {regularBlogs.length > 0 ? (
                    <section
                      aria-labelledby="blogs-all"
                      className="border-t border-border pt-16 md:pt-20"
                    >
                      <div className="mb-8 flex flex-col items-start gap-2 text-left md:mb-12">
                        <h2
                          id="blogs-all"
                          className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                        >
                          {featuredBlogs.length > 0 ? "All posts" : "Articles"}
                        </h2>
                        <p className="w-full text-left text-base text-muted-foreground md:text-lg">
                          Browse every published article.
                        </p>
                      </div>
                      <ul className={gridAll}>
                        {regularBlogs.map((blog) => {
                          const imgSrc = resolveCardImageUrl(blog);
                          const regularDateLabel = formatPublishedDate(
                            blog.published_date,
                            "MMM d, yyyy",
                          );
                          return (
                            <li key={blog.id}>
                              <Link
                                href={`/blogs/${blog.slug}`}
                                className="group block h-full rounded-2xl border border-border bg-card outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <article className="flex h-full flex-col overflow-hidden rounded-2xl">
                                  <div className="relative aspect-[16/9] w-full shrink-0 bg-muted">
                                    {imgSrc ? (
                                      <CmsRemoteImage
                                        src={imgSrc}
                                        alt={`${blog.title}. QApilot blog`}
                                        width={800}
                                        height={450}
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <BlogImagePlaceholder />
                                    )}
                                  </div>
                                  <div className="flex flex-1 flex-col gap-2 p-6 sm:gap-3 sm:p-7 md:p-8">
                                    {regularDateLabel ? (
                                      <time
                                        dateTime={blog.published_date}
                                        className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                                      >
                                        {regularDateLabel}
                                      </time>
                                    ) : null}
                                    <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary md:text-xl">
                                      {blog.title}
                                    </h3>
                                    {blog.excerpt ? (
                                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {blog.excerpt}
                                      </p>
                                    ) : null}
                                    <div className="mt-3 text-sm text-muted-foreground">
                                      {blog.author_name ? (
                                        <p className="font-medium text-foreground">
                                          {blog.author_name}
                                        </p>
                                      ) : null}
                                      {blog.author_designation ? (
                                        <p>{blog.author_designation}</p>
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
