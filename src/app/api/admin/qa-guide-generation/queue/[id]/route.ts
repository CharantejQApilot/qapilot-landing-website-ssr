import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/admin/create-admin-supabase";
import { requireAdminRequest } from "@/lib/admin/require-admin-request";
import {
  parseSecondaryKeywords,
  type QueuePatchBody,
} from "@/lib/qa-guide/generation/queue-types";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminRequest(request);
  if (denied) return denied;

  const { id } = await context.params;
  const supabase = createAdminSupabaseClient(request);
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured. Set SUPABASE_SERVICE_ROLE_KEY or sign in as admin." },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("qa_guide_generation_queue")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminRequest(request);
  if (denied) return denied;

  const { id } = await context.params;
  const supabase = createAdminSupabaseClient(request);
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured. Set SUPABASE_SERVICE_ROLE_KEY or sign in as admin." },
      { status: 503 },
    );
  }

  const { data: existing } = await supabase
    .from("qa_guide_generation_queue")
    .select("status")
    .eq("id", id)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!["pending", "failed", "skip"].includes(existing.status)) {
    return NextResponse.json(
      { error: "Cannot edit row while running or after generation" },
      { status: 409 },
    );
  }

  let body: QueuePatchBody;
  try {
    body = (await request.json()) as QueuePatchBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (body.topic_cluster !== undefined) patch.topic_cluster = body.topic_cluster.trim();
  if (body.primary_keyword !== undefined) patch.primary_keyword = body.primary_keyword.trim();
  if (body.intent !== undefined) patch.intent = body.intent.trim();
  if (body.secondary_keywords !== undefined) {
    patch.secondary_keywords = parseSecondaryKeywords(body.secondary_keywords);
  }
  if (body.competitor_url_1 !== undefined) {
    patch.competitor_url_1 = body.competitor_url_1?.trim() || null;
  }
  if (body.competitor_url_2 !== undefined) {
    patch.competitor_url_2 = body.competitor_url_2?.trim() || null;
  }
  if (body.competitor_url_3 !== undefined) {
    patch.competitor_url_3 = body.competitor_url_3?.trim() || null;
  }
  if (body.target_audience !== undefined) {
    patch.target_audience = body.target_audience?.trim() || null;
  }
  if (body.notes !== undefined) patch.notes = body.notes?.trim() || null;

  const { data, error } = await supabase
    .from("qa_guide_generation_queue")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminRequest(request);
  if (denied) return denied;

  const { id } = await context.params;
  const supabase = createAdminSupabaseClient(request);
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured. Set SUPABASE_SERVICE_ROLE_KEY or sign in as admin." },
      { status: 503 },
    );
  }

  const hard = request.nextUrl.searchParams.get("hard") === "true";

  if (hard) {
    const { error } = await supabase.from("qa_guide_generation_queue").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase
    .from("qa_guide_generation_queue")
    .update({ status: "skip" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, status: "skip" });
}
