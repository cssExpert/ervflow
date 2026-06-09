"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { Zap } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.4 });

  return (
    <section className="pt-40 md:pt-50 pb-16 px-6 md:px-0 text-center">
      {/* Background glows */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 h-125 w-175 -translate-x-1/2 rounded-full bg-primary-500/8 blur-[120px]" />
        <div className="absolute -top-10 -right-20 h-96 w-96 rounded-full bg-violet-500/8 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-500/6 blur-[100px]" />
      </div>

      <motion.div
        ref={heroRef}
        variants={headerVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto space-y-6"
      >
        <motion.div
          variants={headerItemVariants}
          className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-300 text-[10px] md:text-xs font-semibold px-4.5 py-3 rounded-full mb-8 uppercase tracking-widest"
        >
          <Zap className="hidden sm:block w-4 h-4 text-primary-500" />
          Next.js 15 · Tailwind · dnd-kit · Framer Motion
        </motion.div>

        <motion.h1
          variants={headerItemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tight text-zinc-800 dark:text-white"
        >
          Your Skills Deserve{" "}
          <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
            More Visibility
          </span>
        </motion.h1>

        <motion.p
          variants={headerItemVariants}
          className="text-md md:text-xl text-zinc-500 dark:text-neutral-200 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          We help creators, professionals, and brands transform experience into
          a strong online identity that stands out.
        </motion.p>

        <motion.div
          variants={headerItemVariants}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            className="group text-indigo-300 hover:text-indigo-500"
            href="/"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative inline-flex rounded-full p-[2.5px] overflow-hidden bg-zinc-800/40 shadow-lg cursor-pointer select-none"
            >
              {/* CSS-animated conic gradient border — avoids Framer Motion JS ticker */}
              <span
                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, transparent 60%, #F76235 85%, transparent 100%)",
                }}
              />
              <div className="relative z-10 flex items-center px-8 py-3.5 rounded-full text-base text-zinc-400 bg-black border border-zinc-900/60">
                <span className="font-bold text-primary-300 hover:text-primary-500 tracking-tight">
                  Get Started — Save 50%
                </span>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
