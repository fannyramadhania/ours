import { NextResponse } from "next/server";

export async function GET(params) {
    return NextResponse.json({
        status: 200,
        message:"Successfully"
    })
}