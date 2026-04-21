import { SITE_BASE_URL } from "@/lib/constants";

/**
 * CMS fields may store relative paths (`/foo`), protocol-relative URLs (`//cdn/...`),
 * or full URLs. Open Graph / Twitter expect absolute URLs so metadata resolution does not throw.
 */
export function absoluteUrlForOpenGraph(
  url: string | null | undefined,
): string | undefined {
  const raw = typeof url === "string" ? url.trim() : "";
  if (!raw) return undefined;
  if (raw.startsWith("https://")) return raw;
  if (raw.startsWith("http://")) return raw;
  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("/")) return `${SITE_BASE_URL}${raw}`;
  try {
    return new URL(raw).href;
  } catch {
    return undefined;
  }
}

/**
 * `openGraph.publishedTime` should be a valid ISO-8601 instant; bad CMS values can break metadata.
 */
export function normalizeArticlePublishedTime(
  value: string | null | undefined,
): string | undefined {
  if (!value || typeof value !== "string") return undefined;
  const d = new Date(value.trim());
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}
