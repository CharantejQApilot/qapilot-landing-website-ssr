import type { GeneratedArticle } from "@/lib/qa-guide/generation/generate-article";
import { getOpenAIApiKey, getOpenAITextModel } from "@/lib/qa-guide/generation/openai-config";
import {
  EM_DASH,
  QUALITY_TARGET_MAX_WORDS,
  QUALITY_TARGET_MIN_WORDS,
  bannedPhrasesForPrompt,
} from "@/lib/qa-guide/generation/quality-standards";

function stripJsonFences(raw: string): string {
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\n?/, "");
    text = text.replace(/\n?```[\s\S]*$/, "");
  }
  return text.trim();
}

/**
 * Second model pass: rewrite the draft so it reads less like generic LLM output
 * while preserving structure, facts, and all markdown links.
 */
export async function humanizeArticle(article: GeneratedArticle): Promise<GeneratedArticle> {
  const body = article.content_markdown ?? "";
  if (!body.trim()) return article;

  const apiKey = getOpenAIApiKey();
  const model = getOpenAITextModel();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.55,
      max_tokens: 12_288,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a senior mobile QE editor rewriting a draft so it sounds like a practitioner wrote it, not a chatbot.

Return JSON only: { "content_markdown": "...", "excerpt": "...", "meta_description": "..." }

Hard rules:
- Keep EVERY existing markdown link exactly (same URLs and anchors). Do not drop, rewrite, or invent links.
- Keep the same H2/H3 outline order; you may tweak heading wording slightly for natural voice.
- Preserve technical facts, product claims, checklists, and tables. Do not invent features or stats.
- Target roughly ${QUALITY_TARGET_MIN_WORDS}–${QUALITY_TARGET_MAX_WORDS} words (do not gut the article).
- Zero em dashes (${EM_DASH}). Use commas, periods, colons, or parentheses.
- Remove these banned phrases if present: ${bannedPhrasesForPrompt()}.
- Vary sentence length. Prefer concrete release-week detail over abstract filler.
- Cut stock AI openers/closers ("In today's fast-paced…", "In conclusion…", "It's important to note…", "delve", "landscape", "leverage" as empty buzzwords).
- Keep the "Mobile testing resources" section if present.
- excerpt: 1–2 sentences, human, ≤160 chars preferred.
- meta_description: ≤155 chars, natural, includes the topic without keyword stuffing.`,
        },
        {
          role: "user",
          content: `Rewrite this QE Guide draft for a more human, practitioner voice.

Title: ${article.title}
Primary keyword: ${article.primary_keyword ?? "(unknown)"}

Draft markdown:
${body}`,
        },
      ],
    }),
    signal: AbortSignal.timeout(300_000),
  });

  if (!res.ok) {
    return article;
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };
  const raw = data.choices?.[0]?.message?.content?.trim();
  if (!raw) return article;

  try {
    const parsed = JSON.parse(stripJsonFences(raw)) as {
      content_markdown?: string;
      excerpt?: string;
      meta_description?: string;
    };
    if (!parsed.content_markdown?.trim()) return article;

    return {
      ...article,
      content_markdown: parsed.content_markdown,
      ...(parsed.excerpt?.trim() ? { excerpt: parsed.excerpt.trim() } : {}),
      ...(parsed.meta_description?.trim()
        ? { meta_description: parsed.meta_description.trim() }
        : {}),
    };
  } catch {
    return article;
  }
}
