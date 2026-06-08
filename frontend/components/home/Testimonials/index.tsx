"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Frontend Lead",
    company: "Stripe",
    initials: "SC",
    content:
      "Ervflow cut our prototyping time in half. The component library is incredibly well-organized and the Tailwind integration feels completely native to our workflow.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "Product Designer",
    company: "Linear",
    initials: "MW",
    content:
      "Nothing comes close to the flexibility and speed of Ervflow. Our team shipped 3× faster last quarter.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "CTO",
    company: "Vercel",
    initials: "PP",
    content:
      "The AI component generation is a game changer. We built an entire dashboard in under 20 minutes that would have taken days.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "Fullstack Engineer",
    company: "Notion",
    initials: "JO",
    content:
      "Clean exports, zero vendor lock-in. The source code is production-ready straight out of the editor — no cleanup needed.",
    rating: 5,
  },
  {
    name: "Lena Müller",
    role: "UI Engineer",
    company: "Figma",
    initials: "LM",
    content:
      "The design-to-code workflow is flawless. I import my Figma designs and Ervflow handles the rest with zero handoff friction — it genuinely changed how our team works together.",
    rating: 5,
  },
];

const AVATAR_COLORS: Record<string, string> = {
  SC: "bg-blue-500/20 text-blue-300",
  MW: "bg-violet-500/20 text-violet-300",
  PP: "bg-emerald-500/20 text-emerald-300",
  JO: "bg-amber-500/20 text-amber-300",
  LM: "bg-cyan-500/20 text-cyan-300",
};

type Testimonial = (typeof TESTIMONIALS)[0];
type AnimFrom = "bottom" | "left" | "right" | "scale";

