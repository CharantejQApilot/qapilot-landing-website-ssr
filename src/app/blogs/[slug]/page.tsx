import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import WriterCard from "@/components/WriterCard";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SafeHtmlContent from "@/components/SafeHtmlContent";
import RelatedPosts from "@/components/RelatedPosts";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = createServerSupabaseClient();
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  const description =
    blog.excerpt ||
    `Read ${blog.title} on the QApilot blog. Expert insights on mobile app testing and QA automation.`;

  return {
    title: blog.title,
    description,
    keywords:
      "mobile app testing, QA automation, test automation, mobile testing best practices",
    alternates: {
      canonical: `${SITE_BASE_URL}${PATHS.BLOGS}/${blog.slug}`,
    },
    openGraph: {
      type: "article",
      title: blog.title,
      description,
      url: `${SITE_BASE_URL}${PATHS.BLOGS}/${blog.slug}`,
      ...(blog.featured_image && {
        images: [{ url: blog.featured_image, width: 1200, height: 630 }],
      }),
      publishedTime: blog.published_date || undefined,
      authors: blog.author_name ? [blog.author_name] : undefined,
      tags: ["Mobile Testing", "QA Automation", "Test Automation"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      ...(blog.featured_image && { images: [blog.featured_image] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createServerSupabaseClient();

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!blog) {
    notFound();
  }

  let writer = null;
  if (blog.writer_id) {
    const { data } = await supabase
      .from("writers")
      .select("*")
      .eq("id", blog.writer_id)
      .single();
    writer = data;
  }

  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "Blogs", path: PATHS.BLOGS },
    { name: blog.title, path: `${PATHS.BLOGS}/${blog.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <div className="min-h-screen bg-background dark relative">
        <div className="absolute inset-0 glow-bg"></div>

        <div className="relative z-10">
          <main className="container mx-auto px-4 py-20 max-w-6xl">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>

            {blog.featured_image && !blog.youtube_url && (
              <div className="w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={blog.featured_image}
                  alt={`${blog.title} - QApilot Blog`}
                  className="w-full h-auto object-contain"
                  width={1200}
                  height={630}
                  loading="eager"
                  style={{ aspectRatio: "1200/630" }}
                />
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-xl text-muted-foreground mb-8">
                {blog.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
              <div>
                {blog.author_name && (
                  <p className="font-semibold text-foreground">
                    {blog.author_name}
                  </p>
                )}
                {blog.author_designation && (
                  <p className="text-sm text-muted-foreground">
                    {blog.author_designation}
                  </p>
                )}
              </div>
              {blog.published_date && (
                <span className="text-sm text-muted-foreground ml-auto">
                  {format(new Date(blog.published_date), "MMMM dd, yyyy")}
                </span>
              )}
            </div>

            {blog.youtube_url && <YouTubeEmbed url={blog.youtube_url} />}

            <SafeHtmlContent
              html={blog.content || ""}
              className="blog-content max-w-none"
            />

            {writer && (
              <WriterCard
                name={writer.name}
                designation={writer.designation}
                description={writer.description}
                linkedinUrl={writer.linkedin_url}
                profileImage={writer.profile_image}
              />
            )}

            {blog && <RelatedPosts currentId={blog.id} type="blog" />}
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
