"use client";

import { useState } from "react";

import { login as loginService } from "../services/login.service";
import type { LoginFormData } from "../schemas/login-schema";

export function useLogin() {
  const [error, setError] = useState("");

  const login = async (data: LoginFormData) => {
    setError("");

    try {
      return await loginService(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setError(message);

      throw error;
    }
  };

  return {
    login,
    error,
  };
}