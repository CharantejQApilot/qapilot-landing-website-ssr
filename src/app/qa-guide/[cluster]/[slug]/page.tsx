import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import QaGuideArticle from "@/components/qa-guide/QaGuideArticle";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL, DEFAULT_LOGO_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { resolveParam } from "@/lib/app-router-params";
import {
  absoluteUrlForOpenGraph,
  normalizeArticlePublishedTime,
} from "@/lib/share-metadata";
import { firstNonEmptyString } from "@/lib/cms-values";
import { publishedUrlPath } from "@/lib/qa-guide/urls";

export const revalidate = 120;

export async function generateStaticParams(): Promise<{ cluster: string; slug: string }[]> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("qa_guides")
    .select("topic_cluster, slug")
    .eq("tier", "index_worthy")
    .eq("status", "published");
  if (!data) return [];
  return data
    .filter((r) => r.topic_cluster && r.slug)
    .map((r) => ({ cluster: r.topic_cluster, slug: r.slug }));
}

const NOT_FOUND_METADATA: Metadata = {
  title: "Guide not found",
  robots: { index: false, follow: false },
};

export async function generateMetadata({
  params,
}: {
  params: { cluster: string; slug: string } | Promise<{ cluster: string; slug: string }>;
}): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const cluster = resolved.cluster?.trim();
  const slug = resolved.slug?.trim();
  if (!cluster || !slug) return NOT_FOUND_METADATA;

  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return NOT_FOUND_METADATA;

  const { data: guide } = await supabase
    .from("qa_guides")
    .select("*")
    .eq("slug", slug)
    .eq("topic_cluster", cluster)
    .eq("tier", "index_worthy")
    .eq("status", "published")
    .maybeSingle();

  if (!guide) return NOT_FOUND_METADATA;

  const metaTitle = firstNonEmptyString(guide.seo_title, guide.title) ?? guide.title;
  const description =
    firstNonEmptyString(guide.seo_description, guide.excerpt) ??
    `Read ${metaTitle} on the QApilot QA Guide.`;
  const canonical = `${SITE_BASE_URL}${publishedUrlPath(cluster, slug)}`;
  const ogAbsolute = absoluteUrlForOpenGraph(
    firstNonEmptyString(guide.og_image_url, guide.featured_image),
  );
  const publishedTime = normalizeArticlePublishedTime(guide.published_date);

  return {
    title: metaTitle,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: metaTitle,
      description,
      url: canonical,
      ...(ogAbsolute ? { images: [{ url: ogAbsolute, alt: metaTitle }] } : {}),
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

export default async function QaGuideArticlePage({
  params,
}: {
  params: { cluster: string; slug: string } | Promise<{ cluster: string; slug: string }>;
}) {
  const cluster = await resolveParam(params, "cluster");
  const slug = await resolveParam(params, "slug");

  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) notFound();

  const { data: guide, error } = await supabase
    .from("qa_guides")
    .select("*")
    .eq("slug", slug)
    .eq("topic_cluster", cluster)
    .eq("tier", "index_worthy")
    .eq("status", "published")
    .maybeSingle();

  if (error || !guide) notFound();

  const { data: clusterRow } = await supabase
    .from("qa_guide_topic_clusters")
    .select("title")
    .eq("slug", cluster)
    .maybeSingle();

  const articleUrl = `${SITE_BASE_URL}${publishedUrlPath(cluster, slug)}`;
  const publishedTime = normalizeArticlePublishedTime(guide.published_date);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        url: articleUrl,
        ...(guide.excerpt ? { description: guide.excerpt } : {}),
        ...(publishedTime ? { datePublished: publishedTime } : {}),
        publisher: {
          "@type": "Organization",
          name: "QApilot",
          logo: { "@type": "ImageObject", url: DEFAULT_LOGO_URL },
        },
        ...(guide.author_name
          ? { author: { "@type": "Person", name: guide.author_name } }
          : {}),
      },
      buildBreadcrumbList([
        { name: "Home", path: PATHS.HOME },
        { name: "QA Guide", path: PATHS.QA_GUIDE },
        { name: clusterRow?.title ?? cluster, path: `${PATHS.QA_GUIDE}/${cluster}` },
        { name: guide.title, path: publishedUrlPath(cluster, slug) },
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
          backHref={`${PATHS.QA_GUIDE}/${cluster}`}
          backLabel={`Back to ${clusterRow?.title ?? cluster}`}
          clusterTitle={clusterRow?.title ?? undefined}
        />
        <Footer />
      </MarketingPageShell>
    </>
  );
}
