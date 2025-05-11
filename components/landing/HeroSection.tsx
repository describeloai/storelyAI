"use client";

import { motion } from "framer-motion";
import { SignUpButton } from "@clerk/nextjs";

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "transparent", // <- fondo transparente
        color: "white",
        paddingInline: "1rem",
        position: "relative",
        zIndex: 1, // <- para estar sobre el fondo dinámico
      }}
    >
      {/* Título */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="hero-title"
        style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          maxWidth: "900px",
          color: "white",
          textShadow: "0 0 15px rgba(255,255,255,0.25)",
          lineHeight: "1.2",
          marginBottom: "3rem",
        }}
      >
        Transforma tu ecommerce con la Inteligencia Artificial más avanzada
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="hero-subtitle"
        style={{
          marginBottom: "1rem",
          fontSize: "1.5rem",
          color: "white",
          textShadow: "0 0 10px rgba(255,255,255,0.2)",
        }}
      >
        Comienza ahora
      </motion.p>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="hero-buttons"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {/* Botón Google */}
        <SignUpButton mode="redirect">
          <button className="hero-btn">
            <img
              src="/icons/google-logo.png"
              alt="Google"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
            />
            Regístrate con Google
          </button>
        </SignUpButton>

        {/* Separador */}
        <span className="hero-separator">o</span>

        {/* Botón Correo */}
        <SignUpButton mode="redirect">
          <button className="hero-btn">
            Regístrate con correo <span style={{ fontSize: "1.2rem" }}>→</span>
          </button>
        </SignUpButton>
      </motion.div>

      {/* Estilos embebidos */}
      <style jsx>{`
        .hero-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.8rem;
          background: linear-gradient(90deg, #7b2ff7, #f107a3);
          border: none;
          border-radius: 999px;
          font-weight: bold;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          min-width: 250px;
          height: 50px;
          box-shadow: 0 4px 20px rgba(122, 44, 248, 0.3);
          transition: transform 0.2s ease;
        }

        .hero-btn:hover {
          transform: scale(1.05);
        }

        .hero-btn:active {
          transform: scale(0.98);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 1.2rem !important;
            line-height: 1.3 !important;
            margin-bottom: 1.5rem !important;
          }

          .hero-subtitle {
            font-size: 1rem !important;
            margin-bottom: 1.2rem !important;
          }

          .hero-buttons {
            flex-direction: column !important;
            gap: 0.6rem !important;
          }

          .hero-btn {
            width: 100% !important;
            max-width: 280px;
            font-size: 0.95rem !important;
            padding: 0.75rem 1.4rem !important;
          }

          .hero-separator {
            font-size: 1rem;
            font-weight: normal;
            opacity: 0.7;
            margin: 0.4rem 0;
          }
        }
      `}</style>
    </section>
  );
}
