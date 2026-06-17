"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Zap,
  Paintbrush,
  Users,
  Rocket,
  CheckCircle2,
  Globe,
  Wifi,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/company/shared/SectionReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STEP_MS = 3600;

const STEPS = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Describe",
    desc: "Tell ERVFlow what you want to build in plain English. No forms, no lengthy briefs — just describe your vision.",
    tags: ["Natural language", "Any industry", "Instant start"],
    url: "app.ervflow.com/new",
    tab: "New Project — ERVFlow",
  },
  {
    num: "02",
    icon: Zap,
    title: "Generate",
    desc: "AI creates a complete sitemap, page copy, layouts, and design system in seconds — not hours.",
    tags: ["AI-powered", "Brand-aware", "5 pages avg"],
    url: "app.ervflow.com/generating",
    tab: "Building your site...",
  },
  {
    num: "03",
    icon: Paintbrush,
    title: "Customize",
    desc: "Edit every element visually. Drag and drop, resize, and restyle with a pixel-perfect visual editor.",
    tags: ["No-code", "200+ blocks", "Live preview"],
    url: "app.ervflow.com/editor",
    tab: "Visual Editor — ERVFlow",
  },
  {
    num: "04",
    icon: Users,
    title: "Collaborate",
    desc: "Invite clients and stakeholders to review directly on the page — leave comments and approve changes.",
    tags: ["Shared links", "Comments", "Approvals"],
    url: "app.ervflow.com/review/dental-clinic",
    tab: "Review Link — Shared",
  },
  {
    num: "05",
    icon: Rocket,
    title: "Publish",
    desc: "Deploy with a single click to Vercel, Netlify, or any host. SSL, CDN, and performance optimization included.",
    tags: ["1-click deploy", "SSL included", "Global CDN"],
    url: "dental-clinic-texas.com",
    tab: "Dental Clinic Texas — Home",
  },
];

/* ─────────────── Panel 1: Describe ─────────────── */
function DescribePanel({ active }: { active: boolean }) {
  const PROMPT =
    "Create a modern website for a dental clinic in Texas with an appointments section and team page.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      const timeoutId = setTimeout(() => setDisplayed(""), 0);
      return () => clearTimeout(timeoutId);
    }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(PROMPT.slice(0, i));
      if (i >= PROMPT.length) clearInterval(t);
    }, 26);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-10 py-6 gap-5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Describe your website
      </p>
      <div className="w-full max-w-2xl bg-zinc-800/80 border border-zinc-700 rounded-2xl p-5 min-h-23">
        <span className="text-sm text-zinc-100 leading-relaxed font-mono whitespace-pre-wrap">
          {displayed}
        </span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-primary-500 ml-0.5 align-middle"
          aria-hidden
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {[
          "E-commerce",
          "Portfolio",
          "SaaS",
          "Restaurant",
          "Clinic",
          "Agency",
        ].map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 8 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.07, duration: 0.35, ease: EASE }}
            className={`px-3 py-1 rounded-full text-xs border ${
              t === "Clinic"
                ? "bg-primary-500/20 border-primary-500/40 text-primary-300"
                : "bg-zinc-800 border-zinc-700 text-zinc-500"
            }`}
          >
            {t}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.4, ease: EASE }}
        className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 rounded-sm text-white text-sm font-semibold shadow-lg shadow-primary-500/25 cursor-default"
      >
        <Zap className="w-4 h-4" />
        Generate Website
      </motion.div>
    </div>
  );
}

