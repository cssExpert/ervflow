"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import Blob from "@/components/common/Blob";

const FAQS = [
  {
    question: "What front-end technologies does Ervflow support?",
    answer:
      "Ervflow supports Tailwind CSS and Bootstrap out of the box, with more frameworks on the roadmap. You can switch between them at any point without losing your layout structure.",
  },
  {
    question: "Can I export and own the source code?",
    answer:
      "Yes — fully. Every export is clean, dependency-free HTML/CSS/JS (or your chosen framework). There is zero vendor lock-in; once downloaded the code is yours to host, modify, and deploy anywhere.",
  },
  {
    question: "How does the AI component generation work?",
    answer:
      "Describe what you need in plain language — 'a pricing table with a monthly/yearly toggle' — and the AI drafts the component using your active design system and theme. You can refine it with follow-up prompts or edit the output directly in the canvas.",
  },
  {
    question: "Is Ervflow suitable for production applications?",
    answer:
      "Absolutely. The exported code follows semantic HTML, accessibility best practices, and is optimised for performance. Teams at Stripe, Linear, and Shopify use Ervflow to prototype and ship production interfaces.",
  },
  {
    question: "Can I bring in my own custom components?",
    answer:
      "Yes. You can import your own React components, register them in the component library, and use them in any layout alongside Ervflow's built-in blocks.",
  },
  {
    question: "What hosting options are available?",
    answer:
      "Export and deploy to any host — Vercel, Netlify, AWS, your own server via SSH or Git. Ervflow also supports one-click deploys directly from the editor for Vercel and Netlify.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The free tier gives you full access to the editor, all core components, and up to 3 published projects. Paid plans unlock unlimited projects, the AI assistant, team collaboration, and priority support.",
  },
  {
    question: "How does team collaboration work?",
    answer:
      "Invite teammates to a shared workspace. Multiple collaborators can work on different pages simultaneously, leave comments on any element, and manage roles with granular permissions.",
  },
];

function FAQItem({
  question,
  answer,
  index,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="faq-item border-b border-zinc-800/15 dark:border-white/8 last:border-0 px-4 md:px-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms`,
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className={`text-base font-medium text-zinc-800 dark:text-white md:text-lg ${open ? "text-primary!" : ""}`}>
          {question}
        </span>
        {/* CSS rotate — replaces motion.div animate rotate */}
        <span
          className={`shrink-0 rounded-full border border-zinc-800/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/50 dark:text-white p-1 transition-all duration-250 ${
            open ? "rotate-45 text-primary! bg-primary/10!" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>

      {/* CSS grid height animation — replaces AnimatePresence */}
      <div
        className="grid transition-[grid-template-rows] duration-350 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-10 text-sm leading-relaxed text-zinc-600 dark:text-neutral-400 md:text-base text-start">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  const fadeStyle = (delay = 0) => ({
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <main className="min-h-screen relative bg-white dark:bg-black text-white z-2">
      <Blob />

      <div className="pt-30 md:pt-35 pb-16 px-6 text-center relative z-10 max-w-5xl mx-auto">
        <div className="w-full max-w-3xl mx-auto">
          <div ref={headerRef} className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary-500" style={fadeStyle(0)}>
              FAQ
            </span>
            <h2
              className="mb-5 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-800 dark:text-white"
              style={fadeStyle(130)}
            >
              Got questions?{" "}
              <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
                We&apos;ve got answers.
              </span>
            </h2>
            <p
              className="mx-auto max-w-xl text-base text-zinc-500 dark:text-neutral-400 md:text-lg"
              style={fadeStyle(260)}
            >
              Everything you need to know before you start building with Ervflow.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800/15 dark:border-white/8 bg-white/3 backdrop-blur-sm">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              index={i}
              open={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

        <p
          className="mt-10 text-center text-sm text-neutral-600"
          style={fadeStyle(400)}
        >
          Still have questions?{" "}
          <a
            href="mailto:hello@ervflow.com"
            className="text-neutral-400 underline underline-offset-4 hover:text-primary transition-colors"
          >
            Reach out to us
          </a>
        </p>
      </div>
    </main>
  );
}
