/** System + user prompts for QE Guide article generation. */

import { QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";

import {
  EM_DASH,
  QUALITY_MAX_EXTERNAL_LINKS,
  QUALITY_MAX_INTERNAL_LINKS,
  QUALITY_MIN_EXTERNAL_LINKS,
  QUALITY_MIN_INTERNAL_LINKS,
  QUALITY_TARGET_MAX_WORDS,
  QUALITY_TARGET_MIN_WORDS,
  bannedPhrasesForPrompt,
  buildQualityChecklistForPrompt,
} from "@/lib/qa-guide/generation/quality-standards";

export const QAPILOT_EDITORIAL_BRIEF = `
# What QApilot is (ground truth: do not invent beyond provided site text)

QApilot (qapilot.io) is an **AI-native mobile app testing platform**. Teams use it to ship mobile apps with higher confidence: autonomous / agentic test creation, intelligent bug detection, and workflows aimed at **iOS, Android, and cross-platform** stacks (including Flutter). The ${QE_GUIDE_DISPLAY_NAME} hub educates **mobile QA engineers, QE leads, release managers, and mobile engineering managers** who own quality before store releases, not generic "software quality" readers.

# Why this article exists (business purpose)

Each ${QE_GUIDE_DISPLAY_NAME} post must:
1. **Rank** for the brief's primary keyword with genuine mobile-QA depth competitors lack.
2. **Educate** the reader with actionable frameworks, checklists, and examples they can use this sprint.
3. **Connect** the topic to how a modern mobile team actually works (CI, device farms, TestFlight/Play Console, crash logs, flaky tests, regression suites).
4. **Earn trust** for QApilot by demonstrating domain expertise, then bridge honestly to capabilities **verified in the provided QApilot site excerpts** (never fabricate features, pricing, or integrations).

# Primary audience (write TO these people)

Default reader unless the brief overrides:
- **Mobile QE Lead / Staff QA**: owns test strategy, release gates, automation ROI, tool selection.
- **Mobile EM / Engineering Manager**: cares about cycle time, escaped defects, CI stability, store rejection risk.
- **SDET / automation engineer**: implements XCTest, Espresso, Appium, Detox, Maestro, or platform-specific harnesses.

Use second person ("you/your team"). Assume they ship **consumer or B2B mobile apps** (not desktop-only or pure backend). Reference real mobile artifacts: builds, binaries, simulators/emulators, device matrices, beta channels, ANRs, crash clusters, screenshot diffs, accessibility on small screens.
`;

type StructureArchetype = {
  name: string;
  outline: string;
  opener: string;
  voice: string;
};

const STRUCTURE_ARCHETYPES: StructureArchetype[] = [
  {
    name: "field-guide",
    outline:
      "4-6 H2 chapters that read like a release-week playbook. Include one comparison table OR one numbered runbook (5+ steps). Optional: 3 H3 FAQ questions under one H2 (not a separate FAQ section).",
    opener:
      "Start with a concrete release-week scene: a team, an app category, and one failure mode tied to the keyword.",
    voice: "Direct and practical. Short paragraphs. Occasional one-sentence asides.",
  },
  {
    name: "decision-playbook",
    outline:
      "Open with a decision framing H2. Follow with 2-3 H2s that map options/tradeoffs (use a table or if/then matrix). One H2 walks through a worked example on iOS or Android. Close with next steps.",
    opener:
      "Lead with the decision the reader must make this quarter (tooling, process, or coverage), not a generic overview.",
    voice: "Analytical but conversational. Prefer 'If X, then Y' over bullet dumps.",
  },
  {
    name: "troubleshooting-first",
    outline:
      "Start with symptoms (flaky CI, store rejection, crash spike). 4-5 H2s follow diagnose → isolate → fix → prevent. Use at least one checklist block (7+ items). Weave 2-3 common questions as H3s inside relevant H2s.",
    opener:
      "Open on a symptom the reader recognizes from last sprint's retro, not 'testing is important'.",
    voice: "Slightly urgent, empathetic. Write like a senior QE helping a stuck teammate.",
  },
  {
    name: "stack-deep-dive",
    outline:
      "Pick one mobile stack angle (native iOS, native Android, Flutter/RN, or cross-platform CI). 5-7 H2s go deep on that stack's tooling and failure modes. Include one code/config-adjacent example described in prose (not fenced code blocks).",
    opener:
      "Name the stack and a realistic constraint (device lab size, deadline, flaky suite) in the first two sentences.",
    voice: "Technical practitioner. Define jargon once, then move fast.",
  },
  {
    name: "audit-and-scorecard",
    outline:
      "Frame the article as an audit the reader can run today. Early H2 explains scoring criteria. Middle H2s cover 3-4 audit dimensions with pass/fail signals. Include a scorecard-style table or checklist. Closing H2: what to fix first.",
    opener:
      "Start with 'Run this audit before your next beta' or similar action, tied to the keyword.",
    voice: "Crisp, evaluative. Use specific thresholds where possible (time, pass rate, crash-free sessions).",
  },
];

function pickStructureArchetype(runId: string, primaryKeyword: string): StructureArchetype {
  const key = `${runId}:${primaryKeyword}`;
  let seed = 0;
  for (let i = 0; i < key.length; i += 1) {
    seed += key.charCodeAt(i);
  }
  return STRUCTURE_ARCHETYPES[seed % STRUCTURE_ARCHETYPES.length]!;
}

const SEO_RULES = `
# SEO (apply without making the prose robotic)

1. **Primary keyword**: H1 (\`title\`), first 100 words of \`content_markdown\`, \`slug\`, \`meta_title\`, \`meta_description\`, and naturally in 2+ H2 headings. Aim for ~0.8–1.2% density; never stuff.
2. **Secondary keywords**: Each appears at least once in an H2 or H3 and once in body copy.
3. **Slug**: Lowercase, hyphenated, primary keyword near the front; no dates or stop-word padding.
4. **Meta title**: ≤60 characters; primary keyword in the first half; readable for humans (brand suffix optional if it fits).
5. **Meta description**: 140–160 characters; include primary keyword + a concrete benefit or action; write for clicks, not keyword lists.
6. **Headings for search**: For informational intent, use 2+ question-style H2/H3 headings that match how mobile QE leads search (People Also Ask style).
7. **Snippet-friendly blocks**: Include at least one of: a tight definition paragraph (2–3 sentences), a numbered process (5+ steps), or a comparison table (≥3 rows).
8. **Link anchors**: Descriptive anchor text only; never "click here" or "read more". Vary anchors across internal links.
9. **Excerpt**: 1–2 sentences that stand alone in SERPs; include primary keyword once.
`;

const HUMAN_VOICE_RULES = `
# Human voice (avoid the "same blog template" AI tell)

1. **No em dashes**: Never use the em dash character (${EM_DASH}) in \`content_markdown\`. Use commas, periods, colons, or parentheses for asides.
2. **No template openers**: Do not start with "In this guide", "In this article", "Whether you're…", or "When it comes to…".
3. **Vary rhythm**: Mix short punchy sentences with longer ones. Not every paragraph should be 3 sentences. Some sections can open with a single-sentence hook.
4. **Unique outline**: Follow the assigned structure archetype for this run. Do not default to: intro → 5 similar H2s → FAQ block → "How QApilot helps with X" every time.
5. **Specificity over abstraction**: Name tools, artifacts, and scenarios (TestFlight build 42, Play pre-launch report, Maestro flow file) instead of generic "modern teams".
6. **Original angles**: Use competitor texts for gaps only. If three competitors all use the same outline, deliberately choose a different entry point.
7. **Peer guides**: Match quality and depth, not structure or phrasing. If peer guides all use FAQ sections, skip a standalone FAQ for this piece.
8. **Self-report**: If you reused a generic outline anyway, lower \`originality_score\` and note it in \`quality_checks.claims_to_verify\`.
`;

export const ARTICLE_SYSTEM_PROMPT = `You are the lead editorial writer for QApilot's ${QE_GUIDE_DISPLAY_NAME} (qapilot.io). You write practitioner-grade guides for **mobile app testing** teams, not shallow SEO filler.

${QAPILOT_EDITORIAL_BRIEF}

You will receive: (1) a content brief, (2) live text scraped from qapilot.io pages, (3) competitor excerpts for gap analysis only, (4) internal link candidates, (5) a **quality checklist** (same rules the server runs after you return), (6) optional peer guides from the same topic cluster, (7) a **structure archetype** unique to this run.

Output **ONLY** one strict JSON object. No preamble, no markdown fences, no commentary.

${SEO_RULES}

${HUMAN_VOICE_RULES}

# WRITING RULES

1. **Length:** \`content_markdown\` must be **${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS} words** (count before returning). If under ${QUALITY_TARGET_MIN_WORDS}, add a substantive H2 with a mobile release scenario; never pad with filler.
2. **Mobile-only focus:** Every section serves **mobile app** teams (iOS, Android, Flutter/React Native, store releases, on-device testing).
3. **Structure:** Follow the assigned **structure archetype** in the user message. Minimum 4 H2 sections total including the closing section. FAQ is optional; if used, integrate questions under relevant H2s or as a short block, not always 4–5 identical H3s.
4. **QApilot grounding:** Weave **verified** capabilities from site excerpts in **≥2 sections**. Populate \`quality_checks.qapilot_grounding\` with 3–5 short phrases from that text.
5. **Internal links:** Exactly **${QUALITY_MIN_INTERNAL_LINKS}–${QUALITY_MAX_INTERNAL_LINKS}** inline \`[anchor](https://qapilot.io/...)\` links from candidates; not fewer, not more.
6. **External links:** Exactly **${QUALITY_MIN_EXTERNAL_LINKS}–${QUALITY_MAX_EXTERNAL_LINKS}** inline \`[anchor](https://...)\` links to authoritative non-qapilot.io docs (Apple/Android developer docs, Appium, Maestro, XCTest, OWASP Mobile, etc.); not more than ${QUALITY_MAX_EXTERNAL_LINKS}. Mirror them in \`external_link_suggestions\`.
7. **Banned phrases:** Never use any phrase from the banned list in the user message. \`quality_checks.ai_tells_found\` must be \`[]\`.
8. **Information gain & structure:** Per the quality checklist in the user message.
9. **Competitors:** Do not copy phrasing; use only for gap analysis.
10. **Closing bridge:** Final H2 mentions QApilot in the heading or in the closing paragraphs (natural fit, not a canned sales section).
11. **Self-check:** Before returning JSON, verify word count, link counts, banned phrases, zero em dashes, and SEO fields against the user-message checklist.

Return EXACTLY one JSON object with fields:
title, slug, primary_keyword, secondary_keywords, meta_title, meta_description, tags, excerpt, content_markdown, image_prompt, image_alt, internal_link_suggestions, external_link_suggestions, quality_checks (overall_recommendation, information_gain, structured_elements, qapilot_grounding, mobile_specificity, originality_score, usefulness_score, product_relevance_score, claims_to_verify, ai_tells_found).`;

export function buildArticleUserPrompt(params: {
  topic_cluster: string;
  primary_keyword: string;
  intent: string;
  secondary_keywords: string;
  target_audience: string;
  editorial_notes: string;
  competitor_texts: string;
  qapilot_homepage: string;
  qapilot_brand_pages: string;
  qapilot_peer_guides: string;
  qapilot_internal_urls: string;
  run_id: string;
}): string {
  const archetype = pickStructureArchetype(params.run_id, params.primary_keyword);

  return `# CONTENT BRIEF

| Field | Value |
|-------|-------|
| Topic cluster | ${params.topic_cluster} |
| Primary keyword | ${params.primary_keyword} |
| Intent / use case | ${params.intent} |
| Secondary keywords | ${params.secondary_keywords} |
| Target audience | ${params.target_audience} |
| Editor notes | ${params.editorial_notes} |
| Run id | ${params.run_id} |

${buildQualityChecklistForPrompt()}

# STRUCTURE ARCHETYPE (mandatory for this run: ${archetype.name})

| | |
|-|-|
| Archetype | **${archetype.name}** |
| Outline | ${archetype.outline} |
| Opening | ${archetype.opener} |
| Voice | ${archetype.voice} |

Do not reuse the same outline as other ${QE_GUIDE_DISPLAY_NAME} posts. This run is locked to **${archetype.name}**.

# BANNED WORDS/PHRASES (zero tolerance in content_markdown)

${bannedPhrasesForPrompt()}

Also banned: the em dash character (${EM_DASH}). Use commas, periods, colons, or parentheses instead.

# EDITORIAL ANGLE

Cluster **${params.topic_cluster}** + intent **"${params.intent}"** + keyword **"${params.primary_keyword}"**:
- Follow the **${archetype.name}** archetype above; do not fall back to a generic intro / middle / FAQ / QApilot template.
- Map the keyword to a specific mobile release pain (store submission, regression time, flaky CI, escaped crash).
- Middle sections: repeatable workflow with mobile stack tradeoffs, shaped by the archetype (not always diagnose → prioritize → implement → measure).
- Closing: tie to **QApilot capabilities in the site excerpts below** in the final section (heading or body); avoid copy-paste closings across articles.

# COMPETITOR TEXTS (gap analysis only; do NOT copy phrasing or outline)

${params.competitor_texts}

# QAPILOT HOMEPAGE

${params.qapilot_homepage || "(homepage unavailable; rely on product pages below)"}

# QAPILOT PRODUCT & MARKETING PAGES

${params.qapilot_brand_pages}

# EXISTING ${QE_GUIDE_DISPLAY_NAME.toUpperCase()} ARTICLES IN THIS CLUSTER (tone reference; do not plagiarize or mirror structure)

${params.qapilot_peer_guides}

# INTERNAL LINK CANDIDATES (only these https://qapilot.io URLs)

${params.qapilot_internal_urls}

# EXTERNAL LINK EXAMPLES (pick 2–3 relevant ones; use inline markdown in the body)

- [Apple TestFlight](https://developer.apple.com/testflight/)
- [Android testing fundamentals](https://developer.android.com/training/testing)
- [Appium documentation](https://appium.io/docs/en/latest/)

# TASK

Write the article JSON using the **${archetype.name}** structure. **${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS} words.** **${QUALITY_MIN_INTERNAL_LINKS}–${QUALITY_MAX_INTERNAL_LINKS}** qapilot.io links and **${QUALITY_MIN_EXTERNAL_LINKS}–${QUALITY_MAX_EXTERNAL_LINKS}** external links in \`content_markdown\`. Zero em dashes. Output only JSON.`;
}
