// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient(
//     "https://xcafuhmhdlolsysrosaz.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYWZ1aG1oZGxvbHN5c3Jvc2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMTkwNDEsImV4cCI6MjAyOTc5NTA0MX0.tFSmOYXpezB_e5EGWblPW-i78xI8yU-Dw0OsYL1LOV8"
//   );
//   await supabase.auth.getSession();
//   return res;
// }
