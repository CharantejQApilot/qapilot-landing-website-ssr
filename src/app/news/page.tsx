import type { Metadata } from "next";
import Link from "next/link";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";

export const metadata: Metadata = {
  title: "News & Updates - Mobile Testing Industry News",
  description:
    "Stay updated with the latest news, product updates, and industry insights from QApilot. Learn about new features, partnerships, and mobile testing trends.",
  keywords:
    "QApilot news, mobile testing updates, QA automation news, product updates, testing industry news",
  alternates: { canonical: `${SITE_BASE_URL}${PATHS.NEWS}` },
};

/** Always fetch from Supabase at request time — avoids empty static HTML from build-time snapshots. */
export const dynamic = "force-dynamic";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  author_name: string | null;
  author_designation: string | null;
  published_date: string | null;
}

export default async function NewsPage() {
  const supabase = tryCreateServerSupabaseClient();
  const { data } = supabase
    ? await supabase
        .from("news_updates")
        .select(
          "id, title, slug, excerpt, featured_image, author_name, author_designation, published_date"
        )
        .eq("published", true)
        .order("published_date", { ascending: false })
    : { data: null as null };

  const newsItems = (data as NewsItem[] | null) ?? [];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "QApilot News & Updates",
      description:
        "Stay updated with the latest news, product updates, and industry insights from QApilot.",
      url: `${SITE_BASE_URL}${PATHS.NEWS}`,
      publisher: { "@type": "Organization", name: "QApilot" },
    },
    buildBreadcrumbList([
      { name: "Home", path: PATHS.HOME },
      { name: "News", path: PATHS.NEWS },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MarketingPageShell background="hero">
        <div className="section-edge w-full py-24">
          <div className="section-full mx-auto max-w-7xl">
            <header className="mb-12 text-center">
              <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl mb-4 text-gradient">
                News &amp; Updates
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay up to date with the latest announcements and updates from
                QApilot
              </p>
            </header>

            {newsItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      {item.featured_image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={item.featured_image}
                            alt={`${item.title} - QApilot News`}
                            width={640}
                            height={360}
                            loading="lazy"
                            decoding="async"
                            style={{ aspectRatio: "16/9" }}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h2>
                        {item.excerpt && (
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {item.excerpt}
                          </p>
                        )}
                        {(item.author_name || item.published_date) && (
                          <div className="text-sm text-muted-foreground">
                            {item.author_name && (
                              <span>
                                {item.author_name}
                                {item.author_designation &&
                                  ` • ${item.author_designation}`}
                              </span>
                            )}
                            {item.published_date && (
                              <span className="block mt-1">
                                {new Date(
                                  item.published_date
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No news items available at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </MarketingPageShell>
    </>
  );
}
