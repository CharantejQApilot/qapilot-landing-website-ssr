"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Edit, ExternalLink, Rocket, Trash2 } from "lucide-react";
import { formatErrorMessage } from "@/lib/admin/error-message";
import { validateQaGuideForPublish } from "@/lib/admin/publish-validation";
import { prefillQaGuidePublishFields } from "@/lib/qa-guide/publish-prefill";
import {
  revalidatePublicPaths,
  withCommonCachePaths,
} from "@/lib/admin/revalidate-client";
import { applyTierTransition } from "@/lib/qa-guide/promote";
import { draftUrlPath, publishedUrlPath } from "@/lib/qa-guide/urls";
import { PATHS, QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";

type QaGuideRow = {
  id: string;
  title: string;
  slug: string;
  topic_cluster: string;
  tier: string;
  status: string;
  url_path: string;
  created_at: string;
  quality_checks: Record<string, unknown> | null;
};

export default function QaGuidesCMS() {
  const router = useRouter();
  const { toast } = useToast();
  const [guides, setGuides] = useState<QaGuideRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  const fetchGuides = async () => {
    const { data, error } = await supabase
      .from("qa_guides")
      .select("id, title, slug, topic_cluster, tier, status, url_path, created_at, quality_checks")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: `Failed to load ${QE_GUIDE_DISPLAY_NAME} articles`, variant: "destructive" });
    } else {
      setGuides((data as QaGuideRow[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handlePublish = async (guide: QaGuideRow) => {
    setPublishingId(guide.id);
    try {
      const { data: row, error: fetchError } = await supabase
        .from("qa_guides")
        .select(
          "id, title, slug, topic_cluster, tier, status, url_path, content, excerpt, seo_title, seo_description, featured_image, og_image_url",
        )
        .eq("id", guide.id)
        .single();

      if (fetchError) throw fetchError;
      if (!row) throw new Error("Guide not found");

      const publishFields = prefillQaGuidePublishFields({
        title: row.title,
        excerpt: row.excerpt,
        seo_title: row.seo_title,
        seo_description: row.seo_description,
        content: row.content,
      });

      const publishErrors = validateQaGuideForPublish({
        title: row.title,
        slug: row.slug,
        content: row.content ?? "",
        seoTitle: publishFields.seo_title,
        seoDescription: publishFields.seo_description,
      });
      if (publishErrors.length > 0) {
        throw new Error(publishErrors[0]);
      }

      const transition = applyTierTransition(row, { tier: "index_worthy" });

      const { data: updated, error } = await supabase
        .from("qa_guides")
        .update({
          ...transition,
          seo_title: publishFields.seo_title,
          seo_description: publishFields.seo_description,
        })
        .eq("id", guide.id)
        .select("id")
        .single();

      if (error) throw error;
      if (!updated) {
        throw new Error(
          "Publish did not apply. Confirm you are signed in as an admin.",
        );
      }

      const { data: session } = await supabase.auth.getSession();
      const paths = withCommonCachePaths([
        PATHS.QA_GUIDE,
        publishedUrlPath(guide.slug),
        draftUrlPath(guide.slug),
      ]);
      await revalidatePublicPaths(session.session?.access_token, paths);

      toast({
        title: "Published",
        description: "Guide is live, indexable, and in the sitemap.",
      });
      fetchGuides();
    } catch (e) {
      console.error("[QaGuidesCMS] publish failed", e);
      toast({
        title: "Publish failed",
        description: formatErrorMessage(e),
        variant: "destructive",
      });
    } finally {
      setPublishingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this guide?")) return;
    const { error } = await supabase.from("qa_guides").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", variant: "destructive" });
      return;
    }
    toast({ title: "Deleted" });
    fetchGuides();
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading {QE_GUIDE_DISPLAY_NAME} articles…</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Automation creates drafts at <code>/seo-drafts/…</code>.{" "}
        <strong>Publish</strong> makes the guide public (SEO title and description are filled
        automatically; cover image is optional).
      </p>
      {guides.length === 0 ? (
        <p className="text-muted-foreground">No guides yet.</p>
      ) : (
        <div className="space-y-3">
          {guides.map((g) => {
            const qc = g.quality_checks ?? {};
            const recommendation =
              typeof qc.overall_recommendation === "string"
                ? qc.overall_recommendation
                : null;
            const isDraft = g.tier === "draft";
            return (
              <Card key={g.id}>
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold truncate">{g.title}</h3>
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                          isDraft
                            ? "bg-amber-500/15 text-amber-800 dark:text-amber-200"
                            : "bg-green-500/15 text-green-800 dark:text-green-200"
                        }`}
                      >
                        {isDraft ? "Draft" : "Published"}
                      </span>
                      {recommendation ? (
                        <span className="text-xs text-muted-foreground">
                          AI: {recommendation}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {g.topic_cluster} · {g.url_path}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/qa-guide/${g.id}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={g.url_path} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </Button>
                    {isDraft ? (
                      <Button
                        size="sm"
                        onClick={() => handlePublish(g)}
                        disabled={publishingId === g.id}
                      >
                        <Rocket className="h-4 w-4 mr-1" />
                        {publishingId === g.id ? "Publishing…" : "Publish & index"}
                      </Button>
                    ) : null}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(g.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
