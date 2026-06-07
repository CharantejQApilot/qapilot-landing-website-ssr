import { cn } from "@/lib/utils";
import {
  SUMMARISE_QAPILOT_SITE_PROMPT,
  buildSummariseAssistantLinks,
} from "@/lib/summarise-with-ai";
import { OpenAIIcon } from "@/components/summarise-with-ai/OpenAIIcon";

const assistants = buildSummariseAssistantLinks(SUMMARISE_QAPILOT_SITE_PROMPT, {
  iconTone: "on-dark",
});

export function FooterSummariseWithAI() {
  return (
    <div className="mb-12 w-full border-t border-white/[0.08] pt-10">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Summarise With AI</h3>
      <ul className="flex flex-wrap items-stretch gap-3 sm:gap-4">
        {assistants.map((a) => (
          <li key={a.id}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={a.label}
              className={cn(
                "group flex h-[52px] items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 transition-colors",
                "hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] ring-1 ring-white/10 text-white">
                {a.id === "chatgpt" ? (
                  <OpenAIIcon className="h-[22px] w-[22px] opacity-95 group-hover:opacity-100" />
                ) : (
                  <img
                    src={a.iconSrc}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] opacity-95 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </span>
              <span className="text-sm font-medium text-white/70 group-hover:text-white">{a.shortName}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
