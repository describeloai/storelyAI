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
    <ClerkProvider
      appearance={{ baseTheme: undefined }}
      localization={{
        socialButtonsBlockButton: "Continuar con {{provider|titleize}}",
        formFieldLabel__emailAddress: "Correo electrónico",
        formFieldLabel__password: "Contraseña",
        signIn: { start: { title: "Inicia sesión en tu cuenta" } },
        signUp: { start: { title: "Crea tu cuenta" } },
      }}
    >
      <html lang="es">
        <body
          suppressHydrationWarning={true}
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: "#0a0012", // Fondo base oscuro
            color: "#f3f4f6",             // Texto claro
            overflowX: "hidden",
            minHeight: "100vh",
            fontFamily: "'Inter', sans-serif",
            position: "relative",
          }}
        >
          <AnimatedGlobalBackground />

          <div
            style={{
              minHeight: "100vh",
              position: "relative",
              zIndex: 1,
              background: "transparent",
            }}
          >
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}