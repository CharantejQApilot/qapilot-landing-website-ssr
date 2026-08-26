import { SITE_BASE_URL } from "@/lib/constants";

/** OpenAPI 3 description of public HTTP APIs on the marketing site (service-desc). */
export function getPublicOpenApiDocument(): Record<string, unknown> {
  return {
    openapi: "3.1.0",
    info: {
      title: "QApilot marketing site HTTP API",
      version: "1.0.0",
      description:
        "Public endpoints used by the qapilot.io marketing site (promo banner, forms, health).",
    },
    servers: [{ url: SITE_BASE_URL }],
    paths: {
      "/api/health": {
        get: {
          operationId: "getHealth",
          summary: "Liveness / readiness",
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { ok: { type: "boolean", const: true } },
                  },
                },
              },
            },
          },
        },
      },
      "/api/site-promo": {
        get: {
          operationId: "getSitePromo",
          summary: "Site promo banner payload",
          responses: {
            "200": { description: "JSON or null payload" },
          },
        },
      },
      "/api/hubspot/get-access": {
        post: {
          operationId: "submitGetAccessLead",
          summary: "Submit main marketing lead form (HubSpot)",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object" } } },
          },
          responses: {
            "200": { description: "Lead accepted" },
            "400": { description: "Invalid JSON" },
            "422": { description: "Validation error" },
            "502": { description: "Upstream HubSpot error" },
          },
        },
      },
      "/api/hubspot/flutter-hero": {
        post: {
          operationId: "submitFlutterHeroLead",
          summary: "Submit Flutter hero form lead (HubSpot)",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object" } } },
          },
          responses: {
            "200": { description: "Lead accepted" },
            "400": { description: "Invalid JSON" },
            "422": { description: "Validation error" },
            "502": { description: "Upstream HubSpot error" },
          },
        },
      },
      "/api/hubspot/lead-magnet": {
        post: {
          operationId: "submitLeadMagnetEmail",
          summary: "Submit lead-magnet email capture (HubSpot)",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object" } } },
          },
          responses: {
            "200": { description: "Lead accepted" },
            "400": { description: "Invalid JSON" },
            "422": { description: "Validation error" },
            "502": { description: "Upstream HubSpot error" },
          },
        },
      },
      "/api/hubspot/mcp-waitlist": {
        post: {
          operationId: "submitMcpWaitlist",
          summary: "Submit QApilot MCP early-access waitlist (HubSpot)",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object" } } },
          },
          responses: {
            "200": { description: "Lead accepted" },
            "400": { description: "Invalid JSON" },
            "422": { description: "Validation error" },
            "502": { description: "Upstream HubSpot error" },
          },
        },
      },
    },
  };
}
