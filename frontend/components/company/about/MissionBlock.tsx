"use client";
import { useRef } from "react";
import { CheckCircle2, MoveRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BELIEFS = [
  "AI should accelerate creativity, not replace it",
  "Beautiful websites should be accessible to every team",
  "Developer experience is product experience",
  "Speed and quality are not trade-offs",
];

const MISSION_STATS = [
  { value: "10x", label: "faster to launch" },
  { value: "1", label: "platform for all" },
  { value: "∞", label: "team sizes" },
];

const COMPARISON = [
  {
    label: "Launch Time",
    traditional: { display: "3–6 months", pct: 88 },
    ervflow: { display: "~2 weeks", pct: 14 },
  },
  {
    label: "Tools Required",
    traditional: { display: "6+ tools", pct: 74 },
    ervflow: { display: "1 platform", pct: 11 },
  },
  {
    label: "Team Needed",
    traditional: { display: "3–5 people", pct: 62 },
    ervflow: { display: "Any 1 person", pct: 10 },
  },
];

/* ── Mission Section ─────────────────────────────────── */
function BeliefsPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
    >
      {/* Header row */}
      <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary-500" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Our Principles
        </span>
      </div>

      {/* Beliefs list */}
      <ul className="divide-y divide-zinc-800/60">
        {BELIEFS.map((belief, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.18 + i * 0.1 }}
            className="flex items-start gap-3.5 px-6 py-4 hover:bg-zinc-800/30 transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-primary-400" />
            </div>
            <span className="text-sm text-zinc-300 leading-relaxed">
              {belief}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Stat pills at bottom */}
      <div className="grid grid-cols-3 divide-x divide-zinc-800 border-t border-zinc-800">
        {MISSION_STATS.map(({ value, label }) => (
          <div key={label} className="px-4 py-4 text-center">
            <p className="text-2xl font-bold text-zinc-100">{value}</p>
            <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
              {label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Problem Section ─────────────────────────────────── */
function ComparisonPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
    >
      {/* Top metric cells */}
      <div className="grid grid-cols-3 divide-x divide-zinc-800 border-b border-zinc-800">
        {[
          { value: "3–6 mo", label: "avg. time to launch" },
          { value: "6+", label: "tools required" },
          { value: "$50k+", label: "avg. project cost" },
        ].map(({ value, label }) => (
          <div key={label} className="px-4 py-5 text-center">
            <p className="text-xl font-bold text-zinc-100">{value}</p>
            <p className="text-[11px] text-zinc-500 mt-1 leading-tight">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Comparison bars */}
      <div className="px-6 py-5 space-y-5">
        {COMPARISON.map(({ label, traditional, ervflow }, i) => (
          <div key={label}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-2.5">
              {label}
            </p>

            {/* Traditional row */}
            <div className="flex items-center gap-3 mb-1.5">
              <span className="w-24 shrink-0 text-xs text-zinc-500">
                Traditional
              </span>
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-zinc-600"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${traditional.pct}%` } : {}}
                  transition={{
                    duration: 1.1,
                    ease: EASE,
                    delay: 0.3 + i * 0.12,
                  }}
                />
              </div>
              <span className="w-20 shrink-0 text-right text-xs text-zinc-500">
                {traditional.display}
              </span>
            </div>

            {/* ERVFlow row */}
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs font-semibold text-zinc-200">
                ERVFlow
              </span>
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary-500"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${ervflow.pct}%` } : {}}
                  transition={{
                    duration: 0.9,
                    ease: EASE,
                    delay: 0.45 + i * 0.12,
                  }}
                />
              </div>
              <span className="w-20 shrink-0 text-right text-xs font-semibold text-primary-400">
                {ervflow.display}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="px-6 pb-5 text-[11px] text-zinc-600 leading-relaxed border-t border-zinc-800/60 pt-4">
        Estimates based on median agency project data. ERVFlow includes AI
        generation, visual editing, and one-click publishing in a single
        platform.
      </p>
    </motion.div>
  );
}

/* ── Main Export ─────────────────────────────────────── */
export default function MissionBlock() {
  const missionTextRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionTextRef, {
    once: true,
    margin: "-80px",
  });

  const problemTextRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemTextRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <>
      {/* ── Mission ── */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <motion.div
              ref={missionTextRef}
              initial={{ opacity: 0, x: -40 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
                Our Mission
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-tight leading-[1.1]">
                Making web creation fast, collaborative, and accessible.
              </h2>
              <p className="mt-5 text-base text-zinc-400 leading-relaxed">
                We believe professional websites should be within reach for
                every team — not just those with large budgets or deep technical
                expertise. ERVFlow bridges design, content, and engineering in
                one AI-powered platform.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-block"
              >
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-zinc-100 hover:text-zinc-100 bg-[#405b50] rounded-sm transition-colors duration-200"
                >
                  Start for free
                  <MoveRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — beliefs panel */}
            <BeliefsPanel />
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-20 sm:py-28 bg-zinc-900/40 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — comparison panel */}
            <ComparisonPanel />

            {/* Right — text */}
            <motion.div
              ref={problemTextRef}
              initial={{ opacity: 0, x: 40 }}
              animate={problemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
                The Problem We Solve
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 tracking-tight leading-[1.1]">
                Traditional website creation is broken.
              </h2>
              <p className="mt-5 text-base text-zinc-400 leading-relaxed">
                Teams spend months juggling designers, developers, and half a
                dozen tools that don&apos;t talk to each other. Projects blow
                budgets, timelines slip, and the result still needs constant
                maintenance.
              </p>
              <p className="mt-4 text-base text-zinc-400 leading-relaxed">
                ERVFlow replaces the entire fragmented stack — from design and
                content to development and publishing — in a single
                AI-accelerated platform.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-block"
              >
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-zinc-100 hover:text-zinc-100 bg-[#405b50] rounded-sm transition-colors duration-200"
                >
                  See how it works
                  <MoveRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
