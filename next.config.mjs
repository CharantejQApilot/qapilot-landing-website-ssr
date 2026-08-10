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
    ];
  },
  async headers() {
    /**
     * Preload product screenshots only. Scenic photo backdrops were removed (CSS patterns).
     * Agent discovery (RFC 8288) stays on `/`.
     */
    return [
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
