"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  cardStyle,
  cardBodyStyle,
  descriptionStyle,
} from "@/components/landing/CardStyles";

interface ProductCheckSectionProps {
  selectedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
}

export default function ProductCheckSection({
  selectedFile,
  handleFileChange,
  previewUrl,
}: ProductCheckSectionProps) {
  const darkPurple = "#371866"; // morado oscuro elegante

  return (
    <section
      id="product-check"
      style={{
        padding: "4rem 1rem",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "2rem",
          fontWeight: "bold",
          color: darkPurple,
        }}
      >
        ¿Ya se vende esto?
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Card shadow="lg" isPressable style={cardStyle}>
          <CardBody style={cardBodyStyle}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                display: "block",
                width: "100%",
                padding: "0.75rem",
                border: `2px solid ${darkPurple}`,
                borderRadius: "8px",
                backgroundColor: "transparent",
                color: darkPurple,
                cursor: "pointer",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  borderRadius: "1rem",
                  marginTop: "1rem",
                }}
              />
            )}
            <p
              style={{
                ...descriptionStyle,
                color: darkPurple,
              }}
            >
              Sube una foto de tu producto y descubre en qué sitios se está vendiendo.
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </section>
  );
}
