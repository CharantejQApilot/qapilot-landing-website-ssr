/** Extract a user-visible message from Supabase, fetch, or unknown thrown values. */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return friendlyDatabaseMessage(error.message);
  }
  if (typeof error === "string" && error.trim()) {
    return friendlyDatabaseMessage(error);
  }
  if (error && typeof error === "object") {
    const o = error as Record<string, unknown>;
    const message = typeof o.message === "string" ? o.message : "";
    const details = typeof o.details === "string" ? o.details : "";
    const hint = typeof o.hint === "string" ? o.hint : "";
    const code = typeof o.code === "string" ? o.code : "";
    const combined = [message, details, hint].filter(Boolean).join(" — ");
    if (combined.trim()) return friendlyDatabaseMessage(combined);
    if (code) return `Request failed (${code})`;
  }
  return "Unknown error — open the browser console for details.";
}

function friendlyDatabaseMessage(raw: string): string {
  if (raw.includes("qa_guides_publish_seo_required")) {
    return "SEO title and SEO description are required before publishing. Open Edit to fill them in, or re-run the migration that makes cover images optional.";
  }
  if (raw.includes("qa_guides_tier_status_publish_sync")) {
    return "Guide tier and status are out of sync. Save as draft in the editor, then publish again.";
  }
  if (raw.includes("qa_guides_topic_cluster_fkey")) {
    return "Topic cluster is invalid. Pick a valid cluster in the editor.";
  }
  if (raw.includes("violates row-level security") || raw.includes("RLS")) {
    return "Permission denied. Sign in as an admin and try again.";
  }
  return raw;
}
