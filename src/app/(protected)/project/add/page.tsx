import ProjectFormCard from "@/features/project/components/ProjectFormCard";
import CreateProjectForm from "@/features/project/components/CreateProjectForm";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function AddProjectPage() {
  return (
    <main>
      <Breadcrumb
        items={[
          {
            label: "PROJECTS",
            href: "/project",
          },
        ]}
        currentLabel="ADD NEW PROJECT"
      />

      <ProjectFormCard title="Initialize New Project">
        <CreateProjectForm />
      </ProjectFormCard>
    </main>
  );
}
