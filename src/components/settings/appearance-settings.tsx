"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const themeOptions: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function AppearanceSettings() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose how the app looks on this device.
        </p>
      </CardHeader>
      <CardContent>
        <div
          role="radiogroup"
          aria-label="Theme"
          className="grid gap-4 sm:grid-cols-3"
        >
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = mounted && theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "flex flex-col items-start gap-3 rounded-md border p-4 text-left transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected && "border-primary bg-accent/50"
                )}
              >
                <Icon className="size-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <p className="text-sm text-muted-foreground">
                    {option.value === "system"
                      ? "Follow the operating system."
                      : `Always use the ${option.label.toLowerCase()} palette.`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function subscribe() {
  return () => undefined;
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}
