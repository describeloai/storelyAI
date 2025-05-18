export const dynamic = 'force-dynamic'; // 👈 Esto fuerza generación dinámica

import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import EmbeddedRedirector from "@/components/common/EmbeddedRedirector"

export const metadata: Metadata = {
  title: "StorelyAI",
  description: "Transforma tu ecommerce con inteligencia artificial avanzada.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
          suppressHydrationWarning
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: "#0a0012",
            color: "#f3f4f6",
            overflowX: "hidden",
            minHeight: "100vh",
            fontFamily: "'Inter', sans-serif",
            position: "relative",
          }}
        >
          <EmbeddedRedirector />

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
  )
}