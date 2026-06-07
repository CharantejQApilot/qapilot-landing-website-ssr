import { cn } from "@/lib/utils";
import {
  buildArticleSummarisePrompt,
  buildSummariseAssistantLinks,
} from "@/lib/summarise-with-ai";
import { OpenAIIcon } from "@/components/summarise-with-ai/OpenAIIcon";

type ArticleSummariseWithAIProps = {
  pageUrl: string;
  className?: string;
};

export function ArticleSummariseWithAI({ pageUrl, className }: ArticleSummariseWithAIProps) {
  const assistants = buildSummariseAssistantLinks(buildArticleSummarisePrompt(pageUrl));

  return (
    <div className={cn("mb-6", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
        Summarise with AI
      </p>
      <ul className="flex flex-wrap items-stretch gap-2 sm:gap-3">
        {assistants.map((assistant) => (
          <li key={assistant.id}>
            <a
              href={assistant.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={assistant.label}
              className={cn(
                "group flex h-10 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 transition-colors sm:h-11 sm:gap-2.5 sm:px-3.5",
                "hover:border-primary/25 hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-border text-foreground sm:h-8 sm:w-8">
                {assistant.id === "chatgpt" ? (
                  <OpenAIIcon className="h-[18px] w-[18px] opacity-90 group-hover:opacity-100" />
                ) : (
                  <img
                    src={assistant.iconSrc}
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] opacity-90 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </span>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                {assistant.shortName}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
