"use client";

import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signUpSchema,
  type SignUpFormData,
} from "../schemas/signup.schema";

import { useSignUp } from "../hooks/useSignUp";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthFormHeader from "./AuthFormHeader";
import AuthFormFooter from "./AuthFormFooter";
import Alert from "@/components/ui/Alert";
import PasswordInput from "./PassswordInput";
import PasswordRequirements from "./PasswordRequirements";
import AuthFormCard from "./AuthFormCard";

export default function SignUpForm() {
  const router = useRouter();
  const { signUp, error: apiError } = useSignUp();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode:"onBlur"
  });

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUp(data);

      router.push("/login");
    } catch {
      // Error is already handled by useSignUp
    }
  };

  return (
    <AuthFormCard onSubmit={handleSubmit(onSubmit)}>
      <AuthFormHeader
        title="Create your workspace"
        subTitle="Join the editorial approach to task management."
      />

      <Input
        id="name"
        label="Name"
        placeholder="Enter your full name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="yourname@company.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        id="jobTitle"
        optional
        label="Job Title"
        placeholder="e.g. Project Manager"
        {...register("jobTitle")}
        error={errors.jobTitle?.message}
      />

      <div className="flex gap-4 max-sm:flex-col max-sm:gap-0">
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
          aria-describedby="password-requirements"
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Repeat your password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Alert message={apiError} />

      <PasswordRequirements password={password} />

      <Button
        className="w-full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <AuthFormFooter
        text="Already have an account?"
        route="/login"
        routeText="Log in"
      />
    </AuthFormCard>
  );
}