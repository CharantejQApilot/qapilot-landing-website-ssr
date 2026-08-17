# QE Guide Content Agent Playbook

> **Purpose:** Single operating doc for agents (and editors) that draft, rewrite, score, or publish QApilot **QE Guide** articles (`/qa-guide/<slug>`).
>
> **Combines:** quality gate · AI detection & mitigation · on-page SEO.
>
> **Canonical code (keep this doc in sync when thresholds change):**
> - `src/lib/qa-guide/generation/quality-standards.ts`
> - `src/lib/qa-guide/generation/quality-gate.ts`
> - `src/lib/qa-guide/generation/prompts.ts`
> - `src/lib/qa-guide/generation/humanize-article.ts`
>
> **Audience of every article:** mobile QE leads, SDETs, mobile EMs — iOS / Android / Flutter / RN, store releases, on-device QA. Not generic “software quality” readers.

---

## 0. How to use this doc (agents)

1. Read **§1 Non-negotiables** before writing or editing.
2. Follow **§2 Pipeline order** (do not skip steps).
3. Apply **§3 AI detection & mitigation** while drafting and again after any rewrite.
4. Apply **§4 SEO checklist** before returning JSON / saving the draft.
5. Fill **§5 Quality gate scores** and set `overall_recommendation`.
6. Run **§6 Pass/fail gate** mentally (or via `runQualityGate`); list failures explicitly.
7. Hand off with **§8 Editor report** format.

If any hard fail remains after one rewrite pass: set `overall_recommendation` to `DISCARD` or `REVIEW` and stop. Do not invent product features or stats.

---

## 1. Non-negotiables (hard fails)

Fail any one → rewrite or `DISCARD` / `NEEDS_REVIEW`. Do not publish as indexable.

| ID | Rule | Threshold |
|----|------|-----------|
| Q1 | Word count | Target **2200–2800**; accept **2000–3200** only |
| Q2 | H2 sections | **≥ 4** |
| Q3 | Mobile focus | Article is about **mobile app testing**; **≥ 5** mobile QA terms (see §5.4) |
| Q4 | QApilot mentions | **≥ 3** across the piece (not only the closer) |
| Q5 | Closing bridge | Final H2 heading **or** closing ~900 chars mention QApilot |
| Q6 | Internal links | **2–3** inline `https://qapilot.io/...` markdown links |
| Q7 | External links | **2–3** inline non-qapilot authoritative docs |
| Q8 | Banned AI phrases | **Zero** matches from §3.2 |
| Q9 | Em dashes | **Zero** Unicode em dashes (`—` / U+2014) |
| Q10 | Information gain | **≥ 2** concrete unique items competitors lack |
| Q11 | Structured elements | **≥ 2** of: table, checklist, numbered process, decision matrix |
| Q12 | QApilot grounding | **≥ 3** short phrases taken from provided site excerpts (no invented features) |
| Q13 | Scores | originality ≥ **0.65**, usefulness ≥ **0.65**, product_relevance ≥ **0.60** |
| Q14 | SEO core | Primary keyword in H1, first 100 words, slug, meta_title, meta_description |
| Q15 | `ai_tells_found` | Must be `[]` before handoff |

**Publishing model (anti–scaled-content):** generation and indexation are separate. Drafts may be `noindex` until a human promotes. Never auto-index low-value stubs.

---

## 2. Pipeline order

```
brief → research (competitors + site excerpts)
     → draft (structure archetype + SEO + voice)
     → expand if short
     → humanize rewrite (preserve links & facts)
     → quality gate + scores
     → editor review (claims_to_verify)
     → publish & index (human only)
```

### 2.1 Before drafting

- Confirm topic cluster, primary keyword, intent, audience, competitor URLs.
- Fetch competitor bodies for **gap analysis only** (do not copy phrasing or outlines).
- Note 2–4 sentences: what competitors covered, what they missed, what you will do differently.
- Lock one **structure archetype** (§2.2). Do not default to intro → 5 samey H2s → FAQ → “How QApilot helps”.

### 2.2 Structure archetypes (pick one per run)

| Archetype | Outline | Opener | Voice |
|-----------|---------|--------|-------|
| **field-guide** | 4–6 H2 playbook chapters; one comparison table **or** numbered runbook (5+ steps); optional 3 H3 FAQs under one H2 | Release-week scene: team, app category, failure mode | Direct, short paragraphs |
| **decision-playbook** | Decision H2 → 2–3 tradeoff H2s (table/if-then) → worked iOS/Android example → next steps | The decision this quarter, not a generic overview | Analytical, conversational |
| **troubleshooting-first** | Symptoms → diagnose → isolate → fix → prevent; checklist (7+ items); 2–3 Qs as H3s | Symptom from last sprint’s retro | Urgent, empathetic |
| **stack-deep-dive** | One stack (iOS / Android / Flutter-RN / CI); 5–7 deep H2s; one config/code example in prose | Name stack + constraint in first two sentences | Technical practitioner |
| **audit-and-scorecard** | Scoring criteria → 3–4 audit dimensions → scorecard table/checklist → what to fix first | “Run this audit before your next beta” | Crisp, evaluative |

