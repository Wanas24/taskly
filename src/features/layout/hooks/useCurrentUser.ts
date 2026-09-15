"use client";

import { useEffect, useState } from "react";

import { getCurrentUser } from "../services/user.service";

export function useCurrentUser() {
  const [user, setUser] = useState<Awaited<
    ReturnType<typeof getCurrentUser>
  > | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        setError("");

        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load user information.";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return {
    user,
    isLoading,
    error,
  };
}