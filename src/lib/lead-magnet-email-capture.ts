import {
  HUBSPOT_LEAD_MAGNET_FORM_ID,
  HUBSPOT_NA1_PORTAL_ID,
} from "@/lib/constants";

/**
 * Reusable lead-magnet email capture (native UI → HubSpot Forms API).
 * Portal / form IDs from the embed:
 * `data-portal-id="47284450"` `data-form-id="fe86429e-2c1c-4f1a-9bda-a1a3285ed3b1"`
 */
export const LEAD_MAGNET_EMAIL_API_PATH = "/api/hubspot/lead-magnet" as const;

export const LEAD_MAGNET_HUBSPOT = {
  portalId: HUBSPOT_NA1_PORTAL_ID,
  formId: HUBSPOT_LEAD_MAGNET_FORM_ID,
} as const;
