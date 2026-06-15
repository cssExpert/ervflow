"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Send,
  Sparkles,
  Check,
  Play,
  Code2,
  GripVertical,
  Globe,
  Rocket,
  Zap,
} from "lucide-react";

/* ── Constants ── */

const DEMO_PROMPT =
  "Create a website for a dental clinic in Texas with online booking.";

const PAGES = ["Home", "About", "Services", "Pricing", "Contact"];

const METRICS = [
  { value: "< 60s", label: "to generate" },
  { value: "100%", label: "responsive" },
  { value: "Zero", label: "lock-in" },
  { value: "SEO", label: "optimized" },
];

type StepMeta = {
  number: string;
  badge: string;
  badgeClass: string;
  numberClass: string;
  glowClass: string;
  title: string;
  description: string;
  features?: string[];
};

const STEPS: StepMeta[] = [
  {
    number: "01",
    badge: "⚡ 30 Seconds",
    badgeClass:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
    numberClass: "text-blue-500 border-blue-500/30 bg-blue-500/5",
    glowClass: "bg-blue-500/8 dark:bg-blue-500/12",
    title: "Describe Your Website",
    description:
      "Tell ERVFlow what you want to build in plain English. No technical knowledge required.",
  },
  {
    number: "02",
    badge: "✨ AI Powered",
    badgeClass:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/25",
    numberClass: "text-violet-500 border-violet-500/30 bg-violet-500/5",
    glowClass: "bg-violet-500/8 dark:bg-violet-500/12",
    title: "Generate Complete Pages",
    description:
      "ERVFlow creates your sitemap, layouts, content structure, and responsive pages instantly.",
  },
  {
    number: "03",
    badge: "🎨 No Coding Needed",
    badgeClass:
      "bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/25",
    numberClass: "text-primary-500 border-primary-500/30 bg-primary-500/5",
    glowClass: "bg-primary-500/8 dark:bg-primary-500/12",
    title: "Edit Everything Visually",
    description:
      "Drag, drop, customize styles, update content, and fine-tune every detail without writing a line of code.",
    features: ["Component library", "Responsive preview", "Visual editor", "Code mode"],
  },
  {
    number: "04",
    badge: "🚀 One Click",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    numberClass: "text-emerald-500 border-emerald-500/30 bg-emerald-500/5",
    glowClass: "bg-emerald-500/8 dark:bg-emerald-500/12",
    title: "Launch Anywhere",
    description:
      "Publish instantly or export clean Next.js and Tailwind code to your preferred workflow.",
    features: ["Custom domains", "Next.js export", "Tailwind CSS", "SEO ready"],
  },
];

/* ── Step Visuals ── */

function PromptVisual({ inView }: { inView: boolean }) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setTyped(0);
    const delay = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTyped(i);
        if (i >= DEMO_PROMPT.length) clearInterval(id);
      }, 30);
      return () => clearInterval(id);
    }, 500);
    return () => clearTimeout(delay);
  }, [inView]);

  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 space-y-3 shadow-xl shadow-blue-500/5">
      <div className="flex items-center gap-2 pb-1">
        <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
          AI Prompt
        </span>
      </div>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 min-h-[68px] text-xs text-zinc-300 leading-relaxed">
        {DEMO_PROMPT.slice(0, typed)}
        {inView && typed < DEMO_PROMPT.length && (
          <span className="inline-block w-0.5 h-3.5 bg-blue-400 ml-0.5 align-middle animate-pulse" />
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
      >
        <Send className="w-3 h-3" />
        Generate Website
      </motion.button>
    </div>
  );
}

