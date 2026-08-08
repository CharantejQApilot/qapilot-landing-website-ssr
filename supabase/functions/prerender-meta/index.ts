import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://qapilot.io";
/** Keep in sync with `DEFAULT_SHARE_IMAGE_URL` in `src/lib/seo.ts` */
const DEFAULT_OG_IMAGE = `${SITE}/og/default-share.png`;
const DEFAULT_OG_IMAGE_WIDTH = "993";
const DEFAULT_OG_IMAGE_HEIGHT = "545";

// ── Static page metadata (keep titles/descriptions aligned with Next.js `metadata` on each route) ──
interface PageMeta {
  title: string;
  description: string;
  ogType?: "website" | "article";
  ogImage?: string;
}

const STATIC_PAGES: Record<string, PageMeta> = {
  "/": {
    title: "QApilot — AI-Powered Mobile App Testing & QA Automation",
    description:
      "QApilot is the AI-native mobile app testing platform that autonomously explores your app, generates coverage, and self-heals broken tests. iOS, Android & Flutter. Book a demo.",
  },
  "/product": {
    title:
      "Mobile Testing Platform for Release Readiness | QApilot",
    description:
      "QApilot is a unified mobile testing platform for release readiness: autonomous coverage, stable execution, intelligent issue detection, Flutter support, and security visibility—designed as one system.",
  },
  "/product/autonomous-testing": {
    title: "Autonomous Mobile App Testing — No Scripts, No Maintenance | QApilot",
    description:
      "QApilot's autonomous testing engine crawls your app like a real user, builds a knowledge graph, and generates test coverage automatically — zero scripting required. iOS & Android.",
  },
  "/product/cowork": {
    title: "CoWork — Activate Test Cases You Already Have | QApilot",
    description:
      "CoWork turns existing test cases into executable mobile automation with AI planning, human-approved replanning, and real-device execution on iOS, Android, and Flutter.",
  },
  "/cowork": {
    title: "CoWork — Activate Test Cases You Already Have | QApilot",
    description:
      "CoWork turns existing test cases into executable mobile automation with AI planning, human-approved replanning, and real-device execution on iOS, Android, and Flutter.",
  },
  "/enterprise": {
    title:
      "Enterprise Mobile Testing Solutions - Scale QA Automation | QApilot",
    description:
      "Enterprise-grade mobile testing automation trusted by Fortune 500 companies. Scale your QA process with AI-powered testing for iOS and Android apps.",
  },
  "/book-demo": {
    title: "Book a Demo — See QApilot on Your Mobile App | QApilot",
    description:
      "Schedule a tailored QApilot demo: autonomous mobile testing, self-healing coverage, and release-ready reporting for iOS, Android, and Flutter teams.",
  },
  "/labs": {
    title: "QApilot Labs - Experiments, Tools & Ideas Shipped Fast",
    description:
      "QApilot Labs is where we build and ship experiments that explore the edges of AI-native development and testing. Discover tools born from hackathons and real-world needs.",
  },
  "/device-coverage-matrix": {
    title: "Device Coverage Matrix — Plan Mobile Device Coverage",
    description:
      "Pick your market, set a coverage target, and get a ranked OEM + platform matrix for Android and iOS before every release.",
  },
  "/ai-time-savings": {
    title: "AI Time Savings Calculator — Real QA Effort Savings",
    description:
      "Model AI test generation vs manual QA. Adjust accuracy and verification cost to see naïve savings versus actual effort after the verification tax.",
  },
  "/about": {
    title: "About QApilot - AI-Native Mobile App Testing Company",
    description:
      "QApilot exists to make mobile testing effortless, scalable, and future-ready for every team, from startups to global enterprises. Learn about our mission and vision.",
  },
  "/careers": {
    title: "Careers - Join the QApilot Team",
    description:
      "Join the QApilot team. Help shape what quality looks like in an AI-first world. Explore career opportunities in AI-powered quality assurance.",
  },
  "/partners": {
    title: "Partners Program — Grow Mobile QA | QApilot",
    description:
      "Partner with QApilot: join consulting and technology firms helping customers ship mobile quality with AI-native testing, joint delivery, and outcomes-led QE.",
  },
  "/for-flutter": {
    title: "Flutter App Testing - AI-Native Testing Platform | QApilot",
    description:
      "The best AI-native platform for Flutter app testing. Instant sanity checks and scalable functional coverage engineered for Flutter's unique needs. Zero setup, script-free testing.",
  },
  "/for-ios": {
    title: "iOS Testing That Actually Works | QApilot",
    description:
      "QApilot runs iOS apps on simulators and real devices—AI element discovery, low-maintenance tests, and release-ready coverage without brittle scripts.",
  },
  "/for-android": {
    title: "Android Testing That Actually Works | QApilot",
    description:
      "QApilot runs Android APK and AAB builds—AI element discovery, low-maintenance tests, and release-ready coverage on real devices and emulators.",
  },
  "/for-react-native": {
    title: "React Native Testing That Actually Works | QApilot",
    description:
      "QApilot runs React Native apps across iOS and Android—AI element discovery, low-maintenance tests, and release-ready coverage without brittle scripts.",
  },
  "/bring-your-own-agent": {
    title: "Differentiators - What Makes QApilot Different | QApilot",
    description:
      "Discover what sets QApilot apart: AI-native architecture, Bring Your Own Agent (BYOA) extensibility, and intelligent mobile app testing automation.",
  },
  "/agentic-architecture": {
    title: "QApilot's Agentic Architecture | AI Agents & Knowledge Graph | QApilot",
    description:
      "How QApilot combines specialized agents, a shared knowledge graph, and continuous learning for autonomous mobile testing — context, exploration, and outcomes in one system.",
  },
  "/ai-self-healing": {
    title: "AI Self-Healing Tests | QApilot",
    description:
      "Automatically recover from UI changes and keep mobile tests stable—multi-layer healing, real-time execution, approvals, and full report visibility.",
  },
  "/security-reports": {
    title: "Security Reports for Mobile Applications | QApilot",
    description:
      "Automated security insights alongside functional testing: permissions, network, storage, trackers, and release-ready risk visibility.",
  },
  "/product/intelligent-bug-detection": {
    title: "Intelligent Bug Detection for Mobile Applications | QApilot",
    description:
      "Go beyond pass or fail. QApilot detects accessibility, latency, and load issues during execution—mapped to exact screens with evidence, severity, and fix guidance.",
  },
  "/qa-guide": {
    title: "QE Guide — Mobile Testing Guides & Checklists | QApilot",
    description:
      "In-depth QE guides for mobile testing: Flutter, Appium, regression checklists, and fintech-ready patterns from the QApilot team.",
  },
  "/compare/qapilot-vs-web-first-automation-tools": {
    title: "QApilot vs Web-First Automation Tools | Mobile-First App Testing | QApilot",
    description:
      "Web-first automation tools were built for browsers, then extended to mobile. QApilot is built mobile-first, helping teams test native, hybrid, and Flutter apps with better coverage, lower maintenance, and faster release confidence.",
  },
  "/compare/qapilot-vs-appium": {
    title: "QApilot vs Appium | AI-Native Mobile App Testing Platform | QApilot",
    description:
      "Compare QApilot vs Appium for mobile app testing. See how QApilot goes beyond scripted automation with autonomous crawling, AI-native test generation, self-healing, real-device execution, and release-ready reporting.",
  },
  "/compare/qapilot-vs-visual-testing-tools": {
    title: "QApilot vs Visual Testing Tools | Mobile App Release Readiness | QApilot",
    description:
      "Compare QApilot vs visual testing tools for mobile app quality. See how QApilot goes beyond screenshot comparison with autonomous testing, journey validation, intelligent bug detection, self-healing, and release-ready reporting.",
  },
  "/compare/qapilot-vs-testsigma": {
    title: "QApilot vs Testsigma | Autonomous Mobile Testing | QApilot",
    description:
      "Compare QApilot vs Testsigma for mobile testing. Autonomous exploration and self-healing go beyond no-code authoring for release-ready mobile QA.",
  },
  "/compare/qapilot-vs-maestro": {
    title: "QApilot vs Maestro | Autonomous Mobile Testing | QApilot",
    description:
      "Compare QApilot vs Maestro for mobile app testing. See how autonomous exploration and self-healing go beyond YAML flow automation for release-ready mobile QA.",
  },
  "/alternatives/browserstack": {
    title: "BrowserStack Alternative — Autonomous Mobile Testing | QApilot",
    description:
      "Looking for a BrowserStack alternative? QApilot adds autonomous test generation, self-healing, and release readiness — mobile-first from day one.",
  },
  "/alternatives/sauce-labs": {
    title: "Sauce Labs Alternative — Autonomous Mobile Testing | QApilot",
    description:
      "Looking for a Sauce Labs alternative? QApilot delivers autonomous mobile test generation, self-healing, and release readiness beyond device clouds.",
  },
  "/alternatives/appium": {
    title: "Appium Alternative — Autonomous Mobile Testing | QApilot",
    description:
      "Looking for an Appium alternative? QApilot adds autonomous exploration, AI-native test generation, self-healing, and release-ready reporting beyond script-first automation.",
  },
  "/integrations": {
    title: "Integrations — Works With Your Testing Stack | QApilot",
    description:
      "QApilot integrates with Jira, TestRail, Jenkins, BrowserStack, Sauce Labs, Slack, Teams, and more — fit autonomous mobile testing into your existing QA stack.",
  },
  "/blogs": {
    title: "Blogs — Mobile Testing Tips, Guides & Best Practices | QApilot",
    description:
      "Expert insights on mobile app testing, QA automation, and test strategy. Learn best practices for iOS and Android testing from the QApilot team.",
  },
  /** Canonical listing path (matches `PATHS.NEWS` in the Next app). */
  "/news": {
    title: "News & Updates - Mobile Testing Industry News | QApilot",
    description:
      "Stay updated with the latest news, product updates, and industry insights from QApilot. Learn about new features, partnerships, and mobile testing trends.",
  },
  "/events": {
    title: "Events - Webinars, Meetups & Live Talks | QApilot",
    description:
      "Webinars, meetups, and live talks from the QApilot team on AI-native mobile testing, autonomous QA, Flutter validation, and release readiness.",
  },
  "/news-updates": {
    title: "News & Updates - Mobile Testing Industry News | QApilot",
    description:
      "Stay updated with the latest news, product updates, and industry insights from QApilot. Learn about new features, partnerships, and mobile testing trends.",
  },
  "/faqs": {
    title: "FAQs - Frequently Asked Questions | QApilot",
    description:
      "Find answers to frequently asked questions about QApilot's AI-powered testing platform, features, pricing, and support.",
  },
  "/for-release-manager": {
    title: "Release Confidence for Release Managers | QApilot",
    description:
      "Ship faster with clearer go / no-go decisions. QApilot reduces pre-launch uncertainty with faster validation, clearer quality signals, and scalable release readiness testing.",
  },
  "/for-qa-engineer": {
    title: "Better Testing for Quality Assurance Engineers | QApilot",
    description:
      "Spend less time maintaining tests and more time improving quality. Create coverage faster, debug quicker, and reduce brittle mobile automation with QApilot.",
  },
  "/for-qa-leader": {
    title: "Release Readiness for QE Leader | QApilot",
    description:
      "Scale quality engineering without scaling complexity. Reduce test maintenance, improve release confidence, and expand mobile coverage with autonomous, AI-native testing.",
  },
  "/for-product-owner": {
    title: "Faster Releases for Product Managers | QApilot",
    description:
      "Launch with confidence and fewer post-release surprises. Improve release readiness, shorten validation cycles, and surface mobile issues before users do.",
  },
  "/for-sre": {
    title: "Release Reliability for SRE Teams | QApilot",
    description:
      "Reduce production risk before it reaches users. Surface mobile quality risks early, strengthen pre-release signals, and cut incidents from bad launches.",
  },
  "/terms": {
    title: "Terms of Service | QApilot",
    description:
      "Read QApilot's Terms of Service. Learn about the terms and conditions governing the use of our AI-powered testing platform.",
  },
  "/privacy": {
    title: "Privacy Policy | QApilot",
    description:
      "Read QApilot's Privacy Policy. Learn how we collect, use, and protect personal data when you use our site and services.",
  },
};

