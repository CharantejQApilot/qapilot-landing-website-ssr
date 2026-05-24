import { normalizeLinkPath } from "@/lib/qa-guide/generation/fetch-site-context";
import {
  BANNED_PHRASES,
  QUALITY_MAX_EXTERNAL_LINKS,
  QUALITY_MAX_INTERNAL_LINKS,
  QUALITY_MAX_WORDS,
  QUALITY_MIN_EXTERNAL_LINKS,
  QUALITY_MIN_H2,
  QUALITY_MIN_INFORMATION_GAIN,
  QUALITY_MIN_INTERNAL_LINKS,
  QUALITY_MIN_MOBILE_TERMS,
  QUALITY_MIN_ORIGINALITY,
  QUALITY_MIN_PRODUCT_RELEVANCE,
  QUALITY_MIN_QAPILOT_GROUNDING,
  QUALITY_MIN_QAPILOT_MENTIONS,
  QUALITY_MIN_STRUCTURED_ELEMENTS,
  QUALITY_MIN_USEFULNESS,
  QUALITY_MIN_WORDS,
  QUALITY_TARGET_MAX_WORDS,
  QUALITY_TARGET_MIN_WORDS,
} from "@/lib/qa-guide/generation/quality-standards";

export { BANNED_PHRASES };

const MOBILE_QA_TERMS = [
  "testflight",
  "play console",
  "xctest",
  "espresso",
  "appium",
  "detox",
  "maestro",
  "flutter",
  "ios",
  "android",
  "simulator",
  "emulator",
  "device farm",
  "flaky",
  "regression",
  "beta build",
  "app store",
  "play store",
  "crash",
  "anr",
  "mobile app",
  "mobile testing",
  "release",
  "ci/cd",
  "uitest",
  "on-device",
];

export type ArticleJson = {
  content_markdown?: string;
  internal_link_suggestions?: Array<{ anchor?: string; target_url?: string }>;
  external_link_suggestions?: Array<{ anchor?: string; target_url?: string }>;
  quality_checks?: Record<string, unknown>;
};

function countInlineLinks(body: string): { qapilot: number; external: number } {
  const re = /\[[^\]]+\]\((https?:\/\/[^)]+)\)/gi;
  let qapilot = 0;
  let external = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    const url = (m[1] ?? "").toLowerCase();
    if (url.includes("qapilot.io")) qapilot += 1;
    else external += 1;
  }
  return { qapilot, external };
}

function countMobileTerms(body: string): number {
  const lower = body.toLowerCase();
  return MOBILE_QA_TERMS.filter((t) => lower.includes(t)).length;
}

function isInRange(count: number, min: number, max: number): boolean {
  return count >= min && count <= max;
}

