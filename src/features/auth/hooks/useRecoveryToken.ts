"use client";

import { useEffect, useState } from "react";

export function useRecoveryToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      setIsChecking(false);
      return;
    }

    const params = new URLSearchParams(hash.substring(1));

    const type = params.get("type");
    const token = params.get("access_token");

    if (type === "recovery" && token) {
      setAccessToken(token);
      setIsValid(true);
    }

    setIsChecking(false);
  }, []);

  return {
    accessToken,
    isValid,
    isChecking,
  };
}