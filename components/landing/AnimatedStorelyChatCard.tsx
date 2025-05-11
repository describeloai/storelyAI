"use client";

import dynamic from "next/dynamic";
import animationData from "../../assets/animations/storelyChatBot.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function AnimatedStorelyChatCard() {
  return (
    <div
      style={{
        width: 280,
        height: 280,
        borderRadius: 20,
        overflow: "hidden",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}