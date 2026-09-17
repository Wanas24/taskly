import Image from "next/image";
import logo from "@/assets/images/logo.png"

type SidebarLogoProps = {
  isCollapsed: boolean;
};

function SidebarLogo({ isCollapsed }: SidebarLogoProps) {
  return (
    <div className="flex h-16 items-center">
      <div className="px-3 flex items-center gap-2 ">
      <Image src={logo} alt="Taskly" className="object-contain" />
        {!isCollapsed && (
          <span className="text-lg font-bold text-slate-900">
            Taskly
          </span>
        )}
      </div>
    </div>
  );
}

export default SidebarLogo;