/**
 * Mobile Agents tools shown on QApilot Labs (“Ship Better Mobile Apps Faster”).
 *
 * Keep `trending` and `href` values aligned with https://mobileagents.io/tools
 * so the Labs grid and the footer “QApilot Labs” column stay in sync.
 * QApilot-native tools use site paths (`external: false`).
 */
import { PATHS } from "@/lib/routes";

export const MOBILE_AGENTS_TOOLS_HUB_URL = "https://mobileagents.io/tools";

export type MobileAgentsLabsTool = {
  name: string;
  description: string;
  href: string;
  category: string;
  /** When true, tool appears in footer QApilot Labs + shows Trending on Labs. */
  trending?: boolean;
  /** When false, href is on-site (Next.js Link). Defaults to true for http(s) URLs. */
  external?: boolean;
};

export const MOBILE_AGENTS_LABS_TOOLS: readonly MobileAgentsLabsTool[] = [
  {
    name: "Device Coverage Matrix",
    description:
      "Pick your target market, set a coverage goal, and get a ranked OEM + platform matrix from real device share data.",
    href: PATHS.DEVICE_COVERAGE_MATRIX,
    category: "Testing & Analysis",
    trending: true,
    external: false,
  },
  {
    name: "SEO Image Optimizer",
    description:
      "Compress, convert, and crop images to the right sizes for SEO and social sharing. Grab them one at a time or download everything as a ZIP.",
    href: "https://mobileagents.io/tools/seo-image-optimizer",
    category: "Performance",
    trending: true,
  },
  {
    name: "HealMyPrompt",
    description:
      "Turn your app idea into a ready-to-use prompt for vibe coding tools like Lovable, Bolt, or Replit. Start from a template, toggle features, and generate.",
    href: "https://mobileagents.io/tools/heal-my-prompt",
    category: "AI & Automation",
    trending: true,
  },
  {
    name: "Observer",
    description:
      "See your PostHog events inside VS Code with live streaming every few seconds, AI anomaly detection, and one-click debugging without leaving your editor.",
    href: "https://mobileagents.io/tools/observer",
    category: "Testing & Analysis",
    trending: true,
  },
  {
    name: "AppCrawler",
    description:
      "Analyze your complete Android codebase instantly. Get comprehensive app context in tabular and graph formats inside Android Studio.",
    href: "https://mobileagents.io/tools/appcrawler",
    category: "Developer Tools",
    trending: true,
  },
  {
    name: "Crash Log Analyzer",
    description:
      "Paste your mobile crash logs and get a quick breakdown of what went wrong. Spot root causes and patterns fast.",
    href: "https://mobileagents.io/tools/crash-log-analyzer",
    category: "Testing & Analysis",
  },
  {
    name: "App Store Optimizer",
    description:
      "Generate titles, keywords, and descriptions for your app store listing. Describe your app and let AI handle the copy.",
    href: "https://mobileagents.io/tools/app-store-optimizer",
    category: "App Store",
  },
  {
    name: "AI Model Pricing",
    description:
      "Side-by-side pricing for AI models from OpenAI, Google, and Anthropic. Find the right model for your needs and budget.",
    href: "https://mobileagents.io/tools/ai-pricing",
    category: "AI & Automation",
  },
  {
    name: "PriceMyAgent",
    description:
      "Describe your AI agent idea and get three implementation plans with real cost estimates—complexity, timelines, and monthly spend side by side.",
    href: "https://mobileagents.io/tools/price-my-agent",
    category: "AI & Automation",
  },
  {
    name: "ToolsForAgent",
    description:
      "Tell us what your agent should do and get recommended tools and APIs for support bots, document analysis, workflow automation, and more.",
    href: "https://mobileagents.io/tools/tools-for-agent",
    category: "AI & Automation",
  },
  {
    name: "Landing Page Audit",
    description:
      "Get an instant AI-powered audit of any landing page: design, copy, CTAs, trust signals, pricing, and conversion best practices.",
    href: "https://mobileagents.io/tools/landing-page-audit",
    category: "Performance",
  },
] as const;

/** Same order as in `MOBILE_AGENTS_LABS_TOOLS` — footer + Labs trending badges. */
export const MOBILE_AGENTS_TRENDING_LABS_TOOLS: readonly MobileAgentsLabsTool[] =
  MOBILE_AGENTS_LABS_TOOLS.filter((t) => t.trending === true);

export function getMobileAgentsLabsTool(href: string): MobileAgentsLabsTool | undefined {
  return MOBILE_AGENTS_LABS_TOOLS.find((tool) => tool.href === href);
}
