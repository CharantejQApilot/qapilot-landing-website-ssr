import type { Metadata } from "next";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import ForReleaseManagerClient from "./ForReleaseManagerClient";

export const metadata: Metadata = {
  title: "QApilot for Release Managers | Mobile Release Confidence & Sign-Off",
  description:
    "Transform mobile release sign-off from uncertainty into confidence. QApilot provides unified release intelligence, autonomous test coverage, security reports, accessibility testing, and cross-device validation for mobile release managers.",
};

const breadcrumbList = buildBreadcrumbList([
  { name: "Home", path: PATHS.HOME },
  { name: "For Release Managers", path: PATHS.FOR_RELEASE_MANAGER },
]);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "QApilot for Release Managers",
  description:
    "Transform mobile release sign-off from uncertainty into confidence. QApilot provides unified release intelligence, autonomous test coverage, and real-time quality insights for mobile release managers.",
  url: `${SITE_BASE_URL}${PATHS.FOR_RELEASE_MANAGER}`,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "QApilot",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "iOS, Android",
    description:
      "AI-powered mobile app testing platform for release managers providing autonomous testing, intelligent bug detection, security reports, accessibility testing, and cross-device testing.",
    offers: {
      "@type": "Offer",
      category: "Mobile App Testing",
    },
    featureList: [
      "Autonomous sanity testing for mobile apps",
      "Intelligent bug detection with crash and regression analysis",
      "Mobile app security vulnerability reports",
      "Accessibility compliance testing with WCAG standards",
      "Cross-device and cross-OS testing in parallel",
    ],
  },
  breadcrumb: breadcrumbList,
};

export default function ForReleaseManagerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ForReleaseManagerClient />
    </>
  );
}
