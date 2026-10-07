import type { Metadata } from "next";
import { publicRoutes, type PublicPath } from "@/lib/seo/routes";
import { isIndexable, siteConfig } from "@/lib/seo/site";

/**
 * The robots directives for a page. Every page states them explicitly rather
 * than inheriting, so a public page inside a `noindex` layout (sign in, inside
 * the auth layout) is still indexable, and nothing is indexable on a preview
 * deployment.
 */
export function robotsFor(noIndex = false): Metadata["robots"] {
  if (!isIndexable) {
    return { index: false, follow: false };
  }

  if (noIndex) {
    // Following links from a private page is harmless and lets crawlers
    // reach public pages it links to.
    return { index: false, follow: true };
  }

  return {
    index: true,
    follow: true,
    // Allow full-length snippets and large image previews. Without these,
    // search results and AI answers may truncate quotes from the page.
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  };
}

/**
 * The site-wide social preview served by `src/app/opengraph-image.tsx`.
 *
 * Next.js only attaches a file-based image to pages that do not set
 * `openGraph` themselves, so `createMetadata` names it explicitly. A page with
 * its own `opengraph-image` file still wins: file-based images take priority
 * over config in the same segment.
 */
export const defaultSocialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.tagline}`,
};

type PageMetadataOptions = {
  title: string;
  description?: string;
  /** Path of the page, e.g. `/legal/terms`. Sets the canonical URL. */
  path?: string;
  /** Keep the page out of search results and AI answers. */
  noIndex?: boolean;
  /** Open Graph type. Use `article` for dated editorial content. */
  type?: "website" | "article";
  /** ISO dates for `article` pages. */
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds page metadata that keeps the site-wide defaults intact.
 *
 * Next.js merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's `openGraph` object entirely, dropping `siteName` and `locale`. This
 * helper always re-states them, sets a self-referencing canonical when a path
 * is given, and mirrors title and description into Open Graph and X cards.
 *
 * Pages share `defaultSocialImage` unless they add an `opengraph-image.tsx` in
 * their own route segment.
 */
export function createMetadata({
  title,
  description,
  path,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title,
      description,
      url: path,
      images: [defaultSocialImage],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultSocialImage],
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
    robots: robotsFor(noIndex),
  };
}

/**
 * Metadata for a page registered in `publicRoutes`. Use this for every public
 * page so its title, description, and canonical URL match the sitemap and
 * llms.txt entries exactly.
 */
export function publicPageMetadata(path: PublicPath): Metadata {
  const route = publicRoutes[path];

  return createMetadata({
    title: route.title,
    description: route.description,
    path,
  });
}
