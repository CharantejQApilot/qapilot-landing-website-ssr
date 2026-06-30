"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { leadMagnetEmailClientSchema } from "@/lib/forms/lead-magnet-email";
import {
  marketingFormControlClass,
  marketingFormFieldErrorClass,
  marketingFormSubmitClass,
} from "@/lib/forms/marketing-form-classes";
import { getCleanAttributionPayloadForHubSpot } from "@/lib/attribution";
import { LEAD_MAGNET_EMAIL_API_PATH } from "@/lib/lead-magnet-email-capture";
import { cn } from "@/lib/utils";

function readHubSpotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const row = document.cookie.split("; ").find((r) => r.startsWith("hubspotutk="));
  if (!row) return undefined;
  const v = row.slice("hubspotutk=".length);
  return v ? decodeURIComponent(v) : undefined;
}

type HomeExitIntentEmailFormProps = {
  valueLine: string;
  className?: string;
  onSuccess?: () => void;
};

export function HomeExitIntentEmailForm({
  valueLine,
  className,
  onSuccess,
}: HomeExitIntentEmailFormProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fieldId = "home-exit-intent-email";

  const validateEmail = useCallback(() => {
    const result = leadMagnetEmailClientSchema.safeParse({ email });
    if (!result.success) {
      const message =
        result.error.flatten().fieldErrors.email?.[0] ?? "Please enter a valid email address";
      setEmailError(message);
      return null;
    }
    setEmailError(null);
    return result.data.email;
  }, [email]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    setSuccess(false);

    const validEmail = validateEmail();
    if (!validEmail) return;

    setIsSubmitting(true);
    try {
      const body = {
        email: validEmail,
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: "Home — Exit Intent Popup — Book Demo",
        hutk: readHubSpotUtk(),
        ...getCleanAttributionPayloadForHubSpot(),
      };

      const res = await fetch(LEAD_MAGNET_EMAIL_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 422) {
          const data = (await res.json()) as { fields?: Record<string, string[]> };
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
      onSuccess?.();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("min-w-0", className)}>
      <p className="mb-4 text-[1.05em] leading-snug text-muted-foreground">{valueLine}</p>

      {success ? (
        <p className="text-[1.05em] font-medium leading-snug text-emerald-700">
          Thanks — we&apos;ll reach out shortly to schedule your demo.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor={fieldId} className="sr-only">
              Work email
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
              }}
              onBlur={() => {
                if (email.trim()) validateEmail();
              }}
              placeholder="you@company.com"
              aria-invalid={emailError ? true : undefined}
              aria-describedby={`${fieldId}-error`}
              className={cn(
                marketingFormControlClass({ invalid: !!emailError }),
                "h-[2.75em] rounded-lg text-[1em] px-3",
              )}
            />
            <p
              id={`${fieldId}-error`}
              role={emailError ? "alert" : undefined}
              className={cn(marketingFormFieldErrorClass, "text-[0.9em]")}
            >
              {emailError}
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              marketingFormSubmitClass,
              "h-[2.75em] w-full rounded-lg text-[1em] font-semibold",
            )}
          >
            {isSubmitting ? "Sending…" : "Book my demo"}
          </Button>

          {submitError ? <p className="text-[0.95em] text-destructive">{submitError}</p> : null}
        </form>
      )}
    </div>
  );
}