function GenerateVisual({ inView }: { inView: boolean }) {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 shadow-xl shadow-violet-500/5">
      <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
        Pages Generated
      </p>
      <div className="space-y-1.5">
        {PAGES.map((page, i) => (
          <motion.div
            key={page}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: i * 0.1 + 0.3,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5"
          >
            <Check className="w-3 h-3 text-violet-400 shrink-0" />
            <span className="text-xs text-zinc-300 flex-1">{page}</span>
            <div className="flex gap-1">
              <div className="w-8 h-1 bg-zinc-700 rounded-full" />
              <div className="w-5 h-1 bg-zinc-800 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CustomizeVisual({ inView }: { inView: boolean }) {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-xl shadow-primary-500/5">
      {/* Titlebar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-800 bg-zinc-950/80">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[9px] text-zinc-600 font-mono">ERVFlow Editor</span>
      </div>
      <div className="flex h-36">
        {/* Sidebar */}
        <div className="w-20 border-r border-zinc-800 bg-zinc-900/60 p-2 space-y-1">
          {["Hero", "About", "Pricing", "Footer"].map((t) => (
            <div
              key={t}
              className="flex items-center gap-1 px-1.5 py-1 rounded-md text-[9px] text-zinc-600 hover:bg-zinc-800 cursor-pointer"
            >
              <GripVertical className="w-2 h-2 shrink-0" />
              {t}
            </div>
          ))}
        </div>
        {/* Canvas */}
        <div className="flex-1 p-3 relative bg-zinc-950/40">
          <div className="space-y-1.5 mb-2">
            <div className="h-3 bg-zinc-800 rounded-md w-3/4" />
            <div className="h-2 bg-zinc-900 rounded-md w-full" />
            <div className="h-2 bg-zinc-900 rounded-md w-4/5" />
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-6 bg-zinc-900 rounded" />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 4 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-2 bottom-2 border-2 border-dashed border-primary-500/70 bg-primary-500/10 rounded-lg px-2 py-1 text-[9px] text-primary-400 whitespace-nowrap"
          >
            Drop component
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PublishVisual({ inView }: { inView: boolean }) {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 text-center shadow-xl shadow-emerald-500/5">
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 180 }}
        className="w-14 h-14 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-4"
      >
        <Rocket className="w-6 h-6 text-emerald-400" />
      </motion.div>
      <p className="text-sm font-bold text-zinc-100 mb-0.5">Published!</p>
      <p className="text-[10px] text-zinc-600 font-mono mb-4">
        mysite.ervflow.com
      </p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-left">
        {["Custom Domain", "SSL Secured", "CDN Enabled", "SEO Ready"].map(
          (f) => (
            <div key={f} className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-[10px] text-zinc-400">{f}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

const VISUALS = [PromptVisual, GenerateVisual, CustomizeVisual, PublishVisual];

/* ── Step Card ── */

function StepCard({ step, index }: { step: StepMeta; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Visual = VISUALS[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="group h-full"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden p-5 shadow-sm hover:shadow-lg dark:hover:shadow-black/30 transition-shadow duration-300"
      >
        {/* Decorative large ghost number */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-3 -right-1 text-[88px] font-black leading-none text-zinc-900/[0.04] dark:text-white/[0.05]"
        >
          {step.number}
        </span>

        {/* Per-step color glow */}
        <div
          className={`pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl ${step.glowClass}`}
        />

        {/* Header: step indicator + badge */}
        <div className="relative z-10 flex items-center gap-2 mb-4">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${step.badgeClass}`}
          >
            STEP {step.number}
          </span>
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${step.badgeClass}`}
          >
            {step.badge}
          </span>
        </div>

        {/* Visual mockup */}
        <div className="relative z-10 mb-4">
          <Visual inView={inView} />
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-base font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
          {step.title}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
          {step.description}
        </p>

        {/* Feature tags */}
        {step.features && (
          <div className="relative z-10 flex flex-wrap gap-1.5 mt-4">
            {step.features.map((f) => (
              <span
                key={f}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ── */

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-28 px-4 sm:px-6 overflow-hidden"
    >
      {/* ── Parallax background orbs ── */}
      <motion.div
        style={{ y: orb1Y }}
        className="pointer-events-none absolute top-10 left-[5%] w-[500px] h-[500px] rounded-full bg-blue-500/6 dark:bg-blue-500/10 blur-[120px] -z-10"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="pointer-events-none absolute bottom-20 right-[5%] w-[400px] h-[400px] rounded-full bg-violet-500/6 dark:bg-violet-500/10 blur-[100px] -z-10"
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary-500/4 dark:bg-primary-500/6 blur-[140px] -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* ── Section header ── */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-[11px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            How It Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.05] text-balance mb-5"
          >
            From Idea to{" "}
            <span className="bg-linear-to-r from-blue-500 via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow">
              Live Website
            </span>{" "}
            in Minutes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Describe your vision, let AI generate your website, customize
            everything visually, and publish with confidence.
          </motion.p>

          {/* Workflow pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center flex-wrap gap-2"
          >
            {["Prompt", "Generate", "Customize", "Publish"].map((label, i, arr) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span className="px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium border border-zinc-200 dark:border-zinc-700">
                  {label}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-zinc-400 dark:text-zinc-600 text-sm font-light">
                    →
                  </span>
                )}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Steps ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* ── Metrics row ── */}
        <div
          ref={metricsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {METRICS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={metricsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur-sm p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <p className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors duration-300">
                {value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Final CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={metricsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
        >
          {/* Decorative line */}
          <div className="flex items-center gap-4 mb-10 max-w-xs mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zinc-300 dark:to-zinc-700" />
            <Zap className="w-4 h-4 text-primary-500 shrink-0" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zinc-300 dark:to-zinc-700" />
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 text-balance">
            Ready to Build Your Next Website?
          </h3>
          <p className="text-base text-zinc-500 dark:text-zinc-400 mb-10 max-w-md mx-auto">
            Join thousands of designers and developers who ship faster with
            ERVFlow.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-600 text-white font-semibold text-sm md:text-base transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Building Free
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold text-sm md:text-base transition-all duration-200 hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current text-primary-500" />
              Watch Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
