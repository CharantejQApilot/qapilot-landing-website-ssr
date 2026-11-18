import localFont from "next/font/local";

/**
 * Self-hosted so production builds do not download Google Fonts.
 * The files are the latin subsets already used on the site.
 */
export const fontHeading = localFont({
  src: "../assets/fonts/space-grotesk-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-heading",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const fontSans = localFont({
  src: "../assets/fonts/source-sans-3-latin.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});
