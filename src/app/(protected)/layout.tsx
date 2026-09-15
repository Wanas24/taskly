import AuthenticatedLayout from "@/features/layout/components/AuthenticatedLayout";
import { ReactNode } from "react";


export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
