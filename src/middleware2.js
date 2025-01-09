import { NextRequest, NextResponse } from "next/server";
import { useAuthStore } from "./hooks/useAuth";

export function middleware(request) {
  // Ambil token dari cookie
  const authToken = request.cookies.get("authToken");

  // Cek path saat ini
  const { pathname } = request.nextUrl;

  // Buat URL login dengan return path
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);

  // Debug cookie (hanya untuk development)
  console.log("Cookie:", authToken);

  // Jika tidak ada token atau token kosong
  if (!authToken?.value) {
    // Redirect ke login
    return NextResponse.redirect(loginUrl);
  }

  // Lanjutkan ke requested page jika ada token
  const response = NextResponse.next();

  // Pastikan cookie tidak hilang saat navigasi
  response.cookies.set({
    name: "authToken",
    value: authToken.value,
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export const config = {
  matcher: ["/history", "/wishlist", "/", "/gallery"],
};
