import ProjectFormCard from "@/features/project/components/ProjectFormCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProjectForm from "@/features/project/components/ProjectForm";

export default function AddProjectPage() {
  return (
    <main>
      <Breadcrumb
        items={[
          {
            label: "PROJECTS",
            href: "/projects",
          },
        ]}
        currentLabel="ADD NEW PROJECT"
      />

      <ProjectFormCard title="Initialize New Project">
        <ProjectForm />
      </ProjectFormCard>
    </main>
  );
}
