"use client";

import React, { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

function FooterTextLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Updated with your exact values
  const y = useTransform(scrollYProgress, [1, 1], ["10%", "-46.5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1.05]);
  // Floor of 0.6 keeps the fade-in while staying above the 3:1 contrast
  // ratio required for large text in both modes (white/black @60% ≈ 7.4:1
  // on black, ≈ 3.8:1 on primary)
  const opacity = useTransform(scrollYProgress, [0.25, 0.75, 1], [0.6, 0.8, 1]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="w-full bg-black dark:bg-primary overflow-hidden relative flex items-center justify-center z-0 pt-10"
      style={{
        height: "25vw",
        minHeight: "100px",
        maxHeight: "550px",
      }}
    >
      <m.div
        aria-hidden="true"
        className="text-white dark:text-black font-black select-none pointer-events-none tracking-tighter absolute transition-colors duration-300"
        style={{
          // PERFECT CENTERING COMBINATION:
          top: "60%",
          left: "50%",
          x: "-51%", // Framer Motion handles the horizontal transform correctly here
          y, // Framer Motion handles the vertical transform

          scale,
          opacity,
          fontSize: "25.75vw",
          lineHeight: 0.8,
          letterSpacing: "-0.085em",
          whiteSpace: "nowrap",
        }}
      >
        ERVFlow
      </m.div>
    </div>
  );
}

export default FooterTextLogo;
