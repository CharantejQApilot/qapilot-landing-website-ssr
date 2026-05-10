import qualizealLogo from "@/assets/qualizeal-logo.png";
import kairosLogo from "@/assets/kairos-logo.png";
import feujiLogo from "@/assets/feuji-logo.png";

/**
 * Static partner directory rendered on `/partners`.
 * Add a new partner by appending an entry; logos live in `src/assets/`.
 */
export type PartnerLogo = string | { src: string };

export interface Partner {
  name: string;
  logo: PartnerLogo;
  description: string;
  /** Optional external partner site / case study link. */
  url?: string;
  /**
   * Tailwind class(es) controlling how the logo image is rendered inside the
   * fixed-size logo card. Used to optically balance logos with very different
   * aspect ratios (square vs. ultra-wide) so they appear the same visual size.
   *
   * Defaults to the Kairos baseline (`"max-h-9 max-w-[9rem]"`) if omitted.
   * For new partners, start with the default and only override when the source
   * file has extra transparent padding or the mark is still visually off.
   */
  logoClassName?: string;
}

export const PARTNERS: readonly Partner[] = [
  {
    name: "QualiZeal",
    logo: qualizealLogo,
    description:
      "AI-native digital quality engineering partner delivering mobile app testing, test automation, performance, and accessibility services for 70+ global enterprises across 12+ industries.",
    url: "https://qualizeal.com/",
  },
  {
    name: "Kairos Technologies",
    logo: kairosLogo,
    description:
      "Digital engineering and quality assurance partner with proprietary AI-powered testing platforms, delivering mobile app testing, smart regression, and end-to-end automation for enterprises worldwide.",
    url: "https://www.kairostech.com/",
  },
  {
    name: "Feuji",
    logo: feujiLogo,
    description:
      "AI-led digital transformation and IT services partner delivering rapid application development, testing, and quality engineering across cloud, data, and cybersecurity for 50+ enterprises worldwide.",
    url: "https://www.feuji.com/",
    // This source includes substantial transparent padding around the mark.
    // Higher max-height compensates so the visible logo matches Kairos size.
    logoClassName: "max-h-16 max-w-[9rem]",
  },
] as const;

/**
 * Baseline logo sizing for the partners grid.
 * This is intentionally tuned to match the Kairos visual footprint.
 */
export const DEFAULT_PARTNER_LOGO_CLASS = "max-h-9 max-w-[9rem]";

/** Resolve a Next.js static image import or string into a usable `<img src>`. */
export const resolvePartnerLogoSrc = (logo: PartnerLogo): string =>
  typeof logo === "string" ? logo : logo.src;
