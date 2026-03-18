import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "QApilot for Product Owners | Ship Quality Features Faster",
  description:
    "Make informed release decisions with real-time quality insights. Ensure every feature meets user expectations before it ships.",
};

export default function ForProductOwnerPage() {
  return (
    <>
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            QApilot for <span className="text-primary">Product Owners</span>
          </h1>
          <p className="text-lg text-muted-foreground">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
