import { createClient } from "@/lib/supabase/client";

export async function getCurrentUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}