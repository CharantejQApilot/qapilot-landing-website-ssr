import { notFound } from "next/navigation";

/**
 * Next.js 14 passes `params` as a plain object; 15+ may pass a Promise.
 * Resolving with `Promise.resolve` keeps both shapes working.
 */
export async function resolveSlugParam(
  params: { slug?: string } | Promise<{ slug?: string }>,
): Promise<string> {
  return resolveParam(params, "slug");
}

export async function resolveParam<T extends string>(
  params:
    | Partial<Record<T, string | undefined>>
    | Promise<Partial<Record<T, string | undefined>>>,
  key: T,
): Promise<string> {
  const resolved = await Promise.resolve(params);
  const value = resolved[key];
  if (typeof value !== "string" || !value.trim()) notFound();
  return value.trim();
}
