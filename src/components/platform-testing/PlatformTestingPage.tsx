import { PlatformTestingFlowSection } from "@/components/platform-testing/PlatformTestingFlowSection";
import { PlatformTestingHero } from "@/components/platform-testing/PlatformTestingHero";
import { PlatformTestingOutcomesSection } from "@/components/platform-testing/PlatformTestingOutcomesSection";
import { PlatformTestingProblemSection } from "@/components/platform-testing/PlatformTestingProblemSection";
import { PlatformTestingSolutionSection } from "@/components/platform-testing/PlatformTestingSolutionSection";
import { PlatformTestingVideoSection } from "@/components/platform-testing/PlatformTestingVideoSection";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import type { PlatformTestingContent } from "@/lib/platform-testing";
import { PATHS } from "@/lib/routes";

export function PlatformTestingPage({ content }: { content: PlatformTestingContent }) {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: content.breadcrumbName, path: content.path },
            ]),
          ),
        }}
      />
      <main>
        <PlatformTestingHero content={content} />
        <PlatformTestingProblemSection content={content} />
        <PlatformTestingSolutionSection content={content} />
        <PlatformTestingFlowSection content={content} />
        <PlatformTestingVideoSection content={content} />
        <PlatformTestingOutcomesSection content={content} />
      </main>
    </div>
  );
}
