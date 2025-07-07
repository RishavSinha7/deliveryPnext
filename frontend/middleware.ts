import { NextRequest, NextResponse } from "next/server";

// Define protected and public admin routes
const protectedRoutes = [
  "/admin/dashboard",
  "/admin/users", 
  "/admin/drivers",
  "/admin/bookings",
  "/admin/vehicles",
  "/admin/reports",
  "/admin/transactions",
  "/admin/settings",
  "/admin/notifications",
  "/admin/coupons"
];
const publicRoutes = ["/admin/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Only process admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  console.log('[Middleware] Processing admin route:', pathname);
  
  // Get admin token from cookies
  const adminToken = req.cookies.get("adminToken")?.value;
  console.log('[Middleware] Admin token check:', {
    pathname,
    hasToken: !!adminToken,
    tokenValue: adminToken ? 'present' : 'missing'
  });

  // Handle /admin root redirect - always redirect to login
  if (pathname === "/admin" || pathname === "/admin/") {
    console.log('[Middleware] Redirecting /admin to /admin/login');
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  console.log('[Middleware] Route classification:', {
    pathname,
    isProtectedRoute,
    isPublicRoute,
    hasToken: !!adminToken
  });

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !adminToken) {
    console.log('[Middleware] Redirecting to login - no admin token');
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login page  
  if (isPublicRoute && adminToken) {
    console.log('[Middleware] Redirecting to dashboard - user already authenticated');
    const dashboardUrl = new URL("/admin/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  console.log('[Middleware] Allowing request to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all admin routes
     */
    '/admin/:path*',
  ],
};
