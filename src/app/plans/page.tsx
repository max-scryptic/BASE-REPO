import Link from "next/link";
import { ReceiptText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PlanSelector } from "@/components/pricing/plan-selector";
import { Button } from "@/components/ui/button";

export default function PlansPage() {
  return (
    <AppShell
      title="Manage plans"
      description="Compare tiers, select a plan, and confirm the change before it reaches the billing provider."
      actions={
        <Button type="button" variant="outline" asChild>
          <Link href="/settings">
            <ReceiptText className="size-4" />
            Billing settings
          </Link>
        </Button>
      }
    >
      <PlanSelector />
    </AppShell>
  );
}
