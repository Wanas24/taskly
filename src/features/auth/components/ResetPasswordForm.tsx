"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import AuthFormCard from "./AuthFormCard";
import AuthFormHeader from "./AuthFormHeader";
import AuthFormFooter from "./AuthFormFooter";
import PasswordInput from "./PassswordInput";
import PasswordRequirements from "./PasswordRequirements";

import { useRecoveryToken } from "../hooks/useRecoveryToken";
import { useResetPassword } from "../hooks/useResetPassword";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/reset-password.schema";

export default function ResetPasswordForm() {
  const router = useRouter();

  const { accessToken, isValid, isChecking } = useRecoveryToken();

  const {
    submitResetPassword,
    isLoading,
    error,
    isSuccess,
  } = useResetPassword();

  const [redirectSeconds, setRedirectSeconds] = useState(3);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode:"onBlur"
  });

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    if (redirectSeconds <= 0) {
      router.push("/login");
      return;
    }

    const timer = setTimeout(() => {
      setRedirectSeconds((current) => current - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess, redirectSeconds, router]);

  const handleFormSubmit = async (
    values: ResetPasswordFormData,
  ) => {
    if (!accessToken) {
      return;
    }

    await submitResetPassword(values.password, accessToken);
  };

  if (isChecking) {
    return null;
  }

  if (!isValid || !accessToken) {
    return (
      <AuthFormCard>
        <AuthFormHeader
          title="Invalid reset link"
          subTitle="Invalid or expired reset link."
        />

        <Alert message="Invalid or expired reset link." />

        <AuthFormFooter
          text=""
          route="/forgot-password"
          routeText="Request a new reset link"
        />
      </AuthFormCard>
    );
  }

  return (
    <AuthFormCard onSubmit={handleSubmit(handleFormSubmit)}>
      <AuthFormHeader
        title="Create a New Password"
        subTitle="Create a new, strong password to secure your workstation
access."
      />

      <PasswordInput
        id="password"
        label="New Password"
        placeholder="New Password"
        {...register("password")}
        error={errors.password?.message}
        disabled={isLoading || isSuccess}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        disabled={isLoading || isSuccess}
      />

      <PasswordRequirements password={password} />

      <Alert message={error} />

      {isSuccess ? (
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <p className="text-sm font-medium text-green-700">
            Your password has been updated successfully. You can now log in
          </p>

          <p className="mt-2 text-xs text-green-600">
            Redirecting to login in {redirectSeconds}...
          </p>
        </div>
      ) : (
        <Button
          className="w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      )}

      {!isSuccess && (
        <AuthFormFooter
          text=""
          route="/login"
          routeText="Back to Log in"
        />
      )}
    </AuthFormCard>
  );
}