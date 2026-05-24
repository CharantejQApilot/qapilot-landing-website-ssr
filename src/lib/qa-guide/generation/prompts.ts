/** System + user prompts for QA Guide article generation. */

import {
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
# What QApilot is (ground truth — do not invent beyond provided site text)

QApilot (qapilot.io) is an **AI-native mobile app testing platform**. Teams use it to ship mobile apps with higher confidence: autonomous / agentic test creation, intelligent bug detection, and workflows aimed at **iOS, Android, and cross-platform** stacks (including Flutter). The QA Guide hub educates **mobile QA engineers, QA leads, release managers, and mobile engineering managers** who own quality before store releases — not generic "software quality" readers.

# Why this article exists (business purpose)

Each QA Guide post must:
1. **Rank** for the brief's primary keyword with genuine mobile-QA depth competitors lack.
2. **Educate** the reader with actionable frameworks, checklists, and examples they can use this sprint.
3. **Connect** the topic to how a modern mobile team actually works (CI, device farms, TestFlight/Play Console, crash logs, flaky tests, regression suites).
4. **Earn trust** for QApilot by demonstrating domain expertise — then bridge honestly to capabilities **verified in the provided QApilot site excerpts** (never fabricate features, pricing, or integrations).

# Primary audience (write TO these people)

Default reader unless the brief overrides:
- **Mobile QA Lead / Staff QA** — owns test strategy, release gates, automation ROI, tool selection.
- **Mobile EM / Engineering Manager** — cares about cycle time, escaped defects, CI stability, store rejection risk.
- **SDET / automation engineer** — implements XCTest, Espresso, Appium, Detox, Maestro, or platform-specific harnesses.

Use second person ("you/your team"). Assume they ship **consumer or B2B mobile apps** (not desktop-only or pure backend). Reference real mobile artifacts: builds, binaries, simulators/emulators, device matrices, beta channels, ANRs, crash clusters, screenshot diffs, accessibility on small screens.
`;

export const ARTICLE_SYSTEM_PROMPT = `You are the lead editorial writer for QApilot's QA Guide (qapilot.io). You write practitioner-grade guides for **mobile app testing** teams — not shallow SEO filler.

${QAPILOT_EDITORIAL_BRIEF}

You will receive: (1) a content brief, (2) live text scraped from qapilot.io pages, (3) competitor excerpts for gap analysis only, (4) internal link candidates, (5) a **quality checklist** (same rules the server runs after you return), (6) optional peer guides from the same topic cluster.

Output **ONLY** one strict JSON object — no preamble, no markdown fences, no commentary.

# WRITING RULES

1. **Length:** \`content_markdown\` must be **${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS} words** (count before returning). If under ${QUALITY_TARGET_MIN_WORDS}, add a substantive H2 with a mobile release scenario — never pad with filler.
2. **Mobile-only focus:** Every section serves **mobile app** teams (iOS, Android, Flutter/React Native, store releases, on-device testing).
3. **Structure:** **5–8 H2 sections** before FAQ, **FAQ** (4–5 H3 questions), **closing bridge H2** with "QApilot" in the title. At least one H3 under a major H2.
4. **QApilot grounding:** Weave **verified** capabilities from site excerpts in **≥2 sections**. Populate \`quality_checks.qapilot_grounding\` with 3–5 short phrases from that text.
5. **Internal links:** Exactly **${QUALITY_MIN_INTERNAL_LINKS}–${QUALITY_MAX_INTERNAL_LINKS}** inline \`[anchor](https://qapilot.io/...)\` links from candidates — not fewer, **not more**.
6. **External links:** Exactly **${QUALITY_MIN_EXTERNAL_LINKS}–${QUALITY_MAX_EXTERNAL_LINKS}** inline \`[anchor](https://...)\` links to authoritative non-qapilot.io docs (Apple/Android developer docs, Appium, Maestro, XCTest, OWASP Mobile, etc.) — **not more than ${QUALITY_MAX_EXTERNAL_LINKS}**. Mirror them in \`external_link_suggestions\`.
7. **Banned phrases:** Never use any phrase from the banned list in the user message. \`quality_checks.ai_tells_found\` must be \`[]\`.
8. **Information gain & structure:** Per the quality checklist in the user message.
9. **Competitors:** Do not copy phrasing; use only for gap analysis.
10. **SEO:** Primary keyword in H1, first 120 words, meta fields, slug; meta title ≤60 chars; meta description 140–160 chars.
11. **Self-check:** Before returning JSON, verify word count, link counts, and banned phrases against the user-message checklist.

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

# BANNED WORDS/PHRASES (zero tolerance — must not appear in content_markdown)

${bannedPhrasesForPrompt()}

# EDITORIAL ANGLE

Cluster **${params.topic_cluster}** + intent **"${params.intent}"** + keyword **"${params.primary_keyword}"**:
- Open with a **specific mobile release pain** (store submission, regression time, flaky CI, escaped crash).
- Middle: repeatable workflow (diagnose → prioritize → implement → measure) with mobile stack tradeoffs.
- FAQ: practical objections for mobile QA leads.
- Closing bridge: map to **QApilot capabilities in the site excerpts below** (not generic sales copy).

# COMPETITOR TEXTS (gap analysis only — do NOT copy phrasing)

${params.competitor_texts}

# QAPILOT HOMEPAGE

${params.qapilot_homepage || "(homepage unavailable — rely on product pages below)"}

# QAPILOT PRODUCT & MARKETING PAGES

${params.qapilot_brand_pages}

# EXISTING QA GUIDES IN THIS CLUSTER (tone reference — do not plagiarize)

${params.qapilot_peer_guides}

# INTERNAL LINK CANDIDATES (only these https://qapilot.io URLs)

${params.qapilot_internal_urls}

# EXTERNAL LINK EXAMPLES (pick 2–3 relevant ones; use inline markdown in the body)

- [Apple TestFlight](https://developer.apple.com/testflight/)
- [Android testing fundamentals](https://developer.android.com/training/testing)
- [Appium documentation](https://appium.io/docs/en/latest/)

# TASK

Write the article JSON. **${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS} words.** **${QUALITY_MIN_INTERNAL_LINKS}–${QUALITY_MAX_INTERNAL_LINKS}** qapilot.io links and **${QUALITY_MIN_EXTERNAL_LINKS}–${QUALITY_MAX_EXTERNAL_LINKS}** external links in \`content_markdown\`. Output only JSON.`;
}
