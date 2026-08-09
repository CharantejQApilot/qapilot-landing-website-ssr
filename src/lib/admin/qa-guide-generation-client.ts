"use client";

export type GenerationQueueItem = {
  id: string;
  status: string;
  topic_cluster: string;
  primary_keyword: string;
  intent: string;
  secondary_keywords: string[];
  competitor_url_1: string | null;
  competitor_url_2: string | null;
  competitor_url_3: string | null;
  target_audience: string | null;
  notes: string | null;
  writer_id: string | null;
  created_at: string;
  run_started_at: string | null;
  run_completed_at: string | null;
  generated_qa_guide_id: string | null;
  quality_recommendation: string | null;
  quality_score: number | null;
  quality_payload: Record<string, unknown> | null;
  last_error: string | null;
  run_log: string[];
};

export type GenerationRunResult = {
  queue_id: string;
  guide_id?: string;
  status?: string;
  error?: string;
  quality_recommendation?: string;
  quality_warnings?: string[];
};

async function adminPostRun(
  token: string,
  path: string,
): Promise<GenerationRunResult> {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await res.json().catch(() => ({}))) as GenerationRunResult;
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return data;
}

export async function runGenerationNext(token: string): Promise<GenerationRunResult> {
  return adminPostRun(token, "/api/admin/qa-guide-generation/queue/run-next");
}

export async function runGenerationById(
  token: string,
  id: string,
  force = false,
): Promise<GenerationRunResult> {
  const qs = force ? "?force=true" : "";
  return adminPostRun(token, `/api/admin/qa-guide-generation/queue/${id}/run${qs}`);
}
