import { Space_Grotesk, Source_Sans_3 } from "next/font/google";

/**
 * Weights used on the first screen (nav, hero heading, body, demo button).
 * Next preloads every weight in a call, so the later weights live in a
 * second call and are not preloaded. The files are unchanged; bold headings
 * and medium body text still request them once CSS applies.
 */
export const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-heading",
  display: "swap",
  adjustFontFallback: true,
});

export const fontHeadingBold = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading-bold",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

export const fontSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: true,
});

export const fontSansMedium = Source_Sans_3({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-sans-medium",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});
