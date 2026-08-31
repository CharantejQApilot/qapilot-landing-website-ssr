import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveSlugParam } from "@/lib/app-router-params";
import { CaseStudyArticle } from "@/components/case-studies/CaseStudyArticle";
import { CaseStudySoftGate } from "@/components/case-studies/CaseStudySoftGate";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import {
  CASE_STUDY_SLUGS,
  caseStudyPath,
  getCaseStudy,
} from "@/lib/case-studies-data";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = await resolveSlugParam(params);
  const study = getCaseStudy(slug);
  if (!study) return {};

  return buildStaticPageMetadata({
    title: study.seoTitle,
    description: study.seoDescription,
    path: caseStudyPath(study.slug),
    ogDescription: study.seoDescription,
    twitterDescription: study.seoDescription,
  });
}

export const revalidate = 3600;

export default async function CaseStudyPage({ params }: PageProps) {
  const slug = await resolveSlugParam(params);
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const path = caseStudyPath(study.slug);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline,
    description: study.seoDescription,
    url: `${SITE_BASE_URL}${path}`,
    about: {
      "@type": "Organization",
      name: study.clientName,
      url: study.clientUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "QApilot",
      url: SITE_BASE_URL,
    },
  };

  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Case studies", path: PATHS.CASE_STUDIES },
              { name: study.clientName, path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <CaseStudySoftGate study={study}>
        <CaseStudyArticle study={study} />
      </CaseStudySoftGate>
    </div>
  );
}
