const USER_AGENT = "qapilot-content-automation/1.0 (+https://qapilot.io)";

export class GenerationFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GenerationFetchError";
  }
}

function stripHtmlToText(html: string): string {
  let cleaned = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  cleaned = cleaned.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const parts = cleaned.match(/<(?:p|li|h[1-6])\b[^>]*>([\s\S]*?)<\/(?:p|li|h[1-6])>/gi) ?? [];
  const text = parts
    .map((block) => block.replace(/<[^>]+>/g, " "))
    .join("\n")
    .replace(/\s+\n/g, "\n")
    .trim();
  if (text.length > 200) return text.slice(0, 8000);
  const fallback = cleaned.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return fallback.slice(0, 8000);
}

export async function fetchCompetitorText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    throw new GenerationFetchError(`competitor ${url} returned HTTP ${res.status}`);
  }
  const html = await res.text();
  const text = stripHtmlToText(html);
  if (text.length < 100) {
    throw new GenerationFetchError(`competitor ${url}: extracted text too short`);
  }
  return text;
}

export async function fetchCompetitorTexts(urls: string[]): Promise<string[]> {
  const texts: string[] = [];
  for (const url of urls) {
    if (!url?.trim()) continue;
    try {
      texts.push(await fetchCompetitorText(url.trim()));
    } catch {
      // caller logs failures
    }
  }
  return texts;
}
