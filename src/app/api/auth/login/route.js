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
  // Add CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle OPTIONS request for CORS preflight
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers });
  }

  try {
    const { email, password } = await request.json();

    const user = data.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      return NextResponse.json(
        {
          status: 200,
          message: "Login successfully",
          data: {
            email: email,
            password:password
          }
        },

        { headers }
      );
    } else {
      return NextResponse.json(
        {
          status: 400,
          message: "Incorrect email or password",
        },
        { headers }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while processing the request.",
      },
      { headers }
    );
  }
}
