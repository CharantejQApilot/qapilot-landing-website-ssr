import type { MetadataRoute } from "next";
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

/** Dynamic robots.txt — Supabase function URLs follow `NEXT_PUBLIC_SUPABASE_URL`. */
export default function robots(): MetadataRoute.Robots {
  const sb = supabaseBase();
  const sitemaps = [
    `${SITE_BASE_URL}/sitemap-index.xml`,
    `${SITE_BASE_URL}/sitemap.xml`,
  ];
  if (sb) {
    sitemaps.push(
      `${sb}/functions/v1/sitemap-posts`,
      `${sb}/functions/v1/sitemap-news`,
      `${sb}/functions/v1/sitemap-jobs`,
    );
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: sitemaps,
  };
}
