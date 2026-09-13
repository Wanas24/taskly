import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

export const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
export const PASSWORD_LOWERCASE_REGEX = /[a-z]/;
export const PASSWORD_DIGIT_REGEX = /[0-9]/;
export const PASSWORD_SPECIAL_REGEX = /[!@#$%^&*]/;
export const PASSWORD_NO_WHITESPACE_REGEX = /^\S*$/;

export const getPasswordRequirements = (password: string) => ({
  minLength: password.length >= PASSWORD_MIN_LENGTH,
  uppercase: PASSWORD_UPPERCASE_REGEX.test(password),
  lowercase: PASSWORD_LOWERCASE_REGEX.test(password),
  digit: PASSWORD_DIGIT_REGEX.test(password),
  special: PASSWORD_SPECIAL_REGEX.test(password),
  hasLetterAndDigit:
    PASSWORD_UPPERCASE_REGEX.test(password) &&
    PASSWORD_LOWERCASE_REGEX.test(password) &&
    PASSWORD_DIGIT_REGEX.test(password),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .regex(/^\p{L}+(?: \p{L}+)*$/u, {
        message: "Name can only contain letters and single spaces",
      }),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "Password must be at least 8 characters")
      .max(PASSWORD_MAX_LENGTH, "Password must be at most 64 characters")
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
      .regex(PASSWORD_DIGIT_REGEX, "Password must contain a number")
      .regex(
        PASSWORD_SPECIAL_REGEX,
        "Password must contain a special character",
      ),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),

    jobTitle: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;