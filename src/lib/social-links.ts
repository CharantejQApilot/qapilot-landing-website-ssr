import type { LucideIcon } from "lucide-react";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export type SocialLink =
  | {
      name: string;
      href: string;
      kind: "lucide";
      icon: LucideIcon;
    }
  | {
      name: string;
      href: string;
      kind: "simple-icon";
      iconSlug: string;
    };

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/qapilot/",
    kind: "lucide",
    icon: Linkedin,
  },
  {
    name: "X",
    href: "https://x.com/QApilot",
    kind: "simple-icon",
    iconSlug: "x",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@QApilot",
    kind: "lucide",
    icon: Youtube,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/qa.pilot/",
    kind: "lucide",
    icon: Instagram,
  },
] as const;
