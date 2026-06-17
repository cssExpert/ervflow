"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Loader2, CheckCircle2 } from "lucide-react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Status = "planned" | "in-progress" | "done";

const COLUMNS: {
  status: Status;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    status: "planned",
    label: "Planned",
    icon: Clock,
    color: "text-zinc-500 dark:text-zinc-400",
  },
  {
    status: "in-progress",
    label: "In Progress",
    icon: Loader2,
    color: "text-amber-500",
  },
  {
    status: "done",
    label: "Shipped",
    icon: CheckCircle2,
    color: "text-emerald-500",
  },
];

const ITEMS: { title: string; desc: string; tag: string; status: Status }[] = [
  {
    title: "Mobile App Builder",
    desc: "Generate native mobile apps alongside websites from the same prompt.",
    tag: "Platform",
    status: "planned",
  },
  {
    title: "E-commerce Module",
    desc: "Built-in product pages, cart, and checkout — no third-party plugin needed.",
    tag: "Feature",
    status: "planned",
  },
  {
    title: "AI Copywriting v2",
    desc: "Improved brand voice training with multi-shot examples and tone sliders.",
    tag: "AI",
    status: "planned",
  },
  {
    title: "Team Permissions v2",
    desc: "Granular role-based access control per project, page, and component.",
    tag: "Collaboration",
    status: "in-progress",
  },
  {
    title: "GraphQL API v2",
    desc: "Subscriptions, batching, and nested query support for headless setups.",
    tag: "Developer",
    status: "in-progress",
  },
  {
    title: "Plugin Marketplace",
    desc: "Install third-party blocks, integrations, and AI models in one click.",
    tag: "Ecosystem",
    status: "in-progress",
  },
  {
    title: "AI Content Localization",
    desc: "Automatic translation with locale-aware SEO and RTL layout support.",
    tag: "AI",
    status: "done",
  },
  {
    title: "White-Label Portals",
    desc: "Client-facing portals with your agency's branding and custom domain.",
    tag: "Agency",
    status: "done",
  },
  {
    title: "Visual Editor 3.0",
    desc: "Constraint-based layout engine with responsive controls for every breakpoint.",
    tag: "Editor",
    status: "done",
  },
];

const TAG_COLORS: Record<string, string> = {
  Platform: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  Feature: "text-primary-500 bg-primary-500/10 border-primary-500/20",
  AI: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  Collaboration: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Developer: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  Ecosystem: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  Agency: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Editor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
};

export default function RoadmapBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 sm:py-28 bg-[#F9F9F9] dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            Roadmap
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1]">
            What&apos;s Coming Next
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            A transparent look at what we&apos;re working on, what&apos;s
            shipped, and what&apos;s next on the horizon.
          </p>
        </SectionReveal>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLUMNS.map((col, ci) => {
            const ColIcon = col.icon;
            const items = ITEMS.filter((item) => item.status === col.status);

            return (
              <m.div
                key={col.status}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: ci * 0.12 }}
                className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
              >
                {/* Column header */}
                <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800">
                  <ColIcon
                    className={`w-4 h-4 ${col.color} ${col.status === "in-progress" ? "animate-spin" : ""}`}
                    style={
                      col.status === "in-progress"
                        ? { animationDuration: "3s" }
                        : {}
                    }
                  />
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {col.label}
                  </span>
                  <span className="ml-auto text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded-full px-2 py-0.5">
                    {items.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3 p-3 flex-1">
                  {items.map((item, ii) => (
                    <m.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                        delay: ci * 0.12 + ii * 0.07 + 0.2,
                      }}
                      className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-snug flex-1">
                          {item.title}
                        </h4>
                        <span
                          className={`shrink-0 text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border ${
                            TAG_COLORS[item.tag] ??
                            "text-zinc-500 bg-zinc-100 border-zinc-200"
                          }`}
                        >
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </m.div>
                  ))}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
