import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing";
import { PATHS } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <MarketingPageShell background="hero" contentClassName="contain-layout">
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          We couldn&apos;t find that page. It may have moved or been removed.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href={PATHS.HOME}>Back to home</Link>
        </Button>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
