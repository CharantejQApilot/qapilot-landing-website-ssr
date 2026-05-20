/**
 * Scenic tab backgrounds (CoreAdvantageHeading) — single source of truth for URLs.
 * Used by next.config route headers (preload) and CoreAdvantageHeading.
 * Keep in sync with tab order in the component (autonomous → … → self-healing).
 */
export const CORE_ADVANTAGE_SCENIC_URLS = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
];

/** First capability tab product screenshot (same-origin); matches default tab. */
export const CORE_ADVANTAGE_FIRST_PRODUCT_IMAGE_PATH =
  "/lovable-uploads/core-advantage-autonomous-testing.png";

/** Scenic behind walkthrough video on /product/autonomous-testing only (not a Core Advantage tab). */
export const AUTONOMOUS_WALKTHROUGH_SCENIC_URL =
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80";

/** Scenic behind issue-detail video on /product/intelligent-bug-detection (unused elsewhere). */
export const INTELLIGENT_BUG_ISSUE_DETAIL_SCENIC_URL =
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80";

/** Scenic behind walkthrough video on /for-flutter only (unused elsewhere). */
export const FLUTTER_TESTING_VIDEO_SCENIC_URL =
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80";

/** Scenic behind security report deep-dive screenshot on /security-reports */
export const SECURITY_REPORT_DEEP_DIVE_SCENIC_URL =
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80";

export const SECURITY_REPORT_DASHBOARD_IMAGE_PATH =
  "/lovable-uploads/security-report-dashboard-overview.png";

/** Scenic behind AI self-healing execution report on /ai-self-healing */
export const AI_SELF_HEALING_REPORT_SCENIC_URL =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80";

export const AI_SELF_HEALING_EXECUTION_REPORT_IMAGE_PATH =
  "/lovable-uploads/ai-self-healing-execution-report.png";

/**
 * RFC 8288 Link header: preconnect + scenic preload for autonomous testing walkthrough block.
 */
export function buildAutonomousWalkthroughLinkHeader() {
  return [
    "<https://images.unsplash.com>; rel=preconnect",
    `<${AUTONOMOUS_WALKTHROUGH_SCENIC_URL}>; rel=preload; as=image`,
  ].join(", ");
}

/**
 * RFC 8288 Link header: preconnect + scenic preload for intelligent bug detection issue-detail video.
 */
export function buildIntelligentBugIssueDetailLinkHeader() {
  return [
    "<https://images.unsplash.com>; rel=preconnect",
    `<${INTELLIGENT_BUG_ISSUE_DETAIL_SCENIC_URL}>; rel=preload; as=image`,
  ].join(", ");
}

/**
 * RFC 8288 Link header: preconnect + scenic preload for Flutter testing walkthrough video.
 */
export function buildFlutterTestingVideoLinkHeader() {
  return [
    "<https://images.unsplash.com>; rel=preconnect",
    `<${FLUTTER_TESTING_VIDEO_SCENIC_URL}>; rel=preload; as=image`,
  ].join(", ");
}

export function buildSecurityReportDeepDiveLinkHeader() {
  return [
    "<https://images.unsplash.com>; rel=preconnect",
    `<${SECURITY_REPORT_DEEP_DIVE_SCENIC_URL}>; rel=preload; as=image`,
    `<${SECURITY_REPORT_DASHBOARD_IMAGE_PATH}>; rel=preload; as=image`,
  ].join(", ");
}

export function buildAiSelfHealingReportLinkHeader() {
  return [
    "<https://images.unsplash.com>; rel=preconnect",
    `<${AI_SELF_HEALING_REPORT_SCENIC_URL}>; rel=preload; as=image`,
    `<${AI_SELF_HEALING_EXECUTION_REPORT_IMAGE_PATH}>; rel=preload; as=image`,
  ].join(", ");
}

/**
 * RFC 8288 Link header: preconnect + image preloads for Core Advantage section.
 * Only attached to routes that render CoreAdvantageHeading (see next.config).
 */
export function buildCoreAdvantageLinkHeader() {
  const parts = [
    "<https://images.unsplash.com>; rel=preconnect",
    ...CORE_ADVANTAGE_SCENIC_URLS.map((url) => `<${url}>; rel=preload; as=image`),
    `<${CORE_ADVANTAGE_FIRST_PRODUCT_IMAGE_PATH}>; rel=preload; as=image`,
  ];
  return parts.join(", ");
}
