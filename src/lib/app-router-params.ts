import { notFound } from "next/navigation";

/**
 * Next.js 14 passes `params` as a plain object; 15+ may pass a Promise.
 * Resolving with `Promise.resolve` keeps both shapes working.
 */
export async function resolveSlugParam(
  params: { slug?: string } | Promise<{ slug?: string }>,
): Promise<string> {
  const resolved = await Promise.resolve(params);
  const slug = resolved.slug;
  if (typeof slug !== "string" || !slug.trim()) notFound();
  return slug.trim();
}
