/** OpenAI API settings for QA Guide generation (article JSON + cover image). */

export function getOpenAIApiKey(): string {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return key;
}

export function getOpenAITextModel(): string {
  return process.env.OPENAI_TEXT_MODEL?.trim() || "gpt-4o";
}

export function getOpenAIImageModel(): string {
  return process.env.OPENAI_IMAGE_MODEL?.trim() || "dall-e-3";
}
