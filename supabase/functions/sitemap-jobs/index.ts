import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Fetch all published job openings with slugs
    const { data: jobs, error: jobsError } = await supabaseClient
      .from('job_openings')
      .select('slug, updated_at, organization_id')
      .eq('published', true)
      .not('slug', 'is', null)
      .order('created_at', { ascending: false })

    if (jobsError) {
      console.error('Error fetching jobs:', jobsError)
      throw jobsError
    }

    // Fetch organizations for backlink info
    const { data: organizations, error: orgsError } = await supabaseClient
      .from('job_organizations')
      .select('id, name, website_url')

    if (orgsError) {
      console.error('Error fetching organizations:', orgsError)
      throw orgsError
    }

    // Create a map of org IDs to website URLs
    const orgMap = new Map(organizations?.map(org => [org.id, org.website_url]) || [])

    // Generate XML sitemap with job entries
    const urlEntries = jobs?.map(job => {
      const orgWebsite = job.organization_id ? orgMap.get(job.organization_id) : null
      
      // Base URL entry
      let entry = `  <url>
    <loc>https://qapilot.io/careers/${job.slug}</loc>
    <lastmod>${new Date(job.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`

      return entry
    }).join('\n') || ''

    // Also include backlinks for partner organizations
    const backlinkEntries = jobs
      ?.filter(job => job.organization_id && orgMap.get(job.organization_id))
      .map(job => {
        const orgWebsite = orgMap.get(job.organization_id!)
        return `  <!-- Partner backlink for job: ${job.slug} -->
  <!-- Partner website: ${orgWebsite} -->`
      })
      .join('\n') || ''

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

    // Return XML with proper content-type
    return new Response(xmlContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating jobs sitemap:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
