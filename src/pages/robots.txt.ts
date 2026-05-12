import type { APIRoute } from "astro";

/**
 * Dynamic robots.txt that automatically uses the current site URL.
 * When you migrate to a custom domain, just update `site` in astro.config.mjs
 * and this file's output updates with it — no edits needed here.
 */

const robotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`.trim();

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response("Site config missing", { status: 500 });
  }
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(robotsTxt(sitemapURL), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
