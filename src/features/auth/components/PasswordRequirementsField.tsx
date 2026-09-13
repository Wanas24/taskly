"use client";

import { Control, useWatch } from "react-hook-form";

import {
  getPasswordRequirements,
  type SignUpFormData,
} from "../schemas/signup.schema";
import PasswordRequirements from "./PasswordRequirements";

type PasswordRequirementsFieldProps = {
  control: Control<SignUpFormData>;
};

export default function PasswordRequirementsField({
  control,
}: PasswordRequirementsFieldProps) {
  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const passwordRequirements = getPasswordRequirements(password);

  return (
    <PasswordRequirements
      minLength={passwordRequirements.minLength}
      hasLetterAndDigit={passwordRequirements.hasLetterAndDigit}
      special={passwordRequirements.special}
    />
  );
}