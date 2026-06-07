#!/usr/bin/env node
/**
 * Validate QE Guide sitemap URLs and ping Bing after sitemap changes.
 *
 * Usage:
 *   node scripts/validate-qa-guide-seo.mjs
 *   node scripts/validate-qa-guide-seo.mjs --ping
 *   SITE_BASE_URL=https://preview.example.com node scripts/validate-qa-guide-seo.mjs
 *
 * Checks:
 * - sitemap-index.xml lists sitemap-qa-guides.xml on the marketing origin
 * - sitemap-qa-guides.xml returns 200 XML with flat /qa-guide/:slug URLs
 * - Each guide URL returns 200, index,follow, and canonical matches the sitemap loc
 * - Legacy /qa-guide/:cluster/:slug URLs in sitemaps are flagged
 *
 * Google deprecated the sitemap ping API (2023). Use Search Console to resubmit;
 * this script pings Bing only.
 */

const SITE_BASE_URL = (
  process.env.SITE_BASE_URL?.trim() || "https://qapilot.io"
).replace(/\/$/, "");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()?.replace(
  /\/$/,
  "",
);

const SHOULD_PING = process.argv.includes("--ping");
const GOOGLEBOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

function parseLocs(xml) {
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return locs;
}

async function fetchText(url, init = {}) {
  const res = await fetch(url, {
    redirect: "follow",
    ...init,
    headers: {
      "User-Agent": GOOGLEBOT_UA,
      Accept: "application/xml,text/xml,text/html,*/*",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  return { res, text };
}

function isLegacyGuideUrl(url) {
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    return segments[0] === "qa-guide" && segments.length === 3;
  } catch {
    return false;
  }
}

function isFlatGuideUrl(url) {
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    return segments[0] === "qa-guide" && segments.length === 2;
  } catch {
    return false;
  }
}

function extractMeta(html, name) {
  const re = new RegExp(
    `<meta\\s+name="${name}"\\s+content="([^"]+)"`,
    "i",
  );
  const m = html.match(re);
  return m?.[1] ?? null;
}

function extractCanonical(html) {
  const m = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  return m?.[1] ?? null;
}

async function validateGuidePage(loc) {
  const issues = [];
  const { res, text } = await fetchText(loc);

  if (res.status !== 200) {
    issues.push(`HTTP ${res.status} (expected 200)`);
    return { loc, ok: false, issues };
  }

  const robots = extractMeta(text, "robots")?.toLowerCase() ?? "";
  if (robots.includes("noindex")) {
    issues.push(`robots=${robots}`);
  }

  const canonical = extractCanonical(text);
  if (!canonical) {
    issues.push("missing canonical");
  } else if (canonical.replace(/\/$/, "") !== loc.replace(/\/$/, "")) {
    issues.push(`canonical mismatch: ${canonical}`);
  }

  if (!text.includes("<h1")) {
    issues.push("missing h1 in HTML");
  }

  return { loc, ok: issues.length === 0, issues, robots, canonical };
}

async function pingBing(sitemapUrl) {
  const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
  const res = await fetch(pingUrl, { method: "GET" });
  return { ok: res.ok, status: res.status, pingUrl };
}

async function main() {
  const report = {
    site: SITE_BASE_URL,
    ok: true,
    warnings: 0,
    sections: [],
  };

  function section(name, ok, details, { hardFail = true } = {}) {
    report.sections.push({ name, ok, details, hardFail });
    if (!ok && hardFail) report.ok = false;
    if (!ok && !hardFail) report.warnings += 1;
  }

  console.log(`\nQE Guide SEO validation — ${SITE_BASE_URL}\n`);

  // robots.txt
  {
    const { res, text } = await fetchText(`${SITE_BASE_URL}/robots.txt`);
    const hasIndex = text.includes("sitemap-index.xml");
    const hasQaGuides =
      text.includes("/sitemap-qa-guides.xml") ||
      text.includes("sitemap-qa-guides");
    const ok = res.ok && hasIndex;
    section("robots.txt", ok, {
      status: res.status,
      listsSitemapIndex: hasIndex,
      listsQaGuideSitemap: hasQaGuides,
    }, { hardFail: false });
    console.log(`${ok ? "✓" : "✗"} robots.txt (${res.status})`);
    if (!hasQaGuides) {
      console.log("  ⚠ robots.txt does not yet list /sitemap-qa-guides.xml (deploy pending?)");
    }
  }

  // sitemap index
  let childSitemaps = [];
  {
    const { res, text } = await fetchText(`${SITE_BASE_URL}/sitemap-index.xml`);
    childSitemaps = parseLocs(text).filter((u) => u.endsWith(".xml") || u.includes("sitemap"));
    const hasLocalQa =
      childSitemaps.includes(`${SITE_BASE_URL}/sitemap-qa-guides.xml`) ||
      childSitemaps.some((u) => u.endsWith("/sitemap-qa-guides.xml"));
    const hasSupabaseQa = childSitemaps.some((u) =>
      u.includes("sitemap-qa-guides"),
    );
    const ok = res.ok;
    section("sitemap-index.xml", ok, {
      status: res.status,
      childCount: childSitemaps.length,
      hasLocalQaGuideSitemap: hasLocalQa,
      hasSupabaseQaGuideSitemap: hasSupabaseQa,
      children: childSitemaps,
    }, { hardFail: false });
    console.log(`${ok ? "✓" : "✗"} sitemap-index.xml (${res.status})`);
    console.log(`  children: ${childSitemaps.length}`);
    if (!hasLocalQa) {
      console.log(
        `  ⚠ sitemap-index missing ${SITE_BASE_URL}/sitemap-qa-guides.xml`,
      );
    }
  }

  // QA guide sitemap sources (prefer marketing origin, fall back to Supabase)
  const qaSitemapCandidates = [
    `${SITE_BASE_URL}/sitemap-qa-guides.xml`,
    SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/sitemap-qa-guides` : null,
    "https://jvxdyfgjudycpopepgku.supabase.co/functions/v1/sitemap-qa-guides",
  ].filter(Boolean);

  let guideLocs = [];
  let activeSitemapUrl = null;
  for (const candidate of qaSitemapCandidates) {
    const { res, text } = await fetchText(candidate);
    const isXml = text.trimStart().startsWith("<?xml") || text.includes("<urlset");
    if (!res.ok || !isXml) {
      console.log(`✗ ${candidate} (${res.status}, not XML)`);
      continue;
    }
    const locs = parseLocs(text).filter(isFlatGuideUrl);
    const legacy = parseLocs(text).filter(isLegacyGuideUrl);
    activeSitemapUrl = candidate;
    guideLocs = locs;
    const ok = locs.length > 0 && legacy.length === 0;
    section(`sitemap: ${candidate}`, ok, {
      status: res.status,
      flatUrls: locs.length,
      legacyUrls: legacy.length,
      legacyExamples: legacy.slice(0, 3),
    }, { hardFail: false });
    console.log(`${ok ? "✓" : "✗"} ${candidate}`);
    console.log(`  flat guide URLs: ${locs.length}, legacy URLs: ${legacy.length}`);
    if (legacy.length > 0) {
      console.log(`  ⚠ legacy sitemap URLs (should redeploy): ${legacy[0]}`);
    }
    break;
  }

  if (guideLocs.length === 0) {
    // Hub fallback when sitemap route not deployed yet
    console.log("\n  Fetching guide links from /qa-guide hub (fallback)...");
    const { res, text } = await fetchText(`${SITE_BASE_URL}/qa-guide`);
    const hrefRe = /href="(\/qa-guide\/[^"]+)"/g;
    let m;
    while ((m = hrefRe.exec(text)) !== null) {
      const href = m[1];
      if (href.split("/").filter(Boolean).length === 2) {
        guideLocs.push(`${SITE_BASE_URL}${href}`);
      }
    }
    guideLocs = [...new Set(guideLocs)];
    section("hub fallback", guideLocs.length > 0, {
      status: res.status,
      guideCount: guideLocs.length,
    });
    console.log(`  hub listed ${guideLocs.length} flat guide URLs`);
  }

  // Validate each guide page
  console.log(`\nValidating ${guideLocs.length} guide pages (Googlebot UA)...\n`);
  const pageResults = [];
  for (const loc of guideLocs) {
    const result = await validateGuidePage(loc);
    pageResults.push(result);
    const mark = result.ok ? "✓" : "✗";
    console.log(`${mark} ${loc}`);
    if (result.issues.length) {
      for (const issue of result.issues) console.log(`    - ${issue}`);
    }
  }

  const pagesOk = pageResults.every((r) => r.ok);
  section("guide pages", pagesOk, {
    total: pageResults.length,
    passed: pageResults.filter((r) => r.ok).length,
    failed: pageResults.filter((r) => !r.ok).map((r) => ({
      url: r.loc,
      issues: r.issues,
    })),
  });

  // Hub page
  {
    const hub = `${SITE_BASE_URL}/qa-guide`;
    const result = await validateGuidePage(hub);
    section("hub /qa-guide", result.ok, {
      url: hub,
      issues: result.issues,
      robots: result.robots,
    });
    console.log(`\n${result.ok ? "✓" : "✗"} hub ${hub}`);
    if (result.issues.length) {
      for (const issue of result.issues) console.log(`    - ${issue}`);
    }
  }

  // Ping Bing
  if (SHOULD_PING) {
    const sitemapIndex = `${SITE_BASE_URL}/sitemap-index.xml`;
    const ping = await pingBing(sitemapIndex);
    section("Bing sitemap ping", ping.ok, ping, { hardFail: false });
    const pingNote =
      ping.status === 410
        ? "  Bing sitemap ping API returned 410 (deprecated) — use Bing Webmaster Tools."
        : "  Google: sitemap ping API removed — resubmit in Search Console manually.";
    console.log(`\n${ping.ok ? "✓" : "⚠"} Bing ping (${ping.status}) → ${sitemapIndex}`);
    console.log(pingNote);
  } else {
    console.log("\nTip: re-run with --ping to notify Bing after deploy.");
  }

  const summary =
    report.warnings > 0
      ? `PASS (${report.warnings} warning${report.warnings === 1 ? "" : "s"})`
      : "PASS";
  console.log(`\n${report.ok ? summary : "FAIL"} — QE Guide SEO validation\n`);

  if (!report.ok) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
