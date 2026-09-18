import type { Project } from "../services/get-projects.service";
import AddProjectCard from "./AddProjectCard";

import ProjectCard from "./ProjectCard";

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectList({
  projects,
}: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
      <AddProjectCard/>
    </div>
  );
}