import { Space_Grotesk, Source_Sans_3 } from "next/font/google";

export const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  /** Omit 300 — unused on site; fewer font files improves first paint. */
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const fontSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});
