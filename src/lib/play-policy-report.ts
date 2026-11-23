/**
 * Server-side fetch for hosted Play Policy report HTML.
 * The API returns raw text/html on success (not an { ok, data } envelope).
 */

const SCAN_ID_RE = /^[a-zA-Z0-9_-]{8,64}$/;

export type PlayPolicyReportResult =
  | { kind: "html"; body: string; contentType: string }
  | { kind: "not_found" }
  | { kind: "expired" }
  | { kind: "error" };

export function isValidPlayPolicyScanId(scanId: string): boolean {
  return SCAN_ID_RE.test(scanId);
}

function getApiBase(): string | null {
  const base = process.env.NEXT_PUBLIC_PLAY_POLICY_API_URL?.trim();
  if (!base) return null;
  return base.replace(/\/$/, "");
}

export async function fetchPlayPolicyReportHtml(
  scanId: string,
): Promise<PlayPolicyReportResult> {
  if (!isValidPlayPolicyScanId(scanId)) {
    return { kind: "not_found" };
  }

  const base = getApiBase();
  if (!base) {
    return { kind: "error" };
  }

  let res: Response;
  try {
    res = await fetch(`${base}/api/public/reports/${encodeURIComponent(scanId)}`, {
      cache: "no-store",
      headers: { Accept: "text/html" },
    });
  } catch {
    return { kind: "error" };
  }

  if (res.status === 404) return { kind: "not_found" };
  if (res.status === 410) return { kind: "expired" };
  if (!res.ok) return { kind: "error" };

  const body = await res.text();
  const contentType =
    res.headers.get("content-type")?.split(";")[0]?.trim() || "text/html";

  return {
    kind: "html",
    body,
    contentType: contentType.includes("html")
      ? "text/html; charset=utf-8"
      : `${contentType}; charset=utf-8`,
  };
}
