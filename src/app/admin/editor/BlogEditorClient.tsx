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
import RichTextEditor from "@/components/RichTextEditor";
import { ArrowLeft, Save, Upload } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Blog {
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
}

const BlogEditorClient = () => {
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<"content" | "metadata">("content");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorDesignation, setAuthorDesignation] = useState("");
  const [published, setPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLabsFeatured, setIsLabsFeatured] = useState(false);
  const [publishedDate, setPublishedDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [writerId, setWriterId] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth");
        return;
      }

      setUser(session.user);
    };

    checkAuth();
  }, [router]);

  const { data: existingBlog } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Blog & { writer_id: string | null; youtube_url: string | null };
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
    if (existingBlog) {
      setTitle(existingBlog.title);
      setSlug(existingBlog.slug);
      setContent(existingBlog.content || "");
      setExcerpt(existingBlog.excerpt || "");
      setFeaturedImageUrl(existingBlog.featured_image || "");
      setAuthorName(existingBlog.author_name || "");
      setAuthorDesignation(existingBlog.author_designation || "");
      setPublished(existingBlog.published);
      setIsFeatured(existingBlog.is_featured);
      setIsLabsFeatured((existingBlog as any).is_labs_featured || false);
      setPublishedDate(existingBlog.published_date ? existingBlog.published_date.substring(0, 10) : "");
      setWriterId(existingBlog.writer_id || "");
      setYoutubeUrl(existingBlog.youtube_url || "");
    }
  }, [existingBlog]);

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = featuredImageUrl;

      if (featuredImageFile) {
        setUploading(true);
        imageUrl = await uploadImage(featuredImageFile);
        setUploading(false);
      }

      const blogData = {
        title: title || "Untitled",
        slug: slug || `untitled-${Date.now()}`,
        excerpt,
        content,
        featured_image: imageUrl || null,
        author_name: authorName || null,
        author_designation: authorDesignation || null,
        published,
        is_featured: isFeatured,
        is_labs_featured: isLabsFeatured,
        published_date: publishedDate || null,
        writer_id: (writerId && writerId !== "none") ? writerId : null,
        youtube_url: youtubeUrl || null,
      };

      if (id) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blogs").insert([blogData]);
        if (error) throw error;
      }

      if (published) {
        try {
          await supabase.functions.invoke('ping-sitemap');
          console.log('Search engines notified of new content');
        } catch (error) {
          console.error('Failed to ping search engines:', error);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      toast({ 
        title: "Success", 
        description: published ? "Blog published successfully" : "Blog saved as draft" 
      });
      router.push("/admin");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSaveDraft = () => {
    setPublished(false);
    saveMutation.mutate();
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

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      toast({
        title: "Required Fields",
        description: "Title and slug are required to publish",
        variant: "destructive",
      });
      return;
    }
    setPublished(true);
    saveMutation.mutate();
  };

  if (step === "content") {
    return (
      <div className="min-h-screen bg-background dark relative">
        <div className="absolute inset-0 glow-bg"></div>
        
        <div className="relative z-10">
          <div className="border-b border-border/50 bg-card/95 backdrop-blur sticky top-0 z-20">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Button 
                variant="ghost" 
                onClick={() => router.push("/admin")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admin
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleSaveDraft}
                  disabled={saveMutation.isPending || uploading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button 
                  onClick={handleContinueToPublish}
                  disabled={saveMutation.isPending || uploading}
                >
                  Continue to Publish
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[calc(100vh-80px)] flex flex-col">
            <div className="container mx-auto px-4 pt-8 pb-4 max-w-5xl">
              <Input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-4xl font-bold border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              />
            </div>
            <div className="flex-1 container mx-auto px-4 pb-8 max-w-5xl overflow-hidden">
              <RichTextEditor 
                value={content} 
                onChange={setContent}
                placeholder="Start writing your blog post..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark relative">
      <div className="absolute inset-0 glow-bg"></div>
      
      <div className="relative z-10">
        <div className="border-b border-border/50 bg-card/95 backdrop-blur sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => setStep("content")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Editor
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleSaveDraft}
                disabled={saveMutation.isPending || uploading}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Card className="border-border/50 bg-card/95 backdrop-blur">
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePublish} className="space-y-6">
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
                    placeholder="blog-post-url-slug"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">SEO Meta Description</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Write a compelling meta description for search engines (150-160 characters recommended)"
                    className="min-h-[100px]"
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground">
                    {excerpt.length}/160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured-image">Featured Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="featured-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFeaturedImageFile(e.target.files?.[0] || null)}
                      className="flex-1"
                    />
                    {featuredImageFile && (
                      <Button type="button" variant="outline" disabled>
                        <Upload className="w-4 h-4 mr-2" />
                        {featuredImageFile.name}
                      </Button>
                    )}
                  </div>
                  {featuredImageUrl && !featuredImageFile && (
                    <p className="text-sm text-muted-foreground">Current: {featuredImageUrl}</p>
                  )}
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
                    Paste a YouTube URL to embed the video at the top of the blog post
                  </p>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={isFeatured}
                      onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
                    />
                    <Label htmlFor="featured">Featured Post</Label>
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

                <div className="flex gap-2">
                  <Button type="submit" disabled={saveMutation.isPending || uploading}>
                    {uploading ? "Uploading..." : saveMutation.isPending ? "Publishing..." : "Publish"}
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
    </div>
  );
};

export default BlogEditorClient;
