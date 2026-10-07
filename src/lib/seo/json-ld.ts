import type {
  BreadcrumbList,
  FAQPage,
  Organization,
  SoftwareApplication,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import { publicRoutes, type PublicPath } from "@/lib/seo/routes";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";
import { plans } from "@/lib/template-data";

/**
 * Builders for schema.org structured data, rendered with `<JsonLd>` from
 * `src/components/seo/json-ld.tsx`.
 *
 * Search engines use structured data for rich results; answer engines use it
 * to resolve who the company is, what the product does, and what it costs.
 * Every builder reads `siteConfig`, so entities stay consistent across pages
 * and link to each other through stable `@id` URLs.
 *
 * Only describe what is visible on the page. Markup that disagrees with the
 * page can cost rich results and is ignored by answer engines.
 */

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");
const softwareId = absoluteUrl("/#software");

export function organizationJsonLd(): WithContext<Organization> {
  const { organization } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: organization.name,
    legalName: organization.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(siteConfig.logoPath),
    email: organization.email,
    sameAs: organization.sameAs.length > 0 ? organization.sameAs : undefined,
  };
}

export function websiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    inLanguage: siteConfig.language,
    publisher: { "@id": organizationId },
  };
}

/**
 * The product as a SaaS application, with one offer per self-serve plan in
 * `plans`. Price questions are among the most common ones answer engines get,
 * and this is where they read the answer from.
 */
export function softwareApplicationJsonLd(): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    applicationCategory: siteConfig.category,
    operatingSystem: "Web",
    publisher: { "@id": organizationId },
    offers: plans
      .filter((plan) => !plan.contactSales)
      .map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.description,
        price: plan.price,
        priceCurrency: "USD",
        category: "subscription",
      })),
  };
}

/** A registered public page, with its last-modified date. */
export function webPageJsonLd(path: PublicPath): WithContext<WebPage> {
  const route = publicRoutes[path];

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name: route.title,
    description: route.description,
    dateModified: route.lastModified,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": websiteId },
    breadcrumb: breadcrumbJsonLd([
      { name: siteConfig.name, path: "/" },
      { name: route.title, path },
    ]),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type FaqItem = { question: string; answer: string };

/**
 * Question and answer pairs. Render the same pairs visibly with `<FaqSection>`,
 * which emits this for you.
 */
export function faqJsonLd(items: FaqItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
