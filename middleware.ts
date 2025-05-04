import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"], // rutas públicas
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
