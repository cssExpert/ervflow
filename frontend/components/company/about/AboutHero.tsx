"use client";

import Link from "next/link";
import { MoveRight, Play } from "lucide-react";
import { m } from "framer-motion";
import BreadcrumbNav from "@/components/company/shared/BreadcrumbNav";

const CRUMBS = [{ label: "Company" }, { label: "About" }];
const DOT_GRID = `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function AboutHero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-white dark:bg-zinc-950">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: DOT_GRID, backgroundSize: "32px 32px" }}
        aria-hidden
      />

      {/* Animated glows */}
      <m.div
        aria-hidden
        animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 right-0 w-200 h-150 rounded-full bg-primary-500 blur-[160px] pointer-events-none"
      />
      <m.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 left-1/4 w-125 h-87.5 rounded-full bg-primary-500 blur-[130px] pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-18">
        {/* Breadcrumb */}
        <m.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BreadcrumbNav crumbs={CRUMBS} />
        </m.div>

        {/* Staggered content */}
        <m.div
          variants={STAGGER}
          initial="hidden"
          animate="visible"
          className="mt-12 md:mt-22"
        >
          {/* Floating badge */}
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
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary-500"
            />
            <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest">
              About ERVFlow
            </span>
          </m.div>

          {/* Headline — two lines stagger */}
          <m.h1
            variants={ITEM}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.08] max-w-3xl"
          >
            Building the Future of{" "}
            <m.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="bg-linear-to-r from-[#CEFF00] via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow"
            >
              Website Creation
            </m.span>
          </m.h1>

          <m.p
            variants={ITEM}
            className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
          >
            ERVFlow combines AI, visual editing, and modern development
            workflows to help agencies and businesses build beautiful websites
            faster than ever before.
          </m.p>

          {/* CTAs */}
          <m.div variants={ITEM} className="mt-10 flex flex-row gap-3">
            <m.div
              initial="idle"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 md:gap-3"
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-4 md:px-7 py-3.5 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-sm transition-colors duration-200"
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
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-4 md:px-7 py-3.5 text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-sm transition-colors duration-200"
              >
                <Play className="w-4 h-4" />
                Book a Demo
              </Link>
            </m.div>
          </m.div>
        </m.div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none"
        aria-hidden
      />
    </section>
  );
}
