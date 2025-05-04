// @ts-nocheck

import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
