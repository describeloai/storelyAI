import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Iniciar sesión - Storely",
  description: "Accede a tu panel de StorelyAI con tu cuenta.",
};

export default async function StorelyLoginPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard"); // Ya logueado: ir directo al panel
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to bottom right, #1f1c2c, #928dab)"
    }}>
      <div style={{
        background: "white",
        padding: "3rem",
        borderRadius: "1rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
      }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "600", marginBottom: "1.5rem", textAlign: "center" }}>
          Iniciar sesión en Storely
        </h1>
        <SignIn redirectUrl="/dashboard" />
      </div>
    </div>
  );
}
