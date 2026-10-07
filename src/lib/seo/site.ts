import { appConfig } from "@/lib/template-data";

export { absoluteUrl, isIndexable, siteUrl } from "@/lib/seo/deployment";

/**
 * The single source of truth for how the product describes itself to search
 * engines, social previews, and AI answer engines.
 *
 * Rebrand here first: the root metadata, Open Graph image, web manifest,
 * robots.txt, sitemap.xml, llms.txt, and the Organization, WebSite, and
 * SoftwareApplication structured data all read from this file.
 *
 * `siteUrl` and `isIndexable` read server-side environment variables, so use
 * them from server code (metadata, route handlers, server components). The
 * static fields are safe to import anywhere.
 */
export const siteConfig = {
  name: appConfig.name,
  /** Used in titles where the bare name is ambiguous, e.g. the home page. */
  tagline: "The reusable foundation for SaaS products",
  /**
   * One or two plain sentences that say what the product is, who it is for,
   * and what it does. Answer engines quote this, so lead with the answer.
   */
  description:
    "A reusable Next.js, Tailwind, and shadcn/ui foundation for SaaS products.",
  /** BCP 47 language tag for `<html lang>`. */
  language: "en",
  /** Open Graph locale, `language_TERRITORY`. */
  locale: "en_US",
  keywords: ["SaaS", "Next.js", "dashboard", "billing", "subscriptions"],
  /**
   * Square logo of at least 112x112px for Organization structured data.
   * Served by `src/app/icon.tsx`.
   */
  logoPath: "/icon/512",
  category: "BusinessApplication",
  creator: appConfig.name,
  organization: {
    name: appConfig.name,
    /** Registered company name, if it differs from the product name. */
    legalName: undefined as string | undefined,
    /** Monitored address answer engines can surface for support. */
    email: undefined as string | undefined,
    /**
     * Official profiles (X, LinkedIn, GitHub, Crunchbase, Wikipedia). Search
     * and answer engines use these to connect mentions of the brand to the
     * site, so list every account the company controls.
     */
    sameAs: [] as string[],
  },
  /** X (Twitter) handle including the @, or undefined. */
  twitterHandle: undefined as string | undefined,
  /**
   * Fixed colors for surfaces that cannot read CSS variables: the manifest,
   * the browser `theme-color`, and generated Open Graph and icon images.
   * Keep them in step with `--background`, `--foreground`, `--primary`,
   * `--primary-foreground`, and `--muted-foreground` in `globals.css`.
   */
  colors: {
    light: { background: "#ffffff", foreground: "#0a0a0a" },
    dark: { background: "#0a0a0a", foreground: "#fafafa" },
    primary: "#171717",
    primaryForeground: "#fafafa",
    mutedForeground: "#737373",
  },
};

export const seoConfig = {
  /**
   * Let AI training crawlers (GPTBot, ClaudeBot, Google-Extended, and so on)
   * read public pages. Turning this off does not remove the site from search
   * results or from AI answers; those crawlers are listed separately in
   * `src/lib/seo/crawlers.ts`.
   */
  allowAiTraining: true,
};
