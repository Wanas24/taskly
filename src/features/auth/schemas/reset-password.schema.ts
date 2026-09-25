import { z } from "zod";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 64;

const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_LOWERCASE_REGEX = /[a-z]/;
const PASSWORD_DIGIT_REGEX = /[0-9]/;
const PASSWORD_SPECIAL_REGEX = /[!@#$%^&*]/;
const PASSWORD_NO_WHITESPACE_REGEX = /^\S*$/;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        "Password must be at least 8 characters",
      )
      .max(
        PASSWORD_MAX_LENGTH,
        "Password must be at most 64 characters",
      )
      .regex(
        PASSWORD_NO_WHITESPACE_REGEX,
        "Password must not contain whitespace",
      )
      .regex(
        PASSWORD_UPPERCASE_REGEX,
        "Password must contain an uppercase letter",
      )
      .regex(
        PASSWORD_LOWERCASE_REGEX,
        "Password must contain a lowercase letter",
      )
      .regex(
        PASSWORD_DIGIT_REGEX,
        "Password must contain a number",
      )
      .regex(
        PASSWORD_SPECIAL_REGEX,
        "Password must contain a special character",
      ),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<
  typeof resetPasswordSchema
>;