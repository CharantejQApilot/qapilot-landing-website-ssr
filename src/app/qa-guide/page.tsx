import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { formatPublishedDate } from "@/lib/format-published";
import { clusterHubPath, publishedUrlPath } from "@/lib/qa-guide/urls";

export const revalidate = 120;

const canonicalUrl = `${SITE_BASE_URL}${PATHS.QA_GUIDE}`;

export const metadata: Metadata = {
  title: "QA Guide — Mobile Testing Guides & Checklists",
  description:
    "In-depth QA guides for mobile testing: Flutter, Appium, regression checklists, and fintech-ready patterns from the QApilot team.",
  alternates: { canonical: canonicalUrl },
};

const GUIDE_LIST_SELECT =
  "id, slug, title, excerpt, featured_image, topic_cluster, published_date, author_name";

export default async function QaGuideHubPage() {
  const supabase = tryCreateServerSupabaseClient();
  const [{ data: guides }, { data: clusters }] = supabase
    ? await Promise.all([
        supabase
          .from("qa_guides")
          .select(GUIDE_LIST_SELECT)
          .eq("tier", "index_worthy")
          .eq("status", "published")
          .order("published_date", { ascending: false }),
        supabase
          .from("qa_guide_topic_clusters")
          .select("slug, title, description")
          .order("display_order", { ascending: true }),
      ])
    : [{ data: null }, { data: null }];

  const list = guides ?? [];
  const clusterList = clusters ?? [];

  const breadcrumb = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "QA Guide", path: PATHS.QA_GUIDE },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [breadcrumb] }),
        }}
      />
      <MarketingPageShell background="soft">
        <main className="w-full px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <header className="mb-12 text-center md:mb-16">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Resources
              </p>
              <h1 className={marketingHeroH1Class}>
                <span className="text-gradient">QA Guide</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Practical mobile testing guides — comparisons, checklists, and patterns for QA
                leaders and engineers.
              </p>
            </header>

            {clusterList.length > 0 ? (
              <section className="mb-14">
                <h2 className="mb-6 font-heading text-2xl font-semibold">Topics</h2>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {clusterList.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={clusterHubPath(c.slug)}
                        className="block rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
                      >
                        <h3 className="font-semibold text-foreground">{c.title}</h3>
                        {c.description ? (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {c.description}
                          </p>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {list.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center text-muted-foreground">
                <BookOpen className="mb-4 h-12 w-12 opacity-40" />
                <p>Guides will appear here after review and publish.</p>
              </div>
            ) : (
              <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {list.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={publishedUrlPath(g.topic_cluster, g.slug)}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
                    >
                      {g.featured_image ? (
                        <img
                          src={g.featured_image}
                          alt={g.title}
                          className="aspect-[16/9] w-full object-cover"
                          width={640}
                          height={360}
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex aspect-[16/9] items-center justify-center bg-muted">
                          <BookOpen className="h-10 w-10 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-xs font-medium uppercase text-primary">
                          {g.topic_cluster.replace(/-/g, " ")}
                        </p>
                        <h3 className="mt-2 font-heading text-lg font-semibold group-hover:text-primary">
                          {g.title}
                        </h3>
                        {g.excerpt ? (
                          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                            {g.excerpt}
                          </p>
                        ) : null}
                        {g.published_date ? (
                          <p className="mt-auto pt-4 text-xs text-muted-foreground">
                            {formatPublishedDate(g.published_date)}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
        <Footer />
      </MarketingPageShell>
    </>
  );
}
