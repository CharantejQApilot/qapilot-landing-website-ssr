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
  /** Product screenshot shown in a phone frame on the article hero. Falls back to the logo. */
  heroImageSrc?: string;
  heroImageAlt?: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
  /** Built-in phone mock when no store screenshot exists yet. */
  heroMock?: "geml";
  tags: string[];
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
    heroImageSrc: "/case-studies/wio-personal.jpg",
    heroImageAlt:
      "Wio Personal app showing total balance, accounts, savings, and investments",
    heroImageWidth: 576,
    heroImageHeight: 1024,
    tags: ["Digital banking", "Mobile-first", "Identity & biometrics"],
    titleBefore: "Complex mobile banking journeys, turned into ",
    titleAccent: "scalable automation coverage",
    titleAfter: "",
    headline:
      "Complex mobile banking journeys, turned into scalable automation coverage",
    subtitle:
      "How QApilot helped Wio's automation team scale coverage across onboarding, credit applications, identity verification, biometric flows, API validations, and cross-OS execution.",
    facts: [
      { label: "Client", value: "WIO Bank" },
      { label: "Industry", value: "Digital Banking" },
      { label: "Platforms", value: "iOS, Android" },
    ],
    tools: [
      "QApilot Recorder",
      "CoWork",
      "AI healing",
      "LambdaTest biometric bypass",
      "Face ID / fingerprint validation",
      "HTTP keywords",
      "Dynamic test data",
      "Cross-OS execution",
    ],
    metrics: [
      {
        value: "74%",
        label: "of planned sprint automation delivered",
      },
      {
        value: "71%",
        label: "of the Identity suite automated, including biometric-gated journeys",
      },
      {
        value: "35%",
        label: "of Retail flows automated in the first delivery wave",
      },
    ],
    about: {
      industry: "Digital banking",
      headquarters: "Abu Dhabi, UAE",
      engagement: "Ongoing",
      platforms: "iOS, Android (Wio Personal and Wio Business)",
      body:
        "Wio is a Central Bank of the UAE-licensed digital bank. Customers open Personal and Business accounts from the mobile app with Emirates ID or UAE visa verification, then save, spend, borrow, and invest in one place. Those same journeys, onboarding, identity, biometrics, credit applications, and API-backed checks, are exactly where record-and-playback tools stall. QApilot automated those release-critical mobile flows on the real banking app, not a simplified demo.",
    },
    beforeAfter: [
      {
        before: "Banking journeys that defeat record-and-playback: biometrics, identity, API-driven validation, dynamic test data, and cross-OS runs.",
        after: "Structured automation across retail, SME, identity, onboarding, credit-application, and API-heavy flows.",
      },
      {
        before: "Squads still learning the platform, with little sprint coverage converting into reliable automated suites.",
        after: "War-room support, daily syncs, and one-to-one enablement turned adoption into measurable sprint delivery.",
      },
      {
        before: "Failed and stopped runs on dynamic app behaviour, with little recovery once a step broke.",
        after: "Step- and case-level conditions, assertions, if/else, recovery, exception blocks, and AI healing toward reliable completions.",
      },
      {
        before: "UI-only scenarios that could not represent Face ID, fingerprint, or API response reuse.",
        after: "Biometric bypass, Face ID / fingerprint validation, HTTP keywords, random/API test data, and larger-APK cross-OS execution.",
      },
    ],
    approach: {
      intro:
        "QApilot joined as a product partner, not a dropped-in tool. The goal was measurable coverage on the journeys that matter for release: retail, SME, identity, onboarding, credit, and API-backed checks.",
      paragraphs: [
        "The first move was out of platform exploration and into structured delivery: retail, SME, identity, onboarding, credit-application, and API-heavy suites, tagged so each squad could see coverage land against their own journeys.",
        "Stability work targeted dynamic behaviour. Conditions, assertions, recovery and fallback, exception blocks, and AI healing for XPath identification cut failed and stopped runs. Banking-specific execution followed: biometric auth bypass on LambdaTest, Face ID and fingerprint validation, HTTP keywords in Recorder, update-test-data during execution, and random data generation across API and RPA.",
        "Results followed the same suites. Planned sprint automation reached 74%. Identity hit 71%, including biometric-gated journeys that generic tools never finished. Retail opened with 35% automated in the first delivery wave, with biometric, Face ID / fingerprint, and HTTP capabilities shipping mid-engagement so coverage could keep expanding on the real app.",
      ],
    },
    highlights: [
      "Biometric auth bypass, Face ID / fingerprint validation, and HTTP keywords shipped mid-engagement",
      "Update test data during execution, random data generation, exception / execute-on-failure blocks",
      "Extended scheduler window, AI healing for XPath, reset-app keyword, step cloning",
      "Import and create functional blocks in Recorder, squad-tag and user-wise filtering, larger-APK execution",
      "Forward-deployed RCA on failed runs, XPath guidance, onboarding-flow setup, and CoWork enablement",
      "Alignment sessions that bridged documented test cases with actual app behaviour",
    ],
    services: [
      {
        title: "Faster coverage across complex flows",
        body: "Moved from platform exploration to structured automation delivery across retail, SME, identity, onboarding, credit-application, and API-heavy journeys.",
        bullets: [
          "Squad-tagged suites",
          "Sprint-level coverage delivered",
          "Release-critical journey focus",
        ],
      },
      {
        title: "Stability for dynamic app behaviour",
        body: "Step- and case-level conditions, assertions, if/else, recovery, exception blocks, and AI healing so runs complete instead of stopping on the first mismatch.",
        bullets: [
          "AI healing for XPath identification",
          "Exception / execute-on-failure blocks",
          "Reusable functional blocks",
        ],
      },
      {
        title: "Banking-specific execution",
        body: "Biometric bypass, Face ID / fingerprint validation, API response reuse, dynamic and random test data, and cross-OS support beyond UI-only scenarios.",
        bullets: [
          "LambdaTest biometric bypass",
          "HTTP keyword in Recorder",
          "Larger-APK and cross-OS runs",
        ],
      },
      {
        title: "Forward-deployed engineering",
        body: "War-room support during ramp-up, daily syncs, RCA, CoWork enablement on recording, execution, reporting, and test-case management.",
        bullets: [
          "One-to-one enablement",
          "Documented-vs-actual flow alignment",
          "Onboarding-flow setup",
        ],
      },
    ],
    takeaway:
      "Record-and-playback tools stall on biometrics, identity, and API-driven banking flows. QApilot automated them, shipped banking-specific capabilities mid-engagement, and left Wio with measurable coverage on the journeys that matter for release.",
    related: [
      { href: PATHS.AUTONOMOUS_TESTING, label: "Autonomous testing" },
      { href: PATHS.AI_SELF_HEALING, label: "AI self-healing" },
      { href: PATHS.COWORK, label: "CoWork" },
      { href: PATHS.ENTERPRISE, label: "Enterprise" },
    ],
    seoTitle: "Wio Case Study. Mobile Banking Automation Coverage",
    seoDescription:
      "How QApilot turned Wio's complex mobile-banking journeys into scalable automation: 74% sprint coverage delivered, 71% Identity suite automated, and biometric flows running on the real app.",
  },
  {
    slug: "geml",
    clientName: "Geml",
    clientUrl: "https://www.geml.co/",
    logoSrc: "/case-studies/geml.png",
    logoAlt: "Geml logo",
    heroMock: "geml",
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
    heroImageSrc: "/case-studies/growsari-app.jpg",
    heroImageAlt:
      "GrowSari mobile commerce app with product catalog, cart, and partner benefits",
    heroImageWidth: 576,
    heroImageHeight: 1024,
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
