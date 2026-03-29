import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import VelocitySection from "@/components/VelocitySection";
import CoreAdvantageHeading from "@/components/CoreAdvantageHeading";
import ModernFrameworksSection from "@/components/ModernFrameworksSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import MetricsSection from "@/components/MetricsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "QApilot - AI-Powered Mobile App Testing & QA Automation | iOS & Android",
  description:
    "Automate your mobile app testing with QApilot's AI-powered platform. Get instant test coverage for iOS & Android apps. Start testing in minutes, not hours. Try free today.",
};

export default function IndexPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge">
      <main>
        <HeroSection />
        <ClientsSection />
        <MetricsSection />
        <VelocitySection />
        <CoreAdvantageHeading />
        <ModernFrameworksSection />
        <ProductShowcaseSection />
        <IntegrationsSection />
      </main>
      <Footer />
    </div>
  );
}
