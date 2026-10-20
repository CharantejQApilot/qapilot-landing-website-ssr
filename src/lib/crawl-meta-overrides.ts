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
};

export function crawlMetaDescription(
  ...slugs: Array<string | null | undefined>
): string | undefined {
  for (const slug of slugs) {
    if (slug && CRAWL_META_DESCRIPTIONS[slug]) {
      return CRAWL_META_DESCRIPTIONS[slug];
    }
  }
  return undefined;
}
