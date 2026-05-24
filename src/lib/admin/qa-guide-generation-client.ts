"use client";

async function adminFetch<T>(
  token: string,
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new Error(
      (data as { error?: string }).error ?? `Request failed (${res.status})`,
    );
  }
  return data;
}

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

export async function listGenerationQueue(
  token: string,
  params?: { status?: string; q?: string },
): Promise<GenerationQueueItem[]> {
  const sp = new URLSearchParams();
  if (params?.status && params.status !== "all") sp.set("status", params.status);
  if (params?.q) sp.set("q", params.q);
  const qs = sp.toString();
  const data = await adminFetch<{ items: GenerationQueueItem[] }>(
    token,
    `/api/admin/qa-guide-generation/queue${qs ? `?${qs}` : ""}`,
  );
  return data.items;
}

export async function getGenerationQueueItem(
  token: string,
  id: string,
): Promise<GenerationQueueItem> {
  return adminFetch<GenerationQueueItem>(
    token,
    `/api/admin/qa-guide-generation/queue/${id}`,
  );
}

export async function createGenerationQueueItem(
  token: string,
  body: Record<string, unknown>,
): Promise<GenerationQueueItem> {
  return adminFetch<GenerationQueueItem>(token, `/api/admin/qa-guide-generation/queue`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateGenerationQueueItem(
  token: string,
  id: string,
  body: Record<string, unknown>,
): Promise<GenerationQueueItem> {
  return adminFetch<GenerationQueueItem>(
    token,
    `/api/admin/qa-guide-generation/queue/${id}`,
    { method: "PATCH", body: JSON.stringify(body) },
  );
}

export async function skipGenerationQueueItem(token: string, id: string): Promise<void> {
  await adminFetch(token, `/api/admin/qa-guide-generation/queue/${id}`, {
    method: "DELETE",
  });
}

export async function runGenerationNext(token: string): Promise<{ queue_id: string }> {
  return adminFetch<{ queue_id: string }>(
    token,
    `/api/admin/qa-guide-generation/queue/run-next`,
    { method: "POST" },
  );
}

export async function runGenerationById(
  token: string,
  id: string,
  force = false,
): Promise<{ queue_id: string }> {
  const qs = force ? "?force=true" : "";
  return adminFetch<{ queue_id: string }>(
    token,
    `/api/admin/qa-guide-generation/queue/${id}/run${qs}`,
    { method: "POST" },
  );
}
