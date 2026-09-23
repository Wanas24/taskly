"use client";

import { useState } from "react";

import { forgotPassword } from "../services/forgot-password.service";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const submitForgotPassword = async (email: string) => {
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      await forgotPassword(email);

      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed To Send Reset Link, Try Again Later";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitForgotPassword,
    isLoading,
    error,
    isSuccess,
  };
}