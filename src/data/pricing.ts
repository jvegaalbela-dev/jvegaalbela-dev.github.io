export interface Tier {
  id: string;
  num: string;
  name: string;
  fullLow: number;
  fullHigh: number;
  featured?: boolean;
  headline: string;
  blurb: string;
  includes: string[];
}

export interface Retainer {
  id: string;
  name: string;
  price: number;
  unit: string;
  bestFor: string;
  includes: string[];
  featured?: boolean;
}

export interface HostingPlan {
  price: number;
  unit: string;
  name: string;
  description: string;
  bestFor: string;
  includes: string[];
}

// Single source of truth for the sale. Flip `active` to false to end the sale
// across the entire site (banner disappears, prices revert).
export const sale = {
  active: true,
  discount: 0.75,
  remainingSlots: 3,
  label: "Founding client pricing",
  longBlurb:
    "I'm launching JVA/dev and taking on three founding clients at 75% off in exchange for a testimonial and the right to use the project as a case study. After those three, prices return to standard.",
  shortBlurb: "First 3 builds at 75% off.",
};

export function salePrice(low: number, high: number) {
  return {
    low: Math.round(low * (1 - sale.discount)),
    high: Math.round(high * (1 - sale.discount)),
  };
}

export const tiers: Tier[] = [
  {
    id: "basic",
    num: "01",
    name: "Basic Build",
    fullLow: 2000,
    fullHigh: 3500,
    headline: "Custom Astro site, polished and fast.",
    blurb:
      "A polished, professional online presence that loads instantly and looks the part.",
    includes: [
      "Custom Astro site, 5–7 pages",
      "Fully responsive, mobile-tested",
      "On-page SEO basics (titles, meta descriptions, alt text, clean URL slugs)",
      "Image optimization pipeline",
      "Contact form integration",
      "Deployment configured (Hosting & Care from $35/mo)",
      "Two rounds of revisions during build",
    ],
  },
  {
    id: "seo",
    num: "02",
    name: "Build + SEO",
    fullLow: 3500,
    fullHigh: 5500,
    featured: true,
    headline: "Tier 1 plus schema, keyword strategy, and on-site SEO foundation.",
    blurb:
      "Everything in Basic, plus the technical SEO work that helps your site actually get found on Google.",
    includes: [
      "Everything in Tier 1",
      "Local keyword research for your market",
      "Schema markup (LocalBusiness, Service, FAQ, Review as relevant)",
      "Validation against Google's Rich Results Test",
      "Sitemap.xml and robots.txt configuration",
      "Internal linking strategy",
      "Optimized H1/H2 hierarchy throughout",
    ],
  },
  {
    id: "cms",
    num: "03",
    name: "Build + SEO + CMS",
    fullLow: 5500,
    fullHigh: 8500,
    headline: "Tier 2 plus analytics, search console, and a CMS the client owns.",
    blurb:
      "The full package. A site you can update yourself, with measurement and strategy built in.",
    includes: [
      "Everything in Tier 2",
      "An admin dashboard for editing your own site content — no developer needed for typos, hours updates, or new staff bios",
      "Custom content schema designed around your needs",
      "GA4 installation with conversion goals configured",
      "Google Search Console setup and verification",
      "Schema validation testing",
      "Google Business Profile setup or optimization, if you have a physical location or service area",
      "Launch verification at 2 weeks — sweep of form submissions, analytics, schema, and indexability",
      "3-month check-in with traffic baseline, initial keyword rankings, and a punch list of anything broken",
      "6-month strategic review covering SEO data, what's working, and recommendations for next steps",
    ],
  },
];

// Hosting & Care is the foundation under every post-launch site.
// It's offered standalone OR bundled into every retainer plan.
export const hosting: HostingPlan = {
  price: 35,
  unit: "/mo",
  name: "Hosting & Care",
  description:
    "The foundation under every post-launch site. Hosting, SSL, backups, monitoring, and a real person to call when something breaks.",
  bestFor:
    "Clients who manage their own content and just need their site to stay healthy.",
  includes: [
    "Cloudflare Pages hosting and SSL",
    "Automated backups",
    "Uptime monitoring",
    "Security and dependency patching",
    "Email support for outages and site breakage",
  ],
};

// All retainer plans include Hosting & Care.
export const retainers: Retainer[] = [
  {
    id: "lite",
    name: "Lite",
    price: 75,
    unit: "/mo",
    bestFor: "Tier 3 clients comfortable updating their own content.",
    includes: [
      "Everything in Hosting & Care",
      "One small dev change per quarter",
      "Help with the CMS when you get stuck",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 175,
    unit: "/mo",
    featured: true,
    bestFor: "Most clients. Sustainable middle ground.",
    includes: [
      "Everything in Lite",
      "~30 minutes of edits per month",
      "Monthly performance check",
      "Priority email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 275,
    unit: "/mo",
    bestFor: "Clients treating the site as a real lead-gen channel.",
    includes: [
      "Everything in Standard",
      "Monthly SEO and analytics report",
      "Schema monitoring",
      "1–2 hours of edits or content updates per month",
      "Quarterly content / strategy recommendation",
    ],
  },
];
