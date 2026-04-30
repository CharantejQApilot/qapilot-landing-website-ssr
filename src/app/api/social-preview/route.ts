import { NextRequest, NextResponse } from "next/server";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { SITE_BASE_URL } from "@/lib/constants";

const DEFAULT_TITLE = "QApilot - AI-Powered Mobile App Testing & QA Automation";
const DEFAULT_DESCRIPTION =
  "Automate your mobile app testing with QApilot's AI-powered platform. Get instant test coverage for iOS and Android apps.";
const DEFAULT_IMAGE = `${SITE_BASE_URL}/og/default-share.png`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(meta: {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: "website" | "article";
}): string {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const url = escapeHtml(meta.url);
  const image = escapeHtml(meta.image);
  const type = meta.type ?? "article";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="QApilot" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${image}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  <meta http-equiv="refresh" content="0;url=${url}" />
</head>
<body>
  <p>Redirecting to <a href="${url}">${url}</a></p>
</body>
</html>`;
}

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function articleTitle(rawTitle: string): string {
  if (!rawTitle) return "QApilot";
  return rawTitle.includes("QApilot") ? rawTitle : `${rawTitle} | QApilot`;
}

function youtubeThumb(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return null;
}

type MetaPayload = {
  title: string;
  description: string;
  image: string;
  type?: "website" | "article";
};

async function blogMeta(pathname: string): Promise<MetaPayload | null> {
  const slug = pathname.split("/")[2];
  if (!slug) return null;
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("blogs")
    .select("title, seo_title, excerpt, description, seo_description, og_image_url, featured_image")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return null;
  const title = asTrimmedString((data as { seo_title?: unknown }).seo_title) || articleTitle(asTrimmedString(data.title));
  const description =
    asTrimmedString((data as { seo_description?: unknown }).seo_description) ||
    asTrimmedString(data.excerpt) ||
    asTrimmedString((data as { description?: unknown }).description) ||
    `Read ${asTrimmedString(data.title) || "this blog"} on QApilot.`;
  const image =
    asTrimmedString((data as { og_image_url?: unknown }).og_image_url) ||
    asTrimmedString(data.featured_image) ||
    DEFAULT_IMAGE;
  return { title, description, image, type: "article" };
}

async function newsMeta(pathname: string): Promise<MetaPayload | null> {
  const slug = pathname.split("/")[2];
  if (!slug) return null;
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("news_updates")
    .select("title, seo_title, excerpt, description, seo_description, og_image_url, featured_image, youtube_url")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return null;
  const title = asTrimmedString((data as { seo_title?: unknown }).seo_title) || articleTitle(asTrimmedString(data.title));
  const description =
    asTrimmedString((data as { seo_description?: unknown }).seo_description) ||
    asTrimmedString(data.excerpt) ||
    asTrimmedString((data as { description?: unknown }).description) ||
    `Read ${asTrimmedString(data.title) || "this update"} on QApilot news.`;
  const image =
    asTrimmedString((data as { og_image_url?: unknown }).og_image_url) ||
    asTrimmedString(data.featured_image) ||
    youtubeThumb(asTrimmedString((data as { youtube_url?: unknown }).youtube_url)) ||
    DEFAULT_IMAGE;
  return { title, description, image, type: "article" };
}

async function caseStudyMeta(pathname: string): Promise<MetaPayload | null> {
  const slug = pathname.split("/")[2];
  if (!slug) return null;
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("case_studies")
    .select("title, seo_title, excerpt, description, seo_description, og_image_url, featured_image")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return null;
  const title = asTrimmedString((data as { seo_title?: unknown }).seo_title) || articleTitle(asTrimmedString(data.title));
  const description =
    asTrimmedString((data as { seo_description?: unknown }).seo_description) ||
    asTrimmedString(data.excerpt) ||
    asTrimmedString((data as { description?: unknown }).description) ||
    `Read ${asTrimmedString(data.title) || "this case study"} on QApilot.`;
  const image =
    asTrimmedString((data as { og_image_url?: unknown }).og_image_url) ||
    asTrimmedString(data.featured_image) ||
    DEFAULT_IMAGE;
  return { title, description, image, type: "article" };
}

async function careersMeta(pathname: string): Promise<MetaPayload | null> {
  const key = pathname.split("/")[2];
  if (!key) return null;
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return null;
  let { data, error } = await supabase
    .from("job_openings")
    .select("id, slug, role, department, location, employment_type")
    .eq("slug", key)
    .eq("published", true)
    .maybeSingle();
  if (!data) {
    const byId = await supabase
      .from("job_openings")
      .select("id, slug, role, department, location, employment_type")
      .eq("id", key)
      .eq("published", true)
      .maybeSingle();
    data = byId.data;
    error = byId.error;
  }
  if (error || !data) return null;
  const role = asTrimmedString(data.role) || "Job opening";
  const department = asTrimmedString(data.department);
  const location = asTrimmedString(data.location);
  const title = `${role}${department ? ` - ${department}` : ""} | QApilot Careers`;
  const description = `${role}${location ? ` in ${location}` : ""}. Explore careers at QApilot.`;
  return { title, description, image: DEFAULT_IMAGE, type: "website" };
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_BASE_URL}${canonicalPath}`;

  let payload: MetaPayload | null = null;
  try {
    if (canonicalPath.startsWith("/blogs/")) {
      payload = await blogMeta(canonicalPath);
    } else if (canonicalPath.startsWith("/news/")) {
      payload = await newsMeta(canonicalPath);
    } else if (canonicalPath.startsWith("/case-studies/")) {
      payload = await caseStudyMeta(canonicalPath);
    } else if (canonicalPath.startsWith("/careers/")) {
      payload = await careersMeta(canonicalPath);
    }
  } catch {
    payload = null;
  }

  const html = buildHtml({
    title: payload?.title || DEFAULT_TITLE,
    description: payload?.description || DEFAULT_DESCRIPTION,
    image: payload?.image || DEFAULT_IMAGE,
    url: canonicalUrl,
    type: payload?.type || "website",
  });

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=1800",
    },
  });
}
