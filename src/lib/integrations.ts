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
  /** Short reasons teams wire this tool up */
  highlights: readonly string[];
  /** Day-to-day notes. Keep concrete. */
  inPractice: readonly string[];
  /** Extra context that doesn't fit a highlight card */
  worthKnowing: readonly string[];
};

export const INTEGRATION_TOOLS: readonly IntegrationTool[] = [
  {
    slug: "browserstack",
    name: "BrowserStack",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}962197a9-5e99-40b8-8f8c-794b50520d5e.png`,
    description:
      "QApilot figures out what to test. BrowserStack is where those runs hit real phones and tablets.",
    metaTitle: "BrowserStack Integration. Autonomous Mobile Testing",
    metaDescription:
      "Connect QApilot with BrowserStack: generate and heal mobile tests in QApilot, run them on BrowserStack device clouds for iOS and Android.",
    heroLead:
      "Use QApilot to build and maintain mobile coverage, then push execution onto BrowserStack's device cloud when you need breadth.",
    highlights: [
      "QApilot owns exploration, generation, and healing",
      "BrowserStack owns the device matrix and parallel runs",
      "You don't rewrite suites every time the UI shifts",
      "Same release signals, larger device footprint",
    ],
    inPractice: [
      "Upload a build in QApilot, let coverage come together, then execute selected suites on BrowserStack devices.",
      "Failures still carry screen context from QApilot. Device cloud just expands where the run happened.",
      "Useful when your team already pays for BrowserStack and doesn't want a second farm.",
    ],
    worthKnowing: [
      "This is a split of labor, not a rip-and-replace. Keep BrowserStack for scale; keep QApilot for what to run and how it stays current.",
      "Works for teams that already gate releases on BrowserStack results and want less script upkeep underneath.",
    ],
  },
  {
    slug: "lambdatest",
    name: "LambdaTest",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}9f5ef4eb-33b0-4852-a38a-61a25aaebe56.png`,
    description:
      "QApilot builds the suite. LambdaTest spreads it across the devices you care about.",
    metaTitle: "LambdaTest Integration. Autonomous Mobile Testing",
    metaDescription:
      "Connect QApilot with LambdaTest: explore and generate mobile tests in QApilot, execute across LambdaTest’s device grid.",
    heroLead:
      "Discover and maintain coverage in QApilot, then run it on LambdaTest when you need more devices in the mix.",
    highlights: [
      "Coverage discovery before you burn device minutes",
      "Less locator churn when screens change",
      "Fits next to the CI jobs you already have",
      "Handy if LambdaTest is already on the vendor list",
    ],
    inPractice: [
      "Let QApilot map journeys first. Point execution at LambdaTest when you want a wider OS and device cut.",
      "Healing stays in QApilot. You are not maintaining two separate automation layers.",
      "Good fit for teams that already schedule LambdaTest runs and want smarter inputs into those runs.",
    ],
    worthKnowing: [
      "You keep LambdaTest for grid capacity. QApilot reduces how often those jobs fail for stale selectors.",
      "If your release checklist already mentions LambdaTest, this is usually an additive step, not a new process.",
    ],
  },
  {
    slug: "sauce-labs",
    name: "Sauce Labs",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}445698aa-1a01-42ef-9a78-96903c80c41f.png`,
    description:
      "QApilot handles coverage and upkeep. Sauce Labs handles parallel runs on your device matrix.",
    metaTitle: "Sauce Labs Integration. Autonomous Mobile Testing",
    metaDescription:
      "Connect QApilot with Sauce Labs: generate mobile coverage in QApilot, execute in parallel on Sauce Labs infrastructure.",
    heroLead:
      "Keep Sauce Labs for execution scale. Let QApilot decide what runs and keep those tests from rotting every sprint.",
    highlights: [
      "Generation and healing in QApilot",
      "Parallel mobile runs on Sauce Labs",
      "Journey-level context in the report, not just pass/fail",
      "Plays with automation you already invested in",
    ],
    inPractice: [
      "QApilot produces the suite. Sauce Labs spreads it. Reporting still points back to screens and flows.",
      "Teams that already live in Sauce Labs dashboards can keep that habit and still cut locator debt.",
      "Works when you need overnight or multi-device sweeps without growing the scripting team.",
    ],
    worthKnowing: [
      "You are not throwing away Sauce Labs work. You are feeding it fresher, lower-maintenance coverage.",
      "Best when release managers already trust Sauce Labs as the execution layer.",
    ],
  },
  {
    slug: "testrail",
    name: "TestRail",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}e9abab36-d809-4b15-8fd2-134b7e1d473e.png`,
    description:
      "Cases you already track in TestRail can become runnable mobile automation through QApilot CoWork.",
    metaTitle: "TestRail Integration. CoWork Mobile Automation",
    metaDescription:
      "Connect QApilot with TestRail: import cases into CoWork and turn managed test cases into executable mobile automation.",
    heroLead:
      "Bring TestRail cases into CoWork so planned coverage stops living only as checklists.",
    highlights: [
      "Import cases you already wrote in TestRail",
      "Turn them into runnable mobile flows in CoWork",
      "Keep TestRail as the planning source of truth",
      "Less double entry between management and automation",
    ],
    inPractice: [
      "QE leads keep structuring suites in TestRail. CoWork picks up cases that should actually run on devices.",
      "Useful when half the suite is still manual and you want a path out without rewriting everything.",
      "Status stays understandable for people who live in TestRail day to day.",
    ],
    worthKnowing: [
      "This is for teams that are not ready to abandon TestRail, and shouldn't have to.",
      "Start with the critical path cases. You do not need to import the entire backlog on day one.",
    ],
  },
  {
    slug: "jira",
    name: "Jira",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}jira-software-logo.png`,
    description:
      "Failures land in Jira with enough context that eng can act without a Slack scavenger hunt.",
    metaTitle: "Jira Integration. Actionable Mobile Bug Tickets",
    metaDescription:
      "Connect QApilot with Jira: auto-create tickets with screen context, severity, and reproduction detail from mobile test failures.",
    heroLead:
      "When QApilot catches a failure, Jira gets a ticket with the screen, severity, and enough trail to reproduce.",
    highlights: [
      "Tickets include screen-level evidence",
      "Severity comes along so triage is faster",
      "Fewer \"can you send a screenshot?\" loops",
      "QE and eng stay in the same issue queue",
    ],
    inPractice: [
      "A failed run can open or update a Jira issue instead of dying in a report nobody opens.",
      "Engineers see where in the app it broke, not just a red row in a CI log.",
      "Works whether you use company-managed or team-managed projects. Wire the project you already use.",
    ],
    worthKnowing: [
      "Noise is the enemy. Tune what gets filed so Jira does not fill up with flakes.",
      "Pairs well with Slack or Teams alerts: ping the channel, detail in Jira.",
    ],
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}bcb4526d-637b-49ba-a92d-b437d33a0516.png`,
    description:
      "Run updates and release signals show up in the Teams channels people already watch.",
    metaTitle: "Microsoft Teams Integration. Release Alerts",
    metaDescription:
      "Connect QApilot with Microsoft Teams: send build and test notifications to the channels release and QE teams already use.",
    heroLead:
      "Push QApilot run status into Microsoft Teams so release and QE folks hear about failures without digging for them.",
    highlights: [
      "Channel pings for runs and failures",
      "Readiness notes where the release thread already lives",
      "Less tab-hopping for status checks",
      "Fits orgs that standardized on Teams",
    ],
    inPractice: [
      "Point alerts at the channel that owns the release. Keep noise out of general chat.",
      "A failed critical path can notify the right people before standup, not after the war room.",
      "Release managers who live in Teams get a signal without learning another dashboard first.",
    ],
    worthKnowing: [
      "Start with one channel. Expand once you know which alerts people actually read.",
      "Combine with Jira if you want the ping in Teams and the paper trail in tickets.",
    ],
  },
  {
    slug: "slack",
    name: "Slack",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}f9ca9bd8-d74c-4852-8fa6-34c1be76aea3.png`,
    description:
      "Run results and readiness notes land in Slack while the team is already there.",
    metaTitle: "Slack Integration. Real-Time QA Alerts",
    metaDescription:
      "Connect QApilot with Slack: get alerts on mobile test runs, failures, and release readiness in the channels you already use.",
    heroLead:
      "Get QApilot failures and readiness updates in Slack instead of finding out from a red build an hour later.",
    highlights: [
      "Fast pings when something important fails",
      "Readiness updates without opening the product UI",
      "Triage starts in the thread, not in a forgotten inbox",
      "Easy to route by squad or release train",
    ],
    inPractice: [
      "Wire #mobile-release or your squad channel. Ignore vanity metrics; alert on what blocks ship.",
      "Someone on-call can jump from the Slack message into the failing screen context.",
      "Works for small teams that basically run the release from Slack anyway.",
    ],
    worthKnowing: [
      "Too many alerts and people mute the channel. Be picky.",
      "Pairs cleanly with Jira: Slack for speed, Jira for ownership.",
    ],
  },
  {
    slug: "jenkins",
    name: "Jenkins",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}7cbcd4d0-466c-4693-8d02-87a5f30f712b.png`,
    description:
      "Kick off QApilot runs from the Jenkins jobs you already trust for builds.",
    metaTitle: "Jenkins Integration. CI/CD Mobile QA",
    metaDescription:
      "Connect QApilot with Jenkins: trigger mobile QA from pipelines and use quality signals as part of your release gate.",
    heroLead:
      "Hook QApilot into Jenkins so a green build can also mean the mobile suite actually ran.",
    highlights: [
      "Trigger QApilot from existing Jenkins jobs",
      "Use results as a release gate, not a side report",
      "No separate \"QA only\" pipeline nobody maintains",
      "Fits shops that still center CI on Jenkins",
    ],
    inPractice: [
      "After the APK or IPA lands, Jenkins can start a QApilot run before promotion.",
      "Fail the stage when critical journeys fail. Soft-fail or warn on lower-severity noise if you prefer.",
      "Keeps mobile QA in the same place ops already debug builds.",
    ],
    worthKnowing: [
      "You do not need to migrate off Jenkins to get autonomous coverage.",
      "Start by gating one train or one app flavor, then widen.",
    ],
  },
  {
    slug: "xray",
    name: "XRAY",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}k3huxfe9vfbic6vuvurwtsvu5ggz.png`,
    description:
      "Keep XRAY as the Jira-side test record while QApilot does the heavy lifting on devices.",
    metaTitle: "XRAY Integration. Jira-Native Test Management",
    metaDescription:
      "Connect QApilot with XRAY: keep Jira-native test management in sync with autonomous mobile execution and coverage.",
    heroLead:
      "Stay in XRAY for planning and traceability. Let QApilot run the mobile work those plans describe.",
    highlights: [
      "XRAY stays the planning and traceability layer",
      "QApilot runs the mobile execution behind it",
      "Coverage and release quality stay visible in Jira",
      "Less drift between \"planned\" and \"actually ran\"",
    ],
    inPractice: [
      "Test leads keep structuring work in XRAY. Runs and outcomes reflect what happened on devices.",
      "Helpful when compliance or audit trails expect Jira-native test records.",
      "Reduces the gap where XRAY says covered and automation quietly lagged behind.",
    ],
    worthKnowing: [
      "Built for teams that already standardized on XRAY inside Jira.",
      "You are connecting systems of record to systems of execution, not replacing either overnight.",
    ],
  },
] as const;

export function getIntegrationBySlug(
  slug: string,
): IntegrationTool | undefined {
  return INTEGRATION_TOOLS.find((tool) => tool.slug === slug);
}

export function integrationPath(slug: string): string {
  return `${PATHS.INTEGRATIONS}/${slug}`;
}

export const INTEGRATION_SLUGS = INTEGRATION_TOOLS.map((tool) => tool.slug);
