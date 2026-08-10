import type { ReactNode } from "react";
import { IntelligentBugCategoriesSection } from "@/components/intelligent-bug-detection/IntelligentBugCategoriesSection";
import { IntelligentBugIssueDetailSection } from "@/components/intelligent-bug-detection/IntelligentBugIssueDetailSection";
import { IntelligentBugScreenMappingSection } from "@/components/intelligent-bug-detection/IntelligentBugScreenMappingSection";
import {
 AiSelfHealingApprovalSection,
 AiSelfHealingExecutionSection,
 AiSelfHealingHealingEngineSection,
 AiSelfHealingReportSection,
} from "@/components/ai-self-healing";
import {
 SecurityReportsAnalyzeGridSection,
 SecurityReportsIssueDeepDiveSection,
 SecurityReportsOverviewSection,
} from "@/components/security-reports";
import { DeviceMetricsSection } from "@/components/release-readiness-suite/DeviceMetricsSection";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

function PillarShell({
 id,
 titleId,
 title,
 description,
 children,
}: {
 id: string;
 titleId: string;
 title: ReactNode;
 description: string;
 children: ReactNode;
}) {
 return (
 <div id={id} className="scroll-mt-24">
 <div className="section-edge relative w-full border-t border-border/60 bg-background">
 <div className="section-full relative z-10 pt-14 md:pt-20 2xl:pt-24">
 <MarketingSectionHeader
 id={titleId}
 eyebrow="Release Readiness Suite"
 title={title}
 description={description}
 marginBottomClassName="mb-0"
 />
 </div>
 </div>
 {children}
 </div>
 );
}

/** Suite content pillars. Deep-linked from the hero. */
export function ReleaseReadinessSuitePillars() {
 return (
 <>
 <PillarShell
 id="intelligent-bug-detection"
 titleId="rrs-bug-detection-heading"
 title={
 <>
 Intelligent <span className="text-primary">Bug Detection</span>
 </>
 }
 description="Go beyond pass or fail. Surface accessibility, latency, and load issues mapped to the exact screen and context."
 >
 <IntelligentBugCategoriesSection />
 <IntelligentBugScreenMappingSection />
 <IntelligentBugIssueDetailSection />
 </PillarShell>

 <PillarShell
 id="security-reports"
 titleId="rrs-security-reports-heading"
 title={
 <>
 Security <span className="text-primary">Reports</span>
 </>
 }
 description="Risk awareness that ships with your build. Clear scores, categories, and actionable findings before release."
 >
 <SecurityReportsOverviewSection />
 <SecurityReportsAnalyzeGridSection />
 <SecurityReportsIssueDeepDiveSection />
 </PillarShell>

 <PillarShell
 id="ai-self-healing"
 titleId="rrs-ai-self-healing-heading"
 title={
 <>
 AI <span className="text-primary">Self Healing</span>
 </>
 }
 description="Tests that adapt to UI change. Heal in real time, report what changed, and stay under your control."
 >
 <AiSelfHealingHealingEngineSection />
 <AiSelfHealingExecutionSection />
 <AiSelfHealingReportSection />
 <AiSelfHealingApprovalSection />
 </PillarShell>

 <PillarShell
 id="device-metrics"
 titleId="rrs-device-metrics-heading"
 title={
 <>
 Device <span className="text-primary">Metrics</span>
 </>
 }
 description="Operational signals. CPU, memory, battery, and network. captured with the same release evidence as functional results."
 >
 <DeviceMetricsSection />
 </PillarShell>
 </>
 );
}
