import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function LegalLayout({ children }: LayoutProps<"/legal">) {
  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" className="w-fit">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back to dashboard
            </Link>
          </Button>
          <ThemeToggle />
        </div>
        {children}
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/legal/terms" className="hover:text-foreground">
            Terms and Conditions
          </Link>
          <Link href="/legal/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </main>
  );
}
