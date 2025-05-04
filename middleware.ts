import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"], // rutas que no requieren sesión
});

export const config = {
  matcher: [
    /*
     * Proteger todas las rutas excepto:
     * - archivos estáticos (_next, assets, etc.)
     * - las públicas definidas arriba
     */
    "/((?!_next|.*\\..*).*)",
  ],
};
