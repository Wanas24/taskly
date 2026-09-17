import LogoutButton from "./LogoutButton";
import SidebarCollapseButton from "./SidebarCollapseButton";

type SidebarFooterProps = {
  isCollapsed: boolean;
  onCollapse: () => void;
};

function SidebarFooter({
  isCollapsed,
  onCollapse,
}: SidebarFooterProps) {
  return (
    <div className="flex flex-col gap-1">
      <SidebarCollapseButton
        isCollapsed={isCollapsed}
        onClick={onCollapse}
      />

      <LogoutButton isCollapsed={isCollapsed} />
    </div>
  );
}

export default SidebarFooter;