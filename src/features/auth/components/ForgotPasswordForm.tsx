"use client";

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
    remainingSeconds,
    resendAttempts,
    maxResendAttempts,
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

  const handleFormSubmit = async (values: ForgotPasswordFormData) => {
    await submitForgotPassword(values.email);
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isButtonDisabled = isLoading || remainingSeconds > 0 || resendAttempts >= maxResendAttempts;

  return (
    <>
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

        <Button
          className="w-full disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:opacity-100"
          type="submit"
          disabled={isButtonDisabled}
        >
          {isLoading ? "Sending..." : isSuccess ? "Resend Reset Link" : "Send Reset Link"}
        </Button>

        <AuthFormFooter text="" route="/login" routeText="Back to Log in" />
      </AuthFormCard>

      {isSuccess && (
        <div className="max-w-xl m-auto flex flex-col p-4 gap-3 rounded-sm bg-[#82F9BE4D]">
          <p role="status" className="text-xs max-w-3xs font-medium text-[#005235]">
            If an account exists with this email, we've sent a password reset link.
          </p>

          <div className="flex items-center justify-between gap-4 font-bold text-[11px] pt-3 border-t border-[#0052351A] ">
            <span className=" text-[#00523599]">Didn't receive email?</span>

            {resendAttempts >= maxResendAttempts ? (
              <span className="text-slate-light">3 attempts used. Please try again later.</span>
            ) : (
              <span className="text-primary">Resend in {formattedTime}</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
