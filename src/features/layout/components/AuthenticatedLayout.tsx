import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <div className="grow flex-col ">
        <Navbar />
        {children}
      </div>
    </main>
  );
}
