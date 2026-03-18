import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProductHeroSection from "@/components/ProductHeroSection";
import ProductJourneySection from "@/components/ProductJourneySection";
import TestingCoverageSection from "@/components/TestingCoverageSection";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Mobile App Testing Features - Automated QA Platform",
  description:
    "Discover QApilot's powerful mobile testing features: automated test generation, visual regression testing, performance monitoring, and seamless CI/CD integration for iOS & Android.",
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background dark relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbList([{ name: "Home", path: PATHS.HOME }, { name: "Product", path: PATHS.PRODUCT }])) }} />
      <div className="relative z-10">
        <ProductHeroSection />
        <ProductJourneySection />
        <TestingCoverageSection />
        <Footer />
      </div>
    </div>
  );
}
