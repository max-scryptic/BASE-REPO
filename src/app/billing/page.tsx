import { CreditCard, Download } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PricingTable, UsageMeter } from "@/components/pricing/pricing-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BillingPage() {
  return (
    <AppShell
      title="Billing"
      description="Plan selection, usage meters, invoice list, and payment method surfaces ready to wire into Stripe."
      actions={
        <Button type="button" variant="outline">
          <Download className="size-4" />
          Download invoices
        </Button>
      }
    >
      <PricingTable />
      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <UsageMeter />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="size-5" />
              Payment method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="font-medium">Visa ending in 4242</div>
              <p className="text-sm text-muted-foreground">Expires 08/2029</p>
            </div>
            <Button type="button" className="w-full" variant="outline">
              Update payment method
            </Button>
          </CardContent>
        </Card>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent className="divide-y rounded-md border">
          {["INV-0042", "INV-0041", "INV-0040"].map((invoice, index) => (
            <div
              key={invoice}
              className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="font-medium">{invoice}</div>
                <p className="text-sm text-muted-foreground">
                  {index === 0 ? "September 2026" : index === 1 ? "August 2026" : "July 2026"}
                </p>
              </div>
              <Badge variant="outline">Paid</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
