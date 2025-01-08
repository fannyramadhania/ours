import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function GET() {
  const { data, error } = await supabase.from("wishlist").select("*");

  if (data) {
    return NextResponse.json(
      {
        status: 200,
        message: "Successfully",
        data: data,
      },
      { headers: corsHeaders, status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while processing the request.",
      },
      { headers: corsHeaders, status: 500 }
    );
  }
}
