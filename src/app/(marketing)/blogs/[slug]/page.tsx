import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import WriterCard from "@/components/WriterCard";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { sanitizeRichText } from "@/lib/sanitizeRichText";
import RelatedPosts from "@/components/RelatedPosts";
import { ArrowLeft } from "lucide-react";
import { formatPublishedDate } from "@/lib/format-published";
import {
  estimateReadingTimeMinutes,
  formatReadingTimeLabel,
} from "@/lib/reading-time";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL, DEFAULT_LOGO_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { articleMainEntityOfPage } from "@/lib/article-jsonld";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
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
import { ArticleSummariseWithAI } from "@/components/summarise-with-ai/ArticleSummariseWithAI";
import { formatPageTitle, formatPageTitleString } from "@/lib/page-title";
import {
  buildOpenGraphImageMeta,
  defaultOpenGraphImage,
  formatMetaDescription,
} from "@/lib/seo";

/** Between narrow `max-w-6xl` + `section-full` and full-bleed: readable column + visible side margin. */
const ARTICLE_GUTTER =
  "w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14";
const ARTICLE_MAX_WIDTH = "mx-auto w-full max-w-7xl";

/** ISR: avoids `force-dynamic` + RSC streaming edge cases on some hosts; tune if CMS must be hotter. */
export const revalidate = 120;

/** Prebuild published posts so production can serve HTML from the prerender cache (fewer serverless RSC failures). */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blogs")
    .select("slug")
    .eq("published", true);
  if (error || !data) return [];
  return data
    .map((row) => row.slug)
    .filter(
      (slug): slug is string => typeof slug === "string" && slug.length > 0,
    )
    .map((slug) => ({ slug }));
}

/**
 * Returns minimal "Not found" metadata if the row is missing instead of calling
 * `notFound()` from inside `generateMetadata`. Throwing `NEXT_NOT_FOUND` from
 * metadata while a sibling `error.tsx` boundary exists has been observed to
 * escalate to Next's generic /500 page on Vercel rather than the proper /404
 * (related to vercel/next.js#65013). We let the page handler decide the HTTP
 * status. That path reliably renders a 404 via the segment-level
 * `not-found.tsx`.
 */
