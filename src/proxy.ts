import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  console.log("1 - proxy started");

  let response = NextResponse.next({
    request,
  });

  console.log("2 - response created");

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          console.log("3 - getAll cookies");
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          console.log("4 - setAll cookies");

          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  console.log("5 - supabase created");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log("6 - getUser finished", {
    hasUser: !!user,
    error: error?.message,
  });

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/project");

  console.log("7 - protected route", isProtectedRoute);

  if (isProtectedRoute) {
    const authMode = request.cookies.get("taskly-auth-mode")?.value;
    const browserSession = request.cookies.get(
      "taskly-browser-session",
    )?.value;

    console.log("8 - auth cookies", {
      authMode,
      hasBrowserSession: !!browserSession,
    });

    if (!user) {
      console.log("9 - redirect login");

      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }

    if (authMode !== "remember" && !browserSession) {
      console.log("10 - signing out");

      await supabase.auth.signOut();

      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }
  }

  console.log("11 - returning response");

  return response;
}