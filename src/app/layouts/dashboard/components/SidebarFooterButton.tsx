import Image, { type StaticImageData } from "next/image";

type SidebarFooterButtonProps = {
  icon: StaticImageData;
  label?: string;
  ariaLabel: string;
  isCollapsed: boolean;
  className?: string;
  onClick: () => void;
};

export default function SidebarFooterButton({
  icon,
  label,
  ariaLabel,
  isCollapsed,
  onClick,
  className = "",
}: SidebarFooterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex items-center p-3 text-base font-medium ${
        isCollapsed ? "justify-center" : "gap-3"
      } ${className}`}
    >
      <Image
        src={icon}
        alt=""
        className="h-5 w-5 shrink-0"
      />

      {!isCollapsed && label && <span>{label}</span>}
    </button>
  );
}