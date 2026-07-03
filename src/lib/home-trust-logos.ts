import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";

export type HomeTrustLogo = {
  name: string;
  logo: string;
  url?: string;
  visualScale: number;
};

/** Home hero trust strip — same marks as the former “Trusted by Industry Leaders” marquee. */
export const HOME_TRUST_LOGOS: HomeTrustLogo[] = [
  {
    name: "WIO Bank",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}wio-bank-logo.png`,
    url: "https://wio.io/",
    visualScale: 1.28,
  },
  {
    name: "Orange Group",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}orange-group-logo.png`,
    url: "https://www.orange.com/en",
    visualScale: 1.15,
  },
  {
    name: "Royal Enfield",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}royal-enfield-logo.png`,
    url: "https://www.royalenfield.com/in/en/home/",
    visualScale: 1.15,
  },
  {
    name: "Indosat Ooredoo",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}indosat-logo.png`,
    url: "https://im3.id/portal/en/indexpersonal",
    visualScale: 1,
  },
  {
    name: "Zessta",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}zessta-logo.png`,
    url: "https://zessta.com/",
    visualScale: 0.8,
  },
  {
    name: "mySherpas",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}mysherpas-logo.svg`,
    url: "https://www.mypaisaa.com/",
    visualScale: 0.72,
  },
  {
    name: "GrowSari",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}growsari-logo.webp`,
    url: "https://growsari.com/",
    visualScale: 1.36,
  },
  {
    name: "Qwipo",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}qwipo-logo.png`,
    url: "https://qwipo.com/",
    visualScale: 1,
  },
  {
    name: "Geml",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}geml-logo.png`,
    url: "https://www.geml.co/",
    visualScale: 1.45,
  },
  {
    name: "Sahabat AI",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}sahabat-ai-logo-dark-horizontal.png`,
    url: "https://sahabat-ai.com/",
    visualScale: 0.98,
  },
];
