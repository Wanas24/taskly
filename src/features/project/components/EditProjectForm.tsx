"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

import { useProject } from "../hooks/useProject";
import { useUpdateProject } from "../hooks/useUpdateProject";

import {
  projectSchema,
  type ProjectFormValues,
} from "../schemas/create-project.schema";

type EditProjectFormProps = {
  projectId: string;
};

export default function EditProjectForm({
  projectId,
}: EditProjectFormProps) {
  const {
    project,
    isLoading: isProjectLoading,
    error: projectError,
  } = useProject(projectId);

  const {
    submitProject,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateProject();

  const [isSuccess, setIsSuccess] = useState(false);

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

  const onSubmit = async (values: ProjectFormValues) => {
    setIsSuccess(false);

    try {
      await submitProject(projectId, values);

      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
  };

  if (isProjectLoading) {
    return (
      <div className="space-y-6">
        <div className="h-12 w-full animate-pulse rounded-sm bg-surface-low" />

        <div className="h-32 w-full animate-pulse rounded-sm bg-surface-low" />
      </div>
    );
  }

  if (projectError) {
    return (
      <div className="text-sm text-error">
        {projectError}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <Input
        id="title"
        type="text"
        label="Project Title"
        placeholder="Enter project title"
        error={errors.title?.message}
        disabled={isUpdating}
        {...register("title")}
      />

      <Textarea
        id="description"
        label="Description"
        optional
        placeholder="Enter project description"
        error={errors.description?.message}
        disabled={isUpdating}
        maxLength={500}
        {...register("description")}
      />

      {updateError && (
        <p
          role="alert"
          className="text-sm text-error"
        >
          {updateError}
        </p>
      )}

      {isSuccess && (
        <p
          role="status"
          className="text-sm text-green-600"
        >
          Project updated successfully
        </p>
      )}

      <div className="flex items-center justify-between">
        <Link
          href="/project"
          className="flex h-12 items-center rounded-lg px-6 text-base font-semibold text-slate-dark"
        >
          Back
        </Link>

        <Button
          type="submit"
          disabled={isUpdating}
          className="disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}