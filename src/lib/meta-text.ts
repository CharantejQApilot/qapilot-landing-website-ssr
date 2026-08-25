/**
 * Shared SERP-safe truncation for titles and meta descriptions.
 * Never leave a conjunction / weak connector as the last word.
 */

/** SERP display budget for meta descriptions (~160 chars). */
export const META_DESCRIPTION_MAX_LEN = 160;

/** Preferred authoring floor for meta descriptions (publish validation). */
export const META_DESCRIPTION_MIN_LEN = 140;

/**
 * Connectors stripped after truncation so SERP text never ends mid-phrase.
 * Broader than authoring validation (includes guide / brand leftovers).
 */
export const WEAK_TRAILING_WORD_RE =
  /\b(a|an|and|as|at|by|for|from|in|into|of|on|or|the|to|with|without|vs|via|where|what|which|when|who|whom|whose|how|why|makes?|complete|guide|qapilot)$/i;

/**
 * Incomplete endings for author-written SEO fields (publish validation).
 * Does not flag complete phrases ending in “QApilot” or “guide”.
 */
export const INCOMPLETE_TRAILING_WORD_RE =
  /\b(a|an|and|as|at|by|for|from|in|into|of|on|or|the|to|with|without|vs|via|where|what|which|when|who|whom|whose|how|why)$/i;

export function stripTrailingPunctuation(text: string): string {
  return text.replace(/[\s,.;:\-–—]+$/, "").trimEnd();
}

/** Drop dangling connectors so truncated copy never ends mid-phrase. */
export function stripWeakTrailingWords(text: string, minWords = 2): string {
  let result = stripTrailingPunctuation(text);
  while (result) {
    const parts = result.split(/\s+/);
    const last = (parts[parts.length - 1] ?? "").replace(/[.,;\-–—]+$/, "");
    if (!WEAK_TRAILING_WORD_RE.test(last) || parts.length <= minWords) break;
    parts.pop();
    result = stripTrailingPunctuation(parts.join(" "));
  }
  return result;
}

/**
 * Truncate at a word boundary and strip weak trailing words.
 * Only strips connectors when truncation actually occurred (complete short
 * strings that end with "QApilot" / "guide" are left alone).
 * @param minWordCutRatio Prefer a space cut only when it falls after this fraction of maxLen.
 */
export function truncateAtWordBoundary(
  text: string,
  maxLen: number,
  minWordCutRatio = 0.55,
): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLen) {
    return normalized;
  }
  const slice = normalized.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  const cut =
    lastSpace > maxLen * minWordCutRatio ? lastSpace : maxLen;
  return stripWeakTrailingWords(slice.slice(0, cut));
}

/** True when the last word is an incomplete connector (authoring check). */
export function endsWithWeakTrailingWord(text: string): boolean {
  const trimmed = stripTrailingPunctuation(text.replace(/\s+/g, " ").trim());
  if (!trimmed) return false;
  const parts = trimmed.split(/\s+/);
  const last = (parts[parts.length - 1] ?? "").replace(/[.,;\-–—]+$/, "");
  return INCOMPLETE_TRAILING_WORD_RE.test(last);
}
