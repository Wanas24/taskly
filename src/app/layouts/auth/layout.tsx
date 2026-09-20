import AuthFormLogo from "@/features/auth/components/AuthFormLogo";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      <AuthFormLogo />
      {children}
    </main>
  );
}