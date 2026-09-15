"use client";

import { useCurrentUser } from "../hooks/useCurrentUser";

function getInitials(name: string) {
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export default function UserInfo() {
  const { user, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex max-sm:hidden flex-col items-end">
          <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-2.5 w-16 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200" />
  
      </div>
    );
  }

  if (error || !user) {
    return null;
  }

  const name =
    typeof user.user_metadata?.name === "string"
      ? user.user_metadata.name
      : "User";

  const jobTitle =
    typeof user.user_metadata?.job_title === "string"
      ? user.user_metadata.job_title
      : "";

  return (
    <div className="flex items-center gap-4">
      <div className="flex max-sm:hidden flex-col items-end ">
        <p className="truncate text-base font-semibold text-slate-dark">
          {name}
        </p>

        {jobTitle && (
          <p className="truncate text-[10px] font-bold text-primary">
            {jobTitle}
          </p>
        )}
      </div>

       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-container text-base font-bold text-white">
        {getInitials(name)}
      </div>
    </div>
  );
}