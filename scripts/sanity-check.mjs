/**
 * Marketing site sanity checks. Run after meaningful releases.
 *
 * Usage:
 *   npm run build && npm run start &
 *   npm run sanity-check -- --base-url http://localhost:3000
 *
 * Options:
 *   --base-url <url>   Origin to probe (default: http://localhost:3000)
 *   --production       Use https://qapilot.io (overrides --base-url)
 *   --skip-build       Do not remind to build/start (default: just HTTP checks)
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const useProduction = args.includes("--production");
const baseUrl = useProduction
  ? "https://qapilot.io"
  : args.includes("--base-url")
    ? args[args.indexOf("--base-url") + 1]
    : "http://localhost:3000";

const STATIC_PATHS = [
  "/",
  "/book-demo",
  "/product",
  "/product/autonomous-testing",
  "/product/cowork",
  "/product/dual-device-testing",
  "/product/release-readiness-suite",
  "/for-flutter",
  "/enterprise",
  "/about",
  "/blogs",
  "/news",
  "/events",
  "/qa-guide",
  "/careers",
  "/partners",
  "/case-studies",
  "/case-studies/wio",
  "/case-studies/geml",
  "/case-studies/growsari",
  "/faqs",
  "/labs",
  "/device-coverage-matrix",
  "/ai-time-savings",
  "/agentic-architecture",
  "/bring-your-own-agent",
  "/for-qa-leader",
  "/for-release-manager",
  "/for-qa-engineer",
  "/for-product-owner",
  "/for-sre",
  "/compare/qapilot-vs-web-first-automation-tools",
  "/compare/qapilot-vs-appium",
  "/compare/qapilot-vs-visual-testing-tools",
  "/compare/qapilot-vs-testsigma",
  "/compare/qapilot-vs-maestro",
  "/alternatives/browserstack",
  "/alternatives/sauce-labs",
  "/integrations",
  "/integrations/browserstack",
  "/integrations/jira",
  "/privacy",
  "/terms",
  "/sitemap.xml",
  "/robots.txt",
  "/sitemap-index.xml",
];

const REDIRECT_CHECKS = [
  {
    path: "/cowork",
    expectStatus: 308,
    expectLocationIncludes: "/product/cowork",
  },
  {
    path: "/platform/autonomous-testing",
    expectStatus: 308,
    expectLocationIncludes: "/product/autonomous-testing",
  },
  {
    path: "/appium-alternative",
    expectStatus: 308,
    expectLocationIncludes: "/compare/qapilot-vs-appium",
  },
  {
    path: "/alternatives/appium",
    expectStatus: 308,
    expectLocationIncludes: "/compare/qapilot-vs-appium",
  },
  {
    path: "/terms-conditions",
    expectStatus: 308,
    expectLocationIncludes: "/terms",
  },
];

const FORM_API_ROUTES = [
  {
    path: "/api/hubspot/get-access",
    label: "Main marketing / book demo / events",
  },
  { path: "/api/hubspot/flutter-hero", label: "Flutter hero" },
  { path: "/api/hubspot/partners", label: "Partners" },
  {
    path: "/api/hubspot/lead-magnet",
    label: "Device coverage matrix lead magnet",
  },
];

function loadEventSlugs() {
  try {
    const file = readFileSync(
      join(process.cwd(), "src/lib/events-data.ts"),
      "utf8",
    );
    const slugs = [...file.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
    return [...new Set(slugs)];
  } catch {
    return [];
  }
}

function okStatus(status) {
  return status >= 200 && status < 400;
}

async function checkGet(path) {
  const url = `${baseUrl.replace(/\/$/, "")}${path}`;
  try {
    const res = await fetch(url, { redirect: "manual" });
    return { path, status: res.status, location: res.headers.get("location") };
  } catch (err) {
    return {
      path,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function checkFormApi(path) {
  const url = `${baseUrl.replace(/\/$/, "")}${path}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    return { path, status: res.status };
  } catch (err) {
    return {
      path,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function checkFormApiIncompleteLead(path) {
  const url = `${baseUrl.replace(/\/$/, "")}${path}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: "Build Check",
        email: "build-check@example.com",
      }),
    });
    return { path, status: res.status };
  } catch (err) {
    return {
      path,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function main() {
  console.log(`\nQApilot sanity check. ${baseUrl}\n`);

  let failed = 0;

  console.log("1) Pages & assets (HTTP)");
  for (const path of STATIC_PATHS) {
    const r = await checkGet(path);
    const pass = okStatus(r.status);
    if (!pass) failed++;
    console.log(pass ? "  ✓" : "  ✗", r.status, path, r.error ?? "");
  }

  const eventSlugs = loadEventSlugs();
  for (const slug of eventSlugs) {
    const r = await checkGet(`/events/${slug}`);
    const pass = okStatus(r.status);
    if (!pass) failed++;
    console.log(
      pass ? "  ✓" : "  ✗",
      r.status,
      `/events/${slug}`,
      r.error ?? "",
    );
  }

  console.log("\n2) Redirects");
  for (const {
    path,
    expectStatus,
    expectLocationIncludes,
  } of REDIRECT_CHECKS) {
    const r = await checkGet(path);
    const pass =
      r.status === expectStatus &&
      (r.location?.includes(expectLocationIncludes) ?? false);
    if (!pass) failed++;
    console.log(
      pass ? "  ✓" : "  ✗",
      r.status,
      path,
      r.location ?? r.error ?? "",
    );
  }

  console.log("\n3) Form API routes (expect 422 on empty body = route alive)");
  for (const { path, label } of FORM_API_ROUTES) {
    const r = await checkFormApi(path);
    const pass = r.status === 422 || r.status === 400;
    if (!pass) failed++;
    console.log(
      pass ? "  ✓" : "  ✗",
      r.status,
      path,
      `.  ${label}`,
      r.error ?? "",
    );
  }

  console.log("\n3b) Lead form APIs reject incomplete payloads (422, not 5xx)");
  for (const path of [
    "/api/hubspot/get-access",
    "/api/hubspot/flutter-hero",
    "/api/hubspot/partners",
  ]) {
    const r = await checkFormApiIncompleteLead(path);
    const pass = r.status === 422;
    if (!pass) failed++;
    console.log(pass ? "  ✓" : "  ✗", r.status, path, r.error ?? "");
  }

  console.log("\n4) Manual / browser checks (not automated here)");
  console.log("  • CoWork hero video: autoplay, loop, unmute");
  console.log(
    "  • Scenic YouTube embeds: autonomous testing, Flutter, intelligent bug detection",
  );
  console.log("  • Event detail YouTube embeds where configured");
  console.log(
    "  • Header/footer nav, Platform menu, Explore QApilot CTAs on events",
  );
  console.log("  • Mobile layout + Core Web Vitals (PageSpeed / Lighthouse)");
  console.log(
    "  • GTM, GA4, Clarity, RB2B, Factors.ai, HubSpot script in Network tab (marketing pages only)",
  );
  console.log("  • Submit each live form with test data in HubSpot");
  console.log("  • OG/Twitter cards, canonicals, JSON-LD on key URLs");

  console.log(
    `\n${failed === 0 ? "All automated checks passed." : `${failed} automated check(s) failed.`}\n`,
  );
  process.exit(failed > 0 ? 1 : 0);
}

main();
