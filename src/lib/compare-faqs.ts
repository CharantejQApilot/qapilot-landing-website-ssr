import type { FaqItem } from "@/lib/faq-jsonld";

/** Shared FAQ sets for compare / alternatives pages (visible + FAQPage JSON-LD). */
export const COMPARE_FAQS = {
  appium: [
    {
      question: "What is the difference between QApilot and Appium?",
      answer:
        "Appium is a script-first mobile automation framework. QApilot is an AI-native platform that explores apps, generates coverage, self-heals failures, and reports release risk so teams spend less time authoring and maintaining scripts.",
    },
    {
      question: "Can QApilot replace Appium entirely?",
      answer:
        "Many teams move primary mobile coverage to QApilot while keeping Appium for niche custom scripts. QApilot is designed for release readiness coverage, not as a drop-in Appium API clone.",
    },
    {
      question: "Does QApilot support Flutter and real devices?",
      answer:
        "Yes. QApilot is built for Flutter, native, and hybrid apps with real-device execution workflows, not browser-first workarounds.",
    },
    {
      question: "How does QApilot reduce Appium maintenance?",
      answer:
        "Context-aware self-healing and journey-level understanding reduce breakage when IDs, hierarchy, or UI structure change, which is where Appium suites usually burn the most time.",
    },
    {
      question: "Who should choose QApilot over Appium?",
      answer:
        "Mobile-first teams that need faster coverage and clearer release signals without scaling automation headcount one-for-one with every new flow.",
    },
  ],
  maestro: [
    {
      question: "What is the difference between QApilot and Maestro?",
      answer:
        "Maestro runs declarative YAML UI flows you define. QApilot autonomously explores the app, maps journeys, generates coverage, and self-heals changes without maintaining flow files for every path.",
    },
    {
      question: "When should I keep Maestro?",
      answer:
        "Maestro remains useful for lightweight, hand-authored UI flows. Choose QApilot when you need discovery beyond what you scripted and release-ready signals across devices.",
    },
    {
      question: "Does QApilot work with Flutter apps like Maestro?",
      answer:
        "Yes. QApilot targets Flutter, native, and hybrid complexity with journey validation, bug detection, and release reporting beyond simple UI taps.",
    },
    {
      question: "How does maintenance compare?",
      answer:
        "Maestro flows need updates when selectors or screens change. QApilot uses context-aware self-healing so coverage survives more UI churn.",
    },
    {
      question: "Who is QApilot vs Maestro for?",
      answer:
        "Teams that have outgrown flow-only automation and need autonomous coverage plus clearer go/no-go evidence before mobile releases.",
    },
  ],
  testsigma: [
    {
      question: "What is the difference between QApilot and Testsigma?",
      answer:
        "Testsigma focuses on AI-assisted authoring and maintenance of predefined flows. QApilot discovers coverage autonomously from app behavior and reports release readiness.",
    },
    {
      question: "Can QApilot and Testsigma coexist?",
      answer:
        "Yes. Some teams keep no-code suites for known happy paths and use QApilot for exploration, healing, and broader mobile risk signals.",
    },
    {
      question: "Does QApilot help with mobile-specific risk?",
      answer:
        "QApilot surfaces journey failures, accessibility issues, action latency, and related mobile signals that authoring tools often leave to manual review.",
    },
    {
      question: "How is test creation different?",
      answer:
        "Testsigma relies on natural language or recorder steps. QApilot uses crawler-led generation, CoWork from existing cases, and record/playback on top of app understanding.",
    },
    {
      question: "Who should choose QApilot over Testsigma?",
      answer:
        "Teams that need autonomous discovery and release-ready reporting for iOS and Android, not only faster authoring of scripted suites.",
    },
  ],
  visual: [
    {
      question: "What is the difference between QApilot and visual testing tools?",
      answer:
        "Visual tools catch pixel or layout diffs. QApilot validates real mobile journeys across screens, states, devices, performance signals, bugs, and release risk.",
    },
    {
      question: "Should I still use visual regression?",
      answer:
        "Visual checks remain useful for UI regressions. Pair them with QApilot when you need journey confidence and release readiness beyond screenshots.",
    },
    {
      question: "Does QApilot include visual signals?",
      answer:
        "QApilot uses screen context and visual cues as part of execution and healing, but its job is broader: whether the mobile journey still works for release.",
    },
    {
      question: "How does this help Flutter and hybrid apps?",
      answer:
        "QApilot is built for Flutter, native, and hybrid complexity where screenshot-only tools miss gesture, state, and navigation failures.",
    },
    {
      question: "Who is QApilot vs visual testing for?",
      answer:
        "Mobile teams that already catch UI diffs but still ship broken journeys, flaky flows, or unclear go/no-go decisions.",
    },
  ],
  webFirst: [
    {
      question: "What are web-first automation tools?",
      answer:
        "Tools built primarily for browsers and later extended to mobile. They often lack deep mobile context for native, hybrid, and Flutter apps.",
    },
    {
      question: "How is QApilot different from web-first tools?",
      answer:
        "QApilot is mobile-first: autonomous exploration, context-aware healing, and release-ready reporting designed for iOS and Android apps.",
    },
    {
      question: "Can I keep a web-first tool for web and use QApilot for mobile?",
      answer:
        "Yes. Many teams keep browser automation for web and use QApilot for mobile release readiness so mobile is not an afterthought tab.",
    },
    {
      question: "Does QApilot reduce mobile maintenance vs web-first stacks?",
      answer:
        "Yes. Self-healing and journey understanding cut the locator and script churn that web-first mobile extensions typically create.",
    },
    {
      question: "Who should switch from web-first mobile testing?",
      answer:
        "Product and QE teams whose revenue depends on mobile apps and who need coverage and confidence without treating mobile as a bolted-on browser runner.",
    },
  ],
  browserstack: [
    {
      question: "Is QApilot a BrowserStack alternative?",
      answer:
        "QApilot is an autonomous testing layer. BrowserStack provides device and browser access. Teams often use both: devices from a cloud, coverage and healing from QApilot.",
    },
    {
      question: "Does QApilot replace a device cloud?",
      answer:
        "Not necessarily. QApilot focuses on generating, executing, and healing mobile tests and reporting release risk. You can run with or alongside a device cloud.",
    },
    {
      question: "How does test creation differ from BrowserStack alone?",
      answer:
        "With BrowserStack alone, teams still write and maintain automation. QApilot adds crawler-led generation, CoWork, and self-healing on top of execution.",
    },
    {
      question: "Who should evaluate QApilot as a BrowserStack alternative?",
      answer:
        "Teams that already have devices but lack autonomous coverage, or that want mobile-first testing without growing script maintenance.",
    },
  ],
  sauceLabs: [
    {
      question: "Is QApilot a Sauce Labs alternative?",
      answer:
        "Sauce Labs is primarily a cloud for running tests on devices and browsers. QApilot is an AI-native platform that generates coverage, heals tests, and reports release readiness.",
    },
    {
      question: "Can QApilot work with Sauce Labs?",
      answer:
        "Teams can treat them as complementary: Sauce Labs for infrastructure, QApilot for autonomous mobile testing and release signals.",
    },
    {
      question: "What does QApilot add beyond a test cloud?",
      answer:
        "Autonomous exploration, knowledge-graph journeys, self-healing, and debugging evidence that a raw device cloud does not generate for you.",
    },
    {
      question: "Who should choose QApilot over Sauce Labs alone?",
      answer:
        "Mobile teams that need faster coverage and less maintenance, not only more places to run the same fragile scripts.",
    },
  ],
} as const satisfies Record<string, readonly FaqItem[]>;
