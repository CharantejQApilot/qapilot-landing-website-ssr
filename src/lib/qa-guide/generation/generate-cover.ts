import { getGeminiApiKey, getGeminiImageModel } from "@/lib/qa-guide/generation/gemini-config";

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
    apiKey = getGeminiApiKey();
    model = getGeminiImageModel();
  } catch (e) {
    throw new CoverGenerationError(
      e instanceof Error ? e.message : "GEMINI_API_KEY is not configured",
    );
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
    }),
    signal: AbortSignal.timeout(180_000),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new CoverGenerationError(`Gemini HTTP ${res.status}: ${detail.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ inlineData?: { data?: string }; inline_data?: { data?: string } }> };
    }>;
  };

  const parts = data.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    const inline = part.inlineData ?? part.inline_data;
    if (inline?.data) {
      const binary = Buffer.from(inline.data, "base64");
      return new Uint8Array(binary);
    }
  }

  throw new CoverGenerationError("Gemini returned no inline image data");
}
