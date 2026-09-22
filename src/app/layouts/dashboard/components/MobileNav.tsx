"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ProjectsIcon from "@/assets/icons/projects.svg";

import {
  getProjectLink,
  projectLinks,
} from "../../../../features/project/data/projectLinks";

function MobileNav() {
  const pathname = usePathname();

  const projectId = pathname.match(
    /^\/projects\/([^/]+)/
  )?.[1];

  const isProjectsPage = pathname === "/projects";

  return (
    <nav
      aria-label="Mobile navigation"
      className="hidden w-full max-sm:fixed max-sm:bottom-0 max-sm:z-40 max-sm:block"
    >
      <div
        className={`flex items-center bg-surface-low px-6 py-4 ${
          projectId
            ? "justify-between gap-6"
            : "justify-center"
        }`}
      >
        {/* Epics + Tasks */}
        {projectId &&
          projectLinks.slice(0, 2).map((link) => {
            const Icon = link.icon;
            const href = getProjectLink(projectId, link.path);
            const isActive = pathname === href;

            return (
              <Link
                key={link.path}
                href={href}
                className={`flex flex-col items-center justify-center gap-0.5 ${
                  isActive
                    ? "text-primary opacity-100"
                    : "text-slate-dark opacity-70"
                }`}
              >
                <Icon />

                <span className="text-[10px]">
                  {link.label}
                </span>
              </Link>
            );
          })}

        {/* Projects */}
        <Link
          href="/projects"
          className={`flex flex-col items-center justify-center gap-0.5 ${
            isProjectsPage
              ? "text-primary opacity-100"
              : "text-slate-dark opacity-70"
          }`}
        >
          <ProjectsIcon className="shrink-0" />

          <span className="text-[10px]">
            Projects
          </span>
        </Link>

        {/* Members + Details */}
        {projectId &&
          projectLinks.slice(2, 4).map((link) => {
            const Icon = link.icon;
            const href = getProjectLink(projectId, link.path);
            const isActive = pathname === href;

            return (
              <Link
                key={link.path}
                href={href}
                className={`flex flex-col items-center justify-center gap-0.5 ${
                  isActive
                    ? "text-primary opacity-100"
                    : "text-slate-dark opacity-70"
                }`}
              >
                <Icon />

                <span className="text-[10px]">
                  {link.label}
                </span>
              </Link>
            );
          })}
      </div>
    </nav>
  );
}

export default MobileNav;