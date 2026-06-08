"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-24 md:py-40 px-6 md:px-0 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-semibold px-4.5 py-3 rounded-full mb-8 uppercase tracking-widest">
          <Zap className="w-4 h-4 text-primary-500" />
          Next.js 15 · Tailwind · dnd-kit · Framer Motion
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tight">
          Your Skills Deserve{" "}
          <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
            More Visibility
          </span>
        </h1>
        <p className="text-md md:text-xl text-neutral-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          We help creators, professionals, and brands transform experience into
          a strong online identity that stands out.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
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
              <div className="relative z-10 flex items-center px-8 py-3.5 rounded-full text-base text-zinc-400 bg-black border border-zinc-900/60">
                <span className="font-bold text-primary-300 hover:text-primary-500 tracking-tight">
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
