import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default async function SignInPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard"); // Ya logueado: ir directo
  }

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to bottom right, #4B0082, #8A2BE2)" }}>
      <SignIn redirectUrl="/dashboard" />
    </div>
  );
}
