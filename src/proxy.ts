import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Handle home route
  if (pathname === "/") {
    if (user) {
      return NextResponse.redirect(
        new URL("/project", request.url),
      );
    }

    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  const isProtectedRoute = pathname.startsWith("/project");

  if (isProtectedRoute) {
    const authMode = request.cookies.get("taskly-auth-mode")?.value;
    const browserSession = request.cookies.get(
      "taskly-browser-session",
    )?.value;

    if (!user) {
      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }

    if (authMode !== "remember" && !browserSession) {
      await supabase.auth.signOut();

      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/project/:path*"],
};