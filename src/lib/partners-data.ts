import qualizealLogo from "@/assets/qualizeal-logo.png";
import kairosLogo from "@/assets/kairos-logo.png";
import zyrixLogo from "@/assets/zyrix-logo.png";
import qapitolLogo from "@/assets/qapitol-logo.png";
import feujiLogo from "@/assets/feuji-logo.png";

/**
 * Static partner directory rendered on `/partners`.
 * Add a new partner by appending an entry; logos live in `src/assets/`.
 */
export type PartnerLogo = string | { src: string };

export interface Partner {
  name: string;
  logo: PartnerLogo;
  /** Optional external partner site / case study link. */
  url?: string;
  /**
   * Tailwind class(es) controlling how the logo image is rendered inside the
   * fixed-size logo card. Used to optically balance logos with very different
   * aspect ratios (square vs. ultra-wide) so they appear the same visual size.
   *
   * Defaults to the Kairos baseline (`"max-h-9 max-w-[9rem]"`) if omitted.
   */
  logoClassName?: string;
  /** Optional logo well (e.g. dark background for marks designed on black). */
  logoFrameClassName?: string;
}

export const PARTNERS: readonly Partner[] = [
  {
    name: "QualiZeal",
    logo: qualizealLogo,
    url: "https://qualizeal.com/",
  },
  {
    name: "Kairos Technologies",
    logo: kairosLogo,
    url: "https://www.kairostech.com/",
  },
  {
    name: "Zyrix",
    logo: zyrixLogo,
    url: "https://zyrix.ai/",
    logoClassName: "max-h-10 max-w-[9.5rem]",
  },
  {
    name: "Qapitol QA",
    logo: qapitolLogo,
    url: "https://www.qapitol.com/",
  },
  {
    name: "Feuji",
    logo: feujiLogo,
    url: "https://www.feuji.com/",
    logoClassName: "max-h-12 max-w-[12rem]",
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
