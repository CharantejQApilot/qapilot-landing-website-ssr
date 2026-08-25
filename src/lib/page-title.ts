import {
  stripTrailingPunctuation,
  truncateAtWordBoundary,
} from "@/lib/meta-text";

const BRAND_SUFFIX = " | QApilot";

export type AbsolutePageTitle = { absolute: string };

/** Visible `<title>` length Ubersuggest flags above ~65 characters. */
export const PAGE_TITLE_MAX_LEN = 65;

/** Ubersuggest flags titles shorter than ~30 characters. */
export const PAGE_TITLE_MIN_LEN = 30;

/**
 * Max length for an author-written SEO title that does not already include
 * the brand (suffix adds {@link BRAND_SUFFIX}).
 */
export const PAGE_TITLE_AUTHOR_MAX_WITHOUT_BRAND =
  PAGE_TITLE_MAX_LEN - BRAND_SUFFIX.length;

const BRAND_SUFFIX_RE = /\s*\|\s*QApilot\s*$/i;
const QAPILOT_TOKEN_RE = /\bqapilot\b/i;

/** Remove trailing `| QApilot` segments (CMS titles often include the brand already). */
export function stripBrandSuffix(title: string): string {
  let base = title.trim();
  while (BRAND_SUFFIX_RE.test(base)) {
    base = base.replace(BRAND_SUFFIX_RE, "").trim();
  }
  return base;
}

/** True when the title already names the brand (avoid appending `| QApilot` again). */
export function titleIncludesBrand(title: string): boolean {
  return QAPILOT_TOKEN_RE.test(title);
}

/**
 * Full document title capped at {@link PAGE_TITLE_MAX_LEN}.
 * Appends `| QApilot` only when the source does not already contain QApilot.
 * If truncation leaves a dangling subtitle after `:`, drop that clause.
 */
export function formatPageTitleString(raw: string): string {
  const stripped = stripBrandSuffix(raw);
  const hasBrand = titleIncludesBrand(stripped);

  if (hasBrand) {
    const before = stripped.length;
    const truncated = truncateAtWordBoundary(stripped, PAGE_TITLE_MAX_LEN);
    return dropIncompleteSubtitle(truncated, truncated.length < before);
  }

  const maxBase = PAGE_TITLE_MAX_LEN - BRAND_SUFFIX.length;
  const before = stripped.length;
  const base = truncateAtWordBoundary(stripped, maxBase);
  const cleaned = dropIncompleteSubtitle(base, base.length < before);
  return `${cleaned}${BRAND_SUFFIX}`;
}

/**
 * After forced truncation, prefer a clean stop before `:` when the trailing
 * clause is a short/incomplete subtitle (e.g. "…: What AI Automation").
 */
function dropIncompleteSubtitle(text: string, wasTruncated: boolean): string {
  if (!wasTruncated) return text;
  const colon = text.lastIndexOf(":");
  if (colon < Math.floor(text.length * 0.35)) return text;
  const after = text.slice(colon + 1).trim();
  const words = after.split(/\s+/).filter(Boolean);
  if (words.length === 0 || words.length <= 4) {
    return text.slice(0, colon).replace(/[\s,.;:\-–—]+$/, "").trimEnd();
  }
  return text;
}

/** Next.js metadata title that bypasses the root layout `%s | QApilot` template. */
export function formatPageTitle(raw: string): AbsolutePageTitle {
  return { absolute: formatPageTitleString(raw) };
}

export { stripTrailingPunctuation };
