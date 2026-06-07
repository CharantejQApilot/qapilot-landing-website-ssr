import { SITE_BASE_URL } from "@/lib/constants";
import { escapeXml } from "@/lib/sitemap-xml";
import { publishedUrlPath } from "@/lib/qa-guide/urls";

export type QaGuideSitemapRow = {
  slug: string;
  url_path: string | null;
  updated_at: string;
  title: string;
  og_image_url: string | null;
  featured_image: string | null;
};

function canonicalGuidePath(row: QaGuideSitemapRow): string {
  const fromDb = row.url_path?.trim();
  if (fromDb?.startsWith("/")) return fromDb;
  return publishedUrlPath(row.slug);
}

export function buildQaGuidesSitemapXml(guides: QaGuideSitemapRow[]): string {
  const urlEntries = guides
    .map((guide) => {
      const imageUrl =
        (typeof guide.og_image_url === "string" && guide.og_image_url.trim()) ||
        (typeof guide.featured_image === "string" && guide.featured_image.trim()) ||
        "";
      const imageTag = imageUrl
        ? `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(guide.title)}</image:title>
    </image:image>`
        : "";
      const path = canonicalGuidePath(guide);

      return `  <url>
    <loc>${escapeXml(`${SITE_BASE_URL}${path}`)}</loc>
    <lastmod>${new Date(guide.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.65</priority>${imageTag}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;
}
