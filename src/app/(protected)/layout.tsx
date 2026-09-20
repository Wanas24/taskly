import { ReactNode } from "react";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";


export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
