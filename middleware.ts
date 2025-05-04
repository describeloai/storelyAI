import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Rutas protegidas (puedes modificar esto según necesites)
const isProtectedRoute = createRouteMatcher([
  "/((?!.*\\..*|_next).*)", // todo excepto estáticos
  "/",                      // home
  "/(api)(.*)"              // API
]);

export default clerkMiddleware((auth, req) => {
  try {
    if (!isProtectedRoute(req)) {
      return NextResponse.next(); // No aplicar middleware
    }

    // Aquí puedes usar auth().protect() si lo deseas, o hacer validaciones adicionales
    return NextResponse.next();
  } catch (err) {
    console.error("Error en middleware Clerk (mobile):", err);
    return NextResponse.next(); // No romper la app móvil
  }
});

// Configuración para Vercel (Next.js)
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
