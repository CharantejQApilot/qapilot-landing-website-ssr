import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/admin/create-admin-supabase";
import { requireAdminRequest } from "@/lib/admin/require-admin-request";
import {
  parseSecondaryKeywords,
  type QueueCreateBody,
} from "@/lib/qa-guide/generation/queue-types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const denied = await requireAdminRequest(request);
  if (denied) return denied;

  const supabase = createAdminSupabaseClient(request);
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured. Set SUPABASE_SERVICE_ROLE_KEY or sign in as admin." },
      { status: 503 },
    );
  }

  const status = request.nextUrl.searchParams.get("status")?.trim();
  const q = request.nextUrl.searchParams.get("q")?.trim();

  let query = supabase
    .from("qa_guide_generation_queue")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }
  if (q) {
    query = query.ilike("primary_keyword", `%${q}%`);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
  const denied = await requireAdminRequest(request);
  if (denied) return denied;

  const supabase = createAdminSupabaseClient(request);
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured. Set SUPABASE_SERVICE_ROLE_KEY or sign in as admin." },
      { status: 503 },
    );
  }

  let body: QueueCreateBody;
  try {
    body = (await request.json()) as QueueCreateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const topicCluster = body.topic_cluster?.trim();
  const primaryKeyword = body.primary_keyword?.trim();
  const intent = body.intent?.trim();

  if (!topicCluster || !primaryKeyword || !intent) {
    return NextResponse.json(
      { error: "topic_cluster, primary_keyword, and intent are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("qa_guide_generation_queue")
    .insert({
      topic_cluster: topicCluster,
      primary_keyword: primaryKeyword,
      intent,
      secondary_keywords: parseSecondaryKeywords(body.secondary_keywords),
      competitor_url_1: body.competitor_url_1?.trim() || null,
      competitor_url_2: body.competitor_url_2?.trim() || null,
      competitor_url_3: body.competitor_url_3?.trim() || null,
      target_audience: body.target_audience?.trim() || null,
      notes: body.notes?.trim() || null,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
