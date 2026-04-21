import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import { getYouTubeThumbnail } from "@/utils/youtube";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";
import { marketingHeroH1Class } from "@/lib/marketing-typography";

const CASE_STUDIES_PATH = PATHS.CASE_STUDIES;
const canonicalUrl = `${SITE_BASE_URL}${CASE_STUDIES_PATH}`;

const CASE_STUDY_LIST_SELECT =
  "id, slug, title, excerpt, featured_image, youtube_url, author_name, author_designation, published_date, is_featured";

/** Match /blogs gutter rhythm so the two listings feel like siblings. */
const CASE_STUDIES_GUTTER =
  "w-full px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-10";

const CASE_STUDIES_MAX_WIDTH = "mx-auto max-w-[1920px]";

export const metadata: Metadata = {
  title: "Case Studies - Customer Stories & Outcomes",
  description:
    "Real-world results from teams using QApilot to ship faster with fewer regressions. Customer stories, outcomes, and lessons from mobile QA programs.",
  keywords: [
    "QApilot case studies",
    "mobile testing case studies",
    "QA automation customer stories",
    "test automation results",
    "mobile app testing outcomes",
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Case Studies - Customer Stories & Outcomes | QApilot",
    description:
      "Real-world results from teams using QApilot to ship faster with fewer regressions.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies - Customer Stories & Outcomes | QApilot",
    description:
      "Customer stories and outcomes from mobile QA programs powered by QApilot.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 120;

type CaseStudyListRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  youtube_url: string | null;
  author_name: string | null;
  author_designation: string | null;
  published_date: string | null;
  is_featured: boolean | null;
};

function resolveCardImageUrl(item: CaseStudyListRow): string | undefined {
  if (item.featured_image) return item.featured_image;
  if (item.youtube_url) return getYouTubeThumbnail(item.youtube_url) ?? undefined;
  return undefined;
}

function stripJsonLdContext(node: object): Record<string, unknown> {
  const o = { ...(node as Record<string, unknown>) };
  delete o["@context"];
  return o;
}

function CaseStudyImagePlaceholder() {
  return (
    <div
      className="flex h-full min-h-[12rem] w-full items-center justify-center bg-muted text-muted-foreground"
      aria-hidden
    >
      <FileText className="h-12 w-12 opacity-40" strokeWidth={1.25} />
    </div>
  );
}

export default async function CaseStudiesPage() {
  const supabase = tryCreateServerSupabaseClient();
  const { data: caseStudies } = supabase
    ? await supabase
        .from("case_studies")
        .select(CASE_STUDY_LIST_SELECT)
        .eq("published", true)
        .order("published_date", { ascending: false })
    : { data: null as null };

  const list = (caseStudies as CaseStudyListRow[] | null) ?? [];

  const itemListElements =
    list.length > 0
      ? list.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          item: `${SITE_BASE_URL}${CASE_STUDIES_PATH}/${c.slug}`,
        }))
      : undefined;

  const collectionPage: Record<string, unknown> = {
    "@type": "CollectionPage",
    name: "QApilot Case Studies",
    description:
      "Customer stories and outcomes from teams shipping mobile apps with QApilot.",
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
    "@graph": [
      collectionPage,
      stripJsonLdContext(
        buildBreadcrumbList([
          { name: "Home", path: PATHS.HOME },
          { name: "Case Studies", path: CASE_STUDIES_PATH },
        ]),
      ),
    ],
  };

  const featuredItems = list.filter((c) => c.is_featured);
  const regularItems = list.filter((c) => !c.is_featured);
  const singleFeatured = featuredItems.length === 1;

  /** Mirrors /blogs grid rhythm so cards stay visually consistent across sections. */
  const gridFeatured = singleFeatured
    ? "mx-auto grid w-full max-w-4xl list-none grid-cols-1 gap-8 sm:gap-10 xl:max-w-5xl"
    : "mx-auto grid w-full max-w-7xl list-none grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:justify-items-stretch xl:gap-12 [&>li:last-child:nth-child(odd)]:md:col-span-2 [&>li:last-child:nth-child(odd)]:md:max-w-3xl [&>li:last-child:nth-child(odd)]:md:justify-self-center [&>li:last-child:nth-child(odd)]:md:w-full";

  const gridAll =
    "mx-auto grid w-full max-w-7xl list-none gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MarketingPageShell background="none">
        <main className="relative w-full">
          <div className="w-full border-b border-border bg-gradient-to-b from-primary-light/50 via-background to-background bg-dot-pattern-subtle">
            <div className={`${CASE_STUDIES_GUTTER}`}>
              <div className={`${CASE_STUDIES_MAX_WIDTH} py-16 md:py-24 lg:py-28 2xl:py-32`}>
                <header className="relative mx-auto max-w-6xl text-center sm:max-w-none lg:max-w-7xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:mb-5">
                    QApilot case studies
                  </p>
                  <h1 className={marketingHeroH1Class}>
                    <span className="text-gradient">
                      Real outcomes from mobile QA teams
                    </span>
                  </h1>
                  <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:mt-10 md:text-xl lg:text-2xl lg:leading-relaxed">
                    Customer stories that show what changes when AI-driven testing
                    plugs into a real release process.
                  </p>
                </header>
              </div>
            </div>
          </div>

          <div className={`bg-background ${CASE_STUDIES_GUTTER} py-14 md:py-20`}>
            <div className={`${CASE_STUDIES_MAX_WIDTH} bg-dot-pattern-subtle`}>
              {list.length === 0 ? (
                <div className="flex flex-col items-center py-24 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                    <FileText
                      className="h-10 w-10 text-muted-foreground"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    No case studies yet
                  </h2>
                  <p className="mt-2 max-w-md text-muted-foreground">
                    New customer stories will appear here soon.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
                  {featuredItems.length > 0 ? (
                    <section
                      aria-labelledby="case-studies-featured"
                      className="flex flex-col items-center"
                    >
                      <div className="mb-8 flex w-full max-w-3xl flex-col items-center gap-2 text-center md:mb-12">
                        <h2
                          id="case-studies-featured"
                          className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                        >
                          Featured
                        </h2>
                        <p className="text-base text-muted-foreground md:text-lg">
                          Hand-picked stories with the strongest outcomes.
                        </p>
                      </div>
                      <ul className={gridFeatured}>
                        {featuredItems.map((item, index) => {
                          const imgSrc = resolveCardImageUrl(item);
                          return (
                            <li key={item.id}>
                              <Link
                                href={`${CASE_STUDIES_PATH}/${item.slug}`}
                                className="group block h-full rounded-2xl border-2 border-primary/15 bg-card shadow-md outline-none ring-offset-background transition-shadow hover:border-primary/25 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <article className="flex h-full flex-col overflow-hidden rounded-2xl">
                                  <div className="relative aspect-[16/9] w-full min-h-[200px] shrink-0 bg-muted sm:min-h-[220px] md:aspect-[2/1] md:min-h-[240px]">
                                    {imgSrc ? (
                                      <img
                                        src={imgSrc}
                                        alt={`${item.title} — QApilot case study`}
                                        width={960}
                                        height={540}
                                        loading={
                                          index === 0 ? "eager" : "lazy"
                                        }
                                        fetchPriority={
                                          index === 0 ? "high" : undefined
                                        }
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <CaseStudyImagePlaceholder />
                                    )}
                                  </div>
                                  <div className="flex flex-1 flex-col gap-4 p-7 sm:gap-5 sm:p-9 md:p-10 lg:p-11">
                                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary sm:text-sm">
                                      <span>Featured</span>
                                      {item.published_date ? (
                                        <span className="text-muted-foreground">
                                          {format(
                                            new Date(item.published_date),
                                            "MMMM d, yyyy",
                                          )}
                                        </span>
                                      ) : null}
                                    </div>
                                    <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary sm:text-2xl md:text-3xl xl:text-4xl xl:leading-tight">
                                      {item.title}
                                    </h3>
                                    {item.excerpt ? (
                                      <p className="line-clamp-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                                        {item.excerpt}
                                      </p>
                                    ) : null}
                                    <div className="mt-auto border-t border-border pt-5 text-sm text-muted-foreground md:text-base">
                                      {item.author_name ? (
                                        <p className="font-medium text-foreground">
                                          {item.author_name}
                                        </p>
                                      ) : null}
                                      {item.author_designation ? (
                                        <p>{item.author_designation}</p>
                                      ) : null}
                                    </div>
                                  </div>
                                </article>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ) : null}

                  {regularItems.length > 0 ? (
                    <section
                      aria-labelledby="case-studies-all"
                      className="border-t border-border pt-16 md:pt-20"
                    >
                      <div className="mb-8 flex flex-col items-center gap-2 text-center md:mb-12">
                        <h2
                          id="case-studies-all"
                          className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                        >
                          {featuredItems.length > 0 ? "All case studies" : "Case studies"}
                        </h2>
                        <p className="mx-auto max-w-2xl text-center text-base text-muted-foreground md:text-lg">
                          Browse every published customer story.
                        </p>
                      </div>
                      <ul className={gridAll}>
                        {regularItems.map((item) => {
                          const imgSrc = resolveCardImageUrl(item);
                          return (
                            <li key={item.id}>
                              <Link
                                href={`${CASE_STUDIES_PATH}/${item.slug}`}
                                className="group block h-full rounded-2xl border border-border bg-card outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <article className="flex h-full flex-col overflow-hidden rounded-2xl">
                                  <div className="relative aspect-[16/9] w-full shrink-0 bg-muted">
                                    {imgSrc ? (
                                      <img
                                        src={imgSrc}
                                        alt={`${item.title} — QApilot case study`}
                                        width={800}
                                        height={450}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <CaseStudyImagePlaceholder />
                                    )}
                                  </div>
                                  <div className="flex flex-1 flex-col gap-2 p-6 sm:gap-3 sm:p-7 md:p-8">
                                    {item.published_date ? (
                                      <time
                                        dateTime={item.published_date}
                                        className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                                      >
                                        {format(
                                          new Date(item.published_date),
                                          "MMM d, yyyy",
                                        )}
                                      </time>
                                    ) : null}
                                    <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary md:text-xl">
                                      {item.title}
                                    </h3>
                                    {item.excerpt ? (
                                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {item.excerpt}
                                      </p>
                                    ) : null}
                                    <div className="mt-3 text-sm text-muted-foreground">
                                      {item.author_name ? (
                                        <p className="font-medium text-foreground">
                                          {item.author_name}
                                        </p>
                                      ) : null}
                                      {item.author_designation ? (
                                        <p>{item.author_designation}</p>
                                      ) : null}
                                    </div>
                                  </div>
                                </article>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </MarketingPageShell>
    </>
  );
}
