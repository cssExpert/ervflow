"use client";
import Link from "next/link";
import { MoveRight, Star } from "lucide-react";
import { m } from "framer-motion";
import BreadcrumbNav from "@/components/company/shared/BreadcrumbNav";

const CRUMBS = [{ label: "Company" }, { label: "Hire an Expert" }];
const DOT_GRID = `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`;

const AVATARS = [
  { initials: "SR", gradient: "from-violet-500 to-purple-600" },
  { initials: "MJ", gradient: "from-blue-500 to-cyan-600" },
  { initials: "PM", gradient: "from-emerald-500 to-teal-600" },
  { initials: "CM", gradient: "from-amber-500 to-orange-500" },
  { initials: "AO", gradient: "from-rose-500 to-pink-600" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ExpertHero() {
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
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -left-40 -translate-y-1/2 w-175 h-125 rounded-full bg-primary-500 blur-[160px] pointer-events-none"
      />
      <m.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute -bottom-20 right-1/4 w-100 h-75 rounded-full bg-primary-500 blur-[130px] pointer-events-none"
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

        <m.div
          variants={STAGGER}
          initial="hidden"
          animate="visible"
          className="mt-12 md:mt-18"
        >
          {/* Avatar stack — staggered drop-in */}
          <m.div variants={ITEM} className="flex items-center gap-3 mb-6">
            <div className="flex -space-x-2">
              {AVATARS.map(({ initials, gradient }, i) => (
                <m.div
                  key={initials}
                  initial={{ opacity: 0, y: -20, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.4 + i * 0.07,
                    type: "spring",
                    stiffness: 300,
                    damping: 16,
                  }}
                  whileHover={{
                    y: -4,
                    zIndex: 10,
                    scale: 1.15,
                    transition: { duration: 0.15 },
                  }}
                  className={`relative w-9 h-9 rounded-full bg-linear-to-br ${gradient} border-2 border-white dark:border-zinc-950 flex items-center justify-center text-[10px] font-bold text-white cursor-default`}
                  aria-hidden
                >
                  {initials}
                </m.div>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <strong className="text-zinc-800 dark:text-zinc-200">4.9</strong> from 500+ projects
            </span>
          </m.div>

          {/* Animated badge */}
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
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-primary-500"
            />
            <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest">
              Expert Network Available
            </span>
          </m.div>

          {/* Headline */}
          <m.h1
            variants={ITEM}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.08] max-w-3xl"
          >
            Get Expert Help{" "}
            <m.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="bg-linear-to-r from-[#CEFF00] via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow"
            >
              When You Need It
            </m.span>
          </m.h1>

          <m.p
            variants={ITEM}
            className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
          >
            Work with certified ERVFlow professionals to design, build,
            optimize, and launch your website — faster and better than going it
            alone.
          </m.p>

          {/* CTAs */}
          <m.div variants={ITEM} className="mt-10 flex flex-row gap-3">
            <m.div
              initial="idle"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="#directory"
                className="inline-flex items-center justify-center gap-2 px-4 md:px-7 py-3.5 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-sm transition-colors duration-200"
              >
                <m.span
                  variants={{ idle: { scale: 1 }, hover: { scale: 1.03 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2"
                >
                  Find an Expert
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
                href="#become-expert"
                className="inline-flex items-center justify-center gap-2 px-4 md:px-7 py-3.5 text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-sm transition-colors duration-200"
              >
                Become an Expert
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
