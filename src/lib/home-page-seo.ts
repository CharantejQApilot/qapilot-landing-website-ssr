import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

/** Single source for home `metadata` + JSON-LD (avoid og:image vs schema drift). */
export const HOME_PAGE_TITLE =
  "QApilot. AI-Powered Mobile App Testing & QA Automation";

export const HOME_PAGE_DESCRIPTION =
  "QApilot autonomously explores your mobile app, generates test coverage, and self-heals broken tests for iOS, Android, and Flutter teams. Book a demo.";

export const HOME_PAGE_OG_TITLE = HOME_PAGE_TITLE;

export const HOME_PAGE_OG_DESCRIPTION = HOME_PAGE_DESCRIPTION;

export const HOME_PAGE_TWITTER_TITLE = HOME_PAGE_TITLE;

export const HOME_PAGE_TWITTER_DESCRIPTION = HOME_PAGE_DESCRIPTION;

/**
 * Editorial freshness for homepage GEO (`dateModified` in JSON-LD + visible “Last reviewed”).
 * Bump when homepage claims or positioning change.
 */
export const HOME_PAGE_LAST_REVIEWED = "2026-09-21";

/** Short takeaways restating claims already on the homepage (no new facts). */
export const HOME_PAGE_KEY_TAKEAWAYS = [
  "QApilot is an AI-native platform that explores mobile apps and builds coverage without manual scripting.",
  "Self-healing is an AI-native approach that adapts tests when UI changes, cutting maintenance load.",
  "Release readiness is a structured path from build upload to sign-off with clear quality signals.",
  "QApilot MCP verifies mobile builds inside coding agents — intent in, device run, markdown report out.",
] as const;

/**
 * Question headings + immediate answers for AEO (featured-snippet style).
 * Answers restate existing homepage / product claims only — no new stats or ratings.
 */
export const HOME_PAGE_QUESTIONS = [
  {
    question: "What is AI-powered mobile app testing?",
    answer:
      "AI-powered mobile app testing is an approach where software explores a mobile app, generates coverage, and adapts when the UI changes — instead of relying only on hand-written scripts. QApilot applies this for iOS, Android, and Flutter teams.",
  },
  {
    question: "How does self-healing help QA teams ship mobile releases?",
    answer:
      "Self-healing is an AI-native approach that adapts tests when UI changes, cutting maintenance load so QE teams spend less time repairing broken selectors and more time on release readiness.",
  },
  {
    question: "Why do mobile-first businesses need mobile-first app testing?",
    answer:
      "Mobile-first businesses ship on real devices and frameworks where web-first automation often falls short. Mobile-first app testing validates what users experience on iOS, Android, and Flutter builds — from exploration through release-readiness signals.",
  },
  {
    question: "How can I access QApilot?",
    answer:
      "Book a demo from this page to see QApilot on your app. The walkthrough covers setup, autonomous coverage, self-healing, and how it fits an iOS, Android, and Flutter release workflow — including execution and reporting with your team.",
  },
  {
    question: "Which mobile frameworks does QApilot support?",
    answer:
      "QApilot works post-build: it validates real application behavior on your binaries, independent of how they were built. Teams use it with Android, iOS, Flutter, React Native, and native apps (Kotlin, Swift, Objective-C). One pipeline checks what users actually experience, without a framework-specific test harness.",
  },
  {
    question: "What is dual-device testing?",
    answer:
      "Real journeys span users and roles: buyer and seller, sender and receiver, agent and supervisor. Dual-device testing runs both sides as one continuous transaction with step-level sync, so marketplace, messaging, and field workflows are proven before they break in production.",
  },
  {
    question: "What is QApilot MCP?",
    answer:
      "QApilot MCP puts mobile verification in the coding agent you already use. Say what needs to hold in plain language. QApilot builds the test, runs it on your local device or emulator, and returns a markdown report the agent can query. Local-first: the app stays on your machine. Works with Claude Code, Cursor, Codex, Copilot, and Windsurf.",
  },
  {
    question: "What is CoWork in QApilot?",
    answer:
      "CoWork turns the test cases you already have into runnable mobile automation. AI plans the steps, a human approves what matters, and execution happens on real devices — so planned coverage stops living only as a checklist.",
  },
] as const;

/**
 * Authoritative outbound sources for GEO (government / .edu research).
 * Kept for agent markdown — not shown in the homepage UI.
 */
