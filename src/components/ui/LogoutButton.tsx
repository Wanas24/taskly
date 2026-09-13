"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");

    const supabase = createClient();

    const { error: signOutError } = await supabase.auth.signOut();

    // Always clear local session cookies, even if Supabase signOut fails.
    document.cookie = "taskly-auth-mode=; path=/; max-age=0";
    document.cookie = "taskly-browser-session=; path=/; max-age=0";

    if (signOutError) {
      setError("Logout failed. Please try again.");
      return;
    }

    window.location.href = "/login";
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>

      {error && (
        <p role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}