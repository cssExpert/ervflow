"use client";
import { useRef } from "react";
import {
  ClipboardList,
  UserCheck,
  Rocket,
  MoveRight,
  FileCheck2,
  Code2,
} from "lucide-react";
import { m, useInView } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Submit Your Requirements",
    description:
      "Tell us about your project goals, timeline, and budget. Our brief intake process takes less than 5 minutes.",
  },
  {
    num: "02",
    icon: UserCheck,
    title: "Get Matched",
    description:
      "We analyze your needs and connect you with the best-fit certified expert from our vetted network within 24 hours.",
  },
  {
    num: "03",
    icon: FileCheck2,
    title: "Scope & Kickoff",
    description:
      "Your expert reviews the brief, finalises a clear scope of work, and schedules a kickoff call to align on deliverables.",
  },
  {
    num: "04",
    icon: Code2,
    title: "Build & Iterate",
    description:
      "Work progresses in focused sprints with milestone check-ins, live previews, and a built-in feedback loop.",
  },
  {
    num: "05",
    icon: Rocket,
    title: "Launch & Handover",
    description:
      "Go live with confidence. Receive full handover documentation, assets, and optional post-launch support.",
  },
];

/* ── Vertical timeline card ────────────────────────────── */
function TimelineCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: -44 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
      className="h-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
    >
      {/* Card header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary-500" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
          Your Journey
        </span>
      </div>

      {/* Timeline body */}
      <div className="px-6 py-7 flex-1 relative">
        {/* Animated vertical line */}
        <div
          className="absolute left-[2.35rem] top-7 bottom-7 w-px bg-zinc-100 dark:bg-zinc-800 overflow-hidden"
          aria-hidden
        >
          <m.div
            className="w-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(247,98,53,0.8), rgba(247,98,53,0.15))",
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
          />
        </div>

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <m.div
              key={step.num}
              initial={{ opacity: 0, x: -18 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: EASE,
                delay: 0.28 + i * 0.16,
              }}
              className="flex gap-4 relative"
            >
              {/* Step icon */}
              <m.div
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  delay: 0.35 + i * 0.16,
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                whileHover={{ scale: 1.1, rotate: 8 }}
                className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center shrink-0 z-10 cursor-default"
              >
                <span className="text-[9px] font-mono text-primary-500/60 leading-none">
                  {step.num}
                </span>
                <step.icon className="w-4 h-4 text-primary-400 mt-0.5" />
              </m.div>

              {/* Step text */}
              <div className="pt-0.5">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Card footer */}
      <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <span className="text-[11px] text-zinc-500 dark:text-zinc-600">
          Avg. time to first delivery: 48–72h
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
            aria-hidden
          />
          <span className="text-[11px] text-zinc-500 dark:text-zinc-500">
            Experts online now
          </span>
        </div>
      </div>
    </m.div>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export default function HowItWorks() {
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950 border-y border-zinc-100 dark:border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left — vertical timeline card */}
          <TimelineCard />

          {/* Right — text content */}
          <m.div
            ref={textRef}
            initial={{ opacity: 0, x: 44 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Process
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1]">
              From brief to launch in three steps.
            </h2>
            <p className="mt-5 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Getting expert help shouldn&apos;t be complicated. Our streamlined
              matching process connects you with the right professional in hours
              — not weeks.
            </p>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              From the moment you submit your brief to your final delivery, your
              assigned expert handles everything with full transparency and
              built-in collaboration tools.
            </p>

            {/* Mini stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { value: "<5 min", label: "to submit a brief" },
                { value: "24h", label: "to get matched" },
                { value: "48–72h", label: "avg. first delivery" },
                { value: "100%", label: "satisfaction guarantee" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                >
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {value}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <m.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-block"
            >
              <Link
                href="#directory"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-zinc-100 dark:text-zinc-100 hover:text-zinc-200 dark:hover:text-zinc-100 bg-[#405b50] rounded-sm transition-colors duration-200"
              >
                Find an Expert Now
                <MoveRight className="w-4 h-4" />
              </Link>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
