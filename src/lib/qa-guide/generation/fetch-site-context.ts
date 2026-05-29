import { SITE_BASE_URL } from "@/lib/constants";

const USER_AGENT = "qapilot-content-automation/1.0 (+https://qapilot.io)";

const INTERNAL_PATH_PREFIXES = ["/qa-guide/", "/blogs/", "/product/", "/news/"];

/** Marketing/product pages scraped for grounded QApilot copy (path only). */
const BRAND_CONTEXT_PATHS = [
  "/",
  "/product",
  "/product/autonomous-testing",
  "/product/intelligent-bug-detection",
  "/for-flutter",
] as const;

const MAX_HOME_CHARS = 10_000;
const MAX_BRAND_PAGE_CHARS = 6_000;
const MAX_PEER_GUIDE_CHARS = 4_000;
const MAX_PEER_GUIDES = 2;

export type BrandPageExcerpt = {
  url: string;
  path: string;
  text: string;
};

export type QapilotSiteContext = {
  homepage_text: string;
  brand_pages: BrandPageExcerpt[];
  peer_guide_excerpts: BrandPageExcerpt[];
  internal_link_candidates: string[];
  warnings: string[];
};

function stripHtmlToText(html: string, maxLen: number): string {
  let cleaned = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  cleaned = cleaned.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const text = cleaned.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.slice(0, maxLen);
}

function parseLocsFromXml(xml: string): string[] {
  const locs: string[] = [];
  const re = /<loc>\s*([^<]+)\s*<\/loc>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const u = m[1]?.trim();
    if (u) locs.push(u);
  }
  return locs;
}

function isInternalCandidate(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("qapilot.io")) return false;
    const path = parsed.pathname;
    return INTERNAL_PATH_PREFIXES.some((p) => path.startsWith(p) || path === p.slice(0, -1));
  } catch {
    return false;
  }
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function fetchPageExcerpt(
  path: string,
  maxChars: number,
): Promise<BrandPageExcerpt | null> {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const url =
    normalizedPath === "/"
      ? `${SITE_BASE_URL}/`
      : `${SITE_BASE_URL}${normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`}`;

  const html = await fetchText(url);
  if (!html) return null;

  const text = stripHtmlToText(html, maxChars);
  if (!text) return null;

  return { url, path: normalizedPath, text };
}

export async function fetchQapilotSiteContext(
  topicCluster?: string,
): Promise<QapilotSiteContext> {
  const out: QapilotSiteContext = {
    homepage_text: "",
    brand_pages: [],
    peer_guide_excerpts: [],
    internal_link_candidates: [],
    warnings: [],
  };

  const homepage = await fetchPageExcerpt("/", MAX_HOME_CHARS);
  if (homepage) {
    out.homepage_text = homepage.text;
    if (homepage.path !== "/") {
      out.brand_pages.push(homepage);
    }
  } else {
    out.warnings.push("homepage fetch failed");
  }

  const brandFetches = BRAND_CONTEXT_PATHS.filter((p) => p !== "/").map((path) =>
    fetchPageExcerpt(path, MAX_BRAND_PAGE_CHARS),
  );
  const brandResults = await Promise.all(brandFetches);
  for (const page of brandResults) {
    if (page) out.brand_pages.push(page);
  }

  const indexXml = await fetchText(`${SITE_BASE_URL}/sitemap-index.xml`);
  const sitemapUrls: string[] = [];
  if (indexXml) {
    for (const loc of parseLocsFromXml(indexXml)) {
      if (loc.endsWith(".xml")) sitemapUrls.push(loc);
    }
  }

  const childUrls = sitemapUrls.length > 0 ? sitemapUrls : [`${SITE_BASE_URL}/sitemap.xml`];
  const seen = new Set<string>();

  for (const sitemapUrl of childUrls) {
    const xml = await fetchText(sitemapUrl);
    if (!xml) continue;
    for (const loc of parseLocsFromXml(xml)) {
      if (!isInternalCandidate(loc)) continue;
      if (!seen.has(loc)) {
        seen.add(loc);
        out.internal_link_candidates.push(loc);
      }
    }
  }

  if (out.internal_link_candidates.length === 0) {
    const hubHtml = await fetchText(`${SITE_BASE_URL}/qa-guide`);
    if (hubHtml) {
      const hrefRe = /href=["']([^"']+)["']/gi;
      let m: RegExpExecArray | null;
      while ((m = hrefRe.exec(hubHtml)) !== null) {
        const href = m[1];
        if (!href) continue;
        const full = href.startsWith("http")
          ? href
          : `${SITE_BASE_URL}${href.startsWith("/") ? "" : "/"}${href}`;
        if (isInternalCandidate(full) && !seen.has(full)) {
          seen.add(full);
          out.internal_link_candidates.push(full);
        }
      }
    } else {
      out.warnings.push("qa-guide hub fallback failed");
    }
  }

  const clusterSlug = topicCluster?.trim();
  const peerCandidates = clusterSlug
    ? out.internal_link_candidates.filter((u) =>
        u.includes(`/qa-guide/${clusterSlug}/`),
      )
    : out.internal_link_candidates.filter((u) => u.includes("/qa-guide/"));

  for (const peerUrl of peerCandidates.slice(0, MAX_PEER_GUIDES)) {
    const html = await fetchText(peerUrl);
    if (!html) continue;
    const text = stripHtmlToText(html, MAX_PEER_GUIDE_CHARS);
    if (!text) continue;
    try {
      const path = new URL(peerUrl).pathname;
      out.peer_guide_excerpts.push({ url: peerUrl, path, text });
    } catch {
      out.peer_guide_excerpts.push({ url: peerUrl, path: peerUrl, text });
    }
  }

  return out;
}

export function normalizeLinkPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname.replace(/\/$/, "") || "/";
  } catch {
    return url.replace("https://qapilot.io", "").replace(/\/$/, "") || "/";
  }
}

export function formatBrandPagesForPrompt(pages: BrandPageExcerpt[]): string {
  if (pages.length === 0) return "(no additional product pages fetched)";
  return pages
    .map(
      (p, i) =>
        `### Page ${i + 1}: ${p.url}\n${p.text}`,
    )
    .join("\n\n");
}
