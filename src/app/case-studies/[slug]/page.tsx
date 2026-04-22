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
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { resolveSlugParam } from "@/lib/app-router-params";
import {
  absoluteUrlForOpenGraph,
  normalizeArticlePublishedTime,
} from "@/lib/share-metadata";

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
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    return NOT_FOUND_METADATA;
  }
  const slug = await resolveSlugParam(params);
  const { data: caseStudy, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !caseStudy) {
    return NOT_FOUND_METADATA;
  }

  const description =
    (caseStudy as { seo_description?: string | null }).seo_description?.trim() ||
    caseStudy.excerpt ||
    (caseStudy as { description?: string | null }).description?.trim() ||
    `Read ${caseStudy.title} — a QApilot customer story on shipping mobile apps with AI-driven testing.`;

  const metaTitle =
    (caseStudy as { seo_title?: string | null }).seo_title?.trim() || caseStudy.title;

  const kw = (caseStudy as { seo_keywords?: string | null }).seo_keywords
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const keywordsJoined =
    kw && kw.length > 0
      ? kw.join(", ")
      : "QApilot case study, mobile testing case study, QA automation outcomes";

  const ogRaw =
    (caseStudy as { og_image_url?: string | null }).og_image_url?.trim() ||
    caseStudy.featured_image;
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
  } catch {
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

  const publishedLabel = formatPublishedDate(caseStudy.published_date);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
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
            !(
              typeof caseStudy.youtube_url === "string" &&
              caseStudy.youtube_url.trim().length > 0
            ) ? (
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

            {(caseStudy as { description?: string | null }).description?.trim() ||
            caseStudy.excerpt ? (
              <p className="mb-8 text-xl text-muted-foreground">
                {(caseStudy as { description?: string | null }).description?.trim() ||
                  caseStudy.excerpt}
              </p>
            ) : null}

            {(caseStudy as { category?: string | null }).category?.trim() ||
            (caseStudy as { tags?: string | null }).tags?.trim() ? (
              <div className="mb-6 flex flex-wrap gap-2 text-sm">
                {(caseStudy as { category?: string | null }).category?.trim() ? (
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 font-medium text-primary">
                    {(caseStudy as { category?: string | null }).category}
                  </span>
                ) : null}
                {(caseStudy as { tags?: string | null }).tags
                  ?.split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tag) => (
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
                <span className="text-sm text-muted-foreground ml-auto">
                  {publishedLabel}
                </span>
              ) : null}
            </div>

            {typeof caseStudy.youtube_url === "string" &&
            caseStudy.youtube_url.trim() ? (
              <YouTubeEmbed url={caseStudy.youtube_url.trim()} />
            ) : null}

            <div
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{
                __html: sanitizeRichText(
                  caseStudy.content || "",
                  String(
                    (caseStudy as { content_format?: string | null })
                      .content_format ?? "",
                  ).toLowerCase() === "markdown"
                    ? "markdown"
                    : "html",
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
