'use client';

import Link from "next/link";

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  if (!isSidebarOpen) return null;

  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#B794F4", // Morado pastel
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "2rem 1rem",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 10,
      }}
    >
      <div style={{ marginBottom: "3rem", fontWeight: "bold", fontSize: "1.8rem", textAlign: "center" }}>
        StorelyAI
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Link href="/dashboard" style={{ color: "white", textDecoration: "none", fontSize: "1.1rem" }}>
          Panel Principal
        </Link>

        <div style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.8 }}>Herramientas</div>

        <Link href="/dashboard/products" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Buscar Productos
        </Link>
        <Link href="/dashboard/descriptions" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Generador de Descripciones
        </Link>
        <Link href="/dashboard/tools" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Kit de Herramientas
        </Link>
        <Link href="/dashboard/product-check" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          ¿Ya se vende esto?
        </Link>
        <Link href="/dashboard/page-generator" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Generador de Páginas
        </Link>
        <Link href="/dashboard/tracker" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Tracker Avanzado
        </Link>
        <Link href="/dashboard/chatbot" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Chatbot Inteligente
        </Link>
        <Link href="/dashboard/social-copies" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Copys para Redes Sociales
        </Link>

        <div style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.8 }}>Gestión</div>

        <Link href="/dashboard/analytics" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Análisis de Ventas
        </Link>
        <Link href="/dashboard/account" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Mi Cuenta
        </Link>
        <Link href="/dashboard/plans" style={{ color: "white", textDecoration: "none", fontSize: "1rem" }}>
          Planes
        </Link>
      </nav>
    </aside>
  );
}
