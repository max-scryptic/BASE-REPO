import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site";

/**
 * Web app manifest. Gives the product a name, icon, and colors when it is
 * installed or pinned, and is one more consistent statement of the brand for
 * crawlers to read.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    lang: siteConfig.language,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: siteConfig.colors.light.background,
    theme_color: siteConfig.colors.light.background,
    categories: ["business", "productivity"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
      {
        src: "/icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
