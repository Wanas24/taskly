import Link from "next/link";
import { navigationLinks } from "../../../../features/project/data/navigationLinks";

type SidebarLinksProps = {
  isCollapsed: boolean;
};

function SidebarLinks({ isCollapsed }: SidebarLinksProps) {
  return (
    <nav className="flex flex-col gap-1">
      {navigationLinks.map((link) => {
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-label={isCollapsed ? link.label : undefined}
            className={`group flex rounded-sm py-2.5 px-3 text-sm font-medium text-slate-dark transition hover:bg-white hover:text-primary ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />

            {!isCollapsed && <span>{link.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export default SidebarLinks;
