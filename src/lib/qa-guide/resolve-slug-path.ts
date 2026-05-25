/** Normalize catch-all route segments from App Router params. */
export function normalizeSlugPath(
  slugPath: string | string[] | undefined,
): string[] {
  if (!slugPath) return [];
  const parts = Array.isArray(slugPath) ? slugPath : [slugPath];
  return parts.map((p) => p.trim()).filter(Boolean);
}
