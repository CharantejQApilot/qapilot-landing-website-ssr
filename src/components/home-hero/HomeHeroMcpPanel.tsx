import HomeHeroProductHuntBadge from "@/components/home-hero/HomeHeroProductHuntBadge";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { PRODUCT_HUNT_MCP_TOP_POST_BADGE } from "@/lib/product-hunt-badge";
import { cn } from "@/lib/utils";

/**
 * Home hero slide 2. Copy sits where slide 1's headline sits.
 * On xl the terminal is positioned against the hero content box (see HomeHeroContent),
 * so it spans from the title down to the CTAs. Hidden below xl.
 */
export default function HomeHeroMcpPanel() {
  return (
    <div className="h-full w-full min-w-0">
      <p
        className={cn(
          marketingHeroH1Class,
          "mb-0 text-left md:whitespace-nowrap",
          "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
        )}
      >
        <span className="px-1">
          QApilot <span className="text-hero-here">MCP</span>
        </span>
      </p>
      <p className="mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mt-6 lg:text-xl lg:leading-[1.6] min-[1360px]:text-[1.375rem] min-[1360px]:leading-normal xl:max-w-[min(36rem,calc(54%-2.5rem))]">
        Automate real Android devices and emulators by talking to Claude,
        Cursor, or any MCP-compatible AI client. Describe test flows in plain
        English&nbsp;— no Appium code required. The app stays on your machine.
      </p>
      <HomeHeroProductHuntBadge
        align="start"
        className="mt-6 px-1 md:hidden"
        badge={PRODUCT_HUNT_MCP_TOP_POST_BADGE}
      />

      <div className="absolute inset-y-0 right-0 hidden w-[min(46%,44rem)] items-center xl:flex">
        <div className="mcp-terminal-float relative w-full">
          <div
            className="mcp-terminal-glow pointer-events-none absolute -inset-6 rounded-[2rem] bg-[hsl(205_85%_55%/0.35)] blur-3xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-24px_hsl(215_60%_20%/0.6)] ring-1 ring-[hsl(205_78%_52%/0.35)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted hero visual */}
            <img
              src="/home-hero/qapilot-mcp-terminal.png"
              alt="QApilot MCP terminal running a checkout test, with the device showing payment confirmed"
              width={1024}
              height={577}
              className="block h-auto w-full"
            />
            <div
              className="mcp-terminal-scan pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-[hsl(205_90%_70%/0.12)] to-transparent"
              aria-hidden
            />
          </div>
          <HomeHeroProductHuntBadge
            align="end"
            className="absolute -top-6 right-6 w-auto drop-shadow-md"
            badge={PRODUCT_HUNT_MCP_TOP_POST_BADGE}
          />
        </div>
      </div>
    </div>
  );
}
