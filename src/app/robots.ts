import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/constants";
import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";

/** Edge sitemap URLs when `NEXT_PUBLIC_SUPABASE_URL` is set (same logic as `sitemap-index.xml/route.ts`). */
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

/**
 * Single robots.txt for all crawlers. Do not add `public/robots.txt` — Next.js would conflict.
 * Child sitemaps for CMS content are listed in `/sitemap-index.xml` (and duplicated here when env is set).
 */
export default function robots(): MetadataRoute.Robots {
  const sitemaps = [
    `${SITE_BASE_URL}/sitemap-index.xml`,
    `${SITE_BASE_URL}/sitemap.xml`,
    ...supabaseSitemapUrls(),
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/auth/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: [PARTNER_LOGOS_PATH_PREFIX],
      },
    ],
    sitemap: sitemaps,
  };
}
