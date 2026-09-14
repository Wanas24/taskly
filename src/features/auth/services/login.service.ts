import { createClient } from "@/lib/supabase/client";
import { LoginFormData } from "../schemas/login.schema";

export async function login(data: LoginFormData) {
  const supabase = createClient();
  const { data: result, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return result;
}
