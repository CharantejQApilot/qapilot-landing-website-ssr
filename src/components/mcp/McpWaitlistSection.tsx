import { MarketingSection } from "@/components/marketing/MarketingSection";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { McpJoinWaitlistButton } from "@/components/mcp/McpJoinWaitlistButton";

export function McpWaitlistSection() {
  return (
    <MarketingSection
      surface="ice"
      aria-labelledby="mcp-waitlist-heading"
    >
      <MarketingSectionHeader
        id="mcp-waitlist-heading"
        eyebrow="Early access"
        title={
          <>
            Get In Early. <span className="text-primary">Help Shape It.</span>
          </>
        }
        description="Tell us your agent, stack, and team size so we can prioritize your workflow."
        marginBottomClassName="mb-8 md:mb-10"
      />

      <div className="flex justify-start">
        <McpJoinWaitlistButton />
      </div>
    </MarketingSection>
  );
}
