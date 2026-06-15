"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const HeroVisual = dynamic(() => import("./HeroVisual"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-125 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
  ),
});

const TRUST_BADGES = [
  "AI-Powered",
  "Visual Editor",
  "Next.js Export",
  "Tailwind CSS",
];

const Hero = () => {
  return (
    <section className="relative pt-30 md:pt-36 pb-0 px-4 sm:px-6 text-center overflow-hidden">
      {/* Background glows */}
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

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Eyebrow badge */}
        <div
          className="hero-item inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-300 text-[10px] md:text-xs font-semibold px-4 py-2.5 rounded-full uppercase tracking-widest"
          style={{ animationDelay: "0ms" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"
            aria-hidden="true"
          />
          Now in Beta — Try for free
        </div>

        {/* Headline */}
        <h1
          className="hero-item text-5xl md:text-7xl lg:text-[5.25rem] font-extrabold leading-[1.05] tracking-tight text-zinc-900 dark:text-white text-balance"
          style={{ animationDelay: "120ms" }}
        >
          Build Production-Ready{" "}
          <span className="bg-linear-to-r from-fuchsia-500 via-primary-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
            Websites with AI
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-item text-lg md:text-xl text-zinc-500 dark:text-zinc-300 max-w-2xl leading-relaxed"
          style={{ animationDelay: "240ms" }}
        >
          Generate layouts, customize visually, and export clean Next.js and
          Tailwind code — all from a single platform.
        </p>

        {/* CTAs */}
        <div
          className="hero-item flex gap-4 justify-center flex-wrap"
          style={{ animationDelay: "360ms" }}
        >
          {/* Primary — rotating glow motion button */}
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
              <div className="relative z-10 flex items-center px-10 py-3.5 rounded-full text-sm md:text-base text-zinc-400 bg-white dark:bg-black border group-hover:bg-primary-50 dark:group-hover:bg-black border-black/5 dark:border-zinc-900/60">
                <span className="font-bold text-slate-700 dark:text-primary-500 hover:text-primary-600 group-hover:text-primary-600 dark:hover:text-primary-500 dark:group-hover:text-primary-500 tracking-tight">
                  Start Building Free
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Secondary */}
          <Link
            href="/"
            className="cta-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-primary-500 dark:hover:border-primary-500 text-zinc-700 dark:text-zinc-200 font-semibold text-sm md:text-base transition-all duration-300"
          >
            <Play
              className="w-4 h-4 fill-current text-primary-500"
              aria-hidden="true"
            />
            Watch Demo
          </Link>
        </div>

        {/* Trust row */}
        <div
          className="hero-item flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          style={{ animationDelay: "320ms" }}
        >
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-400"
            >
              <svg
                className="w-3.5 h-3.5 text-primary-500 shrink-0"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="7" cy="7" r="7" className="fill-primary-500/15" />
                <path
                  d="M4 7l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {badge}
            </span>
          ))}
        </div>

        {/* Hero Visual */}
        <div
          className="hero-item w-full mt-4"
          style={{ animationDelay: "400ms" }}
        >
          <div style={{ perspective: "1400px" }}>
            <div
              style={{
                transform: "rotateX(0deg)",
                transformOrigin: "top center",
              }}
              className="transition-transform duration-700 ease-out hover:transform-[rotateX(0deg)]"
            >
              <HeroVisual />
            </div>
          </div>
          {/* Bleed into next section */}
          <div className="relative -mt-40 h-40 pointer-events-none bg-linear-to-b from-transparent to-white dark:to-black" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
