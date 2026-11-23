"use client";

import { useCallback, useId, useState } from "react";
import { goMono } from "@/components/play-policy/go-font";
import {
  PlayPolicyAppPicker,
  type PlayPolicySelection,
} from "@/components/play-policy/PlayPolicyAppPicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { playPolicyEmailClientSchema } from "@/lib/forms/play-policy-checker-email";
import {
  checkQuota,
  startPlaystoreScan,
  uploadApkScan,
} from "@/lib/play-policy-api";

type Step = "form" | "submitting" | "success" | "limit";

type PlayPolicyAnalyzeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactUs: () => void;
};

const INITIAL = {
  step: "form" as Step,
  selection: null as PlayPolicySelection | null,
  email: "",
  emailError: null as string | null,
  submitError: null as string | null,
  uploadPct: 0,
};

export function PlayPolicyAnalyzeDialog({
  open,
  onOpenChange,
  onContactUs,
}: PlayPolicyAnalyzeDialogProps) {
  const emailId = useId();
  const [step, setStep] = useState<Step>(INITIAL.step);
  const [selection, setSelection] = useState<PlayPolicySelection | null>(
    INITIAL.selection,
  );
  const [email, setEmail] = useState(INITIAL.email);
  const [emailError, setEmailError] = useState<string | null>(
    INITIAL.emailError,
  );
  const [submitError, setSubmitError] = useState<string | null>(
    INITIAL.submitError,
  );
  const [uploadPct, setUploadPct] = useState(INITIAL.uploadPct);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const reset = useCallback(() => {
    setStep(INITIAL.step);
    setSelection(INITIAL.selection);
    setEmail(INITIAL.email);
    setEmailError(INITIAL.emailError);
    setSubmitError(INITIAL.submitError);
    setUploadPct(INITIAL.uploadPct);
    setSubmittedEmail("");
  }, []);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next && step === "submitting") return;
      if (!next) reset();
      onOpenChange(next);
    },
    [onOpenChange, reset, step],
  );

  const lockWhileSubmitting = step === "submitting";
  const canSubmit =
    step === "form" &&
    selection !== null &&
    email.trim().length > 0;

  const startScan = useCallback(async () => {
    setSubmitError(null);

    const parsed = playPolicyEmailClientSchema.safeParse({ email });
    if (!parsed.success) {
      setEmailError(
        parsed.error.flatten().fieldErrors.email?.[0] ??
          "Please enter a valid email address",
      );
      return;
    }
    if (!selection) {
      setSubmitError("Select an app or upload a file first.");
      return;
    }

    const validEmail = parsed.data.email;
    setEmailError(null);
    setSubmittedEmail(validEmail);
    setStep("submitting");
    setUploadPct(0);

    try {
      if (selection.kind === "playstore") {
        const { app } = selection;
        const result = await startPlaystoreScan({
          email: validEmail,
          packageName: app.appId,
          title: app.title || undefined,
          developer: app.developer || undefined,
          iconUrl: app.icon || undefined,
        });
        if (result.kind === "limit") {
          setStep("limit");
          return;
        }
        setStep("success");
        return;
      }

      const quota = await checkQuota(validEmail);
      if (quota.remaining === 0) {
        setStep("limit");
        return;
      }

      const result = await uploadApkScan(validEmail, selection.file, {
        onProgress: setUploadPct,
      });
      if (result.kind === "limit") {
        setStep("limit");
        return;
      }
      setStep("success");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStep("form");
    }
  }, [email, selection]);

  const title =
    step === "success"
      ? "Scan started"
      : step === "limit"
        ? "Free scans used"
        : "Analyze your app";

  const description =
    step === "success" || step === "limit"
      ? undefined
      : "Pick a Play Store listing or upload an APK / XAPK. The report arrives by email in 2 hours. Android only.";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`${goMono.variable} qapilot-go qg-dialog max-h-[85vh] max-h-[85dvh] max-w-lg overflow-y-auto shadow-2xl sm:max-w-xl`}
        onEscapeKeyDown={(e) => {
          if (lockWhileSubmitting) e.preventDefault();
        }}
        onInteractOutside={(e) => {
          if (lockWhileSubmitting) e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          if (lockWhileSubmitting) e.preventDefault();
        }}
      >
        <DialogHeader className="space-y-2 text-left sm:text-left">
          <DialogTitle className="qg-dialog__title">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="qg-dialog__lede">
              {description}
            </DialogDescription>
          ) : (
            <DialogDescription className="sr-only">
              {title}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-1">
          {step === "form" || step === "submitting" ? (
            <div className="flex flex-col gap-5">
              <PlayPolicyAppPicker
                selection={selection}
                onSelectionChange={setSelection}
                disabled={step === "submitting"}
              />

              <div>
                <label htmlFor={emailId} className="qg-label">
                  Email
                </label>
                <input
                  id={emailId}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="you@company.com"
                  value={email}
                  disabled={step === "submitting"}
                  aria-invalid={emailError ? true : undefined}
                  aria-describedby={
                    emailError ? `${emailId}-error` : undefined
                  }
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canSubmit) {
                      e.preventDefault();
                      void startScan();
                    }
                  }}
                  className="qg-input"
                />
                {emailError ? (
                  <p id={`${emailId}-error`} className="qg-error">
                    {emailError}
                  </p>
                ) : null}
              </div>

              {step === "submitting" && selection?.kind === "file" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="qg-muted">Uploading…</span>
                    <span className="qg-muted">{uploadPct}%</span>
                  </div>
                  <div
                    className="qg-progress"
                    role="progressbar"
                    aria-valuenow={uploadPct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span style={{ width: `${uploadPct}%` }} />
                  </div>
                </div>
              ) : null}

              {step === "submitting" && selection?.kind === "playstore" ? (
                <p className="qg-muted" role="status">
                  Starting your scan…
                </p>
              ) : null}

              {submitError ? (
                <p className="qg-alert" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                <button
                  type="button"
                  className="qg-btn qg-btn--secondary"
                  disabled={step === "submitting"}
                  onClick={() => handleOpenChange(false)}
                >
                  Go back
                </button>
                <button
                  type="button"
                  className="qg-btn qg-btn--primary"
                  disabled={!canSubmit}
                  onClick={() => void startScan()}
                >
                  {step === "submitting" ? "Starting…" : "Start scan"}
                </button>
              </div>
            </div>
          ) : null}

          {step === "success" ? (
            <div className="flex flex-col gap-5">
              <p className="qg-body" role="status">
                Your report will be sent to{" "}
                <span className="font-semibold">{submittedEmail}</span> in 2
                hours.
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="qg-btn qg-btn--primary"
                  onClick={() => handleOpenChange(false)}
                >
                  Done
                </button>
              </div>
            </div>
          ) : null}

          {step === "limit" ? (
            <div className="flex flex-col gap-5">
              <p className="qg-body" role="status">
                You&apos;ve used your 5 free scans for this email. Contact us
                to continue.
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                <button
                  type="button"
                  className="qg-btn qg-btn--secondary"
                  onClick={() => handleOpenChange(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="qg-btn qg-btn--primary"
                  onClick={() => {
                    handleOpenChange(false);
                    onContactUs();
                  }}
                >
                  Contact us
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
