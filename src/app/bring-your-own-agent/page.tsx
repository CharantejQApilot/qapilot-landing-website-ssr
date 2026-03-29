import type { Metadata } from "next";
import BringYourOwnAgentClient from "./BringYourOwnAgentClient";
import { MarketingPageShell, HashScrollOnMount } from "@/components/marketing";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Differentiators - What Makes QApilot Different",
  description:
    "Discover what sets QApilot apart: AI-native architecture, Bring Your Own Agent (BYOA) extensibility, and intelligent mobile app testing automation.",
};

export default function BringYourOwnAgentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Differentiators", path: PATHS.BRING_YOUR_OWN_AGENT },
            ])
          )
        }}
      />
      <MarketingPageShell background="hero">
        <HashScrollOnMount />
        <BringYourOwnAgentClient />
      </MarketingPageShell>
    </>
  );
}
