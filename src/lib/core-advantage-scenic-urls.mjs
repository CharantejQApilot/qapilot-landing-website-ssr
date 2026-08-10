/**
 * Product media paths used by Core Advantage / framed screenshots.
 * Scenic photo URLs were removed in favor of CSS abstract backdrops.
 */

/** First capability tab product screenshot (same-origin); matches default tab. */
export const CORE_ADVANTAGE_FIRST_PRODUCT_IMAGE_PATH =
  "/lovable-uploads/core-advantage-autonomous-testing.png";

export const SECURITY_REPORT_DASHBOARD_IMAGE_PATH =
  "/lovable-uploads/security-report-dashboard-overview.png";

export const AI_SELF_HEALING_EXECUTION_REPORT_IMAGE_PATH =
  "/lovable-uploads/ai-self-healing-execution-report.png";

function preloadImage(path) {
  return `<${path}>; rel=preload; as=image`;
}

/**
 * RFC 8288 Link header: first Core Advantage product shot only (no scenic photos).
 */
export function buildCoreAdvantageLinkHeader() {
  return preloadImage(CORE_ADVANTAGE_FIRST_PRODUCT_IMAGE_PATH);
}

export function buildSecurityReportDeepDiveLinkHeader() {
  return preloadImage(SECURITY_REPORT_DASHBOARD_IMAGE_PATH);
}

export function buildAiSelfHealingReportLinkHeader() {
  return preloadImage(AI_SELF_HEALING_EXECUTION_REPORT_IMAGE_PATH);
}
