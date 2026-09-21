import Link from "next/link";

import {
  getProjectLink,
  projectLinks,
} from "../../../../features/project/data/projectLinks";

type ProjectLinksProps = {
  projectId: string;
  onLinkClick?: () => void;
};

export default function ProjectLinks({
  projectId,
  onLinkClick,
}: ProjectLinksProps) {
  return (
    <div className="flex flex-col gap-1">
      {projectLinks.map((link) => {
        const Icon = link.icon;

        return (
          <Link
            key={link.path}
            href={getProjectLink(projectId, link.path)}
            onClick={onLinkClick}
            className="flex items-center gap-3 rounded-4xl px-3 py-2 text-sm text-slate-dark"
          >
            <Icon />

            {link.label}
          </Link>
        );
      })}
    </div>
  );
}