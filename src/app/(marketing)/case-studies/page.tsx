import type { Metadata } from "next";
import { CaseStudiesIndex } from "@/components/case-studies/CaseStudiesIndex";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";

const path = PATHS.CASE_STUDIES;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Case Studies. Mobile Testing Customer Stories",
  description:
    "How QApilot helped Wio, Geml, and GrowSari automate complex mobile journeys: Flutter banking, dating-app sanity, and OTP-gated B2B commerce.",
  path,
  ogDescription:
    "Customer stories from Wio, Geml, and GrowSari: evidenced mobile automation coverage where generic tools stall.",
  twitterDescription:
    "Wio, Geml, and GrowSari case studies: Flutter banking, dating-app sanity, and B2B commerce automation with QApilot.",
});

export const revalidate = 3600;

export default function CaseStudiesPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Case studies", path },
            ]),
          ),
        }}
      />
      <CaseStudiesIndex />
    </div>
  );
}
