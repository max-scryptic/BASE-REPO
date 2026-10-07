"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Loader2,
  MailCheck,
  TriangleAlert,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BrandMark } from "@/components/app-branding";
import { TemplateFormField } from "@/components/forms/form-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/lib/template-data";
import { authAdapter, type AuthResult } from "@/lib/auth/auth-adapter";

type AuthMode =
  | "sign-in"
  | "sign-up"
  | "forgot-password"
  | "reset-password"
  | "change-password"
  | "verify";

type AuthValues = {
  name: string;
  email: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const modeCopy = {
  "sign-in": {
    title: "Welcome back",
    description: "Sign in to pick up where you left off.",
    cta: "Sign in",
    hint: "Prepared for supabase.auth.signInWithPassword.",
  },
  "sign-up": {
    title: "Create your account",
    description: "Start your workspace in less than a minute.",
    cta: "Create account",
    hint: "Prepared for supabase.auth.signUp with an email redirect.",
  },
  "forgot-password": {
    title: "Reset password",
    description: "We will email you a secure link to choose a new password.",
    cta: "Send reset link",
    hint: "Prepared for supabase.auth.resetPasswordForEmail.",
  },
  "reset-password": {
    title: "Choose new password",
    description: "Complete the password update after a recovery link.",
    cta: "Update password",
    hint: "Prepared for supabase.auth.updateUser after recovery.",
  },
  "change-password": {
    title: "Change password",
    description: "Update the password for the active signed-in account.",
    cta: "Save password",
    hint: "Prepared for supabase.auth.updateUser with current_password.",
  },
  verify: {
    title: "Check your inbox",
    description: "Resend the verification or magic-link email when needed.",
    cta: "Resend email",
    hint: "Prepared for Supabase resend email flows.",
  },
} satisfies Record<
  AuthMode,
  { title: string; description: string; cta: string; hint: string }
>;

const ctaIcons = {
  "sign-in": ArrowRight,
  "sign-up": UserPlus,
  "forgot-password": MailCheck,
  "reset-password": KeyRound,
  "change-password": KeyRound,
  verify: MailCheck,
} satisfies Record<AuthMode, React.ComponentType<{ className?: string }>>;

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [result, setResult] = useState<
    (AuthResult & { status: "success" | "error" }) | null
  >(null);

  const schema = z
    .object({
      name: z.string(),
      email: z.string(),
      currentPassword: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .superRefine((value, context) => {
      const needsEmail = mode !== "reset-password" && mode !== "change-password";
      const needsPassword =
        mode === "sign-in" ||
        mode === "sign-up" ||
        mode === "reset-password" ||
        mode === "change-password";
      const needsConfirmation =
        mode === "sign-up" ||
        mode === "reset-password" ||
        mode === "change-password";

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

      if (mode === "change-password" && value.currentPassword.length < 8) {
        context.addIssue({
          code: "custom",
          path: ["currentPassword"],
          message: "Enter your current password.",
        });
      }

      if (
        needsPassword &&
        (value.password.length < 8 ||
          !/[a-z]/i.test(value.password) ||
          !/\d/.test(value.password))
      ) {
        context.addIssue({
          code: "custom",
          path: ["password"],
          message: "Use at least 8 characters with a letter and a number.",
        });
      }

      if (needsConfirmation && value.password !== value.confirmPassword) {
        context.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          message: "Passwords must match.",
        });
      }

    });

  const form = useForm<AuthValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const copy = modeCopy[mode];
  const needsEmail = mode !== "reset-password" && mode !== "change-password";
  const needsPassword =
    mode === "sign-in" ||
    mode === "sign-up" ||
    mode === "reset-password" ||
    mode === "change-password";
  const needsConfirmation =
    mode === "sign-up" || mode === "reset-password" || mode === "change-password";
  const showsLegalNotice = mode === "sign-in" || mode === "sign-up";
  const Icon = form.formState.isSubmitting ? Loader2 : ctaIcons[mode];

  async function onSubmit(values: AuthValues) {
    setResult(null);

    try {
      const response = await submitAuthForm(mode, values);
      setResult({ ...response, status: "success" });

      if (mode === "forgot-password" || mode === "verify") {
        form.reset({ ...form.getValues(), password: "", confirmPassword: "" });
      }

      if (mode === "reset-password" || mode === "change-password") {
        form.reset({ ...form.getValues(), currentPassword: "", password: "", confirmPassword: "" });
      }
    } catch (error) {
      setResult({
        status: "error",
        title: "Request failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <Card className="gap-0 py-8 shadow-xl shadow-primary/10 ring-0 sm:py-10 dark:shadow-black/25">
        <CardHeader className="flex flex-col items-center gap-0 px-6 text-center sm:px-10">
          <Link
            href="/"
            className="mb-8 flex min-h-11 items-center gap-2 rounded-lg px-2 font-heading text-lg font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <BrandMark className="size-11" iconClassName="size-5" />
            {appConfig.name}
          </Link>
          <CardTitle className="text-2xl text-balance">
            <h1>{copy.title}</h1>
          </CardTitle>
          <CardDescription className="mt-1.5 text-base text-balance">
            {copy.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-8 px-6 sm:px-10">
          <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
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
            {mode === "sign-up" ? (
              <TemplateFormField
                label="Name"
                placeholder="Max Winter"
                registration={form.register("name")}
                error={form.formState.errors.name}
              />
            ) : null}
            {needsEmail ? (
              <TemplateFormField
                label="Email"
                type="email"
                placeholder="you@example.com"
                registration={form.register("email")}
                error={form.formState.errors.email}
              />
            ) : null}
            {mode === "change-password" ? (
              <TemplateFormField
                label="Current password"
                type="password"
                registration={form.register("currentPassword")}
                error={form.formState.errors.currentPassword}
              />
            ) : null}
            {needsPassword ? (
              <TemplateFormField
                label={mode === "sign-in" ? "Password" : "New password"}
                type="password"
                registration={form.register("password")}
                error={form.formState.errors.password}
              />
            ) : null}
            {needsConfirmation ? (
              <TemplateFormField
                label="Confirm password"
                type="password"
                registration={form.register("confirmPassword")}
                error={form.formState.errors.confirmPassword}
              />
            ) : null}
            <Button
              type="submit"
              size="lg"
              className="h-11 w-full text-base"
              disabled={form.formState.isSubmitting}
            >
              {copy.cta}
              <Icon
                className={
                  form.formState.isSubmitting ? "size-4 animate-spin" : "size-4"
                }
              />
            </Button>
            <AuthLinks mode={mode} />
            <p className="text-center text-xs text-muted-foreground">
              Mock auth adapter. {copy.hint}
            </p>
          </form>
        </CardContent>
      </Card>
      {showsLegalNotice ? <LegalNotice /> : null}
    </div>
  );
}

async function submitAuthForm(mode: AuthMode, values: AuthValues) {
  if (mode === "sign-in") {
    return authAdapter.signIn({
      email: values.email,
      password: values.password,
    });
  }

  if (mode === "sign-up") {
    return authAdapter.signUp({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  if (mode === "forgot-password") {
    return authAdapter.requestPasswordReset({ email: values.email });
  }

  if (mode === "reset-password") {
    return authAdapter.resetPassword({ password: values.password });
  }

  if (mode === "change-password") {
    return authAdapter.changePassword({
      currentPassword: values.currentPassword,
      password: values.password,
    });
  }

  return authAdapter.resendVerification({ email: values.email });
}

function AuthTextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-medium text-foreground underline-offset-4 hover:underline"
    >
      {children}
    </Link>
  );
}

function LegalNotice() {
  return (
    <p className="px-6 text-center text-xs text-muted-foreground">
      By continuing, you agree to our{" "}
      <AuthTextLink href="/legal/terms">Terms and Conditions</AuthTextLink> and{" "}
      <AuthTextLink href="/legal/privacy">Privacy Policy</AuthTextLink>.
    </p>
  );
}

function AuthLinks({ mode }: { mode: AuthMode }) {
  if (mode === "sign-in") {
    return (
      <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <AuthTextLink href="/auth/forgot-password">Forgot password?</AuthTextLink>
        <p>
          Don&apos;t have an account?{" "}
          <AuthTextLink href="/auth/sign-up">Sign up</AuthTextLink>
        </p>
      </div>
    );
  }

  if (mode === "sign-up") {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <AuthTextLink href="/auth/sign-in">Sign in</AuthTextLink>
      </p>
    );
  }

  if (mode === "verify") {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Back to <AuthTextLink href="/auth/sign-in">Sign in</AuthTextLink>
      </p>
    );
  }

  if (mode === "forgot-password") {
    return (
      <div className="flex justify-between text-sm text-muted-foreground">
        <AuthTextLink href="/auth/sign-in">Sign in</AuthTextLink>
        <AuthTextLink href="/auth/reset-password">Preview reset</AuthTextLink>
      </div>
    );
  }

  return (
    <div className="flex justify-between text-sm text-muted-foreground">
      <AuthTextLink href="/auth/sign-in">Sign in</AuthTextLink>
      <AuthTextLink href="/auth/sign-up">Create account</AuthTextLink>
    </div>
  );
}
