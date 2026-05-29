import { cn } from "@/lib/utils";

/** OpenAI mark (Simple Icons v9 path, MIT) — `cdn.simpleicons.org/openai` no longer serves this slug. */
function OpenAIFooterIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      />
    </svg>
  );
}

/** Shared prompt for “open in this assistant” deep links (URL-encoded per provider). */
export const SUMMARISE_QAPILOT_PROMPT =
  "Summarize QApilot in simple terms. Explain what QApilot does, what makes it different for mobile app testing, who it is best suited for, and why teams might choose it over traditional testing tools.";

const encodedPrompt = encodeURIComponent(SUMMARISE_QAPILOT_PROMPT);

/** Google Search AI Mode: `q` + `udm=50` prefills the query (gemini.google.com URL params are unreliable). */
const googleAiSearchSummariseHref = `https://www.google.com/search?${new URLSearchParams({
  q: SUMMARISE_QAPILOT_PROMPT,
  udm: "50",
}).toString()}`;

type Assistant = {
  id: "chatgpt" | "perplexity" | "google-ai" | "claude";
  label: string;
  /** Short label for visible text under the logo */
  shortName: string;
  href: string;
  /** Simple Icons CDN (MIT); omit when using inline SVG */
  iconSrc?: string;
};

const assistants: Assistant[] = [
  {
    id: "chatgpt",
    label: "Open this prompt in ChatGPT",
    shortName: "ChatGPT",
    href: `https://chatgpt.com/?q=${encodedPrompt}`,
  },
  {
    id: "perplexity",
    label: "Open this prompt in Perplexity",
    shortName: "Perplexity",
    href: `https://www.perplexity.ai/search?q=${encodedPrompt}`,
    iconSrc: "https://cdn.simpleicons.org/perplexity/ffffff",
  },
  {
    id: "google-ai",
    label: "Open this prompt in Google AI Mode (Search)",
    shortName: "Google AI",
    href: googleAiSearchSummariseHref,
    iconSrc: "https://cdn.simpleicons.org/google/ffffff",
  },
  {
    id: "claude",
    label: "Open this prompt in Claude",
    shortName: "Claude",
    href: `https://claude.ai/new?q=${encodedPrompt}`,
    iconSrc: "https://cdn.simpleicons.org/anthropic/ffffff",
  },
];

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
                  <OpenAIFooterIcon className="h-[22px] w-[22px] opacity-95 group-hover:opacity-100" />
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
