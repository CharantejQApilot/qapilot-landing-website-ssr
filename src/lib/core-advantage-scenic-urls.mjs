/**
 * Scenic tab backgrounds (CoreAdvantageHeading) — single source of truth for URLs.
 * Used by next.config route headers (preload) and CoreAdvantageHeading.
 * Keep in sync with tab order in the component (autonomous → … → self-healing).
 */
export const CORE_ADVANTAGE_SCENIC_URLS = [
  "/scenic/core-advantage-1.jpg",
  "/scenic/core-advantage-2.jpg",
  "/scenic/core-advantage-3.jpg",
  "/scenic/core-advantage-4.jpg",
  "/scenic/core-advantage-5.jpg",
];

/** First capability tab product screenshot (same-origin); matches default tab. */
export const CORE_ADVANTAGE_FIRST_PRODUCT_IMAGE_PATH =
  "/lovable-uploads/core-advantage-autonomous-testing.png";

/** Scenic behind walkthrough video on /product/autonomous-testing only (not a Core Advantage tab). */
export const AUTONOMOUS_WALKTHROUGH_SCENIC_URL = "/scenic/autonomous-walkthrough.jpg";

/** Scenic behind issue-detail video on /product/intelligent-bug-detection (unused elsewhere). */
export const INTELLIGENT_BUG_ISSUE_DETAIL_SCENIC_URL = "/scenic/intelligent-bug-detail.jpg";

/** Scenic behind walkthrough video on /for-flutter only (unused elsewhere). */
export const FLUTTER_TESTING_VIDEO_SCENIC_URL = "/scenic/flutter-testing-video.jpg";

/** Scenic behind security report deep-dive screenshot on /security-reports */
export const SECURITY_REPORT_DEEP_DIVE_SCENIC_URL = "/scenic/security-report-deep-dive.jpg";

export const SECURITY_REPORT_DASHBOARD_IMAGE_PATH =
  "/lovable-uploads/security-report-dashboard-overview.png";

/** Scenic behind AI self-healing execution report on /ai-self-healing */
export const AI_SELF_HEALING_REPORT_SCENIC_URL = "/scenic/ai-self-healing-report.jpg";

export const AI_SELF_HEALING_EXECUTION_REPORT_IMAGE_PATH =
  "/lovable-uploads/ai-self-healing-execution-report.png";

function preloadImage(path) {
  return `<${path}>; rel=preload; as=image`;
}

/**
 * RFC 8288 Link header: scenic preload for autonomous testing walkthrough block.
 */
export function buildAutonomousWalkthroughLinkHeader() {
  return preloadImage(AUTONOMOUS_WALKTHROUGH_SCENIC_URL);
}

/**
 * RFC 8288 Link header: scenic preload for intelligent bug detection issue-detail video.
 */
export function buildIntelligentBugIssueDetailLinkHeader() {
  return preloadImage(INTELLIGENT_BUG_ISSUE_DETAIL_SCENIC_URL);
}

/**
 * RFC 8288 Link header: scenic preload for Flutter testing walkthrough video.
 */
export function buildFlutterTestingVideoLinkHeader() {
  return preloadImage(FLUTTER_TESTING_VIDEO_SCENIC_URL);
}

export function buildSecurityReportDeepDiveLinkHeader() {
  return [
    preloadImage(SECURITY_REPORT_DEEP_DIVE_SCENIC_URL),
    preloadImage(SECURITY_REPORT_DASHBOARD_IMAGE_PATH),
  ].join(", ");
}

export function buildAiSelfHealingReportLinkHeader() {
  return [
    preloadImage(AI_SELF_HEALING_REPORT_SCENIC_URL),
    preloadImage(AI_SELF_HEALING_EXECUTION_REPORT_IMAGE_PATH),
  ].join(", ");
}

/**
 * RFC 8288 Link header: image preloads for Core Advantage section.
 * Only attached to routes that render CoreAdvantageHeading (see next.config).
 */
export function buildCoreAdvantageLinkHeader() {
  const parts = [
    ...CORE_ADVANTAGE_SCENIC_URLS.map((url) => preloadImage(url)),
    preloadImage(CORE_ADVANTAGE_FIRST_PRODUCT_IMAGE_PATH),
  ];
  return parts.join(", ");
}
