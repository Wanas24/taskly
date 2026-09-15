"use client";

import AuthFormLogo from "@/features/auth/components/AuthFormLogo";
import SidebarFooter from "./SidebarFooter";
import SidebarLinks from "./SidebarLinks";

export default function Sidebar() {
  return (
    <aside className=" shrink-0 bg-surface-low">
      <div className="px-4 h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <AuthFormLogo />
          <SidebarLinks />
        </div>
        <div className="border-t border-[#C3C6D633] pt-6">
          <SidebarFooter />
        </div>
      </div>
    </aside>
  );
}
