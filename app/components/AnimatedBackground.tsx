"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const sections = [
    {
      name: "hero",
      height: "100vh",
      blobs: [
        { color: "#371866", top: "10%", left: "10%", size: 700, delay: 0 },
        { color: "#8e8ce9", top: "40%", left: "80%", size: 550, delay: 1 },
        { color: "#00bcd4", top: "65%", left: "20%", size: 600, delay: 2 },
        { color: "#bcb2f0", top: "30%", left: "60%", size: 500, delay: 3 }, // reemplazo lavanda pálido
      ],
    },
    {
      name: "transicion",
      height: "100vh",
      blobs: [
        { color: "#6e4acc", top: "20%", left: "30%", size: 700, delay: 0 },
        { color: "#4733a3", top: "55%", left: "50%", size: 800, delay: 1 },
        { color: "#003966", top: "70%", left: "70%", size: 750, delay: 2 },
        { color: "#a79af2", top: "40%", left: "20%", size: 400, delay: 3 }, // violeta claro, sin blanco
      ],
    },
    {
      name: "zona-oscura",
      height: "100vh",
      blobs: [
        { color: "#2f0070", top: "25%", left: "20%", size: 850, delay: 0 },
        { color: "#440088", top: "60%", left: "50%", size: 800, delay: 1 },
        { color: "#1d0040", top: "40%", left: "80%", size: 750, delay: 2 },
        { color: "#120033", top: "70%", left: "30%", size: 600, delay: 3 },
      ],
    },
    {
      name: "final",
      height: "250vh",
      blobs: [
        { color: "#0a0012", top: "10%", left: "10%", size: 1000, delay: 0 },
        { color: "#1e0030", top: "30%", left: "60%", size: 1000, delay: 1 },
        { color: "#220030", top: "60%", left: "30%", size: 950, delay: 2 },
        { color: "#0d001a", top: "50%", left: "75%", size: 1050, delay: 3 },
        { color: "#14001e", top: "80%", left: "40%", size: 900, delay: 4 },
        { color: "#05000b", top: "90%", left: "20%", size: 800, delay: 5 },
        { color: "#100020", top: "75%", left: "60%", size: 950, delay: 6 },
        { color: "#190030", top: "85%", left: "50%", size: 1000, delay: 7 },
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
