import type { Metadata } from "next";
import { Suspense } from "react";
import LabsHeroSection from "@/components/LabsHeroSection";
import LabsFeaturedSection from "@/components/LabsFeaturedSection";
import WhyLabsSection from "@/components/WhyLabsSection";
import LabsProcessSection from "@/components/LabsProcessSection";
import LabsTeamSection from "@/components/LabsTeamSection";
import Footer from "@/components/Footer";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "QApilot Labs - Experiments, Tools & Ideas Shipped Fast",
  description:
    "QApilot Labs is where we build and ship experiments that explore the edges of AI-native development and testing. Discover tools born from hackathons and real-world needs.",
};

export const revalidate = 120;

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-background dark">
      {/* CollectionPage + BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "QApilot Labs",
              "description": "Experiments, tools, and ideas shipped fast. Projects born from hackathons and real-world needs.",
              "url": `${SITE_BASE_URL}${PATHS.LABS}`,
              "publisher": { "@type": "Organization", "name": "QApilot" }
            },
            buildBreadcrumbList([{ name: "Home", path: PATHS.HOME }, { name: "Labs", path: PATHS.LABS }])
          ])
        }}
      />
      <LabsHeroSection />
      <Suspense
        fallback={
          <section className="py-8 md:py-12">
            <div className="container mx-auto max-w-screen-xl px-4 min-h-[280px]" aria-hidden />
          </section>
        }
      >
        <LabsFeaturedSection />
      </Suspense>
      <WhyLabsSection />
      <LabsProcessSection />
      <LabsTeamSection />
      
      <Footer />
    </div>
  );
}
