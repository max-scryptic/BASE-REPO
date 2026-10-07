import { AuthForm } from "@/components/forms/auth-form";
import { publicPageMetadata } from "@/lib/seo/metadata";

export const metadata = publicPageMetadata("/auth/sign-up");

export default function SignUpPage() {
  return <AuthForm mode="sign-up" />;
}
