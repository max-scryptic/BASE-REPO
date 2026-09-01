"use client";

import { Check, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useConfirmDialog } from "@/components/use-confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { billingAdapter, type BillingResult } from "@/lib/billing/billing-adapter";
import {
  currentPlanId,
  planRenewal,
  plans,
  type Plan,
  type PlanId,
} from "@/lib/template-data";
import { cn } from "@/lib/utils";

function planById(id: PlanId) {
  // plans is a fixed template list, so the lookup always resolves.
  return plans.find((plan) => plan.id === id) as Plan;
}

export function PlanSelector() {
  const [activePlanId, setActivePlanId] = useState<PlanId>(currentPlanId);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(currentPlanId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<
    (BillingResult & { status: "success" | "error" }) | null
  >(null);
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const activePlan = planById(activePlanId);
  const selectedPlan = planById(selectedPlanId);
  const hasChange = selectedPlanId !== activePlanId;
  const direction =
    selectedPlan.price >= activePlan.price ? "upgrade" : "downgrade";
  const priceDelta = Math.abs(selectedPlan.price - activePlan.price);

  function selectPlan(planId: PlanId) {
    setSelectedPlanId(planId);
    setResult(null);
  }

  function cancelChange() {
    setSelectedPlanId(activePlanId);
    setResult(null);
  }

  async function savePlan() {
    if (!hasChange || isSubmitting) {
      return;
    }

    if (direction === "downgrade") {
      const confirmed = await confirm({
        title: `Downgrade to ${selectedPlan.name}?`,
        description: `Your workspace keeps ${selectedPlan.name} limits from the next billing period. Features above that tier stop working for everyone on the team.`,
        confirmLabel: "Downgrade",
      });

      if (!confirmed) {
        return;
      }
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      if (selectedPlan.contactSales) {
        const response = await billingAdapter.requestSalesContact({
          planName: selectedPlan.name,
        });
        setSelectedPlanId(activePlanId);
        setResult({ ...response, status: "success" });
      } else {
        const response = await billingAdapter.changePlan({
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          direction,
        });
        setActivePlanId(selectedPlan.id);
        setResult({ ...response, status: "success" });
      }
    } catch (error) {
      setResult({
        status: "error",
        title: "Plan change failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <fieldset disabled={isSubmitting}>
        <legend className="sr-only">Choose a plan</legend>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            const isActive = plan.id === activePlanId;

            return (
              <label key={plan.id} className="group flex cursor-pointer">
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  checked={isSelected}
                  onChange={() => selectPlan(plan.id)}
                  className="peer sr-only"
                />
                <Card
                  className={cn(
                    "flex-1 transition-all peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                    isSelected
                      ? "ring-2 ring-primary"
                      : "group-hover:ring-foreground/25"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      {plan.featured ? <Badge>Popular</Badge> : null}
                    </div>
                    {isActive ? (
                      <CardAction>
                        <Badge variant="outline">Current</Badge>
                      </CardAction>
                    ) : null}
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-semibold">
                        ${plan.price}
                      </span>
                      <span className="pb-1 text-sm text-muted-foreground">
                        /mo
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="size-4 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="justify-between gap-2 text-sm">
                    <span
                      className={cn(
                        "font-medium",
                        !isSelected && "text-muted-foreground"
                      )}
                    >
                      {isActive
                        ? "Current plan"
                        : isSelected
                          ? "Selected"
                          : plan.cta}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-4 place-items-center rounded-full border",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input"
                      )}
                    >
                      {isSelected ? <Check className="size-3" /> : null}
                    </span>
                  </CardFooter>
                </Card>
              </label>
            );
          })}
        </div>
      </fieldset>

      {result ? (
        <Alert variant={result.status === "error" ? "destructive" : "default"}>
          {result.status === "error" ? (
            <TriangleAlert className="size-4" />
          ) : (
            <CheckCircle2 className="size-4" />
          )}
          <AlertTitle>{result.title}</AlertTitle>
          <AlertDescription>{result.description}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="font-medium">
              {hasChange
                ? `Switching to ${selectedPlan.name}`
                : `${activePlan.name} is your current plan`}
            </div>
            <p className="text-sm text-muted-foreground">
              {changeSummary({
                hasChange,
                direction,
                priceDelta,
                selectedPlan,
              })}
            </p>
          </div>
          <div className="flex gap-2">
            {hasChange ? (
              <Button
                type="button"
                variant="outline"
                onClick={cancelChange}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            ) : null}
            <Button
              type="button"
              onClick={savePlan}
              disabled={!hasChange || isSubmitting}
            >
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              {saveLabel({ hasChange, direction, selectedPlan })}
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog />
    </div>
  );
}

function changeSummary({
  hasChange,
  direction,
  priceDelta,
  selectedPlan,
}: {
  hasChange: boolean;
  direction: "upgrade" | "downgrade";
  priceDelta: number;
  selectedPlan: Plan;
}) {
  if (!hasChange) {
    return `${planRenewal}. Select another plan to preview the change before saving.`;
  }

  if (selectedPlan.contactSales) {
    return `${selectedPlan.name} is sold with onboarding and contract review. Request a call to finish the switch.`;
  }

  return direction === "upgrade"
    ? `$${priceDelta} more per month, prorated on the next invoice.`
    : `$${priceDelta} less per month, applied at the end of the current billing period.`;
}

function saveLabel({
  hasChange,
  direction,
  selectedPlan,
}: {
  hasChange: boolean;
  direction: "upgrade" | "downgrade";
  selectedPlan: Plan;
}) {
  if (!hasChange) {
    return "Save plan";
  }

  if (selectedPlan.contactSales) {
    return "Contact sales";
  }

  return direction === "upgrade"
    ? `Upgrade to ${selectedPlan.name}`
    : `Switch to ${selectedPlan.name}`;
}
