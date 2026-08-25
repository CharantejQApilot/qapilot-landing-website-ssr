"use client";

import { Check, CheckCircle2, ChevronLeft } from "lucide-react";
import { PhoneChassis } from "@/components/dual-device-testing/PhoneChassis";
import { cn } from "@/lib/utils";

const SHARED_MESSAGE = "Hey, good morning!";

type DualDeviceHeroVisualProps = {
 className?: string;
 /** Compact layout for Core Advantage media panel */
 compact?: boolean;
 /** Home hero slide. Same chrome as default, sized to keep the trust rail above the fold */
 home?: boolean;
};

/**
 * Two phones with a messaging mockup: Device A sends (right bubble),
 * Device B receives the same message (left bubble), then the sync test passes.
 */
export function DualDeviceHeroVisual({
 className,
 compact = false,
 home = false,
}: DualDeviceHeroVisualProps) {
 const size = compact ? "compact" : home ? "home" : "default";

 return (
 <div
 className={cn(
 "relative mx-auto hidden w-full select-none lg:block",
 size === "compact" && "max-w-md",
 size === "home" && "max-w-[26rem] sm:max-w-[28rem]",
 size === "default" && "max-w-[34rem] sm:max-w-[38rem] lg:max-w-[40rem]",
 className,
 )}
 aria-hidden
 >
 {/* Soft stage light behind the pair */}
 <div
 className={cn(
 "pointer-events-none absolute left-1/2 top-[42%] -z-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.09]",
 size === "compact" ? "h-[70%] w-[90%] blur-2xl" : "h-[78%] w-[95%] blur-3xl",
 )}
 />
 <div
 className={cn(
 "pointer-events-none absolute inset-x-[8%] bottom-[4%] -z-0 h-8 rounded-[100%] bg-foreground/[0.07] blur-xl",
 size === "compact" && "h-5",
 )}
 />

 <div
 className={cn(
 "relative grid grid-cols-[1fr_auto_1fr] items-end",
 size === "compact" && "gap-3 sm:gap-4",
 size === "home" && "gap-3 sm:gap-4",
 size === "default" && "gap-4 sm:gap-6 md:gap-8",
 )}
 >
 <PhoneDevice
 label="Device A"
 role="Sender"
 size={size}
 contactName="Alex"
 contactInitial="A"
 variant="send"
 tilt={size === "home" ? "-rotate-[1deg]" : "-rotate-[1.5deg]"}
 />

 <div
 className={cn(
 "mb-[28%] flex flex-col items-center justify-center",
 size === "compact" ? "mb-[24%] gap-2" : "gap-3",
 )}
 >
 <div
 className={cn(
 "relative h-px overflow-hidden rounded-full bg-border/80",
 size === "compact" && "w-9 sm:w-11",
 size === "home" && "w-10 sm:w-12",
 size === "default" && "w-12 sm:w-16 md:w-[4.5rem]",
 "before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:rounded-full before:bg-primary",
 "before:motion-safe:animate-dual-device-pulse",
 )}
 />
 <div
 className={cn(
 "flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/90 px-3 py-1.5 shadow-sm shadow-primary/10 backdrop-blur-sm",
 "motion-safe:animate-dual-device-pass",
 size === "compact" ? "px-2.5 py-1 text-[10px]" : "text-xs",
 )}
 >
 <CheckCircle2
 className={cn("shrink-0 text-primary", size === "compact" ? "size-3.5" : "size-4")}
 strokeWidth={2}
 />
 <span className="font-semibold tracking-wide text-primary">Pass</span>
 </div>
 </div>

 <PhoneDevice
 label="Device B"
 role="Receiver"
 size={size}
 contactName="Jordan"
 contactInitial="J"
 variant="receive"
 tilt={size === "home" ? "rotate-[1deg]" : "rotate-[1.5deg]"}
 />
 </div>
 </div>
 );
}

