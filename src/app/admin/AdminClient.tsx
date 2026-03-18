"use client";
import { useState, useEffect } from "react";
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
import { Trash2, Edit, LogOut, Plus, Save, X, Link, CalendarIcon } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import CareersCMS from "@/components/admin/CareersCMS";
import FAQsCMS from "@/components/admin/FAQsCMS";
import WritersCMS from "@/components/admin/WritersCMS";
import type { User } from "@supabase/supabase-js";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  published: boolean;
  is_featured: boolean;
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
  created_at: string;
  updated_at: string;
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

  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth");
        return;
      }

      setUser(session.user);

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

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
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

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
  });

  const saveNewsMutation = useMutation({
    mutationFn: async () => {
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
      };

      let newsId = editingNewsId;

      if (editingNewsId) {
        const { error } = await supabase
          .from("news_updates")
          .update(newsData)
          .eq("id", editingNewsId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("news_updates").insert(newsData).select("id").single();
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
    setNewsSocialEmbedImage((news as any).social_embed_image || "");
    setNewsSocialEmbedDescription((news as any).social_embed_description || "");
    setNewsPublishedDate(news.published_date ? new Date(news.published_date) : undefined);
    setNewsYoutubeUrl((news as any).youtube_url || "");
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
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
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
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      });
    } finally {
      setUploadingBacklinkLogo(null);
    }
  };

  const saveBacklinks = async (newsId: string) => {
    await supabase.from("news_backlinks").delete().eq("news_id", newsId);
    
    const validBacklinks = backlinks.filter(b => b.header && b.logo_url);
    if (validBacklinks.length > 0) {
      const { error } = await supabase.from("news_backlinks").insert(
        validBacklinks.map(b => ({
          news_id: newsId,
          header: b.header,
          logo_url: b.logo_url,
          description: b.description,
          link_url: b.link_url || null,
        }))
      );
      if (error) throw error;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const saveTermsMutation = useMutation({
    mutationFn: async () => {
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
        const { error } = await supabase
          .from("terms_content")
          .insert(termsData);
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
  });

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (loading || blogsLoading) {
    return (
      <div className="min-h-screen bg-background dark flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark relative">
      <div className="absolute inset-0 glow-bg"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gradient">Admin Panel</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="news">News & Updates</TabsTrigger>
            <TabsTrigger value="writers">Writers</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            <div className="flex justify-end mb-4">
              <Button onClick={() => router.push("/admin/editor")}>
                <Plus className="w-4 h-4 mr-2" />
                New Blog
              </Button>
            </div>
            
            <div className="grid gap-4">
              {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                  <Card key={blog.id} className="border-border/50 bg-card/95 backdrop-blur">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
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
                <Card className="border-border/50 bg-card/95 backdrop-blur">
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
                  <Button onClick={() => setIsEditingNews(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New News Item
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {newsItems && newsItems.length > 0 ? (
                    newsItems.map((news) => (
                      <Card key={news.id} className="border-border/50 bg-card/95 backdrop-blur">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
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
                                  <span className="text-xs bg-purple-500/20 text-purple-500 px-2 py-1 rounded">
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
                    <Card className="border-border/50 bg-card/95 backdrop-blur">
                      <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground">No news items yet. Create your first one!</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            ) : (
              <Card className="border-border/50 bg-card/95 backdrop-blur">
                <CardContent className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
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
                      <Label htmlFor="news-excerpt">SEO Meta Description</Label>
                      <Textarea
                        id="news-excerpt"
                        value={newsExcerpt}
                        onChange={(e) => setNewsExcerpt(e.target.value)}
                        placeholder="Write a compelling meta description for search engines (150-160 characters recommended)"
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">
                        {newsExcerpt.length}/160 characters
                      </p>
                    </div>

                    <div className="h-[500px] flex flex-col">
                      <Label className="mb-2">Content * (~500 words)</Label>
                      <div className="flex-1 overflow-hidden">
                        <RichTextEditor
                          value={newsContent}
                          onChange={setNewsContent}
                          placeholder="Write your news content here..."
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="news-featured-image">Featured Image</Label>
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
                        <p className="text-sm text-green-600 mt-1">✓ Image uploaded</p>
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
                          id="news-published"
                          checked={newsPublished}
                          onCheckedChange={(checked) => {
                            const isChecked = checked as boolean;
                            setNewsPublished(isChecked);
                            if (!isChecked) {
                              setNewsIsFeatured(false);
                              setNewsIsBanner(false);
                            }
                          }}
                        />
                        <Label htmlFor="news-published" className="font-normal cursor-pointer">
                          Published
                        </Label>
                      </div>

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
                          Featured (Show in "What's New?" section on home page)
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
                        <div className="space-y-4 ml-4 pl-4 border-l-2 border-[#0A66C2]/30">
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
                                <p className="text-sm text-green-600 mb-2">✓ Image uploaded</p>
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
                        <Card key={index} className="border-border/30 bg-background/50">
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
                                  <span className="text-sm text-green-600">✓ Logo uploaded</span>
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
            <Card className="border-border/50 bg-card/95 backdrop-blur">
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
    </div>
  );
};

export default AdminClient;
