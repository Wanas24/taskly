import Link from "next/link";

import ProjectsIcon from "@/assets/icons/Projects";
import StatisticsIcon from "@/assets/icons/Statistics";

function SidebarLinks() {
  const links = [
    {
      label: "Projects",
      href: "/project",
      icon: ProjectsIcon,
    },
    {
      label: "Statistics",
      href: "/project/statistics",
      icon: StatisticsIcon,
    },
  ];

  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="group p-3 rounded-sm flex items-center gap-3 text-base font-medium text-slate-dark transition hover:bg-white hover:text-primary"
          >
            <Icon className="h-5 w-5" />

            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default SidebarLinks;