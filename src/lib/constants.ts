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

/** Default favicon / org logo URL for structured data */
export const DEFAULT_LOGO_URL = `${SITE_BASE_URL}/lovable-uploads/favicon.png`;
