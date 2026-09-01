"use client"

import * as React from "react"
import {
  ChartNoAxesCombinedIcon,
  CreditCardIcon,
  GalleryVerticalEndIcon,
  GaugeIcon,
  LayoutDashboardIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { appNavItems } from "@/lib/template-data"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Max Winter",
    email: "max@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "Base SaaS",
      logo: <GalleryVerticalEndIcon />,
      plan: "Template",
    },
    {
      name: "Northstar Labs",
      logo: <GaugeIcon />,
      plan: "Scale",
    },
    {
      name: "Atlas Studio",
      logo: <UsersIcon />,
      plan: "Pro",
    },
  ],
  navMain: appNavItems.map((item) => ({
    title: item.title,
    url: item.href,
    icon: item.icon,
  })),
  projects: [
    {
      name: "Customer pipeline",
      url: "/",
      icon: UsersIcon,
    },
    {
      name: "Revenue reporting",
      url: "/billing",
      icon: ChartNoAxesCombinedIcon,
    },
    {
      name: "Security controls",
      url: "/settings",
      icon: ShieldCheckIcon,
    },
  ],
  quickActions: [
    {
      name: "New customer",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Manage plan",
      url: "/billing",
      icon: CreditCardIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects label="Workflows" projects={data.projects} />
        <NavProjects label="Quick actions" projects={data.quickActions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
