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
import { publishedUrlPath } from "@/lib/qa-guide/urls";

export const revalidate = 120;

const canonicalUrl = `${SITE_BASE_URL}${PATHS.QA_GUIDE}`;

export const metadata: Metadata = {
  title: "QA Guide — Mobile Testing Guides & Checklists",
  description:
    "In-depth QA guides for mobile testing: Flutter, Appium, regression checklists, and fintech-ready patterns from the QApilot team.",
  alternates: { canonical: canonicalUrl },
};

const GUIDE_LIST_SELECT =
  "id, slug, title, excerpt, published_date, author_name";

export default async function QaGuideHubPage() {
  const supabase = tryCreateServerSupabaseClient();
  const { data: guides } = supabase
    ? await supabase
        .from("qa_guides")
        .select(GUIDE_LIST_SELECT)
        .eq("tier", "index_worthy")
        .eq("status", "published")
        .order("published_date", { ascending: false })
    : { data: null };

  const list = guides ?? [];

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

            {list.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center text-muted-foreground">
                <BookOpen className="mb-4 h-12 w-12 opacity-40" />
                <p>Guides will appear here after review and publish.</p>
              </div>
            ) : (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {list.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={publishedUrlPath(g.slug)}
                      className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
                    >
                      <h2 className="font-heading text-lg font-semibold group-hover:text-primary">
                        {g.title}
                      </h2>
                      {g.excerpt ? (
                        <p className="mt-3 line-clamp-4 flex-1 text-sm text-muted-foreground">
                          {g.excerpt}
                        </p>
                      ) : null}
                      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                        {g.author_name ? <span>{g.author_name}</span> : null}
                        {g.published_date ? (
                          <time
                            dateTime={g.published_date}
                            className={g.author_name ? "ml-auto" : ""}
                          >
                            {formatPublishedDate(g.published_date)}
                          </time>
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
