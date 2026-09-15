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
    <div>
      <SidebarCollapseButton
        isCollapsed={isCollapsed}
        onClick={onCollapse}
      />

      <LogoutButton isCollapsed={isCollapsed} />
    </div>
  );
}

export default SidebarFooter;