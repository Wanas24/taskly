"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import {
  getProjects,
  type Project,
} from "../services/get-projects.service";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const fetchProjects = useCallback(async () => {
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

      const data = await getProjects(session.access_token);

      setProjects(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed To Get Projects, Try Again Later";

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
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    errorStatus,
    refetch: fetchProjects,
  };
}