import { NextRequest, NextResponse } from "next/server";
import { useAuthStore } from "./hooks/useAuth";

export function middleware(req) {
  const { cookies } = req;
  const authToken = cookies.get("authToken") || cookies.get("_vercel_jwt");

  if (authToken && authToken.value != "") {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", req.url)); // Arahkan ke login
  }
}

export const config = {
  matcher: ["/history", "/wishlist", "/", "/gallery"],
};
