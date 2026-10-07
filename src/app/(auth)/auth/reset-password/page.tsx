import { AuthForm } from "@/components/forms/auth-form";

export const metadata = {
  title: "Choose new password",
};

export default function ResetPasswordPage() {
  return <AuthForm mode="reset-password" />;
}
