import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing";
import { PATHS } from "@/lib/routes";

/**
 * Segment-level not-found UI for `/careers/[slug]`. Colocated so `notFound()`
 * resolves into a clean 404 here instead of bubbling up and escalating to
 * Next's generic /500 on Vercel — same fix we applied to /news, /blogs, and /careers.
 */
export const metadata: Metadata = {
  title: "Job opening not found",
  description: "We couldn't find that QApilot job opening.",
  robots: { index: false, follow: false },
};

export default function CareerNotFound() {
  return (
    <MarketingPageShell background="hero" contentClassName="contain-layout">
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
          We couldn&apos;t find that opening
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The job posting you&apos;re looking for may have been filled, closed,
          or never existed. Browse our open roles instead.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href={PATHS.CAREERS}>Back to careers</Link>
        </Button>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
