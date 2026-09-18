import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Project title is required")
    .min(3, "Project title must be at least 3 characters.")
    .max(100, "Project title must be at most 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters.")
    .optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const createProjectSchema = projectSchema;

export type CreateProjectFormValues = ProjectFormValues;