### 2.3 Humanize rewrite rules (mandatory second pass when using a model)

Keep: every markdown link (URL + anchor), H2/H3 order, technical facts, tables/checklists, product claims from site excerpts.

Change: rhythm, openers/closers, banned phrases, abstract filler → concrete release-week detail.

Never: invent features, stats, integrations, pricing; drop or rewrite links; gut length below target.

---

## 3. AI detection & mitigation

Goal: content that a senior mobile QE would recognize as peer writing — not chatbot template paste.

### 3.1 Detection signals (scan after every draft)

| Signal | What it looks like | Mitigation |
|--------|--------------------|------------|
| Banned lexicon | Any phrase in §3.2 | Delete or rewrite the sentence |
| Em dash addiction | `—` asides everywhere | Commas, periods, colons, parentheses |
| Template openers | “In this guide…”, “Whether you’re…”, “When it comes to…” | Scene, decision, or symptom first |
| Uniform rhythm | Every paragraph 3 medium sentences | Mix 1-line hooks with longer explanations |
| Generic outline | Same skeleton as peer guides / competitors | Switch archetype; different entry point |
| Hollow buzzwords | “leverage”, “robust”, “seamless”, “landscape” with no referent | Name the tool, metric, or failure mode |
| Fake specificity | “modern teams”, “significantly improved” | Named artifacts: TestFlight build, ANR cluster, Maestro flow |
| Competitor n-gram overlap | Shared 8-word strings / high 3-gram Jaccard | Rewrite overlapping passages |
| Sales closer clone | Identical “How QApilot helps with X” block | Natural closing bridge tied to **this** topic |

### 3.2 Banned phrases (zero tolerance)

Exact substring match (case-insensitive). `quality_checks.ai_tells_found` must be empty.

```
delve, delving, delved, testament, moreover, furthermore,
in today's fast-paced world, in the world of, in the realm of, the world of,
navigating the complexities, landscape of, ever-evolving, paradigm shift,
synergy, harness the power of, unleash, unlock, dive deep,
embark on a journey, at the end of the day, in conclusion,
it's worth noting that, it goes without saying, needless to say,
cutting-edge, state-of-the-art, revolutionize, revolutionary,
seamless, seamlessly, robust, leverage, leveraging,
as we navigate, tapestry, game-changer, holistic approach,
best practices abound, in this guide, in this article, in this post,
whether you're, whether you are, let's explore, let us explore,
without further ado, key takeaway, key takeaways, the bottom line is,
when it comes to, it's important to note, simply put
```

Also banned: the em dash character `—` (U+2014).

### 3.3 Human voice rules (positive)

1. Second person (“you / your team”).
2. Name real mobile artifacts: builds, binaries, simulators, device matrices, beta channels, crash clusters, screenshot diffs, a11y on small screens.
3. Prefer tools readers use: XCTest, Espresso, Appium, Detox, Maestro, TestFlight, Play Console, CI/CD, device farms.
4. Split sentences that exceed ~28 words or two heavy clauses when clarity suffers.
5. If you reused a generic outline anyway: lower `originality_score` and note it in `claims_to_verify`.

### 3.4 Originality method (report in quality_checks)

1. Tokenize draft + each competitor into **3-grams**.
2. Jaccard overlap vs each competitor; take **1 − max overlap** → `originality_score`.
3. Spot-check: sample **5 random 8-word phrases**; if any appear in competitor text, rewrite.
4. Yellow flag if score **&lt; 0.75**; hard fail if **&lt; 0.65**.

### 3.5 Claims to verify (always populate)

Every factual claim that can rot or hallucinate goes in `claims_to_verify`:

```json
{ "claim": "...", "where": "section heading or short quote", "why_verify": "number | tool version | regulatory | attributed statement" }
```

Be generous. Human review focuses here, not on tone.

---

## 4. SEO optimisation (on-page)

Apply without making prose robotic. Keyword placement is required; stuffing is a fail.

### 4.1 Keyword & metadata

