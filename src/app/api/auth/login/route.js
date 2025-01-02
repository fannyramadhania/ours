
import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Tangani permintaan OPTIONS (CORS Preflight Request)
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsHeaders });
  }

  try {
    const { username, password } = await request.json();
    const { data, error } = await supabase
      .from("user") // Ganti dengan nama tabel yang ada di Supabase Anda
      .select("*")
      .limit(1)
      .eq("username", username)
      .eq("password", password);
    console.log(data);

    // Periksa apakah data kosong atau tidak ditemukan
    if (data && data.length > 0) {
      return NextResponse.json(
        {
          status: 200,
          message: "Login successfully",
          data: {
            username,
            password,
          },
        },
        { headers: corsHeaders, status: 200 } // Set status HTTP 200
      );
    } else {
      return NextResponse.json(
        {
          status: 400,
          message: "Incorrect username or password", // Pesan error jika data kosong
        },
        { headers: corsHeaders, status: 400 } // Set status HTTP 400
      );
    }
  } catch (error) {
    console.error(error); // Log error jika ada kesalahan lainnya
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while processing the request.",
      },
      { headers: corsHeaders, status: 500 } // Set status HTTP 500 untuk error server
    );
  }
}

export async function OPTIONS() {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  return NextResponse.json({}, { headers: corsHeaders });
}
