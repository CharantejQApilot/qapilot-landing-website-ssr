import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CompareHeroSection from "@/components/compare/CompareHeroSection";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";

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
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
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
        <CompareHeroSection
          heroId={heroId}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </main>

      <Footer />
    </div>
  );
}
