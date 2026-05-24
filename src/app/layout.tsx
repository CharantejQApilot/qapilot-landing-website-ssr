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
import { Analytics } from "@vercel/analytics/next";

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
        {/* DNS Prefetch for third-party domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://js.hsforms.net" />
        <link rel="dns-prefetch" href="https://js.hs-scripts.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://ddwl4m2hdecbv.cloudfront.net" />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window[(function(_n9C,_VO){var _mjCWq='';for(var _QSrkp5=0;_QSrkp5<_n9C.length;_QSrkp5++){var _Niki=_n9C[_QSrkp5].charCodeAt();_Niki-=_VO;_Niki+=61;_mjCWq==_mjCWq;_VO>8;_Niki!=_QSrkp5;_Niki%=94;_Niki+=33;_mjCWq+=String.fromCharCode(_Niki)}return _mjCWq})(atob('XEtSdHFsZ2V2TWd7'), 2)] = '4c6a0a75e01777461860';     var zi = document.createElement('script');     (zi.type = 'text/javascript'),     (zi.async = true),     (zi.src = (function(_AE4,_dd){var _YokOA='';for(var _eydbHi=0;_eydbHi<_AE4.length;_eydbHi++){_7aB5!=_eydbHi;_YokOA==_YokOA;var _7aB5=_AE4[_eydbHi].charCodeAt();_7aB5-=_dd;_7aB5+=61;_dd>8;_7aB5%=94;_7aB5+=33;_YokOA+=String.fromCharCode(_7aB5)}return _YokOA})(atob('MT09OTxhVlYzPFVDMlQ8LDsyOT08VSw4NlZDMlQ9KjBVMzw='), 39)),     document.readyState === 'complete'?document.body.appendChild(zi):     window.addEventListener('load', function(){         document.body.appendChild(zi)     });`,
          }}
        />
        {/* Factors AI SDK (manual setup) — exact vendor snippet in global head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.faitracker=window.faitracker||function(){this.q=[];var t=new CustomEvent("FAITRACKER_QUEUED_EVENT");return this.init=function(t,e,a){this.TOKEN=t,this.INIT_PARAMS=e,this.INIT_CALLBACK=a,window.dispatchEvent(new CustomEvent("FAITRACKER_INIT_EVENT"))},this.call=function(){var e={k:"",a:[]};if(arguments&&arguments.length>=1){for(var a=1;a<arguments.length;a++)e.a.push(arguments[a]);e.k=arguments[0]}this.q.push(e),window.dispatchEvent(t)},this.message=function(){window.addEventListener("message",function(t){"faitracker"===t.data.origin&&this.call("message",t.data.type,t.data.message)})},this.message(),this.init("n6j67ljo4qxjwgnvo5ilzjd4b2qsic2v",{host:"https://api.factors.ai"}),this}(),function(){var t=document.createElement("script");t.type="text/javascript",t.src="https://app.factors.ai/assets/factors.js",t.async=!0,(d=document.getElementsByTagName("script")[0]).parentNode.insertBefore(t,d)}();`,
          }}
        />
        <script
          id="vtag-ai-js"
          async
          src="https://r2.leadsy.ai/tag.js"
          data-pid="B6CCj6R02ALsaXgt"
          data-version="062024"
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

        {/* RB2B company identification — beforeInteractive injects into document head */}
        <Script id="reb2b-loader" strategy="beforeInteractive">
          {`!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("9NMMZHRD91NW");`}
        </Script>
        
        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
