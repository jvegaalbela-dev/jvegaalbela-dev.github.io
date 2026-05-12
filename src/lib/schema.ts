/**
 * Centralized schema.org / JSON-LD generators for the site.
 *
 * Update SITE_URL when migrating to a custom domain. Everything below
 * resolves to absolute URLs anchored on this constant.
 */

import type { Tier } from "../data/pricing";

export const SITE_URL = "https://jva-dev.com";

const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** ProfessionalService is a LocalBusiness subtype that fits a service-only freelance practice. */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: "jva.dev",
    alternateName: ["JVA Dev", "Jacobo Vega-Albela Web Design"],
    description:
      "Custom Astro websites for small businesses in Rochester, NY (South Wedge). Fast, accessible, and built for local search.",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/favicon.svg`,
    logo: `${SITE_URL}/favicon.svg`,
    email: "jvegaalbela.dev@gmail.com",
    sameAs: [
      "https://www.instagram.com/jva.dev/",
      "https://www.facebook.com/profile.php?id=61589747216696",
    ],
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rochester",
      addressRegion: "NY",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Rochester, NY" },
      { "@type": "Place", name: "South Wedge, Rochester, NY" },
      { "@type": "Place", name: "Greater Rochester Area" },
    ],
    priceRange: "$2000-$8500",
    knowsAbout: [
      "Astro",
      "Web Design",
      "Web Development",
      "Local SEO",
      "Schema Markup",
      "Static Site Generation",
      "Image Optimization",
      "Accessibility",
    ],
    serviceType: "Web Design",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "jva.dev",
    description:
      "Custom Astro websites for small businesses in Rochester, NY.",
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Jacobo Vega-Albela",
    givenName: "Jacobo",
    familyName: "Vega-Albela",
    url: `${SITE_URL}/about/`,
    jobTitle: "Web Designer & Developer",
    worksFor: { "@id": BUSINESS_ID },
    sameAs: ["https://jva-music.com"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rochester",
      addressRegion: "NY",
      addressCountry: "US",
    },
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function serviceSchema(tier: Tier) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: tier.name,
    description: tier.blurb,
    provider: { "@id": BUSINESS_ID },
    areaServed: [
      { "@type": "City", name: "Rochester, NY" },
      { "@type": "Place", name: "South Wedge, Rochester, NY" },
    ],
    category: "Web Design",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: tier.fullLow,
      highPrice: tier.fullHigh,
    },
  };
}

interface PostInput {
  id: string;
  data: { title: string; description: string; pubDate: Date };
}

export function articleSchema(post: PostInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.data.title,
    description: post.data.description,
    author: { "@id": PERSON_ID },
    publisher: { "@id": BUSINESS_ID },
    datePublished: post.data.pubDate.toISOString(),
    mainEntityOfPage: `${SITE_URL}/blog/${post.id}/`,
    inLanguage: "en-US",
  };
}

interface WorkInput {
  id: string;
  data: {
    title: string;
    summary: string;
    client: string;
    pubDate: Date;
    liveUrl?: string;
  };
}

export function creativeWorkSchema(item: WorkInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.data.title,
    description: item.data.summary,
    creator: { "@id": PERSON_ID },
    datePublished: item.data.pubDate.toISOString(),
    url: `${SITE_URL}/work/${item.id}/`,
    ...(item.data.liveUrl ? { sameAs: [item.data.liveUrl] } : {}),
    inLanguage: "en-US",
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact/`,
    name: "Contact · jva.dev",
    about: { "@id": BUSINESS_ID },
  };
}
