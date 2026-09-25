"use client";

import { useState } from "react";

import { resetPassword } from "../services/reset-password.service";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const submitResetPassword = async (
    password: string,
    accessToken: string,
  ) => {
    setIsLoading(true);
    setError("");

    try {
      await resetPassword(password, accessToken);

      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed To Update Password, Try Again Later";

      setError(message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitResetPassword,
    isLoading,
    error,
    isSuccess,
  };
}