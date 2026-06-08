"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Palette,
  Code2,
  Layers,
  Sparkles,
  Gauge,
  Rocket,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import SectionReady from "@/components/common/SectionReady";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Services data ───────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "01",
    category: "Design",
    title: "UI / UX Design",
    description:
      "Pixel-perfect interfaces that convert. We bridge the gap between Figma and production — delivering accessible, responsive layouts that delight users on every device.",
    features: [
      "Figma → production",
      "Design systems",
      "WCAG accessibility",
      "Responsive layouts",
    ],
    Icon: Palette,
    accent: "from-blue-500/20 to-indigo-500/5",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-300",
  },
  {
    id: "02",
    category: "Development",
    title: "Frontend Development",
    description:
      "High-performance React and Next.js applications built with TypeScript and modern tooling. Clean, maintainable code delivered on time — no tech debt, no vendor lock-in.",
    features: [
      "React / Next.js",
      "TypeScript strict",
      "Tailwind CSS v4",
      "Zero lock-in",
    ],
    Icon: Code2,
    accent: "from-emerald-500/20 to-teal-500/5",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-300",
  },
  {
    id: "03",
    category: "Systems",
    title: "Component Libraries",
    description:
      "Scalable design systems your whole team can contribute to. From tokens to complex compound components — built once, documented thoroughly, and reused everywhere.",
    features: [
      "Design tokens",
      "Storybook docs",
      "Radix primitives",
      "Multi-theme support",
    ],
    Icon: Layers,
    accent: "from-violet-500/20 to-purple-500/5",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-300",
  },
  {
    id: "04",
    category: "AI",
    title: "AI Integration",
    description:
      "Intelligent UI generation, AI-assisted workflows, and LLM-powered features wired directly into your product — using the latest models from Anthropic and OpenAI.",
    features: [
      "AI component gen",
      "LLM API wiring",
      "Streaming UIs",
      "Prompt engineering",
    ],
    Icon: Sparkles,
    accent: "from-amber-500/20 to-orange-500/5",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-300",
  },
  {
    id: "05",
    category: "Performance",
    title: "Performance & SEO",
    description:
      "Sub-second load times, perfect Core Web Vitals scores, and search-optimised architecture. Your product, fast everywhere — from a 5G phone to a slow café connection.",
    features: [
      "Core Web Vitals",
      "Image optimisation",
      "Server components",
      "Structured data",
    ],
    Icon: Gauge,
    accent: "from-rose-500/20 to-pink-500/5",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-300",
  },
  {
    id: "06",
    category: "DevOps",
    title: "Deployment & Scale",
    description:
      "CI/CD pipelines, one-click deploys to Vercel and AWS, Docker containers, and infrastructure that scales from zero to millions without breaking a sweat.",
    features: [
      "Vercel / AWS",
      "CI/CD pipelines",
      "Docker / K8s",
      "Monitoring & alerts",
    ],
    Icon: Rocket,
    accent: "from-cyan-500/20 to-sky-500/5",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-300",
  },
] as const;

type Service = (typeof SERVICES)[number];

/* ── Service card with scroll-driven highlight ───────────────────── */
function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  /* All motion values derived at top-level (no hooks in JSX) */
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.2, 0.75, 1, 0.75, 0.2],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);
  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [
      "rgba(255,255,255,0.06)",
      "rgba(247,98,53,0.3)",
      "rgba(247,98,53,0.55)",
      "rgba(247,98,53,0.3)",
      "rgba(255,255,255,0.06)",
    ],
  );
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0 0 0px rgba(247,98,53,0)",
      "0 0 80px rgba(247,98,53,0.1)",
      "0 0 0px rgba(247,98,53,0)",
    ],
  );
  const numOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.12, 1, 0.12],
  );
  const iconScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88]);

  return (
    <section
      ref={ref}
      className="flex min-h-screen items-center pt-20 md:pt-30 pb-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          style={{ opacity, scale, borderColor, boxShadow }}
          className="grid gap-10 rounded-3xl border bg-white/0.025 p-0 backdrop-blur-sm md:p-14 lg:grid-cols-2"
        >
          {/* ── Left: text content ─────────────────────────────── */}
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-4">
              <motion.span
                style={{ opacity: numOpacity }}
                className="font-mono text-6xl font-black leading-none text-primary-500/70 md:text-7xl"
              >
                {service.id}
              </motion.span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                {service.category}
              </span>
            </div>

            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              {service.title}
            </h2>

            <p className="leading-relaxed text-neutral-400">
              {service.description}
            </p>

            <ul className="grid grid-cols-2 gap-3">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-neutral-300"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary-500" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(247,98,53,0.3)] transition-all hover:bg-primary-600"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* ── Right: icon visual ─────────────────────────────── */}
          <div className="flex items-center justify-center">
            <motion.div
              style={{ scale: iconScale }}
              className={`flex h-56 w-56 items-center justify-center rounded-3xl bg-linear-to-br ${service.accent} md:h-72 md:w-72`}
            >
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-2xl ${service.iconBg} md:h-32 md:w-32`}
              >
                <service.Icon
                  className={`h-12 w-12 ${service.iconColor} md:h-16 md:w-16`}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main className="min-h-screen relative px-6 overflow-hidden bg-black text-white z-2">
      {/* Ambient glows */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/2 h-120 w-175 -translate-x-1/2 rounded-full bg-primary-500/8 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-violet-500/8 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-blue-500/6 blur-[110px]" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-50 md:pt-75 pb-16 text-center flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto max-w-2xl"
        >
          <span className="mb-5 inline-block rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-400">
            Services
          </span>
          <h1 className="mb-5 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white text-balance">
            What we{" "}
            <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
              build
            </span>
          </h1>
          <p className="text-lg text-neutral-400">
            Scroll through to explore our services — each card highlights as it
            reaches the center of your view.
          </p>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="mt-10 flex justify-center"
            aria-hidden
          >
            <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="h-2 w-1 rounded-full bg-white/60"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Scroll-highlight service cards ───────────────────────── */}
      {SERVICES.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <SectionReady />
    </main>
  );
}
