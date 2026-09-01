import { AppShell } from "@/components/app-shell";
import { PlanSelector } from "@/components/pricing/plan-selector";

export default function PlansPage() {
  return (
    <AppShell
      title="Manage plans"
      description="Compare tiers, select a plan, and confirm the change before it reaches the billing provider."
    >
      <PlanSelector />
    </AppShell>
  );
}
