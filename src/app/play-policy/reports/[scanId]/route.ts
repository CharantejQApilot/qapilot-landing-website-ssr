import { NextResponse } from "next/server";
import { PATHS } from "@/lib/routes";
import { fetchPlayPolicyReportHtml } from "@/lib/play-policy-report";

export const dynamic = "force-dynamic";

const SHARED_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

type ErrorKind = "not_found" | "expired" | "error";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function errorDocument(kind: ErrorKind): { status: number; html: string } {
  const checkerHref = PATHS.PLAY_POLICY_CHECKER;
  const copy: Record<
    ErrorKind,
    { status: number; title: string; message: string }
  > = {
    not_found: {
      status: 404,
      title: "Report not found",
      message:
        "This report was not found or is not ready yet. Check your email for the link, or try again shortly.",
    },
    expired: {
      status: 410,
      title: "Report expired",
      message: "This report link has expired.",
    },
    error: {
      status: 503,
      title: "Report unavailable",
      message:
        "We couldn’t load this report right now. Please try again in a few minutes.",
    },
  };

  const { status, title, message } = copy[kind];
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);
  const safeHref = escapeHtml(checkerHref);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${safeTitle} | QApilot</title>
  <style>
    :root { color-scheme: light; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      background: #f8f7f5;
      color: #1a1a1a;
      padding: 24px;
    }
    main {
      max-width: 28rem;
      text-align: center;
    }
    .brand {
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #525252;
      margin: 0 0 1.25rem;
    }
    h1 {
      font-size: 1.5rem;
      line-height: 1.25;
      font-weight: 600;
      margin: 0 0 0.75rem;
    }
    p {
      margin: 0 0 1.5rem;
      line-height: 1.55;
      color: #404040;
    }
    a {
      display: inline-block;
      padding: 0.625rem 1rem;
      border-radius: 0.375rem;
      background: #1a1a1a;
      color: #fff;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
    }
    a:hover { background: #333; }
  </style>
</head>
<body>
  <main>
    <p class="brand">QApilot</p>
    <h1>${safeTitle}</h1>
    <p>${safeMessage}</p>
    <a href="${safeHref}">Play Policy Checker</a>
  </main>
</body>
</html>`;

  return { status, html };
}

function htmlResponse(body: string, status: number, contentType?: string) {
  return new NextResponse(body, {
    status,
    headers: {
      ...SHARED_HEADERS,
      "Content-Type": contentType ?? "text/html; charset=utf-8",
    },
  });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ scanId: string }> },
) {
  const { scanId } = await context.params;
  const result = await fetchPlayPolicyReportHtml(scanId);

  if (result.kind === "html") {
    return htmlResponse(result.body, 200, result.contentType);
  }

  const { status, html } = errorDocument(result.kind);
  return htmlResponse(html, status);
}
