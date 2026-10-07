import { AuthForm } from "@/components/forms/auth-form";

export const metadata = {
  title: "Change password",
};

export default function ChangePasswordPage() {
  return <AuthForm mode="change-password" />;
}
