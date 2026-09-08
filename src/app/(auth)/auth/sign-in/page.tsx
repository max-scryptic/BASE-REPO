import { AuthForm } from "@/components/forms/auth-form";

export const metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return <AuthForm mode="sign-in" />;
}
