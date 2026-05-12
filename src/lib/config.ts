/**
 * Site-wide configuration constants.
 *
 * Edit values here when wiring up external services.
 * Everything imports from this single file so changes propagate.
 */

/**
 * Google Analytics 4 Measurement ID.
 *
 * After creating a GA4 property at https://analytics.google.com:
 *   1. Admin → Data Streams → Web → click your stream
 *   2. Copy the Measurement ID (format: G-XXXXXXXXXX)
 *   3. Paste here and rebuild
 *
 * Leave empty to disable analytics entirely.
 * Analytics only fires in production builds — local dev never hits GA.
 */
export const GA_MEASUREMENT_ID = "";

/**
 * Master switch for analytics. Set to false to disable even if a GA ID is set.
 */
export const ANALYTICS_ENABLED = true;