// ── Helpers ─────────────────────────────────────────────────────────────────
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function trimStr(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Matches `blogs/[slug]` generateMetadata image selection (no YouTube fallback in OG URL). */
function blogShareImage(row: Record<string, unknown>): string {
  const og = trimStr(row.og_image_url);
  const feat = trimStr(row.featured_image);
  if (og) return og;
  if (feat) return feat;
  return DEFAULT_OG_IMAGE;
}

/** Matches `news/[slug]` generateMetadata image selection. */
function newsShareImage(row: Record<string, unknown>): string {
  const og = trimStr(row.og_image_url);
  const feat = trimStr(row.featured_image);
  const yt = trimStr(row.youtube_url);
  if (og) return og;
  if (feat) return feat;
  if (yt) {
    const vid = extractYouTubeId(yt);
    if (vid) return `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
  }
  return DEFAULT_OG_IMAGE;
}

/** Legacy display title when `seo_title` is unset (align with older prerender behavior). */
function legacyArticleTitle(rawTitle: string): string {
  if (!rawTitle) return "QApilot";
  return rawTitle.includes("QApilot") ? rawTitle : `${rawTitle} | QApilot`;
}

function buildHtml(meta: {
  title: string;
  description: string;
  url: string;
  image: string;
  ogType: string;
  author?: string;
  publishedDate?: string;
}): string {
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /** Avoid declaring wrong dimensions for arbitrary CMS images (many crawlers ignore these). */
  const dimensionTags =
    meta.image === DEFAULT_OG_IMAGE
      ? `<meta property="og:image:width" content="${DEFAULT_OG_IMAGE_WIDTH}" />
  <meta property="og:image:height" content="${DEFAULT_OG_IMAGE_HEIGHT}" />`
      : "";

  const articleTags =
    meta.ogType === "article" && meta.publishedDate
      ? `<meta property="article:published_time" content="${escaped(meta.publishedDate)}" />
  <meta property="article:author" content="${escaped(meta.author || "QApilot")}" />`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escaped(meta.title)}</title>
  <meta name="description" content="${escaped(meta.description)}" />
  <link rel="canonical" href="${escaped(meta.url)}" />

  <!-- Open Graph -->
  <meta property="og:type" content="${meta.ogType}" />
  <meta property="og:url" content="${escaped(meta.url)}" />
  <meta property="og:title" content="${escaped(meta.title)}" />
  <meta property="og:description" content="${escaped(meta.description)}" />
  <meta property="og:image" content="${escaped(meta.image)}" />
  ${dimensionTags}
  <meta property="og:site_name" content="QApilot" />
  ${articleTags}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@QApilot" />
  <meta name="twitter:title" content="${escaped(meta.title)}" />
  <meta name="twitter:description" content="${escaped(meta.description)}" />
  <meta name="twitter:image" content="${escaped(meta.image)}" />

  <!-- Redirect real users to the SPA -->
  <meta http-equiv="refresh" content="0;url=${escaped(meta.url)}" />
</head>
<body>
  <p>Redirecting to <a href="${escaped(meta.url)}">${escaped(meta.url)}</a></p>
</body>
</html>`;
}

// ── Main handler ────────────────────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = (url.searchParams.get("path") || "/").replace(/\/+$/, "") || "/";
  const canonicalUrl = `${SITE}${path}`;

  // 1. Check static pages first
  const staticMeta = STATIC_PAGES[path];
  if (staticMeta) {
    const html = buildHtml({
      title: staticMeta.title,
      description: staticMeta.description,
      url: canonicalUrl,
      image: staticMeta.ogImage || DEFAULT_OG_IMAGE,
      ogType: staticMeta.ogType || "website",
    });
    return new Response(html, {
      headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    const fallbackHtml = buildHtml({
      title: "QApilot - AI-Powered Mobile App Testing & QA Automation",
      description:
        "Automate your mobile app testing with QApilot's AI-powered platform. Get instant test coverage for iOS & Android apps.",
      url: canonicalUrl,
      image: DEFAULT_OG_IMAGE,
      ogType: "website",
    });
    return new Response(fallbackHtml, {
      headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // /blogs/:slug
  const blogMatch = path.match(/^\/blogs\/(.+)$/);
  if (blogMatch) {
    try {
      const slug = blogMatch[1];
      const { data, error } = await supabase
        .from("blogs")
        .select(
          "title, excerpt, description, featured_image, og_image_url, seo_title, seo_description, author_name, published_date, youtube_url",
        )
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (!error && data) {
        const row = data as unknown as Record<string, unknown>;
        const seoTitle = trimStr(row.seo_title);
        const baseTitle = trimStr(row.title);
        const pageTitle = seoTitle || legacyArticleTitle(baseTitle);
        const description =
          trimStr(row.seo_description) ||
          trimStr(row.excerpt) ||
          trimStr(row.description) ||
          `Read ${baseTitle || "this post"} on the QApilot blog.`;
        const image = blogShareImage(row);
        const html = buildHtml({
          title: pageTitle,
          description,
          url: canonicalUrl,
          image,
          ogType: "article",
          author: (trimStr(row.author_name) || "QApilot") as string,
          publishedDate: trimStr(row.published_date) || undefined,
        });
        return new Response(html, {
          headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
        });
      }
    } catch {
      // fall through to fallback
    }
  }

  // /news/:slug
  const newsMatch = path.match(/^\/news\/(.+)$/);
  if (newsMatch) {
    try {
      const slug = newsMatch[1];
      const { data, error } = await supabase
        .from("news_updates")
        .select(
          "title, excerpt, description, featured_image, og_image_url, seo_title, seo_description, author_name, published_date, youtube_url",
        )
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (!error && data) {
        const row = data as unknown as Record<string, unknown>;
        const seoTitle = trimStr(row.seo_title);
        const baseTitle = trimStr(row.title);
        const pageTitle = seoTitle || legacyArticleTitle(baseTitle);
        const description =
          trimStr(row.seo_description) ||
          trimStr(row.excerpt) ||
          trimStr(row.description) ||
          `Read ${baseTitle || "this update"} on QApilot News.`;
        const image = newsShareImage(row);
        const html = buildHtml({
          title: pageTitle,
          description,
          url: canonicalUrl,
          image,
          ogType: "article",
          author: (trimStr(row.author_name) || "QApilot") as string,
          publishedDate: trimStr(row.published_date) || undefined,
        });
        return new Response(html, {
          headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
        });
      }
    } catch {
      // fall through to fallback
    }
  }

  // /careers/:slug
  const jobMatch = path.match(/^\/careers\/(.+)$/);
  if (jobMatch) {
    try {
      const slug = jobMatch[1];
      const { data, error } = await supabase
        .from("job_openings")
        .select("role, department, location, employment_type")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (!error && data) {
        const empType = data.employment_type
          .replace("_", " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase());
        const title = `${data.role} - ${data.department} | QApilot Careers`;
        const description = `${empType} position in ${data.department} at QApilot. Location: ${data.location}. Join us and help shape what quality looks like in an AI-first world.`;
        const html = buildHtml({
          title,
          description,
          url: canonicalUrl,
          image: DEFAULT_OG_IMAGE,
          ogType: "website",
        });
        return new Response(html, {
          headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
        });
      }
    } catch {
      // fall through to fallback
    }
  }

  // 3. Fallback — unknown path, return generic QApilot meta with redirect
  const fallbackHtml = buildHtml({
    title: "QApilot - AI-Powered Mobile App Testing & QA Automation",
    description:
      "Automate your mobile app testing with QApilot's AI-powered platform. Get instant test coverage for iOS & Android apps.",
    url: canonicalUrl,
    image: DEFAULT_OG_IMAGE,
    ogType: "website",
  });
  return new Response(fallbackHtml, {
    headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
  });
});
