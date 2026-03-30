/**
 * Scenic tab backgrounds (CoreAdvantageHeading) — single source of truth for URLs.
 * Used by next.config route headers (preload) and CoreAdvantageHeading.
 * Keep in sync with tab order in the component (autonomous → … → self-healing).
 */
export const CORE_ADVANTAGE_SCENIC_URLS = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2400&q=80",
];

/** First capability tab product screenshot (same-origin); matches default tab. */
export const CORE_ADVANTAGE_FIRST_PRODUCT_IMAGE_PATH =
  "/lovable-uploads/core-advantage-autonomous-testing.png";

/** Scenic behind walkthrough video on /product/autonomous-testing only (not a Core Advantage tab). */
export const AUTONOMOUS_WALKTHROUGH_SCENIC_URL =
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2400&q=80";

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
