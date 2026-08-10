/**
 * Single source of truth for generation prompts and server quality gate.
 * Keep prompt instructions and runQualityGate() in sync.
 */

export const QUALITY_MIN_WORDS = 2000;
export const QUALITY_MAX_WORDS = 3200;
export const QUALITY_TARGET_MIN_WORDS = 2200;
export const QUALITY_TARGET_MAX_WORDS = 2800;

export const QUALITY_MIN_H2 = 4;
export const QUALITY_MIN_QAPILOT_MENTIONS = 3;
export const QUALITY_MIN_INTERNAL_LINKS = 2;
export const QUALITY_MAX_INTERNAL_LINKS = 3;
export const QUALITY_MIN_EXTERNAL_LINKS = 2;
export const QUALITY_MAX_EXTERNAL_LINKS = 3;
export const QUALITY_MIN_MOBILE_TERMS = 5;
export const QUALITY_MIN_INFORMATION_GAIN = 2;
export const QUALITY_MIN_STRUCTURED_ELEMENTS = 2;
export const QUALITY_MIN_QAPILOT_GROUNDING = 3;
export const QUALITY_MIN_ORIGINALITY = 0.65;
export const QUALITY_MIN_USEFULNESS = 0.65;
export const QUALITY_MIN_PRODUCT_RELEVANCE = 0.6;

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
  "in this guide",
  "in this article",
  "in this post",
  "whether you're",
  "whether you are",
  "let's explore",
  "let us explore",
  "without further ado",
  "key takeaway",
  "key takeaways",
  "the bottom line is",
  "when it comes to",
  "it's important to note",
  "simply put",
] as const;

/** Unicode em dash (U+2014). Must not appear in generated article body. */
export const EM_DASH = "\u2014";

export function bannedPhrasesForPrompt(): string {
  return BANNED_PHRASES.join(", ");
}

export function containsEmDash(text: string): boolean {
  return text.includes(EM_DASH);
}

/** Checklist injected into the user prompt. Must match runQualityGate(). */
export function buildQualityChecklistForPrompt(): string {
  return `# QUALITY CHECKLIST (same rules the server runs after generation. Satisfy before returning JSON)

The server scores your draft against this list. Aim to pass every item; editors may still publish drafts with warnings.

| Check | Requirement |
|-------|-------------|
| Word count | **${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS}** words in \`content_markdown\` (acceptable band ${QUALITY_MIN_WORDS}–${QUALITY_MAX_WORDS}) |
| Mobile focus | Entire article about **mobile app** / **mobile app testing** (iOS, Android, Flutter/RN, store releases, on-device QA) |
| H2 sections | **≥${QUALITY_MIN_H2}** H2 sections total (follow the assigned structure archetype; do not force identical outlines across articles) |
| QApilot mentions | **≥${QUALITY_MIN_QAPILOT_MENTIONS}** mentions of QApilot across the piece (not only the last paragraph) |
| Closing bridge | Final H2 section mentions QApilot in the heading **or** in the closing paragraphs (natural, not a sales pitch) |
| Internal links | **${QUALITY_MIN_INTERNAL_LINKS}–${QUALITY_MAX_INTERNAL_LINKS}** inline \`[text](https://qapilot.io/...)\` links from the candidate list; varied anchor text |
| External links | **${QUALITY_MIN_EXTERNAL_LINKS}–${QUALITY_MAX_EXTERNAL_LINKS}** inline \`[text](https://...)\` links to authoritative non-qapilot.io docs/tools (not more than ${QUALITY_MAX_EXTERNAL_LINKS}) |
| Banned phrases | **Zero** instances of any phrase in the banned list below; \`quality_checks.ai_tells_found\` must be \`[]\` |
| Em dashes | **Zero** em dashes (. ) anywhere in \`content_markdown\`; use commas, periods, colons, or parentheses instead |
| SEO | Primary keyword in H1, first 100 words, slug, \`meta_title\`, \`meta_description\`; each secondary keyword in at least one H2/H3; 2+ question-style headings where intent is informational |
| information_gain | **≥${QUALITY_MIN_INFORMATION_GAIN}** items in \`quality_checks.information_gain\` |
| structured_elements | **≥${QUALITY_MIN_STRUCTURED_ELEMENTS}** items (tables, checklists, numbered processes) |
| qapilot_grounding | **≥${QUALITY_MIN_QAPILOT_GROUNDING}** short quotes from provided site excerpts |
| mobile_specificity | **≥6** mobile testing terms listed in \`quality_checks.mobile_specificity\` |
| Scores | \`originality_score\`, \`usefulness_score\`, \`product_relevance_score\` each **≥${QUALITY_MIN_ORIGINALITY}** if the draft is strong |

Set \`quality_checks.overall_recommendation\` to **"REVIEW"** when you meet the checklist, or **"DISCARD"** only if the draft is unusably generic (you will still self-report issues in the fields above).`;
}
