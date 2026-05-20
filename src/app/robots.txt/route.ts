import { SITE_BASE_URL } from "@/lib/constants";
import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";

export const dynamic = "force-static";

function supabaseSitemapUrls(): string[] {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return [];
  try {
    const origin = new URL(raw).origin;
    return [
      `${origin}/functions/v1/sitemap-posts`,
      `${origin}/functions/v1/sitemap-news`,
      `${origin}/functions/v1/sitemap-jobs`,
      `${origin}/functions/v1/sitemap-case-studies`,
      `${origin}/functions/v1/sitemap-qa-guides`,
    ];
  } catch {
    return [];
  }
}

/**
 * Plain robots.txt (replaces \`app/robots.ts\`) so we can emit
 * [Content-Signal](https://contentsignals.org/) directives per crawler block.
 */
export function GET() {
  const sitemaps = [
    `${SITE_BASE_URL}/sitemap-index.xml`,
    `${SITE_BASE_URL}/sitemap.xml`,
    ...supabaseSitemapUrls(),
  ];

  const lines = [
    `User-agent: *`,
    `Allow: /`,
    `Disallow: /admin/`,
    `Disallow: /auth/`,
    `Disallow: /api/`,
    `Content-Signal: ai-train=no, search=yes, ai-input=no`,
    ``,
    `User-agent: Googlebot-Image`,
    `Allow: /`,
    `Disallow: ${PARTNER_LOGOS_PATH_PREFIX}`,
    `Content-Signal: ai-train=no, search=yes, ai-input=no`,
    ``,
    ...sitemaps.map((loc) => `Sitemap: ${loc}`),
    ``,
  ];

  const text = lines.join(`\n`);
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
