import {
  buildAiSelfHealingReportLinkHeader,
  buildCoreAdvantageLinkHeader,
  buildSecurityReportDeepDiveLinkHeader,
} from "./src/lib/core-advantage-scenic-urls.mjs";
import { buildAgentDiscoveryLinkHeader } from "./src/lib/agent-discovery-link-header.mjs";

/** @type {import('next').NextConfig} */

const remotePatterns = [
  {
    protocol: "https",
    hostname: "storage.googleapis.com",
  },
  {
    protocol: "https",
    hostname: "img.youtube.com",
  },
  {
    protocol: "https",
    hostname: "i.ytimg.com",
  },
  // CMS blog / news / QE Guide heroes (e.g. qapilotlabs.s3.us-east-1.amazonaws.com)
  {
    protocol: "https",
    hostname: "qapilotlabs.s3.us-east-1.amazonaws.com",
  },
  {
    protocol: "https",
    hostname: "*.s3.*.amazonaws.com",
  },
  {
    protocol: "https",
    hostname: "*.s3.amazonaws.com",
  },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl) {
  try {
    const { hostname } = new URL(supabaseUrl);
    if (hostname) {
      remotePatterns.unshift({
        protocol: "https",
        hostname,
      });
    }
  } catch {
    // Invalid URL; skip Supabase image host
  }
}

const coreAdvantageLink = buildCoreAdvantageLinkHeader();
const securityReportDeepDiveLink = buildSecurityReportDeepDiveLinkHeader();
const aiSelfHealingReportLink = buildAiSelfHealingReportLinkHeader();
const agentDiscoveryLink = buildAgentDiscoveryLinkHeader();

const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-toast",
      "@radix-ui/react-dialog",
    ],
  },
  images: {
    remotePatterns,
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.qapilot.io" }],
        destination: "https://qapilot.io/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "flutter.qapilot.io" }],
        destination: "https://qapilot.io/for-flutter",
        permanent: true,
      },
      {
        source: "/platform/autonomous-testing",
        destination: "/product/autonomous-testing",
        permanent: true,
      },
      {
        source: "/appium-alternative",
        destination: "/compare/qapilot-vs-appium",
        permanent: true,
      },
      {
        source: "/alternatives/appium",
        destination: "/compare/qapilot-vs-appium",
        permanent: true,
      },
      {
        source: "/platform/ai-self-healing",
        destination: "/product/release-readiness-suite",
        permanent: true,
      },
      {
        source: "/platform/intelligent-bug-detection",
        destination: "/product/release-readiness-suite",
        permanent: true,
      },
      {
        source: "/platform/security-reports",
        destination: "/product/release-readiness-suite",
        permanent: true,
      },
      {
        source: "/product/intelligent-bug-detection",
        destination: "/product/release-readiness-suite",
        permanent: true,
      },
      {
        source: "/security-reports",
        destination: "/product/release-readiness-suite",
        permanent: true,
      },
      {
        source: "/ai-self-healing",
        destination: "/product/release-readiness-suite",
        permanent: true,
      },
      {
        source: "/cowork",
        destination: "/product/cowork",
        permanent: true,
      },
      {
        source: "/solutions/flutter-testing",
        destination: "/for-flutter",
        permanent: true,
      },
      {
        source: "/compare/qapilot-vs-visual-testing",
        destination: "/compare/qapilot-vs-visual-testing-tools",
        permanent: true,
      },
      {
        source: "/qa-guide/:cluster/:slug",
        destination: "/qa-guide/:slug",
        permanent: true,
      },
      // Renamed QE Guide slugs (stale url_path / external links still hit these)
      {
        source: "/qa-guide/comprehensive-guide-testing-types-mobile-app-development",
        destination: "/qa-guide/testing-types-in-mobile-app-development",
        permanent: true,
      },
      {
        source: "/qa-guide/what-is-regression-testing-mobile-app-development",
        destination: "/qa-guide/regression-testing",
        permanent: true,
      },
      {
        source: "/qa-guide/behaviour-driven-development-mobile-apps",
        destination: "/qa-guide/behaviour-driven-development",
        permanent: true,
      },
      // Long CMS slugs → short SEO-canonical URLs
      {
        source:
          "/blogs/leveraging-image-recognition-for-robust-and-self-healing-test-automation-with-qapilot",
        destination: "/blogs/image-recognition-self-healing-tests",
        permanent: true,
      },
      {
        source:
          "/blogs/beyond-sequential-testing-accelerate-your-mobile-app-testing-with-parallel-execution",
        destination: "/blogs/parallel-mobile-app-testing",
        permanent: true,
      },
      {
        source: "/blogs/best-browserstack-alternatives-2026",
        destination: "/blogs/browserstack-alternatives-2026",
        permanent: true,
      },
      {
        source:
          "/news/qapilot-s-gold-sponsorship-speaker-session-and-community-engagement-at-qe-conclave-2025",
        destination: "/news/qapilot-qe-conclave-2025",
        permanent: true,
      },
      {
        source:
          "/news/joe-colantonio-on-flutter-testing-in-2026-why-mobile-teams-need-a-new-playbook",
        destination: "/news/joe-colantonio-flutter-testing-2026",
        permanent: true,
      },
      {
        source:
          "/news/qapilot-announces-strategic-partnership-with-qualizeal-to-elevate-mobile-app-quality-engineering",
        destination: "/news/qapilot-qualizeal-partnership",
        permanent: true,
      },
      {
        source:
          "/news/observing-the-agentic-ai-ecosystem-qapilot-at-the-nasscom-and-google-agentic-ai-roadshow",
        destination: "/news/qapilot-nasscom-google-agentic-ai",
        permanent: true,
      },
      {
        source:
          "/news/surendranath-jillela-featured-in-ceo-insights-leading-ai-native-quality-engineering",
        destination: "/news/surendranath-jillela-ceo-insights",
        permanent: true,
      },
    ];
  },
  async headers() {
    /**
     * Site-wide security headers (HSTS is already set by Vercel).
     * CSP omitted — HubSpot / GTM / Clarity / embeds would need a long allowlist.
     * Agent discovery (RFC 8288) stays on `/`.
     */
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: agentDiscoveryLink,
          },
        ],
      },
      {
        source: "/product",
        headers: [{ key: "Link", value: coreAdvantageLink }],
      },
      {
        source: "/product/release-readiness-suite",
        headers: [
          {
            key: "Link",
            value: [securityReportDeepDiveLink, aiSelfHealingReportLink].join(
              ", ",
            ),
          },
        ],
      },
      {
        source: "/device-coverage/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
