import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/integrations/supabase/types";

export type QueueRow = Database["public"]["Tables"]["qa_guide_generation_queue"]["Row"];

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
  const next = [...prev, `${stamp} — ${line}`];

  await supabase.from("qa_guide_generation_queue").update({ run_log: next }).eq("id", queueId);
}

export async function claimQueueRowForRun(
  supabase: SupabaseClient<Database>,
  queueId: string,
): Promise<QueueRow | null> {
  const { data: existing } = await supabase
    .from("qa_guide_generation_queue")
    .select("id, status")
    .eq("id", queueId)
    .maybeSingle();

  if (!existing || !["pending", "failed"].includes(existing.status)) {
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
