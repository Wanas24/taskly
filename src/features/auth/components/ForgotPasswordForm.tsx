"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import AuthFormCard from "./AuthFormCard";
import AuthFormHeader from "./AuthFormHeader";
import AuthFormFooter from "./AuthFormFooter";

import { useForgotPassword } from "../hooks/useForgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/forgot-password.schema";

export default function ForgotPasswordForm() {
  const {
    submitForgotPassword,
    isLoading,
    error,
    isSuccess,
  } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleFormSubmit = async (
    values: ForgotPasswordFormData,
  ) => {
    await submitForgotPassword(values.email);
  };

  return (
    <AuthFormCard onSubmit={handleSubmit(handleFormSubmit)}>
      <AuthFormHeader
        title="Forgot password?"
        subTitle="No worries, we'll send you reset instructions."
      />

      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
        disabled={isLoading}
      />

      <Alert message={error} />

      {isSuccess && (
        <p
          role="status"
          className="text-center text-sm text-green-600"
        >
          If an account exists with this email, we’ve sent a
          password reset link.
        </p>
      )}

      <Button
        className="w-full"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Reset Link"}
      </Button>

      <AuthFormFooter
        text=""
        route="/login"
        routeText="Back to Log in"
      />
    </AuthFormCard>
  );
}