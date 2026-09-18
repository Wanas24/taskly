"use client";

import { useState, type ReactNode } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="relative flex grow flex-col">
        <Navbar
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        {children}

        <MobileNav />
      </div>
    </div>
  );
}