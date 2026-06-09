"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-40 md:pt-50 pb-16 px-6 md:px-0 text-center">
      {/* Radial-gradient glows — no filter:blur, zero GPU cost on mobile */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-125"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.638 0.218 41.67 / 0.09) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -top-10 -right-20 w-96 h-96"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* CSS stagger entrance — framer-motion removed from critical path */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div
          className="hero-item inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-500 dark:text-primary-300 text-[10px] md:text-xs font-semibold px-4.5 py-3 rounded-full mb-8 uppercase tracking-widest"
          style={{ animationDelay: "0ms" }}
        >
          <Zap
            className="hidden sm:block w-4 h-4 text-primary-500"
            aria-hidden="true"
          />
          Next.js 15 · Tailwind · dnd-kit · Framer Motion
        </div>

        <h1
          className="hero-item text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tight text-zinc-800 dark:text-white"
          style={{ animationDelay: "120ms" }}
        >
          Your Skills Deserve{" "}
          <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
            More Visibility
          </span>
        </h1>

        <p
          className="hero-item text-md md:text-xl text-zinc-600 dark:text-neutral-200 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ animationDelay: "240ms" }}
        >
          We help creators, professionals, and brands transform experience into
          a strong online identity that stands out.
        </p>

        <div
          className="hero-item flex gap-4 justify-center flex-wrap"
          style={{ animationDelay: "360ms" }}
        >
          <Link
            className="group hidden sm:inline-flex text-indigo-300 hover:text-primary-400"
            href="/"
          >
            <motion.div
              // Framer Motion spring physics handle hover and tap smoothly!
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative group inline-flex rounded-full p-0.75 overflow-hidden bg-white dark:bg-zinc-800/40 shadow-lg cursor-pointer select-none"
            >
              {/* 1. ROTATING GLOW BEAM */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] pointer-events-none"
                style={{
                  x: "-50%",
                  y: "-50%",
                  background:
                    "conic-gradient(from 0deg at 50% 50%, transparent 60%, #F76235 85%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />

              {/* 2. INNER CONTENT CARD */}
              <div className="relative z-10 flex items-center px-10 py-4 rounded-full text-sm md:text-base text-zinc-400 bg-white dark:bg-black border group-hover:bg-primary-50 dark:group-hover:bg-black border-black/5 dark:border-zinc-900/60">
                <span className="font-bold text-slate-700 dark:text-primary-300 hover:text-primary-600 group-hover:text-primary-600 dark:hover:text-primary-500 dark:group-hover:text-primary-500 tracking-tight">
                  Get Started — Save 50%
                </span>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
