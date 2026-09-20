import type { FaqItem } from "@/lib/faq-jsonld";

/**
 * Page-specific FAQs (visible accordion + FAQPage JSON-LD).
 * Answers restated from on-page claims only — no invented metrics.
 */
export const CASE_STUDY_FAQS: Record<string, readonly FaqItem[]> = {
  wio: [
    {
      question: "Why was Flutter a challenge for Wio’s previous automation stack?",
      answer:
        "Flutter renders to a canvas without a conventional native element tree, so locator-based record-and-playback broke as soon as the UI changed. Wio also needed banking-specific flows — biometrics, identity, dynamic data, and cross-OS runs — that a stitched toolchain struggled to cover as one system.",
    },
    {
      question: "What results did Wio see with QApilot?",
      answer:
        "QApilot runs Wio’s retail regression suite unattended every night: 11,025 steps across 29 plans and 13 device models, with 89.3% step success on executed steps and 97% of runs outside working hours — about 2.5 engineer-days of execution delivered daily without an engineer present.",
    },
    {
      question: "How does QApilot handle banking-specific mobile flows?",
      answer:
        "Element-aware Flutter recording works against rendered widgets. The engagement added biometric and Face ID validation, API response reuse, dynamic test data, cross-OS execution, recovery blocks, and AI healing when elements shift between builds.",
    },
    {
      question: "Who owns the automation at Wio after QApilot?",
      answer:
        "A small QA team owns record, save, execute, and report in one platform, with Forward Deployed Engineer enablement during ramp-up so squads could extend coverage without assembling a new toolchain.",
    },
  ],
  geml: [
    {
      question: "What problem was Geml solving with QApilot?",
      answer:
        "Geml needed launch-ready Flutter sanity coverage for a dating app — including mock-location and gesture-heavy flows — in about two weeks, without stalling on tools that struggle with canvas-rendered Flutter UI.",
    },
    {
      question: "How quickly did Geml get to a usable sanity suite?",
      answer:
        "QApilot delivered a full sanity suite and a trained team in two weeks, with Flutter plus mock-location and gesture automation that generic locator stacks often cannot sustain on dating apps.",
    },
    {
      question: "Why is Flutter dating-app automation hard?",
      answer:
        "Dating apps combine canvas-rendered Flutter UI with location simulation and gesture patterns. Conventional automation often fails when the element tree is missing or when location and gesture steps are not first-class.",
    },
    {
      question: "What did Geml keep after the engagement?",
      answer:
        "A launch-ready sanity baseline and a team trained to extend coverage on Flutter, so release checks were not a one-off consulting handoff.",
    },
  ],
  growsari: [
    {
      question: "What blocked GrowSari’s mobile regression plan before QApilot?",
      answer:
        "GrowSari needed to move from regression planning into evidenced automation on store-owner journeys. Cloud-device login and OTP-gated flows were blocking progress while app-side OTP work continued.",
    },
    {
      question: "What outcomes did GrowSari measure with QApilot?",
      answer:
        "With login unblocked on cloud devices and Record & Playback on OTP-gated store-owner journeys, GrowSari reported +161% test steps and +75% active users while adoption kept moving during OTP work.",
    },
    {
      question: "How did QApilot help with OTP-gated journeys?",
      answer:
        "Record & Playback captured OTP-gated store-owner flows once login worked on cloud devices, so the team could grow coverage instead of waiting for every app-side OTP dependency to finish first.",
    },
    {
      question: "Which QApilot capabilities mattered most for GrowSari?",
      answer:
        "Autonomous testing, CoWork, and dual-device testing — used together to turn a regression plan into measured mobile coverage on real store-owner journeys.",
    },
  ],
};

