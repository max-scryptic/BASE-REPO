import { AuthForm } from "@/components/forms/auth-form";
import { AuthModeTabs } from "@/components/forms/auth-mode-tabs";

export const metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <div className="flex w-full flex-col gap-4">
      <AuthModeTabs active="sign-in" />
      <AuthForm mode="sign-in" />
    </div>
  );
}
