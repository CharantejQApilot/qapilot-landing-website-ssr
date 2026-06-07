import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { buildQaGuidesSitemapXml } from "@/lib/qa-guide/sitemap-xml";

export const revalidate = 120;

const EMPTY_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
</urlset>`;

const SITEMAP_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=30, stale-while-revalidate=30",
} as const;

/**
 * QE Guide article sitemap on the marketing origin (canonical flat `/qa-guide/:slug`
 * URLs). Co-deployed with the site so sitemap URLs cannot drift from live routes.
 */
export async function GET() {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    return new Response(EMPTY_SITEMAP, { headers: SITEMAP_HEADERS });
  }

  const { data: guides, error } = await supabase
    .from("qa_guides")
    .select("slug, url_path, updated_at, title, og_image_url, featured_image")
    .eq("tier", "index_worthy")
    .eq("status", "published")
    .order("published_date", { ascending: false });

  if (error || !guides) {
    return new Response(EMPTY_SITEMAP, { headers: SITEMAP_HEADERS });
  }

  return new Response(buildQaGuidesSitemapXml(guides), {
    headers: SITEMAP_HEADERS,
  });
}
