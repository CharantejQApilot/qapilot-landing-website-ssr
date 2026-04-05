"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, LogOut, Plus, Save, X, Link, CalendarIcon, FileJson } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import CareersCMS from "@/components/admin/CareersCMS";
import FAQsCMS from "@/components/admin/FAQsCMS";
import WritersCMS from "@/components/admin/WritersCMS";
import type { User } from "@supabase/supabase-js";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { parseBlogImportJson } from "@/lib/admin/blog-json-import";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  published: boolean;
  is_featured: boolean;
  is_banner?: boolean;
  published_date: string | null;
  author_name: string | null;
  author_designation: string | null;
  created_at: string;
  updated_at: string;
}

interface NewsUpdate {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  published: boolean;
  is_featured: boolean;
  is_banner: boolean;
  banner_text: string | null;
  published_date: string | null;
  author_name: string | null;
  author_designation: string | null;
  social_embed_url: string | null;
  social_embed_image?: string | null;
  social_embed_description?: string | null;
  youtube_url?: string | null;
  created_at: string;
  updated_at: string;
  category?: string | null;
  description?: string | null;
  tags?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image_url?: string | null;
  seo_keywords?: string | null;
  content_format?: string | null;
}

interface Backlink {
  id?: string;
  header: string;
  logo_url: string;
  description: string;
  link_url?: string;
}

