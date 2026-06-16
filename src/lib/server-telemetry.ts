type MetadataFallbackReason =
  | "supabase-unavailable"
  | "query-error"
  | "metadata-build-error";

interface MetadataFallbackEvent {
  route: string;
  contentType: "blogs" | "news_updates" | "job_openings" | "faqs";
  slug?: string;
  reason: MetadataFallbackReason;
  details?: Record<string, unknown>;
}

function compactObject(input: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null || value === "") continue;
    next[key] = value;
  }
  return next;
}

export function logMetadataFallback(event: MetadataFallbackEvent): void {
  const payload = compactObject({
    ts: new Date().toISOString(),
    ...event,
    details: event.details ? compactObject(event.details) : undefined,
  });

  // Structured logs make it easy to create alerts in Vercel/Supabase log sinks.
  console.warn("[cms-metadata-fallback]", JSON.stringify(payload));
}

export function summarizeUnknownError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return compactObject({
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  }
  return { value: String(error) };
}
