"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Play } from "lucide-react";

const HeroVisual = dynamic(() => import("./HeroVisual"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-125 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
  ),
});

const TRUST_BADGES = [
  "Generate in 60 Seconds",
  "Export Clean Code",
  "Responsive by Default",
  // "No Design Experience Needed",
  "Next.js & Tailwind Ready",
];

const Hero = () => {
  return (
    <section className="relative pt-26 md:pt-35 pb-0 px-4 sm:px-6 text-center overflow-hidden">
      {/* Background glows */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-125"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.638 0.218 41.67 / 0.09) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -top-10 -right-20 w-96 h-96"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        {/* Eyebrow badge */}
        <div
          className="hero-item inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-[11px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest"
          style={{ animationDelay: "0ms" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"
            aria-hidden="true"
          />
          Now in Beta — Try for free
        </div>

        {/* Headline — uses hero-title (not hero-item) so it's never opacity:0, keeping LCP fast */}
        <h1
          className="w-full max-w-4xl mx-auto hero-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.2] md:leading-[1.05] tracking-tight text-zinc-900 dark:text-white text-balance"
        >
          Build Production-Ready <br className="hidden md:inline" />
          <span className="bg-linear-to-r from-[#CEFF00] via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow">
            Websites with AI
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-item text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed"
          style={{ animationDelay: "240ms" }}
        >
          Generate layouts with AI, customize visually, and export clean Next.js
          and Tailwind code—all from a single platform.
        </p>

        {/* CTAs */}
        <div
          className="hero-item flex gap-1 sm:gap-2 md:gap-4 justify-center flex-wrap mb-2"
          style={{ animationDelay: "360ms" }}
        >
          {/* Primary — rotating glow motion button */}
          <Link
            href="/"
            className="cta-btn inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 rounded-full bg-primary dark:bg-primary-600 hover:border-primary-600 dark:hover:border-primary-700 text-white dark:text-zinc-100 font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
          >
            Start Building Free
          </Link>

          {/* Secondary */}
          <Link
            href="/"
            className="cta-btn inline-flex items-center justify-center gap-2 px-3 md:px-7 py-3 rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
          >
            <Play
              className="w-4 h-4 fill-current text-primary-400 dark:text-primary-400"
              aria-hidden="true"
            />
            Watch Demo
          </Link>
        </div>

        {/* Trust row */}
        <div
          className="hero-item flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          style={{ animationDelay: "320ms" }}
        >
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              <svg
                className="w-3.5 h-3.5 text-primary-500 shrink-0"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="7" cy="7" r="7" className="fill-primary-500/15" />
                <path
                  d="M4 7l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {badge}
            </span>
          ))}
        </div>

        {/* Social proof */}
        <p
          className="hero-item text-xs text-zinc-500 dark:text-zinc-400 -mt-1"
          style={{ animationDelay: "380ms" }}
        >
          Built for agencies, startups, and creators
        </p>

        {/* Hero Visual */}
        <div
          className="hero-item w-full mt-4"
          style={{ animationDelay: "420ms" }}
        >
          <HeroVisual />
          {/* Soft bleed — reduced so more of the editor body is visible above the fold */}
          <div className="relative -mt-16 h-16 pointer-events-none bg-linear-to-b from-transparent to-white dark:to-black" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
