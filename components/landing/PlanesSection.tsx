"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function PlanesSection() {
  const [plan, setPlan] = useState(1);
  const [isAnual, setIsAnual] = useState(false);

  const darkPurple = "#371866";
  const activeColor = darkPurple;
  const inactiveColor = "#3E2A89";
  const gold = "#FFD700";

  return (
    <section
      id="precios"
      style={{
        padding: "5rem 1rem",
        textAlign: "center",
        color: "white",
        backgroundColor: "transparent",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          color: "#ffffff",
          textShadow: "0 0 8px rgba(255,255,255,0.8)",
        }}
      >
        Elige tu plan
      </h2>

      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={plan}
        onChange={(e) => setPlan(parseInt(e.target.value))}
        style={{
          width: "80%",
          appearance: "none",
          height: "8px",
          borderRadius: "4px",
          background: "#ffffff",
          outline: "none",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          margin: "0 auto 2rem",
          fontSize: "0.9rem",
          fontWeight: "bold",
          color: "#ffffff",
          textShadow: "0 0 6px rgba(255,255,255,0.9)",
        }}
      >
        <span>Free</span>
        <span>Pro</span>
        <span>Premium</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Button
          onClick={() => setIsAnual(false)}
          style={{
            backgroundColor: isAnual ? inactiveColor : activeColor,
            color: "white",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Mensual
        </Button>

        <Button
          onClick={() => setIsAnual(true)}
          style={{
            backgroundColor: isAnual ? activeColor : inactiveColor,
            color: "white",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Anual (20% dcto)
        </Button>
      </div>

      <div
        style={{
          backgroundColor: "rgba(40, 40, 40, 0.25)",
          backdropFilter: "blur(10px)",
          padding: "2rem",
          borderRadius: "1rem",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <motion.h3
          key={plan}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#ffffff",
            textShadow: "0 0 8px rgba(255,255,255,0.9)",
          }}
        >
          {plan === 0 ? "Free" : plan === 1 ? "Pro" : "Premium"}
        </motion.h3>

        <p style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
          {plan === 0
            ? "0€/mes"
            : plan === 1
            ? isAnual
              ? "6€/mes"
              : "9€/mes"
            : isAnual
            ? "15€/mes"
            : "19€/mes"}
        </p>

        {plan > 0 && (
          <p
            style={{
              color: gold,
              fontSize: "0.95rem",
              fontWeight: "bold",
              marginTop: "0.5rem",
            }}
          >
            Potenciado con IA premium
          </p>
        )}

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            textAlign: "left",
            marginTop: "1rem",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
            color: "white",
          }}
        >
          {plan === 0 && (
            <>
              <li>✅ 5 descripciones mensuales</li>
              <li>✅ 5 búsquedas en "¿Ya se vende esto?"</li>
              <li>❌ Generación de anuncios no disponible</li>
            </>
          )}
          {plan === 1 && (
            <>
              <li>✅ 30 descripciones mensuales con IA potente</li>
              <li>✅ 30 búsquedas en "¿Ya se vende esto?"</li>
              <li>✅ 25 copies de anuncios</li>
              <li>✅ IA de última generación</li>
            </>
          )}
          {plan === 2 && (
            <>
              <li>✅ Descripciones ilimitadas</li>
              <li>✅ Búsquedas ilimitadas en "¿Ya se vende esto?"</li>
              <li>✅ Copies ilimitados</li>
              <li>✅ Todos los idiomas</li>
              <li>✅ Extensión del navegador StorelyIA</li>
            </>
          )}
        </ul>
      </div>
    </section>
  );
}
