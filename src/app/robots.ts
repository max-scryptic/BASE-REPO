import type { MetadataRoute } from "next";
import { aiSearchCrawlers, aiTrainingCrawlers } from "@/lib/seo/crawlers";
import { disallowedPathPrefixes } from "@/lib/seo/routes";
import { absoluteUrl, isIndexable, seoConfig } from "@/lib/seo/site";

/**
 * robots.txt, generated from `src/lib/seo/`.
 *
 * A crawler obeys only the most specific group that names it, so every named
 * group repeats the shared `Disallow` lines rather than inheriting them from
 * `*`. Non-production deployments disallow everything.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const shared = { allow: "/", disallow: disallowedPathPrefixes };

  return {
    rules: [
      { userAgent: "*", ...shared },
      // Named explicitly so the intent survives a future blanket rule above.
      { userAgent: [...aiSearchCrawlers], ...shared },
      seoConfig.allowAiTraining
        ? { userAgent: [...aiTrainingCrawlers], ...shared }
        : { userAgent: [...aiTrainingCrawlers], disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
