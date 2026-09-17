"use client";

import { useState } from "react";

import SidebarFooter from "./SidebarFooter";
import SidebarLinks from "./SidebarLinks";
import SidebarLogo from "./SidebarLogo";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className="shrink-0 bg-surface-low max-sm:hidden">
      <div
        className={`flex h-full flex-col justify-between p-4 ${
          isCollapsed ? "w-fit" : "w-[244px]"
        }`}
      >
        <div className="flex flex-col gap-8">
          <SidebarLogo isCollapsed={isCollapsed} />
          <SidebarLinks isCollapsed={isCollapsed} />
        </div>

        <div className="border-t border-[#C3C6D633] pt-6">
          <SidebarFooter
            isCollapsed={isCollapsed}
            onCollapse={() => setIsCollapsed((prev) => !prev)}
          />{" "}
        </div>
      </div>
    </aside>
  );
}
