const QUESTION_START =
  /^(what|how|why|when|where|who|which)\b/i;

/** One sentence under a question-shaped guide title. Restates claims already in that article. */
const TITLE_ANSWERS: Record<string, string> = {
  "regression-testing":
    "Regression testing checks that a new change does not break behavior that already worked.",
  "testing-types-in-mobile-app-development":
    "Mobile app testing types include unit, integration, system, UI, regression, performance, security, usability, and compatibility testing.",
  "behaviour-driven-development":
    "Behaviour-driven development writes mobile tests in plain-language scenarios that describe the user outcome before the implementation.",
};

export function isQuestionHeading(text: string): boolean {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return false;
  return normalized.endsWith("?") || QUESTION_START.test(normalized);
}

export function guideTitleDirectAnswer(
  slug: string,
  title: string,
): string | null {
  if (!isQuestionHeading(title)) return null;
  return TITLE_ANSWERS[slug] ?? null;
}

function stripTags(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * If a question heading is followed by a multi-sentence paragraph, lift the
 * first sentence into its own paragraph so it sits immediately under the heading.
 */
export function promoteDirectAnswers(html: string): string {
  const headingRe = /<h([2-4])\b[^>]*>[\s\S]*?<\/h\1>/gi;
  let out = "";
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = headingRe.exec(html)) !== null) {
    const start = match.index;
    const headingEnd = start + match[0].length;
    out += html.slice(last, headingEnd);

    const paragraph = html
      .slice(headingEnd)
      .match(/^\s*<p\b([^>]*)>([\s\S]*?)<\/p>/i);
    if (!paragraph || !isQuestionHeading(stripTags(match[0]))) {
      last = headingEnd;
      continue;
    }

    const split = splitFirstSentence(paragraph[2]);
    if (!split) {
      last = headingEnd;
      continue;
    }

    out += `<p${paragraph[1]}>${split.lead}</p><p${paragraph[1]}>${split.rest}</p>`;
    last = headingEnd + paragraph[0].length;
  }

  return out + html.slice(last);
}

function splitFirstSentence(
  innerHtml: string,
): { lead: string; rest: string } | null {
  const textChars: { htmlIndex: number; ch: string }[] = [];
  for (let i = 0; i < innerHtml.length; i++) {
    if (innerHtml[i] !== "<") {
      textChars.push({ htmlIndex: i, ch: innerHtml[i] });
      continue;
    }
    const end = innerHtml.indexOf(">", i);
    if (end === -1) return null;
    i = end;
  }

  const raw = textChars.map((entry) => entry.ch).join("");
  const match = raw.match(/^([\s\S]*?[.!?])(\s+)(.)/);
  if (!match) return null;
  const nextChar = match[3];
  if (
    nextChar.toUpperCase() === nextChar.toLowerCase() ||
    nextChar !== nextChar.toUpperCase()
  ) {
    return null;
  }

  const leadText = stripTags(match[1]);
  const words = leadText.split(/\s+/).filter(Boolean);
  if (words.length < 4 || words.length > 32) return null;

  const restPlain = raw.slice(match[1].length).trim();
  if (restPlain.length < 8) return null;

  const leadEndHtml = textChars[match[1].length - 1].htmlIndex + 1;
  const restStartHtml = textChars[match[1].length + match[2].length].htmlIndex;
  return {
    lead: innerHtml.slice(0, leadEndHtml),
    rest: innerHtml.slice(restStartHtml),
  };
}
