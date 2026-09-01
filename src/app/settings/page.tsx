import { Save } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { settingsSections } from "@/lib/template-data";

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      description="Reusable account, team, billing, and API settings layout with predictable save flows."
      actions={
        <Button type="button">
          <Save className="size-4" />
          Save changes
        </Button>
      }
    >
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid h-auto grid-cols-2 md:inline-grid md:grid-cols-4">
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
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <p className="text-sm text-muted-foreground">
                Personal details and notification preferences.
              </p>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Max Winter" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="max@example.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue="Building reusable SaaS foundations." />
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
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <p className="text-sm text-muted-foreground">
                Workspace identity and invite defaults.
              </p>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="workspace">Workspace name</Label>
                <Input id="workspace" defaultValue="Base SaaS Inc." />
              </div>
              <div className="space-y-2">
                <Label>Default role</Label>
                <Select defaultValue="member">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SettingSwitch
                title="Require SSO"
                description="Restrict workspace access to managed identity."
              />
              <SettingSwitch
                title="Invite approvals"
                description="Admins approve new member invitations."
                defaultChecked
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Controls</CardTitle>
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
        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <p className="text-sm text-muted-foreground">
                Template state for scoped keys and rotation policies.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Production", "Development"].map((key) => (
                <div
                  key={key}
                  className="flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="font-medium">{key}</div>
                    <p className="font-mono text-xs text-muted-foreground">
                      sk_live_••••••••••••••••••••••••
                    </p>
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    Rotate
                  </Button>
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
