"use client";

import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    document.cookie = "taskly-auth-mode=; path=/; max-age=0";
    document.cookie = "taskly-browser-session=; path=/; max-age=0";

    window.location.href = "/login";
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}