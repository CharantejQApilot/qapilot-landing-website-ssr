"use client";

import { useCallback, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCleanAttributionPayloadForHubSpot } from "@/lib/attribution";
import { playPolicyEmailClientSchema } from "@/lib/forms/play-policy-checker-email";
import {
  marketingFormControlClass,
  marketingFormFieldErrorClass,
  marketingFormStatusErrorClass,
} from "@/lib/forms/marketing-form-classes";
import { PLAY_POLICY_EMAIL_API_PATH } from "@/lib/play-policy-checker";
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

type PlayPolicyEmailFormProps = {
  id?: string;
  tone?: "canvas" | "navy";
  className?: string;
};

export function PlayPolicyEmailForm({
  id,
  tone = "canvas",
  className,
}: PlayPolicyEmailFormProps) {
  const fieldId = useId();
  const navy = tone === "navy";
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = useCallback(() => {
    const result = playPolicyEmailClientSchema.safeParse({ email });
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

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const validEmail = validateEmail();
    if (!validEmail) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(PLAY_POLICY_EMAIL_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: validEmail,
          pageUri: typeof window !== "undefined" ? window.location.href : "",
          hutk: readHubSpotUtk(),
          ...getCleanAttributionPayloadForHubSpot(),
        }),
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

      setSuccess(true);
      setEmail("");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        id={id}
        className={cn(
          "max-w-md text-base font-medium leading-relaxed sm:text-lg",
          navy ? "text-white" : "text-foreground",
          className,
        )}
        role="status"
      >
        We&apos;ll set things up and email you when you can run a check.
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={cn("w-full max-w-md", className)}
      noValidate
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <label htmlFor={fieldId} className="sr-only">
            Email
          </label>
          <input
            id={fieldId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="you@company.com"
            value={email}
            disabled={isSubmitting}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? `${fieldId}-error` : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailError) setEmailError(null);
            }}
            className={cn(
              marketingFormControlClass({ invalid: Boolean(emailError) }),
              "h-12 text-base sm:h-14",
            )}
          />
          {emailError ? (
            <p
              id={`${fieldId}-error`}
              className={cn(
                marketingFormFieldErrorClass,
                navy && "!text-destructive",
              )}
            >
              {emailError}
            </p>
          ) : null}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "h-12 shrink-0 px-6 text-base font-semibold sm:h-14 sm:px-7",
            navy &&
              "bg-white text-[hsl(var(--navy))] hover:bg-white/90",
          )}
        >
          {isSubmitting ? "Sending" : "Try it out"}
        </Button>
      </div>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed",
          !navy && "text-muted-foreground",
        )}
      >
        Drop your email. We&apos;ll set things up for you to run a check.
      </p>
      {submitError ? (
        <p className={cn(marketingFormStatusErrorClass, "mt-3")} role="alert">
          {submitError}
        </p>
      ) : null}
    </form>
  );
}
