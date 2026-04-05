import {
  buildAiSelfHealingReportLinkHeader,
  buildAutonomousWalkthroughLinkHeader,
  buildCoreAdvantageLinkHeader,
  buildFlutterTestingVideoLinkHeader,
  buildIntelligentBugIssueDetailLinkHeader,
  buildSecurityReportDeepDiveLinkHeader,
} from "./src/lib/core-advantage-scenic-urls.mjs";

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

const nextConfig = {
  images: {
    remotePatterns,
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/primary-favicon.svg",
        permanent: false,
      },
    ];
  },
  async headers() {
    /** Early hints for Core Advantage scenic + default tab screenshot (home + platform overview only). */
    return [
      {
        source: "/",
        headers: [{ key: "Link", value: coreAdvantageLink }],
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
