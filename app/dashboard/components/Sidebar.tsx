"use client";

import Link from "next/link";

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  if (!isSidebarOpen) return null;

  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#F3F4F6", // Gris claro
        padding: "2rem 1.5rem",
        height: "100vh",
        borderRight: "1px solid #E5E7EB",
        boxSizing: "border-box",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p style={{ fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Panel Principal
        </p>

        <SidebarLink href="/dashboard/products">Buscar Productos</SidebarLink>
        <SidebarLink href="/dashboard/descriptions">Generador de Descripciones</SidebarLink>
        <SidebarLink href="/dashboard/tools">Kit de Herramientas</SidebarLink>
        <SidebarLink href="/dashboard/product-check">¿Ya se vende esto?</SidebarLink>
        <SidebarLink href="/dashboard/page-generator">Generador de Páginas</SidebarLink>
        <SidebarLink href="/dashboard/tracker">Tracker Avanzado</SidebarLink>
        <SidebarLink href="/dashboard/chatbot">Chatbot Inteligente</SidebarLink>
        <SidebarLink href="/dashboard/social-copies">Copys para Redes Sociales</SidebarLink>

        <p style={{ fontSize: "0.75rem", color: "#6B7280", textTransform: "uppercase", margin: "2rem 0 0.5rem" }}>
          Gestión
        </p>

        <SidebarLink href="/dashboard/analytics">Análisis de Ventas</SidebarLink>
        <SidebarLink href="/dashboard/account">Mi Cuenta</SidebarLink>
        <SidebarLink href="/dashboard/plans">Planes</SidebarLink>
      </nav>
    </aside>
  );
}

function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        color: "#111827",
        fontWeight: 500,
        fontSize: "0.95rem",
        textDecoration: "none",
        padding: "0.25rem 0.5rem",
        borderRadius: "0.375rem",
        transition: "background 0.2s",
      }}
    >
      {children}
    </Link>
  );
}
