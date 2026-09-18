#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const STAMP_PATH = join(process.cwd(), ".cursor/cache/seo-audit-stamp.json");
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function allow() {
  process.stdout.write(JSON.stringify({ permission: "allow" }));
}

function deny(agentMessage, userMessage) {
  process.stdout.write(
    JSON.stringify({
      permission: "deny",
      agent_message: agentMessage,
      user_message: userMessage,
    }),
  );
}

process.on("uncaughtException", () => {
  allow();
  process.exit(0);
});

function git(cmd) {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function isProductionDeploy(command) {
  const c = String(command || "");
  if (/\bvercel\b/i.test(c) && /(--prod\b|\bdeploy\b)/i.test(c)) return true;
  if (/\bgh\s+pr\s+merge\b/i.test(c)) return true;
  if (!/\bgit\s+push\b/i.test(c)) return false;
  if (/\b(main|master)\b/i.test(c)) return true;
  const branch = git("git rev-parse --abbrev-ref HEAD");
  return branch === "main" || branch === "master";
}

let payload = {};
try {
  payload = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  payload = {};
}

const command = payload.command || payload.tool_input?.command || "";
if (!isProductionDeploy(command)) {
  allow();
  process.exit(0);
}

const blocked =
  "Production deploy blocked. Read .cursor/skills/pre-deploy-seo-audit/SKILL.md, run the marketingskills seo-audit playbook, fix critical issues, then write .cursor/cache/seo-audit-stamp.json for the current git HEAD.";

if (!existsSync(STAMP_PATH)) {
  deny(blocked, "Deploy blocked until the site-wide SEO audit stamp exists.");
  process.exit(0);
}

let stamp;
try {
  stamp = JSON.parse(readFileSync(STAMP_PATH, "utf8"));
} catch {
  deny(
    "SEO audit stamp is invalid JSON. Re-run the pre-deploy SEO audit skill.",
    "Deploy blocked: invalid SEO audit stamp.",
  );
  process.exit(0);
}

if (Number(stamp.criticalOpen) > 0) {
  deny(
    `SEO audit stamp still has ${stamp.criticalOpen} critical issue(s). Fix them before deploying.`,
    "Deploy blocked: critical SEO issues remain.",
  );
  process.exit(0);
}

const completedAt = Date.parse(stamp.completedAt);
const age = Date.now() - completedAt;
if (!stamp.completedAt || Number.isNaN(completedAt) || age > MAX_AGE_MS) {
  deny(
    "SEO audit stamp is missing completedAt or is older than 24 hours. Re-run the pre-deploy SEO audit skill.",
    "Deploy blocked: SEO audit is stale.",
  );
  process.exit(0);
}

const head = git("git rev-parse HEAD");
const branch = git("git rev-parse --abbrev-ref HEAD");

if (stamp.branch && branch && stamp.branch !== branch) {
  deny(
    `SEO audit stamp is for branch ${stamp.branch}; current branch is ${branch}. Re-run the audit.`,
    "Deploy blocked: SEO audit was for a different branch.",
  );
  process.exit(0);
}

if (stamp.gitHead && head && stamp.gitHead !== head) {
  deny(
    `Git HEAD changed since the SEO audit (stamp ${String(stamp.gitHead).slice(0, 7)}, current ${head.slice(0, 7)}). Re-run the skill, or rewrite the stamp if this HEAD is the audit's own fixes.`,
    "Deploy blocked: code changed after the SEO audit.",
  );
  process.exit(0);
}

allow();
