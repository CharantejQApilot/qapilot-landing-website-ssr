import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/integrations/supabase/types";
import { seoKeywordsFromPayload, slugifyTitle, tagsFromPayload } from "@/lib/qa-guide/cms-api";
import { prefillQaGuidePublishFields } from "@/lib/qa-guide/publish-prefill";
import { buildDraftInsertFields } from "@/lib/qa-guide/promote";

type QaGuideInsert = Database["public"]["Tables"]["qa_guides"]["Insert"];

export type CreateDraftQaGuideInput = {
  title: string;
  slug?: string;
  topic_cluster: string;
  intent?: string | null;
  excerpt?: string | null;
  content_markdown?: string;
  content_html?: string;
  cover_image_url?: string | null;
  author?: string;
  writer_id?: string | null;
  tags?: string[] | string;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    primary_keyword?: string;
    secondary_keywords?: string[];
  };
  internal_link_suggestions?: unknown;
  quality_checks?: unknown;
  source?: unknown;
};

export type CreateDraftQaGuideResult = {
  id: string;
  tier: string;
  slug: string;
  url_path: string;
  status: string;
  meta_robots: string;
};

export async function createDraftQaGuide(
  supabase: SupabaseClient<Database>,
  input: CreateDraftQaGuideInput,
): Promise<CreateDraftQaGuideResult> {
  const title = input.title.trim();
  const topicCluster = input.topic_cluster.trim();
  const slug = (input.slug?.trim() || slugifyTitle(title)).slice(0, 80);
  const seo = input.seo ?? {};
  const draftFields = buildDraftInsertFields(slug, topicCluster);
  const content = input.content_markdown ?? input.content_html ?? "";
  const excerpt =
    input.excerpt?.trim() ?? seo.meta_description?.trim() ?? null;
  const publishFields = prefillQaGuidePublishFields({
    title,
    excerpt,
    seo_title: seo.meta_title,
    seo_description: seo.meta_description,
    content,
  });

  const row: QaGuideInsert = {
    title,
    slug,
    topic_cluster: topicCluster,
    intent: input.intent?.trim() ?? null,
    excerpt: excerpt ?? publishFields.seo_description,
    content,
    content_format: input.content_markdown ? "markdown" : "html",
    featured_image: input.cover_image_url?.trim() ?? null,
    author_name: input.author?.trim() ?? "Editorial Team",
    writer_id: input.writer_id?.trim() || null,
    tags: tagsFromPayload(input.tags, seo),
    tier: draftFields.tier,
    status: draftFields.status,
    url_path: draftFields.url_path,
    meta_robots: draftFields.meta_robots,
    published_date: draftFields.published_date ?? undefined,
    seo_title: publishFields.seo_title,
    seo_description: publishFields.seo_description,
    seo_keywords: seoKeywordsFromPayload(seo.primary_keyword, seo.secondary_keywords),
    og_image_url: input.cover_image_url?.trim() ?? null,
    quality_checks: (input.quality_checks ?? {}) as Json,
    internal_link_suggestions: (input.internal_link_suggestions ?? []) as Json,
    source: (input.source ?? {}) as Json,
  };

  const { data, error } = await supabase
    .from("qa_guides")
    .insert(row)
    .select("id, tier, slug, url_path, status, meta_robots")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
