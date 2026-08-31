import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { PATHS, QE_GUIDE_DISPLAY_NAME } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell, MarketingThesisHero } from "@/components/marketing";
import { formatPublishedDate } from "@/lib/format-published";
import { publishedUrlPath } from "@/lib/qa-guide/urls";

export const revalidate = 120;

const QA_GUIDE_PATH = PATHS.QA_GUIDE;
const canonicalUrl = `${SITE_BASE_URL}${QA_GUIDE_PATH}`;
const LIST_MAX_WIDTH = "mx-auto max-w-[1920px]";

const QE_GUIDE_HUB_TITLE = "QA Guide. Mobile Testing Guides & Checklists";
const QE_GUIDE_HUB_DESCRIPTION =
  "In-depth QA and QE guides for mobile testing: Flutter, Appium, regression checklists, and fintech-ready patterns from QApilot practitioners.";

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
    images: [
      { url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt },
    ],
  },
};

const GUIDE_LIST_SELECT =
  "id, slug, title, excerpt, published_date, author_name";

type GuideListRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  published_date: string | null;
  author_name: string | null;
};

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

  const list = (guides as GuideListRow[] | null) ?? [];

  const breadcrumb = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: QE_GUIDE_DISPLAY_NAME, path: QA_GUIDE_PATH },
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

  const gridAll =
    "mx-auto grid w-full max-w-7xl list-none gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <MarketingPageShell background="none">
        <main className="relative w-full">
          <MarketingThesisHero
            titleId="qa-guide-hero"
            eyebrow="Resources"
            title={QE_GUIDE_DISPLAY_NAME}
            lead="Practical mobile testing guides. Comparisons, checklists, and patterns for QE leaders and engineers."
          />

          <div className="section-full home-canvas py-14 md:py-20">
            <div className={LIST_MAX_WIDTH}>
              <section
                aria-labelledby="qa-guide-intro"
                className="mb-14 w-full text-left md:mb-16"
              >
                <h2
                  id="qa-guide-intro"
                  className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl"
                >
                  In-depth QA guides for mobile release teams
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  <p>
                    The QApilot QA Guide library collects long-form references on
                    testing types, banking and Flutter scenarios, automation
                    strategy, and release checklists. Each guide is written for
                    practitioners who need actionable steps, not generic
                    definitions.
                  </p>
                  <p>
                    Use these resources alongside the QApilot platform to plan
                    coverage, evaluate tooling, and align QA with product and
                    engineering stakeholders. New guides are published after
                    editorial review.
                  </p>
                </div>
              </section>

              {list.length === 0 ? (
                <div className="flex flex-col items-center py-24 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-md border border-border bg-card">
                    <BookOpen
                      className="h-10 w-10 text-muted-foreground"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    No guides yet
                  </h2>
                  <p className="mt-2 max-w-md text-muted-foreground">
                    Guides will appear here after review and publish.
                  </p>
                </div>
              ) : (
                <section aria-labelledby="qa-guide-all">
                  <div className="mb-8 flex flex-col items-start gap-2 text-left md:mb-12">
                    <h2
                      id="qa-guide-all"
                      className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                    >
                      All guides
                    </h2>
                    <p className="w-full text-left text-base text-muted-foreground md:text-lg">
                      Browse every published guide.
                    </p>
                  </div>
                  <ul className={gridAll}>
                    {list.map((guide) => {
                      const dateLabel = formatPublishedDate(
                        guide.published_date,
                        "MMM d, yyyy",
                      );
                      return (
                        <li key={guide.id}>
                          <Link
                            href={publishedUrlPath(guide.slug)}
                            className="group block h-full rounded-md border border-border bg-card outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <article className="flex h-full flex-col gap-2 p-6 sm:gap-3 sm:p-7 md:p-8">
                              {dateLabel ? (
                                <time
                                  dateTime={guide.published_date ?? undefined}
                                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                                >
                                  {dateLabel}
                                </time>
                              ) : null}
                              <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary md:text-xl">
                                {guide.title}
                              </h3>
                              {guide.excerpt ? (
                                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                  {guide.excerpt}
                                </p>
                              ) : null}
                              {guide.author_name ? (
                                <div className="mt-3 text-sm text-muted-foreground">
                                  <p className="font-medium text-foreground">
                                    {guide.author_name}
                                  </p>
                                </div>
                              ) : null}
                            </article>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </main>
      </MarketingPageShell>
    </>
  );
}
