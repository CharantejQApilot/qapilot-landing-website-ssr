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
  title: "Article not found",
  description: "We couldn't find that QApilot blog post.",
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
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !blog) {
    return NOT_FOUND_METADATA;
  }

  const description =
    (blog as { seo_description?: string | null }).seo_description?.trim() ||
    blog.excerpt ||
    (blog as { description?: string | null }).description?.trim() ||
    `Read ${blog.title} on the QApilot blog. Expert insights on mobile app testing and QA automation.`;

  const metaTitle =
    (blog as { seo_title?: string | null }).seo_title?.trim() || blog.title;

  const kw = (blog as { seo_keywords?: string | null }).seo_keywords
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const keywordsJoined =
    kw && kw.length > 0
      ? kw.join(", ")
      : "mobile app testing, QA automation, test automation, mobile testing best practices";

  const ogRaw =
    (blog as { og_image_url?: string | null }).og_image_url?.trim() ||
    blog.featured_image;
  const ogAbsolute = absoluteUrlForOpenGraph(ogRaw);
  const publishedTime = normalizeArticlePublishedTime(blog.published_date);

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
        canonical: `${SITE_BASE_URL}${PATHS.BLOGS}/${blog.slug}`,
      },
      openGraph: {
        type: "article",
        title: metaTitle,
        description,
        url: `${SITE_BASE_URL}${PATHS.BLOGS}/${blog.slug}`,
        ...(ogAbsolute
          ? { images: [{ url: ogAbsolute, alt: metaTitle }] }
          : {}),
        ...(publishedTime ? { publishedTime } : {}),
        authors: blog.author_name ? [blog.author_name] : undefined,
        siteName: "QApilot",
        locale: "en_US",
        tags: ["Mobile Testing", "QA Automation", "Test Automation"],
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
      "id, title, slug, excerpt, featured_image, published_date, youtube_url"
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

  const publishedLabel = formatPublishedDate(blog.published_date);

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
              href="/blogs"
              className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>

            {blog.featured_image &&
            !(
              typeof blog.youtube_url === "string" &&
              blog.youtube_url.trim().length > 0
            ) ? (
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

            <h1 className={cn(marketingHeroH1Class, "mb-6 text-gradient")}>
              {blog.title}
            </h1>

            {(blog as { description?: string | null }).description?.trim() ||
            blog.excerpt ? (
              <p className="mb-8 text-xl text-muted-foreground">
                {(blog as { description?: string | null }).description?.trim() ||
                  blog.excerpt}
              </p>
            ) : null}

            {(blog as { category?: string | null }).category?.trim() ||
            (blog as { tags?: string | null }).tags?.trim() ? (
              <div className="mb-6 flex flex-wrap gap-2 text-sm">
                {(blog as { category?: string | null }).category?.trim() ? (
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 font-medium text-primary">
                    {(blog as { category?: string | null }).category}
                  </span>
                ) : null}
                {(blog as { tags?: string | null }).tags
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
              {publishedLabel ? (
                <span className="text-sm text-muted-foreground ml-auto">
                  {publishedLabel}
                </span>
              ) : null}
            </div>

            {typeof blog.youtube_url === "string" &&
            blog.youtube_url.trim() ? (
              <YouTubeEmbed url={blog.youtube_url.trim()} />
            ) : null}

            <div
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{
                __html: sanitizeRichText(
                  blog.content || "",
                  String(
                    (blog as { content_format?: string | null })
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

            <RelatedPosts posts={safeRelatedPosts} basePath={PATHS.BLOGS} />
            </div>
          </main>
          <Footer />
      </MarketingPageShell>
    </>
  );
}
