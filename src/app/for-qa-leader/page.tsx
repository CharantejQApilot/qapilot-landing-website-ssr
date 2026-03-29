import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { MarketingPageShell } from "@/components/marketing";

export const metadata: Metadata = {
  title: "QApilot for QA Leaders | Scale Testing Strategy",
  description:
    "Lead your QA org with confidence. Get visibility into test coverage, team productivity, and quality metrics across mobile releases.",
};

export default function ForQALeaderPage() {
  return (
    <MarketingPageShell background="hero">
      <main className="section-edge w-full py-24">
        <div className="section-full mx-auto max-w-screen-xl">
          <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground md:text-5xl mb-4">
            QApilot for <span className="text-primary">QA Leaders</span>
          </h1>
          <p className="text-lg text-muted-foreground">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
