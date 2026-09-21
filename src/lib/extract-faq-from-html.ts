import type { FaqItem } from "@/lib/faq-jsonld";

const FAQ_HEADING_RE =
  /<(h2|h3)[^>]*>\s*(?:frequently\s+asked\s+questions|faqs?|common\s+questions)\s*<\/\1>/i;

type FaqSectionRange = {
  headingStart: number;
  headingEnd: number;
  sectionEnd: number;
};

function findFaqSectionRange(html: string): FaqSectionRange | null {
  if (!html) return null;
  const headingMatch = FAQ_HEADING_RE.exec(html);
  if (!headingMatch || headingMatch.index == null) return null;

  const headingStart = headingMatch.index;
  const headingEnd = headingStart + headingMatch[0].length;
  const after = html.slice(headingEnd);
  // Stop at the next same-or-higher section heading (h2) if present.
  const nextH2 = after.search(/<h2\b/i);
  const sectionEnd = nextH2 >= 0 ? headingEnd + nextH2 : html.length;
  return { headingStart, headingEnd, sectionEnd };
}

function isValidFaqPair(question: string, answer: string): boolean {
  return question.length >= 12 && question.includes("?") && answer.length >= 20;
}

function collectHeadingQuestionPairs(section: string): FaqItem[] {
  const pairs: FaqItem[] = [];
  const qRe =
    /<(h3|h4)[^>]*>([\s\S]*?)<\/\1>\s*(?:<p[^>]*>([\s\S]*?)<\/p>|<ul[^>]*>([\s\S]*?)<\/ul>)/gi;
  let m: RegExpExecArray | null;
  while ((m = qRe.exec(section)) !== null) {
    const question = normalizeFaqQuestion(stripTags(m[2]));
    const answer = stripTags(m[3] ?? m[4] ?? "");
    if (isValidFaqPair(question, answer)) {
      pairs.push({ question, answer });
    }
  }
  return pairs;
}

/** CMS markdown often uses `**Q1: …?**` followed by an answer paragraph. */
function collectStrongQuestionPairs(section: string): FaqItem[] {
  const pairs: FaqItem[] = [];
  const qRe =
    /<p[^>]*>\s*<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>\s*<\/p>\s*(?:<p[^>]*>([\s\S]*?)<\/p>|<ul[^>]*>([\s\S]*?)<\/ul>)/gi;
  let m: RegExpExecArray | null;
  while ((m = qRe.exec(section)) !== null) {
    const question = normalizeFaqQuestion(stripTags(m[1]));
    const answer = stripTags(m[2] ?? m[3] ?? "");
    if (isValidFaqPair(question, answer)) {
      pairs.push({ question, answer });
    }
  }
  return pairs;
}

/**
 * Conservatively extract FAQ Q&A pairs from sanitized article HTML.
 * Supports h3/h4 questions or bold `Q1:` paragraphs with a following answer.
 * Returns null when fewer than 2 pairs are found.
 */
export function extractFaqItemsFromHtml(html: string): FaqItem[] | null {
  const range = findFaqSectionRange(html);
  if (!range) return null;

  const section = html.slice(range.headingEnd, range.sectionEnd);
  const headingPairs = collectHeadingQuestionPairs(section);
  const pairs =
    headingPairs.length >= 2 ? headingPairs : collectStrongQuestionPairs(section);

  return pairs.length >= 2 ? pairs : null;
}

/**
 * Remove the article FAQ heading and its Q&A block so the dedicated FAQ
 * accordion is the only on-page copy. Leaves the rest of the article intact.
 */
export function stripFaqSectionFromHtml(html: string): string {
  const range = findFaqSectionRange(html);
  if (!range) return html;

  let start = range.headingStart;
  const before = html.slice(0, start);
  const leadingDivider = before.match(/<hr\b[^>]*\/?>\s*$/i);
  if (leadingDivider && leadingDivider.index != null) {
    start = leadingDivider.index;
  }

  return `${html.slice(0, start)}${html.slice(range.sectionEnd)}`.trimEnd();
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

function normalizeFaqQuestion(value: string): string {
  return value
    .replace(/^(?:q(?:uestion)?\s*\d+|[q])[.:)\-–—]\s*/i, "")
    .trim();
}
