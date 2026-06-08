"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import { Plus } from "lucide-react";
import Blob from "@/components/common/Blob";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

/* ── Single FAQ row ─────────────────────────────────────────────────── */
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
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      className="border-b border-white/8 last:border-0 px-4 md:px-6"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span
          className={`text-base font-medium text-white md:text-lg ${
            open ? "text-primary!" : ""
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`shrink-0 rounded-full border border-white/10 bg-white/5 p-1 transition-colors duration-200 ${
            open ? "text-primary! bg-primary/10!" : ""
          }`}
        >
          <Plus className="h-4 w-4 text-currentColor" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-sm leading-relaxed text-neutral-400 md:text-base text-start">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Section header variants ─────────────────────────────────────────── */
const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/* ── Main section ───────────────────────────────────────────────────── */
export default function FAQ() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <main className="min-h-screen relative bg-black text-white z-2">
      <Blob />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="pt-30 md:pt-35 pb-16 px-6 text-center relative z-10 max-w-5xl mx-auto">
        <div className="w-full max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            ref={headerRef}
            variants={headerVariants}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            className="mb-14 text-center"
          >
            <motion.span
              variants={headerItemVariants}
              className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary-500"
            >
              FAQ
            </motion.span>
            <motion.h2
              variants={headerItemVariants}
              className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Got questions?{" "}
              <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
                We&apos;ve got answers.
              </span>
            </motion.h2>
            <motion.p
              variants={headerItemVariants}
              className="mx-auto max-w-xl text-base text-neutral-400 md:text-lg"
            >
              Everything you need to know before you start building with
              Ervflow.
            </motion.p>
          </motion.div>
        </div>

        {/* Accordion */}
        <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm">
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

        {/* Footer nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-neutral-600"
        >
          Still have questions?{" "}
          <a
            href="mailto:hello@ervflow.com"
            className="text-neutral-400 underline underline-offset-4 hover:text-primary transition-colors"
          >
            Reach out to us
          </a>
        </motion.p>
      </div>
    </main>
  );
}
