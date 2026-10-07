import type { MetadataRoute } from "next";
import { publicPaths, publicRoutes } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/site";

/**
 * sitemap.xml, generated from `publicRoutes`. Register a page there to list
 * it here; do not add entries by hand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => {
    const route = publicRoutes[path];

    return {
      url: absoluteUrl(path),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });
}
