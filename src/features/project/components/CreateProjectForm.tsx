"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProjectSchema,
  type CreateProjectFormValues,
} from "../schemas/create-project.schema";

import { useCreateProject } from "../hooks/useCreateProject";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CreateProjectForm() {
  const { submitProject, isLoading, error } = useCreateProject();

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: CreateProjectFormValues) => {
    setIsSuccess(false);

    try {
      await submitProject(values);

      reset();
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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

      <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-4">
        <Link
          href="/project"
          className="flex h-12 items-center rounded-lg px-6 text-base font-semibold text-slate-dark"
        >
          Back
        </Link>

        <Button
          type="submit"
          disabled={isLoading}
          className="disabled:cursor-not-allowed disabled:opacity-60 max-sm:w-full"
        >
          {isLoading ? "Creating..." : "Create Project"}
        </Button>

        {error && (
          <p role="alert" className="m-auto text-center text-sm text-error">
            {error}
          </p>
        )}

        {isSuccess && (
          <p role="status" className="m-auto text-center text-sm text-green-600">
            Project created successfully
          </p>
        )}
      </div>
    </form>
  );
}
