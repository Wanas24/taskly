import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },

      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Handle home route
  if (pathname === "/") {
    return NextResponse.redirect(new URL(user ? "/project" : "/login", request.url));
  }

  // Prevent authenticated users from accessing auth pages
  const isAuthRoute = pathname === "/login" || pathname === "/sign-up";

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/project", request.url));
  }

  // Protect project routes
  const isProtectedRoute = pathname.startsWith("/project");

  if (isProtectedRoute) {
    const authMode = request.cookies.get("taskly-auth-mode")?.value;

    const browserSession = request.cookies.get("taskly-browser-session")?.value;

    // No authenticated user
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Session expired because Remember Me was not enabled
    if (authMode !== "remember" && !browserSession) {
      await supabase.auth.signOut();

      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/login", "/sign-up", "/project/:path*"],
};
