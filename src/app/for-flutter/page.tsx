import type { Metadata } from "next";
import ForFlutterClient from "./ForFlutterClient";
import { MarketingPageShell } from "@/components/marketing";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Flutter App Testing - AI-Native Testing Platform",
  description:
    "The best AI-native platform for Flutter app testing. Instant sanity checks and scalable functional coverage engineered for Flutter's unique needs. Zero setup, script-free testing.",
};

export default function ForFlutterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Flutter Testing", path: PATHS.FOR_FLUTTER },
            ])
          )
        }}
      />
      <MarketingPageShell background="hero" contentClassName="contain-layout">
        <ForFlutterClient />
      </MarketingPageShell>
    </>
  );
}
