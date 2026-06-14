import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { PATHS, QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { formatPublishedDate } from "@/lib/format-published";
import { publishedUrlPath } from "@/lib/qa-guide/urls";

export const revalidate = 120;

const canonicalUrl = `${SITE_BASE_URL}${PATHS.QA_GUIDE}`;

const QE_GUIDE_HUB_TITLE = "QA Guide — Mobile Testing Guides & Checklists";
const QE_GUIDE_HUB_DESCRIPTION =
  "In-depth QA and QE guides for mobile testing: Flutter, Appium, regression checklists, and fintech-ready patterns from the QApilot team.";

export const metadata: Metadata = {
  title: QE_GUIDE_HUB_TITLE,
  description: QE_GUIDE_HUB_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: `${QE_GUIDE_HUB_TITLE} | QApilot`,
    description: QE_GUIDE_HUB_DESCRIPTION,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${QE_GUIDE_HUB_TITLE} | QApilot`,
    description: QE_GUIDE_HUB_DESCRIPTION,
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

const GUIDE_LIST_SELECT =
  "id, slug, title, excerpt, published_date, author_name";

function stripJsonLdContext(node: object): Record<string, unknown> {
  const o = { ...(node as Record<string, unknown>) };
  delete o["@context"];
  return o;
}

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
    { name: QE_GUIDE_DISPLAY_NAME, path: PATHS.QA_GUIDE },
  ]);

  const itemListElements =
    list.length > 0
      ? list.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: g.title,
          item: `${SITE_BASE_URL}${publishedUrlPath(g.slug)}`,
        }))
      : undefined;

  const collectionPage: Record<string, unknown> = {
    "@type": "CollectionPage",
    name: `QApilot ${QE_GUIDE_DISPLAY_NAME}`,
    description: QE_GUIDE_HUB_DESCRIPTION,
    url: canonicalUrl,
    publisher: { "@type": "Organization", name: "QApilot" },
  };
  if (itemListElements) {
    collectionPage.mainEntity = {
      "@type": "ItemList",
      numberOfItems: itemListElements.length,
      itemListElement: itemListElements,
    };
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [collectionPage, stripJsonLdContext(breadcrumb)],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
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
                <span className="text-gradient">{QE_GUIDE_DISPLAY_NAME}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Practical mobile testing guides — comparisons, checklists, and patterns for QE
                leaders and engineers.
              </p>
            </header>

            <section
              aria-labelledby="qa-guide-intro"
              className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
            >
              <h2
                id="qa-guide-intro"
                className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl"
              >
                In-depth QA guides for mobile release teams
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  The QApilot QA Guide library collects long-form references on testing types,
                  banking and Flutter scenarios, automation strategy, and release checklists. Each
                  guide is written for practitioners who need actionable steps, not generic
                  definitions.
                </p>
                <p>
                  Use these resources alongside the QApilot platform to plan coverage, evaluate
                  tooling, and align QA with product and engineering stakeholders. New guides are
                  published after editorial review.
                </p>
              </div>
            </section>

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
      </MarketingPageShell>
    </>
  );
}
