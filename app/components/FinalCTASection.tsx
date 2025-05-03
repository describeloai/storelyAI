"use client";

import { Button } from "@nextui-org/react";
import AuthAwareButton from "@/components/AuthAwareButton";
import { motion } from "framer-motion";

export default function FinalCTASection() {
  return (
    <section
      style={{
        backgroundColor: "transparent", // <- fondo completamente transparente
        padding: "2rem 1rem",
        textAlign: "center",
        color: "white",
        position: "relative",
        zIndex: 1, // <- asegura que esté encima del fondo animado
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
        }}
      >
        ¿Listo para hacer crecer tu tienda?
      </h2>

      <AuthAwareButton action="signup">
        {(handleClick) => (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              onClick={handleClick}
              size="lg"
              color="primary"
              radius="lg"
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                backgroundColor: "#ffffff",
                color: "#5B2C98",
                padding: "1rem 2rem",
                transition: "all 0.3s ease",
              }}
            >
              ¡Empezar ahora!
            </Button>
          </motion.div>
        )}
      </AuthAwareButton>
    </section>
  );
}
