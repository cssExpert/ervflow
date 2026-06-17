"use client";

import {
  Cpu,
  PenTool,
  FolderOpen,
  Globe,
  Users,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FEATURES = [
  {
    eyebrow: "AI Generation",
    title: "Go from Prompt to Website in Seconds",
    desc: "Describe your business, audience, and goals. ERVFlow's AI generates a complete website — sitemap, copy, images, and design system — instantly.",
    bullets: [
      "Full website from a single text prompt",
      "Brand-aware copy and imagery",
      "Design system generated with your colors",
    ],
    icon: Cpu,
    mockup: "ai",
    reverse: false,
  },
  {
    eyebrow: "Visual Editor",
    title: "Edit Every Element, No Code Required",
    desc: "Drag, drop, and resize any element with pixel-perfect precision. Our visual editor shows changes in real time across desktop, tablet, and mobile.",
    bullets: [
      "Responsive preview at all breakpoints",
      "Inline content and style editing",
      "Component library with 200+ blocks",
    ],
    icon: PenTool,
    mockup: "editor",
    reverse: true,
  },
  {
    eyebrow: "Content Management",
    title: "Manage All Your Content in One Place",
    desc: "Update text, images, and pages without touching code. Built-in CMS lets you schedule posts, manage media, and collaborate with your team.",
    bullets: [
      "Headless CMS with live preview",
      "Media library with smart organization",
      "Role-based access for clients & teams",
    ],
    icon: FolderOpen,
    mockup: "cms",
    reverse: false,
  },
  {
    eyebrow: "Publishing",
    title: "Deploy Anywhere in One Click",
    desc: "Connect your preferred hosting — Vercel, Netlify, AWS, or custom servers. ERVFlow handles build optimization, CDN, and SSL automatically.",
    bullets: [
      "One-click deployment to major platforms",
      "Automatic performance optimization",
      "Custom domain management",
    ],
    icon: Globe,
    mockup: "deploy",
    reverse: true,
  },
  {
    eyebrow: "Collaboration",
    title: "Bring Your Whole Team Into the Loop",
    desc: "Share review links with clients and stakeholders, leave comments directly on the page, and manage approvals without email chains.",
    bullets: [
      "Shareable review links with comments",
      "Approval workflows and version history",
      "White-label client portals",
    ],
    icon: Users,
    mockup: "collab",
    reverse: false,
  },
  {
    eyebrow: "Analytics",
    title: "Measure Performance, Not Just Traffic",
    desc: "Built-in analytics show you which pages convert, where visitors drop off, and how changes affect Core Web Vitals — all in one dashboard.",
    bullets: [
      "Conversion and engagement metrics",
      "Core Web Vitals monitoring",
      "SEO health scoring",
    ],
    icon: BarChart3,
    mockup: "analytics",
    reverse: true,
  },
];

/* ─────────────────────── Shared card shell ─────────────────────── */
function MockCard({
  children,
  glow,
  inView,
}: {
  children: React.ReactNode;
  glow: string;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
      className="relative h-72 sm:h-80 lg:h-[22rem] rounded-2xl bg-zinc-950 border border-zinc-700/60 dark:border-zinc-800 overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_40px_rgba(0,0,0,0.18)] dark:shadow-none"
    >
      {/* Ambient glow */}
      <div
        className={`absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-[80px] opacity-25 pointer-events-none ${glow}`}
        aria-hidden
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      {children}
    </motion.div>
  );
}

/* ─────────────────────── 1. AI Generation ──────────────────────── */
function AIMockup({ inView }: { inView: boolean }) {
  const PAGES = ["Home", "About", "Services", "Contact", "Blog"];
  const TASKS = [
    { label: "Sitemap", done: true },
    { label: "Brand colors", done: true },
    { label: "Typography", done: true },
    { label: "Hero section", done: true },
    { label: "Copy & media", done: false },
  ];

  return (
    <MockCard glow="bg-violet-500" inView={inView}>
      <div className="absolute inset-0 flex flex-col p-5">
        {/* Terminal bar */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <div className="flex-1 ml-2 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-500 px-3 py-1 text-center font-mono">
            AI Studio — ERVFlow
          </div>
        </div>

        {/* Prompt box */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 mb-4 flex items-center gap-2">
          <span className="text-primary-500 font-mono text-xs">›</span>
          <span className="text-xs text-zinc-200 font-mono flex-1">
            Create a dental clinic website in Texas
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-0.5 h-3 bg-primary-500 rounded"
            aria-hidden
          />
        </div>

        {/* Generation progress */}
        <div className="flex gap-3 flex-1">
          {/* Task list */}
          <div className="flex-1 space-y-2">
            {TASKS.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.6 + i * 0.14,
                  duration: 0.4,
                  ease: EASE,
                }}
                className="flex items-center gap-2.5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.7 + i * 0.14,
                    type: "spring",
                    stiffness: 350,
                    damping: 18,
                  }}
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    t.done
                      ? "bg-primary-500/20 border border-primary-500/50"
                      : "bg-zinc-800 border border-zinc-700"
                  }`}
                >
                  {t.done && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  )}
                </motion.div>
                <span
                  className={`text-xs font-mono ${
                    t.done ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {t.label}
                </span>
                {!t.done && (
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-[10px] text-primary-500"
                  >
                    generating...
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Page tree */}
          <div className="w-24 border-l border-zinc-800 pl-3 pt-0.5">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-zinc-600 mb-2">
              Sitemap
            </div>
            {PAGES.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.7 + i * 0.1,
                  duration: 0.35,
                  ease: EASE,
                }}
                className="flex items-center gap-1.5 mb-1.5"
              >
                <div className="w-1 h-1 rounded-full bg-primary-500/50 shrink-0" />
                <span className="text-[10px] text-zinc-400">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 pt-3 border-t border-zinc-800">
          <div className="flex justify-between text-[10px] text-zinc-500 mb-1.5">
            <span className="font-mono">Generating website...</span>
            <span className="text-primary-400 font-mono">78%</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(to right, #c2440f, #f97316, #fb923c)",
              }}
              initial={{ width: 0 }}
              animate={inView ? { width: "78%" } : {}}
              transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </MockCard>
  );
}

