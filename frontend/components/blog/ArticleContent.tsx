"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  ChevronDown,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import type { PostSection } from "@/lib/blog-types";

export function slugify(t: string) {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-zinc-100 dark:border-white/6 last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left py-5 flex justify-between items-start gap-4 cursor-pointer group"
      >
        <span
          className={`text-sm md:text-lg font-semibold transition-colors ${open ? "text-primary-600 dark:text-primary-400" : "text-zinc-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"}`}
        >
          {question}
        </span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-180 text-primary-500" : "text-zinc-400"}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-zinc-600 dark:text-neutral-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQGroup({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/6 bg-white dark:bg-white/[0.02] shadow-sm dark:shadow-none px-5 divide-y divide-zinc-200 dark:divide-white/6">
      {faqs.map((faq, j) => (
        <FAQItem
          key={j}
          question={faq.question}
          answer={faq.answer}
          open={openIndex === j}
          onToggle={() => setOpenIndex(openIndex === j ? null : j)}
        />
      ))}
    </div>
  );
}

function CodeBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 my-1 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full bg-red-400/80"
            aria-hidden="true"
          />
          <span
            className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"
            aria-hidden="true"
          />
          <span
            className="w-2.5 h-2.5 rounded-full bg-green-400/80"
            aria-hidden="true"
          />
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={11} className="text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <Copy size={11} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-[#0d1117] text-[#e6edf3] text-[13px] px-6 py-5 overflow-x-auto font-mono leading-7">
        <code>{text}</code>
      </pre>
    </div>
  );
}

