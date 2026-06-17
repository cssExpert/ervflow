"use client";
import { m, useScroll, useTransform } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <m.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 inset-x-0 z-9999 h-0.75 bg-linear-to-r from-primary-500 via-primary-400 to-primary-300"
    />
  );
}
