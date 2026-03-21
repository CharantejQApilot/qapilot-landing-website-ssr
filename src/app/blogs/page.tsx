import type { Metadata } from "next";
import Link from "next/link";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { getYouTubeThumbnail } from "@/utils/youtube";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Mobile Testing Blog - Tips, Guides & Best Practices",
  description:
    "Expert insights on mobile app testing, QA automation, and test strategy. Learn best practices for iOS and Android testing from the QApilot team.",
  keywords:
    "mobile testing blog, QA best practices, test automation tips, mobile app testing guides, iOS testing, Android testing",
  alternates: { canonical: `${SITE_BASE_URL}${PATHS.BLOGS}` },
};

/** Always fetch from Supabase at request time — avoids empty static HTML from build-time snapshots. */
export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const supabase = tryCreateServerSupabaseClient();
  const { data: blogs } = supabase
    ? await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("published_date", { ascending: false })
    : { data: null as null };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "QApilot Blog",
      description:
        "Expert insights on mobile app testing, QA automation, and test strategy.",
      url: `${SITE_BASE_URL}${PATHS.BLOGS}`,
      publisher: { "@type": "Organization", name: "QApilot" },
    },
    buildBreadcrumbList([
      { name: "Home", path: PATHS.HOME },
      { name: "Blogs", path: PATHS.BLOGS },
    ]),
  ];

  const featuredBlogs = blogs?.filter((b) => b.is_featured) ?? [];
  const regularBlogs = blogs?.filter((b) => !b.is_featured) ?? [];
  const isSingleFeatured = featuredBlogs.length === 1;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-background dark relative">
        <div className="absolute inset-0 glow-bg"></div>
        <div className="absolute right-0 top-1/4 w-64 h-64 md:w-96 md:h-96 opacity-20" aria-hidden="true">
          <div className="absolute inset-0 border border-primary/20 rounded-full"></div>
          <div className="absolute inset-2 md:inset-4 border border-primary/20 rounded-full"></div>
          <div className="absolute inset-4 md:inset-8 border border-primary/20 rounded-full"></div>
          <div className="absolute inset-6 md:inset-12 border border-primary/20 rounded-full"></div>
        </div>

        <div className="relative z-10">
          <main className="container mx-auto px-4 py-20">
            <header className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">
                  Mobile Testing Insights &amp; Best Practices
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Expert guides, tips, and strategies for mobile app testing and
                QA automation
              </p>
            </header>

            {blogs && blogs.length > 0 ? (
              <>
                {/* Featured Blogs */}
                {featuredBlogs.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8 justify-center">
                      <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gradient">
                        Featured Posts
                      </h2>
                      <div className="h-1 w-12 bg-gradient-to-l from-primary to-primary/50 rounded-full"></div>
                    </div>
                    <div
                      className={
                        isSingleFeatured
                          ? "max-w-4xl mx-auto"
                          : "grid grid-cols-1 lg:grid-cols-2 gap-8"
                      }
                    >
                      {featuredBlogs.map((blog) => (
                        <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                          <Card
                            className={`hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-2 border-primary/20 hover:border-primary/40 overflow-hidden group ${
                              isSingleFeatured
                                ? "shadow-2xl border-primary/30"
                                : ""
                            }`}
                          >
                            {(blog.featured_image || blog.youtube_url) && (
                              <div
                                className={`w-full overflow-hidden ${
                                  isSingleFeatured
                                    ? "aspect-[21/9]"
                                    : "aspect-video"
                                }`}
                                style={{
                                  minHeight: isSingleFeatured ? "200px" : "180px",
                                }}
                              >
                                <img
                                  src={
                                    blog.featured_image ||
                                    getYouTubeThumbnail(blog.youtube_url!) ||
                                    undefined
                                  }
                                  alt={`${blog.title} - QApilot Blog`}
                                  width={isSingleFeatured ? 1200 : 640}
                                  height={isSingleFeatured ? 514 : 360}
                                  loading="lazy"
                                  decoding="async"
                                  style={{
                                    aspectRatio: isSingleFeatured
                                      ? "21/9"
                                      : "16/9",
                                  }}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            <CardHeader
                              className={
                                isSingleFeatured ? "space-y-4 p-8" : "space-y-3"
                              }
                            >
                              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                FEATURED
                              </div>
                              <CardTitle
                                className={`line-clamp-2 group-hover:text-primary transition-colors ${
                                  isSingleFeatured
                                    ? "text-3xl md:text-4xl lg:text-5xl"
                                    : "text-2xl md:text-3xl"
                                }`}
                              >
                                {blog.title}
                              </CardTitle>
                              {blog.excerpt && (
                                <CardDescription
                                  className={`text-base ${
                                    isSingleFeatured
                                      ? "line-clamp-4 text-lg"
                                      : "line-clamp-3"
                                  }`}
                                >
                                  {blog.excerpt}
                                </CardDescription>
                              )}
                            </CardHeader>
                            <CardContent
                              className={isSingleFeatured ? "p-8 pt-0" : ""}
                            >
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div>
                                  {blog.author_name && (
                                    <p className="font-medium text-foreground">
                                      {blog.author_name}
                                    </p>
                                  )}
                                  {blog.author_designation && (
                                    <p>{blog.author_designation}</p>
                                  )}
                                </div>
                                {blog.published_date && (
                                  <p>
                                    {format(
                                      new Date(blog.published_date),
                                      "MMM dd, yyyy"
                                    )}
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Blogs */}
                {regularBlogs.length > 0 && (
                  <div>
                    {featuredBlogs.length > 0 && (
                      <div className="flex items-center gap-3 mb-8">
                        <div className="h-1 w-12 bg-gradient-to-r from-muted to-muted/50 rounded-full"></div>
                        <h2 className="text-2xl md:text-3xl font-bold">
                          All Posts
                        </h2>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {regularBlogs.map((blog) => (
                        <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            {(blog.featured_image || blog.youtube_url) && (
                              <div
                                className="aspect-video w-full overflow-hidden rounded-t-lg"
                                style={{ minHeight: "180px" }}
                              >
                                <img
                                  src={
                                    blog.featured_image ||
                                    getYouTubeThumbnail(blog.youtube_url!) ||
                                    undefined
                                  }
                                  alt={`${blog.title} - QApilot Blog`}
                                  width={640}
                                  height={360}
                                  loading="lazy"
                                  decoding="async"
                                  style={{ aspectRatio: "16/9" }}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <CardHeader>
                              <CardTitle className="line-clamp-2">
                                {blog.title}
                              </CardTitle>
                              {blog.excerpt && (
                                <CardDescription className="line-clamp-3">
                                  {blog.excerpt}
                                </CardDescription>
                              )}
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div>
                                  {blog.author_name && (
                                    <p className="font-medium text-foreground">
                                      {blog.author_name}
                                    </p>
                                  )}
                                  {blog.author_designation && (
                                    <p>{blog.author_designation}</p>
                                  )}
                                </div>
                                {blog.published_date && (
                                  <p>
                                    {format(
                                      new Date(blog.published_date),
                                      "MMM dd, yyyy"
                                    )}
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-foreground">
                  No blog posts yet
                </h2>
                <p className="text-muted-foreground">
                  Check back soon for new content
                </p>
              </div>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
