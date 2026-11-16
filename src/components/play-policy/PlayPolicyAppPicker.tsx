"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  marketingFormControlClass,
  marketingFormFieldErrorClass,
  marketingFormLabelClass,
  marketingFormStatusErrorClass,
} from "@/lib/forms/marketing-form-classes";
import {
  isAcceptedApkFilename,
  PLAY_POLICY_MAX_UPLOAD_BYTES,
  searchPlayStore,
  type PlayStoreAppSummary,
} from "@/lib/play-policy-api";
import { cn } from "@/lib/utils";

export type PlayPolicySelection =
  | { kind: "playstore"; app: PlayStoreAppSummary }
  | { kind: "file"; file: File };

type PlayPolicyAppPickerProps = {
  projectName: string;
  onProjectNameChange: (value: string) => void;
  selection: PlayPolicySelection | null;
  onSelectionChange: (value: PlayPolicySelection | null) => void;
  onBack: () => void;
  onContinue: () => void;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PlayPolicyAppPicker({
  projectName,
  onProjectNameChange,
  selection,
  onSelectionChange,
  onBack,
  onContinue,
}: PlayPolicyAppPickerProps) {
  const projectId = useId();
  const searchId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchSeq = useRef(0);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlayStoreAppSummary[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const selectedAppId =
    selection?.kind === "playstore" ? selection.app.appId : null;
  const selectedFile = selection?.kind === "file" ? selection.file : null;

  const runSearch = useCallback(async () => {
    const q = query.trim();
    if (q.length < 1 || q.length > 200) {
      setSearchError(
        q.length > 200
          ? "Search must be 200 characters or fewer"
          : "Enter an app name to search",
      );
      return;
    }

    const seq = ++searchSeq.current;
    setSearching(true);
    setSearchError(null);
    setSearched(true);

    try {
      const data = await searchPlayStore(q, 20);
      if (seq !== searchSeq.current) return;
      setResults(data);
    } catch (err) {
      if (seq !== searchSeq.current) return;
      setResults([]);
      setSearchError(
        err instanceof Error ? err.message : "Search failed. Please try again.",
      );
    } finally {
      if (seq === searchSeq.current) setSearching(false);
    }
  }, [query]);

  const acceptFile = useCallback(
    (file: File | undefined | null) => {
      setFileError(null);
      if (!file) return;

      if (!isAcceptedApkFilename(file.name)) {
        setFileError("Only .apk and .xapk files are supported");
        return;
      }
      if (file.size > PLAY_POLICY_MAX_UPLOAD_BYTES) {
        setFileError("File must be 110 MB or smaller");
        return;
      }

      onSelectionChange({ kind: "file", file });
    },
    [onSelectionChange],
  );

  const canContinue = selection !== null;

  return (
    <div className="flex flex-col gap-5 font-sans">
      <div>
        <label htmlFor={projectId} className={marketingFormLabelClass}>
          Project name{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id={projectId}
          type="text"
          maxLength={120}
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value.slice(0, 120))}
          placeholder="Main Android App"
          className={marketingFormControlClass()}
        />
      </div>

      <div>
        <p className={cn(marketingFormLabelClass, "mb-2")}>
          Select from Play Store
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <label htmlFor={searchId} className="sr-only">
              Search the Play Store
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              maxLength={200}
              onChange={(e) => {
                setQuery(e.target.value);
                if (searchError) setSearchError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void runSearch();
                }
              }}
              placeholder="Search the Play Store by app name"
              className={marketingFormControlClass({
                invalid: Boolean(searchError),
              })}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            disabled={searching}
            onClick={() => void runSearch()}
            className="h-10 shrink-0 px-5 font-semibold"
          >
            {searching ? "Searching" : "Search"}
          </Button>
        </div>
        {searchError ? (
          <p className={marketingFormFieldErrorClass} role="alert">
            {searchError}
          </p>
        ) : null}
      </div>

      {(searching || searched) && (
        <div
          className="max-h-64 overflow-y-auto rounded-md border border-border"
          role="listbox"
          aria-label="Play Store search results"
        >
          {searching ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              Searching…
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              No apps found. Try another name, or upload an APK below.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((app) => {
                const selected = selectedAppId === app.appId;
                return (
                  <li key={app.appId}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setFileError(null);
                        onSelectionChange({ kind: "playstore", app });
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/60",
                        selected && "border-l-2 border-l-primary bg-primary/5",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- Play Store CDN icons; host not in remotePatterns */}
                      <img
                        src={app.icon}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-md bg-muted object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-foreground">
                          {app.title}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {app.developer}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      <div className="flex items-center gap-3" aria-hidden>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          or
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".apk,.xapk,application/vnd.android.package-archive"
          className="sr-only"
          onChange={(e) => {
            acceptFile(e.target.files?.[0] ?? null);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(false);
            acceptFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed px-4 py-8 text-center transition-colors",
            dragging
              ? "border-primary bg-primary/5"
              : selectedFile
                ? "border-primary/60 bg-primary/5"
                : "border-border hover:border-primary/40 hover:bg-muted/40",
          )}
        >
          {selectedFile ? (
            <>
              <span className="text-sm font-medium text-foreground">
                {selectedFile.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatBytes(selectedFile.size)} · Click or drop to replace
              </span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-foreground">
                Drop your APK or XAPK file here to upload
              </span>
              <span className="text-xs text-muted-foreground">
                or click to browse · Max 110 MB
              </span>
            </>
          )}
        </button>
        {fileError ? (
          <p className={cn(marketingFormStatusErrorClass, "mt-2")} role="alert">
            {fileError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="font-semibold"
        >
          Go back
        </Button>
        <Button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="font-semibold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
