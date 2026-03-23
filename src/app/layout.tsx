import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import Providers from "./providers";
import Header from "@/components/Header";
import NewsBanner from "@/components/NewsBanner";
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
  robots: { index: true, follow: true },
  alternates: { canonical: "https://qapilot.io/" },
  openGraph: {
    type: "website",
    url: "https://qapilot.io/",
    title: "QApilot - AI-Powered Mobile App Testing & QA Automation",
    description:
      "Automate your mobile app testing with AI. Get instant test coverage for iOS & Android. Reduce testing time by 80%. Start free today.",
    images: [
      {
        url: "https://storage.googleapis.com/gpt-engineer-file-uploads/qmZ74W3JXPUdsN29WhrBqHpo6EE3/social-images/social-1758225607247-graph3.png",
        width: 1200,
        height: 630,
      },
    ],
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
        url: "https://storage.googleapis.com/gpt-engineer-file-uploads/qmZ74W3JXPUdsN29WhrBqHpo6EE3/social-images/social-1758225607247-graph3.png",
        alt: "QApilot dashboard showing automated test results for mobile apps",
      },
    ],
  },
  icons: {
    icon: "/lovable-uploads/favicon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QApilot",
  alternateName: "QApilot",
  legalName: "Digitral Private Limited",
  url: "https://qapilot.io",
  logo: "https://qapilot.io/lovable-uploads/favicon.png",
  foundingDate: "2024",
  founders: [
    { "@type": "Person", name: "Aditya Challa" },
    { "@type": "Person", name: "Chaitanya Devalapally" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "2nd Floor, Skyview 10, The Skyview, Sy No. 83/1, Raidurgam, Hitech City Main Road",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "support@qapilot.com",
  },
  description:
    "QApilot is an AI-native autonomous testing platform for mobile applications. It provides zero-touch sanity testing, script-free automation, and comprehensive test coverage for mobile apps with seamless CI/CD integration.",
  numberOfEmployees: { "@type": "QuantitativeValue", value: "11-50" },
  sameAs: [
    "https://github.com/qapilothq",
    "https://www.linkedin.com/company/qapilot",
    "https://x.com/QApilot",
    "https://www.youtube.com/@QApilot",
  ],
  keywords: [
    "Mobile App Testing",
    "AI Test Automation",
    "No-Code Testing",
    "Autonomous Testing",
    "QA Automation",
    "Flutter Testing",
    "Mobile Testing Platform",
    "CI/CD Integration",
    "iOS Testing",
    "Android Testing",
  ],
  areaServed: "Worldwide",
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QApilot",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "AI-powered autonomous mobile app testing platform with zero-touch sanity testing, intelligent crawlers, and knowledge graph technology.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free trial available",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
  },
  featureList: [
    "Zero-touch sanity testing",
    "AI-powered test generation",
    "Cross-platform iOS and Android support",
    "Knowledge graph technology",
    "CI/CD integration",
    "Visual regression testing",
    "Real device testing",
  ],
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
        {/* Google Fonts: Lora + Source Sans 3 */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
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
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppJsonLd),
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

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YVK0J06RCR"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YVK0J06RCR', { 'send_page_view': false });
          if ('requestIdleCallback' in window) {
            requestIdleCallback(function() {
              gtag('event', 'page_view');
            }, { timeout: 2000 });
          } else {
            setTimeout(function() {
              gtag('event', 'page_view');
            }, 1000);
          }`}
        </Script>
      </body>
    </html>
  );
}
