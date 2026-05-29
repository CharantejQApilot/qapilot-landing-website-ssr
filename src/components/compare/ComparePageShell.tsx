import type { Metadata } from "next";
import Footer from "@/components/Footer";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground } from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type ComparePageConfig = {
  path: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  heroId: string;
};

export function buildComparePageMetadata({
  path,
  title,
  description,
}: Pick<ComparePageConfig, "path" | "title" | "description">): Metadata {
  const canonicalUrl = `${SITE_BASE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonicalUrl,
      siteName: "QApilot",
      locale: "en_US",
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
    },
  };
}

type ComparePageShellProps = ComparePageConfig;

export default function ComparePageShell({
  path,
  breadcrumbLabel,
  eyebrow,
  title,
  description,
  heroId,
}: ComparePageShellProps) {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: breadcrumbLabel, path },
            ]),
          ),
        }}
      />

      <main>
        <section
          className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible border-b border-border/40"
          aria-labelledby={heroId}
        >
          <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />
          <div className="relative z-10 section-full py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-24">
            <div className="mx-auto max-w-6xl text-center">
              <div className="min-w-0">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
                  {eyebrow}
                </p>
                <h1 id={heroId} className={cn(marketingHeroH1Class, "mb-5 text-balance sm:mb-6 md:mb-8")}>
                  {title}
                </h1>
                <p className={cn(marketingHeroLeadClass, "mx-auto max-w-3xl text-pretty")}>{description}</p>
                <div className="mt-8 flex justify-center">
                  <BookDemoCtaButton />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
