import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function GET() {
  const { data, error } = await supabase.from("history").select("*");

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
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

export async function POST(request) {
  const formData = await request.formData();
  const destination = formData.get("destination");
  const date = formData.get("date");
  const photo = formData.get("photo");
  console.log(destination);
  console.log(date);
  console.log(photo);
  const dateConvert = new Date(date);

  const { error } = await supabase.from("history").insert({
    destination: destination,
    date: dateConvert.toISOString().split("T")[0],
    photo: photo,
  });

  console.log(error);

  if (!error) {
    return NextResponse.json({
      status: 201,
      message: "Successfully",
    });
  } else {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while processing the request.",
    });
  }
}
