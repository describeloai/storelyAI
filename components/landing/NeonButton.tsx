import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function NeonButton({ children }: { children: React.ReactNode }) {
  const [clicked, setClicked] = useState(false);

  return (
    <Button
      size="lg"
      style={{
        background: "linear-gradient(90deg, #6a00f4, #8f00ff, #00d4ff)",
        color: "white",
        fontWeight: "bold",
        borderRadius: "1.5rem",
        padding: "1rem 2rem",
        boxShadow: "0 0 15px rgba(138, 43, 226, 0.6), 0 0 30px rgba(0, 212, 255, 0.3)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        transform: clicked ? "scale(0.95)" : "scale(1)",
      }}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 150);
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 20px rgba(138, 43, 226, 0.8), 0 0 40px rgba(0, 212, 255, 0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 15px rgba(138, 43, 226, 0.6), 0 0 30px rgba(0, 212, 255, 0.3)";
      }}
    >
      {children}
    </Button>
  );
}
