"use client";

import Link from "next/link";

export default function SuccessPage() {
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
      <h1 style={{ fontSize: "2.5rem", color: "#7C3AED", marginBottom: "1rem" }}>
        ¡Pago realizado con éxito! 🎉
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#4B5563", maxWidth: "600px", marginBottom: "2rem" }}>
        Gracias por confiar en StorelyAI. Ya puedes acceder a tu panel de control para comenzar a usar todas las herramientas.
      </p>
      <Link href="/dashboard" style={{ textDecoration: "none" }}>
        <button
          style={{
            backgroundColor: "#7C3AED",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "0.75rem",
            fontSize: "1.1rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Ir al Panel de Control
        </button>
      </Link>
    </div>
  );
}
