import { Check } from "lucide-react";
import { plans } from "@/lib/template-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function PricingTable() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={cn(
            "relative",
            plan.featured && "border-primary shadow-sm"
          )}
        >
          {plan.featured ? (
            <Badge className="absolute right-4 top-4">Popular</Badge>
          ) : null}
          <CardHeader>
            <CardTitle className="text-lg">{plan.name}</CardTitle>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-semibold">{plan.price}</span>
              <span className="pb-1 text-sm text-muted-foreground">/mo</span>
            </div>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="size-4 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function UsageMeter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Usage</CardTitle>
        <p className="text-sm text-muted-foreground">
          Standard billing components for quota-backed SaaS products.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {[
          { label: "API calls", value: 68, caption: "68,240 of 100,000" },
          { label: "Team seats", value: 44, caption: "11 of 25" },
          { label: "Storage", value: 22, caption: "44GB of 200GB" },
        ].map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground">{item.caption}</span>
            </div>
            <Progress value={item.value} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
