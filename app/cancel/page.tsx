"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F3E8FF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#DC2626", marginBottom: "1rem" }}>
        Pago cancelado ❌
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#4B5563", maxWidth: "600px", marginBottom: "2rem" }}>
        Parece que cancelaste el proceso de pago. Si deseas volver a intentarlo puedes regresar al inicio.
      </p>
      <Link href="/" style={{ textDecoration: "none" }}>
        <button
          style={{
            backgroundColor: "#DC2626",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "0.75rem",
            fontSize: "1.1rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Volver a Inicio
        </button>
      </Link>
    </div>
  );
}
