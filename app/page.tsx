"use client";

import React from "react";
import { motion } from "framer-motion";

import HeroSection from "@/components/HeroSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import PoweredBySection from "@/components/PoweredBySection";
import FeatureSection from "@/components/FeatureSection";
import PlanesSection from "@/components/PlanesSection";
import FinalCTASection from "@/components/FinalCTASection";

import AnimatedToolCard from "@/components/AnimatedToolCard";
import AnimatedDescriptionCard from "@/components/AnimatedDescriptionCard";
import AnimatedStorelyTrackCard from "@/components/AnimatedStorelyTrackCard";
import AnimatedStorelyChatCard from "@/components/AnimatedStorelyChatCard";
import AnimatedStorelyPagesCard from "@/components/AnimatedStorelyPagesCard";
import AnimatedStorelyInsightsCard from "@/components/AnimatedStorelyInsightsCard";
import AnimatedSocialAdsCard from "@/components/AnimatedSocialAdsCard";

export default function LandingPage() {
  const sectionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    padding: "1.5rem 1rem",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 1,
  };

  const textBlock = { flex: "1 1 480px" };
  const animationBlock = { flex: "1 1 280px", display: "flex", justifyContent: "center" };

  const titleBase = {
    fontSize: "2rem",
    marginBottom: "1rem",
    fontWeight: 700,
    color: "#ffffff",
  };

  const paragraphBase = {
    fontSize: "1.1rem",
    lineHeight: 1.6,
    maxWidth: "90%",
    color: "#ffffff",
  };

  const cardMotion = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.3 },
    viewport: { once: true },
  };

  return (
    <>
      <Navbar />
      <AnimatedBackground />

      <div style={{ minHeight: "100vh", overflowX: "hidden", position: "relative", zIndex: 1 }}>
        <HeroSection />

        <div style={{ padding: "4rem 1rem", textAlign: "center", backgroundColor: "transparent", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.5px", color: "#ffffff", marginBottom: "1.2rem", lineHeight: 1.2 }}>
            Te presentamos Storely ToolKit, tu copiloto definitivo para escalar tu tienda
          </h2>
          <p style={{ fontSize: "1.15rem", color: "#ffffff", maxWidth: "720px", margin: "0 auto", lineHeight: 1.7 }}>
            Más que un conjunto de funciones, ToolKit es una herramienta integral que actúa como un verdadero asistente digital. Desde la creación de descripciones y anuncios, hasta el seguimiento avanzado, la automatización de tareas repetitivas y la atención al cliente con IA, ToolKit lo concentra todo.
          </p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ fontSize: "1.35rem", fontWeight: 700, color: "#ffffff", marginTop: "2rem" }}
          >
            ¿Listo para dominar el mercado este 2025?
          </motion.p>
        </div>

        <section style={sectionStyle}>
          <div style={animationBlock}><motion.div {...cardMotion}><AnimatedDescriptionCard /></motion.div></div>
          <div style={textBlock}>
            <h2 style={titleBase}>1. Descripciones Automáticas</h2>
            <p style={paragraphBase}>Genera descripciones irresistibles para tus productos en segundos. Nuestra IA transforma ideas en textos atractivos, optimizados para SEO y adaptados al tono de tu marca.</p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={textBlock}>
            <h2 style={titleBase}>2. ¿Ya se vende esto?</h2>
            <p style={paragraphBase}>Sube una imagen de un producto y descubre si ya está en venta en otras tiendas. Te mostramos precios reales, enlaces directos y más, todo con un solo clic.</p>
          </div>
          <div style={animationBlock}><motion.div {...cardMotion}><AnimatedToolCard /></motion.div></div>
        </section>

        <section style={sectionStyle}>
          <div style={animationBlock}><motion.div {...cardMotion}><AnimatedStorelyTrackCard /></motion.div></div>
          <div style={textBlock}>
            <h2 style={titleBase}>3. StorelyTrack</h2>
            <p style={paragraphBase}>Monitorea, analiza y optimiza tu tienda con StorelyTrack. Ve en tiempo real qué productos se venden, cuánto te cuestan y cuánto estás ganando. Conecta con tus campañas fácilmente.</p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={textBlock}>
            <h2 style={titleBase}>4. StorelyChat</h2>
            <p style={paragraphBase}>Un chatbot IA que responde dudas, recomienda productos y aumenta tus conversiones. Disponible 24/7 en todos los idiomas.</p>
          </div>
          <div style={animationBlock}><motion.div {...cardMotion}><AnimatedStorelyChatCard /></motion.div></div>
        </section>

        <section style={sectionStyle}>
          <div style={animationBlock}><motion.div {...cardMotion}><AnimatedStorelyPagesCard /></motion.div></div>
          <div style={textBlock}>
            <h2 style={titleBase}>5. StorelyPages</h2>
            <p style={paragraphBase}>Crea landing pages listas para publicar en Shopify. Solo pega un enlace y genera contenido completo, estructurado y traducido automáticamente.</p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={textBlock}>
            <h2 style={titleBase}>6. StorelyInsights</h2>
            <p style={paragraphBase}>Recomendaciones diarias impulsadas por IA. Analiza a tus competidores, detecta tendencias y toma decisiones más inteligentes cada día.</p>
          </div>
          <div style={animationBlock}><motion.div {...cardMotion}><AnimatedStorelyInsightsCard /></motion.div></div>
        </section>

        <section style={sectionStyle}>
          <div style={animationBlock}><motion.div {...cardMotion}><AnimatedSocialAdsCard /></motion.div></div>
          <div style={textBlock}>
            <h2 style={titleBase}>7. Anuncios para Redes</h2>
            <p style={paragraphBase}>Genera copys listos para publicar en redes sociales como Instagram, TikTok o Facebook. Potencia tu presencia con textos que convierten.</p>
          </div>
        </section>

        <section style={{ backgroundColor: "transparent", position: "relative", zIndex: 1 }}>
          <FeatureSection />
          <PlanesSection />
        </section>

        <section style={{ backgroundColor: "transparent", position: "relative", zIndex: 1, color: "white", padding: "4rem 1rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>
            <PoweredBySection />
            <FinalCTASection />
        
          </div>
        </section>
      </div>
    </>
  );
}