const AdminClient = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [termsTitle, setTermsTitle] = useState("");
  const [termsContent, setTermsContent] = useState("");
  
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsSlug, setNewsSlug] = useState("");
  const [newsExcerpt, setNewsExcerpt] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsFeaturedImage, setNewsFeaturedImage] = useState("");
  const [newsAuthorName, setNewsAuthorName] = useState("");
  const [newsAuthorDesignation, setNewsAuthorDesignation] = useState("");
  const [newsPublished, setNewsPublished] = useState(false);
  const [newsIsFeatured, setNewsIsFeatured] = useState(false);
  const [newsIsBanner, setNewsIsBanner] = useState(false);
  const [newsBannerText, setNewsBannerText] = useState("");
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false);
  
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [uploadingBacklinkLogo, setUploadingBacklinkLogo] = useState<number | null>(null);
  
  const [newsSocialEmbedUrl, setNewsSocialEmbedUrl] = useState("");
  const [newsSocialEmbedImage, setNewsSocialEmbedImage] = useState("");
  const [newsSocialEmbedDescription, setNewsSocialEmbedDescription] = useState("");
  const [uploadingSocialEmbedImage, setUploadingSocialEmbedImage] = useState(false);
  
  const [newsPublishedDate, setNewsPublishedDate] = useState<Date | undefined>(undefined);
  
  const [newsYoutubeUrl, setNewsYoutubeUrl] = useState("");
  const [newsCategory, setNewsCategory] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsTags, setNewsTags] = useState("");
  const [newsSeoTitle, setNewsSeoTitle] = useState("");
  const [newsSeoDescription, setNewsSeoDescription] = useState("");
  const [newsOgImageUrl, setNewsOgImageUrl] = useState("");
  const [newsSeoKeywords, setNewsSeoKeywords] = useState("");
  const [newsContentFormat, setNewsContentFormat] = useState<"html" | "markdown">(
    "markdown",
  );

  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const blogJsonFileInputRef = useRef<HTMLInputElement>(null);

  const mutationErrorText = (err: unknown) => {
    if (err instanceof Error) return err.message;
    if (
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message: unknown }).message === "string"
    ) {
      return (err as { message: string }).message;
    }
    return "Something went wrong. Try again.";
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth");
        return;
      }

      setUser(session.user);

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) {
        console.error("user_roles check failed:", roleError.message);
      }

      if (!roleData) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        router.push("/");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, toast]);

  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Blog[];
    },
    enabled: isAdmin,
  });

  const { data: newsItems, isLoading: newsLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_updates")
        .select("*")
        .order("published_date", { ascending: false, nullsFirst: false });

      if (error) throw error;
      return data as NewsUpdate[];
    },
    enabled: isAdmin,
  });

  const { data: terms, isLoading: termsLoading } = useQuery({
    queryKey: ["admin-terms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("terms_content")
        .select("*")
        .order("created_at", { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  useEffect(() => {
    if (terms) {
      setTermsTitle(terms.title || "");
      setTermsContent(terms.content || "");
    }
  }, [terms]);

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
    },
    onError: (err: unknown) => {
      toast({
        title: "Could not delete blog",
        description: mutationErrorText(err),
        variant: "destructive",
      });
    },
  });

  const importBlogJsonMutation = useMutation({
    mutationFn: async (file: File) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Your session expired. Please sign in again.");
      }

      const text = await file.text();
      const parsed = parseBlogImportJson(text);
      if (parsed.ok === false) {
        throw new Error(parsed.errors.join(" "));
      }
      const row = parsed.row;

      const newId = crypto.randomUUID();
      const { data, error } = await supabase
        .from("blogs")
        .insert({ ...row, id: newId })
        .select("id")
        .single();

      if (error) throw error;
      return data as { id: string };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      toast({
        title: "Draft created",
        description: "Blog imported from JSON. Open it to review and publish when ready.",
      });
      if (blogJsonFileInputRef.current) {
        blogJsonFileInputRef.current.value = "";
      }
      router.push(`/admin/editor/${data.id}`);
    },
    onError: (err: unknown) => {
      toast({
        title: "Could not import blog JSON",
        description: mutationErrorText(err),
        variant: "destructive",
      });
      if (blogJsonFileInputRef.current) {
        blogJsonFileInputRef.current.value = "";
      }
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news_updates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast({
        title: "Success",
        description: "News item deleted successfully",
      });
    },
    onError: (err: unknown) => {
      toast({
        title: "Could not delete news",
        description: mutationErrorText(err),
        variant: "destructive",
      });
    },
  });

  const saveNewsMutation = useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Your session expired. Please sign in again.");
      }

      const newsData = {
        title: newsTitle,
        slug: newsSlug,
        excerpt: newsExcerpt || null,
        content: newsContent,
        featured_image: newsFeaturedImage || null,
        author_name: newsAuthorName || null,
        author_designation: newsAuthorDesignation || null,
        published: newsPublished,
        is_featured: newsIsFeatured,
        is_banner: newsIsBanner,
        banner_text: newsBannerText || null,
        social_embed_url: newsSocialEmbedUrl || null,
        social_embed_image: newsSocialEmbedImage || null,
        social_embed_description: newsSocialEmbedDescription || null,
        published_date: newsPublishedDate ? newsPublishedDate.toISOString() : null,
        youtube_url: newsYoutubeUrl || null,
        category: newsCategory.trim() || null,
        description: newsDescription.trim() || null,
        tags: newsTags.trim() || null,
        seo_title: newsSeoTitle.trim() || null,
        seo_description: newsSeoDescription.trim() || null,
        og_image_url: newsOgImageUrl.trim() || null,
        seo_keywords: newsSeoKeywords.trim() || null,
        content_format: newsContentFormat,
      };

      let newsId = editingNewsId;

      if (editingNewsId) {
        const { data: updatedRow, error, status, statusText } = await supabase
          .from("news_updates")
          .update(newsData)
          .eq("id", editingNewsId)
          .select("id")
          .maybeSingle();
        console.log("[ADMIN DEBUG] news update response:", { updatedRow, error, status, statusText, editingNewsId });
        if (error) throw error;
        if (!updatedRow) {
          throw new Error(
            `Update silently failed (status ${status}). RLS is blocking the write. Run 20260326000000_fix_all_admin_rls.sql in Supabase SQL Editor.`
          );
        }

        const { data: verify } = await supabase
          .from("news_updates")
          .select("id, title, content")
          .eq("id", editingNewsId)
          .single();
        console.log("[ADMIN DEBUG] verify after update:", { savedTitle: verify?.title, expectedTitle: newsTitle, match: verify?.title === newsTitle });
        if (verify && verify.title !== newsTitle) {
          throw new Error(
            `Write appeared to succeed but data didn't change. The database may have a BEFORE UPDATE trigger reverting data, or there is a permissions issue.`
          );
        }
      } else {
        const newId = crypto.randomUUID();
        const { data, error, status } = await supabase
          .from("news_updates")
          .insert({ ...newsData, id: newId })
          .select("id")
          .single();
        console.log("[ADMIN DEBUG] news insert response:", { data, error, status, newId });
        if (error) throw error;
        newsId = data.id;
      }

      if (newsId) {
        await saveBacklinks(newsId);
      }

      if (newsPublished) {
        try {
          await supabase.functions.invoke('ping-sitemap');
          console.log('Search engines notified of new content');
        } catch (error) {
          console.error('Failed to ping search engines:', error);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast({
        title: "Success",
        description: editingNewsId ? "News item updated successfully" : "News item created successfully",
      });
      resetNewsForm();
    },
    onError: (err: unknown) => {
      toast({
        title: "Could not save news",
        description: mutationErrorText(err),
        variant: "destructive",
      });
    },
  });

  const handleEditBlog = (blogId: string) => {
    router.push(`/admin/editor/${blogId}`);
  };

  const handleEditNews = async (news: NewsUpdate) => {
    setEditingNewsId(news.id);
    setNewsTitle(news.title);
    setNewsSlug(news.slug);
    setNewsExcerpt(news.excerpt || "");
    setNewsContent(news.content);
    setNewsFeaturedImage(news.featured_image || "");
    setNewsAuthorName(news.author_name || "");
    setNewsAuthorDesignation(news.author_designation || "");
    setNewsPublished(news.published);
    setNewsIsFeatured(news.is_featured);
    setNewsIsBanner(news.is_banner);
    setNewsBannerText(news.banner_text || "");
    setNewsSocialEmbedUrl(news.social_embed_url || "");
    setNewsSocialEmbedImage(news.social_embed_image || "");
    setNewsSocialEmbedDescription(news.social_embed_description || "");
    setNewsPublishedDate(news.published_date ? new Date(news.published_date) : undefined);
    setNewsYoutubeUrl(news.youtube_url || "");
    setNewsCategory(news.category || "");
    setNewsDescription(news.description || "");
    setNewsTags(news.tags || "");
    setNewsSeoTitle(news.seo_title || "");
    setNewsSeoDescription(news.seo_description || "");
    setNewsOgImageUrl(news.og_image_url || "");
    setNewsSeoKeywords(news.seo_keywords || "");
    setNewsContentFormat(
      news.content_format === "html" ? "html" : "markdown",
    );
    setIsEditingNews(true);
    
    const { data: existingBacklinks } = await supabase
      .from("news_backlinks")
      .select("*")
      .eq("news_id", news.id);
    
    if (existingBacklinks) {
      setBacklinks(existingBacklinks.map(b => ({
        id: b.id,
        header: b.header,
        logo_url: b.logo_url,
        description: b.description,
        link_url: b.link_url || undefined,
      })));
    } else {
      setBacklinks([]);
    }
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFeaturedImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `news/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setNewsFeaturedImage(publicUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: unknown) {
      console.error('Error uploading image:', error);
      const msg =
        error instanceof Error
          ? error.message
          : typeof error === "object" &&
              error !== null &&
              "message" in error &&
              typeof (error as { message: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Failed to upload image";
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setUploadingFeaturedImage(false);
    }
  };

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setNewsTitle("");
    setNewsSlug("");
    setNewsExcerpt("");
    setNewsContent("");
    setNewsFeaturedImage("");
    setNewsAuthorName("");
    setNewsAuthorDesignation("");
    setNewsPublished(false);
    setNewsIsFeatured(false);
    setNewsIsBanner(false);
    setNewsBannerText("");
    setNewsSocialEmbedUrl("");
    setNewsSocialEmbedImage("");
    setNewsSocialEmbedDescription("");
    setNewsPublishedDate(undefined);
    setNewsYoutubeUrl("");
    setNewsCategory("");
    setNewsDescription("");
    setNewsTags("");
    setNewsSeoTitle("");
    setNewsSeoDescription("");
    setNewsOgImageUrl("");
    setNewsSeoKeywords("");
    setNewsContentFormat("markdown");
    setBacklinks([]);
    setIsEditingNews(false);
  };

  const handleSocialEmbedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSocialEmbedImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `social-embeds/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setNewsSocialEmbedImage(publicUrl);
      toast({
        title: "Image uploaded",
        description: "Social embed image has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingSocialEmbedImage(false);
    }
  };

  const addBacklink = () => {
    setBacklinks([...backlinks, { header: "", logo_url: "", description: "", link_url: "" }]);
  };

  const removeBacklink = (index: number) => {
    setBacklinks(backlinks.filter((_, i) => i !== index));
  };

  const updateBacklink = (index: number, field: keyof Backlink, value: string) => {
    const updated = [...backlinks];
    updated[index] = { ...updated[index], [field]: value };
    setBacklinks(updated);
  };

  const handleBacklinkLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingBacklinkLogo(index);
      const fileExt = file.name.split('.').pop();
      const fileName = `backlink-${Date.now()}.${fileExt}`;
      const filePath = `backlinks/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      updateBacklink(index, 'logo_url', publicUrl);
      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
    } catch (error: unknown) {
      console.error('Error uploading logo:', error);
      const msg =
        error instanceof Error
          ? error.message
          : typeof error === "object" &&
              error !== null &&
              "message" in error &&
              typeof (error as { message: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Failed to upload logo";
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setUploadingBacklinkLogo(null);
    }
  };

  const saveBacklinks = async (newsId: string) => {
    const { error: deleteError } = await supabase
      .from("news_backlinks")
      .delete()
      .eq("news_id", newsId);
    if (deleteError) throw deleteError;

    const validBacklinks = backlinks.filter((b) => b.header && b.logo_url);
    if (validBacklinks.length === 0) return;

    const { error: insertError } = await supabase.from("news_backlinks").insert(
      validBacklinks.map((b) => ({
        id: crypto.randomUUID(),
        news_id: newsId,
        header: b.header,
        logo_url: b.logo_url,
        description: b.description?.trim() ? b.description : null,
        link_url: b.link_url?.trim() ? b.link_url : null,
      }))
    );
    if (insertError) throw insertError;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const saveTermsMutation = useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Your session expired. Please sign in again.");
      }

      const termsData = {
        title: termsTitle,
        content: termsContent,
      };

      if (terms?.id) {
        const { error } = await supabase
          .from("terms_content")
          .update(termsData)
          .eq("id", terms.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("terms_content").insert({
          id: crypto.randomUUID(),
          title: termsData.title,
          content: termsData.content,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-terms"] });
      toast({
        title: "Success",
        description: "Terms & Conditions saved successfully",
      });
    },
    onError: (err: unknown) => {
      toast({
        title: "Could not save terms",
        description: mutationErrorText(err),
        variant: "destructive",
      });
    },
  });

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (loading) {
    return (
      <AdminPageShell contentClassName="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Loading…</p>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell contentClassName="px-4 py-8 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary/90">
              QApilot
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              <span className="text-primary">Admin</span> panel
            </h1>
          </div>
          <Button variant="outline" className="shrink-0 border-border" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="mb-8 flex h-auto min-h-10 w-full flex-wrap justify-start gap-1 rounded-xl bg-muted/80 p-1.5">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="news">News & Updates</TabsTrigger>
            <TabsTrigger value="writers">Writers</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Create a post in the editor, or import a JSON file to add a draft in one step.
              </p>
              <div className="flex flex-wrap justify-end gap-2">
                <input
                  ref={blogJsonFileInputRef}
                  type="file"
                  accept="application/json,.json"
                  className="sr-only"
                  aria-label="Import blog from JSON file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) importBlogJsonMutation.mutate(file);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="border-border"
                  disabled={importBlogJsonMutation.isPending}
                  onClick={() => blogJsonFileInputRef.current?.click()}
                >
                  <FileJson className="mr-2 h-4 w-4" />
                  {importBlogJsonMutation.isPending ? "Importing…" : "Import JSON draft"}
                </Button>
                <Button onClick={() => router.push("/admin/editor")}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Blog
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {blogsLoading ? (
                <Card className="border border-border bg-card text-card-foreground shadow-sm">
                  <CardContent className="p-12 text-center text-muted-foreground">
                    Loading blogs…
                  </CardContent>
                </Card>
              ) : blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                  <Card key={blog.id} className="border border-border bg-card text-card-foreground shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="mb-2 text-xl font-semibold text-foreground">{blog.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Slug: {blog.slug}
                          </p>
                          <div className="flex gap-2">
                            {blog.published && (
                              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                Published
                              </span>
                            )}
                            {blog.is_featured && (
                              <span className="text-xs bg-orange/20 text-orange px-2 py-1 rounded">
                                Featured
                              </span>
                            )}
                            {blog.published && blog.is_banner && (
                              <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                                Banner
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditBlog(blog.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteBlogMutation.mutate(blog.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border border-border bg-card text-card-foreground shadow-sm">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No blog posts yet. Create your first one!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="news">
            {!isEditingNews ? (
              <>
                <div className="flex justify-end mb-4">
                  <Button
                    onClick={() => {
                      resetNewsForm();
                      setIsEditingNews(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New News Item
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {newsLoading ? (
                    <Card className="border border-border bg-card text-card-foreground shadow-sm">
                      <CardContent className="p-12 text-center text-muted-foreground">
                        Loading news…
                      </CardContent>
                    </Card>
                  ) : newsItems && newsItems.length > 0 ? (
                    newsItems.map((news) => (
                      <Card key={news.id} className="border border-border bg-card text-card-foreground shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="mb-2 text-xl font-semibold text-foreground">{news.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                Slug: {news.slug}
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                {news.published && (
                                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                    Published
                                  </span>
                                )}
                                {news.is_featured && (
                                  <span className="text-xs bg-orange/20 text-orange px-2 py-1 rounded">
                                    Featured
                                  </span>
                                )}
                                {news.is_banner && (
                                  <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                                    Banner
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditNews(news)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => deleteNewsMutation.mutate(news.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="border border-border bg-card text-card-foreground shadow-sm">
                      <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground">No news items yet. Create your first one!</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            ) : (
              <Card className="border border-border bg-card text-card-foreground shadow-sm">
                <CardContent className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                      {editingNewsId ? "Edit News Item" : "Create News Item"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={resetNewsForm}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="news-title">Title *</Label>
                      <Input
                        id="news-title"
                        value={newsTitle}
                        onChange={(e) => {
                          setNewsTitle(e.target.value);
                          if (!editingNewsId) {
                            setNewsSlug(generateSlugFromTitle(e.target.value));
                          }
                        }}
                        placeholder="Enter news title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="news-slug">Slug *</Label>
                      <Input
                        id="news-slug"
                        value={newsSlug}
                        onChange={(e) => setNewsSlug(e.target.value)}
                        placeholder="url-friendly-slug"
                      />
                    </div>

                    <div>
                      <Label htmlFor="news-status">Status</Label>
                      <Select
                        value={newsPublished ? "published" : "draft"}
                        onValueChange={(v) => {
                          const pub = v === "published";
                          setNewsPublished(pub);
                          if (!pub) {
                            setNewsIsFeatured(false);
                            setNewsIsBanner(false);
                          }
                        }}
                      >
                        <SelectTrigger id="news-status" className="bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-background">
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="news-category">Category</Label>
                      <Input
                        id="news-category"
                        value={newsCategory}
                        onChange={(e) => setNewsCategory(e.target.value)}
                        placeholder="e.g. Product, Company"
                      />
                    </div>

                    <div>
                      <Label htmlFor="news-description">Description</Label>
                      <Textarea
                        id="news-description"
                        value={newsDescription}
                        onChange={(e) => setNewsDescription(e.target.value)}
                        placeholder="Short summary for the article (optional)"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="news-tags">Tags (comma-separated)</Label>
                      <Input
                        id="news-tags"
                        value={newsTags}
                        onChange={(e) => setNewsTags(e.target.value)}
                        placeholder="news, product, launch"
                      />
                    </div>

                    <div>
                      <Label htmlFor="news-excerpt">Excerpt (legacy / optional)</Label>
                      <Textarea
                        id="news-excerpt"
                        value={newsExcerpt}
                        onChange={(e) => setNewsExcerpt(e.target.value)}
                        placeholder="Optional; used if SEO description is empty"
                        rows={3}
                        maxLength={500}
                      />
                      <p className="text-xs text-muted-foreground">
                        {newsExcerpt.length}/500 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="news-content-md" className="mb-2 block">
                        Content (Markdown) *
                      </Label>
                      <Textarea
                        id="news-content-md"
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        placeholder="Write in Markdown…"
                        className="min-h-[min(50vh,420px)] font-mono text-sm leading-relaxed"
                        spellCheck={false}
                      />
                    </div>

                    <div>
                      <Label htmlFor="news-featured-image">Cover image</Label>
                      <Input
                        id="news-featured-image"
                        type="file"
                        accept="image/*"
                        onChange={handleFeaturedImageUpload}
                        disabled={uploadingFeaturedImage}
                      />
                      {uploadingFeaturedImage && (
                        <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
                      )}
                      {newsFeaturedImage && !uploadingFeaturedImage && (
                        <p className="mt-1 text-sm text-primary">✓ Image uploaded</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="news-author-name">Author Name</Label>
                        <Input
                          id="news-author-name"
                          value={newsAuthorName}
                          onChange={(e) => setNewsAuthorName(e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <Label htmlFor="news-author-designation">Author Designation</Label>
                        <Input
                          id="news-author-designation"
                          value={newsAuthorDesignation}
                          onChange={(e) => setNewsAuthorDesignation(e.target.value)}
                          placeholder="Product Manager"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Published Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !newsPublishedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newsPublishedDate ? format(newsPublishedDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={newsPublishedDate}
                            onSelect={setNewsPublishedDate}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-muted-foreground mt-1">
                        Set the date this news item should appear as published
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="news-featured"
                          checked={newsIsFeatured}
                          disabled={!newsPublished}
                          onCheckedChange={(checked) => setNewsIsFeatured(checked as boolean)}
                        />
                        <Label 
                          htmlFor="news-featured" 
                          className={`font-normal ${newsPublished ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                        >
                          Featured
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="news-banner"
                          checked={newsIsBanner}
                          disabled={!newsPublished}
                          onCheckedChange={(checked) => setNewsIsBanner(checked as boolean)}
                        />
                        <Label 
                          htmlFor="news-banner" 
                          className={`font-normal ${newsPublished ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                        >
                          Banner (Show as sticky banner on home page)
                        </Label>
                      </div>

                      {newsIsBanner && (
                        <div className="ml-6">
                          <Label htmlFor="news-banner-text">Banner Text *</Label>
                          <Input
                            id="news-banner-text"
                            value={newsBannerText}
                            onChange={(e) => setNewsBannerText(e.target.value)}
                            placeholder="🎉 New AI Feature Released!"
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            This text will appear in the banner. Only one news item can be a banner at a time.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="news-youtube-url">YouTube Video (Optional)</Label>
                      <Input
                        id="news-youtube-url"
                        value={newsYoutubeUrl}
                        onChange={(e) => setNewsYoutubeUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                      <p className="text-xs text-muted-foreground">
                        Paste a YouTube URL to embed the video at the top of the news article
                      </p>
                    </div>

                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        SEO settings
                      </h3>
                      <div>
                        <Label htmlFor="news-seo-title">SEO title</Label>
                        <Input
                          id="news-seo-title"
                          value={newsSeoTitle}
                          onChange={(e) => setNewsSeoTitle(e.target.value)}
                          placeholder="Overrides page title when set"
                        />
                      </div>
                      <div>
                        <Label htmlFor="news-seo-description">SEO description</Label>
                        <Textarea
                          id="news-seo-description"
                          value={newsSeoDescription}
                          onChange={(e) => setNewsSeoDescription(e.target.value)}
                          placeholder="Meta description"
                          rows={3}
                          maxLength={320}
                        />
                      </div>
                      <div>
                        <Label htmlFor="news-og-image">OG image URL</Label>
                        <Input
                          id="news-og-image"
                          value={newsOgImageUrl}
                          onChange={(e) => setNewsOgImageUrl(e.target.value)}
                          placeholder="https://…"
                        />
                      </div>
                      <div>
                        <Label htmlFor="news-seo-keywords">Keywords (comma-separated)</Label>
                        <Input
                          id="news-seo-keywords"
                          value={newsSeoKeywords}
                          onChange={(e) => setNewsSeoKeywords(e.target.value)}
                          placeholder="QApilot, mobile testing, news"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 border-t pt-6">
                      <div>
                        <Label className="text-base font-semibold">Social Media Embed (Optional)</Label>
                        <p className="text-sm text-muted-foreground mb-3">
                          Add a Twitter/X or LinkedIn post URL to embed at the end of the news article
                        </p>
                        <Input
                          value={newsSocialEmbedUrl}
                          onChange={(e) => setNewsSocialEmbedUrl(e.target.value)}
                          placeholder="https://twitter.com/user/status/123... or https://linkedin.com/posts/..."
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Supported: Twitter/X posts, LinkedIn posts
                        </p>
                      </div>

                      {newsSocialEmbedUrl && newsSocialEmbedUrl.includes('linkedin.com') && (
                        <div className="ml-4 space-y-4 border-l-2 border-primary/25 pl-4">
                          <p className="text-sm text-muted-foreground">
                            LinkedIn posts require manual entry of image and description (LinkedIn's API doesn't provide public access to this data)
                          </p>
                          <div>
                            <Label htmlFor="social-embed-image">Post Image</Label>
                            <Input
                              id="social-embed-image"
                              type="file"
                              accept="image/*"
                              onChange={handleSocialEmbedImageUpload}
                              disabled={uploadingSocialEmbedImage}
                            />
                            {uploadingSocialEmbedImage && (
                              <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
                            )}
                            {newsSocialEmbedImage && !uploadingSocialEmbedImage && (
                              <div className="mt-2">
                                <p className="mb-2 text-sm text-primary">✓ Image uploaded</p>
                                <img 
                                  src={newsSocialEmbedImage} 
                                  alt="Social embed preview" 
                                  className="max-w-xs rounded-lg border"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="social-embed-description">Post Description (Optional)</Label>
                            <Textarea
                              id="social-embed-description"
                              value={newsSocialEmbedDescription}
                              onChange={(e) => setNewsSocialEmbedDescription(e.target.value)}
                              placeholder="Brief description or excerpt from the LinkedIn post..."
                              rows={3}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 border-t pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-semibold">Backlinks</Label>
                          <p className="text-sm text-muted-foreground">
                            Add reference links with logos that appear at the bottom of the news article
                          </p>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={addBacklink}>
                          <Link className="w-4 h-4 mr-2" />
                          Add Backlink
                        </Button>
                      </div>

                      {backlinks.map((backlink, index) => (
                        <Card key={index} className="border border-border bg-muted/30">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                              <span className="text-sm font-medium text-muted-foreground">
                                Backlink {index + 1}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => removeBacklink(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            <div>
                              <Label>Header *</Label>
                              <Input
                                value={backlink.header}
                                onChange={(e) => updateBacklink(index, 'header', e.target.value)}
                                placeholder="e.g., Featured In, As Seen On, Partner"
                              />
                            </div>

                            <div>
                              <Label>Logo/Image *</Label>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleBacklinkLogoUpload(e, index)}
                                disabled={uploadingBacklinkLogo === index}
                              />
                              {uploadingBacklinkLogo === index && (
                                <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
                              )}
                              {backlink.logo_url && uploadingBacklinkLogo !== index && (
                                <div className="mt-2 flex items-center gap-2">
                                  <img 
                                    src={backlink.logo_url} 
                                    alt="Logo preview" 
                                    className="h-8 object-contain"
                                  />
                                  <span className="text-sm text-primary">✓ Logo uploaded</span>
                                </div>
                              )}
                            </div>

                            <div>
                              <Label>Description *</Label>
                              <Textarea
                                value={backlink.description}
                                onChange={(e) => updateBacklink(index, 'description', e.target.value)}
                                placeholder="Brief description of this reference"
                                rows={2}
                              />
                            </div>

                            <div>
                              <Label>Link URL (optional)</Label>
                              <Input
                                value={backlink.link_url || ''}
                                onChange={(e) => updateBacklink(index, 'link_url', e.target.value)}
                                placeholder="https://example.com"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {backlinks.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">
                          No backlinks added yet. Click "Add Backlink" to create one.
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={() => saveNewsMutation.mutate()}
                        disabled={!newsTitle || !newsSlug || !newsContent || saveNewsMutation.isPending}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {saveNewsMutation.isPending ? "Saving..." : "Save News Item"}
                      </Button>
                      <Button variant="outline" onClick={resetNewsForm}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="writers">
            <WritersCMS />
          </TabsContent>

          <TabsContent value="careers">
            <CareersCMS />
          </TabsContent>

          <TabsContent value="faqs">
            <FAQsCMS />
          </TabsContent>

          <TabsContent value="terms">
            <Card className="border border-border bg-card text-card-foreground shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="terms-title">Title</Label>
                  <Input
                    id="terms-title"
                    value={termsTitle}
                    onChange={(e) => setTermsTitle(e.target.value)}
                    placeholder="Terms of Service"
                  />
                </div>

                <div className="h-[600px] flex flex-col">
                  <Label className="mb-2">Content</Label>
                  <div className="flex-1 overflow-hidden">
                    <RichTextEditor
                      value={termsContent}
                      onChange={setTermsContent}
                      placeholder="Enter your terms and conditions content..."
                    />
                  </div>
                </div>

                <Button
                  onClick={() => saveTermsMutation.mutate()}
                  disabled={saveTermsMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveTermsMutation.isPending ? "Saving..." : "Save Terms & Conditions"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminPageShell>
  );
};

export default AdminClient;
