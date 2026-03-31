"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const PORTAL_ID = "47284450";
const SCRIPT_SRC = `https://js.hsforms.net/forms/embed/${PORTAL_ID}.js`;

type HubSpotFormsEmbedFrameProps = {
  formId: string;
  region?: string;
  portalId?: string;
  className?: string;
};

/**
 * HubSpot "forms/embed" script + `.hs-form-frame` host (distinct from v2 `hbspt.forms.create`).
 * Loads the portal embed script once and mounts the frame div HubSpot replaces with the form.
 */
export function HubSpotFormsEmbedFrame({
  formId,
  region = "na1",
  portalId = PORTAL_ID,
  className,
}: HubSpotFormsEmbedFrameProps) {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className={cn(
        "hs-form-frame hubspot-forms-embed-frame min-h-[200px] w-full",
        className,
      )}
      data-region={region}
      data-form-id={formId}
      data-portal-id={portalId}
    />
  );
}
