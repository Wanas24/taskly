"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../hooks/useLogin";
import Input from "@/components/ui/Input";

import eyeIcon from "@/assets/icons/eye.svg";
import eyeOffIcon from "@/assets/icons/eye-off.svg";
import Image from "next/image";
import Button from "@/components/ui/Button";
import AuthFormHeader from "./AuthFormHeader";
import { loginSchema } from "../schemas/login-schema";
import type { LoginFormData } from "../schemas/login-schema";
import AuthFormFooter from "./AuthFormFooter";
import Link from "next/link";
import Alert from "@/components/ui/Alert";

export default function LogInForm() {
  const router = useRouter();
  const { login, error: apiError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

const onSubmit = async (data: LoginFormData) => {
  try {
    await login(data);

    router.push("/project");
  } catch {
    // Error is already handled by useLogin
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-12 max-w-xl m-auto bg-white max-sm:bg-transparent shadow-[0_24px_48px_0_#041B3C0F] max-sm:shadow-none rounded-lg"
    >
      <div className="p-12 max-sm:p-6">
        <AuthFormHeader
          title="Welcome Back"
          subTitle="Please enter your details to access your workspace"
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
        <div className="py-2 mb-6 flex gap-2 items-center justify-between">
          <div className=" flex gap-2 items-center">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 appearance-none rounded-xs border border-slate-light bg-surface-low checked:border-primary checked:bg-primary"
            />
            <p className="font-medium text-sm text-[#434654]">Remember Me</p>
          </div>
          <Link href="/forget-password" className="font-medium text-sm text-primary">
            Forgot Password?
          </Link>
        </div>

        <Alert message={apiError} />

        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}
          children={isSubmitting ? "Logging in..." : "Log in"}
        />
        <AuthFormFooter text="Don't have an account?" route="/sign-up" routeText="Sign up" />
      </div>
    </form>
  );
}
