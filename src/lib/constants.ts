/**
 * Single source of truth for site URLs.
 * Used for canonicals, sitemaps, structured data, and links.
 * Do not change values without considering SEO and live subdomains.
 */
export const SITE_DOMAIN = "qapilot.io";
export const SITE_BASE_URL = `https://${SITE_DOMAIN}`;

/** Subdomains (do not change without coordination) */
export const DOCS_URL = "https://docs.qapilot.io";
export const APP_URL = "https://app.qapilot.io";
/** App web UI login entry (marketing header “Log In”) */
export const APP_AUTOMATION_LOGIN_URL =
  "https://app.qapilot.io/automation/index.html";
export const STATUS_URL = "https://status.qapilot.io";

/** App login and status hosts use noindex; keep crawlers on marketing URLs. */
export const EXTERNAL_NOINDEX_SUBDOMAIN_REL = "noopener noreferrer nofollow";

/**
 * Optional Read AI calendar URL for surfaces that need a direct scheduling link.
 * Primary marketing “Book a Demo” CTAs use `PATHS.BOOK_DEMO` (`/book-demo`).
 */
export const BOOK_DEMO_CALENDAR_URL =
  "https://cal.read.ai/charan-tej-pupeb/01KEYD8ZYYAHDT5CFMV21VF3SW";

/**
 * Main marketing “Book a Demo” HubSpot form (Forms API via `/api/hubspot/get-access`).
 * Used by the global dialog from Header, Footer, home hero, and platform pages.
 */
export const HUBSPOT_NA1_REGION = "na1" as const;
export const HUBSPOT_NA1_PORTAL_ID = "47284450";
export const HUBSPOT_MAIN_GET_ACCESS_FORM_ID = "9e1f8740-75cc-4924-a4bd-6b687bd6f6c6";
export const HUBSPOT_MAIN_GET_ACCESS_FORM_NAME = "Contact Us Dialog";

/** Flutter `/for-flutter` hero form (HubSpot Forms API). */
export const HUBSPOT_FLUTTER_HERO_FORM_ID = "b1b77d10-8753-4791-93a3-23783baf8ecb";

/** Partners `/partners` "Become a partner" form (HubSpot Forms API). */
export const HUBSPOT_PARTNERS_FORM_ID = "aea3fc81-f036-4592-92dc-5c8cc803ce70";

/**
 * Careers general application (HubSpot Forms API via `/api/hubspot/careers`).
 * Embed reference: portal `47284450`, form `702b653d-94c3-4949-b431-45f7a6d035c4`.
 */
export const HUBSPOT_CAREERS_FORM_ID = "702b653d-94c3-4949-b431-45f7a6d035c4";
export const HUBSPOT_CAREERS_FORM_NAME = "Careers General Application";

/**
 * Lead magnet / gated content email capture (HubSpot Forms API via `/api/hubspot/lead-magnet`).
 * Embed reference: portal `47284450`, form `fe86429e-2c1c-4f1a-9bda-a1a3285ed3b1`.
 */
export const HUBSPOT_LEAD_MAGNET_FORM_ID = "fe86429e-2c1c-4f1a-9bda-a1a3285ed3b1";
export const HUBSPOT_LEAD_MAGNET_FORM_NAME = "Lead Magnet Email Capture";

/** Organization logo for JSON-LD (matches public/QApilotLogo.svg; not og:image). */
export const DEFAULT_LOGO_URL = `${SITE_BASE_URL}/QApilotLogo.svg`;

/** Google Tag Manager container (marketing site). */
export const GTM_CONTAINER_ID = "GTM-D8GSMN6Q";

/** GA4 property — loaded via gtag in addition to GTM (GTM alone did not report pageviews). */
export const GA4_MEASUREMENT_ID = "G-YVK0J06RCR";

/** RB2B / REB2B visitor-identification script key. */
export const REB2B_SCRIPT_KEY = "9NMMZHRD91NW";

/** Factors.ai (FAITracker) project token. */
export const FACTORS_AI_TOKEN = "1ot6jei3yz5lmaqbl9byqb2pqlr4qkia";

/** Microsoft Clarity project ID (session recordings, heatmaps, behavior analytics). */
export const CLARITY_PROJECT_ID = "wk5mdaaot4";
