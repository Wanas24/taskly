import { createClient } from "@/lib/supabase/client";
import { LoginFormData } from "../schemas/login-schema";
import { setAuthMode } from "@/lib/auth/session";

export async function login(data: LoginFormData) {
  const supabase = createClient();
  const { data: result, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  setAuthMode(data.rememberMe);


  return result;
}
