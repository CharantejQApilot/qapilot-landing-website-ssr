import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/admin/create-admin-supabase";
import { requireAdminRequest } from "@/lib/admin/require-admin-request";
import { claimQueueRowForRun } from "@/lib/qa-guide/generation/queue-db";
import { triggerGenerationWorker } from "@/lib/qa-guide/generation/run-pipeline";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
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

  const force = request.nextUrl.searchParams.get("force") === "true";

  if (force) {
    const { data: row } = await supabase
      .from("qa_guide_generation_queue")
      .select("id, status")
      .eq("id", id)
      .maybeSingle();

    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
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
      })
      .eq("id", id);
  }

  const row = await claimQueueRowForRun(supabase, id);
  if (!row) {
    return NextResponse.json(
      { error: "Row not claimable (wrong status or another job is running)" },
      { status: 409 },
    );
  }

  try {
    await triggerGenerationWorker(id);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to start worker";
    await supabase
      .from("qa_guide_generation_queue")
      .update({
        status: "failed",
        run_completed_at: new Date().toISOString(),
        last_error: msg,
      })
      .eq("id", id);
    return NextResponse.json({ error: msg }, { status: 503 });
  }

  return NextResponse.json({ queue_id: id, status: "running" }, { status: 202 });
}
