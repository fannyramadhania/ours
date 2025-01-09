import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Sesuaikan domain Anda
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const token = "auth-dummy-token"; // Pastikan token ini dibuat dengan aman

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
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
  }

  return response;
};

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
        false
      );
    }

    // Query untuk mendapatkan pengguna berdasarkan username
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .limit(1)
      .eq("username", username)
      .eq("password", password); // Cocokkan langsung password

    if (error) throw error;

    // Jika pengguna ditemukan
    if (data?.length > 0) {
      return createResponseWithCookie({
        status: 200,
        message: "Login successfully",
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
      false
    );
  } catch (error) {
    console.error("Login error:", error);
    return createResponseWithCookie(
      {
        status: 500,
        message: "An error occurred while processing the request.",
      },
      500,
      false
    );
  }
}


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

  response.cookies.set({
    name: "authToken",
    value: "",
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(0), // Kompatibilitas tambahan
  });

  return response;
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: corsHeaders,
      status: 200,
    }
  );
}
