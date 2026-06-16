import type { Metadata } from "next";
import LabsHeroSection from "@/components/LabsHeroSection";
import LabsMobileAgentsToolsSection from "@/components/LabsMobileAgentsToolsSection";
import WhyLabsSection from "@/components/WhyLabsSection";
import LabsProcessSection from "@/components/LabsProcessSection";
import LabsTeamSection from "@/components/LabsTeamSection";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.LABS}`;

export const metadata: Metadata = {
  title: "QApilot Labs - Experiments, Tools & Ideas Shipped Fast",
  description:
    "QApilot Labs is where we build and ship experiments that explore the edges of AI-native development and testing. Discover tools born from hackathons and real-world needs.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "QApilot Labs - Experiments, Tools & Ideas Shipped Fast",
    description:
      "Experiments and tools that explore the edges of AI-native development and testing.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot Labs - Experiments, Tools & Ideas Shipped Fast",
    description:
      "Discover tools and ideas shipped fast from hackathons and real-world needs.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

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
