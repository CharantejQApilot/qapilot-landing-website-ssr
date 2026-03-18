import type { Metadata } from "next";
import Footer from "@/components/Footer";
import TestingModesSection from "@/components/TestingModesSection";
import EnterpriseHeroSection from "@/components/EnterpriseHeroSection";
import QApilotDifferenceSection from "@/components/QApilotDifferenceSection";
import TableStakesSection from "@/components/TableStakesSection";
import FeaturedResourcesSection from "@/components/FeaturedResourcesSection";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Enterprise Mobile Testing Solutions - Scale QA Automation",
  description:
    "Enterprise-grade mobile testing automation trusted by Fortune 500 companies. Scale your QA process with AI-powered testing for iOS and Android apps.",
};

export default function EnterprisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbList([{ name: "Home", path: PATHS.HOME }, { name: "Enterprise", path: PATHS.ENTERPRISE }])) }} />
      <div className="min-h-screen bg-background dark relative contain-layout">
        <div className="relative z-10">
          <EnterpriseHeroSection />
          <FeaturedResourcesSection />
          <QApilotDifferenceSection />
          <TableStakesSection />
          <TestingModesSection />
          <Footer />
        </div>
      </div>
    </>
  );
}
