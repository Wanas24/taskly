import ProjectFormCard from "@/features/project/components/ProjectFormCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import EditProjectForm from "@/features/project/components/EditProjectForm";

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
            href: "/project",
          },
        ]}
        currentLabel="EDIT PROJECT"
      />

      <ProjectFormCard title="Edit Project">
        <EditProjectForm projectId={projectId} />
      </ProjectFormCard>
    </main>
  );
}