"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import PhoneInput from "@/components/PhoneInput";
import { getCleanAttributionPayloadForHubSpot } from "@/lib/attribution";
import {
  MCP_WAITLIST_API_PATH,
  MCP_AGENTS,
  MCP_FRAMEWORKS,
} from "@/lib/mcp-page";
import { HUBSPOT_MCP_WAITLIST_FORM_NAME } from "@/lib/constants";
import { mcpWaitlistClientSchema } from "@/lib/forms/mcp-waitlist";
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

function readHubSpotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const row = document.cookie.split("; ").find((r) => r.startsWith("hubspotutk="));
  if (!row) return undefined;
  const v = row.slice("hubspotutk=".length);
  return v ? decodeURIComponent(v) : undefined;
}

export function McpWaitlistForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [agent, setAgent] = useState("");
  const [framework, setFramework] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clientSchema = useMemo(() => mcpWaitlistClientSchema, []);

  const clearFieldError = useCallback((name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handlePhoneChange = useCallback(
    (value: string) => {
      setPhone(value);
      clearFieldError("phone");
    },
    [clearFieldError],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setFieldErrors({});

    const payload = {
      email,
      phone,
      company,
      agent,
      framework,
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
        pageName: HUBSPOT_MCP_WAITLIST_FORM_NAME,
        hutk: readHubSpotUtk(),
        ...getCleanAttributionPayloadForHubSpot(),
      };

      const res = await fetch(MCP_WAITLIST_API_PATH, {
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
      setEmail("");
      setPhone("");
      setCompany("");
      setAgent("");
      setFramework("");
      setFormKey((k) => k + 1);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={marketingFormRootClass}>
      <div className="space-y-4">
        {status === "success" && (
          <div className={marketingFormStatusSuccessClass}>
            You&apos;re on the list. We&apos;ll email when your build is ready.
          </div>
        )}
        {status === "error" && (
          <div className={marketingFormStatusErrorClass}>
            Something went wrong. Please try again.
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="mcp-email" className={marketingFormLabelClass}>
              Work email <span className="text-destructive">*</span>
            </label>
            <input
              id="mcp-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={255}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              placeholder="you@company.com"
              className={marketingFormControlClass({ invalid: !!fieldErrors.email })}
            />
            {fieldErrors.email ? (
              <p className={marketingFormFieldErrorClass}>{fieldErrors.email}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="mcp-phone" className={marketingFormLabelClass}>
              Phone number <span className="text-destructive">*</span>
            </label>
            <PhoneInput
              key={formKey}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Phone number"
              className={cn(fieldErrors.phone && "ring-1 ring-destructive rounded-md")}
            />
            {fieldErrors.phone ? (
              <p className={marketingFormFieldErrorClass}>{fieldErrors.phone}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="mcp-company" className={marketingFormLabelClass}>
              Company name <span className="text-destructive">*</span>
            </label>
            <input
              id="mcp-company"
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={100}
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                clearFieldError("company");
              }}
              placeholder="Your company"
              className={marketingFormControlClass({ invalid: !!fieldErrors.company })}
            />
            {fieldErrors.company ? (
              <p className={marketingFormFieldErrorClass}>{fieldErrors.company}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="mcp-agent" className={marketingFormLabelClass}>
              Which agent do you use? <span className="text-destructive">*</span>
            </label>
            <select
              id="mcp-agent"
              name="agent"
              required
              value={agent}
              onChange={(e) => {
                setAgent(e.target.value);
                clearFieldError("agent");
              }}
              className={cn(
                marketingFormControlClass({
                  invalid: !!fieldErrors.agent,
                  selectPlaceholder: !agent,
                }),
                "cursor-pointer",
              )}
            >
              <option value="">Select an agent</option>
              {MCP_AGENTS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {fieldErrors.agent ? (
              <p className={marketingFormFieldErrorClass}>{fieldErrors.agent}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="mcp-framework" className={marketingFormLabelClass}>
              What&apos;s your app built in?{" "}
              <span className="text-destructive">*</span>
            </label>
            <select
              id="mcp-framework"
              name="framework"
              required
              value={framework}
              onChange={(e) => {
                setFramework(e.target.value);
                clearFieldError("framework");
              }}
              className={cn(
                marketingFormControlClass({
                  invalid: !!fieldErrors.framework,
                  selectPlaceholder: !framework,
                }),
                "cursor-pointer",
              )}
            >
              <option value="">Select a framework</option>
              {MCP_FRAMEWORKS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {fieldErrors.framework ? (
              <p className={marketingFormFieldErrorClass}>{fieldErrors.framework}</p>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={marketingFormSubmitClass}
          >
            {isSubmitting ? "Submitting…" : "Request Access"}
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            No spam. We&apos;ll email when your build is ready and nothing else.
          </p>
        </form>
      </div>
    </div>
  );
}
