import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import WriterCard from "@/components/WriterCard";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { sanitizeRichText } from "@/lib/sanitizeRichText";
import RelatedPosts from "@/components/RelatedPosts";
import { ArrowLeft } from "lucide-react";
import { formatPublishedDate } from "@/lib/format-published";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL, DEFAULT_LOGO_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
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

/** Match the /blogs article gutter so the two layouts feel identical. */
const ARTICLE_GUTTER =
  "w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14";
const ARTICLE_MAX_WIDTH = "mx-auto w-full max-w-7xl";

/** ISR: same cadence as /blogs/[slug] for predictable freshness. */
export const revalidate = 120;

/** Prebuild published case studies so production can serve from the prerender cache. */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("case_studies")
    .select("slug")
    .eq("published", true);
  if (error || !data) return [];
  return data
    .map((row) => row.slug)
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0)
    .map((slug) => ({ slug }));
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
  title: "Case study not found",
  description: "We couldn't find that QApilot case study.",
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
      route: "/case-studies/[slug]",
      contentType: "case_studies",
      slug,
      reason: "supabase-unavailable",
    });
    return NOT_FOUND_METADATA;
  }
  const { data: caseStudy, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    logMetadataFallback({
      route: "/case-studies/[slug]",
      contentType: "case_studies",
      slug,
      reason: "query-error",
      details: {
        message: error.message,
        code: error.code,
      },
    });
  }

  if (error || !caseStudy) {
    return NOT_FOUND_METADATA;
  }

  const baseTitle = firstNonEmptyString(caseStudy.title) ?? "QApilot case study";
  const description =
    firstNonEmptyString(
      (caseStudy as { seo_description?: unknown }).seo_description,
      caseStudy.excerpt,
      (caseStudy as { description?: unknown }).description,
    ) ??
    `Read ${baseTitle} - a QApilot customer story on shipping mobile apps with AI-driven testing.`;

  const metaTitle =
    firstNonEmptyString(
      (caseStudy as { seo_title?: unknown }).seo_title,
      caseStudy.title,
    ) ?? baseTitle;

  const kw = commaSeparatedList(
    (caseStudy as { seo_keywords?: unknown }).seo_keywords,
  );
  const keywordsJoined =
    kw.length > 0
      ? kw.join(", ")
      : "QApilot case study, mobile testing case study, QA automation outcomes";

  const ogRaw = firstNonEmptyString(
    (caseStudy as { og_image_url?: unknown }).og_image_url,
    caseStudy.featured_image,
  );
  const ogAbsolute = absoluteUrlForOpenGraph(ogRaw);
  const publishedTime = normalizeArticlePublishedTime(
    caseStudy.published_date,
  );

  /**
   * Avoid declaring fixed `width`/`height` on arbitrary CMS OG image URLs.
   * Next can probe remote images during metadata resolution; multi‑MB S3 PNGs
   * have caused 500s on serverless ISR for newly published items not in the
   * prerender cache. Same pattern as /news/[slug] which has been stable.
   * The whole return is wrapped in try/catch so a metadata hiccup never
   * cascades to a /500.
   */
  try {
    return {
      title: metaTitle,
      description,
      keywords: keywordsJoined,
      alternates: {
        canonical: `${SITE_BASE_URL}${PATHS.CASE_STUDIES}/${caseStudy.slug}`,
      },
      openGraph: {
        type: "article",
        title: metaTitle,
        description,
        url: `${SITE_BASE_URL}${PATHS.CASE_STUDIES}/${caseStudy.slug}`,
        ...(ogAbsolute
          ? { images: [{ url: ogAbsolute, alt: metaTitle }] }
          : {}),
        ...(publishedTime ? { publishedTime } : {}),
        authors: caseStudy.author_name ? [caseStudy.author_name] : undefined,
        siteName: "QApilot",
        locale: "en_US",
        tags: ["Case Study", "Mobile Testing", "QA Automation"],
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description,
        ...(ogAbsolute ? { images: [ogAbsolute] } : {}),
      },
    };
  } catch (error) {
    logMetadataFallback({
      route: "/case-studies/[slug]",
      contentType: "case_studies",
      slug,
      reason: "metadata-build-error",
      details: summarizeUnknownError(error),
    });
    return {
      title: metaTitle,
      description,
      alternates: {
        canonical: `${SITE_BASE_URL}${PATHS.CASE_STUDIES}/${caseStudy.slug}`,
      },
    };
  }
}