/* ─────────────── Panel 2: Generate ─────────────── */
function GeneratePanel({ active }: { active: boolean }) {
  const ROWS = [
    { label: "Navigation", pct: "100%", delay: 0.2 },
    { label: "Hero", pct: "100%", delay: 0.42 },
    { label: "Services", pct: "80%", delay: 0.62 },
    { label: "About", pct: "75%", delay: 0.82 },
    { label: "Footer", pct: "100%", delay: 1.02 },
  ];
  const STATS = [
    { label: "Pages", value: "5", done: true },
    { label: "Sections", value: "24", done: true },
    { label: "Copy blocks", value: "48", done: true },
    { label: "Images", value: "12", done: false },
    { label: "Design tokens", value: "—", done: false },
  ];

  return (
    <div className="flex h-full gap-5 px-8 py-6">
      <div className="flex-1 flex flex-col gap-2.5 justify-center">
        <p className="text-[10px] font-mono text-zinc-500 mb-0.5">
          Building page structure...
        </p>
        {ROWS.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className="w-16 text-[9px] text-zinc-600 text-right font-mono shrink-0">
              {row.label}
            </span>
            <div className="relative flex-1 h-3 bg-zinc-800 rounded overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-zinc-700 rounded"
                initial={{ width: 0 }}
                animate={active ? { width: row.pct } : { width: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: row.delay }}
              />
              <motion.div
                className="absolute inset-y-0 w-12 bg-linear-to-r from-transparent via-white/6 to-transparent"
                initial={{ x: -48 }}
                animate={active ? { x: 300 } : { x: -48 }}
                transition={{
                  duration: 0.8,
                  ease: "linear",
                  delay: row.delay + 0.2,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-40 flex flex-col gap-2.5 justify-center shrink-0">
        {STATS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 12 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 + i * 0.14, duration: 0.4, ease: EASE }}
            className="flex items-center justify-between"
          >
            <span className="text-[10px] text-zinc-500">{item.label}</span>
            <span
              className={`text-[10px] font-mono font-bold ${item.done ? "text-primary-400" : "text-zinc-600"}`}
            >
              {item.done ? item.value : "..."}
            </span>
          </motion.div>
        ))}
        <div className="mt-3 pt-3 border-t border-zinc-800">
          <div className="flex justify-between text-[9px] mb-1">
            <span className="text-zinc-600">Progress</span>
            <span className="text-primary-400 font-mono">62%</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(to right, #c2440f, #f97316)",
              }}
              initial={{ width: 0 }}
              animate={active ? { width: "62%" } : { width: 0 }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Panel 3: Customize ─────────────── */
function CustomizePanel({ active }: { active: boolean }) {
  return (
    <div className="flex h-full">
      {/* Canvas */}
      <div className="flex-1 p-4 flex flex-col gap-2 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1.5 mb-0.5">
          {["Select", "Text", "Image", "Section"].map((t, i) => (
            <div
              key={t}
              className={`px-2 py-0.5 rounded text-[9px] font-medium border ${
                i === 0
                  ? "bg-primary-500/20 text-primary-300 border-primary-500/30"
                  : "text-zinc-600 border-transparent"
              }`}
            >
              {t}
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1">
            {["D", "T", "M"].map((b) => (
              <div
                key={b}
                className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold border ${b === "D" ? "bg-zinc-700 text-zinc-200 border-zinc-600" : "text-zinc-600 border-zinc-800"}`}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
        {/* Nav bar */}
        <div className="h-5 bg-zinc-800 rounded flex items-center px-2 gap-2 shrink-0">
          <div className="w-12 h-2 bg-primary-500/40 rounded-sm" />
          <div className="flex gap-2 ml-auto">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="w-6 h-1.5 bg-zinc-700 rounded-sm" />
            ))}
          </div>
        </div>
        {/* Hero — selected with handles */}
        <motion.div
          className="relative rounded border-2 p-4 flex-1 flex flex-col justify-center gap-2"
          style={{ borderColor: "rgba(59,130,246,0.7)", borderStyle: "dashed" }}
          animate={
            active
              ? {
                  boxShadow: [
                    "0 0 0 0 rgba(59,130,246,0)",
                    "0 0 0 6px rgba(59,130,246,0.08)",
                    "0 0 0 0 rgba(59,130,246,0)",
                  ],
                }
              : {}
          }
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          {[
            "-top-1.5 -left-1.5",
            "-top-1.5 -right-1.5",
            "-bottom-1.5 -left-1.5",
            "-bottom-1.5 -right-1.5",
          ].map((pos) => (
            <div
              key={pos}
              className={`absolute w-2.5 h-2.5 bg-blue-500 rounded-sm ${pos}`}
            />
          ))}
          <div className="absolute -top-5 left-0 text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded font-semibold">
            Hero Section
          </div>
          <div className="h-3 bg-primary-500/40 rounded w-1/2" />
          <div className="h-1.5 bg-zinc-700 rounded w-3/4" />
          <div className="h-1.5 bg-zinc-700 rounded w-1/2" />
          <div className="mt-1 w-16 h-5 bg-primary-500/70 rounded flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">Book Now</span>
          </div>
        </motion.div>
      </div>
      {/* Properties panel */}
      <div className="w-36 border-l border-zinc-800 p-3 flex flex-col gap-3 shrink-0">
        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
          Style
        </div>
        <div>
          <div className="text-[8px] text-zinc-600 mb-1">Font Size</div>
          <div className="flex items-center gap-1.5">
            <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary-500 rounded-full"
                initial={{ width: 0 }}
                animate={active ? { width: "70%" } : { width: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              />
            </div>
            <span className="text-[9px] text-zinc-300 font-mono">56</span>
          </div>
        </div>
        <div>
          <div className="text-[8px] text-zinc-600 mb-1">Color</div>
          <div className="flex gap-1">
            {["#F76235", "#ffffff", "#18181b", "#3b82f6"].map((c) => (
              <div
                key={c}
                style={{ backgroundColor: c }}
                className="w-4 h-4 rounded-full border border-zinc-700"
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-[8px] text-zinc-600 mb-1.5">Padding</div>
          <div className="grid grid-cols-3 gap-0.5 text-center">
            {[null, "24", null, "16", "·", "16", null, "24", null].map(
              (v, i) =>
                v ? (
                  <div
                    key={i}
                    className="bg-zinc-800 rounded text-[8px] text-zinc-300 py-0.5"
                  >
                    {v}
                  </div>
                ) : (
                  <div key={i} />
                ),
            )}
          </div>
        </div>
        <div className="pt-2 border-t border-zinc-800">
          <div className="text-[8px] text-zinc-600 mb-1">Component</div>
          <div className="text-[9px] text-blue-400 font-mono bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded">
            Hero Section
          </div>
        </div>
        <div className="pt-2 border-t border-zinc-800">
          <div className="text-[9px] text-zinc-600 mb-1">Layers</div>
          {["Hero", "Nav", "Footer"].map((l, i) => (
            <div
              key={l}
              className={`text-[9px] px-1.5 py-1 rounded mb-0.5 flex items-center gap-1 ${i === 0 ? "bg-blue-500/15 text-blue-400" : "text-zinc-600"}`}
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
  );
}

/* ─────────────── Panel 4: Collaborate ─────────────── */
function CollaboratePanel({ active }: { active: boolean }) {
  const CURSORS = [
    { name: "Alex", color: "#8b5cf6", x: "18%", y: "38%", delay: 0.5 },
    { name: "Sara", color: "#f43f5e", x: "52%", y: "58%", delay: 0.85 },
    { name: "Kai", color: "#06b6d4", x: "68%", y: "28%", delay: 1.1 },
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
          className="flex items-center justify-between bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 mb-3 text-[10px]"
        >
          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span className="text-zinc-300">Review link active</span>
          </div>
          <div className="flex -space-x-1">
            {CURSORS.map((c) => (
              <div
                key={c.name}
                style={{ backgroundColor: c.color }}
                className="w-4 h-4 rounded-full border border-zinc-900 flex items-center justify-center text-[7px] font-bold text-white"
              >
                {c.name[0]}
              </div>
            ))}
          </div>
        </motion.div>
        {/* Wireframe canvas */}
        <div className="relative flex-1 bg-zinc-800/50 rounded-xl border border-zinc-700 overflow-hidden p-3">
          <div className="space-y-1.5">
            <div className="h-4 bg-zinc-700 rounded w-full" />
            <div className="h-8 bg-zinc-700/60 rounded w-full" />
            <div className="grid grid-cols-3 gap-1.5 mt-1">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-6 bg-zinc-700/40 rounded" />
              ))}
            </div>
          </div>
          {CURSORS.map((c) => (
            <motion.div
              key={c.name}
              className="absolute pointer-events-none"
              style={{ left: c.x, top: c.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={active ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: c.delay, type: "spring", stiffness: 300 }}
            >
              <svg width="14" height="18" viewBox="0 0 14 18">
                <path
                  d="M0 0L0 12L3.5 9.5L6 15L8 14L5.5 8.5L10 8.5Z"
                  fill={c.color}
                />
              </svg>
              <div
                style={{ backgroundColor: c.color }}
                className="absolute top-3.5 left-3 text-white text-[8px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap"
              >
                {c.name}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.4, ease: EASE }}
          className="mt-2 bg-zinc-800 border border-zinc-700 rounded-xl p-2.5"
        >
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-[7px] font-bold text-white shrink-0">
              A
            </div>
            <span className="text-[10px] text-zinc-300">
              <span className="font-semibold text-zinc-200">Alex · </span>Can we
              make the hero taller on mobile? 📱
            </span>
          </div>
        </motion.div>
      </div>
      {/* Approval sidebar */}
      <div className="w-36 border-l border-zinc-800 p-3 flex flex-col gap-2 shrink-0">
        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
          Status
        </div>
        {[
          {
            label: "Hero Section",
            s: "Approved",
            c: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          },
          {
            label: "Services",
            s: "In review",
            c: "text-amber-400 bg-amber-500/10 border-amber-500/20",
          },
          {
            label: "Contact",
            s: "Pending",
            c: "text-zinc-500 bg-zinc-800 border-zinc-700",
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 10 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.4, ease: EASE }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-2"
          >
            <div className="text-[9px] text-zinc-400 mb-1 truncate">
              {item.label}
            </div>
            <div
              className={`text-[8px] font-semibold px-1.5 py-0.5 rounded border inline-block ${item.c}`}
            >
              {item.s}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── Panel 5: Publish ─────────────── */
function PublishPanel({ active }: { active: boolean }) {
  return (
    <div className="flex h-full">
      <div className="flex-1 p-4 flex flex-col">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 280 }}
          className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-2.5 mb-4"
        >
          <motion.div
            animate={active ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
          />
          <div className="flex-1">
            <div className="text-xs font-semibold text-emerald-400">
              Deployed successfully
            </div>
            <div className="text-[9px] text-zinc-500 font-mono mt-0.5">
              dental-clinic-texas.com · SSL · CDN · 24 regions
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        </motion.div>
        {/* Site preview */}
        <div className="flex-1 bg-white rounded-xl overflow-hidden border border-zinc-700 relative">
          <div className="h-6 bg-zinc-100 border-b border-zinc-200 flex items-center px-3 gap-3">
            <div className="w-12 h-2.5 bg-primary-500/60 rounded-sm" />
            <div className="flex gap-2 ml-auto">
              {["Home", "About", "Services", "Contact"].map((t) => (
                <div key={t} className="w-8 h-1.5 bg-zinc-300 rounded-sm" />
              ))}
            </div>
          </div>
          <div className="h-16 bg-linear-to-r from-primary-500/10 to-primary-500/5 flex items-center px-4 gap-3">
            <div className="flex-1">
              <div className="h-3 bg-zinc-800 rounded w-2/3 mb-1.5" />
              <div className="h-1.5 bg-zinc-400 rounded w-1/2" />
            </div>
            <div className="w-16 h-6 bg-primary-500 rounded flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">Book Now</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            {["Cleaning", "Whitening", "Orthodontics"].map((s) => (
              <div
                key={s}
                className="h-8 bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center"
              >
                <span className="text-[8px] text-zinc-500">{s}</span>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.8 }}
            animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
            className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </motion.div>
        </div>
      </div>
      <div className="w-36 border-l border-zinc-800 p-3 flex flex-col gap-2 shrink-0">
        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
          Performance
        </div>
        {[
          { label: "Lighthouse", value: "98" },
          { label: "LCP", value: "0.8s" },
          { label: "CLS", value: "0.01" },
          { label: "FID", value: "9ms" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: 10 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.4, ease: EASE }}
            className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5"
          >
            <span className="text-[9px] text-zinc-500">{m.label}</span>
            <span className="text-[10px] font-bold font-mono text-emerald-400">
              {m.value}
            </span>
          </motion.div>
        ))}
        <div className="mt-auto pt-2 border-t border-zinc-800">
          <div className="text-[8px] text-zinc-600 mb-1 font-mono">
            CDN Regions
          </div>
          <div className="flex flex-wrap gap-0.5">
            {["US", "EU", "AP", "IN", "AU", "SA"].map((r) => (
              <div
                key={r}
                className="text-[7px] font-mono text-primary-400 bg-primary-500/10 border border-primary-500/20 px-1 py-0.5 rounded"
              >
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PANELS = [
  DescribePanel,
  GeneratePanel,
  CustomizePanel,
  CollaboratePanel,
  PublishPanel,
];

/* ─────────────── Rounded-rect border progress ─────────────── */
/* Traces the exact border of the rounded-square icon node.
   viewBox 0 0 80 80 — inner box sits at inset-2 = x8 y8 w64 h64 rx16
   Perimeter ≈ 4*(64-32) + 2π*16 ≈ 229 */
const BORDER_PERIM = 229;

function BorderProgress({
  animKey,
  paused,
  stepMs,
}: {
  animKey: string;
  paused: boolean;
  stepMs: number;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 80 80"
      style={{ transform: "rotate(-90deg)" }}
    >
      {/* Faint track */}
      <rect
        x="8"
        y="8"
        width="64"
        height="64"
        rx="16"
        fill="none"
        stroke="rgba(249,115,22,0.12)"
        strokeWidth="2.5"
      />
      {/* Animated fill */}
      <motion.rect
        key={animKey}
        x="8"
        y="8"
        width="64"
        height="64"
        rx="16"
        fill="none"
        stroke="rgba(249,115,22,0.7)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={BORDER_PERIM}
        initial={{ strokeDashoffset: BORDER_PERIM }}
        animate={paused ? undefined : { strokeDashoffset: 0 }}
        transition={{ duration: stepMs / 1000, ease: "linear" }}
      />
    </svg>
  );
}

/* ─────────────── Main export ─────────────── */
const RESTART_DELAY = 900; // extra ms after last step before looping back

export default function WorkflowTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setActiveStep((s) => {
      const next = (s + 1) % STEPS.length;
      if (next === 0) setLoopCount((c) => c + 1);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    /* Extra pause after the last step before looping back to step 1 */
    const delay =
      activeStep === STEPS.length - 1 ? STEP_MS + RESTART_DELAY : STEP_MS;
    timerRef.current = setTimeout(advance, delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inView, paused, activeStep, advance]);

  const handleClick = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveStep(i);
    setPaused(false);
  };

  const lineFill = activeStep / (STEPS.length - 1);

  return (
    <section
      className="py-20 sm:py-28 bg-[#F9F9F9] dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1]">
            From Prompt to Published
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Five steps from blank canvas to a live, production-ready website —
            powered by AI at every stage.
          </p>
        </SectionReveal>

        {/* ── Desktop (lg+): full browser UI ── */}
        <div className="hidden lg:block">
          {/* Timeline nodes + line */}
          <div className="relative mb-8">
            <div className="absolute top-10 left-[9%] right-[9%] h-0.5 bg-zinc-300 dark:bg-zinc-700" />
            <motion.div
              className="absolute top-10 left-[9%] h-0.5"
              style={{
                right: "9%",
                transformOrigin: "left center",
                background:
                  "linear-gradient(to right, #c2440f, #f97316, #fb923c)",
              }}
              animate={{ scaleX: lineFill }}
              transition={{ duration: 0.65, ease: EASE }}
            />
            <div className="relative flex justify-between">
              {STEPS.map((step, i) => {
                const isActive = activeStep === i;
                const isPast = i < activeStep;
                return (
                  <motion.button
                    key={step.num}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.15 + i * 0.12,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    onClick={() => handleClick(i)}
                    className="flex flex-col items-center gap-2.5 w-[18%] cursor-pointer group/node"
                    aria-label={`Step ${step.num}: ${step.title}`}
                  >
                    <div className="relative w-20 h-20">
                      {isActive && (
                        <BorderProgress
                          animKey={`border-${i}-${loopCount}`}
                          paused={paused || !inView}
                          stepMs={STEP_MS}
                        />
                      )}
                      <motion.div
                        animate={{ scale: isActive ? 1.06 : 1 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className={`absolute inset-2 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-primary-500 border-primary-500 shadow-lg shadow-primary-500/30"
                            : isPast
                              ? "bg-primary-900 border-primary-500/25"
                              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 group-hover/node:border-primary-500/40"
                        }`}
                      >
                        {/* Number pinned to top so icon stays truly centered */}
                        <span
                          className={`absolute top-1.5 left-0 right-0 text-center text-[9px] font-mono leading-none ${isActive ? "text-white/60" : "text-primary-500/55"}`}
                        >
                          {step.num}
                        </span>
                        <step.icon
                          className={`w-5 h-5 ${isActive ? "text-white" : isPast ? "text-primary-400" : "text-primary-400/70 group-hover/node:text-primary-400"}`}
                        />
                      </motion.div>
                    </div>
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-primary-500" : isPast ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-600 dark:text-zinc-400 group-hover/node:text-zinc-900 dark:group-hover/node:text-zinc-100"}`}
                    >
                      {step.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Tablet (md–lg): compact nodes row + animated card ── */}
        <div className="hidden md:block lg:hidden">
          {/* Node row */}
          <div className="flex items-center justify-between mb-6">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i;
              const isPast = i < activeStep;
              return (
                <div key={step.num} className="flex items-center flex-1">
                  <button
                    onClick={() => setActiveStep(i)}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div
                      className={`relative w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-primary-500 shadow-md shadow-primary-500/30"
                          : isPast
                            ? "bg-primary-900 border border-primary-500/25"
                            : "bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      <span
                        className={`text-[8px] font-mono leading-none mb-0.5 ${isActive ? "text-white/60" : isPast ? "text-primary-400/60" : "text-zinc-400 dark:text-zinc-500"}`}
                      >
                        {step.num}
                      </span>
                      <step.icon
                        className={`w-4 h-4 ${isActive ? "text-white" : isPast ? "text-primary-400" : "text-zinc-500 dark:text-zinc-400"}`}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-medium ${isActive ? "text-primary-500" : "text-zinc-500 dark:text-zinc-400"}`}
                    >
                      {step.title}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mx-1.5 h-px bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-primary-500/50"
                        animate={{ width: i < activeStep ? "100%" : "0%" }}
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Animated detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
            >
              {(() => {
                const TabletIcon = STEPS[activeStep].icon;
                return (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary-500 flex flex-col items-center justify-center shrink-0 shadow-md shadow-primary-500/20">
                      <span className="text-[8px] font-mono text-white/60 leading-none">
                        {STEPS[activeStep].num}
                      </span>
                      <TabletIcon className="w-4 h-4 text-white mt-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                        {STEPS[activeStep].title}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                        {STEPS[activeStep].desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {STEPS[activeStep].tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
              {/* Progress bar */}
              <div className="mt-4 h-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <motion.div
                  key={`tablet-bar-${activeStep}-${loopCount}`}
                  className="h-full bg-primary-500/60 rounded-full"
                  initial={{ width: "0%" }}
                  animate={paused ? {} : { width: "100%" }}
                  transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mobile (<md): vertical timeline ── */}
        <div className="md:hidden space-y-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex flex-col items-center justify-center shrink-0 shadow-md shadow-primary-500/20">
                  <span className="text-[8px] font-mono text-white/60 leading-none">
                    {step.num}
                  </span>
                  <step.icon className="w-4 h-4 text-white mt-0.5" />
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-px flex-1 mt-2 bg-zinc-200 dark:bg-zinc-800 min-h-8" />
                )}
              </div>
              <div className="pb-5 pt-0.5 flex-1">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">
                  {step.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Browser UI card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="rounded-2xl overflow-hidden border border-zinc-700/50 dark:border-zinc-800 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_48px_rgba(0,0,0,0.22)] dark:shadow-2xl"
            style={{ background: "#111113" }}
          >
            {/* Chrome bar */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800"
              style={{ background: "#0d0d0f" }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              {/* Active tab */}
              <div className="flex items-end gap-px ml-2">
                <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 border-b-0 rounded-t-lg px-3 py-1.5 -mb-px">
                  {(() => {
                    const TabIcon = STEPS[activeStep].icon;
                    return (
                      <TabIcon className="w-3 h-3 text-primary-400 shrink-0" />
                    );
                  })()}
                  <span className="text-[10px] text-zinc-300 max-w-32.5 truncate">
                    {STEPS[activeStep].tab}
                  </span>
                  <div className="w-3 h-3 flex items-center justify-center text-zinc-600 text-[9px] ml-1 cursor-default">
                    ✕
                  </div>
                </div>
              </div>

              {/* URL bar */}
              <div className="flex-1 flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 mx-2">
                <Globe className="w-3 h-3 text-zinc-600 shrink-0" />
                <span className="text-[11px] font-mono text-zinc-400 flex-1 truncate">
                  {activeStep === 4 ? (
                    <>
                      <span className="text-emerald-400">https://</span>
                      {STEPS[activeStep].url}
                    </>
                  ) : (
                    STEPS[activeStep].url
                  )}
                </span>
                {activeStep === 4 && (
                  <div className="flex items-center gap-1 text-[9px] text-emerald-400 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </div>
                )}
              </div>

              {/* Dot nav */}
              <div className="flex items-center gap-1.5 shrink-0">
                {STEPS.map((_, di) => (
                  <button
                    key={di}
                    onClick={() => handleClick(di)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      di === activeStep
                        ? "bg-primary-500 scale-125"
                        : di < activeStep
                          ? "bg-primary-500/40"
                          : "bg-zinc-700"
                    }`}
                    aria-label={`Go to step ${di + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-0.5 bg-zinc-800 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!paused && inView && (
                  <motion.div
                    key={`prog-${activeStep}`}
                    className="absolute inset-y-0 left-0 w-full origin-left"
                    style={{
                      background: "linear-gradient(to right, #c2440f, #f97316)",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Panel content */}
            <div className="h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`panel-${activeStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {(() => {
                    const Panel = PANELS[activeStep];
                    return <Panel active={inView} />;
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
