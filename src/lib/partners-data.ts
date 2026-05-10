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
  },
] as const;

/** Resolve a Next.js static image import or string into a usable `<img src>`. */
export const resolvePartnerLogoSrc = (logo: PartnerLogo): string =>
  typeof logo === "string" ? logo : logo.src;
