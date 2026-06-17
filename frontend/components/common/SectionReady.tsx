"use client";

import { m } from "framer-motion";
import { Zap, MoveRight } from "lucide-react";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SectionReady = () => {
  return (
    <section className="px-6 pb-28">
      <m.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl rounded-3xl border border-zinc-800/10 dark:border-white/8 bg-linear-to-br from-white/5 to-white/[0.02] p-12 text-center backdrop-blur-sm"
      >
        <div className="mb-3 flex justify-center">
          <span className="rounded-full bg-primary-500/15 p-3">
            <Zap className="h-6 w-6 text-primary-400" />
          </span>
        </div>
        <h2 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white">
          Ready to start building?
        </h2>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          Join 40,000+ developers and designers who ship faster with ERVFlow.
          Free plan available forever.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="flex items-center gap-2 rounded-sm bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(247,98,53,0.3)] transition-all hover:bg-primary-600"
          >
            Get started free
            <MoveRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-sm border border-black/10 dark:border-white/10 bg-slate-800/5 dark:bg-white/5 px-6 py-3 text-sm font-semibold text-slate-800 dark:text-white transition-all hover:text-primary-500 dark:hover:bg-white/10"
          >
            Talk to sales
          </Link>
        </div>
      </m.div>
    </section>
  );
};

export default SectionReady;
