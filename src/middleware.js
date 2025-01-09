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

  // Mengecek apakah lingkungan adalah production atau development
  const isProduction = process.env.NODE_ENV === "production";

  const response = NextResponse.next();

  // Mengatur cookie dengan konfigurasi yang sesuai
  response.cookies.set({
    name: "authToken",
    value: authToken.value,
    path: "/",
    secure: isProduction, // hanya secure di production (Vercel)
    httpOnly: true, // agar hanya bisa diakses melalui server
    sameSite: "lax", // sama seperti sebelumnya, memungkinkan pengiriman cookie pada beberapa request lintas origin
    maxAge: 60 * 60 * 24, // 1 hari
    domain: isProduction ? ".vercel.app" : "localhost", // Tentukan domain untuk vercel atau localhost
  });

  return response;
}

export const config = {
  matcher: ["/history", "/wishlist", "/", "/gallery"],
};
