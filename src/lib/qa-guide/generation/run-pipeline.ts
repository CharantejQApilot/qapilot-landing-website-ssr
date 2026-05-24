import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { createDraftQaGuide } from "@/lib/qa-guide/create-draft";
import { slugifyTitle } from "@/lib/qa-guide/cms-api";
import { uploadQaGuideCover } from "@/lib/qa-guide/upload-cover";
import { fetchCompetitorText } from "@/lib/qa-guide/generation/fetch-competitors";
import {
  fetchQapilotSiteContext,
  formatBrandPagesForPrompt,
} from "@/lib/qa-guide/generation/fetch-site-context";
import { expandArticleIfShort } from "@/lib/qa-guide/generation/expand-article-if-short";
import { ensureArticleLinks } from "@/lib/qa-guide/generation/ensure-article-links";
import { generateArticle, getOpenAITextModel } from "@/lib/qa-guide/generation/generate-article";
import { generateCoverImagePng } from "@/lib/qa-guide/generation/generate-cover";
import {
  appendQueueLog,
  loadQueueRowForPipeline,
  markQueueFailed,
  markQueueGenerated,
  type QueueRow,
} from "@/lib/qa-guide/generation/queue-db";
import { compositeQualityScore, runQualityGate } from "@/lib/qa-guide/generation/quality-gate";

export async function runGenerationPipeline(
  supabase: SupabaseClient<Database>,
  queueId: string,
): Promise<
  | { ok: true; guide_id: string; quality_recommendation: string; quality_warnings: string[] }
  | { ok: false; error: string }
> {
  const item: QueueRow | null = await loadQueueRowForPipeline(supabase, queueId);
  if (!item) {
    return {
      ok: false,
      error: "Could not load this brief for generation. Refresh and try Run again.",
    };
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

    const ctx = await fetchQapilotSiteContext(item.topic_cluster);
    await appendQueueLog(
      supabase,
      queueId,
      `site context: homepage ${ctx.homepage_text.length} chars, ${ctx.brand_pages.length} product pages, ${ctx.peer_guide_excerpts.length} peer guides, ${ctx.internal_link_candidates.length} link candidates`,
    );

    const runId = new Date().toISOString().slice(0, 10);
    await appendQueueLog(supabase, queueId, `calling OpenAI (${getOpenAITextModel()}) for article JSON…`);

    const article = await generateArticle({
      topic_cluster: item.topic_cluster,
      primary_keyword: item.primary_keyword,
      intent: item.intent,
      secondary_keywords: item.secondary_keywords ?? [],
      target_audience: item.target_audience,
      editorial_notes: item.notes,
      competitor_texts: competitorTexts,
      qapilot_homepage: ctx.homepage_text,
      qapilot_brand_pages: formatBrandPagesForPrompt(ctx.brand_pages),
      qapilot_peer_guides: formatBrandPagesForPrompt(ctx.peer_guide_excerpts),
      qapilot_internal_urls: ctx.internal_link_candidates,
      run_id: runId,
    });

    await appendQueueLog(supabase, queueId, `article generated: "${article.title}"`);

    let enriched = ensureArticleLinks(article, {
      topic_cluster: item.topic_cluster,
      primary_keyword: item.primary_keyword,
      intent: item.intent,
      internal_link_candidates: ctx.internal_link_candidates,
    });
    await appendQueueLog(supabase, queueId, "injected internal/external links if missing");

    enriched = await expandArticleIfShort(enriched);
    const expandedWords = (enriched.content_markdown ?? "").split(/\s+/).filter(Boolean).length;
    await appendQueueLog(supabase, queueId, `word count after expand pass: ${expandedWords}`);

    const qc = runQualityGate(enriched, ctx.internal_link_candidates);
    enriched.quality_checks = qc;
    const recommendation = String(qc.overall_recommendation ?? "REVIEW");
    const warnings = Array.isArray(qc.server_side_failures)
      ? (qc.server_side_failures as string[])
      : [];
    await appendQueueLog(supabase, queueId, `quality gate: ${recommendation}`);
    if (warnings.length > 0) {
      await appendQueueLog(
        supabase,
        queueId,
        `quality warnings (draft saved — review before publish): ${warnings.join("; ")}`,
      );
    }

    const slug = (enriched.slug?.trim() || slugifyTitle(enriched.title)).slice(0, 80);
    let coverUrl: string | null = null;

    if (enriched.image_prompt?.trim()) {
      try {
        const png = await generateCoverImagePng(enriched.image_prompt);
        const uploaded = await uploadQaGuideCover(supabase, png, slug);
        coverUrl = uploaded.url;
        await appendQueueLog(supabase, queueId, `cover image uploaded (${png.length} bytes)`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        await appendQueueLog(supabase, queueId, `cover image failed: ${msg}`);
      }
    }

    const guide = await createDraftQaGuide(supabase, {
      title: enriched.title,
      slug,
      topic_cluster: item.topic_cluster,
      intent: item.intent,
      excerpt: enriched.excerpt ?? enriched.meta_description,
      content_markdown: enriched.content_markdown,
      cover_image_url: coverUrl,
      tags: enriched.tags,
      seo: {
        meta_title: enriched.meta_title,
        meta_description: enriched.meta_description,
        primary_keyword: enriched.primary_keyword ?? item.primary_keyword,
        secondary_keywords:
          enriched.secondary_keywords ?? item.secondary_keywords ?? [],
      },
      internal_link_suggestions: enriched.internal_link_suggestions,
      quality_checks: qc,
      source: {
        tool: "admin-generation",
        queue_id: queueId,
        model: getOpenAITextModel(),
        provider: "openai",
        competitor_urls: competitorUrls,
        external_link_suggestions: enriched.external_link_suggestions ?? [],
      },
    });

    const score = compositeQualityScore(qc);
    await markQueueGenerated(supabase, queueId, guide.id, qc, score, recommendation);
    await appendQueueLog(supabase, queueId, `draft created: ${guide.url_path}`);

    return {
      ok: true,
      guide_id: guide.id,
      quality_recommendation: recommendation,
      quality_warnings: warnings,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await appendQueueLog(supabase, queueId, `pipeline failed: ${msg}`);
    await markQueueFailed(supabase, queueId, msg);
    return { ok: false, error: msg };
  }
}
