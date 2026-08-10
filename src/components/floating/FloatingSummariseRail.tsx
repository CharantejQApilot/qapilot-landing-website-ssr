import {
  SUMMARISE_QAPILOT_SITE_PROMPT,
  buildSummariseAssistantLinks,
} from "@/lib/summarise-with-ai";
import { cn } from "@/lib/utils";
import { OpenAIIcon } from "@/components/summarise-with-ai/OpenAIIcon";
import { floatingRailButtonClass, floatingRailShellLeftClass } from "@/components/floating/floating-rail-styles";

const assistants = buildSummariseAssistantLinks(SUMMARISE_QAPILOT_SITE_PROMPT, {
  iconTone: "on-dark",
});

export function FloatingSummariseRail() {
  return (
    <nav
      aria-label="Summarise QApilot with AI"
      className={cn(floatingRailShellLeftClass, "top-40 hidden md:top-36 lg:flex")}
    >
      {assistants.map((assistant) => (
        <a
          key={assistant.id}
          href={assistant.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={assistant.label}
          className={floatingRailButtonClass}
        >
          {assistant.id === "chatgpt" ? (
            <OpenAIIcon className="h-[18px] w-[18px] opacity-90 text-white" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- brand mark via Simple Icons CDN
            <img
              src={assistant.iconSrc}
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px] shrink-0 opacity-90"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
      ))}
    </nav>
  );
}
