"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  m,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Send,
  Sparkles,
  Check,
  Play,
  GripVertical,
  Rocket,
  Zap,
  TimerReset,
  MonitorSmartphone,
  CodeXml,
  ListTodo,
} from "lucide-react";

/* ── Constants ── */

const DEMO_PROMPT =
  "Create a website for a dental clinic in Texas with online booking.";

const PAGES = ["Home", "About", "Services", "Pricing", "Contact"];
const TAB_LABELS = ["Hero", "About", "Pricing", "Footer"];

const METRICS = [
  { value: "Generate in Seconds", Icon: TimerReset },
  { value: "Fully Responsive", Icon: MonitorSmartphone },
  { value: "No Coding Required", Icon: CodeXml },
  { value: "SEO Ready", Icon: ListTodo },
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
      "bg-[#CEFF00]/10 text-[#546800] dark:text-[#CEFF00] border-[#546800]/25 dark:border-[#CEFF00]/25",
    numberClass: "text-[#CEFF00] border-[#CEFF00]/30 bg-[#CEFF00]/5",
    glowClass: "bg-[#CEFF00]/8 dark:bg-[#CEFF00]/12",
    title: "Describe Your Website",
    description: "Tell ERVFlow what you want to build in plain English.",
  },
  {
    number: "02",
    badge: "✨ AI Powered",
    badgeClass:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/25",
    numberClass: "text-violet-500 border-violet-500/30 bg-violet-500/5",
    glowClass: "bg-violet-500/8 dark:bg-violet-500/12",
    title: "Generate Complete Pages",
    description: "Instantly create layouts, pages, and content structure.",
  },
  {
    number: "03",
    badge: "🎨 No Coding Needed",
    badgeClass:
      "bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/25",
    numberClass: "text-primary-500 border-primary-500/30 bg-primary-500/5",
    glowClass: "bg-primary-500/8 dark:bg-primary-500/12",
    title: "Customize Visually",
    description: "Edit layouts, styles, and components without writing code.",
    features: [
      "Component library",
      "Responsive preview",
      "Visual editor",
      "Code mode",
    ],
  },
  {
    number: "04",
    badge: "🚀 One Click",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    numberClass: "text-emerald-500 border-emerald-500/30 bg-emerald-500/5",
    glowClass: "bg-emerald-500/8 dark:bg-emerald-500/12",
    title: "Publish Anywhere",
    description: "Launch instantly or export clean Next.js and Tailwind code.",
    features: ["Custom domains", "Next.js export", "Tailwind CSS", "SEO ready"],
  },
];

/* ── Step 1: Repeating typing animation ── */

type TypingPhase = "idle" | "typing" | "pausing" | "deleting";

