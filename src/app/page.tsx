import type { Metadata } from "next";
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import VideoSection from "@/components/VideoSection";
import VelocitySection from "@/components/VelocitySection";
import CoreAdvantageHeading from "@/components/CoreAdvantageHeading";
import ModernFrameworksSection from "@/components/ModernFrameworksSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import FeaturedNews from "@/components/FeaturedNews";
import MetricsSection from "@/components/MetricsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "QApilot - AI-Powered Mobile App Testing & QA Automation | iOS & Android",
  description:
    "Automate your mobile app testing with QApilot's AI-powered platform. Get instant test coverage for iOS & Android apps. Start testing in minutes, not hours. Try free today.",
};

/** Regenerate periodically so featured news in HTML stays fresh for crawlers. */
export const revalidate = 120;

export default function IndexPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge">
      <main>
        <HeroSection />
        <ClientsSection />
        <MetricsSection />
        <VideoSection variant="fullBleed" />
        <VelocitySection />
        <CoreAdvantageHeading />
        <ModernFrameworksSection />
        <ProductShowcaseSection />
        <IntegrationsSection />
        <Suspense
          fallback={
            <section className="bg-background py-20 section-edge w-full">
              <div className="section-full min-h-[320px]" aria-hidden />
            </section>
          }
        >
          <FeaturedNews />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
