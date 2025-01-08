import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
const token = "auth-dummy-token"
export async function POST(request) {
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsHeaders });
  }

  try {
    const { username, password } = await request.json();
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .limit(1)
      .eq("username", username)
      .eq("password", password);

    if (data && data.length > 0) {

      const response = NextResponse.json(
        {
          status: 200,
          message: "Login successfully",
          data: {
            username,
            password,
          },
        },
        { headers: corsHeaders ,status:200}
      );

      // Atur cookie dalam respons menggunakan header `Set-Cookie`
     response.headers.set(
       "Set-Cookie",
       `authToken=${token}; Path=/; HttpOnly; Secure=true; SameSite=Strict`
     );


      return response;
    } else {
      return NextResponse.json(
        {
          status: 400,
          message: "Incorrect username or password",
        },
        { headers: corsHeaders,status:400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while processing the request.",
      },
      { headers: corsHeaders }
    );
  }
}

export async function DELETE() {
  // Membuat respons untuk menghapus cookie
  const response = NextResponse.json(
    {
      status: 200,
      message: "Logout successful",
    },
    { headers: corsHeaders, status:200 }
  );

 response.headers.set(
   "Set-Cookie",
   "authToken=; Path=/; HttpOnly; Secure=true; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
 );


  return response;
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
