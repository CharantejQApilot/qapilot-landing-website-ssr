import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/constants";
import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";

/** Single sitemap entry point; nested sitemaps are listed in `sitemap-index.xml`. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "Googlebot-Image",
        disallow: [PARTNER_LOGOS_PATH_PREFIX],
      },
    ],
    sitemap: `${SITE_BASE_URL}/sitemap-index.xml`,
  };
}
