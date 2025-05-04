import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  try {
    // Puedes agregar lógica aquí si el usuario no está autenticado
    // Ejemplo:
    // if (!auth().userId && req.nextUrl.pathname !== "/sign-in") {
    //   return NextResponse.redirect(new URL("/sign-in", req.url));
    // }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Clerk falló en móvil:", error);
    return NextResponse.next(); // Evita error 500
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // todo menos archivos estáticos
    "/",
    "/(api)(.*)"
  ],
};
