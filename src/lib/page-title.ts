const BRAND_SUFFIX = " | QApilot";

export type AbsolutePageTitle = { absolute: string };

/** Visible `<title>` length Ubersuggest flags above ~65 characters. */
export const PAGE_TITLE_MAX_LEN = 65;

/** Ubersuggest flags titles shorter than ~30 characters. */
export const PAGE_TITLE_MIN_LEN = 30;

const BRAND_SUFFIX_RE = /\s*\|\s*QApilot\s*$/i;

/** Weak trailing words that make truncated titles look broken (e.g. "… for | QApilot"). */
const WEAK_TRAILING_WORD_RE =
  /\b(a|an|and|as|at|by|for|from|in|into|of|on|or|the|to|with|without|vs|via|makes?|complete|guide|qapilot)$/i;

/** Remove trailing `| QApilot` segments (CMS titles often include the brand already). */
export function stripBrandSuffix(title: string): string {
  let base = title.trim();
  while (BRAND_SUFFIX_RE.test(base)) {
    base = base.replace(BRAND_SUFFIX_RE, "").trim();
  }
  return base;
}

function stripTrailingPunctuation(text: string): string {
  return text.replace(/[\s,.;:\-–]+$/, "").trimEnd();
}

function truncateAtWordBoundary(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  let cut = slice.lastIndexOf(" ");
  if (cut <= maxLen * 0.55) {
    return stripTrailingPunctuation(slice);
  }
  let truncated = stripTrailingPunctuation(slice.slice(0, cut));
  // Drop dangling connector / brand words so titles don't end mid-phrase.
  while (truncated) {
    const parts = truncated.split(/\s+/);
    const last = (parts[parts.length - 1] ?? "").replace(/[.,;\-–]+$/, "");
    if (!WEAK_TRAILING_WORD_RE.test(last) || parts.length <= 2) break;
    parts.pop();
    truncated = stripTrailingPunctuation(parts.join(" "));
  }
  return truncated;
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
