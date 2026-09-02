import Link from "next/link";
import { cn } from "@/lib/utils";

const authTabs = [
  { mode: "sign-in", href: "/auth/sign-in", label: "Sign in" },
  { mode: "sign-up", href: "/auth/sign-up", label: "Create account" },
] as const;

type AuthTabMode = (typeof authTabs)[number]["mode"];

export function AuthModeTabs({ active }: { active: AuthTabMode }) {
  return (
    <nav
      aria-label="Account access"
      className="inline-flex h-9 w-full items-center rounded-lg bg-muted p-[3px] text-muted-foreground"
    >
      {authTabs.map((tab) => {
        const isActive = tab.mode === active;

        return (
          <Link
            key={tab.mode}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 text-sm font-medium whitespace-nowrap transition-all hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring",
              isActive &&
                "bg-background text-foreground shadow-sm dark:border-input dark:bg-input/30"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
