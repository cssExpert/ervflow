"use client";

import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type CellValue = true | false | "partial" | string;

const ROWS: { feature: string; ervflow: CellValue; traditional: CellValue }[] =
  [
    {
      feature: "AI website generation from text",
      ervflow: true,
      traditional: false,
    },
    {
      feature: "Visual drag-and-drop editor",
      ervflow: true,
      traditional: "partial",
    },
    {
      feature: "Built-in CMS & content management",
      ervflow: true,
      traditional: "partial",
    },
    {
      feature: "One-click deployment to any host",
      ervflow: true,
      traditional: false,
    },
    {
      feature: "Real-time client collaboration & approvals",
      ervflow: true,
      traditional: false,
    },
    {
      feature: "SEO and Core Web Vitals built-in",
      ervflow: true,
      traditional: "partial",
    },
    {
      feature: "White-label client portals",
      ervflow: true,
      traditional: false,
    },
    {
      feature: "No-code to full-code flexibility",
      ervflow: true,
      traditional: false,
    },
    {
      feature: "Performance analytics dashboard",
      ervflow: true,
      traditional: "partial",
    },
    {
      feature: "Average time to first live page",
      ervflow: "< 5 minutes",
      traditional: "3–5 days",
    },
  ];

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center">
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center">
        <XCircle className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex items-center justify-center">
        <MinusCircle className="w-5 h-5 text-amber-400" />
      </span>
    );
  }
  return (
    <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {value}
    </span>
  );
}

export default function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 sm:py-28 bg-[#F9F9F9] dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            Comparison
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1]">
            ERVFlow vs. Traditional Approach
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            See how ERVFlow stacks up against building websites with separate
            tools, freelancers, and manual workflows.
          </p>
        </SectionReveal>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_150px_150px] border-b border-zinc-200 dark:border-zinc-800">
            <div className="p-4 sm:p-5" />
            <div className="p-4 sm:p-5 text-center border-l border-zinc-200 dark:border-zinc-800 bg-primary-500/5">
              <span className="text-xs sm:text-sm font-bold text-primary-500 uppercase tracking-wide">
                ERVFlow
              </span>
            </div>
            <div className="p-4 sm:p-5 text-center border-l border-zinc-200 dark:border-zinc-800">
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Traditional
              </span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.06 }}
              className={`grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_150px_150px] ${
                i < ROWS.length - 1
                  ? "border-b border-zinc-100 dark:border-zinc-800/60"
                  : ""
              } hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors duration-150`}
            >
              <div className="p-4 sm:p-5 flex items-center">
                <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {row.feature}
                </span>
              </div>
              <div className="p-4 sm:p-5 flex items-center justify-center border-l border-zinc-100 dark:border-zinc-800/60 bg-primary-500/[0.02]">
                <Cell value={row.ervflow} />
              </div>
              <div className="p-4 sm:p-5 flex items-center justify-center border-l border-zinc-100 dark:border-zinc-800/60">
                <Cell value={row.traditional} />
              </div>
            </motion.div>
          ))}

          {/* Legend */}
          <div className="px-4 sm:px-5 py-3 bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Fully
              supported
            </span>
            <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <MinusCircle className="w-3.5 h-3.5 text-amber-400" /> Partial /
              plugin required
            </span>
            <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <XCircle className="w-3.5 h-3.5 text-zinc-400" /> Not available
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
