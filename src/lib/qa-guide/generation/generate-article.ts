import { ARTICLE_SYSTEM_PROMPT, buildArticleUserPrompt } from "@/lib/qa-guide/generation/prompts";
import { getOpenAIApiKey, getOpenAITextModel } from "@/lib/qa-guide/generation/openai-config";

export type GeneratedArticle = {
  title: string;
  slug: string;
  primary_keyword?: string;
  secondary_keywords?: string[];
  meta_title: string;
  meta_description: string;
  tags?: string[];
  excerpt?: string;
  content_markdown: string;
  image_prompt?: string;
  image_alt?: string;
  internal_link_suggestions?: Array<{ anchor: string; target_url: string }>;
  external_link_suggestions?: Array<{ anchor: string; target_url: string }>;
  quality_checks?: Record<string, unknown>;
};

export class ArticleGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ArticleGenerationError";
  }
}

function stripJsonFences(raw: string): string {
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\n?/, "");
    text = text.replace(/\n?```[\s\S]*$/, "");
  }
  return text.trim();
}

export async function generateArticle(params: {
  topic_cluster: string;
  primary_keyword: string;
  intent: string;
  secondary_keywords: string[];
  target_audience: string | null;
  editorial_notes: string | null;
  competitor_texts: string[];
  qapilot_homepage: string;
  qapilot_brand_pages: string;
  qapilot_peer_guides: string;
  qapilot_internal_urls: string[];
  run_id: string;
}): Promise<GeneratedArticle> {
  let apiKey: string;
  let model: string;
  try {
    apiKey = getOpenAIApiKey();
    model = getOpenAITextModel();
  } catch (e) {
    throw new ArticleGenerationError(e instanceof Error ? e.message : "OpenAI not configured");
  }

  const userMessage = buildArticleUserPrompt({
    topic_cluster: params.topic_cluster,
    primary_keyword: params.primary_keyword,
    intent: params.intent,
    secondary_keywords: params.secondary_keywords.join(", ") || "(none)",
    target_audience:
      params.target_audience ??
      "Mobile QE leads, SDETs, and engineering managers shipping iOS/Android apps",
    editorial_notes: params.editorial_notes?.trim() || "(none)",
    competitor_texts:
      params.competitor_texts.length > 0
        ? params.competitor_texts.join("\n\n---\n\n")
        : "(none provided)",
    qapilot_homepage: params.qapilot_homepage || "(homepage unavailable)",
    qapilot_brand_pages: params.qapilot_brand_pages,
    qapilot_peer_guides: params.qapilot_peer_guides,
    qapilot_internal_urls:
      params.qapilot_internal_urls.length > 0
        ? params.qapilot_internal_urls.join("\n")
        : "(none — sitemap unavailable)",
    run_id: params.run_id,
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 12_288,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: ARTICLE_SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    }),
    signal: AbortSignal.timeout(300_000),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new ArticleGenerationError(`OpenAI HTTP ${res.status}: ${detail.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };

  const rawText = data.choices?.[0]?.message?.content?.trim() ?? "";
  if (!rawText) {
    throw new ArticleGenerationError("OpenAI returned no text content");
  }

  let parsed: GeneratedArticle;
  try {
    parsed = JSON.parse(stripJsonFences(rawText)) as GeneratedArticle;
  } catch (e) {
    throw new ArticleGenerationError(
      `Article JSON parse failed: ${e instanceof Error ? e.message : "unknown"}. Start: ${rawText.slice(0, 400)}`,
    );
  }

  if (!parsed.title?.trim() || !parsed.content_markdown?.trim()) {
    throw new ArticleGenerationError("Article JSON missing title or content_markdown");
  }

  return parsed;
}

export { getOpenAITextModel };
