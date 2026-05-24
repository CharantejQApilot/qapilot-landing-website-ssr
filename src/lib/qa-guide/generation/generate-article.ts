import { ARTICLE_SYSTEM_PROMPT, buildArticleUserPrompt } from "@/lib/qa-guide/generation/prompts";
import { getGeminiApiKey, getGeminiTextModel } from "@/lib/qa-guide/generation/gemini-config";

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

function extractGeminiText(data: {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
}): string {
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  return parts
    .map((p) => p.text ?? "")
    .join("")
    .trim();
}

export async function generateArticle(params: {
  topic_cluster: string;
  primary_keyword: string;
  intent: string;
  secondary_keywords: string[];
  target_audience: string | null;
  competitor_texts: string[];
  qapilot_homepage: string;
  qapilot_internal_urls: string[];
  run_id: string;
}): Promise<GeneratedArticle> {
  let apiKey: string;
  let model: string;
  try {
    apiKey = getGeminiApiKey();
    model = getGeminiTextModel();
  } catch (e) {
    throw new ArticleGenerationError(e instanceof Error ? e.message : "Gemini not configured");
  }

  const userMessage = buildArticleUserPrompt({
    topic_cluster: params.topic_cluster,
    primary_keyword: params.primary_keyword,
    intent: params.intent,
    secondary_keywords: params.secondary_keywords.join(", ") || "(none)",
    target_audience: params.target_audience ?? "mobile QA / engineering leaders",
    competitor_texts:
      params.competitor_texts.length > 0
        ? params.competitor_texts.join("\n\n---\n\n")
        : "(none provided)",
    qapilot_homepage: params.qapilot_homepage || "(homepage unavailable)",
    qapilot_internal_urls:
      params.qapilot_internal_urls.length > 0
        ? params.qapilot_internal_urls.join("\n")
        : "(none — sitemap unavailable)",
    run_id: params.run_id,
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: ARTICLE_SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    }),
    signal: AbortSignal.timeout(300_000),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new ArticleGenerationError(`Gemini HTTP ${res.status}: ${detail.slice(0, 500)}`);
  }

  const data = (await res.json()) as Parameters<typeof extractGeminiText>[0];
  const rawText = extractGeminiText(data);
  if (!rawText) {
    throw new ArticleGenerationError("Gemini returned no text content");
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

export { getGeminiTextModel };
