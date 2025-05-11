"use client";

import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  LuClock3,
  LuMegaphone,
  LuBrain,
  LuBolt,
  LuBot,
  LuLayers, // ✅ reemplaza a LuStack
} from "react-icons/lu";

// 👉 Estilos centralizados
import {
  cardStyle,
  cardBodyStyle,
  titleStyle,
  descriptionStyle,
} from "@/components/landing/CardStyles";

const features = [
  {
    icon: <LuClock3 size={36} />,
    title: "Acelera tu productividad",
    description: "Dedica tiempo a lo que importa. Storely automatiza el resto.",
  },
  {
    icon: <LuMegaphone size={36} />,
    title: "Anuncios que venden",
    description: "Genera copys que convierten con IA entrenada en ecommerce.",
  },
  {
    icon: <LuBrain size={36} />,
    title: "Inteligencia competitiva",
    description: "Analiza a tu competencia y recibe insights accionables.",
  },
  {
    icon: <LuBolt size={36} />,
    title: "Automatización total",
    description: "Desde descripciones hasta tracking, Storely ejecuta por ti.",
  },
  {
    icon: <LuBot size={36} />,
    title: "Atención 24/7 con IA",
    description: "Chatbots que venden por ti en todos los idiomas y horarios.",
  },
  {
    icon: <LuLayers size={36} />,
    title: "Todo en un solo lugar",
    description: "Una única plataforma para crear, analizar, vender y escalar.",
  },
];

export default function FeatureSection() {
  return (
    <section
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
          color: "white",
        }}
      >
        Todo lo que tu tienda necesita
      </h2>

      <div className="responsive-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.05,
            }}
            whileHover={{
              scale: 1.03,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
          >
            <Card shadow="lg" isPressable style={cardStyle}>
              <CardBody style={cardBodyStyle}>
                <div>{feature.icon}</div>
                <h3 style={titleStyle}>{feature.title}</h3>
                <p style={descriptionStyle}>{feature.description}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
