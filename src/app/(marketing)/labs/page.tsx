import type { Metadata } from "next";
import LabsHeroSection from "@/components/LabsHeroSection";
import LabsMobileAgentsToolsSection from "@/components/LabsMobileAgentsToolsSection";
import WhyLabsSection from "@/components/WhyLabsSection";
import LabsProcessSection from "@/components/LabsProcessSection";
import LabsTeamSection from "@/components/LabsTeamSection";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Labs. Experiments, Tools & Ideas Shipped Fast",
  description:
    "QApilot Labs ships AI-native experiments and tools from hackathons and real-world testing needs. Explore what we build at the edge of mobile QA.",
  path: PATHS.LABS,
  ogDescription:
    "Experiments and tools exploring AI-native development and testing.",
  twitterDescription:
    "Tools and ideas shipped fast from hackathons and real-world needs.",
});

export const revalidate = 120;

export default function LabsPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "QApilot Labs",
              description:
                "Experiments, tools, and ideas shipped fast. Projects born from hackathons and real-world needs.",
              url: `${SITE_BASE_URL}${PATHS.LABS}`,
              publisher: { "@type": "Organization", name: "QApilot" },
            },
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Labs", path: PATHS.LABS },
            ]),
          ]),
        }}
      />
      <main>
        <LabsHeroSection />
        <LabsMobileAgentsToolsSection />
        <WhyLabsSection />
        <LabsProcessSection />
        <LabsTeamSection />
      </main>
    </div>
  );
}
