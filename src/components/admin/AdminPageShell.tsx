import { MarketingPageShell } from "@/components/marketing";
import { cn } from "@/lib/utils";

type AdminPageShellProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

/**
 * Admin routes use the same light theme and atmosphere as marketing pages (soft gradient + dot grain).
 */
export function AdminPageShell({
  children,
  className,
  contentClassName,
}: AdminPageShellProps) {
  return (
    <MarketingPageShell
      background="soft"
      className={cn("min-h-screen", className)}
      contentClassName={cn("w-full", contentClassName)}
    >
      {children}
    </MarketingPageShell>
  );
}