const fromVariants: Record<AnimFrom, Variants> = {
  bottom: { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
};

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5 fill-[#F76235]"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Reusable animated wrapper ───────────────────────────────────────── */
function BentoCard({
  children,
  className,
  delay,
  from,
  hover = "lift",
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  from: AnimFrom;
  hover?: "lift" | "scale" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const hoverAnim = {
    lift: { y: -6 },
    scale: { scale: 1.04 },
    none: {},
  }[hover];

  return (
    <motion.div
      ref={ref}
      variants={fromVariants[from]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.65, delay, ease: EASE }}
      whileHover={{
        ...hoverAnim,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden group/bento", className)}
      style={
        {
          "--mouse-x": `${mousePos.x}px`,
          "--mouse-y": `${mousePos.y}px`,
        } as React.CSSProperties
      }
    >
      {/* Spotlight fill — follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(247,98,53,0.05), transparent 80%)",
        }}
      />
      {/* Border highlight — same gradient masked to border only */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100"
        style={{
          background:
            "radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), rgba(247,98,53,0.12), transparent 50%)",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </motion.div>
  );
}

/* ── Large quote card (col-span-2) ───────────────────────────────────── */
function QuoteCard({
  t,
  delay,
  from,
}: {
  t: Testimonial;
  delay: number;
  from: AnimFrom;
}) {
  return (
    <BentoCard
      delay={delay}
      from={from}
      hover="lift"
      className="col-span-1 md:col-span-2 rounded-3xl border border-zinc-800/15 dark:border-white/8 bg-white/5 p-8 flex flex-col justify-between gap-6 backdrop-blur-sm select-none"
    >
      <div>
        <span
          className="block text-8xl font-black leading-none text-primary-500 opacity-75 dark:opacity-40 -mb-2"
          aria-hidden="true"
        >
          &rdquo;
        </span>
        <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-white leading-relaxed">
          {t.content}
        </p>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${AVATAR_COLORS[t.initials]}`}
          >
            {t.initials}
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-white">
              {t.name}
            </p>
            <p className="text-sm text-neutral-500">
              {t.role} · {t.company}
            </p>
          </div>
        </div>
        <StarRating count={t.rating} />
      </div>
    </BentoCard>
  );
}

/* ── Stat / metric card ──────────────────────────────────────────────── */
function StatCard({
  value,
  unit,
  label,
  delay,
  from,
}: {
  value: string;
  unit?: string;
  label: string;
  delay: number;
  from: AnimFrom;
}) {
  return (
    <BentoCard
      delay={delay}
      from={from}
      hover="scale"
      className="rounded-3xl border border-primary-500/25 bg-linear-to-br from-primary-500/12 to-transparent p-8 flex flex-col items-center justify-center text-center gap-3 select-none"
    >
      <p className="text-6xl font-black tracking-tight text-slate-800 dark:text-white leading-none">
        {value}
        {unit && <span className="text-primary-400">{unit}</span>}
      </p>
      <p className="text-sm text-zinc-500 dark:text-neutral-400 max-w-[18ch] leading-snug">
        {label}
      </p>
    </BentoCard>
  );
}

/* ── Compact review card ─────────────────────────────────────────────── */
function ReviewCard({
  t,
  delay,
  from,
}: {
  t: Testimonial;
  delay: number;
  from: AnimFrom;
}) {
  return (
    <BentoCard
      delay={delay}
      from={from}
      hover="lift"
      className="rounded-3xl border border-zinc-800/15 dark:border-white/8 bg-black/4 dark:bg-white/4 p-6 flex flex-col gap-4 backdrop-blur-sm select-none"
    >
      <StarRating count={t.rating} />
      <p className="text-sm leading-relaxed text-slate-700 dark:text-neutral-300 grow">
        &ldquo;{t.content}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${AVATAR_COLORS[t.initials]}`}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-white">
            {t.name}
          </p>
          <p className="text-xs text-neutral-500">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

/* ── Featured card (primary accent) ─────────────────────────────────── */
function FeaturedCard({
  t,
  delay,
  from,
}: {
  t: Testimonial;
  delay: number;
  from: AnimFrom;
}) {
  return (
    <BentoCard
      delay={delay}
      from={from}
      hover="lift"
      className="rounded-3xl border border-primary-500/30 bg-primary-500/10 p-6 flex flex-col gap-4 relative overflow-hidden select-none"
    >
      {/* Decorative corner glow */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-primary-500/25 blur-3xl"
        aria-hidden="true"
      />
      <StarRating count={t.rating} />
      <p className="text-sm leading-relaxed text-slate-700 dark:text-neutral-200 grow relative z-10">
        &ldquo;{t.content}&rdquo;
      </p>
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-500/30 text-xs font-semibold text-primary-200">
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-white">
            {t.name}
          </p>
          <p className="text-xs text-primary-400/80">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

/* ── Section header variants ─────────────────────────────────────────── */
const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/* ── Main section ────────────────────────────────────────────────────── */
export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section className="py-20 px-6 overflow-hidden">
      {/* Section header */}
      <motion.div
        ref={headerRef}
        variants={headerVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <motion.span
          variants={headerItemVariants}
          className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary-500"
        >
          Testimonials
        </motion.span>
        <motion.h2
          variants={headerItemVariants}
          className="mb-5 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-800 dark:text-white"
        >
          Loved by builders{" "}
          <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
            worldwide
          </span>
        </motion.h2>
        <motion.p
          variants={headerItemVariants}
          className="text-base text-zinc-500 dark:text-neutral-400 md:text-lg"
        >
          Join thousands of designers and developers who ship faster with
          Ervflow.
        </motion.p>
      </motion.div>

      {/* Bento grid
           lg (3 cols): [QuoteCard×2] [Stat]  /  [Review] [Review] [Featured]  /  [Stat] [QuoteCard×2]
           md (2 cols): QuoteCards go full-width, rest stack 2-up
           sm (1 col) : all full-width                                          */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Row 1 */}
        <QuoteCard t={TESTIMONIALS[0]} delay={0} from="left" />
        <StatCard
          value="4.9"
          unit="/5"
          label="Average rating from 2,400+ reviews"
          delay={0.12}
          from="scale"
        />

        {/* Row 2 */}
        <ReviewCard t={TESTIMONIALS[1]} delay={0.08} from="bottom" />
        <ReviewCard t={TESTIMONIALS[2]} delay={0.14} from="bottom" />
        <FeaturedCard t={TESTIMONIALS[3]} delay={0.2} from="right" />

        {/* Row 3 */}
        <StatCard
          value="3"
          unit="×"
          label="Faster shipping vs manual builds"
          delay={0.08}
          from="scale"
        />
        <QuoteCard t={TESTIMONIALS[4]} delay={0.14} from="right" />
      </div>
    </section>
  );
}
