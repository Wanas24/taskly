"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

import { useCreateProject } from "../hooks/useCreateProject";
import { useGetSingleProject } from "../hooks/useGetSingleProject";
import { useUpdateProject } from "../hooks/useUpdateProject";

import { projectSchema, type ProjectFormValues } from "../schemas/create-project.schema";
import { useRouter } from "next/navigation";

type ProjectFormProps = {
  projectId?: string;
};

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const isEditMode = Boolean(projectId);

  const {
    project,
    isLoading: isProjectLoading,
    error: projectError,
  } = useGetSingleProject(projectId);

  const {
    submitProject: createProject,
    isLoading: isCreating,
    error: createError,
  } = useCreateProject();

  const {
    submitProject: updateProject,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateProject();

  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!project) {
      return;
    }

    reset({
      title: project.name,
      description: project.description ?? "",
    });
  }, [project, reset]);

  const isLoading = isProjectLoading || isCreating || isUpdating;

  const error = projectError || createError || updateError;

  const handleFormSubmit = async (values: ProjectFormValues) => {
    setIsSuccess(false);

    try {
      if (isEditMode && projectId) {
        await updateProject(projectId, values);
      } else {
        await createProject(values);
        reset();
      }

      setIsSuccess(true);
      router.push("/projects");
    } catch {
      setIsSuccess(false);
    }
  };

  if (isEditMode && isProjectLoading) {
    return (
      <div className="space-y-6">
        <div className="h-12 w-full animate-pulse rounded-sm bg-surface-low" />
        <div className="h-32 w-full animate-pulse rounded-sm bg-surface-low" />
      </div>
    );
  }

  if (isEditMode && projectError) {
    return <div className="text-sm text-error">{projectError}</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">
      <Input
        id="title"
        type="text"
        label="Project Title"
        placeholder="Enter project title"
        error={errors.title?.message}
        disabled={isLoading}
        {...register("title")}
      />

      <Textarea
        id="description"
        label="Description"
        optional
        placeholder="Enter project description"
        error={errors.description?.message}
        disabled={isLoading}
        maxLength={500}
        {...register("description")}
      />

      {error && (
        <p role="alert" className="text-center text-sm text-error">
          {error}
        </p>
      )}

      {isSuccess && (
        <p role="status" className="text-center text-sm text-green-600">
          Project {isEditMode ? "updated" : "created"} successfully
        </p>
      )}

      <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-4">
        <Link
          href="/projects"
          className="flex h-12 items-center rounded-lg px-6 text-base font-semibold text-slate-dark"
        >
          Back
        </Link>

        <Button
          type="submit"
          disabled={isLoading}
          className="disabled:cursor-not-allowed disabled:opacity-60 max-sm:w-full"
        >
          {isLoading
            ? isEditMode
              ? "Saving..."
              : "Creating..."
            : isEditMode
              ? "Save Changes"
              : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