/* ─────────────────────── 2. Visual Editor ──────────────────────── */
function EditorMockup({ inView }: { inView: boolean }) {
  return (
    <MockCard glow="bg-primary-500" inView={inView}>
      <div className="absolute inset-0 flex flex-col">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <div className="flex-1 ml-2 bg-zinc-800/80 rounded text-[10px] text-zinc-500 px-3 py-1 text-center">
            ✦ ervflow.com/edit
          </div>
        </div>

        {/* Canvas + panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: page canvas */}
          <div className="flex-1 p-4 relative">
            {/* Skeleton rows above selection */}
            <div className="space-y-1.5 mb-3">
              <div className="h-1.5 bg-zinc-800 rounded w-full" />
              <div className="h-1.5 bg-zinc-800 rounded w-4/5" />
            </div>

            {/* Selected element */}
            <motion.div
              className="relative rounded-lg border-2 p-3 mb-3"
              style={{
                borderColor: "rgba(59,130,246,0.8)",
                borderStyle: "dashed",
              }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59,130,246,0)",
                  "0 0 0 4px rgba(59,130,246,0.1)",
                  "0 0 0 0 rgba(59,130,246,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Corner handles */}
              {[
                "-top-1.5 -left-1.5",
                "-top-1.5 -right-1.5",
                "-bottom-1.5 -left-1.5",
                "-bottom-1.5 -right-1.5",
              ].map((pos) => (
                <div
                  key={pos}
                  className={`absolute w-3 h-3 bg-blue-500 rounded-sm ${pos}`}
                />
              ))}
              {/* Label */}
              <div className="absolute -top-5 left-0 text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded font-semibold">
                Hero Section
              </div>
              {/* Content preview */}
              <div className="h-2 bg-primary-500/50 rounded w-1/2 mb-2" />
              <div className="space-y-1">
                <div className="h-1.5 bg-zinc-700 rounded w-full" />
                <div className="h-1.5 bg-zinc-700 rounded w-3/4" />
              </div>
              {/* Mini CTA button */}
              <div className="mt-2 inline-flex items-center bg-primary-500/90 text-white text-[9px] font-bold px-2 py-1 rounded">
                Start Building →
              </div>
            </motion.div>

            <div className="space-y-1.5">
              <div className="h-1.5 bg-zinc-800 rounded w-full" />
              <div className="h-1.5 bg-zinc-800 rounded w-2/3" />
            </div>

            {/* Floating tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.4, ease: EASE }}
              className="absolute bottom-4 left-4 bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-[9px] text-zinc-300 font-mono shadow-xl"
            >
              <span className="text-blue-400">div</span>.hero-section{" "}
              <span className="text-zinc-600">· 1920×680</span>
            </motion.div>
          </div>

          {/* Right: properties panel */}
          <div className="w-28 border-l border-zinc-800 p-2.5 space-y-3 overflow-hidden shrink-0">
            <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
              Style
            </div>

            {/* Font size */}
            <div>
              <div className="text-[8px] text-zinc-600 mb-1.5">Font Size</div>
              <div className="flex items-center gap-1.5">
                <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "65%" } : {}}
                    transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
                  />
                </div>
                <span className="text-[9px] text-zinc-300 font-mono">48</span>
              </div>
            </div>

            {/* Colors */}
            <div>
              <div className="text-[8px] text-zinc-600 mb-1.5">Color</div>
              <div className="flex gap-1">
                {["#F76235", "#ffffff", "#18181b", "#6366f1"].map((c) => (
                  <div
                    key={c}
                    style={{ backgroundColor: c }}
                    className="w-4 h-4 rounded-full border border-zinc-700 shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div>
              <div className="text-[8px] text-zinc-600 mb-1.5">Padding</div>
              <div className="grid grid-cols-3 gap-0.5 text-center">
                {[null, "24", null, "16", "·", "16", null, "24", null].map(
                  (v, i) =>
                    v ? (
                      <div
                        key={i}
                        className="bg-zinc-800 rounded text-[8px] text-zinc-300 py-0.5 leading-none"
                      >
                        {v}
                      </div>
                    ) : (
                      <div key={i} />
                    ),
                )}
              </div>
            </div>

            {/* Layer indicator */}
            <div className="pt-2 border-t border-zinc-800">
              <div className="text-[8px] text-zinc-600 mb-1.5">Layers</div>
              {["Hero", "Nav", "Footer"].map((l, i) => (
                <div
                  key={l}
                  className={`text-[9px] px-1.5 py-1 rounded mb-0.5 flex items-center gap-1 ${
                    i === 0 ? "bg-blue-500/15 text-blue-400" : "text-zinc-600"
                  }`}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${i === 0 ? "bg-blue-400" : "bg-zinc-700"}`}
                  />
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockCard>
  );
}

/* ─────────────────────── 3. Content Management ─────────────────── */
function CMSMockup({ inView }: { inView: boolean }) {
  const PAGES = [
    {
      name: "Home",
      status: "Published",
      color: "bg-emerald-500",
      dot: "bg-emerald-500",
    },
    {
      name: "About",
      status: "Published",
      color: "bg-emerald-500",
      dot: "bg-emerald-500",
    },
    {
      name: "Services",
      status: "Draft",
      color: "bg-amber-500",
      dot: "bg-amber-500",
    },
    {
      name: "Blog",
      status: "Scheduled",
      color: "bg-blue-500",
      dot: "bg-blue-500",
    },
  ];

  return (
    <MockCard glow="bg-emerald-500" inView={inView}>
      <div className="absolute inset-0 flex">
        {/* Sidebar */}
        <div className="w-28 border-r border-zinc-800 p-3 shrink-0">
          <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
            Content
          </div>
          {["Pages", "Blog", "Media", "Settings"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: EASE }}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 ${
                i === 0
                  ? "bg-primary-500/15 text-primary-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? "bg-primary-500" : "bg-zinc-700"}`}
              />
              <span className="text-[10px] font-medium">{item}</span>
            </motion.div>
          ))}

          {/* Media library thumb */}
          <div className="mt-4 pt-3 border-t border-zinc-800">
            <div className="text-[9px] text-zinc-600 mb-2">Media</div>
            <div className="grid grid-cols-2 gap-1">
              {[
                "bg-violet-500/30",
                "bg-blue-500/30",
                "bg-amber-500/30",
                "bg-rose-500/30",
              ].map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.7 + i * 0.06,
                    type: "spring",
                    stiffness: 280,
                  }}
                  className={`aspect-square rounded ${c} border border-zinc-700`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 p-4">
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 mb-4">
            <div className="w-3 h-3 rounded-full border border-zinc-600 shrink-0" />
            <div className="flex-1 h-1 bg-zinc-800 rounded" />
            <div className="text-[9px] text-zinc-600 font-mono">⌘K</div>
          </div>

          {/* Page cards */}
          <div className="space-y-2">
            {PAGES.map((page, i) => (
              <motion.div
                key={page.name}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.45,
                  ease: EASE,
                }}
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5"
              >
                {/* Thumb */}
                <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0 relative">
                  <div
                    className={`absolute inset-x-0 top-0 h-1.5 ${page.color} opacity-60`}
                  />
                  <div className="absolute inset-2 space-y-0.5">
                    <div className="h-0.5 bg-zinc-600 rounded w-full" />
                    <div className="h-0.5 bg-zinc-700 rounded w-3/4" />
                    <div className="h-0.5 bg-zinc-700 rounded w-1/2" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-zinc-200 leading-none mb-1">
                    {page.name}
                  </div>
                  <div className="text-[9px] text-zinc-500">
                    Last edited · 2h ago
                  </div>
                </div>
                {/* Status badge */}
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                    page.status === "Published"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : page.status === "Draft"
                        ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                  }`}
                >
                  <div className={`w-1 h-1 rounded-full ${page.dot}`} />
                  {page.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MockCard>
  );
}

/* ─────────────────────── 4. Deploy / Publishing ─────────────────── */
function DeployMockup({ inView }: { inView: boolean }) {
  const STAGES = [
    { label: "Build", pct: 100, done: true, color: "bg-emerald-500" },
    { label: "Optimize", pct: 100, done: true, color: "bg-blue-500" },
    { label: "Deploy", pct: 100, done: true, color: "bg-primary-500" },
  ];

  const METRICS = [
    { label: "LCP", value: "0.8s", good: true },
    { label: "CLS", value: "0.02", good: true },
    { label: "FID", value: "12ms", good: true },
  ];

  return (
    <MockCard glow="bg-blue-500" inView={inView}>
      <div className="absolute inset-0 p-5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
              Deployment
            </div>
            <div className="text-xs font-semibold text-zinc-200 font-mono">
              main → production
            </div>
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1.4, type: "spring", stiffness: 300 }}
            className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1"
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
            />
            <span className="text-[10px] font-semibold text-emerald-400">
              LIVE
            </span>
          </motion.div>
        </div>

        {/* Pipeline stages */}
        <div className="flex items-center gap-0 mb-6">
          {STAGES.map((stage, i) => (
            <div key={stage.label} className="flex items-center flex-1">
              {/* Stage */}
              <div className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.4 + i * 0.25,
                    type: "spring",
                    stiffness: 320,
                    damping: 18,
                  }}
                  className={`w-9 h-9 rounded-xl ${stage.done ? stage.color : "bg-zinc-800"} flex items-center justify-center mb-1.5 shadow-lg`}
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-[10px] text-zinc-400 font-medium">
                  {stage.label}
                </span>
                {/* Progress bar */}
                <div className="w-full mt-1.5 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${stage.color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${stage.pct}%` } : {}}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: 0.5 + i * 0.25,
                    }}
                  />
                </div>
              </div>
              {/* Connector arrow */}
              {i < STAGES.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{
                    delay: 0.6 + i * 0.25,
                    duration: 0.35,
                    ease: EASE,
                  }}
                  style={{ originX: 0 }}
                  className="w-6 text-center text-zinc-600 text-xs pb-4"
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Domain info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 mb-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-3.5 h-3.5 text-primary-400 shrink-0" />
            <span className="text-xs font-mono text-zinc-200">ervflow.com</span>
            <div className="ml-auto flex items-center gap-1 text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">
              SSL ✓
            </div>
          </div>
          <div className="text-[9px] text-zinc-500 font-mono">
            Deployed 12 seconds ago · CDN propagated
          </div>
        </motion.div>

        {/* Core Web Vitals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="grid grid-cols-3 gap-2"
        >
          {METRICS.map(({ label, value, good }) => (
            <div
              key={label}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-center"
            >
              <div className="text-[9px] text-zinc-500 mb-0.5">{label}</div>
              <div
                className={`text-xs font-bold font-mono ${good ? "text-emerald-400" : "text-red-400"}`}
              >
                {value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </MockCard>
  );
}

/* ─────────────────────── 5. Collaboration ──────────────────────── */
function CollabMockup({ inView }: { inView: boolean }) {
  const CURSORS = [
    {
      name: "Alex",
      color: "bg-violet-500",
      borderColor: "#8b5cf6",
      x: "20%",
      y: "35%",
      delay: 0.6,
    },
    {
      name: "Sara",
      color: "bg-rose-500",
      borderColor: "#f43f5e",
      x: "60%",
      y: "55%",
      delay: 0.9,
    },
    {
      name: "Kai",
      color: "bg-cyan-500",
      borderColor: "#06b6d4",
      x: "45%",
      y: "25%",
      delay: 1.1,
    },
  ];

  return (
    <MockCard glow="bg-rose-500" inView={inView}>
      <div className="absolute inset-0 flex flex-col p-5">
        {/* Header: active users */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
              Live Review
            </div>
            <div className="text-xs text-zinc-300 font-medium">
              dental-clinic.ervflow.com
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
            />
            <span className="text-[10px] text-zinc-400">3 online</span>
            {/* Avatar stack */}
            <div className="flex -space-x-1.5 ml-1">
              {CURSORS.map(({ name, color }) => (
                <div
                  key={name}
                  className={`w-5 h-5 rounded-full ${color} border border-zinc-900 flex items-center justify-center text-[7px] font-bold text-white`}
                >
                  {name[0]}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page canvas with cursors */}
        <div className="relative flex-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          {/* Wireframe content */}
          <div className="absolute inset-4 space-y-2">
            <div className="h-6 bg-zinc-800 rounded w-full" />
            <div className="h-3 bg-zinc-800/60 rounded w-3/4" />
            <div className="h-3 bg-zinc-800/60 rounded w-1/2" />
            <div className="mt-2 h-8 bg-primary-500/20 border border-primary-500/20 rounded w-28" />
          </div>

          {/* Live cursors */}
          {CURSORS.map(({ name, color, borderColor, x, y, delay }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay, type: "spring", stiffness: 280 }}
              className="absolute pointer-events-none"
              style={{ left: x, top: y }}
            >
              {/* Cursor arrow */}
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path
                  d="M0 0L0 14L4 11L7 17L9 16L6 10L11 10Z"
                  fill={borderColor}
                />
              </svg>
              {/* Name tag */}
              <div
                className={`absolute top-4 left-3 ${color} text-white text-[9px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap`}
              >
                {name}
              </div>
            </motion.div>
          ))}

          {/* Comment bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.45, ease: EASE }}
            className="absolute bottom-4 left-4 right-4 bg-zinc-800 border border-zinc-700 rounded-xl p-2.5 shadow-xl"
          >
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-[7px] font-bold text-white shrink-0">
                A
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-zinc-200 mb-0.5">
                  Alex
                </div>
                <div className="text-[10px] text-zinc-400 leading-relaxed">
                  Can we increase the hero padding? Looks tight on mobile.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Activity feed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.4 }}
          className="flex items-center gap-2 mt-3"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
          <span className="text-[9px] text-zinc-500">
            Alex added a comment · just now
          </span>
        </motion.div>
      </div>
    </MockCard>
  );
}

/* ─────────────────────── 6. Analytics ──────────────────────── */
function AnalyticsMockup({ inView }: { inView: boolean }) {
  // SVG area chart path
  const W = 240;
  const H = 70;
  const pts = [0, 30, 18, 45, 28, 55, 38, 50, 60, 62, 70, 48, 85, 65, 100];
  const coords = pts.reduce<[number, number][]>((acc, y, i) => {
    if (i % 2 === 0) acc.push([y, pts[i + 1] ?? y]);
    return acc;
  }, []);
  const pathD = coords
    .map(([xPct, yPct], i) => {
      const x = (xPct / 100) * W;
      const y = H - (yPct / 100) * H;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  const areaD = `${pathD} L ${W} ${H} L 0 ${H} Z`;

  const METRICS = [
    { label: "Sessions", value: "14,820", change: "+12%", up: true },
    { label: "Conversion", value: "3.8%", change: "+0.6%", up: true },
    { label: "Avg Load", value: "0.9s", change: "-0.3s", up: true },
  ];

  const CWV = [
    { label: "LCP", score: 95, color: "text-emerald-400" },
    { label: "CLS", score: 98, color: "text-emerald-400" },
    { label: "INP", score: 91, color: "text-emerald-400" },
  ];

  return (
    <MockCard glow="bg-amber-500" inView={inView}>
      <div className="absolute inset-0 p-5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
              Analytics
            </div>
            <div className="text-xs font-semibold text-zinc-200">
              Last 30 days
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>All metrics up</span>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {METRICS.map(({ label, value, change, up }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.45, ease: EASE }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center"
            >
              <div className="text-[8px] text-zinc-500 mb-0.5">{label}</div>
              <div className="text-xs font-bold text-zinc-100 font-mono">
                {value}
              </div>
              <div
                className={`text-[8px] font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}
              >
                {change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Area chart */}
        <div className="flex-1 relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden p-3">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <motion.path
              d={areaD}
              fill="url(#chartGrad)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
            />
            {/* Line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 1.4, ease: EASE }}
            />
          </svg>
        </div>

        {/* CWV row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="flex gap-2 mt-3"
        >
          {CWV.map(({ label, score, color }) => (
            <div
              key={label}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 text-center"
            >
              <div className="text-[8px] text-zinc-500">{label}</div>
              <div className={`text-[11px] font-bold font-mono ${color}`}>
                {score}
              </div>
            </div>
          ))}
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 text-center">
            <div className="text-[8px] text-zinc-500">Score</div>
            <div className="text-[11px] font-bold font-mono text-emerald-400 flex items-center justify-center gap-0.5">
              <Zap className="w-2.5 h-2.5" /> 98
            </div>
          </div>
        </motion.div>
      </div>
    </MockCard>
  );
}

/* ─────────────────────── MockupVisual router ────────────────────── */
function MockupVisual({ type, inView }: { type: string; inView: boolean }) {
  switch (type) {
    case "ai":
      return <AIMockup inView={inView} />;
    case "editor":
      return <EditorMockup inView={inView} />;
    case "cms":
      return <CMSMockup inView={inView} />;
    case "deploy":
      return <DeployMockup inView={inView} />;
    case "collab":
      return <CollabMockup inView={inView} />;
    case "analytics":
      return <AnalyticsMockup inView={inView} />;
    default:
      return <AIMockup inView={inView} />;
  }
}

/* ─────────────────────── Feature row ───────────────────────────── */
function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: feature.reverse ? 32 : -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
        {feature.eyebrow}
      </span>
      <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.15]">
        {feature.title}
      </h3>
      <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {feature.desc}
      </p>
      <ul className="mt-6 space-y-2.5">
        {feature.bullets.map((b, bi) => (
          <motion.li
            key={b}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 + bi * 0.08 }}
            className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
          >
            <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0" />
            {b}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  const visual = <MockupVisual type={feature.mockup} inView={inView} />;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        index > 0
          ? "pt-16 sm:pt-16 border-t border-zinc-100 dark:border-zinc-800/60"
          : ""
      }`}
    >
      {feature.reverse ? (
        <>
          <div className="lg:order-2">{textContent}</div>
          <div className="lg:order-1">{visual}</div>
        </>
      ) : (
        <>
          {textContent}
          {visual}
        </>
      )}
    </div>
  );
}

/* ─────────────────────── Section export ────────────────────────── */
export default function FeatureShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            Features
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1]">
            Every Tool You Need to Build and Grow
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            From first prompt to live website, ERVFlow handles every step.
          </p>
        </SectionReveal>

        <div className="space-y-16">
          {FEATURES.map((feature, i) => (
            <FeatureRow key={feature.eyebrow} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
