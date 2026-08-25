#!/usr/bin/env node
/**
 * Flag static marketing metadata strings that exceed SERP budgets or end
 * on a weak connector (and/or/the/…).
 *
 * Usage: node scripts/validate-static-seo.mjs
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const META_DESCRIPTION_MAX_LEN = 160;
const PAGE_TITLE_MAX_LEN = 65;
const WEAK_TRAILING_WORD_RE =
  /\b(a|an|and|as|at|by|for|from|in|into|of|on|or|the|to|with|without|vs|via|where|what|which|when|who|whom|whose|how|why)$/i;

function walk(dir, acc = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts)$/.test(f)) acc.push(p);
  }
  return acc;
}

function stripTrailingPunctuation(text) {
  return text.replace(/[\s,.;:\-–—]+$/, "").trimEnd();
}

function endsWithWeak(text) {
  const trimmed = stripTrailingPunctuation(text.replace(/\s+/g, " ").trim());
  if (!trimmed) return false;
  const parts = trimmed.split(/\s+/);
  const last = (parts[parts.length - 1] ?? "").replace(/[.,;\-–—]+$/, "");
  return WEAK_TRAILING_WORD_RE.test(last);
}

const DESC_RE =
  /(?:description|PAGE_DESCRIPTION|ogDescription|twitterDescription)\s*[:=]\s*(?:`([^`]+)`|"([^"]+)"|'([^']+)')/g;
const TITLE_RE =
  /(?:formatPageTitle(?:String)?|title)\s*\(\s*(?:"([^"]+)"|'([^']+)'|`([^`]+)`)/g;

const roots = [
  "src/app/(marketing)",
  "src/lib/home-page-seo.ts",
  "src/lib/case-studies-data.ts",
];

const files = [];
for (const root of roots) {
  try {
    if (statSync(root).isDirectory()) walk(root, files);
    else files.push(root);
  } catch {
    /* skip missing */
  }
}

let failed = 0;
const issues = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  // Flag only page metadata / PAGE_* constants (not UI body copy in *Sections*.tsx).
  if (!/page\.tsx$|home-page-seo\.ts$|case-studies-data\.ts$/.test(file)) {
    continue;
  }

  let m;
  DESC_RE.lastIndex = 0;
  while ((m = DESC_RE.exec(text))) {
    const d = (m[1] || m[2] || m[3] || "").replace(/\s+/g, " ").trim();
    if (d.length < 40) continue;
    if (d.length > META_DESCRIPTION_MAX_LEN) {
      issues.push({
        file,
        kind: "description-over-160",
        len: d.length,
        sample: d.slice(0, 100),
      });
      failed++;
    } else if (endsWithWeak(d)) {
      issues.push({
        file,
        kind: "description-weak-trailing",
        len: d.length,
        sample: d.slice(-40),
      });
      failed++;
    }
  }

  TITLE_RE.lastIndex = 0;
  while ((m = TITLE_RE.exec(text))) {
    const t = (m[1] || m[2] || m[3] || "").replace(/\s+/g, " ").trim();
    if (!t || t.length < 10) continue;
    // Author titles that already include | QApilot are fine after stripBrandSuffix.
    const base = t.replace(/\s*\|\s*QApilot\s*$/i, "").trim();
    if (endsWithWeak(base)) {
      issues.push({
        file,
        kind: "title-weak-trailing",
        len: t.length,
        sample: t.slice(-40),
      });
      failed++;
    }
  }
}

if (issues.length === 0) {
  console.log("validate-static-seo: all checked metadata strings look SERP-safe.");
  process.exit(0);
}

console.log(`validate-static-seo: ${issues.length} issue(s)\n`);
for (const i of issues) {
  console.log(`  ✗ [${i.kind}] ${i.len} ${i.file}`);
  console.log(`      …${i.sample}`);
}
process.exit(failed > 0 ? 1 : 0);