const NOT_FOUND_METADATA: Metadata = {
  title: "Article not found",
  description: "We couldn't find that QApilot blog post.",
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
      route: "/blogs/[slug]",
      contentType: "blogs",
      slug,
      reason: "supabase-unavailable",
    });
    return NOT_FOUND_METADATA;
  }
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    logMetadataFallback({
      route: "/blogs/[slug]",
      contentType: "blogs",
      slug,
      reason: "query-error",
      details: {
        message: error.message,
        code: error.code,
      },
    });
  }

  if (error || !blog) {
    return NOT_FOUND_METADATA;
  }

  const baseTitle = firstNonEmptyString(blog.title) ?? "QApilot blog";
  const description =
    firstNonEmptyString(
      (blog as { seo_description?: unknown }).seo_description,
      blog.excerpt,
      (blog as { description?: unknown }).description,
    ) ??
    `Read ${baseTitle} on the QApilot blog. Expert insights on mobile app testing and QA automation.`;

  const metaTitle =
    firstNonEmptyString(
      (blog as { seo_title?: unknown }).seo_title,
      blog.title,
    ) ?? baseTitle;

  const ogRaw = firstNonEmptyString(
    (blog as { og_image_url?: unknown }).og_image_url,
    blog.featured_image,
  );
  const ogAbsolute = absoluteUrlForOpenGraph(ogRaw);
  const publishedTime = normalizeArticlePublishedTime(blog.published_date);

  const pageTitle = formatPageTitle(metaTitle);
  const displayTitle = formatPageTitleString(metaTitle);
  const ogImage =
    buildOpenGraphImageMeta(ogAbsolute, displayTitle) ?? defaultOpenGraphImage;
  const metaDescription = formatMetaDescription(description);

  try {
    return {
      title: pageTitle,
      description: metaDescription,
      alternates: {
        canonical: `${SITE_BASE_URL}${PATHS.BLOGS}/${blog.slug}`,
      },
      openGraph: {
        type: "article",
        title: displayTitle,
        description: metaDescription,
        url: `${SITE_BASE_URL}${PATHS.BLOGS}/${blog.slug}`,
        images: [ogImage],
        ...(publishedTime ? { publishedTime } : {}),
        authors: blog.author_name ? [blog.author_name] : undefined,
        siteName: "QApilot",
        locale: "en_US",
        tags: ["Mobile Testing", "QA Automation", "Test Automation"],
      },
      twitter: {
        card: "summary_large_image",
        title: displayTitle,
        description: metaDescription,
        images: [ogImage.url],
      },
    };
  } catch (error) {
    logMetadataFallback({
      route: "/blogs/[slug]",
      contentType: "blogs",
      slug,
      reason: "metadata-build-error",
      details: summarizeUnknownError(error),
    });
    return {
      title: pageTitle,
      description: metaDescription,
      alternates: {
        canonical: `${SITE_BASE_URL}${PATHS.BLOGS}/${blog.slug}`,
      },
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    notFound();
  }

  const slug = await resolveSlugParam(params);
  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (blogError || !blog) {
    notFound();
  }

  let writer = null;
  if (blog.writer_id) {
    const { data } = await supabase
      .from("writers")
      .select("*")
      .eq("id", blog.writer_id)
      .maybeSingle();
    writer = data;
  }

  const { data: relatedPosts, error: relatedPostsError } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, featured_image, published_date, youtube_url",
    )
    .eq("published", true)
    .neq("id", blog.id)
    .order("published_date", { ascending: false })
    .limit(3);

  const safeRelatedPosts = relatedPostsError ? null : relatedPosts;

  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "Blogs", path: PATHS.BLOGS },
    { name: blog.title, path: `${PATHS.BLOGS}/${blog.slug}` },
  ]);
  const articlePublishedTime = normalizeArticlePublishedTime(
    blog.published_date,
  );
  const articleModifiedTime =
    normalizeArticlePublishedTime(
      asTrimmedString((blog as { updated_at?: unknown }).updated_at),
    ) ?? articlePublishedTime;
  const articleImageUrl = absoluteUrlForOpenGraph(
    firstNonEmptyString(
      (blog as { og_image_url?: unknown }).og_image_url,
      blog.featured_image,
    ),
  );
  const articleUrl = `${SITE_BASE_URL}${PATHS.BLOGS}/${blog.slug}`;
  const articleStructuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    url: articleUrl,
    ...articleMainEntityOfPage(articleUrl),
    ...(blog.excerpt ? { description: blog.excerpt } : {}),
    ...(articlePublishedTime ? { datePublished: articlePublishedTime } : {}),
    ...(articleModifiedTime ? { dateModified: articleModifiedTime } : {}),
    ...(articleImageUrl ? { image: articleImageUrl } : {}),
    publisher: {
      "@type": "Organization",
      name: "QApilot",
      logo: { "@type": "ImageObject", url: DEFAULT_LOGO_URL },
    },
    ...(blog.author_name
      ? { author: { "@type": "Person", name: blog.author_name } }
      : {}),
  };
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@graph": [articleStructuredData, breadcrumbData],
  };

  const publishedLabel = formatPublishedDate(blog.published_date);
  const descriptionText = firstNonEmptyString(
    (blog as { description?: unknown }).description,
    blog.excerpt,
  );
  const category = asTrimmedString((blog as { category?: unknown }).category);
  const tags = commaSeparatedList((blog as { tags?: unknown }).tags);
  const youtubeUrl = asTrimmedString(blog.youtube_url);
  const contentFormat =
    asTrimmedString(
      (blog as { content_format?: unknown }).content_format,
    ).toLowerCase() === "markdown"
      ? "markdown"
      : "html";
  const content = asString(blog.content);
  const readingTimeMinutes = estimateReadingTimeMinutes(content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <MarketingPageShell background="soft">
        <main className="section-edge w-full py-16 md:py-20 lg:py-24">
          <div className={`${ARTICLE_GUTTER} ${ARTICLE_MAX_WIDTH}`}>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>

            {blog.featured_image && !youtubeUrl ? (
              <div className="w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={blog.featured_image}
                  alt={`${blog.title} - QApilot Blog`}
                  className="w-full h-auto object-contain"
                  width={1200}
                  height={630}
                  loading="eager"
                  style={{ aspectRatio: "1200/630" }}
                />
              </div>
            ) : null}

            <h1 className={cn(marketingHeroH1Class, "mb-4 text-gradient")}>
              {blog.title}
            </h1>

            <ArticleSummariseWithAI
              pageUrl={`${SITE_BASE_URL}${PATHS.BLOGS}/${blog.slug}`}
            />

            {descriptionText ? (
              <p className="mb-8 text-xl text-muted-foreground">
                {descriptionText}
              </p>
            ) : null}

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

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
              <div>
                {blog.author_name && (
                  <p className="font-semibold text-foreground">
                    {blog.author_name}
                  </p>
                )}
                {blog.author_designation && (
                  <p className="text-sm text-muted-foreground">
                    {blog.author_designation}
                  </p>
                )}
              </div>
              <div className="ml-auto flex flex-col items-end gap-1 text-sm text-muted-foreground">
                {readingTimeMinutes ? (
                  <span>{formatReadingTimeLabel(readingTimeMinutes)}</span>
                ) : null}
                {publishedLabel ? (
                  <time dateTime={blog.published_date ?? undefined}>
                    {publishedLabel}
                  </time>
                ) : null}
              </div>
            </div>

            {youtubeUrl ? <YouTubeEmbed url={youtubeUrl} /> : null}

            <div
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{
                __html: sanitizeRichText(content, contentFormat),
              }}
            />

            {writer &&
            typeof writer.name === "string" &&
            writer.name.trim().length > 0 ? (
              <WriterCard
                name={writer.name}
                designation={writer.designation}
                description={writer.description}
                linkedinUrl={writer.linkedin_url}
                profileImage={writer.profile_image}
              />
            ) : null}

            <RelatedPosts posts={safeRelatedPosts} basePath={PATHS.BLOGS} />
          </div>
        </main>
      </MarketingPageShell>
    </>
  );
}
