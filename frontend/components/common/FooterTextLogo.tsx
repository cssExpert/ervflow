"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function FooterTextLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Updated with your exact values
  const y = useTransform(scrollYProgress, [1, 1], ["10%", "-43.5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [1, 1, 1], [0.25, 0.5, 1]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-primary overflow-hidden relative flex items-center justify-center z-0"
      style={{
        height: "25vw",
        minHeight: "100px",
        maxHeight: "520px",
      }}
    >
      <motion.div
        className="text-black font-black select-none pointer-events-none tracking-tighter absolute"
        style={{
          // PERFECT CENTERING COMBINATION:
          top: "50%",
          left: "50%",
          x: "-51%", // Framer Motion handles the horizontal transform correctly here
          y, // Framer Motion handles the vertical transform

          scale,
          opacity,
          fontSize: "30.5vw",
          lineHeight: 0.8,
          letterSpacing: "-0.085em",
          whiteSpace: "nowrap",
        }}
      >
        ervflow
      </motion.div>
    </div>
  );
}

export default FooterTextLogo;
