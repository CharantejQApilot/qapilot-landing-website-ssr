import type { EventParticipant } from "@/lib/events-data";
import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  xs: "h-14 w-14 sm:h-16 sm:w-16",
  sm: "h-[4.25rem] w-[4.25rem] sm:h-20 sm:w-20",
  md: "h-20 w-20 sm:h-24 sm:w-24",
  lg: "h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32",
} as const;

const NAME_CLASSES = {
  xs: "text-xs font-semibold leading-snug",
  sm: "text-sm font-semibold leading-snug md:text-base",
  md: "text-sm font-semibold leading-snug md:text-base",
  lg: "text-sm font-semibold leading-snug md:text-base",
} as const;

const ROLE_CLASSES = {
  xs: "text-[10px] font-medium uppercase tracking-[0.12em] leading-snug",
  sm: "text-xs font-medium uppercase tracking-[0.14em] leading-snug",
  md: "text-xs font-medium uppercase tracking-[0.14em] leading-snug",
  lg: "text-xs font-medium uppercase tracking-[0.14em] leading-snug",
} as const;

function ParticipantPortrait({
  participant,
  size,
}: {
  participant: EventParticipant;
  size: keyof typeof SIZE_CLASSES;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border-2 border-primary/30 bg-muted shadow-lg ring-[3px] ring-card",
        SIZE_CLASSES[size],
      )}
    >
      <img
        src={participant.imageUrl}
        alt={`${participant.name}, ${participant.role}`}
        width={256}
        height={256}
        className="h-full w-full object-cover"
        style={{ objectPosition: participant.imagePosition ?? "center" }}
        decoding="async"
      />
    </div>
  );
}

function ParticipantLabel({
  participant,
  size,
  align = "center",
}: {
  participant: EventParticipant;
  size: keyof typeof SIZE_CLASSES;
  align?: "center" | "start";
}) {
  return (
    <div className={cn("min-w-0", align === "center" ? "text-center" : "text-left")}>
      <p className={cn("text-foreground", NAME_CLASSES[size])}>{participant.name}</p>
      <p className={cn("text-muted-foreground", ROLE_CLASSES[size])}>{participant.role}</p>
    </div>
  );
}

export function EventParticipantPortraits({
  participants,
  size = "md",
  overlap = false,
  className,
}: {
  participants: EventParticipant[];
  size?: keyof typeof SIZE_CLASSES;
  overlap?: boolean;
  className?: string;
}) {
  if (overlap) {
    return (
      <div className={cn("flex flex-col", className)} aria-label="Event participants">
        <div className="flex items-end justify-center sm:justify-start">
          {participants.map((participant, index) => (
            <div
              key={participant.name}
              className={cn(index > 0 && "-ml-4 sm:-ml-5")}
              style={{ zIndex: participants.length - index }}
            >
              <ParticipantPortrait participant={participant} size={size} />
            </div>
          ))}
        </div>
        <ul className="mt-3 flex list-none flex-col gap-2.5 sm:mt-4 sm:gap-3">
          {participants.map((participant) => (
            <li key={participant.name} className="min-w-0">
              <ParticipantLabel participant={participant} size={size} align="start" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-center gap-5 sm:justify-start sm:gap-6",
        className,
      )}
      aria-label="Event participants"
    >
      {participants.map((participant) => (
        <div key={participant.name} className="flex min-w-0 max-w-full flex-col items-center text-center">
          <ParticipantPortrait participant={participant} size={size} />
          <div className="mt-2 w-full max-w-[11rem] sm:max-w-none">
            <ParticipantLabel participant={participant} size={size} align="center" />
          </div>
        </div>
      ))}
    </div>
  );
}
