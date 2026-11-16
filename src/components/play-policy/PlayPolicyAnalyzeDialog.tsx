"use client";

import { useCallback, useId, useState } from "react";
import {
  PlayPolicyAppPicker,
  type PlayPolicySelection,
} from "@/components/play-policy/PlayPolicyAppPicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { playPolicyEmailClientSchema } from "@/lib/forms/play-policy-checker-email";
import {
  marketingFormControlClass,
  marketingFormFieldErrorClass,
  marketingFormLabelClass,
  marketingFormStatusErrorClass,
} from "@/lib/forms/marketing-form-classes";
import {
  checkQuota,
  startPlaystoreScan,
  uploadApkScan,
} from "@/lib/play-policy-api";
import { submitPlayPolicyLead } from "@/lib/play-policy-lead";
import { cn } from "@/lib/utils";

type Step = "select" | "email" | "submitting" | "success" | "limit";

type PlayPolicyAnalyzeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactUs: () => void;
};

const INITIAL = {
  step: "select" as Step,
  projectName: "",
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
  const [projectName, setProjectName] = useState(INITIAL.projectName);
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
    setProjectName(INITIAL.projectName);
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
      setStep("select");
      return;
    }

    const validEmail = parsed.data.email;
    setEmailError(null);
    setSubmittedEmail(validEmail);
    setStep("submitting");
    setUploadPct(0);

    submitPlayPolicyLead(validEmail);

    const trimmedProject = projectName.trim().slice(0, 120);
    const projectNameOpt = trimmedProject || undefined;

    try {
      if (selection.kind === "playstore") {
        const { app } = selection;
        const result = await startPlaystoreScan({
          email: validEmail,
          packageName: app.appId,
          projectName: projectNameOpt,
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
        projectName: projectNameOpt,
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
      setStep("email");
    }
  }, [email, projectName, selection]);

  const title =
    step === "success"
      ? "Scan started"
      : step === "limit"
        ? "Free scans used"
        : step === "email" || step === "submitting"
          ? "Where should we send the report?"
          : "Analyze your app";

  const description =
    step === "success"
      ? undefined
      : step === "limit"
        ? undefined
        : step === "email" || step === "submitting"
          ? "The report arrives by email in 2 to 3 hours."
          : "Pick a Play Store listing or upload an APK / XAPK. Android only.";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[85vh] max-h-[85dvh] max-w-lg overflow-y-auto border border-border/20 bg-background font-sans antialiased shadow-2xl sm:max-w-xl"
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
          <DialogTitle className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription className="font-sans text-sm text-muted-foreground sm:text-base">
              {description}
            </DialogDescription>
          ) : (
            <DialogDescription className="sr-only">
              {title}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-1">
          {step === "select" ? (
            <PlayPolicyAppPicker
              projectName={projectName}
              onProjectNameChange={setProjectName}
              selection={selection}
              onSelectionChange={setSelection}
              onBack={() => handleOpenChange(false)}
              onContinue={() => {
                setSubmitError(null);
                setStep("email");
              }}
            />
          ) : null}

          {step === "email" || step === "submitting" ? (
            <div className="flex flex-col gap-5 font-sans">
              {selection?.kind === "playstore" ? (
                <div className="flex items-center gap-3 rounded-md border border-border bg-muted/40 px-3 py-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Play Store CDN icons */}
                  <img
                    src={selection.app.icon}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 shrink-0 rounded-md bg-muted object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {selection.app.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {selection.app.developer}
                    </p>
                  </div>
                </div>
              ) : selection?.kind === "file" ? (
                <div className="rounded-md border border-border bg-muted/40 px-3 py-2.5">
                  <p className="truncate text-sm font-medium text-foreground">
                    {selection.file.name}
                  </p>
                </div>
              ) : null}

              <div>
                <label htmlFor={emailId} className={marketingFormLabelClass}>
                  Work or personal email
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
                    if (e.key === "Enter" && step === "email") {
                      e.preventDefault();
                      void startScan();
                    }
                  }}
                  className={cn(
                    marketingFormControlClass({
                      invalid: Boolean(emailError),
                    }),
                    "h-12 text-base",
                  )}
                />
                {emailError ? (
                  <p
                    id={`${emailId}-error`}
                    className={marketingFormFieldErrorClass}
                  >
                    {emailError}
                  </p>
                ) : null}
              </div>

              {step === "submitting" && selection?.kind === "file" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Uploading…</span>
                    <span>{uploadPct}%</span>
                  </div>
                  <Progress value={uploadPct} className="h-2" />
                </div>
              ) : null}

              {step === "submitting" && selection?.kind === "playstore" ? (
                <p className="text-sm text-muted-foreground" role="status">
                  Starting your scan…
                </p>
              ) : null}

              {submitError ? (
                <p
                  className={marketingFormStatusErrorClass}
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={step === "submitting"}
                  onClick={() => {
                    setSubmitError(null);
                    setStep("select");
                  }}
                  className="font-semibold"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  disabled={step === "submitting"}
                  onClick={() => void startScan()}
                  className="font-semibold"
                >
                  {step === "submitting" ? "Starting…" : "Start scan"}
                </Button>
              </div>
            </div>
          ) : null}

          {step === "success" ? (
            <div className="flex flex-col gap-5 font-sans">
              <p
                className="text-base leading-relaxed text-foreground"
                role="status"
              >
                Your report will be sent to{" "}
                <span className="font-semibold">{submittedEmail}</span> in 2
                to 3 hours.
              </p>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="font-semibold"
                >
                  Done
                </Button>
              </div>
            </div>
          ) : null}

          {step === "limit" ? (
            <div className="flex flex-col gap-5 font-sans">
              <p
                className="text-base leading-relaxed text-foreground"
                role="status"
              >
                You&apos;ve used your 5 free scans for this email. Contact us
                to continue.
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  className="font-semibold"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    handleOpenChange(false);
                    onContactUs();
                  }}
                  className="font-semibold"
                >
                  Contact us
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
