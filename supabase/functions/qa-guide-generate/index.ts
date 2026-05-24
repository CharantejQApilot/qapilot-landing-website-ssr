import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-generation-secret",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const expectedSecret = Deno.env.get("QA_GUIDE_GENERATION_SECRET")?.trim();
  const headerSecret = req.headers.get("x-generation-secret")?.trim() ?? "";
  if (!expectedSecret || headerSecret !== expectedSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let queueId: string;
  try {
    const body = (await req.json()) as { queue_id?: string };
    queueId = body.queue_id?.trim() ?? "";
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!queueId) {
    return new Response(JSON.stringify({ error: "queue_id required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const siteUrl = (Deno.env.get("SITE_BASE_URL") ?? "https://qapilot.io").replace(/\/$/, "");
  const secret = expectedSecret;

  try {
    const executeRes = await fetch(`${siteUrl}/api/internal/qa-guide-generation/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
        "x-generation-secret": secret,
      },
      body: JSON.stringify({ queue_id: queueId }),
    });

    const text = await executeRes.text();
    return new Response(text, {
      status: executeRes.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("qa-guide-generate forward error:", msg);

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (supabaseUrl && serviceKey) {
      const supabase = createClient(supabaseUrl, serviceKey);
      await supabase
        .from("qa_guide_generation_queue")
        .update({
          status: "failed",
          run_completed_at: new Date().toISOString(),
          last_error: `Worker forward failed: ${msg}`.slice(0, 4000),
        })
        .eq("id", queueId);
    }

    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