function PromptVisual({ inView }: { inView: boolean }) {
  const [typed, setTyped] = useState(0);
  const [, setPhase] = useState<TypingPhase>("idle");

  useEffect(() => {
    if (!inView) return;
    let timer: ReturnType<typeof setTimeout>;

    const tick = (p: TypingPhase, n: number) => {
      setPhase(p);
      setTyped(n);
      if (p === "idle") {
        timer = setTimeout(() => tick("typing", 0), 700);
      } else if (p === "typing") {
        if (n < DEMO_PROMPT.length) {
          timer = setTimeout(() => tick("typing", n + 1), 36);
        } else {
          timer = setTimeout(() => tick("pausing", n), 2400);
        }
      } else if (p === "pausing") {
        timer = setTimeout(() => tick("deleting", n), 0);
      } else {
        // deleting
        if (n > 0) {
          timer = setTimeout(() => tick("deleting", n - 1), 16);
        } else {
          timer = setTimeout(() => tick("idle", 0), 500);
        }
      }
    };

    tick("idle", 0);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 shadow-xl shadow-[#CEFF00]/5">
      <div className="flex items-center gap-2 pb-1">
        <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
          AI Prompt
        </span>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 min-h-[68px] text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {DEMO_PROMPT.slice(0, typed)}
        {/* Blinking cursor — always visible */}
        <span className="inline-block w-0.5 h-3.5 bg-blue-400 ml-0.5 align-middle animate-[blink_0.9s_step-end_infinite]" />
      </div>
      <m.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2 bg-[#CEFF00] text-black text-xs font-semibold py-2.5 rounded-md transition-colors"
      >
        <Send className="w-3 h-3" />
        Generate Website
      </m.button>
    </div>
  );
}

/* ── Step 2: Drag-sort animation ── */

function GenerateVisual({ inView }: { inView: boolean }) {
  const [pages, setPages] = useState([...PAGES]);
  const [dragging, setDragging] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const shuffle = () => {
      const i = Math.floor(Math.random() * (PAGES.length - 1));
      setDragging(i);
      setTimeout(() => {
        setPages((prev) => {
          const next = [...prev];
          [next[i], next[i + 1]] = [next[i + 1], next[i]];
          return next;
        });
      }, 480);
      setTimeout(() => setDragging(null), 900);
    };

    const initial = setTimeout(shuffle, 900);
    const id = setInterval(shuffle, 2500);
    return () => {
      clearTimeout(initial);
      clearInterval(id);
    };
  }, [inView]);

  return (
    <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 shadow-xl shadow-violet-500/5">
      <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
        Pages Generated
      </p>
      <div className="space-y-1.5">
        {pages.map((page, i) => (
          <m.div
            key={page}
            layout
            animate={{ scale: i === dragging ? 1.04 : 1 }}
            style={{ zIndex: i === dragging ? 10 : 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={`relative flex items-center gap-2 rounded-lg px-3 py-1.5 cursor-grab border transition-all duration-300 ${
              i === dragging
                ? "bg-violet-500/[0.14] border-violet-500/45 shadow-[0_8px_24px_rgba(139,92,246,0.22)]"
                : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
            }`}
          >
            <GripVertical
              className={`w-3 h-3 shrink-0 transition-colors duration-200 ${
                i === dragging
                  ? "text-violet-400"
                  : "text-zinc-400 dark:text-zinc-600"
              }`}
            />
            <Check className="w-3 h-3 text-violet-400 shrink-0" />
            <span className="text-xs text-zinc-700 dark:text-zinc-300 flex-1">
              {page}
            </span>
            <div className="flex gap-1">
              <div className="w-8 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
              <div className="w-5 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 3: Tab-switching editor ── */

function CanvasContent({ tab }: { tab: number }) {
  if (tab === 0)
    return (
      <div className="p-3 space-y-2">
        <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded-md w-3/4 mx-auto" />
        <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
        <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5 mx-auto" />
        <div className="flex gap-2 mt-1.5">
          <div className="h-5 bg-primary-500/40 rounded-full flex-1" />
          <div className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full flex-1" />
        </div>
      </div>
    );
  if (tab === 1)
    return (
      <div className="p-3 flex gap-2 items-start">
        <div className="w-10 h-10 bg-zinc-300 dark:bg-zinc-700 rounded-lg shrink-0" />
        <div className="flex-1 space-y-1.5 pt-1">
          <div className="h-2.5 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4" />
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
        </div>
      </div>
    );
  if (tab === 2)
    return (
      <div className="p-3 flex gap-1.5">
        {([false, true, false] as boolean[]).map((featured, i) => (
          <div
            key={i}
            className={`flex-1 rounded-md p-1.5 space-y-1 ${
              featured
                ? "bg-primary-500/20 border border-primary-500/40"
                : "bg-zinc-200 dark:bg-zinc-800"
            }`}
          >
            <div
              className={`h-1.5 rounded-full w-4/5 ${
                featured ? "bg-primary-500/60" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            />
            <div
              className={`h-3 rounded w-full ${
                featured ? "bg-primary-500/40" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            />
            {[0, 1].map((j) => (
              <div
                key={j}
                className="h-1 bg-zinc-300 dark:bg-zinc-700 rounded w-full"
              />
            ))}
          </div>
        ))}
      </div>
    );
  // Footer
  return (
    <div className="p-3 space-y-2">
      <div className="h-2.5 bg-zinc-300 dark:bg-zinc-700 rounded w-1/3" />
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 space-y-1">
            <div className="h-1.5 bg-zinc-400 dark:bg-zinc-600 rounded w-2/3" />
            {[0, 1, 2].map((j) => (
              <div
                key={j}
                className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded w-full"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomizeVisual({ inView }: { inView: boolean }) {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActiveTab((t) => (t + 1) % 4), 1900);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl shadow-primary-500/5">
      {/* Titlebar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200/80 dark:bg-zinc-950/80">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[9px] text-zinc-500 dark:text-zinc-600 font-mono">
          ERVFlow Editor
        </span>
      </div>

      <div className="flex h-36">
        {/* Sidebar tabs */}
        <div className="w-20 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-200/60 dark:bg-zinc-900/60 p-1.5 space-y-0.5">
          {TAB_LABELS.map((label, i) => (
            <m.div
              key={label}
              animate={
                i === activeTab
                  ? {
                      backgroundColor: "rgba(247,98,53,0.15)",
                      color: "rgba(247,98,53,0.9)",
                    }
                  : {
                      backgroundColor: "rgba(0,0,0,0.001)",
                      color: "rgba(113,113,122,1)",
                    }
              }
              transition={{ duration: 0.22 }}
              className="flex items-center gap-1 px-1.5 py-1.5 rounded-md text-[9px] cursor-pointer font-medium"
            >
              <GripVertical className="w-2 h-2 shrink-0 opacity-60" />
              {label}
            </m.div>
          ))}
        </div>

        {/* Canvas — content switches with AnimatePresence */}
        <div className="flex-1 relative overflow-hidden bg-white/60 dark:bg-zinc-950/40">
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <CanvasContent tab={activeTab} />
            </m.div>
          </AnimatePresence>

          {/* Drop zone — only visible on Pricing tab */}
          <AnimatePresence>
            {activeTab === 2 && (
              <m.div
                key="drop"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute right-2 bottom-2 border-2 border-dashed border-primary-500/70 bg-primary-500/10 rounded-lg px-2 py-0.5 text-[9px] text-primary-600 dark:text-primary-400 pointer-events-none whitespace-nowrap"
              >
                Drop component
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4: Rocket launch animation ── */

type LaunchPhase = "ready" | "launching" | "published";

const CONFETTI_COLORS = [
  "bg-emerald-400",
  "bg-primary-400",
  "bg-blue-400",
  "bg-violet-400",
  "bg-yellow-400",
  "bg-pink-400",
];

function PublishVisual({ inView }: { inView: boolean }) {
  const [phase, setPhase] = useState<LaunchPhase>("ready");

  useEffect(() => {
    if (!inView) return;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setPhase("ready");
      t1 = setTimeout(() => setPhase("launching"), 1600);
      t2 = setTimeout(() => setPhase("published"), 2200);
      t3 = setTimeout(cycle, 5000);
    };

    cycle();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [inView]);

  return (
    <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 text-center shadow-xl shadow-emerald-500/5">
      {/* Rocket area */}
      <div className="relative h-16 flex items-center justify-center mb-3">
        <AnimatePresence mode="wait">
          {/* Ready: gentle hover-bounce */}
          {phase === "ready" && (
            <m.div
              key="ready"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3 }}
              className="w-14 h-14 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center"
            >
              <m.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <Rocket className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </m.div>
            </m.div>
          )}

          {/* Launching: rocket fires up */}
          {phase === "launching" && (
            <m.div
              key="launching"
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: -55, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-14 rounded-full bg-emerald-500/25 border-2 border-emerald-400/70 flex items-center justify-center"
            >
              <Rocket className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </m.div>
          )}

          {/* Published: checkmark + confetti burst */}
          {phase === "published" && (
            <m.div
              key="published"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="relative w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 flex items-center justify-center"
            >
              <Check className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              {/* Confetti burst */}
              {CONFETTI_COLORS.map((color, i) => (
                <m.span
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0.6],
                    x: Math.round(Math.cos((i / 6) * Math.PI * 2) * 30),
                    y: Math.round(Math.sin((i / 6) * Math.PI * 2) * 30),
                    opacity: [1, 1, 0],
                  }}
                  transition={{ delay: 0.05, duration: 0.65, ease: "easeOut" }}
                  className={`absolute w-2 h-2 rounded-full ${color}`}
                />
              ))}
            </m.div>
          )}
        </AnimatePresence>

        {/* Flame trail during launch */}
        <AnimatePresence>
          {phase === "launching" && (
            <m.div
              key="flame"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 0.8, 0], scaleY: [0, 1, 0] }}
              transition={{ duration: 0.55 }}
              className="absolute top-10 w-1.5 h-8 bg-linear-to-b from-yellow-400/80 to-transparent rounded-full origin-top pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Status text */}
      <AnimatePresence mode="wait">
        <m.p
          key={phase}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-0.5"
        >
          {phase === "published"
            ? "Published! 🎉"
            : phase === "launching"
              ? "Launching…"
              : "Ready to Launch"}
        </m.p>
      </AnimatePresence>
      <p className="text-[10px] text-zinc-500 dark:text-zinc-600 font-mono mb-4">
        mysite.ervflow.com
      </p>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-left">
        {["Custom Domain", "SSL Secured", "CDN Enabled", "SEO Ready"].map(
          (f) => (
            <div key={f} className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
                {f}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

const VISUALS = [PromptVisual, GenerateVisual, CustomizeVisual, PublishVisual];

/* ── Step Card ── */

// Per-step accent RGBA used for the interior spotlight
const STEP_ACCENT_RGBA = [
  "rgba(206,255,0,0.07)", // 01 lime
  "rgba(139,92,246,0.08)", // 02 violet
  "rgba(247,98,53,0.07)", // 03 primary
  "rgba(16,185,129,0.07)", // 04 emerald
];

function StepCard({ step, index }: { step: StepMeta; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Visual = VISUALS[index];
  const accentRgba = STEP_ACCENT_RGBA[index];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  };

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="group/step h-full"
    >
      <m.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden p-6 shadow-sm hover:shadow-xl dark:hover:shadow-black/40 transition-shadow duration-300"
      >
        {/* Interior spotlight — follows cursor, per-step accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/step:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentRgba}, transparent 70%)`,
          }}
        />

        {/* Border glow — mask technique same as TiltCard */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/step:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.14), transparent 50%)`,
            padding: "1px",
            borderRadius: "inherit",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Ghost number */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-4 -right-2 text-[100px] font-black leading-none text-zinc-900/5 dark:text-white/6"
        >
          {step.number}
        </span>

        {/* Per-step glow */}
        <div
          className={`pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl ${step.glowClass}`}
        />

        {/* Badges */}
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

        {/* Animated visual */}
        <div className="relative z-10 mb-4">
          <Visual inView={inView} />
        </div>

        <h3 className="relative z-10 text-base font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
          {step.title}
        </h3>

        <p className="relative z-10 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
          {step.description}
        </p>

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
      </m.div>
    </m.div>
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
      {/* Parallax background orbs */}
      <m.div
        style={{ y: orb1Y }}
        className="pointer-events-none absolute top-10 left-[5%] w-125 h-125 rounded-full bg-[#CEFF00]/6 dark:bg-[#CEFF00]/10 blur-[120px] -z-10"
      />
      <m.div
        style={{ y: orb2Y }}
        className="pointer-events-none absolute bottom-20 right-[5%] w-100 h-100 rounded-full bg-violet-500/6 dark:bg-violet-500/10 blur-[100px] -z-10"
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 rounded-full bg-primary-500/4 dark:bg-primary-500/6 blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center max-w-6xl mx-auto mb-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-[11px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            How It Works
          </m.div>

          <m.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.05] text-balance mb-5"
          >
            Turn Your Idea into a{" "}
            <span className="bg-linear-to-r from-[#CEFF00] via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow">
              Live Website
            </span>{" "}
            in Minutes
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Describe your vision, let AI generate your website, customize
            everything visually, and publish with confidence.
          </m.p>

          {/* Workflow timeline */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-start justify-center flex-wrap sm:flex-nowrap gap-0"
          >
            {[
              { label: "Prompt", dot: "bg-[#CEFF00]" },
              { label: "Generate", dot: "bg-violet-500" },
              { label: "Customize", dot: "bg-primary-500" },
              { label: "Publish", dot: "bg-emerald-500" },
            ].map(({ label, dot }, i, arr) => (
              <span key={label} className="inline-flex items-start">
                {/* Dot + label */}
                <span className="flex flex-col items-center gap-1.5 px-4 sm:px-5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${dot} ring-4 ring-current/10`}
                  />
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                    {label}
                  </span>
                </span>
                {/* Arrow connector */}
                {i < arr.length - 1 && (
                  <span className="hidden sm:flex items-center mt-1">
                    <m.span
                      initial={{ scaleX: 0 }}
                      animate={headerInView ? { scaleX: 1 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.45 + i * 0.1,
                        ease: "easeOut",
                      }}
                      className="block h-px w-10 md:w-14 bg-zinc-300 dark:bg-zinc-700 origin-left"
                    />
                    <svg
                      viewBox="0 0 8 8"
                      className="w-2 h-2 text-zinc-400 dark:text-zinc-600 -ml-px shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2,1 6,4 2,7" />
                    </svg>
                  </span>
                )}
              </span>
            ))}
          </m.div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Metrics row */}
        <div
          ref={metricsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {METRICS.map(({ value, Icon }, i) => (
            <m.div
              key={value}
              initial={{ opacity: 0, y: 24 }}
              animate={metricsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl space-y-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur-sm p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center justify-center">
                <Icon className="w-8 h-8 mx-auto text-primary" />
              </div>
              <p className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors duration-300">
                {value}
              </p>
            </m.div>
          ))}
        </div>

        {/* Final CTA */}
        <m.div
          initial={{ opacity: 0, y: 36 }}
          animate={metricsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
        >
          <div className="flex items-center gap-4 mb-10 max-w-xs mx-auto">
            <div className="flex-1 h-px bg-linear-to-r from-transparent to-zinc-300 dark:to-zinc-700" />
            <Zap className="w-4 h-4 text-primary-500 shrink-0" />
            <div className="flex-1 h-px bg-linear-to-l from-transparent to-zinc-300 dark:to-zinc-700" />
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 text-balance">
            Ready to Build Your Next Website?
          </h3>
          <p className="text-base text-zinc-500 dark:text-zinc-400 mb-10 max-w-md mx-auto">
            Join the beta and start creating production-ready websites today —
            no credit card required.
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold text-sm md:text-base transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Explore Templates
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  );
}
