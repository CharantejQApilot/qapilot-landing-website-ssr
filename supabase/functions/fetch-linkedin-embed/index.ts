import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || !url.includes('linkedin.com')) {
      return new Response(
        JSON.stringify({ error: 'Invalid LinkedIn URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching LinkedIn oEmbed for:', url);

    // Use LinkedIn's oEmbed API
    const oEmbedUrl = `https://www.linkedin.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    
    const response = await fetch(oEmbedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; QApilot/1.0)',
      },
    });

    if (!response.ok) {
      console.error('LinkedIn oEmbed failed:', response.status);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch LinkedIn post data',
          fallback: true 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('LinkedIn oEmbed response:', JSON.stringify(data));

    // Extract useful information from oEmbed response
    const result = {
      title: data.title || null,
      author_name: data.author_name || null,
      author_url: data.author_url || null,
      html: data.html || null,
      thumbnail_url: data.thumbnail_url || null,
      thumbnail_width: data.thumbnail_width || null,
      thumbnail_height: data.thumbnail_height || null,
      provider_name: data.provider_name || 'LinkedIn',
      type: data.type || 'rich',
    };

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-linkedin-embed:', error);
    return new Response(
      JSON.stringify({ error: error.message, fallback: true }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
