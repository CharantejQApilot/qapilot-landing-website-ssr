import { BrainCircuit } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing";
import { cn } from "@/lib/utils";

const labsTeam = [
  { name: "Muhammed Nihad U", linkedin: "https://www.linkedin.com/in/muhammed-nihad-u-813357212/" },
  { name: "Vidushee Geetam", linkedin: "https://www.linkedin.com/in/vidushee-geetam/" },
  { name: "Aakash B", linkedin: "https://www.linkedin.com/in/aak024/" },
];

const LabsTeamSection = () => {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
      aria-labelledby="labs-team-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="labs-team-heading"
          title={
            <>
              Meet The Team Behind <span className="text-primary">Labs</span>
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <ul className="mx-auto flex max-w-2xl flex-wrap justify-center gap-5 sm:gap-6 md:max-w-none md:gap-8">
          {labsTeam.map((member) => (
            <li key={member.linkedin}>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex w-[168px] flex-col items-center rounded-2xl border border-border/80 bg-card/80 p-6 text-center shadow-sm backdrop-blur-sm transition-colors sm:w-[188px]",
                  "motion-safe:hover:border-primary/30 motion-safe:hover:shadow-md",
                )}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border/80 bg-muted/30 transition-colors group-hover:border-primary/40 md:h-20 md:w-20">
                  <BrainCircuit className="h-8 w-8 text-primary md:h-10 md:w-10" strokeWidth={1.35} aria-hidden />
                </div>
                <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary md:text-base">
                  {member.name}
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LabsTeamSection;
