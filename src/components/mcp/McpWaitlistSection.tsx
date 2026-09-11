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
        eyebrow="Walkthrough"
        title={
          <>
            Want a Live Session?{" "}
            <span className="text-primary">Request a Walkthrough.</span>
          </>
        }
        description="Tell us your agent and stack. We'll walk MCP with you on your device."
        marginBottomClassName="mb-8 md:mb-10"
      />

      <div className="flex justify-start">
        <McpJoinWaitlistButton />
      </div>
    </MarketingSection>
  );
}
