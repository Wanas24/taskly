"use client";

import { useEffect, useState } from "react";

import { forgotPassword } from "../services/forgot-password.service";

const RESEND_COOLDOWN = 5 * 60;
const MAX_RESEND_ATTEMPTS = 4;

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((current) =>
        current > 0 ? current - 1 : 0,
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remainingSeconds]);

  const submitForgotPassword = async (email: string) => {
    if (remainingSeconds > 0) {
      return;
    }

    if (resendAttempts >= MAX_RESEND_ATTEMPTS) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await forgotPassword(email);

      setIsSuccess(true);
      setRemainingSeconds(RESEND_COOLDOWN);
      setResendAttempts((current) => current + 1);
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
    remainingSeconds,
    resendAttempts,
    maxResendAttempts: MAX_RESEND_ATTEMPTS,
  };
}