import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/** Marketing site origin; set `SITE_BASE_URL` secret for staging/preview. */
function siteBaseUrl(): string {
  const raw = Deno.env.get('SITE_BASE_URL')?.trim() ?? 'https://qapilot.io'
  try {
    return new URL(raw).origin
  } catch {
    return 'https://qapilot.io'
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for full access
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch all published blog posts with featured images and youtube URLs
    const { data: blogs, error } = await supabaseClient
      .from('blogs')
      .select('slug, updated_at, title, featured_image, youtube_url')
      .eq('published', true)
      .order('published_date', { ascending: false })

    if (error) {
      console.error('Error fetching blogs:', error)
      throw error
    }

    // Helper to extract YouTube video ID
    const extractYouTubeId = (url: string): string | null => {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
      return match ? match[1] : null
    }

    const base = siteBaseUrl()

    // Generate XML sitemap with image and video extensions
    const urlEntries = blogs?.map(blog => {
      let imageTag = ''
      if (blog.featured_image) {
        imageTag = `
    <image:image>
      <image:loc>${escapeXml(blog.featured_image)}</image:loc>
      <image:title>${escapeXml(blog.title)}</image:title>
    </image:image>`
      }

      let videoTag = ''
      if (blog.youtube_url) {
        const videoId = extractYouTubeId(blog.youtube_url)
        if (videoId) {
          videoTag = `
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/${videoId}/maxresdefault.jpg</video:thumbnail_loc>
      <video:title>${escapeXml(blog.title)}</video:title>
      <video:description>${escapeXml(blog.title)}</video:description>
      <video:player_loc>https://www.youtube.com/embed/${videoId}</video:player_loc>
    </video:video>`
        }
      }

      return `  <url>
    <loc>${base}/blogs/${blog.slug}</loc>
    <lastmod>${new Date(blog.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>${imageTag}${videoTag}
  </url>`
    }).join('\n') || ''

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlEntries}
</urlset>`

    // Return XML with proper content-type
    return new Response(xmlContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
