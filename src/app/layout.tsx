import type { Metadata } from "next";
import Script from "next/script";
import Providers from "./providers";
import Header from "@/components/Header";
import SitePromoBanner from "@/components/SitePromoBanner";
import { defaultOpenGraphImage } from "@/lib/seo";
import { rootSchemaGraphJsonLd } from "@/lib/root-jsonld";
import { SITE_BASE_URL } from "@/lib/constants";
import { fontHeading, fontSans } from "@/lib/fonts";
import "./globals.css";
import dynamic from "next/dynamic";
import DeferredAnalytics from "@/components/DeferredAnalytics";
import DeferredMarketingScripts from "@/components/DeferredMarketingScripts";

const WebMcpRegister = dynamic(() => import("@/components/WebMcpRegister"), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qapilot.io"),
  title: {
    default: "QApilot — AI Mobile App Testing & QA Automation",
    template: "%s | QApilot",
  },
  description:
    "Automate mobile app testing with QApilot. AI-powered iOS and Android coverage in minutes. Start your free trial today.",
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
    title: "QApilot — AI Mobile App Testing & QA Automation",
    description:
      "Automate mobile app testing with AI. Instant iOS and Android coverage. Start free today.",
    images: [defaultOpenGraphImage],
    siteName: "QApilot",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@QApilot",
    creator: "@QApilot",
    title: "QApilot — AI Mobile App Testing",
    description:
      "Automate mobile app testing with AI. Instant iOS and Android coverage. Start free today.",
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
    <html lang="en" className={`${fontHeading.variable} ${fontSans.variable} scroll-smooth`}>
      <head>
        <meta httpEquiv="content-language" content="en-US" />
        {supabaseOrigin ? (
          <link
            rel="preconnect"
            href={supabaseOrigin}
            crossOrigin="anonymous"
          />
        ) : null}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://js.hsforms.net" />
        <link rel="dns-prefetch" href="https://js.hs-scripts.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootSchemaGraphJsonLd),
          }}
        />
      </head>
      <body>
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

        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-D8GSMN6Q');`}
        </Script>

        {/* HubSpot tracking + reb2b load after first interaction (see DeferredMarketingScripts). */}
        <DeferredMarketingScripts />

        <DeferredAnalytics />
      </body>
    </html>
  );
}
