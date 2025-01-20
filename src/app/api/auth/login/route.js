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
    // Pastikan request bisa di-parse sebagai JSON
    let username, password;
    try {
      const body = await request.json();
      username = body.username;
      password = body.password;
    } catch (e) {
      return createResponseWithCookie(
        {
          status: 400,
          message: "Invalid request format - JSON required",
        },
        400,
        true
      );
    }

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

    // Validasi format input
    if (typeof username !== "string" || typeof password !== "string") {
      return createResponseWithCookie(
        {
          status: 400,
          message: "Username and password must be strings",
        },
        400,
        true
      );
    }

    // Query ke database dengan proper error handling
    const { data, error } = await supabase
      .from("user")
      .select("id, username") // Hanya select field yang diperlukan
      .eq("username", username.trim())
      .eq("password", password.trim())
      .limit(1)
      .single(); // Gunakan single() untuk mendapatkan object langsung

    // Handle specific Supabase errors
    if (error) {
      console.error("Database error:", error);

      if (error.code === "PGRST116") {
        return createResponseWithCookie(
          {
            status: 404,
            message: "User not found",
          },
          404,
          true
        );
      }

      return createResponseWithCookie(
        {
          status: 500,
          message: "Database error occurred",
        },
        500,
        true
      );
    }

    // Jika data ditemukan
    if (data) {
      return createResponseWithCookie({
        status: 200,
        message: "Login successful",
        data: {
          username: data.username,
          userId: data.id,
        },
      });
    }

    // Jika tidak ada data yang cocok
    return createResponseWithCookie(
      {
        status: 401,
        message: "Invalid credentials",
      },
      401,
      true
    );
  } catch (error) {
    // Log error untuk debugging
    console.error("Login error:", error);

    return createResponseWithCookie(
      {
        status: 500,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
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
