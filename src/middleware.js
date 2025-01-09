import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

const corsHeaders = {
 "Access-Control-Allow-Origin": "*",
 "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
 "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const token = "auth-dummy-token";

// Helper function untuk membuat response dengan cookie
const createResponseWithCookie = (body, status = 200, includeToken = true) => {
 const response = NextResponse.json(body, { 
   headers: corsHeaders,
   status 
 });
 
 if (includeToken) {
   response.cookies.set({
     name: 'authToken',
     value: token,
     path: '/',
     secure: true,
     httpOnly: true,
     sameSite: 'lax', 
     maxAge: 60 * 60 * 24 // 24 jam dalam detik
   });
 }
 
 return response;
};

export async function POST(request) {
 try {
   const { username, password } = await request.json();
   
   if (!username || !password) {
     return createResponseWithCookie({
       status: 400,
       message: "Username and password are required"
     }, 400, false);
   }

   const { data, error } = await supabase
     .from("user")
     .select("*")
     .limit(1)
     .eq("username", username)
     .eq("password", password);

   if (error) throw error;

   if (data?.length > 0) {
     return createResponseWithCookie({
       status: 200,
       message: "Login successfully",
       data: {
         username,
         userId: data[0].id
       }
     });
   }

   return createResponseWithCookie({
     status: 400,
     message: "Incorrect username or password"
   }, 400, false);

 } catch (error) {
   console.error("Login error:", error);
   return createResponseWithCookie({
     status: 500,
     message: "An error occurred while processing the request."
   }, 500, false);
 }
}

export async function DELETE() {
 const response = NextResponse.json({
   status: 200,
   message: "Logout successful"
 }, { 
   headers: corsHeaders,
   status: 200 
 });

 // Hapus cookie dengan mengatur expires ke masa lalu
 response.cookies.set({
   name: 'authToken',
   value: '',
   path: '/',
   secure: true,
   httpOnly: true,
   sameSite: 'lax',
   maxAge: 0 // Expired immediately
 });

 return response;
}

export async function OPTIONS() {
 // Handle preflight request
 return NextResponse.json({}, { 
   headers: corsHeaders,
   status: 200
 });
}