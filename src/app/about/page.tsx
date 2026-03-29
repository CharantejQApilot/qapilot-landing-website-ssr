import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { MarketingPageShell } from "@/components/marketing";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "About QApilot - AI-Native Mobile App Testing Company",
  description:
    "QApilot exists to make mobile testing effortless, scalable, and future-ready for every team, from startups to global enterprises. Learn about our mission and vision.",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "About", path: PATHS.ABOUT },
            ])
          )
        }}
      />
      <MarketingPageShell background="hero" contentClassName="contain-layout">
        <AboutClient />
      </MarketingPageShell>
    </>
  );
}