export default async function CaseStudyPostPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    notFound();
  }

  const slug = await resolveSlugParam(params);
  const { data: caseStudy, error: caseStudyError } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (caseStudyError || !caseStudy) {
    notFound();
  }

  let writer = null;
  if (caseStudy.writer_id) {
    const { data } = await supabase
      .from("writers")
      .select("*")
      .eq("id", caseStudy.writer_id)
      .maybeSingle();
    writer = data;
  }

  const { data: relatedPosts, error: relatedPostsError } = await supabase
    .from("case_studies")
    .select(
      "id, title, slug, excerpt, featured_image, published_date, youtube_url"
    )
    .eq("published", true)
    .neq("id", caseStudy.id)
    .order("published_date", { ascending: false })
    .limit(3);

  const safeRelatedPosts = relatedPostsError ? null : relatedPosts;

  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "Case Studies", path: PATHS.CASE_STUDIES },
    { name: caseStudy.title, path: `${PATHS.CASE_STUDIES}/${caseStudy.slug}` },
  ]);
  const articlePublishedTime = normalizeArticlePublishedTime(caseStudy.published_date);
  const articleStructuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    url: `${SITE_BASE_URL}${PATHS.CASE_STUDIES}/${caseStudy.slug}`,
    ...(caseStudy.excerpt ? { description: caseStudy.excerpt } : {}),
    ...(articlePublishedTime ? { datePublished: articlePublishedTime } : {}),
    publisher: {
      "@type": "Organization",
      name: "QApilot",
      logo: { "@type": "ImageObject", url: DEFAULT_LOGO_URL },
    },
    ...(caseStudy.author_name
      ? { author: { "@type": "Person", name: caseStudy.author_name } }
      : {}),
  };
  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [articleStructuredData, breadcrumbData],
  };

  const publishedLabel = formatPublishedDate(caseStudy.published_date);
  const descriptionText = firstNonEmptyString(
    (caseStudy as { description?: unknown }).description,
    caseStudy.excerpt,
  );
  const category = asTrimmedString((caseStudy as { category?: unknown }).category);
  const tags = commaSeparatedList((caseStudy as { tags?: unknown }).tags);
  const youtubeUrl = asTrimmedString(caseStudy.youtube_url);
  const contentFormat =
    asTrimmedString(
      (caseStudy as { content_format?: unknown }).content_format,
    ).toLowerCase() === "markdown"
      ? "markdown"
      : "html";
  const content = asString(caseStudy.content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <MarketingPageShell background="soft">
          <main className="section-edge w-full py-16 md:py-20 lg:py-24">
            <div className={`${ARTICLE_GUTTER} ${ARTICLE_MAX_WIDTH}`}>
            <Link
              href={PATHS.CASE_STUDIES}
              className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>

            {caseStudy.featured_image &&
            !youtubeUrl ? (
              <div className="w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={caseStudy.featured_image}
                  alt={`${caseStudy.title} - QApilot Case Study`}
                  className="w-full h-auto object-contain"
                  width={1200}
                  height={630}
                  loading="eager"
                  style={{ aspectRatio: "1200/630" }}
                />
              </div>
            ) : null}

            <h1 className={cn(marketingHeroH1Class, "mb-6 text-gradient")}>
              {caseStudy.title}
            </h1>

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
                {caseStudy.author_name && (
                  <p className="font-semibold text-foreground">
                    {caseStudy.author_name}
                  </p>
                )}
                {caseStudy.author_designation && (
                  <p className="text-sm text-muted-foreground">
                    {caseStudy.author_designation}
                  </p>
                )}
              </div>
              {publishedLabel ? (
                <time
                  dateTime={caseStudy.published_date ?? undefined}
                  className="text-sm text-muted-foreground ml-auto"
                >
                  {publishedLabel}
                </time>
              ) : null}
            </div>

            {youtubeUrl ? <YouTubeEmbed url={youtubeUrl} /> : null}

            <div
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{
                __html: sanitizeRichText(
                  content,
                  contentFormat,
                ),
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

            <RelatedPosts posts={safeRelatedPosts} basePath={PATHS.CASE_STUDIES} />
            </div>
          </main>
          <Footer />
      </MarketingPageShell>
    </>
  );
}
