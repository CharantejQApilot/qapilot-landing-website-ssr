import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/integrations/supabase/service";
import { requireAdminRequest } from "@/lib/admin/require-admin-request";
import { claimNextPendingQueueRow } from "@/lib/qa-guide/generation/queue-db";
import { triggerGenerationWorker } from "@/lib/qa-guide/generation/run-pipeline";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const denied = await requireAdminRequest(request);
  if (denied) return denied;

  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const row = await claimNextPendingQueueRow(supabase);
  if (!row) {
    return NextResponse.json(
      { error: "No pending row available or another job is already running" },
      { status: 409 },
    );
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
