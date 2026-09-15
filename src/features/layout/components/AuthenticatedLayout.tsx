import type { ReactNode } from "react";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  return (
    <div className="h-screen">
      {children}
    </div>
  );
}