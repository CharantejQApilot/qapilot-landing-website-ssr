import type { Metadata } from "next";
import { AlternativeLandingPage } from "@/components/alternatives/AlternativeLandingPage";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";
import { COMPARE_FAQS } from "@/lib/compare-faqs";

const path = PATHS.ALTERNATIVES_SAUCE_LABS;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

const PAGE_TITLE = formatPageTitle(
  "Sauce Labs Alternative. Autonomous Mobile Testing | QApilot",
);
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;
const PAGE_DESCRIPTION =
  "Looking for a Sauce Labs alternative? QApilot delivers autonomous mobile test generation, self-healing, and release readiness beyond device clouds.";

const config = {
  path,
  competitorName: "Sauce Labs",
  eyebrow: "Sauce Labs Alternative",
  h1: (
    <>
      The <span className="text-primary">Sauce Labs Alternative</span> for
      Autonomous Mobile QA
    </>
  ),
  lead: "Sauce Labs provides cloud-based device and browser infrastructure for test execution. QApilot goes further. Autonomous app exploration, AI-native test generation, self-healing, and release-ready mobile reporting.",
  competitorSubtitle: "Continuous Testing Platform",
  competitorBody:
    "Sauce Labs offers device clouds, test orchestration, and analytics for teams running automated tests at scale. Test authoring, maintenance, and coverage gaps remain the team's responsibility.",
  qapilotSubtitle: "AI-Native Mobile Testing",
  qapilotBody:
    "QApilot autonomously maps your app, generates structured test coverage, executes journeys across real devices, heals broken steps, and reports release risk. Reducing the script debt that device clouds alone cannot solve.",
  comparisonRows: [
    [
      "Primary Focus",
      "Cloud test infrastructure and orchestration",
      "Autonomous mobile coverage and maintenance",
    ],
    [
      "Test Creation",
      "Script-based automation on connected devices",
      "Crawler-led generation from real app behavior",
    ],
    [
      "Maintenance",
      "Manual updates when UI or flows change",
      "Context-aware self-healing across journeys",
    ],
    [
      "App Understanding",
      "Executes predefined test suites",
      "Builds a knowledge graph of screens, flows, and states",
    ],
    [
      "Debugging",
      "Logs, screenshots, and video from runs",
      "Journey-level failure context with mobile-specific signals",
    ],
    [
      "Best Fit",
      "Teams with mature automation and device farm needs",
      "Mobile-first teams reducing QE bottlenecks and script overhead",
    ],
  ],
  whyPoints: [
    "Discover critical mobile journeys automatically. Not only what engineers script.",
    "Cut test maintenance when locators, layouts, and flows change every release.",
    "Validate onboarding, payments, KYC, and other business-critical journeys end-to-end.",
    "Surface accessibility, latency, and security signals alongside functional results.",
    "Integrate with CI/CD and your existing device execution stack.",
  ],
  complementaryNote:
    "QApilot complements device clouds like Sauce Labs: use QApilot for autonomous coverage generation and self-healing, and your Sauce Labs infrastructure for parallel execution at scale. See our integrations hub for details.",
  faqs: COMPARE_FAQS.sauceLabs,
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
    title: "Sauce Labs Alternative. QApilot",
    description: PAGE_DESCRIPTION,
    images: [
      { url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt },
    ],
  },
};

export const revalidate = 300;

export default function SauceLabsAlternativePage() {
  return <AlternativeLandingPage config={config} />;
}
