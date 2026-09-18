"use client";

import { useState, type ReactNode } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="relative flex grow flex-col">
        <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="px-8 py-6 pb-24 sm:pb-6">{children}</div>
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
