import { NextResponse } from "next/server";

const data = [
  {
    email: "fanny@bob.com",
    password: "fanny123",
  },
  {
    email: "rehan@bob.com",
    password: "rehan123",
  },
];

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
    // Parse data dari request
    const { email, password } = await request.json();

    // Cari user berdasarkan email dan password
    const user = data.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      return NextResponse.json(
        {
          status: 200,
          message: "Login successfully",
          data: {
            email,
            password,
          },
        },
        { headers: corsHeaders }
      );
    } else {
      return NextResponse.json(
        {
          status: 400,
          message: "Incorrect email or password",
        },
        { headers: corsHeaders }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while processing the request.",
      },
      { headers: corsHeaders }
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
