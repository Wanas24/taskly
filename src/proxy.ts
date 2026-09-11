import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  console.log("PROXY WORKS");

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};