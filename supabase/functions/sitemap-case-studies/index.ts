import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function siteBaseUrl(): string {
  const raw = Deno.env.get('SITE_BASE_URL')?.trim() ?? 'https://qapilot.io';
  try {
    return new URL(raw).origin;
  } catch {
    return 'https://qapilot.io';
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: caseStudies, error } = await supabase
      .from('case_studies')
      .select('slug, updated_at, title, featured_image, youtube_url')
      .eq('published', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    const baseUrl = siteBaseUrl();
    const entries = (caseStudies ?? [])
      .map((item) => {
        const imageTag = item.featured_image
          ? '\n    <image:image>' +
            '\n      <image:loc>' +
            escapeXml(item.featured_image) +
            '</image:loc>' +
            '\n      <image:title>' +
            escapeXml(item.title) +
            '</image:title>' +
            '\n    </image:image>'
          : '';

        const videoTag = buildYouTubeVideoTag(item.youtube_url, item.title);

        return (
          '  <url>\n' +
          '    <loc>' +
          baseUrl +
          '/case-studies/' +
          item.slug +
          '</loc>\n' +
          '    <lastmod>' +
          new Date(item.updated_at).toISOString() +
          '</lastmod>\n' +
          '    <changefreq>weekly</changefreq>\n' +
          '    <priority>0.7</priority>' +
          imageTag +
          videoTag +
          '\n  </url>'
        );
      })
      .join('\n');

    const xml =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
      '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n' +
      '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n' +
      entries +
      '\n</urlset>';

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    console.error('Error generating case studies sitemap:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function buildYouTubeVideoTag(url: string | null, title: string): string {
  if (!url) return '';
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  );
  if (!match) return '';
  const id = match[1];
  return (
    '\n    <video:video>' +
    '\n      <video:thumbnail_loc>https://img.youtube.com/vi/' +
    id +
    '/maxresdefault.jpg</video:thumbnail_loc>' +
    '\n      <video:title>' +
    escapeXml(title) +
    '</video:title>' +
    '\n      <video:description>' +
    escapeXml(title) +
    '</video:description>' +
    '\n      <video:player_loc>https://www.youtube.com/embed/' +
    id +
    '</video:player_loc>' +
    '\n    </video:video>'
  );
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
