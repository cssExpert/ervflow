"use client";
import { useRef } from "react";
import {
  Building2,
  User,
  BarChart3,
  Rocket,
  Store,
  Layers,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/company/shared/SectionReveal";

const AUDIENCES = [
  { label: "Digital Agencies", icon: Building2 },
  { label: "Freelancers", icon: User },
  { label: "Marketing Teams", icon: BarChart3 },
  { label: "Startups", icon: Rocket },
  { label: "Small & Mid-Sized Businesses", icon: Store },
  { label: "Enterprise Teams", icon: Layers },
];

const VALUES = [
  {
    num: "01",
    title: "Simplicity",
    desc: "Complex workflows should feel effortless. We remove friction at every step.",
  },
  {
    num: "02",
    title: "Speed",
    desc: "Launch faster without sacrificing quality. Time is your most valuable asset.",
  },
  {
    num: "03",
    title: "Flexibility",
    desc: "Work the way your team prefers. ERVFlow adapts to your workflow, not the other way around.",
  },
  {
    num: "04",
    title: "Innovation",
    desc: "We continuously push what AI-powered creation can do for real-world teams.",
  },
];

export default function AudienceValues() {
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillsInView = useInView(pillsRef, { once: true, margin: "-60px" });

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Who We Serve */}
      <section className="py-20 sm:py-28 bg-[#F9F9F9] dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Who We Serve
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Built for every team
            </h2>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
              Whether you&apos;re a solo freelancer or an enterprise team,
              ERVFlow adapts to your scale.
            </p>
          </SectionReveal>

          <motion.div
            ref={pillsRef}
            initial="hidden"
            animate={pillsInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 0.05 },
              },
            }}
            className="flex flex-wrap justify-center gap-3"
          >
            {AUDIENCES.map(({ label, icon: Icon }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, scale: 0.75, y: 12 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 280, damping: 18 },
                  },
                }}
                whileHover={{
                  scale: 1.06,
                  y: -2,
                  transition: { duration: 0.18 },
                }}
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-default"
              >
                <Icon className="w-4 h-4 text-primary-500 shrink-0" />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Core Values
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              What we stand for
            </h2>
          </SectionReveal>

          <motion.div
            ref={valuesRef}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="h-full p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-primary-500/25 dark:hover:border-primary-500/25 bg-white dark:bg-zinc-900 transition-colors duration-200"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4"
                >
                  <span className="text-xs md:text-sm font-bold text-primary-400 font-mono">
                    {v.num}
                  </span>
                </motion.div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
