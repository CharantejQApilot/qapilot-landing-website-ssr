"use client";

import { useEffect, useRef, useState } from 'react';

// Extend the Window interface to include dataLayer and gtag functions
declare global {
  interface Window {
    dataLayer?: any[];
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

interface HubSpotEmbedFormProps {
  formId: string;
  portalId: string;
  region?: string;
  className?: string;
}

// Shared script loading logic
let hubspotScriptLoaded = false;
let hubspotScriptLoading = false;
const hubspotLoadCallbacks: (() => void)[] = [];

const loadHubSpotScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if ((window as any).hbspt?.forms) {
      resolve();
      return;
    }

    if (hubspotScriptLoading) {
      hubspotLoadCallbacks.push(resolve);
      return;
    }

    const existingScript = document.querySelector('script[src*="js.hsforms.net/forms/v2.js"]');
    if (existingScript) {
      const poll = setInterval(() => {
        if ((window as any).hbspt?.forms) {
          clearInterval(poll);
          hubspotScriptLoaded = true;
          resolve();
        }
      }, 50);
      setTimeout(() => clearInterval(poll), 10000);
      return;
    }

    hubspotScriptLoading = true;
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    script.async = true;

    script.onload = () => {
      const poll = setInterval(() => {
        if ((window as any).hbspt?.forms) {
          clearInterval(poll);
          hubspotScriptLoaded = true;
          hubspotScriptLoading = false;
          resolve();
          hubspotLoadCallbacks.forEach(cb => cb());
          hubspotLoadCallbacks.length = 0;
        }
      }, 50);
      setTimeout(() => clearInterval(poll), 10000);
    };

    script.onerror = () => {
      hubspotScriptLoading = false;
      console.error('Failed to load HubSpot script');
    };

    document.head.appendChild(script);
  });
};

const HubSpotEmbedForm = ({ 
  formId, 
  portalId, 
  region = "na1", 
  className = "" 
}: HubSpotEmbedFormProps) => {
  const formRef = useRef<HTMLDivElement>(null);
  const formCreatedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const createForm = async () => {
      if (formCreatedRef.current || !formRef.current) return;

      try {
        await loadHubSpotScript();

        if (!isMounted || !formRef.current || formCreatedRef.current) return;

        // Generate unique container ID
        const containerId = `hubspot-form-${formId}-${Date.now()}`;
        formRef.current.id = containerId;

        if ((window as any).hbspt?.forms) {
          (window as any).hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: `#${containerId}`,
            onFormReady: () => {
              if (isMounted) {
                setIsLoading(false);
                formCreatedRef.current = true;
              }
            },
            onFormSubmit: function() {
              (window as any).dataLayer = (window as any).dataLayer || [];
              (window as any).dataLayer.push({
                event: "hubspotFormSubmit",
                formId: formId,
                formName: "Embedded Form"
              });

              // Call Google Ads conversion tracking if available (for Flutter page)
              if (typeof window.gtag_report_conversion === 'function') {
                window.gtag_report_conversion();
              }
            }
          });

          // Fallback: Hide loading after 3 seconds if onFormReady doesn't fire
          setTimeout(() => {
            if (isMounted && isLoading) {
              setIsLoading(false);
              formCreatedRef.current = true;
            }
          }, 3000);
        }
      } catch (error) {
        console.error('Error creating HubSpot form:', error);
        if (isMounted) setIsLoading(false);
      }
    };

    createForm();

    return () => {
      isMounted = false;
    };
  }, [formId, portalId, region]);

  useEffect(() => {
    // Add custom styles for HubSpot form (only once)
    const styleId = 'hubspot-form-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .hs-form {
        font-family: inherit;
      }
      .hs-form-field {
        margin-bottom: 1rem;
      }
      .hs-form-field > label {
        display: block;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: hsl(var(--foreground));
        font-size: 0.875rem;
      }
      .hs-input {
        width: 100% !important;
        height: 2.5rem !important;
        box-sizing: border-box !important;
        padding: 0.5rem 0.75rem !important;
        border: 1px solid hsl(var(--border)) !important;
        border-radius: 0.375rem !important;
        background-color: hsl(var(--background)) !important;
        color: hsl(var(--foreground)) !important;
        font-size: 0.875rem !important;
        line-height: 1.25rem !important;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
        transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out !important;
      }
      .hs-input::placeholder {
        color: hsl(var(--muted-foreground)) !important;
        opacity: 1 !important;
      }
      .hs-input:focus {
        outline: none !important;
        border-color: hsl(var(--ring)) !important;
        box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring)) !important;
      }
      select.hs-input {
        cursor: pointer !important;
      }
      textarea.hs-input {
        height: auto !important;
        min-height: 5rem !important;
        padding-top: 0.75rem !important;
        padding-bottom: 0.75rem !important;
      }
      .hs-form-required {
        color: hsl(var(--destructive)) !important;
      }
      .hs-button {
        background-color: hsl(var(--primary)) !important;
        color: hsl(var(--primary-foreground)) !important;
        border: none !important;
        padding: 0.75rem 2rem !important;
        border-radius: 9999px !important;
        font-weight: 600 !important;
        font-size: 1rem !important;
        cursor: pointer !important;
        transition: background-color 0.2s ease-in-out !important;
        width: 100% !important;
      }
      .hs-button:hover {
        background-color: hsl(var(--primary) / 0.9) !important;
      }
      .hs-button:focus {
        outline: none !important;
        box-shadow: 0 0 0 2px hsl(var(--primary) / 0.1) !important;
      }
      .hs-error-msgs {
        color: hsl(var(--destructive)) !important;
        font-size: 0.75rem !important;
        margin-top: 0.25rem !important;
      }
      .hs-error-msg {
        list-style: none !important;
      }
      .hs-form-field .hs-form-tooltip {
        display: none !important;
      }
      .hs-form .hs-form-field .hs-field-desc {
        color: hsl(var(--muted-foreground)) !important;
        font-size: 0.75rem !important;
        margin-top: 0.25rem !important;
      }
      .hs-dependent-field {
        margin-top: 1rem !important;
      }
      .multi-container {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 0.5rem !important;
      }
      .hs-form-checkbox-display,
      .hs-form-radio-display {
        color: hsl(var(--foreground)) !important;
        font-size: 0.875rem !important;
      }
      input[type="checkbox"],
      input[type="radio"] {
        margin-right: 0.5rem !important;
        accent-color: hsl(var(--primary)) !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className={`hubspot-form-container ${className}`}>
      <div 
        ref={formRef}
        className="hs-form-frame w-full rounded-lg"
        style={{ minHeight: isLoading ? '100px' : 'auto' }}
      />
    </div>
  );
};

export default HubSpotEmbedForm;
