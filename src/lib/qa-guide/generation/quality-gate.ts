import { normalizeLinkPath } from "@/lib/qa-guide/generation/fetch-site-context";

export const BANNED_PHRASES = [
  "delve",
  "delving",
  "delved",
  "testament",
  "moreover",
  "furthermore",
  "in today's fast-paced world",
  "in the world of",
  "in the realm of",
  "the world of",
  "navigating the complexities",
  "landscape of",
  "ever-evolving",
  "paradigm shift",
  "synergy",
  "harness the power of",
  "unleash",
  "unlock",
  "dive deep",
  "embark on a journey",
  "at the end of the day",
  "in conclusion",
  "it's worth noting that",
  "it goes without saying",
  "needless to say",
  "cutting-edge",
  "state-of-the-art",
  "revolutionize",
  "revolutionary",
  "seamless",
  "seamlessly",
  "robust",
  "leverage",
  "leveraging",
  "as we navigate",
  "tapestry",
  "game-changer",
  "holistic approach",
  "best practices abound",
];

const MIN_WORDS = 2000;
const MAX_WORDS = 3200;
const MIN_H2_SECTIONS = 5;
const MIN_QAPILOT_MENTIONS = 3;
const MIN_INLINE_QAPILOT_LINKS = 2;
const MAX_INLINE_QAPILOT_LINKS = 3;
const MIN_INLINE_EXTERNAL_LINKS = 2;
const MAX_INLINE_EXTERNAL_LINKS = 3;

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

  if (wordCount < MIN_WORDS || wordCount > MAX_WORDS) {
    fails.push(`word_count=${wordCount} not in [${MIN_WORDS},${MAX_WORDS}] (~2200–2800 target)`);
  }

  const h2Re = /^##\s+(.+)$/gm;
  const h2s: string[] = [];
  let h2Match: RegExpExecArray | null;
  while ((h2Match = h2Re.exec(body)) !== null) {
    h2s.push(h2Match[1] ?? "");
  }
  if (h2s.length < MIN_H2_SECTIONS) {
    fails.push(`h2_count=${h2s.length} < ${MIN_H2_SECTIONS}`);
  }

  const lastH2 = h2s[h2s.length - 1]?.toLowerCase() ?? "";
  if (!h2s.length || !lastH2.includes("qapilot")) {
    fails.push("missing closing bridge (last H2 does not mention QApilot)");
  }

  const qapilotMentions = (body.match(/qapilot/gi) ?? []).length;
  qc.qapilot_mention_count = qapilotMentions;
  if (qapilotMentions < MIN_QAPILOT_MENTIONS) {
    fails.push(`qapilot_mentions=${qapilotMentions} < ${MIN_QAPILOT_MENTIONS}`);
  }

  const { qapilot: inlineQapilot, external: inlineExternal } = countInlineLinks(body);
  qc.inline_qapilot_links = inlineQapilot;
  qc.inline_external_links = inlineExternal;

  if (!isInRange(inlineQapilot, MIN_INLINE_QAPILOT_LINKS, MAX_INLINE_QAPILOT_LINKS)) {
    fails.push(
      `inline_qapilot_links=${inlineQapilot} (need ${MIN_INLINE_QAPILOT_LINKS}–${MAX_INLINE_QAPILOT_LINKS})`,
    );
  }
  if (!isInRange(inlineExternal, MIN_INLINE_EXTERNAL_LINKS, MAX_INLINE_EXTERNAL_LINKS)) {
    fails.push(
      `inline_external_links=${inlineExternal} (need ${MIN_INLINE_EXTERNAL_LINKS}–${MAX_INLINE_EXTERNAL_LINKS})`,
    );
  }

  const mobileTermHits = countMobileTerms(body);
  qc.mobile_term_hits = mobileTermHits;
  if (mobileTermHits < 5) {
    fails.push(`mobile_term_hits=${mobileTermHits} < 5`);
  }

  const lowerBody = body.toLowerCase();
  const foundBans = BANNED_PHRASES.filter((w) => lowerBody.includes(w));
  if (foundBans.length) {
    fails.push(`banned words: ${foundBans.slice(0, 5).join(", ")}`);
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
  if (extSugg.length < MIN_INLINE_EXTERNAL_LINKS || extSugg.length > MAX_INLINE_EXTERNAL_LINKS) {
    fails.push(
      `external_link_suggestions=${extSugg.length} (need ${MIN_INLINE_EXTERNAL_LINKS}–${MAX_INLINE_EXTERNAL_LINKS})`,
    );
  }

  const infoGain = qc.information_gain;
  if (!Array.isArray(infoGain) || infoGain.length < 2) {
    fails.push("information_gain needs at least 2 items");
  }

  const structured = qc.structured_elements;
  if (!Array.isArray(structured) || structured.length < 2) {
    fails.push("structured_elements needs at least 2 items");
  }

  const grounding = qc.qapilot_grounding;
  if (!Array.isArray(grounding) || grounding.length < 3) {
    fails.push("qapilot_grounding needs at least 3 site phrases");
  }

  const originality = typeof qc.originality_score === "number" ? qc.originality_score : 0;
  if (originality < 0.65) {
    fails.push(`originality_score=${originality} < 0.65`);
  }

  const usefulness = typeof qc.usefulness_score === "number" ? qc.usefulness_score : 0;
  if (usefulness < 0.65) {
    fails.push(`usefulness_score=${usefulness} < 0.65`);
  }

  const productRelevance =
    typeof qc.product_relevance_score === "number" ? qc.product_relevance_score : 0;
  if (productRelevance < 0.6) {
    fails.push(`product_relevance_score=${productRelevance} < 0.6`);
  }

  if (fails.length) {
    qc.overall_recommendation = "DISCARD";
    qc.server_side_failures = fails;
  } else if (
    qc.overall_recommendation !== "APPROVE" &&
    qc.overall_recommendation !== "APPROVE as supporting" &&
    qc.overall_recommendation !== "REVIEW"
  ) {
    qc.overall_recommendation = "REVIEW";
  }

  return qc;
}

export function compositeQualityScore(qc: Record<string, unknown>): number {
  const o = typeof qc.originality_score === "number" ? qc.originality_score : 0;
  const u = typeof qc.usefulness_score === "number" ? qc.usefulness_score : 0;
  const p = typeof qc.product_relevance_score === "number" ? qc.product_relevance_score : 0;
  return Math.round(((o + u + p) / 3) * 100) / 100;
}
