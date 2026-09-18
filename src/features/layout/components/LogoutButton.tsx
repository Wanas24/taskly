"use client";

import { useState } from "react";
import logoutIcon from "@/assets/icons/logout.svg";

import { createClient } from "@/lib/supabase/client";

import SidebarFooterButton from "./SidebarFooterButton";

type LogoutButtonProps = {
  isCollapsed: boolean;
};

export default function LogoutButton({ isCollapsed }: LogoutButtonProps) {
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");

    const supabase = createClient();

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError("Logout failed. Please try again.");
      return;
    }

    window.location.href = "/login";
  };

  return (
    <div>
      <SidebarFooterButton
        icon={logoutIcon}
        label="Logout"
        ariaLabel="Logout"
        isCollapsed={isCollapsed}
        onClick={handleLogout}
        className="text-error"
      />

      {error && !isCollapsed && (
        <p role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
