import { NextRequest, NextResponse } from "next/server";

const data = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    date: "2024-03-15",
    duration: "5 days",
    activities: [
      "Visiting Tanah Lot Temple",
      "Surfing at Kuta Beach",
      "Exploring Ubud Rice Terraces",
    ],
    accommodation: "Four Seasons Resort",
    travelType: "Vacation",
    cost: 2500000,
    weather: "Sunny",
  },
  {
    id: 2,
    destination: "Yogyakarta, Indonesia",
    date: "2024-02-01",
    duration: "3 days",
    activities: [
      "Borobudur Temple Visit",
      "Malioboro Shopping",
      "Merapi Volcano Tour",
    ],
    accommodation: "Phoenix Hotel",
    travelType: "Weekend Trip",
    cost: 1500000,
    weather: "Cloudy",
  },
  {
    id: 3,
    destination: "Raja Ampat, Indonesia",
    date: "2023-12-20",
    duration: "7 days",
    activities: ["Diving", "Island Hopping", "Snorkeling"],
    accommodation: "Papua Paradise Eco Resort",
    travelType: "Adventure",
    cost: 5000000,
    weather: "Sunny",
  },
];
export async function GET(params) {
  const { searchParams } = new URL(params.url);
  const id = searchParams.get("id");
  console.log(id);

  if (id) {
    const resultData = data.find((item) => item.id === Number(id));
    if (resultData) {
      return NextResponse.json({
        status: 200,
        message: "Successfully",
        data: data.find((item) => item.id === Number(id)),
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Not Found",
        data: [],
      });
    }
  } else {
    return NextResponse.json({
      status: 200,
      message: "Successfully",
      data: data,
    });
  }
}
