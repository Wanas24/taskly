"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getProjectLink, projectLinks } from "../../../../features/project/data/projectLinks";

type ProjectLinksProps = {
  projectId: string;
  onLinkClick?: () => void;
};

export default function ProjectLinks({ projectId, onLinkClick }: ProjectLinksProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      {projectLinks.map((link) => {
        const Icon = link.icon;
        const href = getProjectLink(projectId, link.path);
        const isActive = pathname === href;

        return (
          <Link
            key={link.path}
            href={href}
            onClick={onLinkClick}
            className={`flex items-center gap-3 rounded-4xl px-3 py-2 text-sm text-slate-dark hover:bg-surface-low ${
              isActive ? "bg-surface-low" : ""
            }`}
          >
            <Icon />

            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
