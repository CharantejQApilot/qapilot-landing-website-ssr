export type ProductHuntTopPostBadge = {
  href: string;
  /** Self-hosted so LCP never waits on api.producthunt.com */
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
};

export const PRODUCT_HUNT_TOP_POST_BADGE = {
  href: "https://www.producthunt.com/products/qapilot",
  imageSrc: "/badges/product-hunt-top-post.svg",
  imageAlt: "QApilot's CoWork - 3x Mobile Automation. Same QE Team. | Product Hunt",
  width: 250,
  height: 54,
} as const satisfies ProductHuntTopPostBadge;

export const PRODUCT_HUNT_MCP_TOP_POST_BADGE = {
  href: "https://www.producthunt.com/products/qapilot",
  imageSrc: "/badges/product-hunt-top-post-mcp.svg",
  imageAlt:
    "QApilot MCP for Android - Android app testing inside your coding agent | Product Hunt",
  width: 250,
  height: 54,
} as const satisfies ProductHuntTopPostBadge;

/** Review rating widget. Dark card for the navy close-CTA ribbon. */
export const PRODUCT_HUNT_RATING_BADGE = {
  href: "https://www.producthunt.com/products/qapilot/reviews?utm_source=badge-product_rating&utm_medium=badge&utm_source=badge-qapilot",
  imageSrc: "/badges/product-hunt-rating-dark.svg",
  imageAlt:
    "QApilot - Mobile-First Businesses Need Mobile-First App Testing | Product Hunt",
  width: 242,
  height: 108,
} as const;
