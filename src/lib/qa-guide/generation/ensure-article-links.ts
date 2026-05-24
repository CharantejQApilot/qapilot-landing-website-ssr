import type { GeneratedArticle } from "@/lib/qa-guide/generation/generate-article";
import { pickExternalLinksForBrief } from "@/lib/qa-guide/generation/external-link-catalog";
import { normalizeLinkPath } from "@/lib/qa-guide/generation/fetch-site-context";

const MIN_INTERNAL = 2;
const MAX_INTERNAL = 3;
const MIN_EXTERNAL = 2;
const MAX_EXTERNAL = 3;

function countInlineLinks(body: string): { qapilot: number; external: number } {
  const re = /\[[^\]]+\]\((https?:\/\/[^)]+)\)/gi;
  let qapilot = 0;
  let external = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    const url = (m[1] ?? "").toLowerCase();
    if (url.includes("qapilot.io")) qapilot += 1;
    else external += 1;
  }
  return { qapilot, external };
}

function urlPresentInBody(body: string, url: string): boolean {
  const norm = url.toLowerCase().replace(/\/$/, "");
  return body.toLowerCase().includes(norm);
}

function pickInternalLinks(
  candidates: string[],
  existing: Array<{ anchor?: string; target_url?: string }>,
): Array<{ anchor: string; target_url: string }> {
  const out: Array<{ anchor: string; target_url: string }> = [];

  for (const s of existing) {
    if (!s.target_url?.trim()) continue;
    out.push({
      anchor: s.anchor?.trim() || "QApilot QA Guide",
      target_url: s.target_url.trim(),
    });
  }

  for (const url of candidates) {
    if (out.length >= MAX_INTERNAL) break;
    if (out.some((l) => normalizeLinkPath(l.target_url) === normalizeLinkPath(url))) continue;
    let anchor = "QApilot resource";
    if (url.includes("/qa-guide/")) anchor = "related QApilot QA Guide";
    else if (url.includes("/product/")) anchor = "QApilot product overview";
    else if (url.includes("/blogs/")) anchor = "QApilot blog";
    out.push({ anchor, target_url: url });
  }

  return out.slice(0, MAX_INTERNAL);
}

function buildLinksSection(
  internal: Array<{ anchor: string; target_url: string }>,
  external: Array<{ anchor: string; target_url: string }>,
): string {
  const lines = [
    "## Mobile testing resources",
    "",
    "Authoritative references for the tools and platforms discussed above:",
    "",
  ];

  for (const link of external) {
    lines.push(`- [${link.anchor}](${link.target_url})`);
  }
  for (const link of internal) {
    lines.push(`- [${link.anchor}](${link.target_url})`);
  }

  return `${lines.join("\n")}\n`;
}

function insertLinksBlock(body: string, block: string): string {
  const h2Re = /^##\s+(.+)$/gm;
  const matches: Array<{ index: number; title: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = h2Re.exec(body)) !== null) {
    matches.push({ index: m.index, title: (m[1] ?? "").toLowerCase() });
  }

  const closingIdx = [...matches]
    .reverse()
    .find((h) => h.title.includes("qapilot"))?.index;

  if (closingIdx !== undefined && closingIdx > 0) {
    return `${body.slice(0, closingIdx).trimEnd()}\n\n${block}\n\n${body.slice(closingIdx).trimStart()}`;
  }

  return `${body.trimEnd()}\n\n${block}`;
}

/**
 * Guarantees 2–3 internal and 2–3 external markdown links in content_markdown.
 */
export function ensureArticleLinks(
  article: GeneratedArticle,
  params: {
    topic_cluster: string;
    primary_keyword: string;
    intent: string;
    internal_link_candidates: string[];
  },
): GeneratedArticle {
  let body = article.content_markdown ?? "";

  let externalSuggestions = (article.external_link_suggestions ?? [])
    .filter((s) => s.target_url?.trim())
    .map((s) => ({
      anchor: s.anchor?.trim() || "External resource",
      target_url: s.target_url!.trim(),
    }));

  if (externalSuggestions.length < MIN_EXTERNAL) {
    const picked = pickExternalLinksForBrief(
      params.topic_cluster,
      params.primary_keyword,
      params.intent,
    );
    for (const p of picked) {
      if (externalSuggestions.length >= MAX_EXTERNAL) break;
      if (!externalSuggestions.some((e) => e.target_url === p.target_url)) {
        externalSuggestions.push(p);
      }
    }
  }
  externalSuggestions = externalSuggestions.slice(0, MAX_EXTERNAL);

  const internalSuggestions = pickInternalLinks(
    params.internal_link_candidates,
    article.internal_link_suggestions ?? [],
  );

  const missingExternal = externalSuggestions.filter(
    (s) => !urlPresentInBody(body, s.target_url),
  );
  const missingInternal = internalSuggestions.filter(
    (s) => !urlPresentInBody(body, s.target_url),
  );

  const counts = countInlineLinks(body);
  const externalNeeded = Math.max(0, MIN_EXTERNAL - counts.external);
  const externalCap = Math.max(0, MAX_EXTERNAL - counts.external);
  const externalToAdd = missingExternal.slice(
    0,
    Math.min(externalNeeded, externalCap, missingExternal.length),
  );
  const internalNeeded = Math.max(0, MIN_INTERNAL - counts.qapilot);
  const internalCap = Math.max(0, MAX_INTERNAL - counts.qapilot);
  const internalToAdd = missingInternal.slice(
    0,
    Math.min(internalNeeded, internalCap, missingInternal.length),
  );

  if (externalToAdd.length > 0 || internalToAdd.length > 0) {
    if (!body.toLowerCase().includes("## mobile testing resources")) {
      const block = buildLinksSection(internalToAdd, externalToAdd);
      body = insertLinksBlock(body, block);
    } else {
      const bullets = [...externalToAdd, ...internalToAdd]
        .map((l) => `- [${l.anchor}](${l.target_url})`)
        .join("\n");
      body = insertLinksBlock(body, `${bullets}\n`);
    }
  }

  return {
    ...article,
    content_markdown: body,
    internal_link_suggestions: internalSuggestions,
    external_link_suggestions: externalSuggestions,
  };
}
