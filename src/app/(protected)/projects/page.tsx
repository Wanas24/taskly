"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ProjectEmptyState from "@/features/project/components/ProjectEmptyState";
import ProjectErrorState from "@/features/project/components/ProjectErrorState";
import ProjectList from "@/features/project/components/ProjectList";
import ProjectListSkeleton from "@/features/project/components/ProjectListSkeleton";
import { useGetProjects } from "@/features/project/hooks/useGetProjects";
import ProjectPageHeader from "@/features/project/components/ProjectPageHeader";

export default function ProjectPage() {
  const router = useRouter();

  const {
    projects,
    isLoading,
    error,
    errorStatus,
    refetch,
  } = useGetProjects();

  useEffect(() => {
    if (errorStatus === 401) {
      router.replace("/login");
    }
  }, [errorStatus, router]);

  const renderContent = () => {
    if (isLoading) {
      return <ProjectListSkeleton />;
    }

    if (error) {
      return (
        <ProjectErrorState
          message={error}
          onRetry={refetch}
        />
      );
    }

    if (projects.length === 0) {
      return <ProjectEmptyState />;
    }

    return <ProjectList projects={projects} />;
  };

  return (
    <main>
      <ProjectPageHeader />

      <div className="mt-10">
        {renderContent()}
      </div>
    </main>
  );
}