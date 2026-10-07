import type { Metadata } from "next";
import { robotsFor } from "@/lib/seo/metadata";

// Account recovery and verification screens stay out of search results. Sign
// in and sign up opt back in through `publicPageMetadata`.
export const metadata: Metadata = {
  robots: robotsFor(true),
};

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return (
    <main className="flex min-h-svh bg-muted px-4 py-6 sm:px-6 sm:py-8 md:p-10">
      <div className="mx-auto my-auto w-full max-w-md">{children}</div>
    </main>
  );
}
