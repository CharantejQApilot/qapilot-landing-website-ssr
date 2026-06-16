"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import PhoneInput from "@/components/PhoneInput";
import { MARKETING_LEAD_DESIGNATIONS, marketingLeadSchema } from "@/lib/forms/marketing-lead";
import {
  marketingFormControlClass,
  marketingFormFieldErrorClass,
  marketingFormLabelClass,
  marketingFormRootClass,
  marketingFormStatusErrorClass,
  marketingFormStatusSuccessClass,
  marketingFormSubmitClass,
} from "@/lib/forms/marketing-form-classes";
import { cn } from "@/lib/utils";
import { getCleanAttributionPayloadForHubSpot } from "@/lib/attribution";

function readHubSpotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const row = document.cookie.split("; ").find((r) => r.startsWith("hubspotutk="));
  if (!row) return undefined;
  const v = row.slice("hubspotutk=".length);
  return v ? decodeURIComponent(v) : undefined;
}

export type MarketingLeadFormProps = {
  apiPath: string;
  /** HubSpot `context.pageName` */
  pageName: string;
  submitButtonLabel?: string;
  /** Prefix for input `id`s / `htmlFor` (avoid duplicates when multiple forms exist). */
  fieldIdPrefix: string;
  onSuccess?: () => void;
  className?: string;
};

export function MarketingLeadForm({
  apiPath,
  pageName,
  submitButtonLabel = "Submit",
  fieldIdPrefix,
  onSuccess,
  className,
}: MarketingLeadFormProps) {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [formKey, setFormKey] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clientSchema = useMemo(
    () =>
      marketingLeadSchema.pick({
        firstname: true,
        email: true,
        phone: true,
        company: true,
        designation: true,
      }),
    [],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setFieldErrors({});

    const payload = {
      firstname,
      email,
      phone,
      company,
      designation: designation || undefined,
    };

    const result = clientSchema.safeParse(payload);
    if (!result.success) {
      const err: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !err[key]) err[key] = issue.message;
      }
      setFieldErrors(err);
      return;
    }

    setIsSubmitting(true);
    try {
      const body = {
        ...result.data,
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName,
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
          const data = (await res.json()) as { fields?: Record<string, string[]> };
          const next: Record<string, string> = {};
          if (data.fields) {
            for (const [k, msgs] of Object.entries(data.fields)) {
              if (msgs?.[0]) next[k] = msgs[0];
            }
          }
          setFieldErrors(next);
        }
        throw new Error("submit failed");
      }

      setStatus("success");
      setFirstname("");
      setEmail("");
      setPhone("");
      setCompany("");
      setDesignation("");
      setFormKey((k) => k + 1);
      onSuccess?.();
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFieldError = useCallback((name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const pid = (name: string) => `${fieldIdPrefix}-${name}`;

  return (
    <div className={cn(marketingFormRootClass, className)}>
      <div className="space-y-4">
        {status === "success" && (
          <div className={marketingFormStatusSuccessClass}>
            Thank you! We&apos;ll be in touch soon.
          </div>
        )}
        {status === "error" && (
          <div className={marketingFormStatusErrorClass}>
            Something went wrong. Please try again.
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor={pid("firstname")} className={marketingFormLabelClass}>
              Full name <span className="text-destructive">*</span>
            </label>
            <input
              id={pid("firstname")}
              name="firstname"
              type="text"
              autoComplete="name"
              maxLength={100}
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                clearFieldError("firstname");
              }}
              className={marketingFormControlClass({ invalid: !!fieldErrors.firstname })}
              placeholder="Your full name"
            />
            {fieldErrors.firstname && (
              <p className={marketingFormFieldErrorClass}>{fieldErrors.firstname}</p>
            )}
          </div>

          <div>
            <label htmlFor={pid("email")} className={marketingFormLabelClass}>
              Email <span className="text-destructive">*</span>
            </label>
            <input
              id={pid("email")}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={255}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className={marketingFormControlClass({ invalid: !!fieldErrors.email })}
              placeholder="you@example.com"
            />
            {fieldErrors.email && <p className={marketingFormFieldErrorClass}>{fieldErrors.email}</p>}
          </div>

          <div>
            <span className={marketingFormLabelClass}>
              Phone <span className="text-destructive">*</span>
            </span>
            <PhoneInput
              key={formKey}
              value={phone}
              onChange={(v) => {
                setPhone(v);
                clearFieldError("phone");
              }}
              placeholder="Phone number"
            />
            {fieldErrors.phone && <p className={marketingFormFieldErrorClass}>{fieldErrors.phone}</p>}
          </div>

          <div>
            <label htmlFor={pid("company")} className={marketingFormLabelClass}>
              Company <span className="text-destructive">*</span>
            </label>
            <input
              id={pid("company")}
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={100}
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                clearFieldError("company");
              }}
              className={marketingFormControlClass({ invalid: !!fieldErrors.company })}
              placeholder="Company name"
            />
            {fieldErrors.company && (
              <p className={marketingFormFieldErrorClass}>{fieldErrors.company}</p>
            )}
          </div>

          <div>
            <label htmlFor={pid("designation")} className={marketingFormLabelClass}>
              Designation <span className="text-destructive">*</span>
            </label>
            <select
              id={pid("designation")}
              name="designation"
              required
              value={designation}
              onChange={(e) => {
                setDesignation(e.target.value);
                clearFieldError("designation");
              }}
              className={cn(
                marketingFormControlClass({
                  invalid: !!fieldErrors.designation,
                  selectPlaceholder: !designation,
                }),
                "cursor-pointer",
              )}
            >
              <option value="">Select designation</option>
              {MARKETING_LEAD_DESIGNATIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {fieldErrors.designation && (
              <p className={marketingFormFieldErrorClass}>{fieldErrors.designation}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className={marketingFormSubmitClass}>
            {isSubmitting ? "Submitting…" : submitButtonLabel}
          </Button>
        </form>
      </div>
    </div>
  );
}
