import authConfig from "./auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);
import {
  publicRoutes,
  apiRoutes,
  protectedRoutes,
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicStart,
} from "@/routes";
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  

  const isApiRoute = nextUrl.pathname.startsWith(apiRoutes);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isPublicRoute2 = nextUrl.pathname.startsWith(publicStart);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiRoute) {
    return undefined;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute && !isPublicRoute2) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};