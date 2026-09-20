"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { getProject } from "../services/get-project.service";
import type { Project } from "../services/get-projects.service";

export function useEditProject(projectId?: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(projectId));
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const fetchProject = useCallback(async () => {
    if (!projectId) {
      return;
    }

    setIsLoading(true);
    setError("");
    setErrorStatus(null);

    try {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        const error = new Error("You are not authenticated.");

        Object.assign(error, {
          status: 401,
        });

        throw error;
      }

      const data = await getProject(projectId, session.access_token);

      setProject(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed To Get Project, Try Again Later";

      const status =
        error instanceof Error &&
        "status" in error &&
        typeof error.status === "number"
          ? error.status
          : null;

      setError(message);
      setErrorStatus(status);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    isLoading,
    error,
    errorStatus,
    refetch: fetchProject,
  };
}