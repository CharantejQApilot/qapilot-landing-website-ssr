import { SITE_BASE_URL } from "@/lib/constants";

function supabaseBase(): string | null {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

/**
 * Sitemap index — Supabase Edge Function URLs use `NEXT_PUBLIC_SUPABASE_URL`
 * (deploy the same functions under `supabase/functions` on the new project).
 */
export function GET() {
  const sb = supabaseBase();
  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <sitemap>`,
    `    <loc>${SITE_BASE_URL}/sitemap.xml</loc>`,
    `  </sitemap>`,
  ];
  if (sb) {
    lines.push(
      `  <sitemap>`,
      `    <loc>${sb}/functions/v1/sitemap-posts</loc>`,
      `  </sitemap>`,
      `  <sitemap>`,
      `    <loc>${sb}/functions/v1/sitemap-news</loc>`,
      `  </sitemap>`,
      `  <sitemap>`,
      `    <loc>${sb}/functions/v1/sitemap-jobs</loc>`,
      `  </sitemap>`,
      `  <sitemap>`,
      `    <loc>${sb}/functions/v1/sitemap-case-studies</loc>`,
      `  </sitemap>`,
    );
  }
  lines.push(`</sitemapindex>`);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
    },
  });
}
