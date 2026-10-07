import { AuthForm } from "@/components/forms/auth-form";

export const metadata = {
  title: "Verify your email",
};

export default function VerifyPage() {
  return <AuthForm mode="verify" />;
}
