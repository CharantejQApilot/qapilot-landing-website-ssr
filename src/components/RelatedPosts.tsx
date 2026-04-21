"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { getYouTubeThumbnail } from "@/utils/youtube";

export type RelatedPostItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_date: string | null;
  youtube_url: string | null;
};

interface RelatedPostsProps {
  posts: RelatedPostItem[] | null | undefined;
  basePath: string;
}

/** Renders server-fetched related posts; client boundary matches other card-based UI. */
const RelatedPosts = ({ posts, basePath }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        Read More...
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const yt =
            typeof post.youtube_url === "string" ? post.youtube_url : null;
          const imageSrc =
            post.featured_image ||
            (yt ? getYouTubeThumbnail(yt) : null);

          return (
            <Link
              key={post.id}
              href={`${basePath}/${post.slug}`}
              className="group"
            >
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {imageSrc && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={`${post.title} - QApilot`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={360}
                    />
                  </div>
                )}
                <CardContent className="p-5">
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedPosts;
