import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Protege todas las rutas menos archivos estáticos
    "/",                      // Protege home
    "/(api)(.*)"              // Protege API
  ],
};
