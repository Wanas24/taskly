import ProjectFormCard from "@/features/project/components/ProjectFormCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProjectForm from "@/features/project/components/ProjectForm";

type EditProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { projectId } = await params;

  return (
    <main>
      <Breadcrumb
        items={[
          {
            label: "PROJECTS",
            href: "/projects",
          },
        ]}
        currentLabel="EDIT PROJECT"
      />

      <ProjectFormCard title="Edit Project">
        <ProjectForm projectId={projectId} />
      </ProjectFormCard>
    </main>
  );
}