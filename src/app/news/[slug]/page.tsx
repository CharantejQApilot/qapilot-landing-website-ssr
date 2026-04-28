import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import WriterCard from "@/components/WriterCard";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { sanitizeRichText } from "@/lib/sanitizeRichText";
import SocialEmbed from "@/components/SocialEmbed";
import RelatedPosts from "@/components/RelatedPosts";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { formatPublishedDate } from "@/lib/format-published";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL, DEFAULT_LOGO_URL } from "@/lib/constants";
import {
  DEFAULT_SHARE_IMAGE_URL,
  defaultOpenGraphImage,
} from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { extractYouTubeId } from "@/utils/youtube";
import { resolveSlugParam } from "@/lib/app-router-params";
import {
  absoluteUrlForOpenGraph,
  normalizeArticlePublishedTime,
} from "@/lib/share-metadata";
import {
  asString,
  asTrimmedString,
  commaSeparatedList,
  firstNonEmptyString,
} from "@/lib/cms-values";
import {
  logMetadataFallback,
  summarizeUnknownError,
} from "@/lib/server-telemetry";

/** Match blog article: readable column + comfortable side margin. */
const ARTICLE_GUTTER =
  "w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14";
const ARTICLE_MAX_WIDTH = "mx-auto w-full max-w-7xl";

function stripJsonLdContext(node: object): Record<string, unknown> {
  const o = { ...(node as Record<string, unknown>) };
  delete o["@context"];
  return o;
}

export const revalidate = 120;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("news_updates")
    .select("slug")
    .eq("published", true);
  if (error || !data) return [];
  return data
    .map((row) => row.slug)
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0)
    .map((slug) => ({ slug }));
}

interface Backlink {
  id: string;
  header: string;
  logo_url: string;
  description: string;
  link_url: string | null;
}

/**
 * Returns minimal "Not found" metadata if the row is missing instead of calling
 * `notFound()` from inside `generateMetadata`. Throwing `NEXT_NOT_FOUND` from
 * metadata while a sibling `error.tsx` boundary exists has been observed to
 * escalate to Next's generic /500 page on Vercel rather than the proper /404
 * (related to vercel/next.js#65013). We let the page handler decide the HTTP
 * status — that path reliably renders a 404 via the segment-level
 * `not-found.tsx`.
 */
const NOT_FOUND_METADATA: Metadata = {
  title: "News not found",
  description: "We couldn't find that QApilot news update.",
  robots: { index: false, follow: false },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = await resolveSlugParam(params);
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    logMetadataFallback({
      route: "/news/[slug]",
      contentType: "news_updates",
      slug,
      reason: "supabase-unavailable",
    });
    return NOT_FOUND_METADATA;
  }
  const { data: newsItem, error } = await supabase
    .from("news_updates")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    logMetadataFallback({
      route: "/news/[slug]",
      contentType: "news_updates",
      slug,
      reason: "query-error",
      details: {
        message: error.message,
        code: error.code,
      },
    });
  }

  if (error || !newsItem) {
    return NOT_FOUND_METADATA;
  }

  const baseTitle = firstNonEmptyString(newsItem.title) ?? "QApilot news";
  const description =
    firstNonEmptyString(
      newsItem.seo_description,
      newsItem.excerpt,
      newsItem.description,
    ) ??
    `Read ${baseTitle} on QApilot News. Latest updates on AI-powered mobile app testing.`;

  const metaTitle = firstNonEmptyString(newsItem.seo_title, newsItem.title) ?? baseTitle;
  const youtubeUrl = asTrimmedString(newsItem.youtube_url);
  const videoId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
  const ogImage = firstNonEmptyString(
    newsItem.og_image_url,
    newsItem.featured_image,
    videoThumbnail,
    DEFAULT_SHARE_IMAGE_URL,
  );
  const ogAbsolute = absoluteUrlForOpenGraph(ogImage) ?? DEFAULT_SHARE_IMAGE_URL;
  const publishedTime = normalizeArticlePublishedTime(newsItem.published_date);

  const kw = commaSeparatedList(newsItem.seo_keywords);
  const keywordsJoined =
    kw.length > 0
      ? kw.join(", ")
      : "QApilot news, mobile testing updates, QA automation news";

  /**
   * Avoid fixed width/height on arbitrary CMS image URLs: Next can probe remote
   * images during metadata resolution; very large PNGs (e.g. multi‑MB S3 assets)
   * have caused 500s on serverless.
   */
  try {
    return {
      title: metaTitle,
      description,
      keywords: keywordsJoined,
      alternates: {
        canonical: `${SITE_BASE_URL}${PATHS.NEWS}/${newsItem.slug}`,
      },
      openGraph: {
        type: "article",
        title: metaTitle,
        description,
        url: `${SITE_BASE_URL}${PATHS.NEWS}/${slug}`,
        images: [
          ogAbsolute === DEFAULT_SHARE_IMAGE_URL
            ? defaultOpenGraphImage
            : { url: ogAbsolute, alt: metaTitle },
        ],
        ...(publishedTime ? { publishedTime } : {}),
        authors: newsItem.author_name ? [newsItem.author_name] : undefined,
        siteName: "QApilot",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description,
        images: [ogAbsolute],
      },
    };
  } catch (error) {
    logMetadataFallback({
      route: "/news/[slug]",
      contentType: "news_updates",
      slug,
      reason: "metadata-build-error",
      details: summarizeUnknownError(error),
    });
    return {
      title: metaTitle,
      description,
      alternates: {
        canonical: `${SITE_BASE_URL}${PATHS.NEWS}/${newsItem.slug}`,
      },
    };
  }
}

