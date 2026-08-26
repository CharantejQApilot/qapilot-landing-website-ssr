import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { McpJoinWaitlistButton } from "@/components/mcp/McpJoinWaitlistButton";

export function McpWaitlistSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-dot-pattern-subtle"
      aria-labelledby="mcp-waitlist-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
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

        <div className="flex justify-center">
          <McpJoinWaitlistButton />
        </div>
      </div>
    </section>
  );
}
