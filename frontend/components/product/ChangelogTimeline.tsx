"use client";

import { useState } from "react";
import { Sparkles, Wrench, Shield, Zap, ArrowRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type EntryType = "feature" | "fix" | "improvement" | "security";

const ENTRIES: {
  date: string;
  version: string;
  type: EntryType;
  title: string;
  items: string[];
}[] = [
  {
    date: "June 12, 2026",
    version: "3.2.0",
    type: "feature",
    title: "AI Content Localization",
    items: [
      "Auto-translate website content into 30+ languages",
      "Language switcher component added to design library",
      "Locale-aware SEO meta tags generated automatically",
      "RTL layout support for Arabic and Hebrew",
    ],
  },
  {
    date: "June 5, 2026",
    version: "3.1.4",
    type: "fix",
    title: "Editor and CMS Bug Fixes",
    items: [
      "Fixed drag-and-drop misalignment on Safari 18",
      "Resolved media library pagination not loading on slow networks",
      "Fixed double-submit bug in form builder",
      "Corrected z-index stacking in nested section editor",
    ],
  },
  {
    date: "May 28, 2026",
    version: "3.1.0",
    type: "improvement",
    title: "Collaboration Overhaul",
    items: [
      "Redesigned review link experience with inline commenting",
      "Added approval workflow with custom approval chains",
      "Real-time presence indicators show who is viewing each page",
      "Version history now supports branching and diff views",
    ],
  },
  {
    date: "May 14, 2026",
    version: "3.0.2",
    type: "security",
    title: "Security Hardening",
    items: [
      "Enforced strict CSP headers on all published sites",
      "Added two-factor authentication for team admin accounts",
      "Dependency audit and upgrade for all high-severity CVEs",
      "Session token rotation on privilege escalation",
    ],
  },
  {
    date: "May 2, 2026",
    version: "3.0.0",
    type: "feature",
    title: "ERVFlow 3.0 — Major Release",
    items: [
      "Complete AI pipeline rebuild with 4× faster generation",
      "New visual editor with constraint-based layout engine",
      "Headless CMS with GraphQL API now generally available",
      "White-label portal builder for agency clients",
      "50+ new design blocks added to the component library",
    ],
  },
];

const TYPE_META: Record<
  EntryType,
  { label: string; icon: React.ElementType; colors: string }
> = {
  feature: {
    label: "Feature",
    icon: Sparkles,
    colors:
      "text-primary-500 bg-primary-500/10 border-primary-500/20",
  },
  fix: {
    label: "Fix",
    icon: Wrench,
    colors: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  improvement: {
    label: "Improvement",
    icon: Zap,
    colors: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  security: {
    label: "Security",
    icon: Shield,
    colors: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
};

const FILTERS: { label: string; value: EntryType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Features", value: "feature" },
  { label: "Fixes", value: "fix" },
  { label: "Improvements", value: "improvement" },
  { label: "Security", value: "security" },
];

export default function ChangelogTimeline() {
  const [filter, setFilter] = useState<EntryType | "all">("all");

  const filtered = ENTRIES.filter(
    (e) => filter === "all" || e.type === filter
  );

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                filter === f.value
                  ? "bg-primary-500 border-primary-500 text-white"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-zinc-100 dark:bg-zinc-800" />

          <AnimatePresence mode="popLayout">
            <div className="space-y-10">
              {filtered.map((entry, i) => {
                const meta = TYPE_META[entry.type];
                const Icon = meta.icon;
                return (
                  <m.div
                    key={`${entry.version}-${entry.type}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                    className="flex gap-5 sm:gap-6"
                  >
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-xl border ${meta.colors} flex items-center justify-center shrink-0 z-10 bg-white dark:bg-zinc-900`}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide ${meta.colors}`}
                        >
                          {meta.label}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                          v{entry.version}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-600 text-xs">·</span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {entry.date}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                        {entry.title}
                      </h3>

                      <ul className="space-y-1.5">
                        {entry.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                          >
                            <span className="mt-2 w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <m.div
                        initial="idle"
                        whileHover="hover"
                        className="inline-block mt-4"
                      >
                        <Link
                          href="#"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-400 transition-colors"
                        >
                          View details
                          <m.span
                            variants={{ idle: { x: 0 }, hover: { x: 3 } }}
                            transition={{ type: "spring", stiffness: 400, damping: 18 }}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </m.span>
                        </Link>
                      </m.div>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-400 dark:text-zinc-600 text-sm">
              No entries for this filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
