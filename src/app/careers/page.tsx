import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CareersHeroSection from "@/components/CareersHeroSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import OpenPositionsSection from "@/components/OpenPositionsSection";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Careers - Join the QApilot Team",
  description:
    "Join the QApilot team. Help shape what quality looks like in an AI-first world. Explore career opportunities in AI-powered quality assurance.",
  keywords:
    "QApilot careers, QA automation jobs, AI testing jobs, software testing careers",
  alternates: { canonical: `${SITE_BASE_URL}${PATHS.CAREERS}` },
};

export default function CareersPage() {
  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "Careers", path: PATHS.CAREERS },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <main className="min-h-screen bg-background">
        <CareersHeroSection />
        <OpenPositionsSection />
        <HowWeWorkSection />
      </main>
      <Footer />
    </>
  );
}
