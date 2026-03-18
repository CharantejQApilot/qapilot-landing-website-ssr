import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all published news items with images and youtube URLs
    const { data: newsItems, error } = await supabase
      .from('news_updates')
      .select('slug, updated_at, title, featured_image, youtube_url')
      .eq('published', true)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
      throw error;
    }

    // Helper to extract YouTube video ID
    const extractYouTubeId = (url: string): string | null => {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    };

    // Build URL entries
    const baseUrl = 'https://qapilot.io';
    const urlEntries = newsItems.map(item => {
      let imageTag = '';
      if (item.featured_image) {
        imageTag = '\n    <image:image>' +
          '\n      <image:loc>' + escapeXml(item.featured_image) + '</image:loc>' +
          '\n      <image:title>' + escapeXml(item.title) + '</image:title>' +
          '\n    </image:image>';
      }

      let videoTag = '';
      if (item.youtube_url) {
        const videoId = extractYouTubeId(item.youtube_url);
        if (videoId) {
          videoTag = '\n    <video:video>' +
            '\n      <video:thumbnail_loc>https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg</video:thumbnail_loc>' +
            '\n      <video:title>' + escapeXml(item.title) + '</video:title>' +
            '\n      <video:description>' + escapeXml(item.title) + '</video:description>' +
            '\n      <video:player_loc>https://www.youtube.com/embed/' + videoId + '</video:player_loc>' +
            '\n    </video:video>';
        }
      }

      return '  <url>\n' +
        '    <loc>' + baseUrl + '/news/' + item.slug + '</loc>\n' +
        '    <lastmod>' + new Date(item.updated_at).toISOString() + '</lastmod>\n' +
        '    <changefreq>weekly</changefreq>\n' +
        '    <priority>0.7</priority>' + imageTag + videoTag + '\n' +
        '  </url>';
    }).join('\n');

    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
      '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n' +
      '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n' +
      urlEntries + '\n' +
      '</urlset>';

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
