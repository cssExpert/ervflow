"use client";
import { useRef } from "react";
import {
  Palette,
  Code2,
  RefreshCcw,
  BarChart2,
  FileText,
  GraduationCap,
  MoveRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import SectionReveal from "@/components/company/shared/SectionReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    icon: Palette,
    title: "Website Design",
    desc: "Custom website design tailored to your brand identity and conversion goals.",
    iconColor: "text-violet-400",
    iconBg: "border-violet-500/20 bg-violet-500/10",
  },
  {
    icon: Code2,
    title: "Custom Development",
    desc: "Advanced functionality, third-party integrations, and custom component builds.",
    iconColor: "text-blue-400",
    iconBg: "border-blue-500/20 bg-blue-500/10",
  },
  {
    icon: RefreshCcw,
    title: "Platform Migration",
    desc: "Move your existing website to ERVFlow with zero data loss and minimal downtime.",
    iconColor: "text-emerald-400",
    iconBg: "border-emerald-500/20 bg-emerald-500/10",
  },
  {
    icon: BarChart2,
    title: "SEO & Performance",
    desc: "Optimize your site for Core Web Vitals, search visibility, and conversion rates.",
    iconColor: "text-amber-400",
    iconBg: "border-amber-500/20 bg-amber-500/10",
  },
  {
    icon: FileText,
    title: "Content Creation",
    desc: "Professional copywriting, content strategy, and AI-assisted content pipelines.",
    iconColor: "text-rose-400",
    iconBg: "border-rose-500/20 bg-rose-500/10",
  },
  {
    icon: GraduationCap,
    title: "Training & Support",
    desc: "Team onboarding, platform training, and ongoing expert guidance for your crew.",
    iconColor: "text-cyan-400",
    iconBg: "border-cyan-500/20 bg-cyan-500/10",
  },
];

const GRID = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const CARD = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const SCORES = [
  { label: "Delivery Speed", score: 94 },
  { label: "Code Quality", score: 96 },
  { label: "Client Satisfaction", score: 98 },
  { label: "Platform Expertise", score: 97 },
  { label: "Time to Value", score: 89 },
];

const TRUST = [
  { value: "50+", label: "Vetted Experts" },
  { value: "4.9", label: "Avg. Rating" },
  { value: "98%", label: "Satisfied Clients" },
];

/* ── Scorecard panel ─────────────────────────────────────── */
function ScorecardPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 44 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
      className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-500" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
            Expert Impact Score
          </span>
        </div>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-600 font-mono">
          Based on 500+ projects
        </span>
      </div>

      {/* Animated score bars */}
      <div className="px-6 py-5 space-y-4">
        {SCORES.map(({ label, score }, i) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                {label}
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 tabular-nums"
              >
                {score}%
              </motion.span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(to right, #c2440f, #f97316)",
                }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${score}%` } : {}}
                transition={{
                  duration: 1.05,
                  ease: EASE,
                  delay: 0.32 + i * 0.1,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom stat cells */}
      <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 border-t border-zinc-200 dark:border-zinc-800">
        {TRUST.map(({ value, label }) => (
          <div key={label} className="px-4 py-4 text-center">
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {value}
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-0.5 leading-tight">
              {label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export default function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const benefitsTextRef = useRef<HTMLDivElement>(null);
  const benefitsTextInView = useInView(benefitsTextRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <>
      {/* ── Services Grid ── */}
      <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Services
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              What our experts can do
            </h2>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
              Comprehensive services to take your website from concept to a
              polished launch.
            </p>
          </SectionReveal>

          <motion.div
            ref={gridRef}
            variants={GRID}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {SERVICES.map((svc) => (
              <motion.div
                key={svc.title}
                variants={CARD}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="group h-full p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-700 transition-colors duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 14 }}
                  className={`w-10 h-10 rounded-xl border ${svc.iconBg} flex items-center justify-center mb-4`}
                >
                  <svc.icon className={`w-5 h-5 ${svc.iconColor}`} />
                </motion.div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  {svc.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Hire — left text / right scorecard ── */}
      <section className="py-20 sm:py-28 bg-[#F9F9F9] dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <motion.div
              ref={benefitsTextRef}
              initial={{ opacity: 0, x: -44 }}
              animate={benefitsTextInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
                Benefits
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1]">
                Why hire an ERVFlow expert?
              </h2>
              <p className="mt-5 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Our certified professionals bring deep platform expertise —
                helping you ship faster, avoid costly mistakes, and deliver
                higher-quality results than going it alone.
              </p>
              <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every expert is hand-screened, ERVFlow-certified, and matched
                precisely to your project type and goals.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-block"
              >
                <Link
                  href="#directory"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-zinc-100 dark:text-zinc-100 hover:text-zinc-200 dark:hover:text-zinc-100 bg-[#405b50] rounded-sm transition-colors duration-200"
                >
                  Browse Experts
                  <MoveRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — impact scorecard */}
            <ScorecardPanel />
          </div>
        </div>
      </section>
    </>
  );
}
