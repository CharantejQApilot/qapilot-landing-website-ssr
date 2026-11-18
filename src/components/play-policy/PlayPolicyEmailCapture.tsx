"use client";

import { useState, type FormEvent } from "react";
import { playPolicyEmailClientSchema } from "@/lib/forms/play-policy-checker-email";
import { postPlayPolicyLead } from "@/lib/play-policy-lead";

type Status = "idle" | "submitting" | "done";

export function PlayPolicyEmailCapture() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = playPolicyEmailClientSchema.safeParse({ email });
    if (!parsed.success) {
      setError(
        parsed.error.flatten().fieldErrors.email?.[0] ??
          "Please enter a valid email address",
      );
      return;
    }

    setError(null);
    setStatus("submitting");
    try {
      const res = await postPlayPolicyLead(parsed.data.email);
      if (!res.ok) throw new Error("submit failed");
      setSubmittedEmail(parsed.data.email);
      setStatus("done");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div role="status" aria-live="polite">
        <p className="text-lg font-semibold text-[var(--on-midnight)]">
          Thanks. We&apos;ll reach out soon.
        </p>
        <p className="qg-cta-note">
          We&apos;ll email {submittedEmail} to set up the scan for your app.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="play-policy-email" className="sr-only">
          Email
        </label>
        <input
          id="play-policy-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          className="qg-input min-w-0 flex-1"
          style={{ minHeight: 56 }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          disabled={submitting}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "play-policy-email-error" : undefined}
        />
        <span className="qg-cta-glow shrink-0">
          <span className="qg-cta-glow__spin" aria-hidden="true" />
          <button
            type="submit"
            className="qg-btn qg-btn--hero w-full"
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Analyze your app"}
          </button>
        </span>
      </div>
      {error ? (
        <p id="play-policy-email-error" className="qg-error" role="alert">
          {error}
        </p>
      ) : null}
      <p className="qg-cta-note">
        Android only. Leave your email and our team will reach out to run the
        scan on your app.
      </p>
    </form>
  );
}
