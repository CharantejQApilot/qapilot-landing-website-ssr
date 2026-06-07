import {
  buildAiSelfHealingReportLinkHeader,
  buildAutonomousWalkthroughLinkHeader,
  buildCoreAdvantageLinkHeader,
  buildFlutterTestingVideoLinkHeader,
  buildIntelligentBugIssueDetailLinkHeader,
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
  {
    protocol: "https",
    hostname: "images.unsplash.com",
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
const autonomousWalkthroughLink = buildAutonomousWalkthroughLinkHeader();
const intelligentBugIssueDetailLink = buildIntelligentBugIssueDetailLinkHeader();
const flutterTestingVideoLink = buildFlutterTestingVideoLinkHeader();
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
        source: "/platform/autonomous-testing",
        destination: "/product/autonomous-testing",
        permanent: true,
      },
      {
        source: "/platform/ai-self-healing",
        destination: "/ai-self-healing",
        permanent: true,
      },
      {
        source: "/platform/intelligent-bug-detection",
        destination: "/product/intelligent-bug-detection",
        permanent: true,
      },
      {
        source: "/solutions/flutter-testing",
        destination: "/for-flutter",
        permanent: true,
      },
      {
        source: "/book-demo",
        destination: "/for-flutter#flutter-demo",
        permanent: false,
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
     * `/` do not bundle Core Advantage image `preload` hints here: those pull many large
     * Unsplash URLs immediately and hurt mobile LCP/INP. Agent discovery (RFC 8288) stays.
     * Core Advantage preloads remain on `/product` where that block is primary.
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
        source: "/product/autonomous-testing",
        headers: [{ key: "Link", value: autonomousWalkthroughLink }],
      },
      {
        source: "/product/intelligent-bug-detection",
        headers: [{ key: "Link", value: intelligentBugIssueDetailLink }],
      },
      {
        source: "/for-flutter",
        headers: [{ key: "Link", value: flutterTestingVideoLink }],
      },
      {
        source: "/security-reports",
        headers: [{ key: "Link", value: securityReportDeepDiveLink }],
      },
      {
        source: "/ai-self-healing",
        headers: [{ key: "Link", value: aiSelfHealingReportLink }],
      },
    ];
  },
};

export default nextConfig;
