import type { Metadata } from "next";
import { headers } from "next/headers";
import Providers from "./providers";
import Header from "@/components/Header";
import SitePromoBanner from "@/components/SitePromoBanner";
import { defaultOpenGraphImage } from "@/lib/seo";
import { rootSchemaGraphJsonLd } from "@/lib/root-jsonld";
import {
  CLARITY_PROJECT_ID,
  GA4_MEASUREMENT_ID,
  GTM_CONTAINER_ID,
  HUBSPOT_NA1_PORTAL_ID,
  FACTORS_AI_TOKEN,
  REB2B_SCRIPT_KEY,
  SITE_BASE_URL,
} from "@/lib/constants";
import { CLARITY_UNMASK_STYLESHEETS_SCRIPT } from "@/lib/clarity-unmask-stylesheets-script";
import { fontHeading, fontSans } from "@/lib/fonts";
import { isInternalRouteRequest } from "@/lib/internal-routes";
import "./globals.css";
import dynamic from "next/dynamic";
import DeferredAnalytics from "@/components/DeferredAnalytics";

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
    title: "QApilot. AI Mobile App Testing & QA Automation",
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
    title: "QApilot. AI Mobile App Testing",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseOrigin = supabasePreconnectOrigin();
  const internal = isInternalRouteRequest(await headers());

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
        {!internal ? (
          <>
            {/* Must run before Clarity initializes so strict masking keeps stylesheet hrefs in replays. */}
            <script
              dangerouslySetInnerHTML={{
                __html: CLARITY_UNMASK_STYLESHEETS_SCRIPT,
              }}
            />
            {/* Google Analytics / GTM first. Highest priority connection hints + early parse. */}
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
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            <link
              rel="preconnect"
              href="https://www.clarity.ms"
              crossOrigin="anonymous"
            />
            <link
              rel="preconnect"
              href="https://js.hs-scripts.com"
              crossOrigin="anonymous"
            />
            <link
              rel="preconnect"
              href="https://ddwl4m2hdecbv.cloudfront.net"
              crossOrigin="anonymous"
            />
            <link
              rel="preconnect"
              href="https://app.factors.ai"
              crossOrigin="anonymous"
            />
            <link
              rel="preconnect"
              href="https://api.factors.ai"
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href="https://js.hsforms.net" />
            <link rel="dns-prefetch" href="https://js.hs-analytics.net" />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(rootSchemaGraphJsonLd),
              }}
            />
            {/* Native head scripts. Load with first HTML parse for full tracker coverage. */}
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`,
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
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}', { send_page_view: true });
`,
              }}
            />
            <script
              async
              defer
              id="hs-script-loader"
              src={`https://js.hs-scripts.com/${HUBSPOT_NA1_PORTAL_ID}.js`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement("script");s.async=true;s.src="https://ddwl4m2hdecbv.cloudfront.net/b/"+key+"/"+key+".js.gz";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);}("${REB2B_SCRIPT_KEY}");`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.faitracker=window.faitracker||function(){this.q=[];var t=new CustomEvent("FAITRACKER_QUEUED_EVENT");return this.init=function(t,e,a){this.TOKEN=t,this.INIT_PARAMS=e,this.INIT_CALLBACK=a,window.dispatchEvent(new CustomEvent("FAITRACKER_INIT_EVENT"))},this.call=function(){var e={k:"",a:[]};if(arguments&&arguments.length>=1){for(var a=1;a<arguments.length;a++)e.a.push(arguments[a]);e.k=arguments[0]}this.q.push(e),window.dispatchEvent(t)},this.message=function(){window.addEventListener("message",function(t){"faitracker"===t.data.origin&&this.call("message",t.data.type,t.data.message)})},this.message(),this.init("${FACTORS_AI_TOKEN}",{host:"https://api.factors.ai"}),this}(),function(){var t=document.createElement("script");t.type="text/javascript",t.src="https://app.factors.ai/assets/factors.js",t.async=!0,(d=document.getElementsByTagName("script")[0]).parentNode.insertBefore(t,d)}();`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;(l.head||l.documentElement).appendChild(t);})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");`,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        {!internal ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}

        <Providers trackAnalytics={!internal}>
          {!internal ? <WebMcpRegister /> : null}
          {!internal ? (
            <div className="relative z-[1200] w-full bg-background">
              <SitePromoBanner />
              <Header />
            </div>
          ) : null}
          <div className="relative z-0 isolate">{children}</div>
          {!internal ? <FloatingSiteRails /> : null}
        </Providers>

        {!internal ? <DeferredAnalytics /> : null}
      </body>
    </html>
  );
}
