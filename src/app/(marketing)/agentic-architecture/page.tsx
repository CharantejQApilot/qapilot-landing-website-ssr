import type { Metadata } from "next";
import { AgenticArchitectureAgentLayerSection } from "@/components/agentic-architecture/AgenticArchitectureAgentLayerSection";
import { AgenticArchitectureContextMattersSection } from "@/components/agentic-architecture/AgenticArchitectureContextMattersSection";
import { AgenticArchitectureHero } from "@/components/agentic-architecture/AgenticArchitectureHero";
import { AgenticArchitectureKnowledgeGraphSection } from "@/components/agentic-architecture/AgenticArchitectureKnowledgeGraphSection";
import { AgenticArchitectureSystemOverviewSection } from "@/components/agentic-architecture/AgenticArchitectureSystemOverviewSection";
import { AgenticArchitectureWhyMattersSection } from "@/components/agentic-architecture/AgenticArchitectureWhyMattersSection";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.AGENTIC_ARCHITECTURE}`;

const PAGE_TITLE = formatPageTitle("Agentic Architecture — AI Agents & Knowledge Graph");
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "How QApilot combines specialized agents, a shared knowledge graph, and continuous learning for autonomous mobile testing — context, exploration, and outcomes in one system.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: PAGE_TITLE_TEXT,
    description:
      "Specialized agents, shared context, and the knowledge graph as the foundation — from exploration to coverage and release readiness.",
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot's Agentic Architecture | QApilot",
    description:
      "Agents, knowledge graph, and continuous learning for autonomous mobile testing.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

const breadcrumbList = buildBreadcrumbList([
  { name: "Home", path: PATHS.HOME },
  { name: "Platform overview", path: PATHS.PRODUCT },
  { name: "QApilot's Agentic Architecture", path: PATHS.AGENTIC_ARCHITECTURE },
]);

export default function AgenticArchitecturePage() {
  return (
    <div className="relative z-0 min-h-screen w-full bg-background section-edge">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <main>
        <AgenticArchitectureHero />
        <AgenticArchitectureWhyMattersSection />
        <AgenticArchitectureSystemOverviewSection />
        <AgenticArchitectureKnowledgeGraphSection />
        <AgenticArchitectureContextMattersSection />
        <AgenticArchitectureAgentLayerSection />
      </main>
    </div>
  );
}
