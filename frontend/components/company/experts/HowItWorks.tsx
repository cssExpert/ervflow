"use client";
import { useRef } from "react";
import { ClipboardList, UserCheck, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/company/shared/SectionReveal";

const STEPS = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Submit Your Requirements",
    description:
      "Tell us about your project goals, timeline, and budget. Our brief intake process takes less than 5 minutes.",
  },
  {
    num: "02",
    icon: UserCheck,
    title: "Get Matched",
    description:
      "We analyze your needs and connect you with the best-fit certified expert from our vetted network.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Collaborate & Launch",
    description:
      "Work directly with your expert using built-in collaboration tools to bring your vision to life.",
  },
];

export default function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-md mx-auto">
            From brief to launch in three straightforward steps.
          </p>
        </SectionReveal>

        <div ref={lineRef} className="relative">
          {/* Animated connecting line */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="hidden lg:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px origin-left"
            style={{
              background:
                "linear-gradient(to right, #27272A, rgba(247,98,53,0.5), #27272A)",
            }}
          />

          <motion.div
            ref={stepsRef}
            initial="hidden"
            animate={stepsInView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <div className="flex flex-col items-center text-center px-4 lg:px-6">
                  {/* Step icon box with hover + entrance scale pop */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={stepsInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 0.45 + i * 0.18,
                      type: "spring",
                      stiffness: 280,
                      damping: 16,
                    }}
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    className="relative w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center mb-6 z-10 cursor-default"
                  >
                    <span className="text-[10px] font-mono text-primary-500/70 mb-1">
                      {step.num}
                    </span>
                    <step.icon className="w-6 h-6 text-primary-400" />
                  </motion.div>

                  <motion.h3
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } },
                    }}
                    className="text-base font-semibold text-zinc-100 mb-2"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4, delay: 0.15 } },
                    }}
                    className="text-sm text-zinc-400 leading-relaxed max-w-xs"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
