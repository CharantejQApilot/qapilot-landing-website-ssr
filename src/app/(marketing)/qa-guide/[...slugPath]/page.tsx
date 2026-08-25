import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import QaGuideArticle from "@/components/qa-guide/QaGuideArticle";
import { PATHS, QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";
import { SITE_BASE_URL, DEFAULT_LOGO_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import {
  absoluteUrlForOpenGraph,
  normalizeArticlePublishedTime,
} from "@/lib/share-metadata";
import { firstNonEmptyString } from "@/lib/cms-values";
import { publishedUrlPath } from "@/lib/qa-guide/urls";
import { normalizeSlugPath } from "@/lib/qa-guide/resolve-slug-path";
import { loadQaGuideWriter } from "@/lib/qa-guide/load-writer";
import { formatPageTitle } from "@/lib/page-title";
import { coverImageAltForTitle } from "@/components/CmsRemoteImage";
import { articleMainEntityOfPage } from "@/lib/article-jsonld";

export const revalidate = 120;

type PageParams = { slugPath: string[] } | Promise<{ slugPath: string[] }>;

async function resolveSlugPathParam(
  params: PageParams,
): Promise<string[]> {
  const resolved = await Promise.resolve(params);
  return normalizeSlugPath(resolved.slugPath);
}

export async function generateStaticParams(): Promise<{ slugPath: string[] }[]> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("qa_guides")
    .select("slug")
    .eq("tier", "index_worthy")
    .eq("status", "published");
  if (!data) return [];
  return data.filter((r) => r.slug).map((r) => ({ slugPath: [r.slug] }));
}

const NOT_FOUND_METADATA: Metadata = {
  title: "Guide not found",
  robots: { index: false, follow: false },
};

async function metadataForPublishedSlug(slug: string): Promise<Metadata> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return NOT_FOUND_METADATA;

  const { data: guide } = await supabase
    .from("qa_guides")
    .select("*")
    .eq("slug", slug)
    .eq("tier", "index_worthy")
    .eq("status", "published")
    .maybeSingle();

  if (!guide) return NOT_FOUND_METADATA;

  const metaTitle = firstNonEmptyString(guide.seo_title, guide.title) ?? guide.title;
  const description =
    firstNonEmptyString(guide.seo_description, guide.excerpt) ??
    `Read ${metaTitle} on the QApilot ${QE_GUIDE_DISPLAY_NAME}.`;
  const canonical = `${SITE_BASE_URL}${publishedUrlPath(slug)}`;
  const ogAbsolute = absoluteUrlForOpenGraph(
    firstNonEmptyString(guide.og_image_url, guide.featured_image),
  );
  const publishedTime = normalizeArticlePublishedTime(guide.published_date);

  const pageTitle = formatPageTitle(metaTitle);

  return {
    title: pageTitle,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: metaTitle,
      description,
      url: canonical,
      ...(ogAbsolute
        ? {
            images: [
              {
                url: ogAbsolute,
                alt: coverImageAltForTitle(
                  firstNonEmptyString(guide.title) ?? metaTitle,
                ),
              },
            ],
          }
        : {}),
      ...(publishedTime ? { publishedTime } : {}),
      siteName: "QApilot",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      ...(ogAbsolute ? { images: [ogAbsolute] } : {}),
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const parts = await resolveSlugPathParam(params);
  if (parts.length === 2) {
    return metadataForPublishedSlug(parts[1]);
  }
  if (parts.length !== 1) return NOT_FOUND_METADATA;
  return metadataForPublishedSlug(parts[0]);
}

export default async function QaGuideCatchAllPage({
  params,
}: {
  params: PageParams;
}) {
  const parts = await resolveSlugPathParam(params);

  if (parts.length === 2) {
    permanentRedirect(publishedUrlPath(parts[1]));
  }

  if (parts.length !== 1) notFound();

  const slug = parts[0];
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) notFound();

  const { data: guide, error } = await supabase
    .from("qa_guides")
    .select("*")
    .eq("slug", slug)
    .eq("tier", "index_worthy")
    .eq("status", "published")
    .maybeSingle();

  if (!error && guide) {
    const writer = await loadQaGuideWriter(supabase, guide.writer_id);
    const authorName = writer?.name ?? guide.author_name;
    const articleUrl = `${SITE_BASE_URL}${publishedUrlPath(slug)}`;
    const publishedTime = normalizeArticlePublishedTime(guide.published_date);
    const modifiedTime =
      normalizeArticlePublishedTime(guide.updated_at) ?? publishedTime;
    const articleImageUrl = absoluteUrlForOpenGraph(
      firstNonEmptyString(guide.og_image_url, guide.featured_image),
    );
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: guide.title,
          url: articleUrl,
          ...articleMainEntityOfPage(articleUrl),
          ...(guide.excerpt ? { description: guide.excerpt } : {}),
          ...(publishedTime ? { datePublished: publishedTime } : {}),
          ...(modifiedTime ? { dateModified: modifiedTime } : {}),
          ...(articleImageUrl ? { image: articleImageUrl } : {}),
          publisher: {
            "@type": "Organization",
            name: "QApilot",
            logo: { "@type": "ImageObject", url: DEFAULT_LOGO_URL },
          },
          ...(authorName
            ? { author: { "@type": "Person", name: authorName } }
            : {}),
        },
        buildBreadcrumbList([
          { name: "Home", path: PATHS.HOME },
          { name: QE_GUIDE_DISPLAY_NAME, path: PATHS.QA_GUIDE },
          { name: guide.title, path: publishedUrlPath(slug) },
        ]),
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MarketingPageShell background="soft">
          <QaGuideArticle
            guide={guide}
            writer={writer}
            backHref={PATHS.QA_GUIDE}
            backLabel={`Back to ${QE_GUIDE_DISPLAY_NAME}`}
            pageUrl={articleUrl}
          />
        </MarketingPageShell>
      </>
    );
  }

  const { data: clusterRow } = await supabase
    .from("qa_guide_topic_clusters")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  if (clusterRow) {
    permanentRedirect(PATHS.QA_GUIDE);
  }

  notFound();
}
