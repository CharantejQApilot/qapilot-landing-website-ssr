import type { Metadata } from "next";
import { AlternativeLandingPage } from "@/components/alternatives/AlternativeLandingPage";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";

const path = PATHS.ALTERNATIVES_BROWSERSTACK;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

const PAGE_TITLE = formatPageTitle("BrowserStack Alternative — Autonomous Mobile Testing | QApilot");
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;
const PAGE_DESCRIPTION =
  "Looking for a BrowserStack alternative? QApilot adds autonomous test generation, self-healing, and release readiness — mobile-first from day one.";

const config = {
  path,
  competitorName: "BrowserStack",
  eyebrow: "BrowserStack Alternative",
  h1: (
    <>
      The <span className="text-primary">BrowserStack Alternative</span> Built for Autonomous Mobile Testing
    </>
  ),
  lead: "BrowserStack gives you devices and browsers in the cloud. QApilot gives you autonomous coverage — AI-native exploration, test generation, self-healing, and release-ready reporting for iOS and Android apps.",
  competitorSubtitle: "Device Cloud & Execution",
  competitorBody:
    "BrowserStack provides access to real devices and browsers for manual and automated testing. Teams still author, maintain, and debug the tests that run on those devices.",
  qapilotSubtitle: "Autonomous Testing Layer",
  qapilotBody:
    "QApilot autonomously explores your app, builds a knowledge graph of journeys, generates executable tests, self-heals UI changes, and surfaces release-ready signals — with or without a device cloud.",
  comparisonRows: [
    ["Primary Focus", "Device and browser access in the cloud", "Autonomous mobile test generation and maintenance"],
    [
      "Test Creation",
      "Teams write and maintain automation scripts",
      "Crawler-led generation, CoWork, and record/playback",
    ],
    ["Maintenance", "Manual locator and script updates", "Context-aware self-healing"],
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
  ],
  whyPoints: [
    "Generate mobile test coverage without scaling automation headcount.",
    "Reduce script maintenance when UI and flows change every sprint.",
    "Validate complete user journeys — not just isolated test steps.",
    "Get release-ready reporting with failure context, not just stack traces.",
    "Works post-build on real app binaries — iOS, Android, and Flutter.",
  ],
  complementaryNote:
    "Many teams use QApilot alongside device clouds like BrowserStack: QApilot handles autonomous coverage and maintenance; your device farm handles execution scale. See our integrations hub for how QApilot fits your existing stack.",
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
    title: "BrowserStack Alternative — QApilot",
    description: PAGE_DESCRIPTION,
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function BrowserStackAlternativePage() {
  return <AlternativeLandingPage config={config} />;
}
