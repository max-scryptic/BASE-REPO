import type { PlanId } from "@/lib/template-data";

export type BillingResult = {
  title: string;
  description: string;
};

type PlanChangeInput = {
  planId: PlanId;
  planName: string;
  direction: "upgrade" | "downgrade";
};

type SalesContactInput = {
  planName: string;
};

function delay(ms = 450) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const billingAdapter = {
  async changePlan({
    planId,
    planName,
    direction,
  }: PlanChangeInput): Promise<BillingResult> {
    await delay();
    void planId;

    return {
      title: direction === "upgrade" ? "Plan upgraded" : "Plan changed",
      description:
        direction === "upgrade"
          ? `Mock switch to ${planName}. Swap this call for a Stripe subscription update or checkout session.`
          : `Mock downgrade to ${planName}. A real implementation usually schedules this for the end of the billing period.`,
    };
  },

  async requestSalesContact({
    planName,
  }: SalesContactInput): Promise<BillingResult> {
    await delay();

    return {
      title: "Sales request sent",
      description: `Mock request for ${planName}. Wire this to a CRM handoff or a scheduling link before launch.`,
    };
  },
};
