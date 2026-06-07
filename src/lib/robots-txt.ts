import { SITE_BASE_URL } from "@/lib/constants";
import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";

/**
 * Paths that must not be crawled or indexed (private app surfaces, APIs, drafts).
 * Keep aligned with `PATHS` in routes.ts and page-level `robots` metadata.
 */
export const ROBOTS_DISALLOW_PATHS = [
  "/admin/",
  "/auth/",
  "/api/",
  "/seo-drafts/",
  PARTNER_LOGOS_PATH_PREFIX,
] as const;

/** Machine-readable AEO discovery files (always allow). */
export const ROBOTS_AEO_ALLOW_PATHS = [
  "/llms.txt",
  "/ai.txt",
  "/.well-known/",
  "/openapi.json",
] as const;

/**
 * Content Signals (https://contentsignals.org/) — usage preferences after access.
 * search=yes: classic search indexing and link discovery (SEO + DR tools).
 * ai-input=yes: real-time AI answers / RAG / citations (AEO).
 * ai-train=no: do not use content for model training.
 */
export const CONTENT_SIGNAL_MARKETING =
  "search=yes, ai-input=yes, ai-train=no" as const;

/** SEO crawlers and domain-rating / audit bots — explicitly welcomed. */
export const SEO_AND_DOMAIN_RATING_AGENTS = [
  "Googlebot",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "AhrefsBot",
  "SemrushBot",
  "SemrushBot-SA",
  "DotBot",
  "MJ12bot",
  "rogerbot",
  "BLEXBot",
  "DataForSeoBot",
  "SiteAuditBot",
  "VelenPublicWebCrawler",
  "Screaming Frog SEO Spider",
  "PetalBot",
  "YandexBot",
] as const;

/** AI answer-engine crawlers — allow marketing pages for citations (AEO). */
export const AEO_ANSWER_ENGINE_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "cohere-ai",
  "meta-externalagent",
  "FacebookBot",
] as const;

function supabaseSitemapUrls(): string[] {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return [];
  try {
    const origin = new URL(raw).origin;
    return [
      `${origin}/functions/v1/sitemap-posts`,
      `${origin}/functions/v1/sitemap-news`,
      `${origin}/functions/v1/sitemap-jobs`,
    ];
  } catch {
    return [];
  }
}

export function robotsSitemapUrls(): string[] {
  return [
    `${SITE_BASE_URL}/sitemap-index.xml`,
    `${SITE_BASE_URL}/sitemap.xml`,
    `${SITE_BASE_URL}/sitemap-qa-guides.xml`,
    ...supabaseSitemapUrls(),
  ];
}

function disallowLines(): string[] {
  return ROBOTS_DISALLOW_PATHS.map((path) => `Disallow: ${path}`);
}

function aeoAllowLines(): string[] {
  return ROBOTS_AEO_ALLOW_PATHS.map((path) => `Allow: ${path}`);
}

function crawlerGroup(userAgent: string, extraLines: string[] = []): string[] {
  return [
    `User-agent: ${userAgent}`,
    "Allow: /",
    ...aeoAllowLines(),
    ...disallowLines(),
    `Content-Signal: ${CONTENT_SIGNAL_MARKETING}`,
    ...extraLines,
    "",
  ];
}

const CONTENT_SIGNAL_PREAMBLE = [
  "# QApilot marketing site — https://qapilot.io",
  "# Sitemap index: /sitemap-index.xml",
  "# AEO context: /llms.txt · /ai.txt · /.well-known/agent-skills/",
  "#",
  "# Content Signals (https://contentsignals.org/):",
  "#   search=yes   — search indexes, SEO audits, domain-rating crawlers",
  "#   ai-input=yes — AI answer engines may use pages for citations / RAG",
  "#   ai-train=no  — do not use content for model training",
  "",
];

/**
 * Plain-text robots.txt for /robots.txt (route handler).
 * Uses Content-Signal groups so SEO, DR tools, and AEO crawlers are invited on public pages.
 */
export function buildRobotsTxt(): string {
  const lines: string[] = [
    ...CONTENT_SIGNAL_PREAMBLE,
    ...crawlerGroup("*"),
    "User-agent: Googlebot-Image",
    "Allow: /",
    `Disallow: ${PARTNER_LOGOS_PATH_PREFIX}`,
    `Content-Signal: ${CONTENT_SIGNAL_MARKETING}`,
    "",
    "# SEO & domain-rating crawlers (explicit welcome)",
    ...SEO_AND_DOMAIN_RATING_AGENTS.flatMap((agent) =>
      agent === "Googlebot"
        ? []
        : crawlerGroup(agent),
    ),
    "# AI answer-engine crawlers (AEO — citations, not training)",
    ...AEO_ANSWER_ENGINE_AGENTS.map((agent) => crawlerGroup(agent)).flat(),
    "# Sitemaps",
    ...robotsSitemapUrls().map((loc) => `Sitemap: ${loc}`),
    "",
  ];

  return lines.join("\n");
}