export const BLOG_FAQS: Record<string, readonly FaqItem[]> = {
  "ai-self-healing-tests-mobile-test-maintenance-crisis": [
    {
      question: "What is AI self-healing in mobile test automation?",
      answer:
        "AI self-healing adapts tests when the mobile UI changes — for example when selectors, hierarchy, or layout shift — so brittle scripts do not keep breaking the CI/CD pipeline after every release.",
    },
    {
      question: "Why do mobile tests break more often than web suites?",
      answer:
        "Mobile apps ship frequent UI changes across iOS, Android, and Flutter surfaces. Locator-only scripts tied to fragile IDs or hierarchy fail when those change, creating a maintenance crisis for QA teams.",
    },
    {
      question: "How does QApilot’s Knowledge Graph help self-healing?",
      answer:
        "QApilot builds a live map of screens and journeys. When a step fails after a UI change, healing can re-resolve the intent against that context instead of only retrying the same broken selector.",
    },
    {
      question: "When should teams adopt self-healing tests?",
      answer:
        "When maintenance time rivals authoring time — especially if every sprint ships UI churn and CI is blocked by flaky mobile selectors rather than real product defects.",
    },
  ],
  "network-traces-mobile-app-performance": [
    {
      question: "What are network traces in mobile app testing?",
      answer:
        "Network traces capture request and response timing and failures while the app runs, so you can see whether slow or broken experiences come from the client, the API, or the network path.",
    },
    {
      question: "Why test mobile performance on 3G and LTE conditions?",
      answer:
        "Lab Wi-Fi hides latency and packet loss users see on cellular. Simulating 3G and LTE exposes timeouts, retries, and UI jank that only appear under real-world bandwidth.",
    },
    {
      question: "How does QApilot use network traces?",
      answer:
        "QApilot can simulate real-world network conditions and capture full traces during automated runs, so performance regressions are tied to journeys — not only to synthetic lab metrics.",
    },
    {
      question: "What should QA look for in a network trace?",
      answer:
        "Slow endpoints, failed requests, oversized payloads, and client waits that stall the UI. Pair traces with the failing screen so product and backend teams share one evidence trail.",
    },
  ],
  "browserstack-alternative-mobile-ai-testing": [
    {
      question: "Is QApilot a BrowserStack alternative?",
      answer:
        "QApilot is an AI-native autonomous testing platform for mobile QA. Device clouds like BrowserStack provide access to devices; QApilot focuses on exploration, coverage generation, self-healing, and release signals — and can complement a device cloud when you need both.",
    },
    {
      question: "When should I choose AI-native testing over a device cloud alone?",
      answer:
        "When the bottleneck is writing and maintaining coverage — not only renting devices. Autonomous exploration and healing reduce script upkeep that device access alone does not solve.",
    },
    {
      question: "Can QApilot and BrowserStack work together?",
      answer:
        "Yes. Many teams keep a device cloud for hardware reach and use QApilot for journey coverage, healing, and release-readiness evidence on those devices.",
    },
    {
      question: "What does QApilot optimize for in mobile QA?",
      answer:
        "Release readiness: discovering coverage, adapting when UI changes, and surfacing clearer go/no-go signals for iOS, Android, and Flutter teams.",
    },
  ],
  "flutter-app-testing-guide-cross-platform-mobile-teams": [
    {
      question: "What should a Flutter app testing strategy cover?",
      answer:
        "Widget-level checks, platform-specific validation on iOS and Android, device health, and network behavior — not only golden UI screenshots. Cross-platform teams need journeys proven on real builds.",
    },
    {
      question: "Why is Flutter harder for classic UI automation?",
      answer:
        "Flutter often renders to a canvas without a DOM-like tree for locator tools. Automation needs element-aware recording and healing that understand Flutter widgets, not only native accessibility IDs.",
    },
    {
      question: "How does QApilot support Flutter testing?",
      answer:
        "QApilot targets Flutter alongside native and hybrid apps with exploration, recording, and self-healing suited to canvas-rendered UIs and cross-platform release checks.",
    },
    {
      question: "What else belongs in a complete Flutter QA guide?",
      answer:
        "Device health (CPU, memory, thermal), network traces under constrained links, and release-readiness signals so failures are actionable for product and engineering — not just red CI jobs.",
    },
  ],
  "device-health-monitoring-mobile-testing": [
    {
      question: "What is device health monitoring in mobile testing?",
      answer:
        "Tracking CPU, memory, battery, storage, and thermal metrics while automated tests run, so you catch performance and stability issues that functional assertions alone miss.",
    },
    {
      question: "Why monitor device health during automation?",
      answer:
        "A passing UI step can still leave the app unusable if memory climbs, the device throttles, or battery drains. Health metrics explain flaky failures and user-visible jank.",
    },
    {
      question: "How does QApilot track device health?",
      answer:
        "QApilot records device health automatically during automated runs so teams can correlate journey failures with CPU, memory, battery, storage, and thermal signals.",
    },
    {
      question: "When should device health block a release?",
      answer:
        "When metrics regress against your baseline on critical journeys — for example sustained high CPU, memory growth across a suite, or thermal throttling that slows core flows on target devices.",
    },
  ],
};

export const RELEASE_READINESS_FAQS: readonly FaqItem[] = [
  {
    question: "What is the QApilot Release Readiness Suite?",
    answer:
      "A suite that combines intelligent bug detection, security reports, AI self-healing, and device metrics so mobile teams can judge release confidence from one place — not scattered tools.",
  },
  {
    question: "What problems does the suite catch before ship?",
    answer:
      "Functional journey failures, security findings worth reviewing before store submission, brittle tests that would have broken CI, and device-level health regressions that pure UI asserts miss.",
  },
  {
    question: "How does AI self-healing fit release readiness?",
    answer:
      "Self-healing keeps coverage alive when UI changes so the suite still produces a trustworthy signal. Without it, maintenance noise can drown out real release blockers.",
  },
  {
    question: "Who should use Release Readiness Suite?",
    answer:
      "Mobile QA, release managers, and engineering leads who need clearer go/no-go evidence across bugs, security, test stability, and device metrics before iOS, Android, or Flutter releases.",
  },
];

export function faqsForBlogSlug(cmsOrCanonicalSlug: string): readonly FaqItem[] | null {
  return BLOG_FAQS[cmsOrCanonicalSlug] ?? null;
}

export function faqsForCaseStudySlug(slug: string): readonly FaqItem[] | null {
  return CASE_STUDY_FAQS[slug] ?? null;
}
