"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, X, Minus, MoveRight, Gem, Zap } from "lucide-react";
import Link from "next/link";
import SectionReady from "@/components/common/SectionReady";
import GlowBlob from "@/components/common/GlowBlob";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Data ─────────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "Build and explore at no cost",
    monthly: 0,
    annual: 0,
    cta: "Get started free",
    href: "/signup",
    popular: false,
    features: [
      "3 projects",
      "Core component library",
      "HTML / CSS export",
      "3 design themes",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For individual creators shipping fast",
    monthly: 29,
    annual: 23,
    cta: "Start free trial",
    href: "/signup?plan=pro",
    popular: false,
    features: [
      "Unlimited projects",
      "Full component library",
      "50 AI generations / mo",
      "React & Next.js export",
      "Custom domain",
      "Email support (48 h)",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For teams that move together",
    monthly: 79,
    annual: 63,
    cta: "Start free trial",
    href: "/signup?plan=growth",
    popular: true,
    features: [
      "Everything in Pro",
      "Unlimited AI generations",
      "3 team members",
      "Custom components",
      "Vue, Svelte, React Native",
      "One-click deploy (all)",
      "Priority support (24 h)",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For agencies and enterprises",
    monthly: 199,
    annual: 159,
    cta: "Contact sales",
    href: "/contact",
    popular: false,
    features: [
      "Everything in Growth",
      "Unlimited team members",
      "White label",
      "API access & webhooks",
      "Dedicated account manager",
      "4 h SLA support",
      "Onboarding call",
    ],
  },
] as const;

type FeatureValue = boolean | string | null;

interface FeatureGroup {
  label: string;
  rows: {
    name: string;
    values: [FeatureValue, FeatureValue, FeatureValue, FeatureValue];
  }[];
}

const COMPARISON: FeatureGroup[] = [
  {
    label: "Projects & Publishing",
    rows: [
      {
        name: "Projects",
        values: ["3", "Unlimited", "Unlimited", "Unlimited"],
      },
      {
        name: "Pages per project",
        values: ["10", "Unlimited", "Unlimited", "Unlimited"],
      },
      { name: "Custom domain", values: [false, true, true, true] },
      {
        name: "One-click deploy",
        values: [false, "Vercel", "Vercel + Netlify", "All platforms"],
      },
    ],
  },
  {
    label: "Components & AI",
    rows: [
      { name: "Component library", values: ["Core", "Full", "Full", "Full"] },
      {
        name: "AI generations / mo",
        values: [false, "50", "Unlimited", "Unlimited"],
      },
      { name: "Custom components", values: [false, false, true, true] },
      {
        name: "Design themes",
        values: ["3", "All", "All + Custom", "All + Custom"],
      },
    ],
  },
  {
    label: "Exports & Integrations",
    rows: [
      { name: "HTML / CSS", values: [true, true, true, true] },
      { name: "React / Next.js", values: [false, true, true, true] },
      { name: "Vue / Svelte", values: [false, false, true, true] },
      { name: "API access", values: [false, false, false, true] },
      { name: "Webhooks", values: [false, false, true, true] },
    ],
  },
  {
    label: "Collaboration",
    rows: [
      { name: "Team members", values: [false, false, "3", "Unlimited"] },
      { name: "Comments", values: [false, false, true, true] },
      {
        name: "Roles & permissions",
        values: [false, false, "Basic", "Advanced"],
      },
      { name: "Shared workspace", values: [false, false, true, true] },
    ],
  },
  {
    label: "Support",
    rows: [
      {
        name: "Support type",
        values: ["Community", "Email", "Priority", "Dedicated"],
      },
      { name: "Response time", values: [null, "48 h", "24 h", "4 h"] },
      { name: "Onboarding call", values: [false, false, false, true] },
      { name: "White label", values: [false, false, false, true] },
    ],
  },
];

/* ── Billing toggle ──────────────────────────────────────────────── */
function BillingToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-zinc-800/20 dark:border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-sm">
      <button
        onClick={() => onChange(false)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          !annual
            ? "bg-black/10 dark:bg-white/5 text-black dark:text-white"
            : "text-black dark:text-neutral-100 hover:text-primary"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange(true)}
        className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          annual
            ? "bg-black/10 dark:bg-white/5 text-black dark:text-white"
            : "text-black dark:text-neutral-100 hover:text-primary"
        }`}
      >
        Annual
        <span className="rounded-full bg-primary-500/15 dark:bg-primary-500/25 px-2 py-0.5 text-xs font-semibold text-primary-600 dark:text-primary-400">
          Save 20%
        </span>
      </button>
    </div>
  );
}

/* ── Pricing card ────────────────────────────────────────────────── */
function PricingCard({
  plan,
  annual,
  index,
}: {
  plan: (typeof PLANS)[number];
  annual: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const price = annual ? plan.annual : plan.monthly;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className={`relative flex flex-col rounded-2xl border p-6 md:p-8 ${
        plan.popular
          ? "border-primary-500/50 bg-linear-to-b from-primary-500/10 to-primary-500/4 shadow-[0_0_50px_rgba(247,98,53,0.12)]"
          : "border-zinc-800/20 dark:border-white/8 bg-white/3"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="flex items-center gap-1.5 rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            <Zap className="h-3 w-3" />
            Most Popular
          </span>
        </div>
      )}

      {/* Plan name & tagline */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {plan.name}
        </h2>
        <p className="mt-1 text-sm text-slate-800 dark:text-neutral-300">
          {plan.tagline}
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-end gap-1.5">
          {price === 0 ? (
            <span className="text-5xl font-black text-slate-700 dark:text-white">
              Free
            </span>
          ) : (
            <>
              <span className="mb-1 text-2xl font-bold text-slate-800 dark:text-neutral-300">
                $
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={price}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="text-5xl font-black text-slate-700 dark:text-white leading-none"
                >
                  {price}
                </motion.span>
              </AnimatePresence>
              <span className="mb-1.5 text-sm text-slate-700 dark:text-neutral-300">
                / mo
              </span>
            </>
          )}
        </div>
        {annual && price > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 text-xs text-slate-800 dark:text-neutral-300"
          >
            Billed annually · ${price * 12} / yr
          </motion.p>
        )}
        {!annual && price > 0 && (
          <p className="mt-1.5 text-xs text-slate-800 dark:text-neutral-300">
            Switch to annual to save 20%
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="mb-8 grow space-y-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm text-slate-800 dark:text-neutral-300"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={plan.href}
        className={`flex items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold transition-all duration-200 ${
          plan.popular
            ? "bg-primary-500 text-white hover:bg-primary-600 shadow-[0_4px_20px_rgba(247,98,53,0.3)]"
            : "border border-white/10 bg-slate-800/25 dark:bg-white/5 text-black hover:text-white dark:text-white hover:bg-slate-800/50 dark:hover:bg-white/10"
        }`}
      >
        {plan.cta}
        <MoveRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}

/* ── Feature cell ─────────────────────────────────────────────────── */
function Cell({
  value,
  highlight,
}: {
  value: FeatureValue;
  highlight?: boolean;
}) {
  if (value === true)
    return (
      <div className="flex justify-center">
        <Check
          className={`h-5 w-5 ${highlight ? "text-green-500" : "text-green-500"}`}
        />
      </div>
    );
  if (value === false)
    return (
      <div className="flex justify-center">
        <X className="h-4 w-4 text-red-500 dark:text-red-500" />
      </div>
    );
  if (value === null)
    return (
      <div className="flex justify-center">
        <Minus className="h-4 w-4 text-slate-800 dark:text-neutral-300" />
      </div>
    );
  return (
    <span
      className={`block text-center text-sm ${highlight ? "font-medium text-slate-800 dark:text-white" : "text-slate-800 dark:text-neutral-300"}`}
    >
      {value}
    </span>
  );
}

/* ── Comparison table ────────────────────────────────────────────── */
function ComparisonTable({ annual }: { annual: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, ease: EASE }}
      className=""
    >
      <table className="w-full min-w-160 border-collapse">
        <thead>
          <tr>
            <th className="sticky top-19.5 z-20 w-56  bg-white/1 dark:bg-black/50 py-4 text-left text-sm font-medium text-slate-800 dark:text-neutral-300 shadow-[0_1px_0_rgba(0,0,0,0.075)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md" />
            {PLANS.map((plan) => (
              <th
                key={plan.id}
                className={`sticky top-19.5 z-20 py-4 text-center shadow-[0_1px_0_rgba(0,0,0,0.075)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md ${
                  plan.popular ? "dark:bg-[#0d0905]/50" : "dark:bg-black/85"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`text-sm md:text-base font-bold ${plan.popular ? "text-primary-500" : "dark:text-white"}`}
                  >
                    {plan.name}
                  </span>
                  <span className="text-xs text-slate-700 dark:text-neutral-300">
                    {annual && plan.annual > 0
                      ? `$${plan.annual}/mo`
                      : plan.monthly === 0
                        ? "Free"
                        : `$${plan.monthly}/mo`}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {COMPARISON.map((group, gi) => (
            <React.Fragment key={gi}>
              {/* Group header */}
              <tr>
                <td
                  colSpan={5}
                  className="border-t border-white/8 pb-2 pt-8 text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-neutral-300"
                >
                  {group.label}
                </td>
              </tr>

              {/* Feature rows */}
              {group.rows.map((row, ri) => (
                <tr
                  key={`${gi}-${ri}`}
                  className="border-t border-black/5 dark:border-white/5 transition-colors hover:bg-white/2"
                >
                  <td className="py-3.5 pr-6 text-sm text-slate-800 dark:text-neutral-300">
                    {row.name}
                  </td>
                  {row.values.map((val, vi) => (
                    <td
                      key={vi}
                      className={`py-3.5 text-center ${
                        vi === 2 ? "bg-primary-500/5" : ""
                      }`}
                    >
                      <Cell value={val} highlight={vi === 2} />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}

          {/* CTA row */}
          <tr className="border-t border-white/8">
            <td className="py-6" />
            {PLANS.map((plan) => (
              <td
                key={plan.id}
                className={`py-6 text-center ${plan.popular ? "bg-primary-500/5" : ""}`}
              >
                <Link
                  href={plan.href}
                  className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-primary-500 text-white hover:bg-primary-600"
                      : "border border-black/10 dark:border-white/10 bg-slate-800/5 dark:bg-white/5 text-slate-800 dark:text-white hover:text-primary-500 dark:hover:bg-white/10"
                  }`}
                >
                  {plan.id === "business" ? "Contact sales" : "Get started"}
                  <MoveRight className="h-3.5 w-3.5" />
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

/* ── Header variants ─────────────────────────────────────────────── */
const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const headerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/* ── Page ────────────────────────────────────────────────────────── */
export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.4 });

  return (
    <main className="min-h-screen relative bg-white dark:bg-black text-black dark:text-white z-2">
      {/* Background glows */}
      <GlowBlob />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-40 md:pt-50 pb-16 px-6 text-center">
        <motion.div
          ref={heroRef}
          variants={headerVariants}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          className="mx-auto max-w-3xl"
        >
          <motion.span
            variants={headerItemVariants}
            className="mb-5 inline-flex items-center gap-1 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-400"
          >
            <Gem className="w-3.5 h-3.5" />
            Pricing
          </motion.span>
          <motion.h1
            variants={headerItemVariants}
            className="mb-5 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-800 dark:text-white"
          >
            One platform. All your{" "}
            <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
              business needs
            </span>
            .
          </motion.h1>
          <motion.p
            variants={headerItemVariants}
            className="mb-10 text-lg text-slate-800 dark:text-neutral-300"
          >
            Start free, scale when you need to. No hidden fees, no surprises.
          </motion.p>
          <motion.div
            variants={headerItemVariants}
            className="flex justify-center"
          >
            <BillingToggle annual={annual} onChange={setAnnual} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Pricing cards ────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} annual={annual} index={i} />
          ))}
        </div>

        {/* Trust line */}
        <p className="mt-8 text-center text-sm text-slate-800 dark:text-neutral-300">
          All plans include a 14-day free trial · No credit card required
        </p>
      </section>

      {/* ── Comparison table ─────────────────────────────────── */}
      <section className="hidden md:block px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white md:text-4xl">
              Compare all features
            </h3>
            <p className="mt-3 text-slate-600 dark:text-neutral-300">
              Everything you need to make the right choice.
            </p>
          </div>
          <ComparisonTable annual={annual} />
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <SectionReady />
    </main>
  );
}
