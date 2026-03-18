"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { getYouTubeThumbnail } from "@/utils/youtube";

const LabsFeaturedSection = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["labs-featured-blogs"],
    queryFn: async () => {
      const { data, error } = await (supabase
        .from("blogs")
        .select("id, title, slug, excerpt, featured_image, author_name, published_date, youtube_url")
        .eq("published", true) as any)
        .eq("is_labs_featured", true)
        .order("published_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-8 md:py-12 relative">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-primary">Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Projects born from hackathons, side experiments, and internal needs. Each one built to solve a real problem.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                <div className="md:w-1/2 h-56 md:h-64 bg-muted"></div>
                <div className="md:w-1/2 p-6 space-y-3 flex flex-col justify-center">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="text-center py-16 bg-card/30 border border-border/30 rounded-2xl">
            <FlaskConical size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">New experiments are brewing. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => {
              const isEven = index % 2 === 0;
              const imageSrc = post.featured_image || getYouTubeThumbnail(post.youtube_url!) || undefined;

              return (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col md:flex-row bg-card border border-border rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Thumbnail */}
                  <div className={`md:w-1/2 h-56 md:h-72 overflow-hidden ${!isEven ? "md:order-2" : ""}`}>
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={`${post.title} - QApilot Labs`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <FlaskConical size={48} className="text-muted-foreground opacity-30" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 p-6 md:p-10 flex flex-col justify-center ${!isEven ? "md:order-1" : ""}`}>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm md:text-base text-muted-foreground line-clamp-3 mb-5">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {post.author_name && <span className="font-medium">{post.author_name}</span>}
                      {post.author_name && post.published_date && <span className="opacity-40">·</span>}
                      {post.published_date && (
                        <span>{new Date(post.published_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LabsFeaturedSection;
