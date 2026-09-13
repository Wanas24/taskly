"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getPasswordRequirements,
  signUpSchema,
  type SignUpFormData,
} from "../schemas/signup.schema";

import { useSignUp } from "../hooks/useSignUp";
import Input from "@/components/ui/Input";

import eyeIcon from "@/assets/icons/eye.svg";
import eyeOffIcon from "@/assets/icons/eye-off.svg";
import Image from "next/image";
import Button from "@/components/ui/Button";
import AuthFormHeader from "./AuthFormHeader";
import AuthFormFooter from "./AuthFormFooter";
import Alert from "@/components/ui/Alert";
import PasswordRequirementsField from "./PasswordRequirementsField";

export default function SignUpForm() {
  const router = useRouter();
  const { signUp, error: apiError } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-12 max-w-xl m-auto bg-white max-sm:bg-transparent shadow-[0_24px_48px_0_#041B3C0F] max-sm:shadow-none rounded-lg"
    >
      <div className="p-12 max-sm:p-6">
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
          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
            endElement={
              <Image
                onClick={() => setShowPassword(!showPassword)}
                src={showPassword ? eyeOffIcon : eyeIcon}
                alt="Show password"
              />
            }
          />

          <Input
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repeat your password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
             endElement={
              <Image
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                src={showConfirmPassword ? eyeOffIcon : eyeIcon}
                alt="Show password"
              />
            }
          />
        </div>

        <Alert message={apiError} />

       <PasswordRequirementsField control={control} />

        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}
          children={isSubmitting ? "Creating account..." : "Create account"}
        />

        <AuthFormFooter text="Already have an account?" route="/login" routeText="Log in" />
      </div>
    </form>
  );
}
