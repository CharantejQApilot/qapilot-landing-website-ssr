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
    title:
      "QApilot - AI-Powered Mobile App Testing & QA Automation | iOS & Android",
    description:
      "Automate your mobile app testing with QApilot's AI-powered platform. Get instant test coverage for iOS & Android apps. Start testing in minutes, not hours.",
  },
  "/product": {
    title:
      "Mobile Testing Platform for Release Readiness | QApilot",
    description:
      "QApilot is a unified mobile testing platform for release readiness: autonomous coverage, stable execution, intelligent issue detection, Flutter support, and security visibility—designed as one system.",
  },
  "/product/autonomous-testing": {
    title: "Autonomous Mobile App Testing - Agentic QA | QApilot",
    description:
      "Experience agentic testing with QApilot: AI crawlers, intelligent agents, and a knowledge graph for autonomous mobile test coverage on iOS and Android.",
  },
  "/enterprise": {
    title:
      "Enterprise Mobile Testing Solutions - Scale QA Automation | QApilot",
    description:
      "Enterprise-grade mobile testing automation trusted by Fortune 500 companies. Scale your QA process with AI-powered testing for iOS and Android apps.",
  },
  "/labs": {
    title: "QApilot Labs - Experiments, Tools & Ideas Shipped Fast",
    description:
      "QApilot Labs is where we build and ship experiments that explore the edges of AI-native development and testing. Discover tools born from hackathons and real-world needs.",
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
  "/for-flutter": {
    title: "Flutter App Testing - AI-Native Testing Platform | QApilot",
    description:
      "The best AI-native platform for Flutter app testing. Instant sanity checks and scalable functional coverage engineered for Flutter's unique needs. Zero setup, script-free testing.",
  },
  "/bring-your-own-agent": {
    title: "Differentiators - What Makes QApilot Different | QApilot",
    description:
      "Discover what sets QApilot apart: AI-native architecture, Bring Your Own Agent (BYOA) extensibility, and intelligent mobile app testing automation.",
  },
  "/blogs": {
    title: "Mobile Testing Blog - Tips, Guides & Best Practices | QApilot",
    description:
      "Expert insights on mobile app testing, QA automation, and test strategy. Learn best practices for iOS and Android testing from the QApilot team.",
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

  const [imgW, imgH] =
    meta.image === DEFAULT_OG_IMAGE
      ? [DEFAULT_OG_IMAGE_WIDTH, DEFAULT_OG_IMAGE_HEIGHT]
      : ["1200", "630"];

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
  <meta property="og:image:width" content="${imgW}" />
  <meta property="og:image:height" content="${imgH}" />
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

  // 2. Dynamic routes — need Supabase
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // /blogs/:slug
  const blogMatch = path.match(/^\/blogs\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const { data } = await supabase
      .from("blogs")
      .select("title, excerpt, featured_image, author_name, published_date, youtube_url")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
      let image = data.featured_image || DEFAULT_OG_IMAGE;
      if (!data.featured_image && data.youtube_url) {
        const vid = extractYouTubeId(data.youtube_url);
        if (vid) image = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
      }
      const title = data.title.includes("QApilot")
        ? data.title
        : `${data.title} | QApilot`;
      const html = buildHtml({
        title,
        description: data.excerpt || data.title,
        url: canonicalUrl,
        image,
        ogType: "article",
        author: data.author_name || "QApilot",
        publishedDate: data.published_date || undefined,
      });
      return new Response(html, {
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
      });
    }
  }

  // /news/:slug  (news-updates uses /news/ in routes)
  const newsMatch = path.match(/^\/news\/(.+)$/);
  if (newsMatch) {
    const slug = newsMatch[1];
    const { data } = await supabase
      .from("news_updates")
      .select("title, excerpt, featured_image, author_name, published_date, youtube_url")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
      let image = data.featured_image || DEFAULT_OG_IMAGE;
      if (!data.featured_image && data.youtube_url) {
        const vid = extractYouTubeId(data.youtube_url);
        if (vid) image = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
      }
      const title = data.title.includes("QApilot")
        ? data.title
        : `${data.title} | QApilot`;
      const html = buildHtml({
        title,
        description: data.excerpt || data.title,
        url: canonicalUrl,
        image,
        ogType: "article",
        author: data.author_name || "QApilot",
        publishedDate: data.published_date || undefined,
      });
      return new Response(html, {
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
      });
    }
  }

  // /careers/:slug
  const jobMatch = path.match(/^\/careers\/(.+)$/);
  if (jobMatch) {
    const slug = jobMatch[1];
    const { data } = await supabase
      .from("job_openings")
      .select("role, department, location, employment_type")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
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
