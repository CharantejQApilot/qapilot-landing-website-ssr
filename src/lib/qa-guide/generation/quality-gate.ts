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
];

export type ArticleJson = {
  content_markdown?: string;
  internal_link_suggestions?: Array<{ anchor?: string; target_url?: string }>;
  quality_checks?: Record<string, unknown>;
};

export function runQualityGate(
  article: ArticleJson,
  internalLinkCandidates: string[],
): Record<string, unknown> {
  const qc = { ...(article.quality_checks ?? {}) } as Record<string, unknown>;
  const body = article.content_markdown ?? "";
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  qc.word_count = wordCount;

  const fails: string[] = [];

  if (wordCount < 1200 || wordCount > 1800) {
    fails.push(`word_count=${wordCount} not in [1200,1800]`);
  }

  const h2Re = /^##\s+(.+)$/gm;
  const h2s: string[] = [];
  let h2Match: RegExpExecArray | null;
  while ((h2Match = h2Re.exec(body)) !== null) {
    h2s.push(h2Match[1] ?? "");
  }
  const lastH2 = h2s[h2s.length - 1]?.toLowerCase() ?? "";
  if (!h2s.length || !lastH2.includes("qapilot")) {
    fails.push("missing closing bridge (last H2 does not mention QApilot)");
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

  const infoGain = qc.information_gain;
  if (!Array.isArray(infoGain) || infoGain.length === 0) {
    fails.push("information_gain empty");
  }

  const structured = qc.structured_elements;
  if (!Array.isArray(structured) || structured.length === 0) {
    fails.push("structured_elements empty");
  }

  const originality = typeof qc.originality_score === "number" ? qc.originality_score : 0;
  if (originality < 0.6) {
    fails.push(`originality_score=${originality} < 0.6`);
  }

  const usefulness = typeof qc.usefulness_score === "number" ? qc.usefulness_score : 0;
  if (usefulness < 0.5) {
    fails.push(`usefulness_score=${usefulness} < 0.5`);
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