export function runQualityGate(
  article: ArticleJson,
  internalLinkCandidates: string[],
): Record<string, unknown> {
  const qc = { ...(article.quality_checks ?? {}) } as Record<string, unknown>;
  const body = article.content_markdown ?? "";
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  qc.word_count = wordCount;

  const fails: string[] = [];

  if (wordCount < QUALITY_MIN_WORDS || wordCount > QUALITY_MAX_WORDS) {
    fails.push(
      `word_count=${wordCount} not in [${QUALITY_MIN_WORDS},${QUALITY_MAX_WORDS}] (~${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS} target)`,
    );
  }

  const h2Re = /^##\s+(.+)$/gm;
  const h2s: string[] = [];
  let h2Match: RegExpExecArray | null;
  while ((h2Match = h2Re.exec(body)) !== null) {
    h2s.push(h2Match[1] ?? "");
  }
  if (h2s.length < QUALITY_MIN_H2) {
    fails.push(`h2_count=${h2s.length} < ${QUALITY_MIN_H2}`);
  }

  const lastH2 = h2s[h2s.length - 1]?.toLowerCase() ?? "";
  if (!h2s.length || !lastH2.includes("qapilot")) {
    fails.push("missing closing bridge (last H2 does not mention QApilot)");
  }

  const qapilotMentions = (body.match(/qapilot/gi) ?? []).length;
  qc.qapilot_mention_count = qapilotMentions;
  if (qapilotMentions < QUALITY_MIN_QAPILOT_MENTIONS) {
    fails.push(`qapilot_mentions=${qapilotMentions} < ${QUALITY_MIN_QAPILOT_MENTIONS}`);
  }

  const { qapilot: inlineQapilot, external: inlineExternal } = countInlineLinks(body);
  qc.inline_qapilot_links = inlineQapilot;
  qc.inline_external_links = inlineExternal;

  if (!isInRange(inlineQapilot, QUALITY_MIN_INTERNAL_LINKS, QUALITY_MAX_INTERNAL_LINKS)) {
    fails.push(
      `inline_qapilot_links=${inlineQapilot} (need ${QUALITY_MIN_INTERNAL_LINKS}–${QUALITY_MAX_INTERNAL_LINKS})`,
    );
  }
  if (!isInRange(inlineExternal, QUALITY_MIN_EXTERNAL_LINKS, QUALITY_MAX_EXTERNAL_LINKS)) {
    fails.push(
      `inline_external_links=${inlineExternal} (need ${QUALITY_MIN_EXTERNAL_LINKS}–${QUALITY_MAX_EXTERNAL_LINKS})`,
    );
  }

  const mobileTermHits = countMobileTerms(body);
  qc.mobile_term_hits = mobileTermHits;
  if (mobileTermHits < QUALITY_MIN_MOBILE_TERMS) {
    fails.push(`mobile_term_hits=${mobileTermHits} < ${QUALITY_MIN_MOBILE_TERMS}`);
  }

  const lowerBody = body.toLowerCase();
  const foundBans = BANNED_PHRASES.filter((w) => lowerBody.includes(w));
  if (foundBans.length) {
    fails.push(`banned words: ${foundBans.slice(0, 8).join(", ")}`);
  }
  qc.ai_tells_found = foundBans;

  const candidatePaths = new Set(
    internalLinkCandidates.map((u) => normalizeLinkPath(u)),
  );
  const sugg = article.internal_link_suggestions ?? [];
  let validated = 0;
  for (const s of sugg) {
    const target = normalizeLinkPath(s.target_url ?? "");
    if (candidatePaths.has(target)) validated += 1;
  }
  qc.internal_links_validated = validated;
  if (sugg.length > 0 && validated === 0 && candidatePaths.size > 0) {
    fails.push("none of the suggested internal links match the sitemap");
  }

  const extSugg = article.external_link_suggestions ?? [];
  qc.external_link_suggestions_count = extSugg.length;
  if (
    extSugg.length < QUALITY_MIN_EXTERNAL_LINKS ||
    extSugg.length > QUALITY_MAX_EXTERNAL_LINKS
  ) {
    fails.push(
      `external_link_suggestions=${extSugg.length} (need ${QUALITY_MIN_EXTERNAL_LINKS}–${QUALITY_MAX_EXTERNAL_LINKS})`,
    );
  }

  const infoGain = qc.information_gain;
  if (!Array.isArray(infoGain) || infoGain.length < QUALITY_MIN_INFORMATION_GAIN) {
    fails.push(`information_gain needs at least ${QUALITY_MIN_INFORMATION_GAIN} items`);
  }

  const structured = qc.structured_elements;
  if (!Array.isArray(structured) || structured.length < QUALITY_MIN_STRUCTURED_ELEMENTS) {
    fails.push(`structured_elements needs at least ${QUALITY_MIN_STRUCTURED_ELEMENTS} items`);
  }

  const grounding = qc.qapilot_grounding;
  if (!Array.isArray(grounding) || grounding.length < QUALITY_MIN_QAPILOT_GROUNDING) {
    fails.push(`qapilot_grounding needs at least ${QUALITY_MIN_QAPILOT_GROUNDING} site phrases`);
  }

  const originality = typeof qc.originality_score === "number" ? qc.originality_score : 0;
  if (originality < QUALITY_MIN_ORIGINALITY) {
    fails.push(`originality_score=${originality} < ${QUALITY_MIN_ORIGINALITY}`);
  }

  const usefulness = typeof qc.usefulness_score === "number" ? qc.usefulness_score : 0;
  if (usefulness < QUALITY_MIN_USEFULNESS) {
    fails.push(`usefulness_score=${usefulness} < ${QUALITY_MIN_USEFULNESS}`);
  }

  const productRelevance =
    typeof qc.product_relevance_score === "number" ? qc.product_relevance_score : 0;
  if (productRelevance < QUALITY_MIN_PRODUCT_RELEVANCE) {
    fails.push(`product_relevance_score=${productRelevance} < ${QUALITY_MIN_PRODUCT_RELEVANCE}`);
  }

  qc.gate_enforced = false;
  qc.editor_may_bypass = true;

  if (fails.length) {
    qc.overall_recommendation = "NEEDS_REVIEW";
    qc.server_side_failures = fails;
    qc.quality_gate_passed = false;
  } else {
    qc.quality_gate_passed = true;
    if (
      qc.overall_recommendation !== "APPROVE" &&
      qc.overall_recommendation !== "APPROVE as supporting" &&
      qc.overall_recommendation !== "REVIEW"
    ) {
      qc.overall_recommendation = "REVIEW";
    }
  }

  return qc;
}

export function compositeQualityScore(qc: Record<string, unknown>): number {
  const o = typeof qc.originality_score === "number" ? qc.originality_score : 0;
  const u = typeof qc.usefulness_score === "number" ? qc.usefulness_score : 0;
  const p = typeof qc.product_relevance_score === "number" ? qc.product_relevance_score : 0;
  return Math.round(((o + u + p) / 3) * 100) / 100;
}

export function formatQualityFailures(qc: Record<string, unknown>): string {
  const failures = qc.server_side_failures;
  if (!Array.isArray(failures) || failures.length === 0) return "";
  return failures.join("; ");
}
