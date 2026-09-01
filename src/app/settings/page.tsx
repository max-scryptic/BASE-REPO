import Link from "next/link";
import { ArrowRight, CreditCard, Download, Save } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { UsageMeter } from "@/components/pricing/usage-meter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  currentPlanId,
  currentUser,
  invoices,
  paymentMethod,
  planRenewal,
  plans,
  settingsSections,
} from "@/lib/template-data";

const currentPlan = plans.find((plan) => plan.id === currentPlanId) ?? plans[0];

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      description="Reusable profile, billing, and payment settings with predictable save flows."
      actions={
        <Button type="button">
          <Save className="size-4" />
          Save changes
        </Button>
      }
    >
      <Tabs defaultValue="user" className="space-y-4">
        <TabsList className="grid h-auto grid-cols-2 md:inline-grid md:grid-cols-3">
          {settingsSections.map((section) => {
            const Icon = section.icon;

            return (
              <TabsTrigger key={section.value} value={section.value}>
                <Icon className="size-4" />
                {section.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User</CardTitle>
              <p className="text-sm text-muted-foreground">
                Personal details and notification preferences.
              </p>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={currentUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={currentUser.email}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Building reusable SaaS foundations."
                />
              </div>
              <Separator className="md:col-span-2" />
              <SettingSwitch
                title="Product updates"
                description="Receive account and feature emails."
              />
              <SettingSwitch
                title="Security alerts"
                description="Notify me about login and API-key events."
                defaultChecked
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plan</CardTitle>
              <p className="text-sm text-muted-foreground">
                {currentPlan.name} · ${currentPlan.price}/mo · {planRenewal}
              </p>
              <CardAction>
                <Button type="button" variant="outline" asChild>
                  <Link href="/plans">
                    Manage plans
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardAction>
            </CardHeader>
          </Card>
          <UsageMeter />
          <Card>
            <CardHeader>
              <CardTitle>Billing controls</CardTitle>
              <p className="text-sm text-muted-foreground">
                Billing contacts and usage guardrails.
              </p>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="billing-email">Billing email</Label>
                <Input id="billing-email" defaultValue="finance@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID</Label>
                <Input id="tax-id" placeholder="Optional" />
              </div>
              <SettingSwitch
                title="Spend alerts"
                description="Send alerts when usage reaches 80% of quota."
                defaultChecked
              />
              <SettingSwitch
                title="Automatic upgrades"
                description="Move to the next tier when quota is exceeded."
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="size-5" />
                Payment method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="font-medium">{paymentMethod.label}</div>
                <p className="text-sm text-muted-foreground">
                  {paymentMethod.expires}
                </p>
              </div>
              <Button type="button" variant="outline">
                Update payment method
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle>Invoices</CardTitle>
              <Button type="button" variant="outline" size="sm">
                <Download className="size-4" />
                Download invoices
              </Button>
            </CardHeader>
            <CardContent className="divide-y rounded-md border">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="font-medium">{invoice.id}</div>
                    <p className="text-sm text-muted-foreground">
                      {invoice.period}
                    </p>
                  </div>
                  <Badge variant="outline">{invoice.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function SettingSwitch({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border p-4">
      <div>
        <div className="font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
