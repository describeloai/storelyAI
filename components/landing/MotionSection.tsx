"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
}

const MotionSection = motion.section;

export default function MotionSectionWrapper({
  children,
  className = "",
}: MotionSectionProps) {
  return (
    <MotionSection
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </MotionSection>
  );
}
