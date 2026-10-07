import type { NextConfig } from "next";
import { HTML_LIMITED_BOT_UA_RE } from "next/dist/shared/lib/router/utils/html-bots";
import { aiSearchCrawlers, aiTrainingCrawlers } from "./src/lib/seo/crawlers";
import { isIndexable } from "./src/lib/seo/deployment";

const noIndexHeader = { key: "X-Robots-Tag", value: "noindex, nofollow" };

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  // Next.js streams metadata into the body for clients it does not recognise
  // as bots. AI crawlers are not on its default list and may only read
  // `<head>`, so extend the default rather than replace it.
  htmlLimitedBots: new RegExp(
    [
      HTML_LIMITED_BOT_UA_RE.source,
      ...aiSearchCrawlers,
      ...aiTrainingCrawlers,
    ].join("|"),
    "i",
  ),
  async headers() {
    return [
      // API responses are never search results.
      { source: "/api/:path*", headers: [noIndexHeader] },
      // Preview and staging deployments: a header covers every response,
      // including images and files that cannot carry a robots meta tag.
      ...(isIndexable
        ? []
        : [{ source: "/:path*", headers: [noIndexHeader] }]),
    ];
  },
};

export default nextConfig;
