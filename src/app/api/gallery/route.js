import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
  const { data, error } = await supabase.storage.from("photo").list();
    
  if (data) {
    return NextResponse.json(
      {
        status: 200,
        data: data,
      },
      { headers: corsHeaders, status: 200 }
    );
  }
}


export async function POST(request) {
const formData = await request.formData();
  const file = formData.get("file");
  console.log(file);
  
  

    
      const { data, error } = await supabase.storage
        .from("photo") // Nama bucket di Supabase
        .upload(`${file.name}`, file, {
          cacheControl: "3600", // Bisa disesuaikan
          upsert: false, // Set true jika ingin mengoverwrite file yang sudah ada
        });
    

  if (data) {
    return NextResponse.json(
      {
        status: 201,
        message:"Data successfully created."
      },
      { headers: corsHeaders, status: 200 }
    );
  }
}