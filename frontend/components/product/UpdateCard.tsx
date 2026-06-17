"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface UpdateCardProps {
  version: string;
  date: string;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  href?: string;
}

export default function UpdateCard({
  version,
  date,
  tag,
  title,
  description,
  highlights,
  href = "#",
}: UpdateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
    >
      {/* Gradient accent bar */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(to right, #f97316, #c2440f, transparent)",
        }}
      />

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[11px] font-semibold text-primary-500 uppercase tracking-wide">
            <Sparkles className="w-3 h-3" />
            {tag}
          </span>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            v{version}
          </span>
          <span className="text-zinc-300 dark:text-zinc-600 text-xs">·</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{date}</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
          {description}
        </p>

        <ul className="space-y-2 mb-6">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <motion.div initial="idle" whileHover="hover" className="inline-block">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-400 transition-colors duration-200"
          >
            Read full release notes
            <motion.span
              variants={{ idle: { x: 0 }, hover: { x: 4 } }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
