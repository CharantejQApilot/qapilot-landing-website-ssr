import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarketingLedgerProps = {
  children: ReactNode;
  /** Column count at desktop; collapses via layout.css */
  cols?: 2 | 3 | 5;
  className?: string;
  /** Accessible name for the grid */
  "aria-label"?: string;
};

/** S06 capability ledger. Shared outer border + internal hairlines. */
export function MarketingLedger({
  children,
  cols = 3,
  className,
  "aria-label": ariaLabel,
}: MarketingLedgerProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        "sig-ledger",
        cols === 2 && "sig-ledger--2",
        cols === 5 && "sig-ledger--5",
        className,
      )}
    >
      {children}
    </div>
  );
}

type MarketingLedgerCellProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "div" | "li";
};

export function MarketingLedgerCell({
  children,
  className,
  as: Tag = "article",
}: MarketingLedgerCellProps) {
  return <Tag className={cn("sig-cell", className)}>{children}</Tag>;
}
