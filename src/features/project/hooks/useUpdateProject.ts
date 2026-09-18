"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { updateProject } from "../services/update-project.service";
import type { ProjectFormValues } from "../schemas/create-project.schema";

export function useUpdateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitProject = async (
    projectId: string,
    values: ProjectFormValues,
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

      await updateProject(
        projectId,
        values,
        session.access_token,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed To Update Project, Try Again Later";

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