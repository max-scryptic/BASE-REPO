/**
 * Where this deployment lives and whether it may be indexed, resolved from
 * environment variables. No imports, so `next.config.ts` can load it too.
 * Import these from `@/lib/seo/site` in app code.
 */

function readEnv(name: string) {
  const value = process.env[name]?.trim();

  return value ? value : undefined;
}

function toOrigin(value: string) {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;

  return new URL(withProtocol).origin;
}

/**
 * The canonical origin every absolute URL is built from.
 *
 * `NEXT_PUBLIC_APP_URL` wins so canonical links always point at the real
 * domain, even from a preview deployment. On Vercel without it, production
 * uses the project's production domain and previews use their own URL.
 */
export const siteUrl = new URL(
  toOrigin(
    readEnv("NEXT_PUBLIC_APP_URL") ??
      (readEnv("VERCEL_ENV") === "production"
        ? readEnv("VERCEL_PROJECT_PRODUCTION_URL")
        : undefined) ??
      readEnv("VERCEL_URL") ??
      "http://localhost:3000",
  ),
);

/**
 * Whether search and answer engines may index this deployment.
 *
 * `SITE_INDEXING=on|off` decides explicitly. Otherwise only Vercel production
 * deployments (or a production build outside Vercel) are indexable, so
 * preview and staging URLs never compete with the real domain.
 */
export const isIndexable = (() => {
  const override = readEnv("SITE_INDEXING");

  if (override === "on") return true;
  if (override === "off") return false;

  const vercelEnv = readEnv("VERCEL_ENV");

  if (vercelEnv) return vercelEnv === "production";

  return process.env.NODE_ENV === "production";
})();

/** Resolves a path such as `/legal/terms` against the canonical origin. */
export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
