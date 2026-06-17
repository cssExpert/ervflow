"use client";

import Link from "next/link";
import { MoveRight, Play } from "lucide-react";
import { m } from "framer-motion";
import BreadcrumbNav from "@/components/company/shared/BreadcrumbNav";

const CRUMBS = [{ label: "Product" }];

const DOT_GRID_LIGHT = `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23000000'/%3E%3C/svg%3E")`;
const DOT_GRID_DARK = `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const INLINE_STATS = [
  { value: "10,000+", label: "Websites" },
  { value: "500+", label: "Teams" },
  { value: "99.9%", label: "Uptime" },
  { value: "50%", label: "Faster Launch" },
];

export default function ProductHero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-white dark:bg-zinc-950">
      {/* Light mode dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] block dark:hidden"
        style={{ backgroundImage: DOT_GRID_LIGHT, backgroundSize: "32px 32px" }}
        aria-hidden
      />
      {/* Dark mode dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] hidden dark:block"
        style={{ backgroundImage: DOT_GRID_DARK, backgroundSize: "32px 32px" }}
        aria-hidden
      />

      {/* Glow blobs */}
      <m.div
        aria-hidden
        animate={{ scale: [1, 1.14, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 right-0 w-[50rem] h-[37.5rem] rounded-full bg-primary-500 blur-[160px] pointer-events-none"
      />
      <m.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 left-1/4 w-[31.25rem] h-[21.875rem] rounded-full bg-primary-500 blur-[130px] pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Breadcrumb */}
        <m.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BreadcrumbNav crumbs={CRUMBS} />
        </m.div>

        <m.div
          variants={STAGGER}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          {/* Badge */}
          <m.div
            variants={ITEM}
            animate={{ y: [0, -5, 0] }}
            transition={{
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-500/20 bg-primary-500/8 mb-6"
          >
            <m.span
              aria-hidden
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary-500"
            />
            <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest">
              AI-Powered Platform
            </span>
          </m.div>

          {/* Headline */}
          <m.h1
            variants={ITEM}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.08] max-w-3xl"
          >
            Build Beautiful Websites{" "}
            <m.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="bg-linear-to-r from-[#CEFF00] via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow"
            >
              with AI
            </m.span>
          </m.h1>

          <m.p
            variants={ITEM}
            className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
          >
            Generate, customize, and publish production-ready websites with an
            AI-powered visual builder designed for agencies and businesses.
          </m.p>

          {/* CTAs */}
          <m.div variants={ITEM} className="mt-10 flex flex-row gap-3 flex-wrap">
            <m.div
              initial="idle"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-sm transition-colors duration-200"
              >
                <m.span
                  variants={{ idle: { scale: 1 }, hover: { scale: 1.03 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2"
                >
                  Start Building
                  <m.span
                    variants={{ idle: { x: 0 }, hover: { x: 5 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  >
                    <MoveRight className="w-4 h-4" />
                  </m.span>
                </m.span>
              </Link>
            </m.div>
            <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-sm transition-colors duration-200"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Link>
            </m.div>
          </m.div>

          {/* Inline social proof stats */}
          <m.div
            variants={ITEM}
            className="mt-10 flex flex-wrap gap-6 sm:gap-10"
          >
            {INLINE_STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {value}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </m.div>
        </m.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none"
        aria-hidden
      />
    </section>
  );
}
