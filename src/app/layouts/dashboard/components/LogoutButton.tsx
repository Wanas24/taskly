"use client";

import { useState } from "react";

import LogoutIcon from "@/assets/icons/logout.svg";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  isCollapsed: boolean;
};

export default function LogoutButton({
  isCollapsed,
}: LogoutButtonProps) {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogout = async () => {
    setError("");

    const supabase = createClient();

    const { error: signOutError } =
      await supabase.auth.signOut();

    if (signOutError) {
      setError("Logout failed. Please try again.");
      return;
    }

    router.push("/login");
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        aria-label="Logout"
        className={`flex items-center p-3 text-base font-medium text-error ${
          isCollapsed ? "justify-center" : "gap-3"
        }`}
      >
        <LogoutIcon className="h-5 w-5 shrink-0" />

        {!isCollapsed && <span>Logout</span>}
      </button>

      {error && !isCollapsed && (
        <p role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}