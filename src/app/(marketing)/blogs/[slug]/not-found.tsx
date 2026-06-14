import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing";
import { PATHS } from "@/lib/routes";

/**
 * Segment-level not-found UI for `/blogs/[slug]`. Having this colocated with
 * `page.tsx` ensures `notFound()` resolves into a clean 404 here instead of
 * bubbling past the sibling `error.tsx` boundary — which is what was making
 * unknown blog slugs escalate to /500 on Vercel and poison social previews.
 */
export const metadata: Metadata = {
  title: "Blog post not found",
  description: "We couldn't find that QApilot blog post.",
  robots: { index: false, follow: false },
};

export default function BlogPostNotFound() {
  return (
    <MarketingPageShell background="hero" contentClassName="contain-layout">
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
          We couldn&apos;t find that article
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The blog post you&apos;re looking for may have moved, been unpublished,
          or never existed. Browse the latest QApilot writing instead.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href={PATHS.BLOGS}>Back to blogs</Link>
        </Button>
      </main>
    </MarketingPageShell>
  );
}
