"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { MCP_GUIDE_NAV } from "@/lib/mcp-guide";
import { cn } from "@/lib/utils";

function NavLinks({
  activeHref,
  onNavigate,
}: {
  activeHref: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Guide contents">
      {MCP_GUIDE_NAV.map((group) => (
        <div key={group.heading} className="mb-6 last:mb-0">
          <p className="mb-2 px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
            {group.heading}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.links.map((link) => {
              const active = activeHref === link.href;
              return (
                <li key={`${group.heading}-${link.label}`}>
                  <a
                    href={link.href}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
                      active
                        ? "bg-primary-light font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function McpGuideSidebar() {
  const [activeHref, setActiveHref] = useState("#overview");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-guide-section]");
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.getAttribute("data-guide-section");
        if (id) setActiveHref(`#${id}`);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0.05 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const activeLabel =
    MCP_GUIDE_NAV.flatMap((g) => g.links).find((l) => l.href === activeHref)
      ?.label ?? "Overview";

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-sm"
          aria-expanded={open}
        >
          <span>
            On this page
            <span className="ml-2 font-normal text-muted-foreground">
              {activeLabel}
            </span>
          </span>
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </button>
        {open ? (
          <div className="mt-2 rounded-xl border border-border bg-card p-4 shadow-sm">
            <NavLinks
              activeHref={activeHref}
              onNavigate={() => setOpen(false)}
            />
          </div>
        ) : null}
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-2">
          <NavLinks activeHref={activeHref} />
        </div>
      </aside>
    </>
  );
}
