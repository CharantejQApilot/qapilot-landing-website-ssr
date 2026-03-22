import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProductHeroSection from "@/components/ProductHeroSection";
import ProductJourneySection from "@/components/ProductJourneySection";
import TestingCoverageSection from "@/components/TestingCoverageSection";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Mobile App Testing Features - Automated QA Platform",
  description:
    "Discover QApilot's powerful mobile testing features: automated test generation, visual regression testing, performance monitoring, and seamless CI/CD integration for iOS & Android.",
};

export default function ProductPage() {
  return (
    <MarketingPageShell background="hero">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbList([{ name: "Home", path: PATHS.HOME }, { name: "Product", path: PATHS.PRODUCT }])) }} />
      <ProductHeroSection />
      <ProductJourneySection />
      <TestingCoverageSection />
      <Footer />
    </MarketingPageShell>
  );
}
