import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/admin/create-admin-supabase";
import { requireAdminRequest } from "@/lib/admin/require-admin-request";
import { claimQueueRowForRun, explainClaimFailure } from "@/lib/qa-guide/generation/queue-db";
import { runGenerationPipeline } from "@/lib/qa-guide/generation/run-pipeline";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const denied = await requireAdminRequest(request);
  if (denied) return denied;

  const { id } = await context.params;
  const supabase = createAdminSupabaseClient(request);
  if (!supabase) {
    return NextResponse.json({ error: "Sign in to admin and try again." }, { status: 401 });
  }

  const force = request.nextUrl.searchParams.get("force") === "true";

  if (force) {
    const { data: row } = await supabase
      .from("qa_guide_generation_queue")
      .select("id, status")
      .eq("id", id)
      .maybeSingle();

    if (!row) {
      return NextResponse.json({ error: "Brief not found" }, { status: 404 });
    }

    if (row.status === "running") {
      return NextResponse.json({ error: "Already running" }, { status: 409 });
    }

    await supabase
      .from("qa_guide_generation_queue")
      .update({
        status: "pending",
        generated_qa_guide_id: null,
        run_completed_at: null,
        last_error: null,
        run_log: [],
      })
      .eq("id", id);
  }

  const row = await claimQueueRowForRun(supabase, id);
  if (!row) {
    const reason = await explainClaimFailure(supabase, id);
    return NextResponse.json({ error: reason }, { status: 409 });
  }

  const result = await runGenerationPipeline(supabase, id);
  if (result.ok === false) {
    return NextResponse.json({ error: result.error, queue_id: id }, { status: 422 });
  }

  return NextResponse.json({
    queue_id: id,
    guide_id: result.guide_id,
    status: "generated",
  });
}
