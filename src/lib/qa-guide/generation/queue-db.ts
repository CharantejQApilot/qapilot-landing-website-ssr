import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/integrations/supabase/types";

export type QueueRow =
  Database["public"]["Tables"]["qa_guide_generation_queue"]["Row"];

export async function appendQueueLog(
  supabase: SupabaseClient<Database>,
  queueId: string,
  line: string,
): Promise<void> {
  const { data: row } = await supabase
    .from("qa_guide_generation_queue")
    .select("run_log")
    .eq("id", queueId)
    .single();

  const prev = (row?.run_log as string[] | null) ?? [];
  const stamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  const next = [...prev, `${stamp}. ${line}`];

  await supabase
    .from("qa_guide_generation_queue")
    .update({ run_log: next })
    .eq("id", queueId);
}

const STALE_RUN_MS = 15 * 60 * 1000;

function isStaleRunning(row: { run_started_at: string | null }): boolean {
  if (!row.run_started_at) return false;
  return Date.now() - new Date(row.run_started_at).getTime() > STALE_RUN_MS;
}

/** Human-readable reason when claimQueueRowForRun returns null. */
export async function explainClaimFailure(
  supabase: SupabaseClient<Database>,
  queueId: string,
): Promise<string> {
  const { data: row } = await supabase
    .from("qa_guide_generation_queue")
    .select("id, status, run_started_at")
    .eq("id", queueId)
    .maybeSingle();

  if (!row) return "Brief not found. Refresh the page and try again.";

  if (row.status === "running") {
    if (isStaleRunning(row)) {
      return "This run looks stuck. Use Run again (stale runs are reset automatically) or refresh the page.";
    }
    return "This brief is already running. Watch the Log below, or wait until it finishes.";
  }

  if (row.status === "generated") {
    return "Already generated. Use Re-run if you need a new draft.";
  }

  if (row.status === "skip") {
    return "This brief was skipped. Edit status in the database or add a new brief.";
  }

  const { data: otherRunning } = await supabase
    .from("qa_guide_generation_queue")
    .select("primary_keyword")
    .eq("status", "running")
    .neq("id", queueId)
    .limit(1);

  if (otherRunning?.length) {
    const kw = otherRunning[0]?.primary_keyword ?? "another brief";
    return `Another job is running (“${kw}”). Wait for it to finish, or reset stuck runs.`;
  }

  return "Could not start run. Refresh and try again.";
}

export async function claimQueueRowForRun(
  supabase: SupabaseClient<Database>,
  queueId: string,
): Promise<QueueRow | null> {
  const { data: existing } = await supabase
    .from("qa_guide_generation_queue")
    .select("id, status, run_started_at")
    .eq("id", queueId)
    .maybeSingle();

  if (!existing) return null;

  if (existing.status === "running") {
    const { data: full } = await supabase
      .from("qa_guide_generation_queue")
      .select("run_log")
      .eq("id", queueId)
      .maybeSingle();
    const logLen = Array.isArray(full?.run_log) ? full.run_log.length : 0;
    const abandoned = logLen === 0;

    if (abandoned || isStaleRunning(existing)) {
      await supabase
        .from("qa_guide_generation_queue")
        .update({
          status: "failed",
          run_completed_at: new Date().toISOString(),
          last_error: abandoned
            ? "Previous run did not start (reset). Try Run again."
            : "Previous run timed out (stale). You can Run again.",
        })
        .eq("id", queueId);
    } else {
      return null;
    }
  }

  if (!["pending", "failed"].includes(existing.status)) {
    return null;
  }

  const { data: running } = await supabase
    .from("qa_guide_generation_queue")
    .select("id")
    .eq("status", "running")
    .neq("id", queueId)
    .limit(1);

  if (running && running.length > 0) {
    return null;
  }

  const { data, error } = await supabase
    .from("qa_guide_generation_queue")
    .update({
      status: "running",
      run_started_at: new Date().toISOString(),
      run_completed_at: null,
      last_error: null,
    })
    .eq("id", queueId)
    .in("status", ["pending", "failed"])
    .select("*")
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

/**
 * Load row for pipeline work. Accepts `running` when the API route already claimed the row.
 */
export async function loadQueueRowForPipeline(
  supabase: SupabaseClient<Database>,
  queueId: string,
): Promise<QueueRow | null> {
  const { data: row } = await supabase
    .from("qa_guide_generation_queue")
    .select("*")
    .eq("id", queueId)
    .maybeSingle();

  if (!row) return null;

  if (row.status === "running") {
    if (isStaleRunning(row)) {
      await supabase
        .from("qa_guide_generation_queue")
        .update({
          status: "failed",
          run_completed_at: new Date().toISOString(),
          last_error: "Run timed out (stale).",
        })
        .eq("id", queueId);
      return claimQueueRowForRun(supabase, queueId);
    }
    return row;
  }

  if (["pending", "failed"].includes(row.status)) {
    return claimQueueRowForRun(supabase, queueId);
  }

  return null;
}

export async function claimNextPendingQueueRow(
  supabase: SupabaseClient<Database>,
): Promise<QueueRow | null> {
  const { data: running } = await supabase
    .from("qa_guide_generation_queue")
    .select("id")
    .eq("status", "running")
    .limit(1);

  if (running && running.length > 0) {
    return null;
  }

  const { data: pending } = await supabase
    .from("qa_guide_generation_queue")
    .select("id")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!pending) return null;
  return claimQueueRowForRun(supabase, pending.id);
}

export async function markQueueFailed(
  supabase: SupabaseClient<Database>,
  queueId: string,
  errorMessage: string,
): Promise<void> {
  await supabase
    .from("qa_guide_generation_queue")
    .update({
      status: "failed",
      run_completed_at: new Date().toISOString(),
      last_error: errorMessage.slice(0, 4000),
    })
    .eq("id", queueId);
}

export async function markQueueGenerated(
  supabase: SupabaseClient<Database>,
  queueId: string,
  guideId: string,
  qualityPayload: Record<string, unknown>,
  qualityScore: number,
  recommendation: string,
): Promise<void> {
  await supabase
    .from("qa_guide_generation_queue")
    .update({
      status: "generated",
      run_completed_at: new Date().toISOString(),
      generated_qa_guide_id: guideId,
      quality_payload: qualityPayload as Json,
      quality_score: qualityScore,
      quality_recommendation: recommendation,
      last_error: null,
    })
    .eq("id", queueId);
}
