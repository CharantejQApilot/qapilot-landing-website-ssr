import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/integrations/supabase/service";
import {
  cmsUnauthorized,
  postApiResponse,
  verifyCmsApiToken,
} from "@/lib/qa-guide/cms-api";
import { createDraftQaGuide, type CreateDraftQaGuideInput } from "@/lib/qa-guide/create-draft";

type PostBody = CreateDraftQaGuideInput & {
  tier?: string;
  status?: string;
  cover_media_id?: string;
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

  try {
    const data = await createDraftQaGuide(supabase, body);
    return NextResponse.json(postApiResponse(data), { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Insert failed" },
      { status: 500 },
    );
  }
}
