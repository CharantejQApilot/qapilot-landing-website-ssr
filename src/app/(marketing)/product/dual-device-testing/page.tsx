import type { Metadata } from "next";
import {
  DualDeviceBenefitsSection,
  DualDeviceHero,
  DualDeviceHowItWorksSection,
  DualDevicePatternSection,
  DualDeviceUseCasesSection,
} from "@/components/dual-device-testing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";
import { ProductSummariseBand } from "@/components/product/ProductSummariseBand";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Dual Device Testing: Synchronised Mobile Workflows",
  description:
    "Test marketplace, messaging, and field workflows across two devices as one continuous transaction with step-level sync and clear failure attribution.",
  path: PATHS.DUAL_DEVICE_TESTING,
  ogDescription:
    "Synchronised dual-device testing for real business journeys that span users, roles, and devices.",
  twitterDescription:
    "Prove send/receive, assign/accept, and approve handoffs across two devices in one orchestrated run.",
});

export const revalidate = 300;

export default function DualDeviceTestingPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Dual Device Testing", path: PATHS.DUAL_DEVICE_TESTING },
            ]),
          ),
        }}
      />
      <main>
        <DualDeviceHero />
        <ProductSummariseBand
          pageUrl={`${SITE_BASE_URL}${PATHS.DUAL_DEVICE_TESTING}`}
        />
        <DualDeviceUseCasesSection />
        <DualDevicePatternSection />
        <DualDeviceHowItWorksSection />
        <DualDeviceBenefitsSection />
      </main>
    </div>
  );
}
