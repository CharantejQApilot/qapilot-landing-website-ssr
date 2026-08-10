import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";
import { PATHS } from "@/lib/routes";

export type IntegrationTool = {
  slug: string;
  name: string;
  logo: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  heroLead: string;
  highlights: readonly string[];
};

export const INTEGRATION_TOOLS: readonly IntegrationTool[] = [
  {
    slug: "browserstack",
    name: "BrowserStack",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}962197a9-5e99-40b8-8f8c-794b50520d5e.png`,
    description:
      "Run QApilot-generated tests on BrowserStack device clouds — autonomous coverage generation paired with real-device execution at scale.",
    metaTitle: "BrowserStack Integration — Autonomous Mobile Testing",
    metaDescription:
      "Connect QApilot with BrowserStack: AI-native test generation and self-healing plus real-device cloud execution for iOS and Android.",
    heroLead:
      "Pair QApilot’s autonomous coverage with BrowserStack’s device cloud so teams generate, heal, and execute mobile tests without scaling script debt.",
    highlights: [
      "Generate journeys in QApilot, execute on BrowserStack devices",
      "Keep self-healing and release signals in one pipeline",
      "Scale parallel runs without rewriting locators every sprint",
    ],
  },
  {
    slug: "lambdatest",
    name: "LambdaTest",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}9f5ef4eb-33b0-4852-a38a-61a25aaebe56.png`,
    description:
      "Execute mobile test suites across LambdaTest's device grid while QApilot handles exploration, generation, and self-healing.",
    metaTitle: "LambdaTest Integration — Autonomous Mobile Testing",
    metaDescription:
      "Connect QApilot with LambdaTest: autonomous exploration and test generation with execution across LambdaTest’s mobile device grid.",
    heroLead:
      "Use QApilot for exploration, generation, and healing — then run suites across LambdaTest’s device grid for broader coverage.",
    highlights: [
      "Autonomous coverage discovery before device-grid execution",
      "Lower maintenance when UI and flows change",
      "Fit LambdaTest into existing CI/CD release gates",
    ],
  },
  {
    slug: "sauce-labs",
    name: "Sauce Labs",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}445698aa-1a01-42ef-9a78-96903c80c41f.png`,
    description:
      "Combine QApilot's autonomous testing with Sauce Labs cloud infrastructure for parallel mobile execution.",
    metaTitle: "Sauce Labs Integration — Autonomous Mobile Testing",
    metaDescription:
      "Connect QApilot with Sauce Labs: autonomous mobile coverage generation plus Sauce Labs cloud infrastructure for parallel execution.",
    heroLead:
      "Let QApilot own coverage and maintenance while Sauce Labs scales parallel mobile execution across your device matrix.",
    highlights: [
      "Autonomous generation + Sauce Labs parallel runs",
      "Release-ready reporting with journey-level context",
      "Works alongside existing Sauce Labs automation investments",
    ],
  },
  {
    slug: "testrail",
    name: "TestRail",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}e9abab36-d809-4b15-8fd2-134b7e1d473e.png`,
    description:
      "Import test cases from TestRail and convert them into executable mobile tests with QApilot CoWork — bridging manual test management and autonomous execution.",
    metaTitle: "TestRail Integration — CoWork Mobile Automation",
    metaDescription:
      "Connect QApilot with TestRail: import cases into CoWork and turn managed test cases into executable, self-healing mobile automation.",
    heroLead:
      "Bridge TestRail case management with QApilot CoWork so manual and planned cases become executable mobile automation faster.",
    highlights: [
      "Import TestRail cases into CoWork",
      "Convert planned coverage into runnable mobile tests",
      "Keep test management and autonomous execution aligned",
    ],
  },
  {
    slug: "jira",
    name: "Jira",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}jira-software-logo.png`,
    description:
      "Auto-log bugs and test failures to Jira with screen context, severity, and reproduction evidence — so engineering gets actionable tickets, not noise.",
    metaTitle: "Jira Integration — Actionable Mobile Bug Tickets",
    metaDescription:
      "Connect QApilot with Jira: auto-log failures with screen context, severity, and reproduction evidence for actionable engineering tickets.",
    heroLead:
      "Route QApilot failures into Jira with the context engineers need — screens, severity, and reproduction evidence, not noise.",
    highlights: [
      "Auto-log bugs with screen-level evidence",
      "Severity and reproduction context on every ticket",
      "Keep QE and engineering in one issue workflow",
    ],
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}bcb4526d-637b-49ba-a92d-b437d33a0516.png`,
    description:
      "Send build and test notifications to Teams channels so release managers and QE leads stay informed without leaving their workflow.",
    metaTitle: "Microsoft Teams Integration — Release Alerts",
    metaDescription:
      "Connect QApilot with Microsoft Teams: push build and test notifications so release managers and QE leads stay informed in-channel.",
    heroLead:
      "Keep release managers and QE leads informed with QApilot build and test notifications delivered into Microsoft Teams.",
    highlights: [
      "Channel alerts for runs, failures, and readiness",
      "Fewer status-check rabbit holes across tools",
      "Fits how enterprise teams already collaborate",
    ],
  },
  {
    slug: "slack",
    name: "Slack",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}f9ca9bd8-d74c-4852-8fa6-34c1be76aea3.png`,
    description:
      "Get real-time alerts on test runs, failures, and release readiness signals directly in Slack.",
    metaTitle: "Slack Integration — Real-Time QA Alerts",
    metaDescription:
      "Connect QApilot with Slack: real-time alerts on test runs, failures, and release readiness signals for mobile teams.",
    heroLead:
      "Surface QApilot run status, failures, and release readiness signals directly in Slack where your team already works.",
    highlights: [
      "Real-time alerts on critical mobile failures",
      "Release readiness signals in-channel",
      "Faster triage without opening another dashboard first",
    ],
  },
  {
    slug: "jenkins",
    name: "Jenkins",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}7cbcd4d0-466c-4693-8d02-87a5f30f712b.png`,
    description:
      "Trigger QApilot test runs from Jenkins pipelines — integrate autonomous mobile QA into your CI/CD workflow.",
    metaTitle: "Jenkins Integration — CI/CD Mobile QA",
    metaDescription:
      "Connect QApilot with Jenkins: trigger autonomous mobile test runs from pipelines and gate releases with quality signals.",
    heroLead:
      "Wire QApilot into Jenkins so every build can trigger autonomous mobile QA and surface release-ready quality signals.",
    highlights: [
      "Trigger QApilot runs from Jenkins pipelines",
      "Gate releases on mobile quality signals",
      "Keep autonomous QA inside existing CI/CD",
    ],
  },
  {
    slug: "xray",
    name: "XRAY",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}k3huxfe9vfbic6vuvurwtsvu5ggz.png`,
    description:
      "Sync test management workflows with XRAY for teams tracking coverage and release quality in Jira-native test management.",
    metaTitle: "XRAY Integration — Jira-Native Test Management",
    metaDescription:
      "Connect QApilot with XRAY: sync autonomous mobile testing with Jira-native test management for coverage and release quality.",
    heroLead:
      "Connect QApilot with XRAY so teams tracking coverage in Jira-native test management stay aligned with autonomous execution.",
    highlights: [
      "Align autonomous runs with XRAY workflows",
      "Track coverage and release quality together",
      "Keep Jira-native test management as the source of truth",
    ],
  },
] as const;

export function getIntegrationBySlug(slug: string): IntegrationTool | undefined {
  return INTEGRATION_TOOLS.find((tool) => tool.slug === slug);
}

export function integrationPath(slug: string): string {
  return `${PATHS.INTEGRATIONS}/${slug}`;
}

export const INTEGRATION_SLUGS = INTEGRATION_TOOLS.map((tool) => tool.slug);
