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
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary"
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