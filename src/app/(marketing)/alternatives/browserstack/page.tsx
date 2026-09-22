import type { Metadata } from "next";
import { AlternativeLandingPage } from "@/components/alternatives/AlternativeLandingPage";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";
import { COMPARE_FAQS } from "@/lib/compare-faqs";

const path = PATHS.ALTERNATIVES_BROWSERSTACK;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

const PAGE_TITLE = formatPageTitle(
  "BrowserStack Alternatives for Mobile Testing",
);
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;
const PAGE_DESCRIPTION =
  "BrowserStack alternatives for mobile teams: QApilot adds autonomous test generation, self-healing, and release readiness on top of a device cloud. Book a demo.";

const config = {
  path,
  competitorName: "BrowserStack",
  eyebrow: "BrowserStack Alternatives",
  h1: (
    <>
      <span className="text-primary">BrowserStack Alternatives</span> for
      Autonomous Mobile Testing
    </>
  ),
  lead: "BrowserStack gives you devices and browsers in the cloud. QApilot gives you autonomous coverage. AI-native exploration, test generation, self-healing, and release-ready reporting for iOS and Android apps.",
  competitorSubtitle: "Device Cloud & Execution",
  competitorBody:
    "BrowserStack provides access to real devices and browsers for manual and automated testing. Teams still author, maintain, and debug the tests that run on those devices.",
  qapilotSubtitle: "Autonomous Testing Layer",
  qapilotBody:
    "QApilot autonomously explores your app, builds a knowledge graph of journeys, generates executable tests, self-heals UI changes, and surfaces release-ready signals. With or without a device cloud.",
  comparisonRows: [
    [
      "Primary Focus",
      "Device and browser access in the cloud",
      "Autonomous mobile test generation and maintenance",
    ],
    [
      "Test Creation",
      "Teams write and maintain automation scripts",
      "Crawler-led generation, CoWork, and record/playback",
    ],
    [
      "Maintenance",
      "Manual locator and script updates",
      "Context-aware self-healing",
    ],
    [
      "Coverage Discovery",
      "Only what teams script gets tested",
      "Autonomous exploration discovers critical journeys",
    ],
    [
      "Release Signals",
      "Pass/fail from executed tests",
      "Journey validation, bug detection, accessibility, and security insights",
    ],
    [
      "Best Fit",
      "Teams needing device/browser infrastructure",
      "Mobile-first teams needing faster coverage and lower maintenance",
    ],
    [
      "Frameworks",
      "The devices and browsers you choose to run tests on",
      "Post-build checks on Android, iOS, Flutter, and React Native binaries",
    ],
    [
      "Test cases you already have",
      "Executed as the scripts you maintain",
      "CoWork turns those cases into runnable mobile automation. A human approves what matters.",
    ],
    [
      "Where it runs",
      "Real devices and browsers in the cloud",
      "On your binaries, with or without a device cloud, including a local device or emulator through QApilot MCP",
    ],
    [
      "CI",
      "A place to run the automated tests you already have",
      "CI/CD integration with release-ready reporting, not only pass or fail",
    ],
  ],
  whyPoints: [
    "Generate mobile test coverage without scaling automation headcount.",
    "Reduce script maintenance when UI and flows change every sprint.",
    "Validate complete user journeys. Not just isolated test steps.",
    "Get release-ready reporting with failure context, not just stack traces.",
    "Works post-build on real app binaries. IOS, Android, and Flutter.",
  ],
  complementaryNote:
    "Many teams use QApilot alongside device clouds like BrowserStack: QApilot handles autonomous coverage and maintenance; your device farm handles execution scale. See our integrations hub for how QApilot fits your existing stack.",
  faqs: COMPARE_FAQS.browserstack,
  directAnswer: {
    heading: "What is a BrowserStack alternative for mobile app testing?",
    body: "A BrowserStack alternative, for a mobile team, is a way to get coverage without only renting devices and writing every script yourself. BrowserStack gives you real devices and browsers in the cloud. QApilot is the autonomous testing layer: it explores the app, builds a knowledge graph of journeys, generates tests, self-heals when the UI changes, and reports release readiness. Many teams keep a device cloud and add QApilot for coverage and maintenance.",
  },
  pricing: {
    heading: "How does pricing compare?",
    body: "QApilot does not publish a public rate card. Plans are sized with your team on a demo. This page does not quote BrowserStack prices. The buying question is whether you need more device access, autonomous coverage with less script maintenance, or both.",
  },
  furtherReading: {
    href: `${PATHS.BLOGS}/browserstack-alternatives-2026`,
    label: "BrowserStack alternatives in 2026",
    lead: "This page is the product comparison. For the longer write-up, read",
  },
} as const;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    title: PAGE_TITLE_TEXT,
    description: PAGE_DESCRIPTION,
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrowserStack Alternatives. QApilot",
    description: PAGE_DESCRIPTION,
    images: [
      { url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt },
    ],
  },
};

export const revalidate = 300;

export default function BrowserStackAlternativePage() {
  return <AlternativeLandingPage config={config} />;
}
