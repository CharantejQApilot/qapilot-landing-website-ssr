export type HardcodedBanner = {
  text: string;
  href: string;
  /** Open in a new tab (for pages outside this Next.js app, e.g. event pages). */
  external: boolean;
  /**
   * Show only on these paths. Rendered on first paint, without the
   * `/api/site-promo` fetch, so the strip never pops in.
   */
  paths?: string[];
};

/**
 * Hardcoded banners for content that isn't managed in the admin dashboard
 * (e.g. event/webinar pages). The first matching entry wins and takes
 * precedence over CMS (news/blog) banners. Managed manually. Comment out or
 * remove entries when they're no longer relevant.
 */
export const HARDCODED_PROMO_BANNERS: HardcodedBanner[] = [
  {
    text: "QApilot Go Play Policy Checker. Find out if Google Play will reject your app before you submit.",
    href: "/play-policy-checker",
    external: false,
    paths: ["/"],
  },
];
