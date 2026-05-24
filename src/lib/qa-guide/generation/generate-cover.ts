import { getOpenAIApiKey, getOpenAIImageModel } from "@/lib/qa-guide/generation/openai-config";

export class CoverGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CoverGenerationError";
  }
}

export async function generateCoverImagePng(prompt: string): Promise<Uint8Array> {
  let apiKey: string;
  let model: string;
  try {
    apiKey = getOpenAIApiKey();
    model = getOpenAIImageModel();
  } catch (e) {
    throw new CoverGenerationError(
      e instanceof Error ? e.message : "OPENAI_API_KEY is not configured",
    );
  }

  const coverPrompt = `${prompt.trim()} Style: professional editorial hero image for a mobile QA engineering blog on qapilot.io. Modern, clean, no logos, no text overlays, no stock-photo clichés.`;

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt: coverPrompt,
      n: 1,
      size: model === "dall-e-3" ? "1792x1024" : "1024x1024",
      response_format: "b64_json",
    }),
    signal: AbortSignal.timeout(180_000),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new CoverGenerationError(`OpenAI HTTP ${res.status}: ${detail.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    data?: Array<{ b64_json?: string }>;
  };

  const b64 = data.data?.[0]?.b64_json;
  if (!b64) {
    throw new CoverGenerationError("OpenAI returned no image data");
  }

  return new Uint8Array(Buffer.from(b64, "base64"));
}
