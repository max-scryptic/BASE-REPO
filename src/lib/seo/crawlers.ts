/**
 * User agents of the crawlers behind AI search and answer engines.
 *
 * Shared by `src/app/robots.ts` (who may crawl what) and `next.config.ts`
 * (who receives fully rendered `<head>` metadata instead of streamed tags).
 * Plain data with no imports so the Next.js config can load it.
 *
 * Tokens are the product tokens each vendor documents for robots.txt. Review
 * the list when a new answer engine matters to your audience.
 */

/**
 * Fetch pages to answer or cite them in a live AI search result. Blocking
 * these removes the product from ChatGPT search, Perplexity, Claude, and
 * similar answers, so they stay allowed on every public route.
 */
export const aiSearchCrawlers = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "MistralAI-User",
] as const;

/**
 * Collect pages to train foundation models. Allowing them helps models learn
 * what the product is; set `seoConfig.allowAiTraining` to `false` in
 * `src/lib/seo/site.ts` to opt out without affecting search or AI answers.
 */
export const aiTrainingCrawlers = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "cohere-training-data-crawler",
] as const;
