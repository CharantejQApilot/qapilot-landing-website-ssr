import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/admin/create-admin-supabase";
import { requireAdminRequest } from "@/lib/admin/require-admin-request";
import { claimNextPendingQueueRow, explainClaimFailure } from "@/lib/qa-guide/generation/queue-db";
import { triggerGenerationWorker } from "@/lib/qa-guide/generation/run-pipeline";

export const dynamic = "force-dynamic";

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

  try {
    await triggerGenerationWorker(row.id);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to start worker";
    await supabase
      .from("qa_guide_generation_queue")
      .update({
        status: "failed",
        run_completed_at: new Date().toISOString(),
        last_error: msg,
      })
      .eq("id", row.id);
    return NextResponse.json({ error: msg }, { status: 503 });
  }

  return NextResponse.json({ queue_id: row.id, status: "running" }, { status: 202 });
}
