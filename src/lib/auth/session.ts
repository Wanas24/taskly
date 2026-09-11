const REMEMBER_ME_DAYS = 30;

export function setAuthMode(rememberMe: boolean) {
  if (rememberMe) {
    const maxAge = REMEMBER_ME_DAYS * 24 * 60 * 60;

    document.cookie = `taskly-auth-mode=remember; path=/; max-age=${maxAge}; samesite=lax`;
  } else {
    document.cookie =
      "taskly-auth-mode=session; path=/; samesite=lax";
  }

  document.cookie =
    "taskly-browser-session=active; path=/; samesite=lax";
}