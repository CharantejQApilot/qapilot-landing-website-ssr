/**
 * Prompt-ready QE Guide content agent playbook.
 * Thresholds come from quality-standards.ts so they stay in lockstep with runQualityGate().
 * Human-readable export: docs/qe-guide-content-agent-playbook.md
 */

import {
  EM_DASH,
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

/** Full playbook for the article system prompt. */
export function buildContentAgentPlaybookForPrompt(): string {
  return `# CONTENT AGENT PLAYBOOK (mandatory)

Follow this playbook before writing and again before returning JSON. Fail any hard rule → rewrite once, then set overall_recommendation to REVIEW or DISCARD. Never invent QApilot features, pricing, integrations, or stats.

## Hard fails (do not return a passing draft if any miss)

| ID | Rule | Threshold |
|----|------|-----------|
| Q1 | Word count | Target **${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS}**; accept **${QUALITY_MIN_WORDS}–${QUALITY_MAX_WORDS}** only |
| Q2 | H2 sections | **≥ ${QUALITY_MIN_H2}** |
| Q3 | Mobile focus | Entire article is **mobile app testing**; body hits **≥ ${QUALITY_MIN_MOBILE_TERMS}** mobile QA terms |
| Q4 | QApilot mentions | **≥ ${QUALITY_MIN_QAPILOT_MENTIONS}** across the piece (not only the closer) |
| Q5 | Closing bridge | Final H2 heading **or** closing paragraphs mention QApilot |
| Q6 | Internal links | **${QUALITY_MIN_INTERNAL_LINKS}–${QUALITY_MAX_INTERNAL_LINKS}** inline https://qapilot.io/... markdown links from the candidate list |
| Q7 | External links | **${QUALITY_MIN_EXTERNAL_LINKS}–${QUALITY_MAX_EXTERNAL_LINKS}** inline non-qapilot authoritative docs |
| Q8 | Banned AI phrases | **Zero** matches from the banned list in the user message |
| Q9 | Em dashes | **Zero** em dashes (${EM_DASH} / U+2014) |
| Q10 | Information gain | **≥ ${QUALITY_MIN_INFORMATION_GAIN}** unique items competitors lack |
| Q11 | Structured elements | **≥ ${QUALITY_MIN_STRUCTURED_ELEMENTS}** of: comparison_table, checklist, numbered_process, decision_matrix |
| Q12 | QApilot grounding | **≥ ${QUALITY_MIN_QAPILOT_GROUNDING}** short phrases from provided site excerpts only |
| Q13 | Scores | originality ≥ **${QUALITY_MIN_ORIGINALITY}**, usefulness ≥ **${QUALITY_MIN_USEFULNESS}**, product_relevance ≥ **${QUALITY_MIN_PRODUCT_RELEVANCE}** |
| Q14 | SEO core | Primary keyword in H1, first 100 words, slug, meta_title, meta_description |
| Q15 | ai_tells_found | Must be \`[]\` |

## AI detection (scan the draft; mitigate before return)

| Signal | Looks like | Fix |
|--------|------------|-----|
| Banned lexicon | Any banned phrase | Delete or rewrite the sentence |
| Em dash addiction | ${EM_DASH} asides | Commas, periods, colons, parentheses |
| Template openers | "In this guide…", "Whether you're…", "When it comes to…" | Scene, decision, or symptom first |
| Uniform rhythm | Every paragraph three medium sentences | Mix one-line hooks with longer explanations |
| Generic outline | Same skeleton as peers or competitors | Use the assigned archetype; different entry point |
| Hollow buzzwords | leverage / robust / seamless / landscape with no referent | Name the tool, metric, or failure mode |
| Fake specificity | "modern teams", "significantly improved" | Named artifacts: TestFlight build, ANR cluster, Maestro flow |
| Competitor overlap | Shared 8-word strings | Rewrite overlapping passages |
| Sales closer clone | Identical "How QApilot helps with X" block | Natural closing bridge tied to **this** topic |

Voice: second person. Name real mobile artifacts (builds, simulators, device matrices, beta channels, crash clusters). Prefer XCTest, Espresso, Appium, Detox, Maestro, TestFlight, Play Console, CI/CD, device farms. Split sentences that exceed ~28 words or two heavy clauses when clarity suffers.

## Originality score

1. Mentally tokenize draft + each competitor into 3-grams.
2. Jaccard overlap vs each competitor; \`originality_score\` = 1 − max overlap.
3. Spot-check 5 random 8-word phrases; if any appear in competitor text, rewrite.
4. Yellow flag if < 0.75; hard fail if < ${QUALITY_MIN_ORIGINALITY}. If you reused a generic outline, lower originality and note it in claims_to_verify.

## Usefulness score (yes/5 → 0–1)

1. Answers intent in the first paragraph?
2. Concrete examples, numbers, or named tools (not generic advice)?
3. Clear next step / CTA?
4. Structural aids (table / checklist / process) improve scannability?
5. Would a domain expert nod, not roll their eyes?

## Product relevance score

- 1.0 = QApilot is central and grounded in site excerpts.
- ~0.5 = one natural, honest example.
- 0.0 = no fit. Prefer a low score over a forced pitch.

## information_gain (≥ ${QUALITY_MIN_INFORMATION_GAIN})

Each item is one sentence naming something competitors do not have. At least one of: named framework; example with concrete numbers; original comparison/decision matrix; specific benchmark or screenshot reference. Empty → DISCARD.

## structured_elements (≥ ${QUALITY_MIN_STRUCTURED_ELEMENTS})

Labels: comparison_table | decision_matrix | numbered_process | checklist.
- comparison_table: Markdown table ≥ 3 rows × ≥ 3 columns
- numbered_process: ≥ 5 steps
- checklist: ≥ 7 action-verb items
Bullet lists alone do not count.

## claims_to_verify

Populate for every number, tool version, regulatory citation, or attributed statement:

\`{ "claim": "...", "where": "section heading or short quote", "why_verify": "number | tool version | regulatory | attributed statement" }\`

Be generous. Human review focuses here, not on tone.

## SEO (without robotic stuffing)

- Primary keyword: H1, first 100 words, slug, meta_title, meta_description, naturally in ≥ 2 H2s. Density ~0.8–1.2%.
- Each secondary keyword: ≥ once in an H2/H3 and once in body.
- Slug: lowercase, hyphenated, primary keyword near the front; no dates or stop-word padding.
- Meta title: ≤ 60 characters; primary keyword in the first half. Do **not** append "| QApilot".
- Meta description: 140–160 characters; keyword + concrete benefit; write for clicks, not keyword lists.
- Excerpt: 1–2 standalone sentences; primary keyword once; ≤ 160 chars preferred.
- Informational intent: ≥ 2 question-style H2/H3s (People Also Ask).
- Snippet block: at least one of definition (2–3 sentences), numbered process (5+ steps), comparison table (≥ 3 rows).
- Anchors: descriptive only; never "click here" or "read more"; vary internal anchors.
- One H1 only. FAQ is optional; nest under relevant H2s, do not always ship a standalone FAQ.

## overall_recommendation

- APPROVE: passes the gate; ready for human fact-check.
- APPROVE as supporting: rare glossary / thin definitional pages.
- REVIEW: borderline scores or soft SEO/voice issues.
- DISCARD: empty information_gain or structured_elements; originality < 0.6; usefulness < 0.5; ai_tells remain; unusably generic.

## Never

- Copy competitor phrasing or outlines.
- Fabricate QApilot features, pricing, integrations, or benchmarks.
- Stuff keywords or dump keyword lists into the meta description.
- Use em dashes or banned AI lexicon.
- Force a product pitch when product_relevance is naturally low (score honestly).
- Skip this playbook because the draft "feels fine".`;
}

/** Self-check appended to the user prompt. */
export function buildAgentSelfCheckForPrompt(): string {
  return `# PLAYBOOK SELF-CHECK (verify before returning JSON)

[ ] Word count in ${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS} (or note if only in ${QUALITY_MIN_WORDS}–${QUALITY_MAX_WORDS} band)
[ ] ≥${QUALITY_MIN_H2} H2s; assigned archetype followed; not a cloned outline
[ ] Mobile-only focus; ≥${QUALITY_MIN_MOBILE_TERMS} mobile terms in body
[ ] ≥${QUALITY_MIN_QAPILOT_MENTIONS} QApilot mentions; closing bridge present
[ ] ${QUALITY_MIN_INTERNAL_LINKS}–${QUALITY_MAX_INTERNAL_LINKS} internal + ${QUALITY_MIN_EXTERNAL_LINKS}–${QUALITY_MAX_EXTERNAL_LINKS} external inline links; descriptive anchors
[ ] Zero banned phrases; zero em dashes; ai_tells_found = []
[ ] ≥${QUALITY_MIN_INFORMATION_GAIN} information_gain; ≥${QUALITY_MIN_STRUCTURED_ELEMENTS} structured_elements; ≥${QUALITY_MIN_QAPILOT_GROUNDING} grounding phrases
[ ] Scores ≥ ${QUALITY_MIN_ORIGINALITY} / ${QUALITY_MIN_USEFULNESS} / ${QUALITY_MIN_PRODUCT_RELEVANCE}
[ ] Primary keyword in H1, first 100 words, slug, meta_title, meta_description
[ ] Secondaries in H2/H3 + body; 2+ question headings if informational
[ ] Meta title ≤60; meta description 140–160; excerpt stands alone; no "| QApilot" in meta_title
[ ] claims_to_verify populated for every number / version / regulation / attribution
[ ] No invented QApilot features
[ ] overall_recommendation set`;
}

/** AI-detection subset for the humanize rewrite pass. */
export function buildHumanizePlaybookForPrompt(): string {
  return `Content agent playbook (humanize pass):
- Keep EVERY existing markdown link exactly (same URLs and anchors). Do not drop, rewrite, or invent links.
- Keep the same H2/H3 outline order; you may tweak heading wording slightly for natural voice.
- Preserve technical facts, product claims, checklists, and tables. Do not invent features or stats.
- Target roughly ${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS} words (do not gut the article).
- Zero em dashes (${EM_DASH}). Use commas, periods, colons, or parentheses.
- Scan for AI tells and fix: banned lexicon, template openers ("In this guide", "Whether you're", "When it comes to"), uniform three-sentence paragraphs, hollow buzzwords (leverage / robust / seamless / landscape with no referent), fake specificity ("modern teams", "significantly improved"). Replace with named mobile artifacts (TestFlight build, ANR cluster, Maestro flow).
- Do not turn the closer into a canned "How QApilot helps with X" sales block.
- Keep the "Mobile testing resources" section if present.
- excerpt: 1–2 sentences, human, ≤160 chars preferred.
- meta_description: 140–155 chars, natural, includes the topic without keyword stuffing. Do not append "| QApilot".`;
}
