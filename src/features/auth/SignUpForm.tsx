"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signUpSchema,
  type SignUpFormData,
} from "./schemas/sign-up.schema";

import { signUp } from "./services/auth.service";
import Input from "@/components/ui/Input";

export default function SignUpForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setApiError("");

    try {
      await signUp(data);

      router.push("/login");
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="name"
        label="Name"
        placeholder="Enter your name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        id="jobTitle"
        label="Job Title"
        placeholder="Enter your job title"
        {...register("jobTitle")}
        error={errors.jobTitle?.message}
      />

      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      {apiError && (
        <div
          role="alert"
          className="rounded-lg border border-error/20 bg-error/5 px-4 py-3 text-sm text-error"
        >
          {apiError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}