export const HOME_PAGE_AUTHORITY_SOURCES = [
  {
    label: "NIST SP 800-163 Rev. 1 — Vetting the Security of Mobile Applications",
    href: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-163r1.pdf",
  },
  {
    label: "Carnegie Mellon SEI — Software Assurance",
    href: "https://www.sei.cmu.edu/library/software-assurance/",
  },
] as const;

/** Framework compatibility (UI removed from home; kept for JSON-LD + agent markdown). */
export const HOME_PAGE_FRAMEWORK_COMPATIBILITY = {
  summary:
    "QApilot works post-build. It validates real application behavior on your binaries, independent of how they were built. Ship with confidence whether your team uses Android, iOS, Flutter, or React Native. One pipeline validates what users actually experience. No framework-specific test harness required.",
  keywords: ["Post-build validation", "Framework-agnostic"] as const,
  platforms: [
    { name: "Android", detail: "APK · AAB · native & hybrid" },
    { name: "iOS", detail: "Simulator & physical devices" },
    { name: "Flutter", detail: "Cross-platform" },
    { name: "React Native", detail: "JS-driven apps" },
    { name: "Native", detail: "Kotlin · Swift · Obj-C" },
  ] as const,
};

/** Autonomous crawler card (UI removed from home; kept for JSON-LD + agent markdown). */
export const HOME_PAGE_CRAWLER = {
  name: "QApilot's Autonomous Mobile App Crawler",
  summary:
    "QApilot's mobile app crawler is an autonomous explorer that navigates even the trickiest app flows, building a live Knowledge Graph. A knowledge graph is a live map of your app's screens and journeys that becomes the brain of QApilot's autonomous agent network. The result is zero-touch sanity testing of your app's critical flows — validated in minutes, with no scripts and no setup.",
} as const;

/**
 * QApilot MCP on the homepage (visible section + JSON-LD + agent markdown).
 * Copy aligned with `/mcp` and `llms.txt` — no new claims.
 */
export const HOME_PAGE_MCP = {
  name: "QApilot MCP",
  summary:
    "QApilot MCP puts mobile verification in the coding agent you already use. Say what needs to hold in plain language. QApilot builds the test, runs it on your local device or emulator, and returns a markdown report the agent can query. Local-first: the app stays on your machine.",
  agents: [
    "Claude Code",
    "Cursor",
    "Codex",
    "Copilot",
    "Windsurf",
  ] as const,
} as const;

const canonicalUrl = `${SITE_BASE_URL}/`;

/**
 * Homepage-only structured data: aligns primary image with og:image/twitter (no UI).
 * @see https://schema.org/WebPage
 * @see https://schema.org/primaryImageOfPage
 */
export const homeWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: canonicalUrl,
  name: HOME_PAGE_TITLE,
  description: HOME_PAGE_DESCRIPTION,
  dateModified: HOME_PAGE_LAST_REVIEWED,
  keywords: [
    "mobile app testing",
    "post-build validation",
    "framework-agnostic",
    "autonomous mobile app crawler",
    "knowledge graph",
    "zero-touch sanity testing",
    "QApilot MCP",
    "Model Context Protocol",
    "coding agents",
    ...HOME_PAGE_FRAMEWORK_COMPATIBILITY.platforms.map((p) => p.name),
    ...HOME_PAGE_MCP.agents,
  ],
  about: [
    {
      "@type": "Thing",
      name: HOME_PAGE_CRAWLER.name,
      description: HOME_PAGE_CRAWLER.summary,
    },
    {
      "@type": "Thing",
      name: HOME_PAGE_MCP.name,
      description: HOME_PAGE_MCP.summary,
    },
    {
      "@type": "ItemList",
      name: "Built for Modern Mobile Frameworks",
      description: HOME_PAGE_FRAMEWORK_COMPATIBILITY.summary,
      itemListElement: HOME_PAGE_FRAMEWORK_COMPATIBILITY.platforms.map(
        (platform, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: platform.name,
          description: platform.detail,
        }),
      ),
    },
  ],
  isPartOf: {
    "@type": "WebSite",
    url: SITE_BASE_URL,
    name: "QApilot",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: defaultOpenGraphImage.url,
    width: defaultOpenGraphImage.width,
    height: defaultOpenGraphImage.height,
    caption: defaultOpenGraphImage.alt,
  },
};
