import localFont from "next/font/local";

/** Mono labels for the Play Policy Checker page. Loaded only with that page. */
export const goMono = localFont({
  src: [
    {
      path: "../../assets/fonts/space-mono-400-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/space-mono-700-latin.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-go-mono",
  display: "swap",
  adjustFontFallback: false,
});
