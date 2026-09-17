import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <div className="grow flex-col relative">
        <Navbar />
        {children}
        <MobileNav/>
      </div>
    </main>
  );
}
