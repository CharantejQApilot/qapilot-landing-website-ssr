"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { validatePublishedContent } from "@/lib/admin/publish-validation";
import { getAdminAccessState } from "@/lib/admin/admin-auth";
import {
  clearAdminAccessCookie,
  setAdminAccessCookie,
} from "@/lib/admin/session-cookie";
import {
  revalidatePublicPaths,
  withCommonCachePaths,
} from "@/lib/admin/revalidate-client";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  published: boolean;
  is_featured: boolean;
  is_labs_featured: boolean;
  published_date: string | null;
  author_name: string | null;
  author_designation: string | null;
  youtube_url: string | null;
  writer_id?: string | null;
  category: string | null;
  description: string | null;
  tags: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  seo_keywords: string | null;
  content_format: string | null;
  is_banner?: boolean;
  banner_text?: string | null;
}

const CaseStudyEditorClient = () => {
  const [step, setStep] = useState<"content" | "metadata">("content");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorDesignation, setAuthorDesignation] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLabsFeatured, setIsLabsFeatured] = useState(false);
  const [publishedDate, setPublishedDate] = useState("");
  const [writerId, setWriterId] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [publishStatus, setPublishStatus] = useState<"draft" | "published">(
    "published",
  );
  const [isCaseStudyBanner, setIsCaseStudyBanner] = useState(false);
  const [caseStudyBannerText, setCaseStudyBannerText] = useState("");

  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    const checkAuth = async () => {
      const access = await getAdminAccessState(supabase);
      if (access.status === "unauthenticated") {
        clearAdminAccessCookie();
        router.push("/auth");
        return;
      }
      if (access.status === "forbidden") {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        router.push("/");
        return;
      }
      setAdminAccessCookie(access.session.access_token);
    };

    checkAuth();
  }, [router, toast]);

  const { data: existingCaseStudy } = useQuery({
    queryKey: ["case-study", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as CaseStudy & { writer_id: string | null; youtube_url: string | null };
    },
    enabled: !!id,
  });

  const { data: writers } = useQuery({
    queryKey: ["writers-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("writers")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (existingCaseStudy) {
      setTitle(existingCaseStudy.title);
      setSlug(existingCaseStudy.slug);
      setContent(existingCaseStudy.content || "");
      setExcerpt(existingCaseStudy.excerpt || "");
      setFeaturedImageUrl(existingCaseStudy.featured_image || "");
      setAuthorName(existingCaseStudy.author_name || "");
      setAuthorDesignation(existingCaseStudy.author_designation || "");
      setIsFeatured(existingCaseStudy.is_featured);
      setIsLabsFeatured((existingCaseStudy as CaseStudy).is_labs_featured || false);
      setPublishedDate(
        existingCaseStudy.published_date
          ? existingCaseStudy.published_date.substring(0, 10)
          : "",
      );
      setWriterId(existingCaseStudy.writer_id || "");
      setYoutubeUrl(existingCaseStudy.youtube_url || "");
      setCategory(existingCaseStudy.category || "");
      setDescription(existingCaseStudy.description || "");
      setTags(existingCaseStudy.tags || "");
      setSeoTitle(existingCaseStudy.seo_title || "");
      setSeoDescription(existingCaseStudy.seo_description || "");
      setOgImageUrl(existingCaseStudy.og_image_url || "");
      setSeoKeywords(existingCaseStudy.seo_keywords || "");
      setPublishStatus(existingCaseStudy.published ? "published" : "draft");
      setIsCaseStudyBanner(Boolean((existingCaseStudy as CaseStudy).is_banner));
      setCaseStudyBannerText((existingCaseStudy as CaseStudy).banner_text || "");
    }
  }, [existingCaseStudy]);

  const saveMutation = useMutation({
    mutationFn: async ({ published: publishedFlag }: { published: boolean }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Your session expired. Please sign in again.");
      }

      const imageUrl = featuredImageUrl.trim();

      const contentFormat =
        id && existingCaseStudy?.content_format === "html" ? "html" : "markdown";

      const caseStudyData = {
        title: title || "Untitled",
        slug: slug || `untitled-${Date.now()}`,
        excerpt: excerpt || null,
        content,
        featured_image: imageUrl || null,
        author_name: authorName || null,
        author_designation: authorDesignation || null,
        published: publishedFlag,
        is_featured: isFeatured,
        is_labs_featured: isLabsFeatured,
        published_date: publishedDate || null,
        writer_id: writerId && writerId !== "none" ? writerId : null,
        youtube_url: youtubeUrl || null,
        category: category.trim() || null,
        description: description.trim() || null,
        tags: tags.trim() || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        og_image_url: ogImageUrl.trim() || null,
        seo_keywords: seoKeywords.trim() || null,
        content_format: contentFormat,
        is_banner: publishedFlag && isCaseStudyBanner,
        banner_text:
          publishedFlag && isCaseStudyBanner && caseStudyBannerText.trim()
            ? caseStudyBannerText.trim()
            : null,
      };

      if (publishedFlag) {
        const publishErrors = validatePublishedContent({
          title,
          slug,
          content,
          seoTitle,
          seoDescription,
          ogImageUrl,
          featuredImageUrl,
        });
        if (publishErrors.length > 0) {
          throw new Error(publishErrors[0]);
        }
      }

      if (id) {
        const { data: updatedRow, error, status } = await supabase
          .from("case_studies")
          .update(caseStudyData)
          .eq("id", id)
          .select("id, title")
          .maybeSingle();
        console.log("[ADMIN DEBUG] case study update:", { updatedRow, error, status, id });
        if (error) throw error;
        if (!updatedRow) {
          throw new Error(
            `Case study update silently failed (status ${status}). RLS is blocking writes. Run 20260422120000_case_studies_cms.sql in Supabase SQL Editor.`
          );
        }
      } else {
        const { data: insertedRow, error, status } = await supabase
          .from("case_studies")
          .insert({ ...caseStudyData, id: crypto.randomUUID() })
          .select("id")
          .single();
        console.log("[ADMIN DEBUG] case study insert:", { insertedRow, error, status });
        if (error) throw error;
      }

      if (publishedFlag) {
        try {
          await supabase.functions.invoke('ping-sitemap');
          console.log('Search engines notified of new content');
        } catch (error) {
          console.error('Failed to ping search engines:', error);
        }
      }
      return { savedSlug: caseStudyData.slug as string };
    },
    onSuccess: async (result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const savedSlug = result?.savedSlug;
      if (token && savedSlug) {
        const previousSlug = existingCaseStudy?.slug;
        const paths = withCommonCachePaths([
          "/",
          "/case-studies",
          `/case-studies/${savedSlug}`,
          previousSlug ? `/case-studies/${previousSlug}` : "",
        ]);
        await revalidatePublicPaths(token, paths);
      }
      toast({
        title: "Success",
        description: variables.published
          ? "Case study published successfully"
          : "Case study saved as draft",
      });
      router.push("/admin");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "object" &&
              error !== null &&
              "message" in error &&
              typeof (error as { message: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Save failed";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const validateBannerForPublish = (published: boolean) => {
    if (published && isCaseStudyBanner && !caseStudyBannerText.trim()) {
      toast({
        title: "Banner text required",
        description: "Add banner text or turn off the home page banner option.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  /** Content step: always persist as draft. Metadata step: respect Status (header save must match the form). */
  const handleStickySave = () => {
    if (step === "content") {
      saveMutation.mutate({ published: false });
      return;
    }
    if (!title.trim() || !slug.trim()) {
      toast({
        title: "Required fields",
        description: "Add a title and slug before saving.",
        variant: "destructive",
      });
      return;
    }
    const published = publishStatus === "published";
    if (!validateBannerForPublish(published)) return;
    saveMutation.mutate({ published });
  };

  const handleContinueToPublish = () => {
    if (!content) {
      toast({
        title: "Content Required",
        description: "Please write some content before continuing",
        variant: "destructive",
      });
      return;
    }
    setStep("metadata");
  };

  const handleSaveFromMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      toast({
        title: "Required Fields",
        description: "Title and slug are required",
        variant: "destructive",
      });
      return;
    }
    const published = publishStatus === "published";
    if (!validateBannerForPublish(published)) return;
    saveMutation.mutate({ published });
  };

  if (step === "content") {
    return (
      <AdminPageShell contentClassName="flex min-h-screen flex-col p-0">
        <div className="flex min-h-screen flex-col">
          <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/admin")}
                className="gap-2 text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Admin
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-border"
                  onClick={handleStickySave}
                  disabled={saveMutation.isPending}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save draft
                </Button>
                <Button
                  onClick={handleContinueToPublish}
                  disabled={saveMutation.isPending}
                >
                  Continue to Publish
                </Button>
              </div>
            </div>
          </div>

          <div className="flex h-[calc(100vh-73px)] flex-col">
            <div className="container mx-auto max-w-5xl px-4 pb-4 pt-8">
              <Input
                type="text"
                placeholder="Case Study Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-none bg-transparent px-0 font-heading text-3xl font-semibold tracking-tight text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 md:text-4xl"
              />
            </div>
            <div className="container mx-auto max-w-5xl flex-1 px-4 pb-8">
              <Label className="mb-2 block text-muted-foreground">
                Content (Markdown)
              </Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write in Markdown (headings, lists, links, code fences, etc.)"
                className="min-h-[min(60vh,520px)] resize-y font-mono text-sm leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell contentClassName="flex min-h-screen flex-col p-0">
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => setStep("content")}
              className="gap-2 text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Editor
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-border"
                onClick={handleStickySave}
                disabled={saveMutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {publishStatus === "published" ? "Save & publish" : "Save draft"}
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-4 py-8">
          <Card className="border border-border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-foreground">
                Publish settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveFromMetadata} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="case-study-url-slug"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={publishStatus}
                    onValueChange={(v) => {
                      const next = v as "draft" | "published";
                      setPublishStatus(next);
                      if (next === "draft") {
                        setIsCaseStudyBanner(false);
                      }
                    }}
                  >
                    <SelectTrigger id="status" className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-background">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Customer Story, Industry"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short summary shown on the article (optional)"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="fintech, mobile, automation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt (legacy / optional)</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Optional short excerpt (still used if SEO description is empty)"
                    className="min-h-[100px]"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground">
                    {excerpt.length}/500 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured-image">Cover image URL</Label>
                  <Input
                    id="featured-image"
                    value={featuredImageUrl}
                    onChange={(e) => setFeaturedImageUrl(e.target.value)}
                    placeholder="https://… (S3 or any public image URL)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author-name">Author Name</Label>
                    <Input
                      id="author-name"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author-designation">Author Designation</Label>
                    <Input
                      id="author-designation"
                      value={authorDesignation}
                      onChange={(e) => setAuthorDesignation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="writer">Writer Profile</Label>
                  <Select value={writerId || "none"} onValueChange={setWriterId}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select a writer (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      <SelectItem value="none">No writer profile</SelectItem>
                      {writers?.map((writer) => (
                        <SelectItem key={writer.id} value={writer.id}>
                          {writer.name}{writer.designation ? ` — ${writer.designation}` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Link a writer profile to show their bio and LinkedIn at the end of the post
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="published-date">Published Date</Label>
                  <Input
                    id="published-date"
                    type="date"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube-url">YouTube Video (Optional)</Label>
                  <Input
                    id="youtube-url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Paste a YouTube URL to embed the video at the top of the case study
                  </p>
                </div>

                <div className="space-y-3 border-t border-border pt-6">
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    SEO settings
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="seo-title">SEO title (required for publish)</Label>
                    <Input
                      id="seo-title"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="Overrides page title and Open Graph title when set"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-description">SEO description (required for publish)</Label>
                    <Textarea
                      id="seo-description"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder="Meta description; falls back to excerpt or description"
                      className="min-h-[88px]"
                      maxLength={320}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="og-image">OG image URL (or cover image required for publish)</Label>
                    <Input
                      id="og-image"
                      value={ogImageUrl}
                      onChange={(e) => setOgImageUrl(e.target.value)}
                      placeholder="https://… (falls back to cover image)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-keywords">Keywords (comma-separated)</Label>
                    <Input
                      id="seo-keywords"
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      placeholder="case study, customer story, QA"
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={isFeatured}
                      onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
                    />
                    <Label htmlFor="featured">Featured Case Study</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="labs-featured"
                      checked={isLabsFeatured}
                      onCheckedChange={(checked) => setIsLabsFeatured(checked as boolean)}
                    />
                    <Label htmlFor="labs-featured">Labs Featured</Label>
                  </div>
                </div>

                <div className="space-y-3 border-t border-border pt-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="case-study-home-banner"
                      checked={isCaseStudyBanner}
                      disabled={publishStatus !== "published"}
                      onCheckedChange={(checked) => setIsCaseStudyBanner(checked as boolean)}
                    />
                    <Label
                      htmlFor="case-study-home-banner"
                      className={
                        publishStatus === "published"
                          ? "cursor-pointer font-normal"
                          : "cursor-not-allowed font-normal opacity-50"
                      }
                    >
                      Home page banner (sticky bar above header; only when published)
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    If a news or blog item is also marked as banner, the news banner takes precedence.
                    Use one banner at a time for predictable messaging.
                  </p>
                  {isCaseStudyBanner && publishStatus === "published" && (
                    <div>
                      <Label htmlFor="case-study-banner-text">Banner text *</Label>
                      <Input
                        id="case-study-banner-text"
                        value={caseStudyBannerText}
                        onChange={(e) => setCaseStudyBannerText(e.target.value)}
                        placeholder="New case study: …"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button type="submit" disabled={saveMutation.isPending}>
                    {saveMutation.isPending
                      ? "Saving…"
                      : publishStatus === "published"
                        ? "Save & publish"
                        : "Save draft"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageShell>
  );
};

export default CaseStudyEditorClient;
