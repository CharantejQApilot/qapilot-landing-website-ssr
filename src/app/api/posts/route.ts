import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/integrations/supabase/service";
import {
  cmsUnauthorized,
  postApiResponse,
  seoKeywordsFromPayload,
  slugifyTitle,
  tagsFromPayload,
  verifyCmsApiToken,
} from "@/lib/qa-guide/cms-api";
import { buildDraftInsertFields } from "@/lib/qa-guide/promote";
import type { Database } from "@/integrations/supabase/types";

type QaGuideInsert = Database["public"]["Tables"]["qa_guides"]["Insert"];

type PostBody = {
  title?: string;
  slug?: string;
  tier?: string;
  status?: string;
  topic_cluster?: string;
  intent?: string;
  excerpt?: string;
  content_markdown?: string;
  content_html?: string;
  cover_media_id?: string;
  cover_image_url?: string;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    primary_keyword?: string;
    secondary_keywords?: string[];
    meta_robots?: string;
  };
  tags?: string[] | string;
  author?: string;
  internal_link_suggestions?: unknown;
  quality_checks?: unknown;
  source?: unknown;
};

export async function POST(request: NextRequest) {
  if (!verifyCmsApiToken(request)) return cmsUnauthorized();

  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role not configured" },
      { status: 503 },
    );
  }

  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.tier === "index_worthy") {
    return NextResponse.json(
      { error: "Cannot create index_worthy posts via POST; use PATCH after human approval" },
      { status: 400 },
    );
  }

  const title = body.title?.trim();
  const topicCluster = body.topic_cluster?.trim();
  if (!title || !topicCluster) {
    return NextResponse.json(
      { error: "title and topic_cluster are required" },
      { status: 400 },
    );
  }

  const slug = (body.slug?.trim() || slugifyTitle(title)).slice(0, 80);
  const seo = body.seo ?? {};
  const draftFields = buildDraftInsertFields(slug, topicCluster);
  const content = body.content_markdown ?? body.content_html ?? "";

  const row: QaGuideInsert = {
    title,
    slug,
    topic_cluster: topicCluster,
    intent: body.intent?.trim() ?? null,
    excerpt: body.excerpt?.trim() ?? seo.meta_description?.trim() ?? null,
    content,
    content_format: body.content_markdown ? "markdown" : "html",
    featured_image: body.cover_image_url?.trim() ?? null,
    author_name: body.author?.trim() ?? "Editorial Team",
    tags: tagsFromPayload(body.tags, seo),
    tier: draftFields.tier,
    status: draftFields.status,
    url_path: draftFields.url_path,
    meta_robots: draftFields.meta_robots,
    published_date: draftFields.published_date ?? undefined,
    seo_title: seo.meta_title?.trim() ?? title,
    seo_description: seo.meta_description?.trim() ?? null,
    seo_keywords: seoKeywordsFromPayload(seo.primary_keyword, seo.secondary_keywords),
    og_image_url: body.cover_image_url?.trim() ?? null,
    quality_checks: (body.quality_checks ?? {}) as QaGuideInsert["quality_checks"],
    internal_link_suggestions: (body.internal_link_suggestions ?? []) as QaGuideInsert["internal_link_suggestions"],
    source: (body.source ?? {}) as QaGuideInsert["source"],
  };

  const { data, error } = await supabase
    .from("qa_guides")
    .insert(row)
    .select("id, tier, slug, url_path, status, meta_robots")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(postApiResponse(data), { status: 201 });
}
