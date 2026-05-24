import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/admin/create-admin-supabase";
import { requireAdminRequest } from "@/lib/admin/require-admin-request";
import {
  claimNextPendingQueueRow,
  explainClaimFailure,
} from "@/lib/qa-guide/generation/queue-db";
import { runGenerationPipeline } from "@/lib/qa-guide/generation/run-pipeline";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const denied = await requireAdminRequest(request);
  if (denied) return denied;

  const supabase = createAdminSupabaseClient(request);
  if (!supabase) {
    return NextResponse.json({ error: "Sign in to admin and try again." }, { status: 401 });
  }

  const row = await claimNextPendingQueueRow(supabase);
  if (!row) {
    const { data: runningRows } = await supabase
      .from("qa_guide_generation_queue")
      .select("id")
      .eq("status", "running")
      .limit(1);
    const runningId = runningRows?.[0]?.id;
    const reason = runningId
      ? await explainClaimFailure(supabase, runningId)
      : "No pending briefs in the queue.";
    return NextResponse.json({ error: reason }, { status: 409 });
  }

  const result = await runGenerationPipeline(supabase, row.id);
  if (result.ok === false) {
    return NextResponse.json({ error: result.error, queue_id: row.id }, { status: 422 });
  }

  return NextResponse.json({
    queue_id: row.id,
    guide_id: result.guide_id,
    status: "generated",
    quality_recommendation: result.quality_recommendation,
    quality_warnings: result.quality_warnings,
  });
}
