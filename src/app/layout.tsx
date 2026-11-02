import type { Metadata } from "next";
import Providers from "./providers";
import { defaultOpenGraphImage } from "@/lib/seo";
import { rootSchemaGraphJsonLd } from "@/lib/root-jsonld";
import {
  CLARITY_PROJECT_ID,
  GA4_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  GTM_CONTAINER_ID,
  HUBSPOT_NA1_PORTAL_ID,
  FACTORS_AI_TOKEN,
  REB2B_SCRIPT_KEY,
} from "@/lib/constants";
import { CLARITY_UNMASK_STYLESHEETS_SCRIPT } from "@/lib/clarity-unmask-stylesheets-script";
import { deferredMarketingScriptsHtml } from "@/lib/deferred-marketing-scripts";
import { fontHeading, fontSans } from "@/lib/fonts";
import "./globals.css";
import { RouteMemory } from "@/components/route-memory";
import { PublicChrome } from "@/components/PublicChrome";
import Header from "@/components/Header";
import SitePromoBanner from "@/components/SitePromoBanner";
import DeferredAnalytics from "@/components/DeferredAnalytics";
import dynamic from "next/dynamic";

const WebMcpRegister = dynamic(() => import("@/components/WebMcpRegister"), {
  ssr: false,
});

const FloatingSiteRails = dynamic(
  () => import("@/components/floating/FloatingSiteRails"),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  metadataBase: new URL("https://qapilot.io"),
  title: {
    default: "QApilot. AI Mobile App Testing & QA Automation",
    template: "%s | QApilot",
  },
  description:
    "Automate mobile app testing with QApilot. AI-powered iOS, Android, and Flutter coverage with self-healing tests. Start your free trial today.",
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
    title: "QApilot. AI Mobile App Testing & QA Automation",
    description:
      "Automate mobile app testing with AI. Instant iOS, Android, and Flutter coverage with self-healing tests for modern mobile teams. Start free today.",
    images: [defaultOpenGraphImage],
    siteName: "QApilot",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@QApilot",
    creator: "@QApilot",
    title: "QApilot. AI Mobile App Testing",
    description:
      "Automate mobile app testing with AI. Instant iOS, Android, and Flutter coverage with self-healing tests for modern mobile teams. Start free today.",
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
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontSans.variable} scroll-smooth`}
    >
      <head>
        <meta httpEquiv="content-language" content="en-US" />
        {supabaseOrigin ? (
          <link
            rel="preconnect"
            href={supabaseOrigin}
            crossOrigin="anonymous"
          />
        ) : null}
        <link
              rel="preconnect"
              href="https://www.googletagmanager.com"
              crossOrigin="anonymous"
            />
            <link
              rel="preconnect"
              href="https://www.google-analytics.com"
              crossOrigin="anonymous"
            />
            {/* Must run before Clarity initializes so strict masking keeps stylesheet hrefs in replays. */}
            <script
              dangerouslySetInnerHTML={{
                __html: CLARITY_UNMASK_STYLESHEETS_SCRIPT,
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(rootSchemaGraphJsonLd),
              }}
            />
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var path = location.pathname || "";
if (path !== "/admin" && path.indexOf("/admin/") !== 0 && path !== "/auth" && path.indexOf("/auth/") !== 0) {
  gtag('js', new Date());
  gtag('config', '${GA4_MEASUREMENT_ID}', { send_page_view: true });
  gtag('config', '${GOOGLE_ADS_ID}');
}
`,
              }}
            />
            {/* GTM, HubSpot, Clarity, Factors, and reb2b load after first interaction or 5s after load. */}
            <script
              dangerouslySetInnerHTML={{
                __html: deferredMarketingScriptsHtml({
                  gtmId: GTM_CONTAINER_ID,
                  hubspotPortalId: HUBSPOT_NA1_PORTAL_ID,
                  reb2bKey: REB2B_SCRIPT_KEY,
                  factorsToken: FACTORS_AI_TOKEN,
                  clarityId: CLARITY_PROJECT_ID,
                }),
              }}
            />
      </head>
      <body className={`${fontSans.className} antialiased`}>
        <Providers>
          <RouteMemory />
          <PublicChrome>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
            <WebMcpRegister />
            <div className="relative z-[1200] w-full bg-background">
              <SitePromoBanner />
              <Header />
            </div>
          </PublicChrome>
          <div className="relative z-0 isolate">{children}</div>
          <PublicChrome>
            <FloatingSiteRails />
          </PublicChrome>
        </Providers>
        <PublicChrome>
          <DeferredAnalytics />
        </PublicChrome>
      </body>
    </html>
  );
}
