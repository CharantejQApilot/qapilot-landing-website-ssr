/**
 * Central route path constants and nav config.
 * Keep in sync with App.tsx routes. Do not change paths without considering SEO.
 * Use "#" for paths that don't have a page yet (to be mapped or created later).
 */
export const PATHS = {
  HOME: "/",
  PRODUCT: "/product",
  FOR_FLUTTER: "/for-flutter",
  BRING_YOUR_OWN_AGENT: "/bring-your-own-agent",
  AGENTIC_ARCHITECTURE: "/agentic-architecture",
  ENTERPRISE: "/enterprise",
  ABOUT: "/about",
  BLOGS: "/blogs",
  BLOG_POST: "/blogs/:slug",
  /**
   * Case studies live under Resources but are intentionally hidden from the
   * navigation menu for now (still reachable by direct URL or external links).
   * Add to RESOURCE_NAV_LINKS when ready to surface in the header dropdown.
   */
  CASE_STUDIES: "/case-studies",
  CASE_STUDY_POST: "/case-studies/:slug",
  NEWS: "/news",
  NEWS_POST: "/news/:slug",
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
  /**
   * Partners page is intentionally hidden from the navigation menu for now
   * (still reachable by direct URL or external links). Add to
   * `COMPANY_NAV_LINKS` when ready to surface in the header dropdown.
   */
  PARTNERS: "/partners",
  FAQS: "/faqs",
  LABS: "/labs",
  FOR_RELEASE_MANAGER: "/for-release-manager",
  FOR_QA_ENGINEER: "/for-qa-engineer",
  FOR_QA_LEADER: "/for-qa-leader",
  FOR_PRODUCT_OWNER: "/for-product-owner",
  FOR_SRE: "/for-sre",
  NOT_FOUND: "/not-found",
  // Placeholder paths (no page yet)
  CUSTOMERS: "#",
  COMPARE_APPIUM: "#",
  COMPARE_WEB_FIRST: "#",
  COMPARE_VISUAL_TESTING: "#",
  COMPARE_CODE_FIRST: "#",
  OVERVIEW: "/product",
  /** Platform → By Solution (linked from home + nav) */
  AUTONOMOUS_TESTING: "/product/autonomous-testing",
  INTELLIGENT_BUG_DETECTION: "/product/intelligent-bug-detection",
  SECURITY_REPORTS: "/security-reports",
  AI_SELF_HEALING: "/ai-self-healing",
} as const;

/** Platform dropdown: By Solution (with icon names for Lucide) */
export const PLATFORM_BY_SOLUTION = [
  { path: PATHS.OVERVIEW, label: "Overview", icon: "LayoutDashboard" },
  { path: PATHS.AUTONOMOUS_TESTING, label: "Autonomous Testing", icon: "Sparkles" },
  { path: PATHS.INTELLIGENT_BUG_DETECTION, label: "Intelligent Bug Detection", icon: "Bug" },
  { path: PATHS.FOR_FLUTTER, label: "Flutter Testing", icon: "Smartphone" },
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
  { path: PATHS.LABS, label: "Labs" },
  { path: PATHS.FAQS, label: "FAQs" },
] as const;

/** Company dropdown (header: About, Careers, News). Partners is intentionally hidden — still reachable by direct URL. */
export const COMPANY_NAV_LINKS = [
  { path: PATHS.ABOUT, label: "About Us" },
  { path: PATHS.CAREERS, label: "Careers" },
  { path: PATHS.NEWS, label: "News & Updates" },
] as const;

/** Compare dropdown (placeholder paths until pages exist) */
export const COMPARE_NAV_LINKS = [
  { path: PATHS.COMPARE_APPIUM, label: "vs Appium" },
  { path: PATHS.COMPARE_WEB_FIRST, label: "vs Web-First" },
  { path: PATHS.COMPARE_VISUAL_TESTING, label: "vs Visual Testing" },
  { path: PATHS.COMPARE_CODE_FIRST, label: "vs Code-Dependent Testing" },
] as const;
