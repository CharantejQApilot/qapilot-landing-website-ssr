import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/integrations/supabase/service";
import { verifyGenerationSecret } from "@/lib/admin/verify-generation-secret";
import { runGenerationPipeline } from "@/lib/qa-guide/generation/run-pipeline";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const authError = verifyGenerationSecret(request);
  if (authError) return authError;

  let body: { queue_id?: string };
  try {
    body = (await request.json()) as { queue_id?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const queueId = body.queue_id?.trim();
  if (!queueId) {
    return NextResponse.json({ error: "queue_id is required" }, { status: 400 });
  }

  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role not configured" },
      { status: 503 },
    );
  }

  const result = await runGenerationPipeline(supabase, queueId);
  if (result.ok === false) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  return NextResponse.json({ ok: true, guide_id: result.guide_id });
}
