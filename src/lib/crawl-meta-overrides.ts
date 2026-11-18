/**
 * Specific meta descriptions for pages the crawl scored as generic.
 * Same claims as the articles — only the summary is tighter.
 * Keys are CMS slugs and public short slugs.
 */
const CRAWL_META_DESCRIPTIONS: Record<string, string> = {
  "from-manual-to-ai-driven-the-future-of-testing-unveiled":
    "How mobile testing moved from hand-written scripts to AI-driven coverage, and what that shift means for teams shipping iOS and Android apps.",
  "leveraging-image-recognition-for-robust-and-self-healing-test-automation-with-qapilot":
    "How QApilot uses image recognition so mobile UI tests keep running when screens change, instead of failing on brittle selectors during a release.",
  "image-recognition-self-healing-tests":
    "How QApilot uses image recognition so mobile UI tests keep running when screens change, instead of failing on brittle selectors during a release.",
  "enhance-mobile-apps-end-to-end-lifecycle-with-ci-cd-integrations":
    "How CI/CD carries a mobile app from build to release checks, with QApilot coverage wired into the pipeline your team already runs each sprint.",
  "flutter-made-mobile-development-simple-qapilot-makes-testing-simple":
    "Flutter sped up cross-platform builds. This post explains how QApilot tests those Flutter apps after the build, on real iOS and Android devices.",
  "harnessing-visual-ai-to-achieve-flawless-ui-testing":
    "How visual AI reviews a mobile screen the way a person does, so UI tests catch experience problems that locator-based checks miss in a release.",
  "key-advantages-of-implementing-automation-testing-tools":
    "What automation testing tools change for mobile teams: faster regression, less repeated manual work, and coverage that keeps up with releases.",
  "mobile-app-security-reporting-in-2026-tools-standards-and-what-to-look-for":
    "What a mobile app security report should include in 2026, which standards to check, and how those findings fit a QA workflow before you ship.",
  "devfest-hyderabad-a-look-at-gdg-s-community-driven-tech-celebration":
    "A report from GDG Hyderabad DevFest: sessions on AI, decentralized protocols, and how that community is shaping mobile engineering in public.",
  "tech-bridges-across-continents-qapilot-at-london-tech-week-and-eurostar-2025":
    "QApilot at London Tech Week and EuroSTAR 2025: the sessions and conversations from two technology events on two continents in the same year.",
  "the-fintech-exception-mobile-login-crashes-automation":
    "Why mobile login, biometrics, and MFA still break automation in FinTech apps, and which of those checks a QA team can prove before release day.",
  "tips-for-reducing-mobile-app-testing-time-without-sacrificing-quality":
    "How mobile teams cut testing time without dropping coverage: which cases to run every build, which to sample, and what to stop repeating by hand.",
  "automation-testing-mobile":
    "Decide what a mobile team should automate: which journeys to script, which to leave manual, and when an AI-native run replaces an Appium suite.",
  "load-testing-tools-mobile-apps":
    "How to judge load testing tools for a mobile app: which traffic a device actually feels, and which results should block an iOS or Android release.",
  "performance-testing-tools-mobile":
    "How to pick performance testing tools for a mobile app: what to measure on a real device, which results matter, and where load tools fall short.",
  "automated-functional-testing-mobile":
    "Which functional checks to automate on a mobile app first, how they differ from a web suite, and which passes should stay a manual device check.",
  "software-testing-and-artificial-intelligence-mobile":
    "Where artificial intelligence belongs in mobile testing: what it can explore on a real build, and what a team still judges before the release.",
  "software-testing-strategies-mobile-apps":
    "How mobile teams choose a testing strategy across risk, devices, and release cadence, and which checks belong in each stage before you ship.",
  "multiple-device-testing-mobile-apps":
    "How to test one mobile journey across phone models: which devices to cover, what to skip, and how a two-handset flow differs from one device.",
  "how-to-create-tests-mobile-apps":
    "How to create mobile app tests that survive a UI change: start from the user journey, name the check, and keep the case tied to the release.",
};

/**
 * Document titles for pages whose visible H1 overlaps another URL.
 * The on-page heading stays the CMS or component title.
 */
const CRAWL_META_TITLES: Record<string, string> = {
  "software-testing-and-artificial-intelligence-mobile":
    "Where AI Fits in Mobile App Testing",
  "ai-mobile-app-testing": "What AI Testing Changes on Android and iOS",
  "autonomous-testing-mobile-apps": "Autonomous Testing on a Real Mobile Build",
  "load-testing-tools-mobile-apps": "Traffic and Load Testing for Mobile Apps",
  "automated-functional-testing-mobile":
    "Functional Checks to Automate on Mobile",
  "the-fintech-exception-mobile-login-crashes-automation":
    "Why Mobile Login Still Breaks FinTech Tests",
};

function lookup(
  table: Record<string, string>,
  slugs: Array<string | null | undefined>,
): string | undefined {
  for (const slug of slugs) {
    if (slug && table[slug]) return table[slug];
  }
  return undefined;
}

export function crawlMetaDescription(
  ...slugs: Array<string | null | undefined>
): string | undefined {
  return lookup(CRAWL_META_DESCRIPTIONS, slugs);
}

/** SERP title only. Does not change the visible H1. */
export function crawlMetaTitle(
  ...slugs: Array<string | null | undefined>
): string | undefined {
  return lookup(CRAWL_META_TITLES, slugs);
}
