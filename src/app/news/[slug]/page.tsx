import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import WriterCard from "@/components/WriterCard";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SafeHtmlContent from "@/components/SafeHtmlContent";
import SocialEmbed from "@/components/SocialEmbed";
import RelatedPosts from "@/components/RelatedPosts";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL, DEFAULT_LOGO_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { extractYouTubeId } from "@/utils/youtube";

/** Match blog article: readable column + comfortable side margin. */
const ARTICLE_GUTTER =
  "w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14";
const ARTICLE_MAX_WIDTH = "mx-auto w-full max-w-7xl";

function stripJsonLdContext(node: object): Record<string, unknown> {
  const o = { ...(node as Record<string, unknown>) };
  delete o["@context"];
  return o;
}

const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/qmZ74W3JXPUdsN29WhrBqHpo6EE3/social-images/social-1758225607247-graph3.png";

/** Avoid static caching of article HTML; picks up admin edits without redeploy. */
export const dynamic = "force-dynamic";

interface Backlink {
  id: string;
  header: string;
  logo_url: string;
  description: string;
  link_url: string | null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    return { title: "News | QApilot" };
  }
  const { data: newsItem } = await supabase
    .from("news_updates")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!newsItem) {
    return { title: "News Item Not Found" };
  }

  const description =
    newsItem.seo_description?.trim() ||
    newsItem.excerpt ||
    newsItem.description?.trim() ||
    `Read ${newsItem.title} on QApilot News. Latest updates on AI-powered mobile app testing.`;

  const metaTitle = newsItem.seo_title?.trim() || newsItem.title;

  const videoId = newsItem.youtube_url
    ? extractYouTubeId(newsItem.youtube_url)
    : null;
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
  const ogImage =
    newsItem.og_image_url?.trim() ||
    newsItem.featured_image ||
    videoThumbnail ||
    DEFAULT_OG_IMAGE;

  const kw = newsItem.seo_keywords
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const keywordTags =
    kw && kw.length > 0
      ? kw
      : ["QApilot news", "mobile testing updates", "QA automation news"];

  return {
    title: metaTitle,
    description,
    keywords: keywordTags,
    alternates: {
      canonical: `${SITE_BASE_URL}${PATHS.NEWS}/${newsItem.slug}`,
    },
    openGraph: {
      type: "article",
      title: metaTitle,
      description,
      url: `${SITE_BASE_URL}${PATHS.NEWS}/${newsItem.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: newsItem.published_date || undefined,
      authors: newsItem.author_name ? [newsItem.author_name] : undefined,
      tags: keywordTags,
      siteName: "QApilot",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    notFound();
  }

  const { data: newsItem } = await supabase
    .from("news_updates")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!newsItem) {
    notFound();
  }

  let writer = null;
  if (newsItem.writer_id) {
    const { data } = await supabase
      .from("writers")
      .select("*")
      .eq("id", newsItem.writer_id)
      .single();
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

  const videoId = newsItem.youtube_url
    ? extractYouTubeId(newsItem.youtube_url)
    : null;
  const videoEmbedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : null;
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
  const effectiveOgImage =
    newsItem.featured_image || videoThumbnail || DEFAULT_OG_IMAGE;

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
            contentUrl: newsItem.youtube_url,
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

            {newsItem.featured_image && !newsItem.youtube_url && (
              <div className="mb-8 w-full overflow-hidden rounded-lg">
                <img
                  src={newsItem.featured_image}
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

            {newsItem.description?.trim() || newsItem.excerpt ? (
              <p className="mb-8 text-xl text-muted-foreground">
                {newsItem.description?.trim() || newsItem.excerpt}
              </p>
            ) : null}

            {newsItem.category?.trim() || newsItem.tags?.trim() ? (
              <div className="mb-6 flex flex-wrap gap-2 text-sm">
                {newsItem.category?.trim() ? (
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 font-medium text-primary">
                    {newsItem.category}
                  </span>
                ) : null}
                {newsItem.tags
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
                {newsItem.published_date ? (
                  <time
                    dateTime={newsItem.published_date}
                    className="ml-auto text-sm text-muted-foreground"
                  >
                    {format(
                      new Date(newsItem.published_date),
                      "MMMM dd, yyyy",
                    )}
                  </time>
                ) : null}
              </div>
            )}

            {newsItem.youtube_url && <YouTubeEmbed url={newsItem.youtube_url} />}

            <SafeHtmlContent
              html={newsItem.content || ""}
              className="news-content max-w-none"
              contentFormat={
                newsItem.content_format === "markdown" ? "markdown" : "html"
              }
            />

            {writer ? (
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
