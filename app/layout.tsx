import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import AnimatedGlobalBackground from "@/components/AnimatedGlobalBackground";

export const metadata: Metadata = {
  title: "StorelyAI",
  description: "Transforma tu ecommerce con inteligencia artificial avanzada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body
          suppressHydrationWarning={true}
          style={{
            margin: 0,
            padding: 0,
            background: "transparent", // evita fondo blanco
            color: "white", // texto legible sobre fondo oscuro
            overflowX: "hidden",
            minHeight: "100%",
          }}
        >
          {/* Fondo animado global */}
          <AnimatedGlobalBackground />

          {/* Contenido principal sobre el fondo */}
          <div
            style={{
              minHeight: "100vh",
              background: "transparent", // evita cubrir el fondo
              position: "relative",
              zIndex: 1, // por encima del fondo
            }}
          >
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
