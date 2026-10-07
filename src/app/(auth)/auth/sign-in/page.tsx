import { AuthForm } from "@/components/forms/auth-form";
import { publicPageMetadata } from "@/lib/seo/metadata";

export const metadata = publicPageMetadata("/auth/sign-in");

export default function SignInPage() {
  return <AuthForm mode="sign-in" />;
}
