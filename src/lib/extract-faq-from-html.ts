import type { FaqItem } from "@/lib/faq-jsonld";

const FAQ_HEADING_RE =
  /<(h2|h3)[^>]*>\s*(?:frequently\s+asked\s+questions|faqs?|common\s+questions)\s*<\/\1>/i;

/**
 * Conservatively extract FAQ Q&A pairs from sanitized article HTML.
 * Expects an FAQ heading followed by h3/h4 questions with a following paragraph or list.
 * Returns null when fewer than 2 pairs are found.
 */
export function extractFaqItemsFromHtml(html: string): FaqItem[] | null {
  if (!html || !FAQ_HEADING_RE.test(html)) return null;

  const headingMatch = FAQ_HEADING_RE.exec(html);
  if (!headingMatch || headingMatch.index == null) return null;

  const after = html.slice(headingMatch.index + headingMatch[0].length);
  // Stop at the next same-or-higher section heading (h2) if present.
  const nextH2 = after.search(/<h2\b/i);
  const section = nextH2 >= 0 ? after.slice(0, nextH2) : after;

  const pairs: FaqItem[] = [];
  const qRe =
    /<(h3|h4)[^>]*>([\s\S]*?)<\/\1>\s*(?:<p[^>]*>([\s\S]*?)<\/p>|<ul[^>]*>([\s\S]*?)<\/ul>)/gi;
  let m: RegExpExecArray | null;
  while ((m = qRe.exec(section)) !== null) {
    const question = stripTags(m[2]).trim();
    const answer = stripTags(m[3] ?? m[4] ?? "").trim();
    if (
      question.length >= 12 &&
      question.includes("?") &&
      answer.length >= 20
    ) {
      pairs.push({ question, answer });
    }
  }

  return pairs.length >= 2 ? pairs : null;
}

function stripTags(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}
