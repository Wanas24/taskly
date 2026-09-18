import LogoutButton from "./LogoutButton";
import SidebarCollapseButton from "./SidebarCollapseButton";

type SidebarFooterProps = {
  isOpen: boolean;
  isCollapsed: boolean;
  onCollapse: () => void;
};

function SidebarFooter({
  isCollapsed,
  onCollapse,
  isOpen
}: SidebarFooterProps) {
  return (
    <div className="flex flex-col gap-1">
      <SidebarCollapseButton
        isCollapsed={isCollapsed}
        onClick={onCollapse}
        isOpen={isOpen}
      />

      <LogoutButton isCollapsed={isCollapsed} />
    </div>
  );
}

export default SidebarFooter;