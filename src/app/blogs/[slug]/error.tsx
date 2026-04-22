"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, RefreshCcw } from "lucide-react";

/**
 * Per-route error boundary so an unexpected render hiccup on a freshly
 * published blog post degrades gracefully instead of escalating to Next's
 * generic /500 page.
 */
export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("[/blogs/[slug]] render error:", error);
    }
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">
        We couldn&apos;t load this article right now
      </h1>
      <p className="mb-8 max-w-xl text-muted-foreground">
        Something on our side hiccuped while preparing this page. Please retry,
        or head back to all blogs.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <RefreshCcw className="h-4 w-4" />
          Try again
        </button>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-10 text-xs text-muted-foreground/70">
          Reference: {error.digest}
        </p>
      ) : null}
    </main>
  );
}
