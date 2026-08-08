/**
 * Central route path constants and nav config.
 * Keep in sync with App.tsx routes. Do not change paths without considering SEO.
 * Use "#" for paths that don't have a page yet (to be mapped or created later).
 */
export const PATHS = {
  HOME: "/",
  PRODUCT: "/product",
  FOR_FLUTTER: "/for-flutter",
  FOR_IOS: "/for-ios",
  FOR_ANDROID: "/for-android",
  FOR_REACT_NATIVE: "/for-react-native",
  BRING_YOUR_OWN_AGENT: "/bring-your-own-agent",
  AGENTIC_ARCHITECTURE: "/agentic-architecture",
  ENTERPRISE: "/enterprise",
  ABOUT: "/about",
  BLOGS: "/blogs",
  BLOG_POST: "/blogs/:slug",
  QA_GUIDE: "/qa-guide",
  QA_GUIDE_POST: "/qa-guide/:slug",
  SEO_DRAFTS: "/seo-drafts",
  NEWS: "/news",
  NEWS_POST: "/news/:slug",
  EVENTS: "/events",
  EVENT_POST: "/events/:slug",
  AUTH: "/auth",
  ADMIN: "/admin",
  ADMIN_EDITOR: "/admin/editor",
  ADMIN_EDITOR_ID: "/admin/editor/:id",
  TERMS: "/terms",
  /** Static privacy policy (legal). */
  PRIVACY: "/privacy",
  TERMS_CONDITIONS: "/terms-conditions",
  CAREERS: "/careers",
  JOB_POST: "/careers/:slug",
  PARTNERS: "/partners",
  FAQS: "/faqs",
  BOOK_DEMO: "/book-demo",
  LABS: "/labs",
  DEVICE_COVERAGE_MATRIX: "/device-coverage-matrix",
  AI_TIME_SAVINGS: "/ai-time-savings",
  FOR_RELEASE_MANAGER: "/for-release-manager",
  FOR_QA_ENGINEER: "/for-qa-engineer",
  FOR_QA_LEADER: "/for-qa-leader",
  FOR_PRODUCT_OWNER: "/for-product-owner",
  FOR_SRE: "/for-sre",
  NOT_FOUND: "/not-found",
  // Placeholder paths (no page yet)
  CUSTOMERS: "#",
  COMPARE_APPIUM: "/compare/qapilot-vs-appium",
  COMPARE_WEB_FIRST: "/compare/qapilot-vs-web-first-automation-tools",
  COMPARE_VISUAL_TESTING: "/compare/qapilot-vs-visual-testing-tools",
  COMPARE_TESTSIGMA: "/compare/qapilot-vs-testsigma",
  COMPARE_MAESTRO: "/compare/qapilot-vs-maestro",
  ALTERNATIVES_BROWSERSTACK: "/alternatives/browserstack",
  ALTERNATIVES_SAUCE_LABS: "/alternatives/sauce-labs",
  ALTERNATIVES_APPIUM: "/alternatives/appium",
  INTEGRATIONS: "/integrations",
  OVERVIEW: "/product",
  /** Platform → By Solution (linked from home + nav) */
  AUTONOMOUS_TESTING: "/product/autonomous-testing",
  COWORK: "/product/cowork",
  INTELLIGENT_BUG_DETECTION: "/product/intelligent-bug-detection",
  SECURITY_REPORTS: "/security-reports",
  AI_SELF_HEALING: "/ai-self-healing",
} as const;

/** On-screen label; path stays `PATHS.QA_GUIDE` (`/qa-guide`) for indexed URLs. */
export const QE_GUIDE_DISPLAY_NAME = "QE Guide";

/** Platform dropdown: By Solution (with icon names for Lucide) */
export const PLATFORM_BY_SOLUTION = [
  { path: PATHS.OVERVIEW, label: "Overview", icon: "LayoutDashboard" },
  { path: PATHS.AUTONOMOUS_TESTING, label: "Autonomous Testing", icon: "Sparkles" },
  { path: PATHS.COWORK, label: "CoWork", icon: "PenLine" },
  { path: PATHS.INTELLIGENT_BUG_DETECTION, label: "Intelligent Bug Detection", icon: "Bug" },
  { path: PATHS.FOR_FLUTTER, label: "Flutter Testing", icon: "Smartphone" },
  { path: PATHS.FOR_IOS, label: "iOS Testing", icon: "Smartphone" },
  { path: PATHS.FOR_ANDROID, label: "Android Testing", icon: "Smartphone" },
  { path: PATHS.FOR_REACT_NATIVE, label: "React Native Testing", icon: "Smartphone" },
  { path: PATHS.SECURITY_REPORTS, label: "Security Reports", icon: "ShieldCheck" },
  { path: PATHS.AI_SELF_HEALING, label: "AI Self Healing", icon: "RefreshCw" },
] as const;

/** Platform dropdown: By Role (order matches nav) */
export const PLATFORM_BY_ROLE = [
  { path: PATHS.FOR_QA_LEADER, label: "QE Leader", icon: "Users" },
  { path: PATHS.FOR_RELEASE_MANAGER, label: "Release Manager", icon: "Package" },
  { path: PATHS.FOR_QA_ENGINEER, label: "Quality Assurance Engineer", icon: "TestTube2" },
  { path: PATHS.FOR_PRODUCT_OWNER, label: "Product Manager", icon: "ClipboardList" },
  { path: PATHS.FOR_SRE, label: "Site Reliability Engineer", icon: "Server" },
] as const;

/** Platform dropdown: AI Agents */
export const PLATFORM_AI_AGENTS = [
  { path: PATHS.AGENTIC_ARCHITECTURE, label: "QApilot's Agentic Architecture", icon: "Workflow" },
  { path: PATHS.BRING_YOUR_OWN_AGENT, label: "Bring Your Own Agent (BYOA)", icon: "Bot" },
] as const;

/** Resources dropdown (header: Blogs, Labs, FAQs) */
export const RESOURCE_NAV_LINKS = [
  { path: PATHS.BLOGS, label: "Blogs" },
  { path: PATHS.QA_GUIDE, label: QE_GUIDE_DISPLAY_NAME },
  { path: PATHS.LABS, label: "Labs" },
  { path: PATHS.FAQS, label: "FAQs" },
] as const;

/** Company dropdown (header: About, Partners, Careers, Events, News) */
export const COMPANY_NAV_LINKS = [
  { path: PATHS.ABOUT, label: "About Us" },
  { path: PATHS.PARTNERS, label: "Partners" },
  { path: PATHS.CAREERS, label: "Careers" },
  { path: PATHS.EVENTS, label: "Events" },
  { path: PATHS.NEWS, label: "News & Updates" },
] as const;

/** Compare dropdown */
export const COMPARE_NAV_LINKS = [
  { path: PATHS.COMPARE_WEB_FIRST, label: "vs Web-First" },
  { path: PATHS.COMPARE_APPIUM, label: "vs Appium" },
  { path: PATHS.COMPARE_VISUAL_TESTING, label: "vs Visual Testing" },
  { path: PATHS.COMPARE_TESTSIGMA, label: "vs Testsigma" },
  { path: PATHS.COMPARE_MAESTRO, label: "vs Maestro" },
  { path: PATHS.ALTERNATIVES_BROWSERSTACK, label: "BrowserStack Alternative" },
  { path: PATHS.ALTERNATIVES_SAUCE_LABS, label: "Sauce Labs Alternative" },
  { path: PATHS.ALTERNATIVES_APPIUM, label: "Appium Alternative" },
] as const;
