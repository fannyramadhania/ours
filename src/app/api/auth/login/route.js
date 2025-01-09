import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

// Pengaturan CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Sesuaikan domain Anda
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Token dummy, disarankan untuk menggunakan token aman seperti JWT
const token = "auth-dummy-token";

// Fungsi untuk membuat response dengan cookie
const createResponseWithCookie = (body, status = 200, includeToken = true) => {
  const response = NextResponse.json(body, {
    headers: corsHeaders,
    status,
  });

  if (includeToken) {
    response.cookies.set({
      name: "authToken",
      value: token,
      path: "/",
      secure: process.env.NODE_ENV === "production", // hanya aman di production
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // Cookie berlaku selama 1 hari
    });
  }

  return response;
};

// Endpoint POST untuk login
export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Validasi data input
    if (!username || !password) {
      return createResponseWithCookie(
        {
          status: 400,
          message: "Username and password are required",
        },
        400,
        true
      );
    }

    // Query untuk mendapatkan pengguna berdasarkan username dan password
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .limit(1)
      .eq("username", username)
      .eq("password", password); // Periksa username dan password

    if (error) throw error;

    // Jika pengguna ditemukan
    if (data?.length > 0) {
      return createResponseWithCookie({
        status: 200,
        message: "Login successful",
        data: {
          username,
          userId: data[0].id,
        },
      });
    }

    // Jika username atau password salah
    return createResponseWithCookie(
      {
        status: 400,
        message: "Incorrect username or password",
      },
      400,
      true
    );
  } catch (error) {
    console.error("Login error:", error);
    return createResponseWithCookie(
      {
        status: 500,
        message: "An error occurred while processing the request.",
      },
      500,
      true
    );
  }
}

// Endpoint DELETE untuk logout
export async function DELETE() {
  const response = NextResponse.json(
    {
      status: 200,
      message: "Logout successful",
    },
    {
      headers: corsHeaders,
      status: 200,
    }
  );

  // Hapus cookie authToken saat logout
  response.cookies.set({
    name: "authToken",
    value: "",
    path: "/",
    secure: process.env.NODE_ENV === "production", // hanya secure di production
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(0), // Menghapus cookie dengan set expires ke tanggal 0
  });

  return response;
}

// Endpoint OPTIONS untuk CORS preflight request
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: corsHeaders,
      status: 200,
    }
  );
}
