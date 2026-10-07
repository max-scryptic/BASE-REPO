import type { MetadataRoute } from "next";

/**
 * Every page search and answer engines are meant to find.
 *
 * Registering a page here is what makes it public: it is listed in
 * `sitemap.xml` and `llms.txt`, and `publicPageMetadata(path)` builds its
 * title, description, canonical URL, and social preview from this entry.
 * Pages that are not registered are product surfaces and stay out of both.
 *
 * Keep `title` and `description` in step with what the page actually says.
 * Write descriptions as a direct answer to "what is on this page?", since
 * search snippets and AI answers quote them.
 */
export type PublicRoute = {
  title: string;
  description: string;
  /** Groups entries under a heading in `llms.txt`. */
  section: "Product" | "Docs" | "Legal";
  /** ISO date the content last changed in a way a reader would notice. */
  lastModified: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

export const publicRoutes = {
  "/auth/sign-in": {
    title: "Sign in",
    description: "Sign in to your account to pick up where you left off.",
    section: "Product",
    lastModified: "2026-01-01",
    changeFrequency: "yearly",
    priority: 0.5,
  },
  "/auth/sign-up": {
    title: "Create account",
    description: "Create an account and start your workspace in under a minute.",
    section: "Product",
    lastModified: "2026-01-01",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  "/legal/terms": {
    title: "Terms and Conditions",
    description:
      "Placeholder terms and conditions for the base SaaS template. Replace before launch.",
    section: "Legal",
    lastModified: "2026-01-01",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  "/legal/privacy": {
    title: "Privacy Policy",
    description:
      "Placeholder privacy policy for the base SaaS template. Replace before launch.",
    section: "Legal",
    lastModified: "2026-01-01",
    changeFrequency: "yearly",
    priority: 0.2,
  },
} satisfies Record<string, PublicRoute>;

export type PublicPath = keyof typeof publicRoutes;

export const publicPaths = Object.keys(publicRoutes) as PublicPath[];

/**
 * Prefixes no crawler should request at all, emitted as `Disallow` lines in
 * `robots.txt`.
 *
 * Product pages are deliberately not listed. They are kept out of results by
 * the `noindex` the `(app)` and auth layouts send, and a crawler blocked by
 * robots.txt never sees that tag, so a blocked URL that is linked from
 * elsewhere can still be indexed. Only add prefixes that serve no HTML.
 */
export const disallowedPathPrefixes = ["/api/"];
