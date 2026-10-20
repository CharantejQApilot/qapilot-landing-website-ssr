import { Space_Grotesk, Source_Sans_3 } from "next/font/google";

export const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
  adjustFontFallback: true,
});

export const fontSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: true,
});
