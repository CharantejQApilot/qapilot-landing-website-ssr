import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "QApilot for QA Engineers | Smarter Mobile Testing",
  description:
    "Empower your QA workflow with AI-driven mobile app testing. Write fewer scripts, find more bugs, and ship quality apps faster.",
};

export default function ForQAEngineerPage() {
  return (
    <>
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            QApilot for <span className="text-primary">QA Engineers</span>
          </h1>
          <p className="text-lg text-muted-foreground">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
