"use client";

import { useState } from "react";

import SidebarFooter from "./SidebarFooter";
import SidebarLinks from "./SidebarLinks";
import SidebarHeader from "./SidebarHeader";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`shrink-0 bg-surface-low ${
        isOpen ? "fixed inset-0 z-50 w-full" : "max-sm:hidden"
      }`}
    >
      <div
        className={`flex h-full flex-col justify-between p-4 ${
          isOpen ? "w-full" : isCollapsed ? "w-fit" : "w-[244px]"
        }`}
      >
        <div className="flex flex-col gap-8">
          <SidebarHeader isOpen={isOpen} onClose={onClose} isCollapsed={isCollapsed} />

          <SidebarLinks isCollapsed={isCollapsed} />
        </div>

        <div className="border-t border-[#C3C6D633] pt-6">
          <SidebarFooter
            isCollapsed={isCollapsed}
            onCollapse={() => setIsCollapsed((prev) => !prev)}
          />
        </div>
      </div>
    </aside>
  );
}
