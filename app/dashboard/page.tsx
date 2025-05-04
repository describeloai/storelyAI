import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Panel - StorelyAI",
  description: "Accede y gestiona todas las herramientas de ecommerce de StorelyAI desde tu panel",
};

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Accesos rápidos */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        <Card title="Buscar Productos" link="/dashboard/products" description="Encuentra productos ganadores" />
        <Card title="Generador de Descripciones" link="/dashboard/descriptions" description="Textos automáticos optimizados" />
        <Card title="Kit de Herramientas" link="/dashboard/tools" description="Accede a utilidades de IA para tu tienda" />
        <Card title="¿Ya se vende esto?" link="/dashboard/product-check" description="Detecta si ya existe en el mercado" />
        <Card title="Generador de Páginas" link="/dashboard/page-generator" description="Crea páginas de producto desde URLs" />
        <Card title="Tracker Avanzado" link="/dashboard/tracker" description="Analiza ventas y rentabilidad" />
        <Card title="Chatbot Inteligente" link="/dashboard/chatbot" description="Atiende a tus clientes con IA" />
        <Card title="Copys para Redes Sociales" link="/dashboard/social-copies" description="Crea mensajes en segundos" />
      </section>

      {/* Actividad reciente */}
      <section style={{ marginTop: "4rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 600, color: "#111827", marginBottom: "1.5rem" }}>
          Actividad Reciente
        </h2>
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)"
        }}>
          <p style={{ fontSize: "1rem", color: "#374151" }}>
            No hay actividad reciente todavía.
          </p>
        </div>
      </section>
    </div>
  );
}

function Card({ title, link, description }: { title: string; link: string; description: string }) {
  return (
    <Link href={link}>
      <div style={{
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "1rem",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer"
      }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>{title}</h3>
        <p style={{ fontSize: "0.95rem", color: "#6B7280" }}>{description}</p>
      </div>
    </Link>
  );
}