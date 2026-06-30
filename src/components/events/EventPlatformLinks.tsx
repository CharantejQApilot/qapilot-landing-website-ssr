import type { EventPlatformLink } from "@/lib/events-data";
import { cn } from "@/lib/utils";

type EventPlatformLinksProps = {
  links: EventPlatformLink[];
  className?: string;
};

function platformIconUrl(link: EventPlatformLink): string | null {
  if (!link.iconSlug) return null;
  const color = link.iconColor ?? "currentColor";
  return `https://cdn.simpleicons.org/${link.iconSlug}/${color}`;
}

export function EventPlatformLinks({ links, className }: EventPlatformLinksProps) {
  const withLogos = links.every((link) => link.iconSlug);

  if (withLogos) {
    return (
      <ul className={cn("flex flex-wrap gap-3 sm:gap-4", className)}>
        {links.map((link) => {
          const iconUrl = platformIconUrl(link);
          return (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex min-w-[10.5rem] items-center gap-3 rounded-xl border border-border bg-card",
                  "px-4 py-3.5 text-sm font-semibold text-foreground shadow-sm",
                  "transition-colors hover:border-primary/35 hover:bg-primary/[0.04] hover:text-primary",
                )}
              >
                {iconUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Simple Icons CDN brand marks
                  <img
                    src={iconUrl}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 shrink-0"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <span>{link.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => {
        const chipClass =
          "rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-primary/[0.06] hover:text-primary";

        return (
          <li key={link.name}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={chipClass}>
              {link.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function hasLogoPlatformLinks(links: EventPlatformLink[] | undefined): links is EventPlatformLink[] {
  return Boolean(links?.length && links.every((link) => link.iconSlug));
}
