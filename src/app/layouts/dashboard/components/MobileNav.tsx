import Link from "next/link";

import { projectLinks } from "../../../../features/project/data/projectLinks";
import ProjectsIcon from "@/assets/icons/projects.svg";

function MobileNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="hidden max-sm:fixed max-sm:bottom-0 max-sm:z-40 max-sm:block w-full"
    >
      <div className="flex items-center justify-between gap-6 bg-surface-low px-6 py-4">
        {projectLinks.slice(0, 2).map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center gap-0.5 opacity-70"
            >
              <Icon />

              <span className="text-[10px] text-slate-dark">{link.label}</span>
            </Link>
          );
        })}

        <Link
          href="/projects"
          className="flex flex-col items-center justify-center gap-0.5 opacity-70"
        >
          <ProjectsIcon className="shrink-0" />

          <span className="text-[10px] text-slate-dark">Projects</span>
        </Link>

        {projectLinks.slice(2, 4).map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center gap-0.5 opacity-70"
            >
              <Icon />

              <span className="text-[10px] text-slate-dark">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;
