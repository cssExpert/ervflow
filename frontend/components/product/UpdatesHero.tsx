"use client";

import Link from "next/link";
import { MoveLeft, Rss } from "lucide-react";
import { m } from "framer-motion";
import BreadcrumbNav from "@/components/company/shared/BreadcrumbNav";

const CRUMBS = [{ label: "Product", href: "/product" }, { label: "Updates" }];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DOT_GRID_LIGHT = `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23000000'/%3E%3C/svg%3E")`;
const DOT_GRID_DARK = `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`;

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function UpdatesHero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-zinc-950 pt-32 pb-16 sm:pb-20">
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

      {/* Subtle glow */}
      <m.div
        aria-hidden
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[24rem] rounded-full bg-primary-500 blur-[140px] pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <BreadcrumbNav crumbs={CRUMBS} />
        </m.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <m.div
            variants={STAGGER}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <m.span
              variants={ITEM}
              className="text-xs font-semibold uppercase tracking-widest text-primary-500"
            >
              Changelog & Updates
            </m.span>
            <m.h1
              variants={ITEM}
              className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.08]"
            >
              What&apos;s New in ERVFlow
            </m.h1>
            <m.p
              variants={ITEM}
              className="mt-5 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              Every feature, improvement, and fix we ship — documented here.
              Stay up to date on what&apos;s changed and what&apos;s coming
              next.
            </m.p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            className="flex items-center gap-3"
          >
            <Link
              href="/product"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
            >
              <MoveLeft className="w-4 h-4" />
              Back to Product
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <Link
              href="/product/updates/feed.xml"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors duration-200"
            >
              <Rss className="w-3.5 h-3.5" />
              RSS Feed
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  );
}
