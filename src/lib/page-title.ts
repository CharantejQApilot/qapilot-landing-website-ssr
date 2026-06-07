const BRAND_SUFFIX = " | QApilot";

export type AbsolutePageTitle = { absolute: string };

/** Visible `<title>` length Ubersuggest flags above ~65 characters. */
export const PAGE_TITLE_MAX_LEN = 65;

/** Ubersuggest flags titles shorter than ~30 characters. */
export const PAGE_TITLE_MIN_LEN = 30;

const BRAND_SUFFIX_RE = /\s*\|\s*QApilot\s*$/i;

/** Remove trailing `| QApilot` segments (CMS titles often include the brand already). */
export function stripBrandSuffix(title: string): string {
  let base = title.trim();
  while (BRAND_SUFFIX_RE.test(base)) {
    base = base.replace(BRAND_SUFFIX_RE, "").trim();
  }
  return base;
}

function truncateAtWordBoundary(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > maxLen * 0.55) {
    return slice.slice(0, lastSpace).trimEnd();
  }
  return slice.trimEnd();
}

/**
 * Normalize a page title for Next metadata: strip duplicate brand suffixes,
 * enforce max length, and return `{ absolute }` so the root layout template
 * does not append `| QApilot` twice.
 */
/** Full document title with brand suffix, capped at {@link PAGE_TITLE_MAX_LEN} characters. */
export function formatPageTitleString(raw: string): string {
  const maxBase = PAGE_TITLE_MAX_LEN - BRAND_SUFFIX.length;
  const base = truncateAtWordBoundary(stripBrandSuffix(raw), maxBase);
  return `${base}${BRAND_SUFFIX}`;
}

/** Next.js metadata title that bypasses the root layout `%s | QApilot` template. */
export function formatPageTitle(raw: string): AbsolutePageTitle {
  return { absolute: formatPageTitleString(raw) };
}
