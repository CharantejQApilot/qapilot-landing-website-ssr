const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Notifies Bing that the sitemap index may have changed.
 * Google's sitemap ping endpoint was deprecated in 2023; use Search Console
 * and robots.txt for Google. Set `SITE_BASE_URL` on the function (e.g. secrets)
 * for non-production projects; defaults to production marketing origin.
 */
function sitemapIndexUrl(): string {
  const raw = Deno.env.get('SITE_BASE_URL')?.trim() ?? 'https://qapilot.io';
  try {
    const origin = new URL(raw).origin;
    return `${origin}/sitemap-index.xml`;
  } catch {
    return 'https://qapilot.io/sitemap-index.xml';
  }
}

interface PingResult {
  service: string;
  success: boolean;
  status?: number;
  error?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const sitemapUrl = sitemapIndexUrl();
    const results: PingResult[] = [];

    console.log('Pinging Bing for sitemap:', sitemapUrl);

    try {
      const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      const bingResponse = await fetch(bingPingUrl, {
        method: 'GET',
        signal: AbortSignal.timeout(10000),
      });

      results.push({
        service: 'Bing',
        success: bingResponse.ok,
        status: bingResponse.status,
      });

      console.log('Bing ping result:', {
        status: bingResponse.status,
        ok: bingResponse.ok,
      });
    } catch (error) {
      console.error('Bing ping failed:', error);
      results.push({
        service: 'Bing',
        success: false,
        error: error.message,
      });
    }

    const allSuccessful = results.every(r => r.success);
    const responseStatus = allSuccessful ? 200 : 502;

    return new Response(
      JSON.stringify({
        message:
          'Bing sitemap ping completed. Google: submit sitemap in Search Console; ping API removed.',
        sitemapUrl,
        results,
      }),
      {
        status: responseStatus,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in sitemap ping function:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to ping Bing',
        details: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
