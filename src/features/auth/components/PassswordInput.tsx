"use client";

import { useState } from "react";
import Image from "next/image";
import type { ComponentProps } from "react";

import Input from "@/components/ui/Input";

import eyeIcon from "@/assets/icons/eye.svg";
import eyeOffIcon from "@/assets/icons/eye-off.svg";

type PasswordInputProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "endElement"
>;

export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      endElement={
        <button
          className="cursor-pointer"
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          onClick={() => setShowPassword((current) => !current)}
        >
          <Image
            src={showPassword ? eyeOffIcon : eyeIcon}
            alt=""
          />
        </button>
      }
    />
  );
}

