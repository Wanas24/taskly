import Link from "next/link";

import TasksIcon from "@/assets/icons/tasks.svg";
import type { Project } from "../services/get-projects.service";

type ProjectCardProps = {
  project: Project;
};

function formatCreatedAt(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg bg-white p-6 transition-shadow hover:shadow-md">
      <Link href={`/project/${project.id}`}>
        <h2 className="mb-3 line-clamp-2 text-lg font-medium text-slate-dark">
          {project.name}
        </h2>

        <p className="line-clamp-3 text-sm text-slate-medium">
          {project.description || "No description available."}
        </p>
      </Link>

      <div className="mt-auto pt-6">
        <div className="mb-4 flex justify-between">
          <Link
            href={`/project/${project.id}/epics`}
            className="flex items-center gap-1 text-primary"
          >
            <TasksIcon/>
            <span>Epics</span>
          </Link>

          <Link
            href={`/project/${project.id}/tasks`}
            className="flex items-center gap-1"
          >
            <TasksIcon />
            <span>Tasks</span>
          </Link>

          <Link
            href={`/project/${project.id}/members`}
            className="flex items-center gap-1"
          >
            <TasksIcon />
            <span>Members</span>
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-[rgba(195,198,214,0.1)] pt-[18.5px]">
          <p className="text-[11px] font-bold text-surface-medium">
            Created At
          </p>

          <p className="text-sm font-medium text-[#434654]">
            {formatCreatedAt(project.created_at)}
          </p>
        </div>
      </div>
    </article>
  );
}