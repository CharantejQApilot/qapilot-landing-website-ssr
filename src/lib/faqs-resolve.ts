import { asString } from "@/lib/cms-values";
import { FALLBACK_FAQS, type FallbackFAQ } from "@/lib/faqs-fallback";
import { sanitizeRichText } from "@/lib/sanitizeRichText";

export interface CmsFAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
}

export interface ResolvedFAQ {
  id: string;
  question: string;
  category: string | null;
  answerHtml: string;
  /** Plain text for JSON-LD (no HTML). */
  answerText: string;
}

function normalizeQuestionKey(question: string): string {
  return question.trim().toLowerCase();
}

function fallbackByQuestion(): Map<string, FallbackFAQ> {
  const map = new Map<string, FallbackFAQ>();
  for (const faq of FALLBACK_FAQS) {
    map.set(normalizeQuestionKey(faq.question), faq);
  }
  return map;
}

/** Repair known CMS tense slip that pollutes FAQPage JSON-LD. */
function normalizeFaqAnswerHtml(html: string): string {
  return html.replace(
    /explores the app like a real user,\s*identified critical flows,\s*and\s*generated/gi,
    "explores the app like a real user, identifies critical flows, and generates",
  );
}

function resolveAnswerHtml(rawAnswer: string, fallbackAnswer?: string): string {
  const sanitized = normalizeFaqAnswerHtml(sanitizeRichText(asString(rawAnswer), "html"));
  if (sanitized.trim()) return sanitized;
  if (fallbackAnswer) {
    return normalizeFaqAnswerHtml(sanitizeRichText(fallbackAnswer, "html"));
  }
  return "";
}

function toPlainText(html: string): string {
  return asString(html).replace(/<[^>]*>/g, "").trim();
}

/**
 * Merge CMS FAQs with static fallback: use fallback when CMS row is missing,
 * has empty answer after sanitization, or when the query returns no usable rows.
 */
export function resolveFaqsForPage(cmsFaqs: CmsFAQ[] | null | undefined): ResolvedFAQ[] {
  const fallbackMap = fallbackByQuestion();

  if (!cmsFaqs?.length) {
    return FALLBACK_FAQS.map((faq) => {
      const answerHtml = sanitizeRichText(faq.answer, "html");
      return {
        id: faq.id,
        question: faq.question,
        category: faq.category,
        answerHtml,
        answerText: toPlainText(answerHtml),
      };
    });
  }

  const resolved = cmsFaqs
    .map((faq) => {
      const question = asString(faq.question).trim();
      if (!question) return null;

      const fallback = fallbackMap.get(normalizeQuestionKey(question));
      const answerHtml = resolveAnswerHtml(faq.answer, fallback?.answer);
      if (!answerHtml.trim()) return null;

      return {
        id: faq.id,
        question,
        category: faq.category,
        answerHtml,
        answerText: toPlainText(answerHtml),
      };
    })
    .filter((faq): faq is ResolvedFAQ => faq !== null);

  if (resolved.length > 0) return resolved;

  return FALLBACK_FAQS.map((faq) => {
    const answerHtml = sanitizeRichText(faq.answer, "html");
    return {
      id: faq.id,
      question: faq.question,
      category: faq.category,
      answerHtml,
      answerText: toPlainText(answerHtml),
    };
  });
}
