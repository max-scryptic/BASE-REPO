import {
  publicPaths,
  publicRoutes,
  type PublicRoute,
} from "@/lib/seo/routes";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

/**
 * llms.txt (https://llmstxt.org): a plain Markdown index of the site for
 * language models and AI agents, built from `siteConfig` and `publicRoutes`.
 *
 * It complements sitemap.xml rather than replacing it: the sitemap tells
 * crawlers which URLs exist, llms.txt tells a model what each one is for.
 */
export const dynamic = "force-static";

const sectionOrder: PublicRoute["section"][] = ["Product", "Docs", "Legal"];

export function GET() {
  const sections = sectionOrder
    .map((section) => {
      const links = publicPaths
        .filter((path) => publicRoutes[path].section === section)
        .map((path) => {
          const route = publicRoutes[path];

          return `- [${route.title}](${absoluteUrl(path)}): ${route.description}`;
        });

      return links.length > 0 ? `## ${section}\n\n${links.join("\n")}` : null;
    })
    .filter(Boolean);

  const body = [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    ...sections,
    `## Optional\n\n- [Sitemap](${absoluteUrl("/sitemap.xml")}): Every public URL with its last modified date.`,
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
