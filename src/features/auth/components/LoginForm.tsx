"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../hooks/useLogin";
import Input from "@/components/ui/Input";

import Button from "@/components/ui/Button";
import AuthFormHeader from "./AuthFormHeader";
import { loginSchema } from "../schemas/login.schema";
import type { LoginFormData } from "../schemas/login.schema";
import AuthFormFooter from "./AuthFormFooter";
import Link from "next/link";
import Alert from "@/components/ui/Alert";
import PasswordInput from "./PassswordInput";
import AuthFormCard from "./AuthFormCard";

export default function LogInForm() {
  const router = useRouter();
  const { login, error: apiError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
    rememberMe: false,
  },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);

      router.push("/projects");
    } catch {
      // Error is already handled by useLogin
    }
  };

  return (
    <AuthFormCard onSubmit={handleSubmit(onSubmit)}>
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
      <PasswordInput
        id="password"
        label="Password"
        placeholder="Password"
        {...register("password")}
        error={errors.password?.message}
      />
      <div className="py-2 mb-6 flex gap-2 items-center justify-between">
        <div className=" flex gap-2 items-center">
          <input
            id="rememberMe"
            type="checkbox"
            {...register("rememberMe")}
            className="h-4 w-4 appearance-none rounded-xs border border-slate-light bg-surface-low checked:border-primary checked:bg-primary"
          />
          <label htmlFor="rememberMe" className="font-medium text-sm text-[#434654]">
            Remember Me
          </label>
        </div>
        <Link href="/forget-password" className="font-medium text-sm text-primary">
          Forgot Password?
        </Link>
      </div>

      <Alert message={apiError} />

      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>

      <AuthFormFooter text="Don't have an account?" route="/sign-up" routeText="Sign up" />
    </AuthFormCard>
  );
}
