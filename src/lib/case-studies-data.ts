import { PATHS } from "@/lib/routes";

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudyFact = {
  label: string;
  value: string;
};

export type CaseStudyService = {
  title: string;
  body: string;
  bullets: string[];
};

export type CaseStudyRelatedLink = {
  href: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  clientName: string;
  clientUrl: string;
  logoSrc: string;
  logoAlt: string;
  tags: string[];
  quote?: {
    text: string;
    name: string;
    org: string;
  };
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  /** Plain H1 for metadata / JSON-LD */
  headline: string;
  subtitle: string;
  facts: CaseStudyFact[];
  tools: string[];
  metrics: CaseStudyMetric[];
  about: {
    industry: string;
    headquarters: string;
    engagement: string;
    platforms: string;
    body: string;
  };
  beforeAfter: Array<{ before: string; after: string }>;
  approach: {
    intro: string;
    paragraphs: string[];
  };
  highlights: string[];
  services: CaseStudyService[];
  takeaway: string;
  related: CaseStudyRelatedLink[];
  seoTitle: string;
  seoDescription: string;
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "wio",
    clientName: "Wio",
    clientUrl: "https://wio.io/",
    logoSrc: "/case-studies/wio.png",
    logoAlt: "Wio Bank logo",
    tags: ["Digital banking", "Flutter", "Android and iOS"],
    titleBefore: "Reliable automation on a ",
    titleAccent: "Flutter banking app",
    titleAfter: ", owned by a small QA team",
    headline:
      "Reliable automation on a Flutter banking app, owned by a small QA team",
    subtitle:
      "WIO needed dependable UI automation across onboarding, identity, credit, and retail journeys without assembling a toolchain. QApilot replaced the stitched-together stack with a single platform built for canvas-rendered apps and banking-specific flows. It now runs the retail regression suite unattended, every night.",
    quote: {
      text: "Our automation speed is much faster now, test maintenance is far easier, and even a small team can achieve strong automation coverage. As a result, our app quality has improved as we run sanity testing schedulers daily and on demand.",
      name: "Umair Shah",
      org: "WIO",
    },
    facts: [
      { label: "Client", value: "WIO Bank" },
      { label: "Industry", value: "Digital Banking" },
      { label: "Platforms", value: "iOS, Android, Flutter" },
    ],
    tools: [
      "Element-aware Flutter recording",
      "AI healing",
      "Autonomous crawler",
      "Assisted RCA",
      "Nightly scheduler",
      "Biometric / Face ID validation",
      "Dynamic test data",
      "Cross-OS execution",
    ],
    metrics: [
      {
        value: "89.3%",
        label: "step success rate on executed steps, skipped excluded",
      },
      {
        value: "2.5",
        label: "engineer-days of unattended execution delivered every day",
      },
      {
        value: "97%",
        label: "of runs execute outside working hours",
      },
      {
        value: "11,025",
        label: "steps per daily cycle across 29 plans and 13 device models",
      },
    ],
    about: {
      industry: "Digital banking",
      headquarters: "Abu Dhabi, UAE",
      engagement: "Ongoing",
      platforms: "iOS, Android, Flutter (Wio Personal and Wio Business)",
      body:
        "Wio is a Central Bank of the UAE-licensed digital bank. Customers open Personal and Business accounts from the mobile app, then save, spend, borrow, and invest in one place. Release cadence depends on proving, every sprint, that onboarding, identity verification, credit, retail, and SME journeys still work on Android and iOS. A small QA group needed one platform they could own end to end — record, save, execute, report, repeat — rather than a set of tools bridged by scripts.",
    },
    beforeAfter: [
      {
        before:
          "Flutter renders to a canvas. There is no native element tree for conventional locator-based tools to walk, so record-and-playback degrades as soon as the interface changes.",
        after:
          "Element-aware recording works against Flutter's rendered widgets rather than an assumed DOM, with execution, reporting, and test-case management in the same place.",
      },
      {
        before:
          "Banking specifics compounded the problem: biometric authentication, identity verification, API-driven validation, dynamic test data, and cross-OS execution each defeat a generic tool on its own.",
        after:
          "Biometric bypass, Face ID and fingerprint validation, API response reuse, dynamic and random test data, cross-OS runs, and larger-APK support — well beyond UI-only scenarios.",
      },
      {
        before:
          "Failed and stopped runs on dynamic app behaviour, with little recovery once a step broke and maintenance compounding as suites grew.",
        after:
          "Step- and case-level conditions, assertions, if/else, recovery, exception blocks, and AI healing that re-resolves shifted elements instead of failing the run.",
      },
      {
        before:
          "Quality signal arrived after a release decision, with engineers present for long execution windows and little overnight coverage.",
        after:
          "The scheduler runs 20.3 hours of test execution per cycle with no engineer present — 97% outside working hours, so squads open a result in the morning instead of starting a run.",
      },
    ],
    approach: {
      intro:
        "QApilot joined as a product partner, not a dropped-in tool. The requirement was a single solution a small QA team could own: record, save, execute, report, repeat — on the Flutter journeys that matter for release.",
      paragraphs: [
        "Achieving reliable UI automation on WIO's Flutter apps was the starting constraint. Multiple product squads were ramping at the same time, with progress dependent on access, environment, and test-data readiness. QApilot consolidated the stitched toolchain into one platform and moved from exploratory use into sprint-aligned delivery across retail, SME, identity, onboarding, credit-application, and API-heavy flows.",
        "The engineering layer covered banking reality: biometric bypass, Face ID and fingerprint validation, API response reuse, dynamic test data, and cross-OS execution. Stability work added conditions, assertions, recovery, and exception blocks. When an element shifts between builds, AI healing re-resolves it. The autonomous crawler proposes coverage so squads extend a baseline instead of authoring every case from zero, and assisted RCA directs time at genuine defects rather than environment noise.",
        "A Forward Deployed Engineer model ran war-room support, daily syncs, and one-to-one enablement across squads, plus alignment sessions that bridged documented test cases with actual application behaviour. An extended scheduler now runs daily sanity and on-demand execution: 11,025 steps across 29 test plans and 13 device models, both operating systems, and three application builds on the same day. Step success is 89.3% on executed steps, with skipped steps excluded entirely. Android sits at 92.2% and iOS at 91.3% on the platform reporting basis. Platform enhancements shipped mid-engagement in direct response to WIO's requirements.",
      ],
    },
    highlights: [
      "AI healing re-resolves shifted elements so maintenance falls as suites grow",
      "Autonomous, crawler-led test generation extends an existing baseline",
      "Assisted root-cause analysis on failed and stopped executions",
      "Forward Deployed Engineer war-room, daily syncs, and one-to-one enablement",
      "Nightly scheduler: 11,025 steps, 29 plans, 13 device models, 20.3 hours unattended",
      "Cards, transfers, lending, onboarding, biometrics, Open Finance, and scheduled sanity",
    ],
    services: [
      {
        title: "Banking-specific execution",
        body: "Biometric bypass, Face ID and fingerprint validation, API response reuse across steps, dynamic and random test data, cross-OS runs, and larger-APK support — well beyond UI-only scenarios.",
        bullets: [
          "Biometric and Face ID flows",
          "API response reuse",
          "Cross-OS and larger-APK runs",
        ],
      },
      {
        title: "Stability for dynamic behaviour",
        body: "Step- and case-level conditions, assertions, if/else branching, recovery and fallback paths, and exception blocks, cutting failed and stopped runs toward reliable completions.",
        bullets: [
          "AI healing for element identification",
          "Conditions, assertions, and recovery",
          "Exception and fallback paths",
        ],
      },
      {
        title: "Coverage across the journey",
        body: "Structured automation delivery across retail, SME, identity, onboarding, credit-application, and API-heavy flows, replacing exploratory platform use with sprint-aligned delivery.",
        bullets: [
          "Retail and SME journeys",
          "Identity and onboarding",
          "Credit and API-heavy flows",
        ],
      },
      {
        title: "Operationalizing at scale",
        body: "Forward Deployed Engineer support during ramp-up, an extended scheduler for daily sanity and on-demand runs, and platform enhancements shipped mid-engagement against WIO's requirements.",
        bullets: [
          "War-room and one-to-one enablement",
          "Nightly unattended regression",
          "Product partnership, not a fixed handoff",
        ],
      },
    ],
    takeaway:
      "WIO needed one platform a small QA team could own on Flutter-rendered banking journeys. QApilot now runs the retail regression suite unattended every night — 11,025 steps, 89.3% step success, and 2.5 engineer-days of execution with no engineer present.",
    related: [
      { href: PATHS.AUTONOMOUS_TESTING, label: "Autonomous testing" },
      { href: PATHS.AI_SELF_HEALING, label: "AI self-healing" },
      { href: PATHS.COWORK, label: "CoWork" },
      { href: PATHS.FOR_FLUTTER, label: "Flutter testing" },
    ],
    seoTitle: "Wio Case Study. Flutter Banking Automation",
    seoDescription:
      "How QApilot automated WIO's Flutter banking app for a small QA team: 89.3% step success, 11,025 nightly steps, and 97% of runs outside work hours.",
  },
  {
    slug: "geml",
    clientName: "Geml",
    clientUrl: "https://www.geml.co/",
    logoSrc: "/case-studies/geml.png",
    logoAlt: "Geml logo",
    tags: ["Dating app", "Flutter", "Pre-launch"],
    titleBefore: "Full sanity automation for a pre-launch dating app, in ",
    titleAccent: "two weeks",
    titleAfter: "",
    headline:
      "Full sanity automation for a pre-launch dating app, in two weeks",
    subtitle:
      "How QApilot automated Geml's entire sanity suite, trained the team, and handed off regression in a two-week engagement, cracking the Flutter, mock-location, and swipe-gesture automation that stalls generic tools on dating apps.",
    facts: [
      { label: "Client", value: "Geml" },
      { label: "Industry", value: "Consumer Dating" },
      { label: "Platforms", value: "iOS, Android (Flutter)" },
    ],
    tools: [
      "Element- and gesture-aware recording",
      "Autonomous crawler",
      "Knowledge graph",
      "Mock GPS / location control",
      "Cloud-device execution",
      "OTP / SMS verification flows",
    ],
    metrics: [
      {
        value: "2 weeks",
        label: "from onboarding to a fully automated sanity suite and a trained team",
      },
      {
        value: "100%",
        label: "of the sanity suite automated, with regression now client-run",
      },
      {
        value: "10×",
        label:
          "faster pre-launch sanity cycles after moving regression off multi-day manual passes",
      },
    ],
    about: {
      industry: "Consumer dating",
      headquarters: "United States",
      engagement: "Two-week launch-readiness engagement",
      platforms: "iOS, Android, Flutter",
      body:
        "Geml is a US-based dating app that needed a safety net before go-to-market. A lean pre-launch team cannot absorb flaky releases or slow manual passes. The product is Flutter, so the UI paints to a canvas instead of a native element tree, and the core journeys depend on mock location, swipe and card gestures, OTP onboarding, and a branching compatibility survey. Those are the exact failure modes of generic, element-tree automation.",
    },
    beforeAfter: [
      {
        before: "No automation practice, and no capacity to build a bespoke Flutter harness before launch.",
        after: "Full sanity suite automated in two weeks, with the team trained to own regression.",
      },
      {
        before: "Flutter canvas UI with no native element tree, so locator-based tools stall or fall back to brittle coordinates.",
        after: "Element- and gesture-aware recording on the rendered UI, identifying swipe-to-like/pass and card stacks as intent.",
      },
      {
        before: "Location-based matching could not run deterministically in tests.",
        after: "Mock-location control sets device GPS so discovery and matching are repeatable.",
      },
      {
        before: "Manual OTP, survey, and profile journeys that would not keep up with pre-launch cadence.",
        after: "Sign-up, SMS verification (wrong-code / resend), returning-user sign-in, home-feed preferences, and survey complete / re-take covered end to end.",
      },
    ],
    approach: {
      intro:
        "The engagement paired platform capability with hands-on engineering. The goal was a suite Geml could run after week two, not a vendor-operated black box.",
      paragraphs: [
        "Intake started with APK and test cases. Recording covered dating-specific gestures, swipe-to-like/pass and card stacks, plus mock GPS so location-based matching did not depend on wherever the lab phone happened to sit.",
        "Onboarding and authentication were automated as they actually behave: sign-up, SMS verification including wrong-code and resend, and returning-user sign-in. Profile and match preferences were checked against the home feed. The compatibility survey was covered for both complete and re-take paths.",
        "Because Geml is Flutter, recording had to work on the painted UI. QApilot treats controls and gestures as intent rather than coordinates, which is what keeps the suite stable across devices and layout tweaks. Cloud-device execution and reusable location and gesture blocks give the team a path to extend coverage as new features land.",
      ],
    },
    highlights: [
      "Mock-location control for deterministic matching and discovery",
      "Gesture-aware recording for swipe-to-like/pass and card stacks",
      "OTP onboarding including wrong-code and resend paths",
      "Compatibility survey complete and re-take",
      "Training and onboarding so regression is client-run",
      "Execution reports as a repeatable sanity gate before each build",
    ],
    services: [
      {
        title: "Flutter-ready recording",
        body: "Canvas-rendered Flutter UI without a native element tree, automated as rendered controls and gestures instead of brittle coordinates.",
        bullets: [
          "Element-aware on painted UI",
          "Stable across layout changes",
          "Mode-matching for stateful flows",
        ],
      },
      {
        title: "Dating-app reality",
        body: "Mock GPS, swipe and card gestures, OTP, and a branching survey, the journeys generic tools skip.",
        bullets: [
          "Mock location",
          "Swipe / card stacks",
          "Phone / OTP verification",
        ],
      },
      {
        title: "Launch-speed delivery",
        body: "Two weeks from onboarding to a fully automated sanity suite, timed to a pre-launch cadence.",
        bullets: [
          "APK and test-case intake",
          "Hands-on recording workshops",
          "Shared execution reports",
        ],
      },
      {
        title: "Team ownership",
        body: "Training so Geml runs and extends regression after go-live, rather than depending on an outside vendor for every run.",
        bullets: [
          "Client-run regression",
          "Reusable location and gesture blocks",
          "Cloud-device execution",
        ],
      },
    ],
    takeaway:
      "QApilot got Geml launch-ready in two weeks: full sanity suite, a trained team, and Flutter plus mock-location and gesture automation that stalls generic tools on dating apps.",
    related: [
      { href: PATHS.FOR_FLUTTER, label: "Flutter testing" },
      { href: PATHS.AUTONOMOUS_TESTING, label: "Autonomous testing" },
      { href: PATHS.COWORK, label: "CoWork" },
      { href: PATHS.PARTNERS, label: "Partners" },
    ],
    seoTitle: "Geml Case Study. Flutter Dating Sanity in 2 Weeks",
    seoDescription:
      "How QApilot automated Geml's full Flutter dating-app sanity suite in two weeks, including mock location, swipe gestures, OTP onboarding, and a trained team owning regression.",
  },
  {
    slug: "growsari",
    clientName: "GrowSari",
    clientUrl: "https://growsari.com/",
    logoSrc: "/case-studies/growsari.webp",
    logoAlt: "GrowSari logo",
    tags: ["B2B retail", "Commerce app", "OTP-gated flows"],
    titleBefore: "Regression readiness turned into ",
    titleAccent: "real automation progress",
    titleAfter: "",
    headline: "Regression readiness turned into real automation progress",
    subtitle:
      "How QApilot moved GrowSari from a regression plan to evidenced mobile automation on a real B2B commerce app: cloud-device login, Record & Playback through OTP-gated store-owner journeys, and team adoption that kept growing while app-side OTP fixes continued.",
    facts: [
      { label: "Client", value: "GrowSari" },
      { label: "Industry", value: "B2B Retail Commerce" },
      { label: "Platforms", value: "iOS, Android" },
    ],
    tools: [
      "Record & Playback",
      "Element-aware recording",
      "Cloud-device execution",
      "Execution reports",
      "Autonomous crawler",
      "Knowledge graph",
    ],
    metrics: [
      {
        value: "+161%",
        label: "growth in created test steps across reporting checkpoints",
      },
      {
        value: "+75%",
        label: "growth in active users across reporting checkpoints",
      },
      {
        value: "2×",
        label:
          "faster path from login blockers to recorded store-owner journeys once Record & Playback was applied to OTP-gated flows",
      },
    ],
    about: {
      industry: "B2B retail commerce",
      headquarters: "Philippines",
      engagement: "Partner enablement with Feuji",
      platforms: "iOS, Android",
      body:
        "GrowSari is a tech-enabled B2B platform for the Philippines' sari-sari stores: on-demand inventory, e-services such as load and bills payment, and working-capital tools in one app. Store owners depend on ordering, payments, Scan & Pay, and fulfilment every release. Those revenue journeys sit behind login, OTP, and MPIN gates, so automation only matters if it can survive real auth and run on real devices, not just document a regression plan.",
    },
    beforeAfter: [
      {
        before:
          "A regression plan and test cases existed, but the team still lacked reliable automated runs on the live GrowSari app.",
        after:
          "Store-owner journeys were recorded in QApilot and re-run on cloud devices, with shared execution reports the team could use as release evidence.",
      },
      {
        before:
          "Login stalled automation: OTP timed out mid-run, keypad entry was brittle across devices, and security controls blocked unclean lab phones.",
        after:
          "Cloud-device execution gave a clean login path, and element-aware Record & Playback handled OTP and MPIN entry without fragile coordinate taps.",
      },
      {
        before:
          "Pushing a crawl-everything first pass through OTP-gated commerce navigation produced unstable exploration and little usable coverage.",
        after:
          "Record & Playback carried the auth-gated revenue flows first. The autonomous crawler and knowledge graph stayed available for broader discovery once those gates were under control.",
      },
      {
        before:
          "Enablement risked stalling while app-side OTP and environment issues were still open with GrowSari engineering.",
        after:
          "Hands-on workshops still shipped Login, Scan & Pay, and Place Order (COD) coverage, and adoption kept rising while those app-side fixes continued.",
      },
    ],
    approach: {
      intro:
        "QApilot treated GrowSari as a release-readiness engagement on a real B2B commerce app: unlock authentication, automate the journeys that make money, and leave the team with runs they can repeat, not a slide deck about readiness.",
      paragraphs: [
        "The first constraint was getting into the app at all. Store-owner flows sit behind phone login, OTP, and MPIN. Lab-device security limits and short-lived OTPs were stopping runs before catalog, cart, or checkout coverage could start. QApilot moved execution onto cloud devices for a controllable login surface, then recorded auth with element-aware steps so OTP and MPIN entry stayed stable across layouts instead of breaking on pixel taps.",
        "With login workable, the engagement used Record & Playback for the intentional revenue paths GrowSari already cared about: Login with OTP and MPIN, Scan & Pay, and Place Order with cash on delivery. That matches how QApilot is meant to be used: autonomous crawl and the knowledge graph for open discovery, Record & Playback when a team needs precise, human-defined coverage through gated commerce flows. Blockers that belonged in GrowSari's app or environment stayed with their engineers; platform work stayed on recording, execution, and reporting.",
        "Enablement ran in parallel with those fixes. Feuji-partnered workshops walked the team through intake, recording, cloud execution, and reading reports so regression was no longer a planning artifact. Test steps grew +161% and active users +75% across checkpoints, including while OTP changes were still pending on the app side. The outcome was evidenced automation the GrowSari team could keep running after the workshops ended.",
      ],
    },
    highlights: [
      "Cloud devices used for a clean store-owner login path past lab-phone security limits",
      "OTP and MPIN recorded with element-aware steps instead of brittle coordinate taps",
      "Login, Scan & Pay, and Place Order (COD) covered with Record & Playback",
      "Autonomous crawler kept for broader discovery after auth-gated paths were stable",
      "Shared cloud execution reports turned workshop runs into release evidence",
      "Team adoption continued (+161% steps, +75% active users) while app-side OTP work stayed open",
    ],
    services: [
      {
        title: "Login that could actually start a run",
        body: "QApilot moved GrowSari onto cloud devices and recorded phone login, OTP, and MPIN so automation could enter the app instead of failing at the gate.",
        bullets: [
          "Cloud-device execution",
          "Element-aware OTP and MPIN",
          "Clear split of app-side vs platform blockers",
        ],
      },
      {
        title: "Revenue journeys on Record & Playback",
        body: "Once auth worked, the engagement recorded the store-owner paths that matter for releases: login, Scan & Pay, and cash-on-delivery checkout.",
        bullets: [
          "Login with OTP and MPIN",
          "Scan & Pay",
          "Place Order (COD)",
        ],
      },
      {
        title: "The right QApilot mode for gated commerce",
        body: "Record & Playback carried precise, human-defined coverage through OTP-gated flows. The autonomous crawler and knowledge graph remained available for open exploration afterward.",
        bullets: [
          "Record & Playback first on gated paths",
          "Crawler ready for wider discovery",
          "No crawl-everything through expiring OTP",
        ],
      },
      {
        title: "A practice the team could keep running",
        body: "Feuji-partnered workshops covered intake, recording, cloud execution, and reports so GrowSari left with repeatable regression, not a one-off lab demo.",
        bullets: [
          "Hands-on recording workshops",
          "Shared execution reports",
          "+161% steps and +75% active users",
        ],
      },
    ],
    takeaway:
      "QApilot turned GrowSari's regression plan into measured mobile coverage by unblocking login on cloud devices, recording OTP-gated store-owner journeys with Record & Playback, and keeping adoption moving while app-side OTP work continued.",
    related: [
      { href: PATHS.AUTONOMOUS_TESTING, label: "Autonomous testing" },
      { href: PATHS.COWORK, label: "CoWork" },
      { href: PATHS.DUAL_DEVICE_TESTING, label: "Dual device testing" },
      { href: PATHS.PARTNERS, label: "Partners" },
    ],
    seoTitle: "GrowSari Case Study. B2B Commerce App Automation",
    seoDescription:
      "How QApilot moved GrowSari from regression planning to evidenced mobile automation: cloud-device login, Record & Playback on OTP-gated journeys, +161% test steps and +75% active users.",
  },
] as const;

export function caseStudyPath(slug: string): string {
  return `${PATHS.CASE_STUDIES}/${slug}`;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((study) => study.slug);
