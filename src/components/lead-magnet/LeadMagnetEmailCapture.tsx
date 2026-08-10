"use client";

import type { LucideIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { leadMagnetEmailClientSchema } from "@/lib/forms/lead-magnet-email";
import {
  marketingFormControlClass,
  marketingFormFieldErrorClass,
  marketingFormLabelClass,
} from "@/lib/forms/marketing-form-classes";
import { getCleanAttributionPayloadForHubSpot } from "@/lib/attribution";
import { LEAD_MAGNET_EMAIL_API_PATH } from "@/lib/lead-magnet-email-capture";
import { cn } from "@/lib/utils";

function readHubSpotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const row = document.cookie
    .split("; ")
    .find((r) => r.startsWith("hubspotutk="));
  if (!row) return undefined;
  const v = row.slice("hubspotutk=".length);
  return v ? decodeURIComponent(v) : undefined;
}

export type LeadMagnetAction = {
  id: string;
  label: string;
  variant?: "default" | "outline";
  icon?: LucideIcon;
  /** Appended to `pageName` for HubSpot context (e.g. ". Download CSV"). */
  hubspotActionLabel: string;
  /** Runs after email is captured in HubSpot. */
  onAfterCapture: () => void | Promise<void>;
};

export type LeadMagnetEmailCaptureProps = {
  /** Base HubSpot `context.pageName` (action label is appended per button). */
  pageName: string;
  actions: LeadMagnetAction[];
  apiPath?: string;
  emailPlaceholder?: string;
  emailLabel?: string;
  fieldId?: string;
  title?: string;
  description?: string;
  className?: string;
  /** Per-action success copy keyed by action `id`. */
  successMessages?: Record<string, string>;
};

export function LeadMagnetEmailCapture({
  pageName,
  actions,
  apiPath = LEAD_MAGNET_EMAIL_API_PATH,
  emailPlaceholder = "you@company.com",
  emailLabel = "Work email",
  fieldId = "lead-magnet-email",
  title,
  description,
  className,
  successMessages,
}: LeadMagnetEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);
  const [successActionId, setSuccessActionId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = useCallback(() => {
    const result = leadMagnetEmailClientSchema.safeParse({ email });
    if (!result.success) {
      const message =
        result.error.flatten().fieldErrors.email?.[0] ??
        "Please enter a valid email address";
      setEmailError(message);
      return null;
    }
    setEmailError(null);
    return result.data.email;
  }, [email]);

  const runAction = async (action: LeadMagnetAction) => {
    setSubmitError(null);
    setSuccessActionId(null);

    const validEmail = validateEmail();
    if (!validEmail) return;

    setPendingActionId(action.id);
    try {
      const body = {
        email: validEmail,
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: `${pageName}${action.hubspotActionLabel}`,
        hutk: readHubSpotUtk(),
        ...getCleanAttributionPayloadForHubSpot(),
      };

      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 422) {
          const data = (await res.json()) as {
            fields?: Record<string, string[]>;
          };
          const msg = data.fields?.email?.[0];
          if (msg) {
            setEmailError(msg);
            return;
          }
        }
        throw new Error("submit failed");
      }

      await action.onAfterCapture();
      setSuccessActionId(action.id);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setPendingActionId(null);
    }
  };

  const successMessage =
    successActionId && successMessages?.[successActionId]
      ? successMessages[successActionId]
      : successActionId
        ? "Thank you. You're all set."
        : null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-gradient-to-br from-muted/50 via-card to-card p-4 shadow-sm sm:p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-12">
        {title || description ? (
          <div className="min-w-0 lg:max-w-sm lg:flex-1 xl:max-w-md">
            {title ? (
              <p className="font-heading text-base font-semibold leading-snug text-foreground sm:text-lg">
                {title}
              </p>
            ) : null}
            {description ? (
              <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="w-full lg:w-auto lg:shrink-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3 lg:gap-4">
            <div className="w-full sm:w-[15.5rem] lg:w-60">
              <label
                htmlFor={fieldId}
                className={cn(marketingFormLabelClass, "mb-1.5")}
              >
                {emailLabel}
              </label>
              <input
                id={fieldId}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                  if (submitError) setSubmitError(null);
                  if (successActionId) setSuccessActionId(null);
                }}
                onBlur={() => {
                  if (email.trim()) validateEmail();
                }}
                placeholder={emailPlaceholder}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={`${fieldId}-error`}
                className={cn(
                  marketingFormControlClass({ invalid: !!emailError }),
                  "h-11 rounded-xl",
                )}
              />
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:flex lg:shrink-0 lg:gap-3">
              {actions.map((action) => {
                const Icon = action.icon;
                const isPrimary = action.variant === "default";

                return (
                  <Button
                    key={action.id}
                    type="button"
                    variant={isPrimary ? "default" : "outline"}
                    disabled={pendingActionId !== null}
                    className={cn(
                      "h-11 min-h-11 w-full rounded-xl px-4 text-sm font-semibold shadow-sm transition sm:px-5 sm:text-[0.9375rem] lg:min-w-[9.75rem] xl:min-w-[10.5rem]",
                      !isPrimary &&
                        "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
                    )}
                    onClick={() => runAction(action)}
                  >
                    {Icon ? (
                      <Icon
                        className="mr-2 h-4 w-4 shrink-0"
                        strokeWidth={2.25}
                      />
                    ) : null}
                    {pendingActionId === action.id ? "Sending…" : action.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <p
            id={`${fieldId}-error`}
            role={emailError ? "alert" : undefined}
            aria-live="polite"
            className={cn(
              marketingFormFieldErrorClass,
              "min-h-[1.125rem] w-full sm:w-[15.5rem] lg:w-60",
            )}
          >
            {emailError}
          </p>
        </div>
      </div>

      {submitError ? (
        <p className="mt-3 text-sm text-destructive">{submitError}</p>
      ) : null}

      {successMessage ? (
        <p className="mt-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </p>
      ) : null}
    </div>
  );
}
