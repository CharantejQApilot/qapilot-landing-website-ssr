import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing";
import { PATHS } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Event not found",
  description: "We couldn't find that QApilot event.",
  robots: { index: false, follow: false },
};

export default function EventNotFound() {
  return (
    <MarketingPageShell background="hero" contentClassName="contain-layout">
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
          We couldn&apos;t find that event
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The event you&apos;re looking for may have moved or never existed. Browse
          upcoming and past QApilot events instead.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href={PATHS.EVENTS}>Back to events</Link>
        </Button>
      </main>
    </MarketingPageShell>
  );
}
