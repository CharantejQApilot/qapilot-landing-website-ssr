import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function siteBaseUrl(): string {
  const raw = Deno.env.get("SITE_BASE_URL")?.trim() ?? "https://qapilot.io";
  try {
    return new URL(raw).origin;
  } catch {
    return "https://qapilot.io";
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: guides, error } = await supabaseClient
      .from("qa_guides")
      .select("slug, updated_at, title")
      .eq("tier", "index_worthy")
      .eq("status", "published")
      .order("published_date", { ascending: false });

    if (error) {
      console.error("qa_guides query error:", error);
      throw new Error(error.message ?? JSON.stringify(error));
    }

    const base = siteBaseUrl();

    const urlEntries =
      guides
        ?.map(
          (guide) => `  <url>
    <loc>${base}/qa-guide/${guide.slug}</loc>
    <lastmod>${new Date(guide.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.65</priority>
  </url>`,
        )
        .join("\n") ?? "";

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

    return new Response(xmlContent, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=30, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error generating QA guides sitemap:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
