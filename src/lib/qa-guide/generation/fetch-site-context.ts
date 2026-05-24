import { SITE_BASE_URL } from "@/lib/constants";

const USER_AGENT = "qapilot-content-automation/1.0 (+https://qapilot.io)";

const INTERNAL_PATH_PREFIXES = ["/qa-guide/", "/blogs/", "/product/", "/case-studies/", "/news/"];

export type QapilotSiteContext = {
  homepage_text: string;
  internal_link_candidates: string[];
  warnings: string[];
};

function stripHtmlToText(html: string, maxLen = 8000): string {
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

export async function fetchQapilotSiteContext(): Promise<QapilotSiteContext> {
  const out: QapilotSiteContext = {
    homepage_text: "",
    internal_link_candidates: [],
    warnings: [],
  };

  const homepageHtml = await fetchText(SITE_BASE_URL);
  if (homepageHtml) {
    out.homepage_text = stripHtmlToText(homepageHtml);
  } else {
    out.warnings.push("homepage fetch failed");
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
        const full = href.startsWith("http") ? href : `${SITE_BASE_URL}${href.startsWith("/") ? "" : "/"}${href}`;
        if (isInternalCandidate(full) && !seen.has(full)) {
          seen.add(full);
          out.internal_link_candidates.push(full);
        }
      }
    } else {
      out.warnings.push("qa-guide hub fallback failed");
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
