"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "right";
}

const VARIANTS = {
  bottom: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  left:   { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  right:  { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } },
};

export default function SectionReveal({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={VARIANTS[from].hidden}
      animate={inView ? VARIANTS[from].visible : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
