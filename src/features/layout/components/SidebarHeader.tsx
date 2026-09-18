import Image from "next/image";
import logo from "@/assets/images/logo.png";
import closeIcon from "@/assets/icons/close.svg";

type SidebarHeaderProps = {
  isCollapsed: boolean;
  isOpen: boolean;
  onClose: () => void;
};

function SidebarHeader({ isCollapsed, isOpen, onClose }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 px-3">
        <Image src={logo} alt="Taskly" className="object-contain" />

        {!isCollapsed && <span className="text-lg font-bold text-slate-900">Taskly</span>}
      </div>

      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="flex h-8 w-8 items-center justify-center sm:hidden"
        >
          <Image src={closeIcon} alt="" className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export default SidebarHeader;
