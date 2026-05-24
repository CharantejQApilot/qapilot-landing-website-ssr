# BRIEF FOR THIS ARTICLE

- **Topic cluster:** {topic_cluster}
- **Primary keyword:** {primary_keyword}
- **Intent / use case:** {intent}
- **Secondary keywords:** {secondary_keywords}
- **Target audience:** {target_audience}
- **Run id (today's date):** {run_id}

# COMPETITOR TEXTS (read for context; DO NOT copy phrasing)

These are recent competitor articles on adjacent topics. Note what they covered well, what they missed, and where you can offer a distinct angle. Look at their H2 structure — your H2s should NOT mirror theirs.

{competitor_texts}

# QAPILOT HOMEPAGE TEXT (your single source of truth for product capabilities)

Use ONLY capabilities, frameworks, and integrations mentioned in this homepage text when writing the article and the closing-bridge section. Do not invent capabilities not present here.

{qapilot_homepage}

# INTERNAL LINK CANDIDATES (use ONLY these URLs for internal_link_suggestions)

The following URLs exist on qapilot.io today. Every `internal_link_suggestions[*].target_url` you output MUST be on this list. If the list is empty, return `internal_link_suggestions: []`.

{qapilot_internal_urls}

# YOUR TASK

Following the rules in the system prompt, generate the article as a single JSON object. The `content_markdown` field must:

1. Open with an H1 containing the primary keyword.
2. Hook the reader in the first paragraph by directly answering the stated intent. No "in today's fast-paced world" preambles.
3. Have 4–7 H2 sections covering distinct sub-topics.
4. Include at least one comparison table / decision matrix / ≥5-step numbered process / ≥7-item checklist (your choice — pick what fits).
5. Include at least one named example that uses a QApilot capability from the homepage text above.
6. End with a 3–5 question FAQ section.
7. End with a MANDATORY final H2 closing-bridge section titled "How QApilot fits" (or equivalent) that:
   - Names at least one homepage-verified QApilot capability
   - Connects to concrete specifics from the article above
   - Includes 1–2 markdown links to URLs from the internal link candidates list
   - Is 100–250 words
   - Does not read like a sales pitch

Output only the JSON object. No code fences, no prose around it.
