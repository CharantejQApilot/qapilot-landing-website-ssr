import type { Metadata } from "next";
import { AlternativeLandingPage } from "@/components/alternatives/AlternativeLandingPage";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";

const path = PATHS.ALTERNATIVES_APPIUM;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

const PAGE_TITLE = formatPageTitle("Appium Alternative — Autonomous Mobile Testing | QApilot");
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;
const PAGE_DESCRIPTION =
  "Looking for an Appium alternative? QApilot adds autonomous exploration, AI-native test generation, self-healing, and release-ready reporting beyond script-first automation.";

const config = {
  path,
  competitorName: "Appium",
  eyebrow: "Appium Alternative",
  h1: (
    <>
      The <span className="text-primary">Appium Alternative</span> Built for Autonomous Mobile Testing
    </>
  ),
  lead: "Appium is a powerful framework for mobile test automation. Mobile teams still carry the burden of authoring, maintaining, debugging, and scaling every test. QApilot adds the AI-native layer Appium was never designed to be — autonomous exploration, context-aware execution, self-healing, and release-ready reporting.",
  competitorSubtitle: "Script-First Automation",
  competitorBody:
    "Teams define every flow, locator, device setup, and maintenance path manually. Appium executes the scripts you write — coverage and upkeep stay on the automation engineering team.",
  qapilotSubtitle: "Context-First Mobile Testing",
  qapilotBody:
    "QApilot understands the app, generates coverage, executes journeys, heals failures, and shows release risk — so teams move from test execution to release readiness.",
  comparisonRows: [
    ["Core Design", "Mobile automation framework", "AI-native mobile testing platform"],
    [
      "Primary Role",
      "Executes scripted tests",
      "Generates, executes, heals, debugs, and reports",
    ],
    [
      "Test Creation",
      "Manual script authoring",
      "Crawler-led generation, CoWork, and record/playback",
    ],
    ["Maintenance", "Manual locator and script updates", "Context-aware self-healing"],
    [
      "Debugging",
      "Shows failed steps and execution errors",
      "Shows why a mobile journey failed",
    ],
    [
      "Device Execution",
      "Requires setup and orchestration",
      "Built for real mobile execution workflows",
    ],
    [
      "Flutter Support",
      "Often workaround-heavy",
      "Built for Flutter, native, and hybrid complexity",
    ],
    [
      "Best Fit",
      "Teams with strong automation engineering bandwidth",
      "Mobile-first teams that need faster coverage and release confidence",
    ],
  ],
  whyPoints: [
    "Increase mobile coverage without increasing automation headcount.",
    "Reduce Appium maintenance and flaky test failures.",
    "Test Android and iOS releases faster.",
    "Handle Flutter, native, and hybrid app complexity.",
    "Convert existing manual test cases into automation.",
    "Get better debugging evidence for failed mobile journeys.",
    "Move from test execution to release readiness.",
  ],
  complementaryNote:
    "Many teams adopt QApilot alongside Appium: keep critical scripted suites where they already work, and use QApilot to expand coverage, cut maintenance, and surface release-ready signals. See our full comparison at /compare/qapilot-vs-appium.",
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
    title: "Appium Alternative — QApilot",
    description: PAGE_DESCRIPTION,
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function AppiumAlternativePage() {
  return <AlternativeLandingPage config={config} />;
}