| Field | Rule |
|-------|------|
| **Primary keyword** | In H1 (`title`), first **100 words**, `slug`, `meta_title`, `meta_description`, and naturally in **≥ 2** H2s |
| **Density** | Aim **~0.8–1.2%**; never stuff |
| **Secondary keywords** | Each appears ≥ once in an H2/H3 and once in body |
| **Slug** | Lowercase, hyphenated; primary keyword near the front; no dates or stop-word padding |
| **Meta title** | **≤ 60** characters; primary keyword in the first half; human-readable. Do **not** append `\| QApilot` yourself if the site title template already adds brand |
| **Meta description** | **140–160** characters (humanize pass targets ≤155); primary keyword + concrete benefit/action; write for clicks |
| **Excerpt** | 1–2 standalone sentences; primary keyword once; ≤160 chars preferred |
| **Question headings** | For informational intent: **≥ 2** PAA-style question H2/H3s |
| **Snippet blocks** | At least one of: tight definition (2–3 sentences), numbered process (5+ steps), comparison table (≥3 rows) |
| **Link anchors** | Descriptive only — never “click here” / “read more”; vary internal anchors |

### 4.2 Heading & body shape

- Follow the locked archetype; minimum **4** H2s including closer.
- FAQ is optional; if used, nest under relevant H2s — do not always ship a standalone 4–5 H3 FAQ.
- Short paragraphs (2–4 sentences) as the default; break for scanability.
- One H1 only (the title).

### 4.3 Links

| Type | Count | Rules |
|------|-------|-------|
| Internal (qapilot.io) | **2–3** inline | From sitemap / candidate list only; validate paths |
| External | **2–3** inline | Apple / Google / Appium / Maestro / XCTest / OWASP Mobile etc.; mirror in `external_link_suggestions` |

### 4.4 Publish / index SEO (platform)

Before **Publish & index**:

- `seo_title` and `seo_description` non-empty (DB publish constraint).
- Live URL shape: **`/qa-guide/<slug>`** (flat; not legacy `/qa-guide/<cluster>/<slug>`).
- After publish: `index,follow`, canonical matches sitemap `loc`, single H1 in HTML.
- Title in SERP/UI: one brand suffix only (`… | QApilot`), not doubled.
- Cover image recommended for social; QE guides allow text-only publish.

Ops validation script: `node scripts/validate-qa-guide-seo.mjs` (optional `--ping` for Bing).

### 4.5 Anti-patterns (SEO)

- Keyword lists in the meta description.
- Identical meta title and H1 when the H1 is already too long for SERP — shorten meta, keep H1 readable.
- Orphan pages with no hub/internal links.
- Indexing drafts under `/seo-drafts/` (must stay `noindex,nofollow` until promotion).

---

## 5. Quality gate — scores & fields

Populate `quality_checks` on every article JSON.

### 5.1 Score rubrics

**usefulness_score (0–1)** — count yes/5, convert to 0–1:

1. Answers intent in the first paragraph?
2. Concrete examples, numbers, or named tools (not generic advice)?
3. Clear next step / CTA?
4. Structural aids (table / checklist / process) improve scannability?
5. Would a domain expert nod, not roll their eyes?

**product_relevance_score (0–1):**

- **1.0** — QApilot is central to the solution narrative (still grounded in real site capabilities).
- **~0.5** — one natural, honest example.
- **0.0** — no fit. Prefer low score over forced pitch.

**originality_score:** see §3.4. Minimum **0.65**.

**Composite (informational):** `(originality + usefulness + product_relevance) / 3`.

### 5.2 information_gain (≥ 2 items)

Each item is one sentence naming something competitors do **not** have. At least one of:

- Named proprietary framework / methodology
- Specific example with concrete numbers
- Original comparison / decision matrix you constructed
- Specific benchmark, dataset, or screenshot reference

Empty → **DISCARD**.

### 5.3 structured_elements (≥ 2)

Allowed labels: `comparison_table` | `decision_matrix` | `numbered_process` | `checklist`

- Comparison table: Markdown table ≥ 3 rows × ≥ 3 columns
- Numbered process: ≥ 5 steps
- Checklist: ≥ 7 action-verb items  
Bulleted lists alone do **not** count.

### 5.4 Mobile specificity

List **≥ 6** mobile testing terms in `quality_checks.mobile_specificity`. Server gate also requires **≥ 5** hits from terms like: TestFlight, Play Console, XCTest, Espresso, Appium, Detox, Maestro, Flutter, iOS, Android, simulator, emulator, device farm, flaky, regression, beta build, App Store, Play Store, crash, ANR, mobile app, mobile testing, release, CI/CD, UITest, on-device.

### 5.5 qapilot_grounding (≥ 3)

Short quotes / paraphrases **from provided site excerpts only**. Never invent capabilities.

### 5.6 overall_recommendation