export default async function NewsPostPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    notFound();
  }
  const slug = await resolveSlugParam(params);

  const { data: newsItem, error: newsError } = await supabase
    .from("news_updates")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (newsError || !newsItem) {
    notFound();
  }

  let writer = null;
  if (newsItem.writer_id) {
    const { data } = await supabase
      .from("writers")
      .select("*")
      .eq("id", newsItem.writer_id)
      .maybeSingle();
    writer = data;
  }

  let backlinks: Backlink[] = [];
  if (newsItem.id) {
    const { data } = await supabase
      .from("news_backlinks")
      .select("*")
      .eq("news_id", newsItem.id);
    backlinks = (data as Backlink[]) ?? [];
  }

  const { data: relatedPosts, error: relatedPostsError } = await supabase
    .from("news_updates")
    .select(
      "id, title, slug, excerpt, featured_image, published_date, youtube_url"
    )
    .eq("published", true)
    .neq("id", newsItem.id)
    .order("published_date", { ascending: false })
    .limit(3);

  const safeRelatedPosts = relatedPostsError ? null : relatedPosts;

  const youtubeUrl = asTrimmedString(newsItem.youtube_url);
  const videoId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;
  const videoEmbedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : null;
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
  const featuredImage = firstNonEmptyString(newsItem.featured_image);
  const effectiveOgImage =
    firstNonEmptyString(newsItem.featured_image, videoThumbnail, DEFAULT_SHARE_IMAGE_URL) ??
    DEFAULT_SHARE_IMAGE_URL;
  const leadDescription = firstNonEmptyString(newsItem.description, newsItem.excerpt);
  const category = firstNonEmptyString(newsItem.category);
  const tags = commaSeparatedList(newsItem.tags);

  const articleStructuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: newsItem.title,
    url: `${SITE_BASE_URL}${PATHS.NEWS}/${newsItem.slug}`,
    image: effectiveOgImage,
    ...(newsItem.excerpt ? { description: newsItem.excerpt } : {}),
    ...(newsItem.published_date
      ? { datePublished: newsItem.published_date }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "QApilot",
      logo: { "@type": "ImageObject", url: DEFAULT_LOGO_URL },
    },
    ...(newsItem.author_name
      ? { author: { "@type": "Person", name: newsItem.author_name } }
      : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_BASE_URL}${PATHS.NEWS}/${newsItem.slug}`,
    },
    ...(backlinks.length > 0
      ? {
          mentions: backlinks
            .filter((b) => b.link_url)
            .map((b) => ({
              "@type": "Organization",
              name: b.header,
              url: b.link_url,
              ...(b.logo_url ? { logo: b.logo_url } : {}),
            })),
        }
      : {}),
    ...(videoId && videoEmbedUrl
      ? {
          video: {
            "@type": "VideoObject",
            name: newsItem.title,
            description: newsItem.excerpt || newsItem.title,
            thumbnailUrl: videoThumbnail,
            embedUrl: videoEmbedUrl,
            contentUrl: youtubeUrl,
            ...(newsItem.published_date
              ? { uploadDate: newsItem.published_date }
              : {}),
            publisher: { "@type": "Organization", name: "QApilot" },
          },
        }
      : {}),
  };

  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "News", path: PATHS.NEWS },
    { name: newsItem.title, path: `${PATHS.NEWS}/${newsItem.slug}` },
  ]);

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      stripJsonLdContext(articleStructuredData),
      stripJsonLdContext(breadcrumbData),
    ],
  };

  const publishedLabel = formatPublishedDate(newsItem.published_date);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd),
        }}
      />
      <MarketingPageShell background="soft">
        <main className="section-edge w-full py-16 md:py-20 lg:py-24">
          <div className={`${ARTICLE_GUTTER} ${ARTICLE_MAX_WIDTH}`}>
            <Link
              href="/news"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>

            {featuredImage && !youtubeUrl && (
              <div className="mb-8 w-full overflow-hidden rounded-lg">
                <img
                  src={featuredImage}
                  alt={`${newsItem.title} - QApilot News`}
                  className="h-auto w-full object-contain"
                  width={1200}
                  height={630}
                  loading="eager"
                  style={{ aspectRatio: "1200/630" }}
                />
              </div>
            )}

            <h1 className={cn(marketingHeroH1Class, "mb-6 text-gradient")}>
              {newsItem.title}
            </h1>

            {leadDescription ? <p className="mb-8 text-xl text-muted-foreground">{leadDescription}</p> : null}

            {category || tags.length > 0 ? (
              <div className="mb-6 flex flex-wrap gap-2 text-sm">
                {category ? (
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 font-medium text-primary">
                    {category}
                  </span>
                ) : null}
                {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            ) : null}

            {(newsItem.author_name ||
              newsItem.author_designation ||
              newsItem.published_date) && (
              <div className="mb-8 flex items-center gap-4 border-b border-border pb-8">
                <div>
                  {newsItem.author_name ? (
                    <p className="font-semibold text-foreground">
                      {newsItem.author_name}
                    </p>
                  ) : null}
                  {newsItem.author_designation ? (
                    <p className="text-sm text-muted-foreground">
                      {newsItem.author_designation}
                    </p>
                  ) : null}
                </div>
                {publishedLabel ? (
                  <time
                    dateTime={newsItem.published_date ?? undefined}
                    className="ml-auto text-sm text-muted-foreground"
                  >
                    {publishedLabel}
                  </time>
                ) : null}
              </div>
            )}

            {youtubeUrl ? <YouTubeEmbed url={youtubeUrl} /> : null}

            <div
              className="news-content max-w-none"
              dangerouslySetInnerHTML={{
                __html: sanitizeRichText(
                  asString(newsItem.content),
                  asTrimmedString(newsItem.content_format).toLowerCase() === "markdown"
                    ? "markdown"
                    : "html",
                ),
              }}
            />

            {writer && typeof writer.name === "string" && writer.name.trim() ? (
              <WriterCard
                name={writer.name}
                designation={writer.designation}
                description={writer.description}
                linkedinUrl={writer.linkedin_url}
                profileImage={writer.profile_image}
              />
            ) : null}

            {newsItem.social_embed_url ? (
              <SocialEmbed
                url={newsItem.social_embed_url}
                image={newsItem.social_embed_image || undefined}
                description={newsItem.social_embed_description || undefined}
              />
            ) : null}

            {backlinks.length > 0 ? (
              <nav
                aria-label="Related organizations"
                className="mt-12 border-t border-border pt-8"
              >
                <div className="flex flex-wrap justify-center gap-6">
                  {backlinks.map((backlink) => {
                    const isLink = !!backlink.link_url;
                    const className = `flex w-full flex-col items-center rounded-xl border border-border/50 bg-card p-6 text-center shadow-sm sm:w-64 ${
                      isLink
                        ? "cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                        : ""
                    }`;

                    const content = (
                      <>
                        <div className="mb-4">
                          <img
                            src={backlink.logo_url}
                            alt={`${backlink.header} logo`}
                            className="h-16 w-auto object-contain"
                            width={160}
                            height={64}
                          />
                        </div>
                        <h4 className="mb-2 text-sm font-semibold text-foreground">
                          {backlink.header}
                        </h4>
                        {backlink.description ? (
                          <p className="mb-3 text-sm text-muted-foreground">
                            {backlink.description}
                          </p>
                        ) : null}
                        {backlink.link_url ? (
                          <div className="mt-auto flex items-center gap-1 text-sm text-primary">
                            {backlink.header}{" "}
                            <ExternalLink className="h-3 w-3" />
                          </div>
                        ) : null}
                      </>
                    );

                    return isLink ? (
                      <a
                        key={backlink.id}
                        href={backlink.link_url!}
                        target="_blank"
                        rel="noopener"
                        title={backlink.description || backlink.header}
                        className={className}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={backlink.id} className={className}>
                        {content}
                      </div>
                    );
                  })}
                </div>
              </nav>
            ) : null}

            <RelatedPosts posts={safeRelatedPosts} basePath={PATHS.NEWS} />

            <div className="mt-12 border-t border-border pt-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </MarketingPageShell>
    </>
  );
}
