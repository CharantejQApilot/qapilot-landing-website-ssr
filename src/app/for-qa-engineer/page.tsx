import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { MarketingPageShell } from "@/components/marketing";

export const metadata: Metadata = {
  title: "QApilot for QA Engineers | Smarter Mobile Testing",
  description:
    "Empower your QA workflow with AI-driven mobile app testing. Write fewer scripts, find more bugs, and ship quality apps faster.",
};

export default function ForQAEngineerPage() {
  return (
    <MarketingPageShell background="hero">
      <main className="section-edge w-full py-24">
        <div className="section-full mx-auto max-w-screen-xl">
          <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground md:text-5xl mb-4">
            QApilot for <span className="text-primary">QA Engineers</span>
          </h1>
          <p className="text-lg text-muted-foreground">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
