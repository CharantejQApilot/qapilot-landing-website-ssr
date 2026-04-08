import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import Providers from "./providers";
import Header from "@/components/Header";
import NewsBanner from "@/components/NewsBanner";
import { defaultOpenGraphImage } from "@/lib/seo";
import { rootSchemaGraphJsonLd } from "@/lib/root-jsonld";
import { SITE_BASE_URL } from "@/lib/constants";
import "./globals.css";
import "./App.css";

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
    <html lang="en">
      <head>
        <meta httpEquiv="content-language" content="en-US" />
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        {/* Google Fonts: Space Grotesk (headings) + Source Sans 3 (body) */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        />
        {/* Preload critical above-the-fold images */}
        <link
          rel="preload"
          as="image"
          href="/lovable-uploads/7513a5a6-39e6-4ba3-9460-2a7acb675540.png"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/lovable-uploads/40829201-8081-41bf-8cf5-1e80143e6a36.png"
          fetchPriority="high"
        />
        {/* Preconnect to third-party origins */}
        <link
          rel="preconnect"
          href="https://alb.reddit.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.redditstatic.com"
          crossOrigin="anonymous"
        />
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
          <div className="relative z-[1200] w-full bg-background">
            <Suspense
              fallback={
                <div id="news-banner" className="h-[44px] shrink-0" aria-hidden />
              }
            >
              <NewsBanner />
            </Suspense>
            <Header />
          </div>
          <div className="relative z-0 isolate">{children}</div>
        </Providers>

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-D8GSMN6Q');`}
        </Script>

        {/* Google tag (gtag.js) — GA4 recommended install; sends default page_view */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YVK0J06RCR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-gtag" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YVK0J06RCR');
          `}
        </Script>
      </body>
    </html>
  );
}
