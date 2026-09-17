import Link from "next/link";
import Image from "next/image";

import { projectLinks } from "../data/projectLinks";

type ProjectLinksProps = {
  onLinkClick?: () => void;
};

export default function ProjectLinks({
  onLinkClick,
}: ProjectLinksProps) {
  return (
    <div className="flex flex-col gap-1">
      {projectLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className="flex items-center gap-3 rounded-4xl px-3 py-2 text-sm text-slate-dark"
        >
          <Image src={link.icon} alt="" />
          {link.label}
        </Link>
      ))}
    </div>
  );
}

