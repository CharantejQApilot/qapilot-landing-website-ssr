/** Footer “summarise QApilot” prompt — site-wide, not article-specific. */
export const SUMMARISE_QAPILOT_SITE_PROMPT =
  "Summarize QApilot in simple terms. Explain what QApilot does, how its Crawler, CoWork, and RPA capabilities help improve mobile test coverage, what makes it different from traditional testing tools, and who it is best suited for.";

export type SummariseAssistantId = "chatgpt" | "perplexity" | "google-ai" | "claude";

export type SummariseAssistantLink = {
  id: SummariseAssistantId;
  label: string;
  shortName: string;
  href: string;
  iconSrc?: string;
};

function sourceDomainFromUrl(pageUrl: string): string {
  try {
    return new URL(pageUrl).hostname.replace(/^www\./i, "");
  } catch {
    return "this site";
  }
}

/** Prompt for a single article — domain hint is a light source note, not a hard AEO ask. */
export function buildArticleSummarisePrompt(pageUrl: string): string {
  const domain = sourceDomainFromUrl(pageUrl);
  return `Visit ${pageUrl} and summarize this post for me. (${domain} is the source if you cite it later.)`;
}

type SummariseIconTone = "on-light" | "on-dark";

function simpleIcon(slug: string, tone: SummariseIconTone): string {
  const color = tone === "on-dark" ? "ffffff" : "4285F4";
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

export function buildSummariseAssistantLinks(
  prompt: string,
  options?: { iconTone?: SummariseIconTone },
): SummariseAssistantLink[] {
  const iconTone = options?.iconTone ?? "on-light";
  const encodedPrompt = encodeURIComponent(prompt);
  const googleAiSearchSummariseHref = `https://www.google.com/search?${new URLSearchParams({
    q: prompt,
    udm: "50",
  }).toString()}`;

  return [
    {
      id: "chatgpt",
      label: "Open this prompt in ChatGPT",
      shortName: "ChatGPT",
      href: `https://chatgpt.com/?q=${encodedPrompt}`,
    },
    {
      id: "perplexity",
      label: "Open this prompt in Perplexity",
      shortName: "Perplexity",
      href: `https://www.perplexity.ai/search?q=${encodedPrompt}`,
      iconSrc: simpleIcon("perplexity", iconTone),
    },
    {
      id: "google-ai",
      label: "Open this prompt in Google AI Mode (Search)",
      shortName: "Google AI",
      href: googleAiSearchSummariseHref,
      iconSrc: simpleIcon("google", iconTone),
    },
    {
      id: "claude",
      label: "Open this prompt in Claude",
      shortName: "Claude",
      href: `https://claude.ai/new?q=${encodedPrompt}`,
      iconSrc: simpleIcon("anthropic", iconTone),
    },
  ];
}
