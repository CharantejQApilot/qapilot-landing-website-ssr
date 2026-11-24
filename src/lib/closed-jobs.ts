/**
 * Published job pages that stay up after the role is filled.
 * The careers index no longer lists them. The page keeps the description
 * and says the role is closed.
 */
const CLOSED_JOB_KEYS = new Set([
  "product-designer",
  "809a1a93-4ebb-4efc-b139-dbb043ac50ac",
  "product-marketing-specialist-qapilot",
  "49743141-2881-46d9-b401-2074ef3b570c",
]);

export function isClosedJob(job: {
  id: string;
  slug?: string | null;
}): boolean {
  return (
    CLOSED_JOB_KEYS.has(job.id) ||
    (typeof job.slug === "string" && CLOSED_JOB_KEYS.has(job.slug))
  );
}
