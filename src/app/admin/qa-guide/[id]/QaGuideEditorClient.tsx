"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Rocket, Save } from "lucide-react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { getAdminAccessState } from "@/lib/admin/admin-auth";
import {
  clearAdminAccessCookie,
  setAdminAccessCookie,
} from "@/lib/admin/session-cookie";
import {
  revalidatePublicPaths,
  withCommonCachePaths,
} from "@/lib/admin/revalidate-client";
import { formatErrorMessage } from "@/lib/admin/error-message";
import { validateQaGuideForPublish } from "@/lib/admin/publish-validation";
import { prefillQaGuidePublishFields } from "@/lib/qa-guide/publish-prefill";
import { applyTierTransition } from "@/lib/qa-guide/promote";
import { draftUrlPath, publishedUrlPath } from "@/lib/qa-guide/urls";
import { PATHS, QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";

export default function QaGuideEditorClient() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [topicCluster, setTopicCluster] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [writerId, setWriterId] = useState("");

  useEffect(() => {
    const check = async () => {
      const access = await getAdminAccessState(supabase);
      if (access.status !== "ok") {
        clearAdminAccessCookie();
        router.push(access.status === "forbidden" ? "/" : "/auth");
        return;
      }
      setAdminAccessCookie(access.session.access_token);
    };
    check();
  }, [router]);

  const { data: guide, isLoading } = useQuery({
    queryKey: ["qa-guide", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("qa_guides")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: Boolean(id),
  });

  const { data: clusters } = useQuery({
    queryKey: ["qa-guide-clusters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("qa_guide_topic_clusters")
        .select("slug, title")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: writers } = useQuery({
    queryKey: ["writers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("writers")
        .select("id, name, designation")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!guide) return;
    setTitle(guide.title);
    setSlug(guide.slug);
    setTopicCluster(guide.topic_cluster);
    setExcerpt(guide.excerpt ?? "");
    setContent(guide.content ?? "");
    setFeaturedImage(guide.featured_image ?? "");
    setSeoTitle(guide.seo_title ?? "");
    setSeoDescription(guide.seo_description ?? "");
    setAuthorName(guide.author_name ?? "");
    setWriterId(guide.writer_id ?? "");
  }, [guide]);

  const handleWriterChange = (value: string) => {
    setWriterId(value === "none" ? "" : value);
    if (value && value !== "none") {
      const writer = writers?.find((w) => w.id === value);
      if (writer?.name) setAuthorName(writer.name);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("qa_guides")
        .update({
          title,
          slug,
          topic_cluster: topicCluster,
          excerpt: excerpt || null,
          content,
          featured_image: featuredImage || null,
          seo_title: seoTitle || null,
          seo_description: seoDescription || null,
          author_name: authorName || null,
          writer_id: writerId || null,
          og_image_url: featuredImage || null,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Saved" });
    },
    onError: (e: Error) => {
      toast({
        title: "Save failed",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const publishMutation = useMutation({
    mutationFn: async () => {
      const publishFields = prefillQaGuidePublishFields({
        title,
        excerpt,
        seo_title: seoTitle,
        seo_description: seoDescription,
        content,
      });

      const errors = validateQaGuideForPublish({
        title,
        slug,
        content,
        seoTitle: publishFields.seo_title,
        seoDescription: publishFields.seo_description,
      });
      if (errors.length > 0) throw new Error(errors[0]);

      await saveMutation.mutateAsync();

      if (!guide) throw new Error("Guide not loaded");
      const transition = applyTierTransition(
        {
          slug: guide.slug,
          topic_cluster: topicCluster,
          url_path: guide.url_path,
        },
        { tier: "index_worthy", topic_cluster: topicCluster },
      );

      const { data: updated, error } = await supabase
        .from("qa_guides")
        .update({
          ...transition,
          seo_title: publishFields.seo_title,
          seo_description: publishFields.seo_description,
        })
        .eq("id", id)
        .select("id")
        .single();
      if (error) throw error;
      if (!updated) {
        throw new Error(
          "Publish did not apply. Confirm you are signed in as an admin.",
        );
      }

      const { data: session } = await supabase.auth.getSession();
      await revalidatePublicPaths(
        session.session?.access_token,
        withCommonCachePaths([
          PATHS.QA_GUIDE,
          publishedUrlPath(slug),
          draftUrlPath(slug),
        ]),
      );

      try {
        await supabase.functions.invoke("ping-sitemap");
      } catch (error) {
        console.error("Failed to ping search engines:", error);
      }
    },
    onSuccess: () => {
      toast({
        title: "Published",
        description: "Live, indexable, and in the sitemap.",
      });
      router.push("/admin");
    },
    onError: (e: unknown) => {
      console.error("[QaGuideEditor] publish failed", e);
      toast({
        title: "Publish failed",
        description: formatErrorMessage(e),
        variant: "destructive",
      });
    },
  });

  if (isLoading || !guide) {
    return (
      <AdminPageShell>
        <p className="p-8 text-muted-foreground">Loading…</p>
      </AdminPageShell>
    );
  }

  const qc = (guide.quality_checks ?? {}) as Record<string, unknown>;
  const isDraft = guide.tier === "draft";

  return (
    <AdminPageShell>
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        <Button variant="ghost" onClick={() => router.push("/admin")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to admin
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Edit {QE_GUIDE_DISPLAY_NAME}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            {isDraft ? (
              <Button
                onClick={() => publishMutation.mutate()}
                disabled={publishMutation.isPending}
              >
                <Rocket className="mr-2 h-4 w-4" />
                Publish
              </Button>
            ) : (
              <span className="rounded bg-green-500/15 px-3 py-2 text-sm text-green-800 dark:text-green-200">
                Published
              </span>
            )}
          </div>
        </div>

        {Object.keys(qc).length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Quality checks (from automation)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="max-h-48 overflow-auto rounded bg-muted p-3 text-xs">
                {JSON.stringify(qc, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ) : null}

        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cluster">Topic cluster</Label>
                <select
                  id="cluster"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={topicCluster}
                  onChange={(e) => setTopicCluster(e.target.value)}
                  disabled={!isDraft}
                >
                  {(clusters ?? []).map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Featured image URL (optional)</Label>
              <Input
                id="image"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">
                  SEO title (auto-filled from title if empty)
                </Label>
                <Input
                  id="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author name</Label>
                <Input
                  id="author"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="writer">Writer profile</Label>
              <Select
                value={writerId || "none"}
                onValueChange={handleWriterChange}
              >
                <SelectTrigger id="writer" className="bg-background">
                  <SelectValue placeholder="Select a writer" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="none">No writer profile</SelectItem>
                  {(writers ?? []).map((writer) => (
                    <SelectItem key={writer.id} value={writer.id}>
                      {writer.name}
                      {writer.designation ? `. ${writer.designation}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Links the Written by card (bio + LinkedIn) at the end of the
                guide
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDesc">
                SEO description (auto-filled from excerpt if empty)
              </Label>
              <Textarea
                id="seoDesc"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageShell>
  );
}
