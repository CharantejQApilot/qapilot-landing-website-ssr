"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const ARCADE_EMBED_SRC =
  "https://demo.arcade.software/JxLpXPUuOXd4ad9mwlC9?embed&embed_mobile=tab&embed_desktop=inline&squared=true&show_copy_link=true";

const EMBED_WRAPPER_STYLE = {
  paddingBottom: "calc(57.8889% + 41px)",
  height: 0,
  width: "100%",
} as const;

function ArcadeIframe() {
  return (
    <div className="relative w-full" style={EMBED_WRAPPER_STYLE}>
      <iframe
        src={ARCADE_EMBED_SRC}
        title="QApilot interactive demo"
        className="absolute left-0 top-0 h-full w-full"
        frameBorder={0}
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        style={{ colorScheme: "light" }}
      />
    </div>
  );
}

/**
 * Mobile: facade until user taps (saves ~4s of third-party work on first load).
 * Desktop: embed loads immediately — no content removed.
 */
export default function ProductShowcaseEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);
    if (!mobile) {
      setLoaded(true);
    }
  }, []);

  if (isMobile === null) {
    return <div className="relative aspect-[16/10] w-full bg-muted/20" aria-hidden />;
  }

  if (!loaded) {
    return (
      <div className="relative aspect-[16/10] w-full bg-muted/30">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-md text-sm text-muted-foreground">
            Load the interactive demo when you&apos;re ready — keeps the page fast on mobile.
          </p>
          <Button
            type="button"
            size="lg"
            className="rounded-xl bg-primary font-semibold text-primary-foreground shadow-md"
            onClick={() => setLoaded(true)}
          >
            <Play className="mr-2 h-5 w-5" aria-hidden />
            Play interactive demo
          </Button>
        </div>
      </div>
    );
  }

  return <ArcadeIframe />;
}
