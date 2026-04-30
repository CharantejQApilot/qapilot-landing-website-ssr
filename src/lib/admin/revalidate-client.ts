"use client";

const COMMON_CACHE_PATHS = ["/sitemap-index.xml", "/robots.txt", "/sitemap.xml"];

export function withCommonCachePaths(paths: string[]): string[] {
  return [...paths, ...COMMON_CACHE_PATHS];
}

function uniquePaths(paths: string[]): string[] {
  return Array.from(
    new Set(
      paths
        .map((p) => p.trim())
        .filter((p) => p.startsWith("/")),
    ),
  );
}

export async function revalidatePublicPaths(
  token: string | null | undefined,
  paths: string[],
): Promise<void> {
  if (!token) return;
  const normalized = uniquePaths(paths);
  if (normalized.length === 0) return;

  try {
    const res = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paths: normalized }),
    });
    if (!res.ok) {
      console.warn("[Admin ISR] revalidate failed:", res.status, normalized);
    }
  } catch (error) {
    console.warn("[Admin ISR] revalidate error:", error);
  }
}
