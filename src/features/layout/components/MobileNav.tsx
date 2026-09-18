import Image from "next/image";

import { projectLinks } from "../data/projectLinks";
import ProjectsIcon from "@/assets/icons/Projects";

function MobileNav() {
  return (
    <aside className="hidden max-sm:absolute max-sm:bottom-0 max-sm:z-40 max-sm:block w-full">
      <div className="flex items-center justify-between gap-6 bg-surface-low py-4 px-6">
        {projectLinks.slice(0, 2).map((link) => (
          <div
            key={link.href}
            className="flex flex-col opacity-70 gap-0.5 items-center justify-center"
          >
            <Image src={link.icon} alt={link.label} />
            <label htmlFor="" className="text-[10px] text-slate-dark">
              {link.label}
            </label>
          </div>
        ))}

        <div className="flex flex-col opacity-70 gap-0.5 items-center justify-center">
          <ProjectsIcon className="shrink-0" />
          <label htmlFor="" className="text-[10px] text-slate-dark">
            Projects
          </label>
        </div>

        {projectLinks.slice(2, 4).map((link) => (
          <div
            key={link.href}
            className="flex flex-col opacity-70 gap-0.5 items-center justify-center"
          >
            <Image src={link.icon} alt={link.label} />
            <label htmlFor="" className="text-[10px] text-slate-dark">
              {link.label}
            </label>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default MobileNav;
