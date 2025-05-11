// components/LottieWrapper.tsx
"use client";

import Lottie from "lottie-react";

export default function LottieWrapper({ animationData }: { animationData: any }) {
  return (
    <div style={{ width: 280, height: 280 }}>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
