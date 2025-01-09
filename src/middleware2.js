import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("authToken");

  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);

  if (!authToken?.value) {
    console.log("Token tidak ditemukan, redirect ke login.");
    return NextResponse.redirect(loginUrl);
  }

  const isProduction = process.env.NODE_ENV === "production";

  const response = NextResponse.next();
  response.cookies.set({
    name: "authToken",
    value: authToken.value,
    path: "/",
    secure: isProduction,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export const config = {
  matcher: ["/history", "/wishlist", "/", "/gallery"],
};
