"use client";

import { useRef } from "react";
import { Zap, Layers, Users, Globe, Code2, BarChart2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/company/shared/SectionReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FEATURES = [
  {
    icon: Zap,
    title: "AI Generation",
    desc: "Generate complete websites from a single text prompt.",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Layers,
    title: "Design System",
    desc: "Reusable components that keep every page consistent.",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Invite clients and teammates to review in real time.",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Globe,
    title: "One-Click Publish",
    desc: "Deploy to any hosting provider instantly.",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: BarChart2,
    title: "SEO & Performance",
    desc: "Built for Core Web Vitals, speed, and discoverability.",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    icon: Code2,
    title: "Code Export",
    desc: "Developer-ready output with clean, maintainable code.",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
];

const GRID = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const CARD = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ValueProp() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            The Platform
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1]">
            Everything You Need to Build and Launch Websites
          </h2>
          <p className="mt-5 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Stop juggling design tools, content platforms, and development
            workflows. ERVFlow combines AI generation, visual editing, content
            management, and publishing in one connected platform.
          </p>
        </SectionReveal>

        <motion.div
          ref={gridRef}
          variants={GRID}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={CARD}
              whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 transition-colors duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 6 }}
                transition={{ type: "spring", stiffness: 350, damping: 14 }}
                className={`w-10 h-10 rounded-xl border ${f.iconBg} flex items-center justify-center mb-4`}
              >
                <f.icon className={`w-5 h-5 ${f.iconColor}`} />
              </motion.div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                {f.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
