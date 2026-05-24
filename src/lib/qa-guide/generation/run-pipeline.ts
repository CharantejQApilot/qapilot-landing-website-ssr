import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { createDraftQaGuide } from "@/lib/qa-guide/create-draft";
import { slugifyTitle } from "@/lib/qa-guide/cms-api";
import { uploadQaGuideCover } from "@/lib/qa-guide/upload-cover";
import { fetchCompetitorText } from "@/lib/qa-guide/generation/fetch-competitors";
import { fetchQapilotSiteContext } from "@/lib/qa-guide/generation/fetch-site-context";
import { generateArticle, getGeminiTextModel } from "@/lib/qa-guide/generation/generate-article";
import { generateCoverImagePng } from "@/lib/qa-guide/generation/generate-cover";
import {
  appendQueueLog,
  claimQueueRowForRun,
  markQueueFailed,
  markQueueGenerated,
  type QueueRow,
} from "@/lib/qa-guide/generation/queue-db";
import {
  compositeQualityScore,
  runQualityGate,
} from "@/lib/qa-guide/generation/quality-gate";

export async function runGenerationPipeline(
  supabase: SupabaseClient<Database>,
  queueId: string,
): Promise<{ ok: true; guide_id: string } | { ok: false; error: string }> {
  let item: QueueRow | null = await claimQueueRowForRun(supabase, queueId);
  if (!item) {
    return { ok: false, error: "Queue row not claimable (already running or wrong status)" };
  }

  try {
    await appendQueueLog(supabase, queueId, "pipeline started");

    const competitorUrls = [
      item.competitor_url_1,
      item.competitor_url_2,
      item.competitor_url_3,
    ].filter((u): u is string => Boolean(u?.trim()));

    const competitorTexts: string[] = [];
    for (const url of competitorUrls) {
      try {
        const text = await fetchCompetitorText(url);
        competitorTexts.push(text);
        await appendQueueLog(supabase, queueId, `fetched competitor (${text.length} chars): ${url}`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        await appendQueueLog(supabase, queueId, `competitor failed: ${url} — ${msg}`);
      }
    }

    const ctx = await fetchQapilotSiteContext();
    await appendQueueLog(
      supabase,
      queueId,
      `site context: ${ctx.homepage_text.length} chars homepage, ${ctx.internal_link_candidates.length} internal URLs`,
    );
    if (ctx.warnings.length) {
      await appendQueueLog(supabase, queueId, `warnings: ${ctx.warnings.join("; ")}`);
    }

    const runId = new Date().toISOString().slice(0, 10);
    await appendQueueLog(supabase, queueId, `calling Gemini (${getGeminiTextModel()}) for article JSON…`);

    const article = await generateArticle({
      topic_cluster: item.topic_cluster,
      primary_keyword: item.primary_keyword,
      intent: item.intent,
      secondary_keywords: item.secondary_keywords ?? [],
      target_audience: item.target_audience,
      competitor_texts: competitorTexts,
      qapilot_homepage: ctx.homepage_text,
      qapilot_internal_urls: ctx.internal_link_candidates,
      run_id: runId,
    });

    await appendQueueLog(supabase, queueId, `article generated: "${article.title}"`);

    const qc = runQualityGate(article, ctx.internal_link_candidates);
    article.quality_checks = qc;
    const recommendation = String(qc.overall_recommendation ?? "REVIEW");
    await appendQueueLog(supabase, queueId, `quality gate: ${recommendation}`);

    const slug = (article.slug?.trim() || slugifyTitle(article.title)).slice(0, 80);
    let coverUrl: string | null = null;

    if (article.image_prompt?.trim()) {
      try {
        const png = await generateCoverImagePng(article.image_prompt);
        const uploaded = await uploadQaGuideCover(supabase, png, slug);
        coverUrl = uploaded.url;
        await appendQueueLog(supabase, queueId, `cover image uploaded (${png.length} bytes)`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        await appendQueueLog(supabase, queueId, `cover image failed: ${msg}`);
      }
    }

    const guide = await createDraftQaGuide(supabase, {
      title: article.title,
      slug,
      topic_cluster: item.topic_cluster,
      intent: item.intent,
      excerpt: article.excerpt ?? article.meta_description,
      content_markdown: article.content_markdown,
      cover_image_url: coverUrl,
      tags: article.tags,
      seo: {
        meta_title: article.meta_title,
        meta_description: article.meta_description,
        primary_keyword: article.primary_keyword ?? item.primary_keyword,
        secondary_keywords:
          article.secondary_keywords ?? item.secondary_keywords ?? [],
      },
      internal_link_suggestions: article.internal_link_suggestions,
      quality_checks: qc,
      source: {
        tool: "admin-generation",
        queue_id: queueId,
        model: getGeminiTextModel(),
        provider: "gemini",
        competitor_urls: competitorUrls,
      },
    });

    const score = compositeQualityScore(qc);
    await markQueueGenerated(supabase, queueId, guide.id, qc, score, recommendation);
    await appendQueueLog(supabase, queueId, `draft created: ${guide.url_path}`);

    return { ok: true, guide_id: guide.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await appendQueueLog(supabase, queueId, `pipeline failed: ${msg}`);
    await markQueueFailed(supabase, queueId, msg);
    return { ok: false, error: msg };
  }
}

export async function triggerGenerationWorker(queueId: string): Promise<void> {
  const secret = process.env.QA_GUIDE_GENERATION_SECRET?.trim();
  if (!secret) {
    throw new Error("QA_GUIDE_GENERATION_SECRET is not configured");
  }

  if (process.env.QA_GUIDE_GENERATION_INLINE === "true") {
    const supabase = (await import("@/integrations/supabase/service")).createServiceSupabaseClient();
    if (!supabase) {
      throw new Error(
        "SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local (same Supabase project as NEXT_PUBLIC_SUPABASE_URL).",
      );
    }
    void runGenerationPipeline(supabase, queueId);
    return;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (supabaseUrl && serviceKey) {
    const edgeUrl = `${supabaseUrl}/functions/v1/qa-guide-generate`;
    void fetch(edgeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceKey}`,
        "x-generation-secret": secret,
      },
      body: JSON.stringify({ queue_id: queueId }),
    }).catch(() => {
      /* fall through to direct internal call */
    });
    return;
  }

  const siteUrl =
    process.env.SITE_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "http://localhost:3000";

  void fetch(`${siteUrl}/api/internal/qa-guide-generation/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
      "x-generation-secret": secret,
    },
    body: JSON.stringify({ queue_id: queueId }),
  }).catch(() => {
    /* fire-and-forget */
  });
}
