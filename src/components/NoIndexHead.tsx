/**
 * No-op in Next.js SSR build. noindex is handled via metadata exports.
 */
export default function NoIndexHead(_props: Record<string, unknown>) {
  return null;
}
