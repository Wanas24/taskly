"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import ProjectLinks from "./ProjectLinks";

import ProjectIcon from "@/assets/icons/project.svg";
import ArrowTopIcon from "@/assets/icons/arrow-top.svg";

type ActiveProjectAccordionProps = {
  isCollapsed: boolean;
};

export default function ActiveProjectAccordion({ isCollapsed }: ActiveProjectAccordionProps) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const projectId = pathname.match(/^\/projects\/([^/]+)/)?.[1];

  const isProjectRoute = Boolean(projectId) && projectId !== "add";

  if (!isProjectRoute) {
    return null;
  }

  if (isCollapsed) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsPopupOpen((prev) => !prev)}
          aria-label={isPopupOpen ? "Close active project menu" : "Open active project menu"}
          aria-expanded={isPopupOpen}
          className="flex w-full items-center justify-center rounded-md p-3 transition hover:bg-surface-highest"
        >
          <ProjectIcon />
        </button>

        {isPopupOpen && (
          <div className="absolute left-[calc(100%+16px)] top-0 z-50 w-56 rounded-e-md bg-surface-highest p-2">
            <ProjectLinks onLinkClick={() => setIsPopupOpen(false)} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="active-project-links"
        className={`${
          isOpen ? "bg-surface-highest" : ""
        } flex w-full items-center justify-between rounded-t-md p-3 text-base font-medium text-slate-dark transition hover:bg-surface-highest`}
      >
        <div className="flex items-center gap-3">
          <ProjectIcon />

          <span className="text-sm font-semibold text-slate-dark">Active Project</span>
        </div>

        <ArrowTopIcon className={`transition-transform ${isOpen ? "" : "rotate-180"}`} />
      </button>

      {isOpen && (
        <div id="active-project-links" className="flex flex-col gap-1 rounded-b-md bg-white p-2">
          <ProjectLinks />
        </div>
      )}
    </div>
  );
}
