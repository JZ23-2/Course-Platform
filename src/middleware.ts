import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    const protectedRoutes = ["/home", "/admin", "/pricing"];
    if (!token && protectedRoutes.some((p) => pathname.startsWith(p))) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const authPages = ["/", "/register"];
    if (token && authPages.includes(pathname)) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "admin") {
        return NextResponse.redirect(new URL("/home", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/home", "/pricing", "/admin/:path*", "/", "/register"],
};
