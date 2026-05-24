import type { GeneratedArticle } from "@/lib/qa-guide/generation/generate-article";
import { getOpenAIApiKey, getOpenAITextModel } from "@/lib/qa-guide/generation/openai-config";

const TARGET_MIN_WORDS = 2200;

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * One-shot expansion when the first draft is under the word-count floor.
 */
export async function expandArticleIfShort(article: GeneratedArticle): Promise<GeneratedArticle> {
  const body = article.content_markdown ?? "";
  const current = wordCount(body);
  if (current >= TARGET_MIN_WORDS) return article;

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
      temperature: 0.3,
      max_tokens: 12_288,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You expand mobile app testing articles for QApilot. Return JSON: { "content_markdown": "..." } only.
Rules:
- Keep ALL existing markdown links unchanged (internal qapilot.io and external URLs).
- Keep H2/H3 structure; add depth with new paragraphs, examples, and one extra H2 subsection if needed.
- Target ${TARGET_MIN_WORDS}–2800 words total.
- Stay mobile-app-testing specific (iOS/Android/Flutter, releases, CI, devices).
- Do not remove the "Mobile testing resources" section if present.`,
        },
        {
          role: "user",
          content: `Current word count: ${current}. Expand this article to at least ${TARGET_MIN_WORDS} words:\n\n${body}`,
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
    const parsed = JSON.parse(raw) as { content_markdown?: string };
    if (parsed.content_markdown && wordCount(parsed.content_markdown) > current) {
      return { ...article, content_markdown: parsed.content_markdown };
    }
  } catch {
    /* keep original */
  }

  return article;
}
