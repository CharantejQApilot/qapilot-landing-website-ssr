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

/**
 * Main marketing “Get Access / Book a demo” HubSpot form (Forms API via `/api/hubspot/get-access`).
 * Used by the global dialog from Header, Footer, home hero, and platform pages.
 */
export const HUBSPOT_NA1_REGION = "na1" as const;
export const HUBSPOT_NA1_PORTAL_ID = "47284450";
export const HUBSPOT_MAIN_GET_ACCESS_FORM_ID = "9e1f8740-75cc-4924-a4bd-6b687bd6f6c6";
export const HUBSPOT_MAIN_GET_ACCESS_FORM_NAME = "Contact Us Dialog";

/** Flutter `/for-flutter` hero form (HubSpot Forms API). */
export const HUBSPOT_FLUTTER_HERO_FORM_ID = "b1b77d10-8753-4791-93a3-23783baf8ecb";

/** Default favicon / org logo URL for structured data */
export const DEFAULT_LOGO_URL = `${SITE_BASE_URL}/lovable-uploads/favicon.png`;
