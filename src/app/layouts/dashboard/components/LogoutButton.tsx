"use client";

import { useState } from "react";
import Image from "next/image";

import logoutIcon from "@/assets/icons/logout.svg";

import { createClient } from "@/lib/supabase/client";

type LogoutButtonProps = {
  isCollapsed: boolean;
};

export default function LogoutButton({
  isCollapsed,
}: LogoutButtonProps) {
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");

    const supabase = createClient();

    const { error: signOutError } =
      await supabase.auth.signOut();

    if (signOutError) {
      setError("Logout failed. Please try again.");
      return;
    }

    window.location.href = "/login";
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
        <Image
          src={logoutIcon}
          alt=""
          className="h-5 w-5 shrink-0"
        />

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