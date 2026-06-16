import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing";
import { PATHS } from "@/lib/routes";

/**
 * Segment-level not-found UI for `/news/[slug]`. Having this colocated with
 * `page.tsx` ensures `notFound()` resolves into a clean 404 here instead of
 * bubbling past the sibling `error.tsx` boundary — which is what was making
 * unknown news slugs (typos, drafts, deleted posts, slugs LinkedIn crawled
 * before publish) escalate to /500 on Vercel.
 */
export const metadata: Metadata = {
  title: "News update not found",
  description: "We couldn't find that QApilot news update.",
  robots: { index: false, follow: false },
};

export default function NewsPostNotFound() {
  return (
    <MarketingPageShell background="hero" contentClassName="contain-layout">
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
          We couldn&apos;t find that update
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The news item you&apos;re looking for may have moved, been unpublished,
          or never existed. Browse the latest QApilot updates instead.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href={PATHS.NEWS}>Back to news</Link>
        </Button>
      </main>
    </MarketingPageShell>
  );
}
