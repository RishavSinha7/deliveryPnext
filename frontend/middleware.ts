import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./src/lib/session";


const protectedRoutes = ["/admin/dashboard"];
const publicRoutes = ["/admin/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  const cookie = req.cookies.get("session")?.value;

  // Handle invalid or missing session cookie gracefully
  const session = cookie ? await decrypt(cookie) : null;

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Redirect authenticated users away from public routes
  // if (isPublicRoute && session?.userId) {
  //   return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
