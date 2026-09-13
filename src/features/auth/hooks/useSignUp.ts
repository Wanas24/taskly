"use client";

import { useState } from "react";

import { signUp as signUpService } from "../services/sign-up.service";
import type { SignUpFormData } from "../schemas/signup.schema";

export function useSignUp() {
  const [error, setError] = useState("");

  const signUp = async (data: SignUpFormData) => {
    setError("");

    try {
      return await signUpService(data);
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
    signUp,
    error,
  };
}