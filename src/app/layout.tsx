import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import { robotsFor } from "@/lib/seo/metadata";
import { siteConfig, siteUrl } from "@/lib/seo/site";
import "./globals.css";

/**
 * Site-wide defaults. Pages refine these with `createMetadata` or
 * `publicPageMetadata` from `src/lib/seo/metadata.ts`.
 *
 * No canonical URL is set here on purpose: a canonical in the root layout is
 * inherited by every page that does not set its own, which tells search
 * engines that every page is a duplicate of the home page.
 *
 * Tab titles are pipe-delimited, never colon-delimited: `<AppName> | <tagline>`
 * for the home page and `<PageName> | <AppName>` everywhere else. Pages set
 * only the bare page name and the template adds the rest.
 */
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  category: siteConfig.category,
  creator: siteConfig.creator,
  publisher: siteConfig.organization.name,
  robots: robotsFor(),
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  appleWebApp: {
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  // Ownership tokens for search consoles. Set the env vars rather than
  // committing tokens, so each deployment can verify its own property.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.YANDEX_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: siteConfig.colors.light.background,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: siteConfig.colors.dark.background,
    },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