| Value | When |
|-------|------|
| `APPROVE` | Passes gate; ready for human fact-check then index |
| `APPROVE as supporting` | Rare — glossary / thin definitional pages |
| `REVIEW` | Borderline scores or soft SEO/voice issues; human must decide |
| `DISCARD` | Empty information_gain or structured_elements; originality &lt; 0.6; usefulness &lt; 0.5; ai_tells remain; unusably generic |
| `NEEDS_REVIEW` | Set by server when `runQualityGate` finds hard failures (`quality_gate_passed: false`) |

Editors may bypass gate for publish, but agents must still report failures honestly.

---

## 6. Agent self-check (run before output)

Copy and mark each item:

```
[ ] Word count in 2200–2800 (or note if only in 2000–3200 band)
[ ] ≥4 H2s; archetype followed; not a cloned outline
[ ] Mobile-only focus; ≥5 mobile terms in body
[ ] ≥3 QApilot mentions; closing bridge present
[ ] 2–3 internal + 2–3 external inline links; descriptive anchors
[ ] Zero banned phrases; zero em dashes; ai_tells_found = []
[ ] ≥2 information_gain; ≥2 structured_elements; ≥3 grounding phrases
[ ] Scores ≥ 0.65 / 0.65 / 0.60
[ ] Primary keyword in H1, first 100 words, slug, meta_title, meta_description
[ ] Secondaries in H2/H3 + body; 2+ question headings if informational
[ ] Meta title ≤60; meta description 140–160; excerpt stands alone
[ ] claims_to_verify populated for every number / version / regulation / attribution
[ ] No invented QApilot features
[ ] overall_recommendation set
```

---

## 7. Required JSON shape (generation)

Return **one** JSON object (no fences, no preamble) with at least:

```
title, slug, primary_keyword, secondary_keywords,
meta_title, meta_description, tags, excerpt, content_markdown,
image_prompt, image_alt,
internal_link_suggestions, external_link_suggestions,
quality_checks: {
  overall_recommendation,
  information_gain,          // string[]
  structured_elements,       // string[]
  qapilot_grounding,         // string[]
  mobile_specificity,        // string[]
  originality_score,         // number 0–1
  usefulness_score,          // number 0–1
  product_relevance_score,   // number 0–1
  claims_to_verify,          // {claim, where, why_verify}[]
  ai_tells_found             // must be []
}
```

Optional but useful: `originality_notes`, `usefulness_notes`, `product_relevance_notes`, `word_count`.

---

## 8. Editor / agent handoff report (≤ 200 words)

Always end a generation or review task with:

- **Title** + **slug**
- **Word count**
- **Scores:** originality / usefulness / product_relevance + `overall_recommendation`
- **Information gain:** bullets
- **Structured elements:** list
- **AI tells:** none | list remaining
- **Claims to verify:** count + “biggest risk first”
- **Draft / edit URL** if known
- **Warnings:** failed competitor fetches, score &lt; 0.75, gate failures

---

## 9. Never do

- Publish outside the approved draft → human promote path
- Skip quality gate because the draft “feels fine”
- Copy competitor phrasing or outlines
- Fabricate QApilot features, pricing, integrations, or benchmarks
- Stuff keywords or dump keyword lists into meta description
- Use em dashes or banned AI lexicon
- Force a product pitch when product_relevance is naturally low (score honestly instead)
- Index `/seo-drafts/` URLs

---

## 10. Quick reference — numeric thresholds

| Metric | Min | Max / target |
|--------|-----|--------------|
| Words (target) | 2200 | 2800 |
| Words (accept) | 2000 | 3200 |
| H2s | 4 | — |
| QApilot mentions | 3 | — |
| Internal links | 2 | 3 |
| External links | 2 | 3 |
| Mobile term hits | 5 | — |
| information_gain items | 2 | — |
| structured_elements | 2 | — |
| qapilot_grounding | 3 | — |
| originality_score | 0.65 | 1.0 |
| usefulness_score | 0.65 | 1.0 |
| product_relevance_score | 0.60 | 1.0 |
| Meta title chars | — | 60 |
| Meta description chars | 140 | 160 |
| Primary KW density | ~0.8% | ~1.2% |

---

## 11. Related docs

| Doc | Use |
|-----|-----|
| `docs/qa-guide-generation.md` | Admin queue / env / API |
| `contentpipeline/daily-task-prompt.md` | Legacy daily draft prompt (shorter word band; same philosophy) |
| `contentpipeline/README.md` | Draft vs index tiers; scaled-content rationale |
| `docs/seo-cwv-post-deploy-checklist.md` | Sitewide post-deploy SEO/CWV checks |
| `scripts/validate-qa-guide-seo.mjs` | Live sitemap + guide URL validation |

---

*Last assembled from generation quality standards, quality gate, editorial prompts, humanize pass, and content-pipeline SEO/AI-tell rules. When code constants change, update §1, §3.2, and §10 first.*
