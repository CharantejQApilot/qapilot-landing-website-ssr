/**
 * No-op in Next.js SSR build. noindex is handled via metadata exports.
 */
export default function ConditionalNoIndexHead(_props: Record<string, unknown>) {
  return null;
}
