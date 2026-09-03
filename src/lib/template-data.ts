import {
  BarChart3,
  CreditCard,
  Home,
  KeyRound,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

export const appNavItems = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Billing", href: "/billing", icon: CreditCard },
  { title: "Kitchen sink", href: "/kitchen-sink", icon: BarChart3 },
];

export const settingsSections = [
  { title: "Profile", value: "profile", icon: ShieldCheck },
  { title: "Team", value: "team", icon: Users },
  { title: "Billing", value: "billing", icon: CreditCard },
  { title: "API keys", value: "api-keys", icon: KeyRound },
];

export type Customer = {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Scale";
  status: "Active" | "Trialing" | "Past due";
  mrr: number;
};

export const customers: Customer[] = [
  {
    id: "cus_1048",
    name: "Northstar Labs",
    email: "ops@northstar.test",
    plan: "Scale",
    status: "Active",
    mrr: 2400,
  },
  {
    id: "cus_1049",
    name: "Atlas Studio",
    email: "finance@atlas.test",
    plan: "Pro",
    status: "Trialing",
    mrr: 499,
  },
  {
    id: "cus_1050",
    name: "Beacon Health",
    email: "admin@beacon.test",
    plan: "Scale",
    status: "Active",
    mrr: 1800,
  },
  {
    id: "cus_1051",
    name: "Lumen Works",
    email: "team@lumen.test",
    plan: "Free",
    status: "Past due",
    mrr: 0,
  },
  {
    id: "cus_1052",
    name: "Papertrail AI",
    email: "founders@papertrail.test",
    plan: "Pro",
    status: "Active",
    mrr: 499,
  },
];

export const metrics = [
  { label: "Monthly recurring revenue", value: "$5,198", delta: "+12.4%" },
  { label: "Active customers", value: "1,284", delta: "+8.1%" },
  { label: "Trial conversion", value: "18.6%", delta: "+3.2%" },
  { label: "Churn risk", value: "2.1%", delta: "-0.9%" },
];

export const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "For validating the first paid workspace.",
    features: ["1 workspace", "5 team seats", "Basic analytics", "Email support"],
    cta: "Start",
  },
  {
    name: "Pro",
    price: "$79",
    description: "For teams running the product every day.",
    features: [
      "3 workspaces",
      "25 team seats",
      "Usage reporting",
      "Priority support",
    ],
    cta: "Upgrade",
    featured: true,
  },
  {
    name: "Scale",
    price: "$249",
    description: "For multi-team products with tighter controls.",
    features: ["Unlimited workspaces", "SSO", "Audit log", "Dedicated support"],
    cta: "Contact sales",
  },
];
