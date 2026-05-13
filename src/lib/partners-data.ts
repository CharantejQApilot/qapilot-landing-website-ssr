import qualizealLogo from "@/assets/qualizeal-logo.png";
import kairosLogo from "@/assets/kairos-logo.png";
import feujiLogo from "@/assets/feuji-logo.png";
import qapitolLogo from "@/assets/qapitol-logo.png";

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
  /** Optional logo well (e.g. dark background for marks designed on black). */
  logoFrameClassName?: string;
}

export const PARTNERS: readonly Partner[] = [
  {
    name: "QualiZeal",
    logo: qualizealLogo,
    description:
      "AI-native digital quality engineering partner delivering testing, automation, performance, and accessibility services for global enterprises.",
    url: "https://qualizeal.com/",
  },
  {
    name: "Kairos Technologies",
    logo: kairosLogo,
    description:
      "Digital engineering and QA partner helping enterprises modernize mobile testing, smart regression, and end-to-end automation.",
    url: "https://www.kairostech.com/",
  },
  {
    name: "Feuji",
    logo: feujiLogo,
    description:
      "AI-led digital transformation and IT services partner delivering application development, testing, cloud, data, and cybersecurity services.",
    url: "https://www.feuji.com/",
    // This source includes substantial transparent padding around the mark.
    // Higher max-height compensates so the visible logo matches Kairos size.
    logoClassName: "max-h-16 max-w-[9rem]",
  },
  {
    name: "Qapitol QA",
    logo: qapitolLogo,
    description:
      "Strategic digital assurance partner spanning consulting, test automation, continuous testing, and IP-led frameworks like UTAF and FLEET—from scaled execution to AI-ready quality engineering for enterprises.",
    url: "https://www.qapitol.com/",
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
