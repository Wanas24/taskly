"use client";

import Image from "next/image";

import collapseIcon from "@/assets/icons/arrow-left.svg";

type SidebarCollapseButtonProps = {
  isOpen: boolean;
  isCollapsed: boolean;
  onClick: () => void;
};

function SidebarCollapseButton({
  isCollapsed,
  onClick,
  isOpen,
}: SidebarCollapseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={`flex items-center p-3 text-base font-medium text-slate-dark ${
        isCollapsed ? "justify-center" : "gap-3"
      } ${isOpen ? "hidden" : ""}`}
    >
      <Image
        src={collapseIcon}
        alt=""
        className="h-5 w-5 shrink-0"
      />

      {!isCollapsed && <span>Collapse</span>}
    </button>
  );
}

export default SidebarCollapseButton;