import { AuthForm } from "@/components/forms/auth-form";
import { AuthModeTabs } from "@/components/forms/auth-mode-tabs";

export const metadata = {
  title: "Create account",
};

export default function SignUpPage() {
  return (
    <div className="flex w-full flex-col gap-4">
      <AuthModeTabs active="sign-up" />
      <AuthForm mode="sign-up" />
    </div>
  );
}
