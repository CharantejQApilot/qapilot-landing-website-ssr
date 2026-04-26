import type { Metadata } from "next";
import Script from "next/script";
import Providers from "./providers";
import Header from "@/components/Header";
import SitePromoBanner from "@/components/SitePromoBanner";
import { defaultOpenGraphImage } from "@/lib/seo";
import { rootSchemaGraphJsonLd } from "@/lib/root-jsonld";
import { HUBSPOT_NA1_PORTAL_ID, SITE_BASE_URL } from "@/lib/constants";
import { fontHeading, fontSans } from "@/lib/fonts";
import "./globals.css";
import "./App.css";
import dynamic from "next/dynamic";

const WebMcpRegister = dynamic(() => import("@/components/WebMcpRegister"), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qapilot.io"),
  title: {
    default: "QApilot - AI-Powered Mobile App Testing & QA Automation | iOS & Android",
    template: "%s | QApilot",
  },
  description:
    "Automate your mobile app testing with QApilot's AI-powered platform. Get instant test coverage for iOS & Android apps. Start testing in minutes, not hours. Try free today.",
  keywords: [
    "mobile app testing",
    "automated testing",
    "QA automation",
    "iOS testing",
    "Android testing",
    "test automation platform",
    "mobile testing tools",
    "automated QA",
    "quality assurance",
    "continuous integration",
    "test coverage",
    "regression testing",
    "app quality",
    "mobile CI/CD",
  ],
  authors: [{ name: "QApilot" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_BASE_URL,
    title: "QApilot - AI-Powered Mobile App Testing & QA Automation",
    description:
      "Automate your mobile app testing with AI. Get instant test coverage for iOS & Android. Reduce testing time by 80%. Start free today.",
    images: [defaultOpenGraphImage],
    siteName: "QApilot",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@QApilot",
    creator: "@QApilot",
    title: "QApilot - AI-Powered Mobile App Testing",
    description:
      "Automate mobile app testing with AI. Instant test coverage for iOS & Android. Start free today.",
    images: [
      {
        url: defaultOpenGraphImage.url,
        alt: defaultOpenGraphImage.alt,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/primary-favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
  },
};

function supabasePreconnectOrigin(): string | null {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseOrigin = supabasePreconnectOrigin();

  return (
    <html lang="en" className={`${fontHeading.variable} ${fontSans.variable}`}>
      <head>
        <meta httpEquiv="content-language" content="en-US" />
        {supabaseOrigin ? (
          <link
            rel="preconnect"
            href={supabaseOrigin}
            crossOrigin="anonymous"
          />
        ) : null}
        {/* DNS Prefetch for third-party domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://js.hsforms.net" />
        <link rel="dns-prefetch" href="https://js.hs-scripts.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        {/* Preconnect GA (lazyOnload); omit Reddit until a tag needs it — reduces early connection contention. */}
        <link
          rel="preconnect"
          href="https://www.google-analytics.com"
          crossOrigin="anonymous"
        />
        {/* Structured Data: Organization + SoftwareApplication (incl. reviews) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootSchemaGraphJsonLd),
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-D8GSMN6Q"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Providers>
          <WebMcpRegister />
          <div className="relative z-[1200] w-full bg-background">
            <SitePromoBanner />
            <Header />
          </div>
          <div className="relative z-0 isolate">{children}</div>
        </Providers>

        {/* GTM deferred to reduce main-thread work during first input (INP); still loads this navigation */}
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-D8GSMN6Q');`}
        </Script>

        {/* GA4 direct tag — deferred vs GTM so first interactions stay lighter (Web Vitals still queue once gtag loads) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YVK0J06RCR"
          strategy="lazyOnload"
        />
        <Script id="google-analytics-gtag" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YVK0J06RCR');
          `}
        </Script>

        {/* HubSpot tracking + Conversations (chat flows); afterInteractive keeps first paint light */}
        <Script
          id="hs-script-loader"
          src={`https://js.hs-scripts.com/${HUBSPOT_NA1_PORTAL_ID}.js`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
