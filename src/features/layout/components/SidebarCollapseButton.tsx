"use client";

import collapseIcon from "@/assets/icons/arrow-left.svg";

import SidebarFooterButton from "./SidebarFooterButton";

type SidebarCollapseButtonProps = {
  isOpen: boolean;
  isCollapsed: boolean;
  onClick: () => void;
};

function SidebarCollapseButton({
  isCollapsed,
  onClick,
  isOpen
}: SidebarCollapseButtonProps) {
  return (
    <SidebarFooterButton
      icon={collapseIcon}
      label="Collapse"
      ariaLabel={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      isCollapsed={isCollapsed}
      onClick={onClick}
      className={`text-slate-dark ${isOpen?"hidden": ''}`}
    />
  );
}

export default SidebarCollapseButton;