function PhoneDevice({
 label,
 role,
 size,
 contactName,
 contactInitial,
 variant,
 tilt,
}: {
 label: string;
 role: string;
 size: "default" | "compact" | "home";
 contactName: string;
 contactInitial: string;
 variant: "send" | "receive";
 tilt: string;
}) {
 const isSend = variant === "send";
 const isCompact = size === "compact";
 const isHome = size === "home";

 return (
 <div className={cn("flex min-w-0 flex-col items-center", isCompact || isHome ? "gap-1.5" : "gap-2.5")}>
 <div className="text-center">
 <p
 className={cn(
 "font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground",
 isCompact || isHome ? "text-[10px]" : "text-[11px] sm:text-xs",
 )}
 >
 {label}
 </p>
 {!isHome ? (
 <p
 className={cn(
 "mt-0.5 font-medium text-foreground/65",
 isCompact ? "text-[10px]" : "text-[11px] sm:text-xs",
 )}
 >
 {role}
 </p>
 ) : null}
 </div>

 <PhoneChassis size={size} className={cn("transition-transform duration-500", tilt)}>
 {/* Status bar */}
 <div
 className={cn(
 "relative z-10 flex shrink-0 items-center justify-between font-semibold text-foreground/85",
 (isCompact || isHome)
 ? "px-3.5 pt-7 text-[9px]"
 : "px-4 pt-8 text-[10px] sm:px-5 sm:pt-9 sm:text-[11px]",
 )}
 >
 <span className="tabular-nums tracking-tight">9:41</span>
 <div className="flex items-center gap-1.5">
 <span className="flex items-end gap-px">
 <span className="h-1 w-0.5 rounded-sm bg-foreground/70" />
 <span className="h-1.5 w-0.5 rounded-sm bg-foreground/70" />
 <span className="h-2 w-0.5 rounded-sm bg-foreground/70" />
 <span className="h-2.5 w-0.5 rounded-sm bg-foreground/40" />
 </span>
 <span className="relative h-2 w-4 rounded-[2px] border border-foreground/55">
 <span className="absolute inset-[1.5px] right-[3px] rounded-[1px] bg-foreground/70" />
 <span className="absolute -right-[2px] top-1/2 h-1 w-[1.5px] -translate-y-1/2 rounded-r-sm bg-foreground/45" />
 </span>
 </div>
 </div>

 {/* Chat header */}
 <div
 className={cn(
 "relative z-10 flex shrink-0 items-center border-b border-black/[0.04] bg-white/95 backdrop-blur-md",
 (isCompact || isHome) ? "gap-1.5 px-2 py-2" : "gap-2 px-2.5 py-2.5 sm:px-3 sm:py-3",
 )}
 >
 <ChevronLeft
 className={cn("shrink-0 text-primary", (isCompact || isHome) ? "size-3.5" : "size-4 sm:size-[18px]")}
 strokeWidth={2}
 />
 <span
 className={cn(
 "flex shrink-0 items-center justify-center rounded-full bg-primary/12 font-semibold text-primary",
 (isCompact || isHome) ? "size-6 text-[9px]" : "size-8 text-[11px] sm:size-9 sm:text-xs",
 )}
 >
 {contactInitial}
 </span>
 <div className="min-w-0 flex-1">
 <p
 className={cn(
 "truncate font-semibold leading-tight text-foreground",
 (isCompact || isHome) ? "text-[10px]" : "text-[12px] sm:text-[13px]",
 )}
 >
 {contactName}
 </p>
 <p
 className={cn(
 "truncate text-muted-foreground",
 (isCompact || isHome) ? "text-[8px]" : "text-[9px] sm:text-[10px]",
 )}
 >
 Messages
 </p>
 </div>
 </div>

 {/* Thread */}
 <div
 className={cn(
 "relative flex min-h-0 flex-1 flex-col justify-end",
 "bg-[radial-gradient(ellipse_at_top,_#ffffff_0%,_#f0f2f6_55%,_#e9ecf1_100%)]",
 (isCompact || isHome) ? "px-2.5 pb-2" : "px-3 pb-3 sm:px-3.5 sm:pb-3.5",
 )}
 >
 <div
 className={cn(
 "flex",
 isSend ? "justify-end" : "justify-start",
 isSend
 ? "motion-safe:animate-dual-device-send"
 : "opacity-0 motion-safe:animate-dual-device-receive",
 )}
 >
 <div
 className={cn(
 "max-w-[88%] font-medium leading-snug shadow-sm",
 isSend
 ? "rounded-[1.15rem] rounded-br-md bg-primary text-primary-foreground"
 : "rounded-[1.15rem] rounded-bl-md bg-white text-foreground ring-1 ring-black/[0.05]",
 (isCompact || isHome) ? "px-2.5 py-1.5 text-[9px]" : "px-3 py-2.5 text-[11px] sm:text-[12px]",
 )}
 >
 <p>{SHARED_MESSAGE}</p>
 <div
 className={cn(
 "mt-1 flex items-center justify-end gap-0.5 tabular-nums",
 isSend ? "text-primary-foreground/70" : "text-muted-foreground",
 (isCompact || isHome) ? "text-[7px]" : "text-[8px] sm:text-[9px]",
 )}
 >
 <span>9:41</span>
 {isSend ? <Check className="size-2.5" strokeWidth={2.5} /> : null}
 </div>
 </div>
 </div>
 </div>

 {/* Composer */}
 <div
 className={cn(
 "relative z-10 flex shrink-0 items-center border-t border-black/[0.04] bg-white",
 (isCompact || isHome) ? "gap-1.5 px-2 pb-3.5 pt-1.5" : "gap-2 px-2.5 pb-5 pt-2.5 sm:px-3 sm:pb-6",
 )}
 >
 <div
 className={cn(
 "min-w-0 flex-1 rounded-full bg-[#eef0f4] text-muted-foreground",
 (isCompact || isHome) ? "px-2.5 py-1 text-[8px]" : "px-3 py-2 text-[10px] sm:text-[11px]",
 )}
 >
 Message
 </div>
 <span
 className={cn(
 "flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground shadow-sm shadow-primary/25",
 (isCompact || isHome) ? "size-5 text-[9px]" : "size-7 text-[11px] sm:size-8 sm:text-xs",
 )}
 >
 ↑
 </span>
 </div>

 </PhoneChassis>
 </div>
 );
}
