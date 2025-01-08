import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Ambil semua file dari storage bucket "photo"
    const { data, error } = await supabase.storage.from("photo").list();

    if (error) {
      throw error;
    }

    // Dapatkan tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // Filter data berdasarkan tanggal hari ini
    const filteredData = data.filter((item) => {
      const itemDate = item.created_at.split("T")[0]; // Ambil bagian tanggal saja
      return itemDate === today;
    });

    return NextResponse.json({
      status: 200,
      message: "Successfully fetched data for today",
      data: filteredData,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
}
