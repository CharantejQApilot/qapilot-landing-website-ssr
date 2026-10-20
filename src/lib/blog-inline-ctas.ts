const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

/** Blocks a CTA may sit in front of. Lists, tables, and quotes continue the text before them. */
const BREAKABLE_TAGS = new Set(["h2", "h3", "h4", "p", "hr"]);

type TopLevelStart = { index: number; tag: string };

/** Offsets where each top-level element of an HTML fragment starts. */
function topLevelStarts(html: string): TopLevelStart[] {
  const starts: TopLevelStart[] = [];
  const tagPattern = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)[^>]*?(\/?)>/g;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = tagPattern.exec(html))) {
    const [, closing, rawTag, selfClosing] = match;
    if (!rawTag) continue;
    const tag = rawTag.toLowerCase();
    if (closing) {
      depth = Math.max(0, depth - 1);
      continue;
    }
    if (depth === 0) starts.push({ index: match.index, tag });
    if (!selfClosing && !VOID_TAGS.has(tag)) depth += 1;
  }
  return starts;
}

type Candidate = { index: number; tag: string; textOffset: number };

function closestTo(candidates: Candidate[], target: number): Candidate | undefined {
  let best: Candidate | undefined;
  for (const c of candidates) {
    if (!best || Math.abs(c.textOffset - target) < Math.abs(best.textOffset - target)) {
      best = c;
    }
  }
  return best;
}

/** Prefer an h2 near the target, then any heading, then any top-level block. */
function pickBoundary(
  candidates: Candidate[],
  target: number,
  tolerance: number,
): Candidate | undefined {
  const pools = [
    candidates.filter((c) => c.tag === "h2"),
    candidates.filter((c) => c.tag === "h2" || c.tag === "h3"),
    candidates,
  ];
  for (const pool of pools) {
    const best = closestTo(pool, target);
    if (best && Math.abs(best.textOffset - target) <= tolerance) return best;
  }
  return closestTo(candidates, target);
}

const textLength = (html: string) => html.replace(/<[^>]*>/g, "").length;

export type BlogArticleParts = {
  /** Body before the case study CTA. */
  intro: string;
  /** Body between the case study CTA and the demo CTA. */
  middle: string;
  /** Body after the demo CTA. Empty when the article is too short for two CTAs. */
  rest: string;
  showDemoCta: boolean;
};

/**
 * Splits article HTML at top-level boundaries (section headings first) so the
 * case study CTA lands near 40% and the demo CTA near 75% of the article text.
 */
export function splitBlogArticleForCtas(html: string): BlogArticleParts | null {
  const candidates: Candidate[] = topLevelStarts(html)
    .filter(
      (s, i, all) =>
        s.index > 0 &&
        BREAKABLE_TAGS.has(s.tag) &&
        !/^h[1-6]$/.test(all[i - 1]?.tag ?? ""),
    )
    // A lead-in ending in ":" belongs with the block that follows it.
    .filter((s) => !/:\s*$/.test(html.slice(0, s.index).replace(/<[^>]*>/g, "").trimEnd()))
    .map((s) => {
      // Keep a divider attached to the section it introduces.
      const before = html.slice(0, s.index).trimEnd();
      const index = /<hr\b[^>]*>$/i.test(before) ? before.lastIndexOf("<hr") : s.index;
      return { ...s, index, textOffset: textLength(html.slice(0, index)) };
    });
  if (candidates.length === 0) return null;

  const total = textLength(html);
  const tolerance = total * 0.1;
  const caseStudy = pickBoundary(candidates, total * 0.4, tolerance);
  if (!caseStudy) return null;

  const minGap = total * 0.15;
  const demo = pickBoundary(
    candidates.filter(
      (c) =>
        c.textOffset - caseStudy.textOffset >= minGap &&
        total - c.textOffset >= minGap,
    ),
    total * 0.75,
    tolerance,
  );

  return {
    intro: html.slice(0, caseStudy.index),
    middle: html.slice(caseStudy.index, demo?.index ?? html.length),
    rest: demo ? html.slice(demo.index) : "",
    showDemoCta: demo !== undefined,
  };
}
