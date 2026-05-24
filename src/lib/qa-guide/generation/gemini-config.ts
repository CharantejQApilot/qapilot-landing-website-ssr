/** Shared Gemini API settings (text + image generation use the same API key). */

export function getGeminiApiKey(): string {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return key;
}

/** Free-tier friendly default; override with GEMINI_TEXT_MODEL. */
export function getGeminiTextModel(): string {
  return process.env.GEMINI_TEXT_MODEL?.trim() || "gemini-2.0-flash";
}

export function getGeminiImageModel(): string {
  return process.env.GEMINI_IMAGE_MODEL?.trim() || "gemini-3-pro-image-preview";
}
