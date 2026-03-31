import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { MarketingPageShell } from "@/components/marketing";
import { Button } from "@/components/ui/button";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bring Your Own Agent (BYOA) | QApilot",
  description:
    "Extend QApilot with your own agents. Full BYOA documentation and flows are coming soon.",
};

export const revalidate = 300;

export default function BringYourOwnAgentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Bring Your Own Agent", path: PATHS.BRING_YOUR_OWN_AGENT },
            ]),
          ),
        }}
      />
      <MarketingPageShell background="soft">
        <main className="section-edge w-full py-24 md:py-28">
          <div className="section-full mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary/90">Platform</p>
            <h1 className={cn(marketingHeroH1Class)}>
              Bring Your Own <span className="text-primary">Agent</span>
            </h1>
            <p className="mx-auto mt-6 text-lg leading-relaxed text-muted-foreground">
              Plug your own agents into QApilot&apos;s framework. This page is being rebuilt—see how agents fit
              the architecture today.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="rounded-xl px-8 font-semibold" asChild>
                <Link href={PATHS.AGENTIC_ARCHITECTURE}>QApilot&apos;s Agentic Architecture</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl border-primary/30 px-8 font-semibold" asChild>
                <Link href={PATHS.PRODUCT}>Platform overview</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </MarketingPageShell>
    </>
  );
}
