"use client";

import collapseIcon from "@/assets/icons/arrow-left.svg";

import SidebarFooterButton from "./SidebarFooterButton";

type SidebarCollapseButtonProps = {
  isCollapsed: boolean;
  onClick: () => void;
};

function SidebarCollapseButton({
  isCollapsed,
  onClick,
}: SidebarCollapseButtonProps) {
  return (
    <SidebarFooterButton
      icon={collapseIcon}
      label="Collapse"
      ariaLabel={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      isCollapsed={isCollapsed}
      onClick={onClick}
    />
  );
}

export default SidebarCollapseButton;