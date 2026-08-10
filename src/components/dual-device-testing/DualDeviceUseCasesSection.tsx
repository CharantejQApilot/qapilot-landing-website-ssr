import { MessageSquare, Store, UsersRound } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const USE_CASES = [
  {
    title: "Marketplace Apps",
    industry: "Commerce · Delivery · Gig",
    line: "A buyer orders on one device; a seller or rider fulfils it on another.",
    detail:
      "Order → accept → dispatch → delivery confirmation is one business transaction. Dual-device testing proves the handoff, not just each screen in isolation.",
    Icon: Store,
  },
  {
    title: "Messaging Apps",
    industry: "Social · Collaboration · Chat",
    line: "A message sent on one device must deliver and sync on the recipient’s.",
    detail:
      "Send, receive, read receipts, and sync across accounts are where real users feel quality. Automate both ends of the conversation as a single run.",
    Icon: MessageSquare,
  },
  {
    title: "Field Force Apps",
    industry: "Enterprise · Ops · Approvals",
    line: "A field agent works on-site while a supervisor approves from another device.",
    detail:
      "Assign, escalate, and approve across roles is how enterprises ship work. Catch timing and state bugs before they hit the field.",
    Icon: UsersRound,
  },
] as const;

/** Industry-first use cases where dual-device testing creates value. */
export function DualDeviceUseCasesSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/10 via-background to-background"
      aria-labelledby="ddt-usecases-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ddt-usecases-heading"
          eyebrow="Industry relevance"
          title={
            <>
              Where Dual-Device Testing <span className="text-primary">Creates Value</span>
            </>
          }
          description="Real business journeys where one mobile action depends on another user, role, account, or device: the flows that break in production yet rarely get automated."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={3} aria-label="Dual device testing use cases by industry">
          {USE_CASES.map(({ title, industry, line, detail, Icon }) => (
            <MarketingLedgerCell key={title} as="article">
              <div className="flex h-full flex-col p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
                      {industry}
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-semibold tracking-tight text-foreground">
                      {title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-base font-medium leading-snug text-foreground md:text-lg">{line}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{detail}</p>
              </div>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>

        <p className="mx-auto mt-10 max-w-3xl text-center text-base font-medium text-foreground md:text-lg">
          The pattern, everywhere: one device acts, another responds. QApilot keeps the two in lockstep.
        </p>
      </div>
    </section>
  );
}
