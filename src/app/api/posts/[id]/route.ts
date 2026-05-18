import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/integrations/supabase/service";
import {
  cmsUnauthorized,
  editUrlForGuide,
  postApiResponse,
  verifyCmsApiToken,
} from "@/lib/qa-guide/cms-api";
import { applyTierTransition, type PromotePatch } from "@/lib/qa-guide/promote";
import type { QaGuideTier } from "@/lib/qa-guide/urls";

type PatchBody = {
  tier?: QaGuideTier;
  status?: "draft" | "published";
  topic_cluster?: string;
  edits?: {
    title?: string;
    content_markdown?: string;
    seo?: { meta_title?: string; meta_description?: string };
  };
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!verifyCmsApiToken(request)) return cmsUnauthorized();

  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role not configured" },
      { status: 503 },
    );
  }

  const { id } = await params;

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { data: existing, error: fetchError } = await supabase
    .from("qa_guides")
    .select("id, slug, topic_cluster, tier, status, url_path, previous_url_path, meta_robots, published_date")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const patch: PromotePatch = {};
  if (body.tier) patch.tier = body.tier;
  if (body.status) patch.status = body.status;
  if (body.topic_cluster) patch.topic_cluster = body.topic_cluster.trim();

  const tierTransition =
    patch.tier || patch.status
      ? applyTierTransition(existing, patch)
      : {};

  const updates: Record<string, unknown> = { ...tierTransition };

  if (body.edits?.title) updates.title = body.edits.title.trim();
  if (body.edits?.content_markdown) {
    updates.content = body.edits.content_markdown;
    updates.content_format = "markdown";
  }
  if (body.edits?.seo?.meta_title) updates.seo_title = body.edits.seo.meta_title;
  if (body.edits?.seo?.meta_description) {
    updates.seo_description = body.edits.seo.meta_description;
  }

  const { data, error } = await supabase
    .from("qa_guides")
    .update(updates)
    .eq("id", id)
    .select("id, tier, slug, url_path, status, meta_robots")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ...postApiResponse(data),
    edit_url: editUrlForGuide(data.id),
  });
}
