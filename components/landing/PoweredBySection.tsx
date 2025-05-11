"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PoweredBySection() {
  const logos = [
    { src: "/logos/vercel-white.png", alt: "Vercel" },
    { src: "/logos/openai-white.png", alt: "OpenAI" },
    { src: "/logos/stripe-white.png", alt: "Stripe" },
    { src: "/logos/shopify-white.png", alt: "Shopify" },
  ];

  return (
    <section
      style={{
        padding: "4rem 2rem",
        textAlign: "center",
        backgroundColor: "transparent",
        position: "relative",
        zIndex: 1,
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: "1.6rem",
          color: "white",
          fontWeight: 700,
          marginBottom: "2rem",
        }}
      >
        
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        {logos.map(({ src, alt }) => (
          <Image
            key={alt}
            src={src}
            alt={alt}
            width={120}
            height={120}
            style={{
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
