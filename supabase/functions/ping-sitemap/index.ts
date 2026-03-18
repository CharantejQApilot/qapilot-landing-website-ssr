const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PingResult {
  service: string;
  success: boolean;
  status?: number;
  error?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const sitemapUrl = 'https://qapilot.io/sitemap-index.xml';
    const results: PingResult[] = [];

    console.log('Starting sitemap ping for:', sitemapUrl);

    // Ping Google
    try {
      const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      console.log('Pinging Google:', googlePingUrl);
      
      const googleResponse = await fetch(googlePingUrl, {
        method: 'GET',
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      results.push({
        service: 'Google',
        success: googleResponse.ok,
        status: googleResponse.status,
      });

      console.log('Google ping result:', {
        status: googleResponse.status,
        ok: googleResponse.ok,
      });
    } catch (error) {
      console.error('Google ping failed:', error);
      results.push({
        service: 'Google',
        success: false,
        error: error.message,
      });
    }

    // Ping Bing
    try {
      const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      console.log('Pinging Bing:', bingPingUrl);
      
      const bingResponse = await fetch(bingPingUrl, {
        method: 'GET',
        signal: AbortSignal.timeout(10000), // 10 second timeout
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
    const responseStatus = allSuccessful ? 200 : 207; // 207 = Multi-Status

    console.log('Sitemap ping completed:', {
      allSuccessful,
      results,
    });

    return new Response(
      JSON.stringify({
        message: 'Sitemap ping completed',
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
        error: 'Failed to ping search engines',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
