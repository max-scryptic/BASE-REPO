"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TemplateFormField } from "@/components/forms/form-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type AuthMode = "sign-in" | "sign-up" | "forgot-password" | "reset-password" | "verify";

type AuthValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const modeCopy = {
  "sign-in": {
    title: "Sign in",
    description: "Use these screens as UI-only templates for your auth provider.",
    cta: "Sign in",
  },
  "sign-up": {
    title: "Create account",
    description: "Collect the fewest fields possible, then continue onboarding.",
    cta: "Create account",
  },
  "forgot-password": {
    title: "Reset password",
    description: "Send a secure reset link through your auth provider.",
    cta: "Send reset link",
  },
  "reset-password": {
    title: "Choose new password",
    description: "Validate client-side and submit to a backend action later.",
    cta: "Update password",
  },
  verify: {
    title: "Check your inbox",
    description: "Use this as the email verification or magic-link state.",
    cta: "Resend email",
  },
} satisfies Record<AuthMode, { title: string; description: string; cta: string }>;

export function AuthForm({ mode }: { mode: AuthMode }) {
  const schema = z
    .object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
      terms: z.boolean(),
    })
    .superRefine((value, context) => {
      const needsEmail = mode !== "reset-password";
      const needsPassword =
        mode === "sign-in" || mode === "sign-up" || mode === "reset-password";

      if (mode === "sign-up" && value.name.trim().length < 2) {
        context.addIssue({
          code: "custom",
          path: ["name"],
          message: "Add your name.",
        });
      }

      if (needsEmail && !z.email().safeParse(value.email).success) {
        context.addIssue({
          code: "custom",
          path: ["email"],
          message: "Enter a valid email address.",
        });
      }

      if (needsPassword && value.password.length < 8) {
        context.addIssue({
          code: "custom",
          path: ["password"],
          message: "Use at least 8 characters.",
        });
      }

      if (
        mode === "reset-password" &&
        value.password !== value.confirmPassword
      ) {
        context.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          message: "Passwords must match.",
        });
      }

      if (mode === "sign-up" && !value.terms) {
        context.addIssue({
          code: "custom",
          path: ["terms"],
          message: "Accept the terms to continue.",
        });
      }
    });

  const form = useForm<AuthValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const copy = modeCopy[mode];
  const isVerify = mode === "verify";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{copy.description}</p>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(() => undefined)}
        >
          <Alert>
            <AlertTitle>UI only</AlertTitle>
            <AlertDescription>
              Connect this form to Clerk, Supabase Auth, Auth.js, or your own
              server action when a project needs auth.
            </AlertDescription>
          </Alert>
          {mode === "sign-up" ? (
            <TemplateFormField
              label="Name"
              placeholder="Max Winter"
              registration={form.register("name")}
              error={form.formState.errors.name}
            />
          ) : null}
          {mode !== "reset-password" ? (
            <TemplateFormField
              label="Email"
              type="email"
              placeholder="you@example.com"
              registration={form.register("email")}
              error={form.formState.errors.email}
            />
          ) : null}
          {mode === "sign-in" || mode === "sign-up" || mode === "reset-password" ? (
            <TemplateFormField
              label="Password"
              type="password"
              registration={form.register("password")}
              error={form.formState.errors.password}
            />
          ) : null}
          {mode === "reset-password" ? (
            <TemplateFormField
              label="Confirm password"
              type="password"
              registration={form.register("confirmPassword")}
              error={form.formState.errors.confirmPassword}
            />
          ) : null}
          {mode === "sign-up" ? (
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                // eslint-disable-next-line react-hooks/incompatible-library
                checked={form.watch("terms")}
                onCheckedChange={(value) => form.setValue("terms", Boolean(value))}
              />
              <div className="space-y-1">
                <Label htmlFor="terms" className="font-normal">
                  I agree to the terms and privacy policy.
                </Label>
                {form.formState.errors.terms ? (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.terms.message}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
          <Button type="submit" className="w-full">
            {copy.cta}
          </Button>
          {!isVerify ? (
            <>
              <Separator />
              <div className="flex justify-between text-sm text-muted-foreground">
                <Link href="/auth/sign-in" className="hover:text-foreground">
                  Sign in
                </Link>
                <Link href="/auth/sign-up" className="hover:text-foreground">
                  Create account
                </Link>
              </div>
            </>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
