import Link from "next/link";

export const metadata = {
  title: "Panel - StorelyAI",
  description: "Accede y gestiona todas las herramientas de ecommerce de StorelyAI desde tu panel centralizado.",
};

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#111827" }}>
          Bienvenido a StorelyAI
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#6B7280", marginTop: "0.5rem" }}>
          Gestiona las herramientas de ecommerce con inteligencia artificial avanzada.
        </p>
      </div>

      {/* Accesos rápidos */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
        <Card title="Buscar Productos" link="/dashboard/products" description="Encuentra productos rentables para tu tienda online." />
        <Card title="Generador de Descripciones" link="/dashboard/descriptions" description="Automatiza la creación de descripciones optimizadas." />
        <Card title="Kit de Herramientas" link="/dashboard/tools" description="Accede a utilidades avanzadas para tu ecommerce." />
        <Card title="¿Ya se vende esto?" link="/dashboard/product-check" description="Descubre si tu producto ya está en el mercado." />
        <Card title="Generador de Páginas" link="/dashboard/page-generator" description="Crea páginas de productos de forma automática." />
        <Card title="Tracker Avanzado" link="/dashboard/tracker" description="Analiza ventas y comportamientos en tiempo real." />
        <Card title="Chatbot Inteligente" link="/dashboard/chatbot" description="Atiende a tus clientes automáticamente." />
        <Card title="Copys para Redes Sociales" link="/dashboard/social-copies" description="Crea copys publicitarios que venden más." />
      </section>

      {/* Actividad reciente */}
      <section style={{ marginTop: "4rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 600, color: "#111827", marginBottom: "1.5rem" }}>
          Actividad Reciente
        </h2>
        <div style={{ backgroundColor: "#F9FAFB", borderRadius: "1rem", padding: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <p style={{ fontSize: "1rem", color: "#374151" }}>
            No hay actividad reciente todavía.
          </p>
        </div>
      </section>
    </div>
  );
}

function Card({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link
      href={link}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "1rem",
        textDecoration: "none",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        color: "#111827",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>{title}</h3>
      <p style={{ fontSize: "1rem", color: "#6B7280" }}>{description}</p>
    </Link>
  );
}
