"use client";

import {
  Building2,
  User,
  BarChart3,
  Rocket,
  Store,
  Layers,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const USE_CASES = [
  {
    icon: Building2,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    title: "Digital Agencies",
    desc: "Deliver client websites in a fraction of the time. Automate the repetitive parts — layout, copy, structure — so your team can focus on strategy and creative direction.",
    stat: "10× faster delivery",
  },
  {
    icon: User,
    iconColor: "text-primary-400",
    iconBg: "bg-primary-500/10 border-primary-500/20",
    title: "Freelancers",
    desc: "Take on more clients without burning out. ERVFlow handles the heavy lifting so you can charge more and work fewer hours.",
    stat: "3× more projects / month",
  },
  {
    icon: BarChart3,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    title: "Marketing Teams",
    desc: "Launch landing pages, campaign sites, and microsites in hours — not weeks. No dev dependency. No waiting for IT.",
    stat: "Hours, not weeks",
  },
  {
    icon: Rocket,
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10 border-rose-500/20",
    title: "Startups",
    desc: "Ship your first website before your first investor meeting. Iterate quickly based on user feedback without a full design and engineering team.",
    stat: "Live in < 1 day",
  },
  {
    icon: Store,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    title: "Small Businesses",
    desc: "A professional website shouldn't require a $10k budget. ERVFlow gives small businesses enterprise-quality design at a fraction of the cost.",
    stat: "80% cost reduction",
  },
  {
    icon: Layers,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    title: "Enterprise Teams",
    desc: "Scale website production across regions, brands, and markets. Centralized design system with distributed publishing.",
    stat: "Multi-brand scaling",
  },
];

const GRID = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const CARD = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function UseCasesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            Use Cases
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1]">
            Who Uses ERVFlow?
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            ERVFlow adapts to teams of every size and type — from solo
            freelancers to enterprise departments.
          </p>
        </SectionReveal>

        <motion.div
          ref={gridRef}
          variants={GRID}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {USE_CASES.map((uc) => (
            <motion.div
              key={uc.title}
              variants={CARD}
              whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 transition-colors duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl border ${uc.iconBg} flex items-center justify-center shrink-0`}
                >
                  <uc.icon className={`w-5 h-5 ${uc.iconColor}`} />
                </div>
                <span
                  className={`text-[10px] font-semibold ${uc.iconColor} ${uc.iconBg} border border-${uc.iconBg} rounded-full px-2.5 py-1 leading-tight}`}
                >
                  {uc.stat}
                </span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                {uc.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                {uc.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
