import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { BringYourOwnAgentHero } from "@/components/bring-your-own-agent/BringYourOwnAgentHero";
import {
  BringYourOwnAgentEnablesSection,
  BringYourOwnAgentFoundationSection,
  BringYourOwnAgentHowSection,
  BringYourOwnAgentPositioningSection,
  BringYourOwnAgentUsefulSection,
  BringYourOwnAgentWhySection,
} from "@/components/bring-your-own-agent/BringYourOwnAgentSections";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.BRING_YOUR_OWN_AGENT}`;

export const metadata: Metadata = {
  title: "Bring Your Own Agent (BYOA)",
  description:
    "Integrate your own AI agents into QApilot and use the shared knowledge graph for custom validation, domain workflows, and specialized testing—without breaking the core system.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Bring Your Own Agent (BYOA) | QApilot",
    description:
      "Extend QApilot with custom agents that read and write the same knowledge graph context as native agents.",
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bring Your Own Agent (BYOA) | QApilot",
    description:
      "Custom agents on the same knowledge graph as QApilot’s native testing agents.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function BringYourOwnAgentPage() {
  return (
    <div className="relative z-0 min-h-screen w-full bg-background section-edge">
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
      <main>
        <BringYourOwnAgentHero />
        <BringYourOwnAgentWhySection />
        <BringYourOwnAgentFoundationSection />
        <BringYourOwnAgentHowSection />
        <BringYourOwnAgentEnablesSection />
        <BringYourOwnAgentPositioningSection />
        <BringYourOwnAgentUsefulSection />
      </main>
      <Footer />
    </div>
  );
}
