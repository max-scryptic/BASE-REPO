import type { Metadata } from "next";
import { robotsFor } from "@/lib/seo/metadata";

/**
 * Signed-in product surfaces. Everything in this group is kept out of search
 * results and AI answers, so a new product page is private by default.
 *
 * Public pages (marketing, docs, pricing) belong outside this group and should
 * be registered in `publicRoutes` in `src/lib/seo/routes.ts`.
 */
export const metadata: Metadata = {
  robots: robotsFor(true),
};

export default function AppLayout({ children }: LayoutProps<"/">) {
  return children;
}
