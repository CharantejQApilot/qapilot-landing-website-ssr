const WORDS_PER_MINUTE = 200;

/** Strip HTML/markdown-ish markup for a rough word count. */
function plainTextFromContent(content: string): string {
  return content
    .replace(/<[^>]+>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/[#>*_\[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Estimated reading time in minutes (minimum 1 when content is non-empty). */
export function estimateReadingTimeMinutes(content: string | null | undefined): number | null {
  const text = plainTextFromContent(content ?? "");
  if (!text) return null;
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words === 0) return null;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTimeLabel(minutes: number): string {
  return `${minutes} min read`;
}
