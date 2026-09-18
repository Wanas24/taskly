"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { createProject } from "../services/create-project.service";
import type { CreateProjectFormValues } from "../schemas/create-project.schema";

export function useCreateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitProject = async (
    values: CreateProjectFormValues,
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("You are not authenticated.");
      }

      await createProject(values, session.access_token);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed To Add New Project, Try Again Later";

      setError(message);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitProject,
    isLoading,
    error,
  };
}