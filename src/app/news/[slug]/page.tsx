import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import WriterCard from "@/components/WriterCard";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SafeHtmlContent from "@/components/SafeHtmlContent";
import SocialEmbed from "@/components/SocialEmbed";
import RelatedPosts from "@/components/RelatedPosts";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL, DEFAULT_LOGO_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { extractYouTubeId } from "@/utils/youtube";

const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/qmZ74W3JXPUdsN29WhrBqHpo6EE3/social-images/social-1758225607247-graph3.png";

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
  const supabase = createServerSupabaseClient();
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
    newsItem.excerpt ||
    `Read ${newsItem.title} on QApilot News. Latest updates on AI-powered mobile app testing.`;

  const videoId = newsItem.youtube_url
    ? extractYouTubeId(newsItem.youtube_url)
    : null;
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
  const ogImage = newsItem.featured_image || videoThumbnail || DEFAULT_OG_IMAGE;

  return {
    title: newsItem.title,
    description,
    keywords: "QApilot news, mobile testing updates, QA automation news",
    alternates: {
      canonical: `${SITE_BASE_URL}${PATHS.NEWS}/${newsItem.slug}`,
    },
    openGraph: {
      type: "article",
      title: newsItem.title,
      description,
      url: `${SITE_BASE_URL}${PATHS.NEWS}/${newsItem.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: newsItem.published_date || undefined,
      authors: newsItem.author_name ? [newsItem.author_name] : undefined,
      tags: ["Mobile Testing", "QA Automation", "News"],
    },
    twitter: {
      card: "summary_large_image",
      title: newsItem.title,
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
  const supabase = createServerSupabaseClient();

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

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleStructuredData, breadcrumbData]),
        }}
      />

      <div className="container mx-auto px-4 py-24">
        <article className="max-w-6xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 mb-8 -ml-4 text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {newsItem.title}
            </h1>

            {(newsItem.author_name || newsItem.published_date) && (
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                {newsItem.author_name && (
                  <div>
                    <span className="font-medium">{newsItem.author_name}</span>
                    {newsItem.author_designation && (
                      <span className="text-sm">
                        {" "}
                        • {newsItem.author_designation}
                      </span>
                    )}
                  </div>
                )}
                {newsItem.published_date && (
                  <time dateTime={newsItem.published_date} className="text-sm">
                    {new Date(newsItem.published_date).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </time>
                )}
              </div>
            )}
          </header>

          {newsItem.youtube_url && <YouTubeEmbed url={newsItem.youtube_url} />}

          <SafeHtmlContent
            html={newsItem.content}
            className="news-content max-w-none"
          />

          {writer && (
            <WriterCard
              name={writer.name}
              designation={writer.designation}
              description={writer.description}
              linkedinUrl={writer.linkedin_url}
              profileImage={writer.profile_image}
            />
          )}

          {newsItem.social_embed_url && (
            <SocialEmbed
              url={newsItem.social_embed_url}
              image={newsItem.social_embed_image || undefined}
              description={newsItem.social_embed_description || undefined}
            />
          )}

          {backlinks.length > 0 && (
            <nav aria-label="Related organizations" className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-6 justify-center">
                {backlinks.map((backlink) => {
                  const isLink = !!backlink.link_url;
                  const className = `flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border/50 shadow-sm w-full sm:w-64 ${
                    isLink
                      ? "cursor-pointer hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-200"
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
                      <h4 className="font-semibold text-sm text-foreground mb-2">
                        {backlink.header}
                      </h4>
                      {backlink.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {backlink.description}
                        </p>
                      )}
                      {backlink.link_url && (
                        <div className="flex items-center gap-1 text-sm text-primary mt-auto">
                          {backlink.header}{" "}
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      )}
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
          )}

          <RelatedPosts currentId={newsItem.id} type="news" />

          <div className="mt-12 pt-8 border-t">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md hover:bg-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Link>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
