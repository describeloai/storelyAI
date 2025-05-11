"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const sections = [
    {
      name: "hero",
      height: "100vh",
      blobs: [
        // IZQUIERDA
        { color: "#8e8ce9", top: "10%", left: "5%", size: 500, delay: 0 },
        { color: "#856adf", top: "30%", left: "10%", size: 600, delay: 1 },
        { color: "#00bcd4", top: "50%", left: "15%", size: 550, delay: 2 },
        { color: "#6a57d4", top: "70%", left: "0%", size: 500, delay: 3 },
        { color: "#4e3e99", top: "85%", left: "10%", size: 600, delay: 3.5 },
        // DERECHA
        { color: "#a397f2", top: "15%", left: "85%", size: 450, delay: 1.2 },
        { color: "#7a6de2", top: "35%", left: "90%", size: 500, delay: 2.1 },
        { color: "#8c87e6", top: "60%", left: "80%", size: 550, delay: 2.9 },
        { color: "#998cf5", top: "75%", left: "95%", size: 480, delay: 3.8 },
      ],
    },
    {
      name: "transicion",
      height: "100vh",
      blobs: [
        // IZQUIERDA
        { color: "#6e4acc", top: "10%", left: "10%", size: 650, delay: 0 },
        { color: "#5c3cb4", top: "25%", left: "0%", size: 700, delay: 0.8 },
        { color: "#4733a3", top: "45%", left: "5%", size: 750, delay: 1.5 },
        { color: "#3a2778", top: "60%", left: "15%", size: 600, delay: 2.2 },
        { color: "#2e1c64", top: "80%", left: "10%", size: 650, delay: 2.7 },
        // DERECHA
        { color: "#6f4ff0", top: "20%", left: "85%", size: 600, delay: 1.3 },
        { color: "#5d3dc9", top: "45%", left: "90%", size: 700, delay: 2.4 },
        { color: "#4a35a0", top: "65%", left: "95%", size: 600, delay: 3.2 },
      ],
    },
    {
      name: "zona-oscura",
      height: "100vh",
      blobs: [
        // IZQUIERDA
        { color: "#2f0070", top: "10%", left: "0%", size: 700, delay: 0 },
        { color: "#440088", top: "30%", left: "10%", size: 800, delay: 1 },
        { color: "#1d0040", top: "50%", left: "5%", size: 750, delay: 1.8 },
        { color: "#120033", top: "70%", left: "15%", size: 600, delay: 2.4 },
        { color: "#1a0033", top: "85%", left: "0%", size: 700, delay: 2.9 },
        // DERECHA
        { color: "#35105f", top: "25%", left: "85%", size: 700, delay: 1.4 },
        { color: "#2a004a", top: "55%", left: "95%", size: 750, delay: 2.6 },
        { color: "#3d006e", top: "75%", left: "90%", size: 800, delay: 3.5 },
      ],
    },
    {
      name: "final",
      height: "250vh",
      blobs: [
        // IZQUIERDA
        { color: "#0a0012", top: "5%", left: "0%", size: 1000, delay: 0 },
        { color: "#1e0030", top: "20%", left: "10%", size: 950, delay: 1 },
        { color: "#220030", top: "40%", left: "5%", size: 1000, delay: 2 },
        { color: "#0d001a", top: "55%", left: "15%", size: 1000, delay: 3 },
        { color: "#14001e", top: "70%", left: "10%", size: 950, delay: 4 },
        { color: "#05000b", top: "80%", left: "5%", size: 900, delay: 5 },
        { color: "#100020", top: "90%", left: "0%", size: 950, delay: 6 },
        { color: "#190030", top: "95%", left: "15%", size: 950, delay: 7 },
        // DERECHA
        { color: "#0b0015", top: "10%", left: "85%", size: 1000, delay: 1.3 },
        { color: "#1a0025", top: "30%", left: "90%", size: 950, delay: 2.4 },
        { color: "#16001c", top: "60%", left: "95%", size: 1000, delay: 3.7 },
        { color: "#0c0010", top: "80%", left: "90%", size: 950, delay: 4.8 },
        { color: "#0f0018", top: "95%", left: "85%", size: 900, delay: 5.9 },
      ],
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "700vh",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {sections.map((section, index) => (
        <div
          key={section.name}
          style={{
            position: "absolute",
            top: `${sections
              .slice(0, index)
              .reduce((acc, s) => acc + parseInt(s.height), 0)}vh`,
            left: 0,
            width: "100%",
            height: section.height,
          }}
        >
          {section.blobs.map((blob, i) => (
            <motion.div
              key={i}
              animate={{
                x: ["0%", "10%", "-10%", "0%"],
                y: ["0%", "-10%", "10%", "0%"],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
                delay: blob.delay,
              }}
              style={{
                position: "absolute",
                top: blob.top,
                left: blob.left,
                width: blob.size,
                height: blob.size,
                background: blob.color,
                opacity: 0.5,
                filter: "blur(50px)",
                borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
                mixBlendMode: "screen",
                transition: "all 0.2s ease-in-out",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
