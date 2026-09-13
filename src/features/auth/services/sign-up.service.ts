import { createClient } from "@/lib/supabase/client";
import type { SignUpFormData } from "../schemas/signup.schema";

export async function signUp(data: SignUpFormData) {
  const supabase = createClient();

  const { data: result, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        ...(data.jobTitle && {
          job_title: data.jobTitle,
        }),
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return result;
}