export default function ArticleContent({
  sections,
}: {
  sections: PostSection[];
}) {
  const h2Map = useMemo(() => {
    const m = new Map<number, number>();
    let c = 0;
    sections.forEach((s, i) => {
      if (s.type === "h2") m.set(i, ++c);
    });
    return m;
  }, [sections]);

  return (
    <div className="space-y-6">
      {sections.map((s, i) => {
        switch (s.type) {
          case "problem":
            return (
              <Reveal key={i}>
                <div className="relative overflow-hidden rounded-2xl border border-red-200 dark:border-red-900/50 bg-linear-to-br from-red-50 to-rose-50/40 dark:from-red-950/50 dark:to-rose-950/20 p-6">
                  <div
                    aria-hidden="true"
                    className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-red-500/10 blur-2xl"
                  />
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
                      <AlertCircle
                        size={16}
                        className="text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-[0.15em] mb-2">
                        The Problem
                      </p>
                      <p className="text-sm text-red-800/90 dark:text-red-200/80 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );

          case "solution":
            return (
              <Reveal key={i}>
                <div className="relative overflow-hidden rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-linear-to-br from-emerald-50 to-teal-50/40 dark:from-emerald-950/50 dark:to-teal-950/20 p-6">
                  <div
                    aria-hidden="true"
                    className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-emerald-500/10 blur-2xl"
                  />
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.15em] mb-2">
                        The Solution
                      </p>
                      <p className="text-sm text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );

          case "h2": {
            const num = h2Map.get(i) ?? 0;
            return (
              <Reveal key={i}>
                <div className="flex items-start gap-5 mt-14 mb-3">
                  <span
                    aria-hidden="true"
                    className="text-3xl md:text-4xl font-black text-zinc-300 dark:text-zinc-700/70 leading-none select-none shrink-0 tabular-nums"
                  >
                    {String(num).padStart(2, "0")}
                  </span>
                  <h2
                    id={slugify(s.text)}
                    className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white scroll-mt-24 leading-tight"
                  >
                    {s.text}
                  </h2>
                </div>
              </Reveal>
            );
          }

          case "h3":
            return (
              <Reveal key={i}>
                <h3
                  id={slugify(s.text)}
                  className="text-lg font-bold text-zinc-700 dark:text-neutral-200 mt-8 mb-2 scroll-mt-24"
                >
                  {s.text}
                </h3>
              </Reveal>
            );

          case "p":
            return (
              <Reveal key={i}>
                <p className="text-[15.5px] text-zinc-600 dark:text-neutral-300 leading-[1.85]">
                  {s.text}
                </p>
              </Reveal>
            );

          case "code":
            return (
              <Reveal key={i}>
                <CodeBlock text={s.text} />
              </Reveal>
            );

          case "quote": {
            const quoteText = s.text.replace(/^["""]+|["""]+$/g, "");
            return (
              <Reveal key={i}>
                <blockquote className="relative my-14 -mx-2 sm:-mx-6 overflow-hidden rounded-3xl bg-zinc-900 dark:bg-[#0a0a0a] border border-white/6 px-8 sm:px-12 pt-10 pb-12">
                  {/* Left ambient glow */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-24 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary-500/20 blur-3xl pointer-events-none"
                  />
                  {/* Bottom fade */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-primary-500/8 to-transparent pointer-events-none"
                  />
                  {/* Giant watermark closing mark */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-10 -right-2 text-[16rem] font-serif leading-none text-white/[0.028] select-none pointer-events-none"
                  >
                    &rdquo;
                  </span>
                  {/* Opening quote */}
                  <div
                    aria-hidden="true"
                    className="text-7xl md:text-8xl font-serif text-primary-500 leading-none mb-3 select-none"
                  >
                    &ldquo;
                  </div>
                  <p className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.35] tracking-tight">
                    {quoteText}
                  </p>
                  {/* Tapering trail */}
                  <div className="mt-8 flex items-center gap-2">
                    <div className="w-10 h-0.5 rounded-full bg-primary-500" />
                    <div className="w-4 h-0.5 rounded-full bg-primary-500/35" />
                    <div className="w-2 h-0.5 rounded-full bg-primary-500/15" />
                  </div>
                </blockquote>
              </Reveal>
            );
          }

          case "ul":
            return (
              <Reveal key={i}>
                <ul className="space-y-2.5">
                  {s.items?.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-[15px] text-zinc-600 dark:text-neutral-300"
                    >
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-[0.58rem]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );

          case "steps":
            return (
              <Reveal key={i}>
                <div className="my-10">
                  {s.text && (
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        aria-hidden="true"
                        className="h-px flex-1 bg-linear-to-r from-transparent to-zinc-200 dark:to-zinc-700/50"
                      />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-neutral-500 shrink-0">
                        {s.text}
                      </p>
                      <div
                        aria-hidden="true"
                        className="h-px flex-1 bg-linear-to-l from-transparent to-zinc-200 dark:to-zinc-700/50"
                      />
                    </div>
                  )}
                  <div className="space-y-3">
                    {s.steps?.map((step, j) => (
                      <motion.div
                        key={j}
                        className="flex gap-4 group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-5% 0px" }}
                        transition={{
                          duration: 0.6,
                          delay: j * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {/* Badge + gradient connector */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-10 h-10 rounded-full bg-primary-500 text-white text-sm font-black flex items-center justify-center z-10 shadow-md shadow-primary-500/30 ring-4 ring-primary-500/10 group-hover:ring-primary-500/30 group-hover:shadow-lg group-hover:shadow-primary-500/40 transition-all duration-300">
                            {j + 1}
                          </div>
                          {j < (s.steps?.length ?? 0) - 1 && (
                            <div
                              aria-hidden="true"
                              className="w-px flex-1 mt-2 min-h-6"
                              style={{
                                background:
                                  "linear-gradient(to bottom, oklch(0.638 0.218 41.67 / 0.35), oklch(0.638 0.218 41.67 / 0.04))",
                              }}
                            />
                          )}
                        </div>

                        {/* Content card */}
                        <div className="flex-1 pb-3">
                          <div className="rounded-2xl border border-zinc-100 dark:border-white/5 bg-white dark:bg-white/2.5 p-5 transition-all duration-300 group-hover:border-primary-500/25 dark:group-hover:border-primary-500/20 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:shadow-primary-500/8">
                            <p className="text-base md:text-lg font-bold text-zinc-800 dark:text-white mb-2 leading-snug">
                              {step.title}
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-neutral-400 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );

          case "takeaways":
            return (
              <Reveal key={i}>
                <div className="relative overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-linear-to-br from-amber-50 to-yellow-50/30 dark:from-amber-950/40 dark:to-yellow-950/10 p-6 my-4">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-amber-400/10 blur-2xl"
                  />
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/15 flex items-center justify-center">
                      <Lightbulb
                        size={14}
                        className="text-amber-500"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm md:text-base font-black uppercase tracking-[0.15em] text-amber-700 dark:text-amber-400">
                      Key Takeaways
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {s.items?.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-amber-900/85 dark:text-amber-100/75"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-amber-500 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );

          case "faq":
            return (
              <Reveal key={i}>
                <div className="my-10">
                  <p className="text-xl font-bold text-zinc-800 dark:text-white mb-6">
                    Frequently Asked Questions
                  </p>
                  {s.faqs && <FAQGroup faqs={s.faqs} />}
                </div>
              </Reveal>
            );

          case "cta":
            return (
              <Reveal key={i}>
                <div className="relative overflow-hidden rounded-3xl p-8 my-8 text-center bg-zinc-900 dark:bg-black border border-white/8">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-br from-primary-600/20 via-transparent to-indigo-600/20"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl bg-primary-500/15 pointer-events-none"
                  />
                  <div className="relative">
                    {s.text && (
                      <p className="text-white/50 text-xs uppercase tracking-wider font-bold mb-2">
                        {s.text}
                      </p>
                    )}
                    <p className="text-white font-black text-2xl mb-6 leading-tight">
                      {s.cta?.label ?? "Try ERVFlow Free"}
                    </p>
                    <Link
                      href={s.cta?.href ?? "/signup"}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-zinc-900 font-bold text-sm hover:bg-white/90 transition-all hover:scale-105 cursor-pointer shadow-lg"
                    >
                      <Sparkles size={14} aria-hidden="true" />
                      {s.cta?.label ?? "Try ERVFlow Free"}
                    </Link>
                  </div>
                </div>
              </Reveal>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
