"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import type { Post } from "@/lib/blog-types";

export default function ArticleHero({ post }: { post: Post }) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Image: zoom in and drift up as user scrolls
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const imgY     = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Text: fade out + float up + shrink slightly as user scrolls
  const contentY       = useTransform(scrollYProgress, [0, 0.55], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const contentScale   = useTransform(scrollYProgress, [0, 0.42], [1, 0.97]);

  const words = post.title.split(" ");

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0A0A0B" }}
    >
      {/* ─────────────────────────────────────────────────────────
          LAYER 1 — Subtle dot-grid on the dark panel (fades with text)
      ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ─────────────────────────────────────────────────────────
          LAYER 2 — Film-grain noise
      ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* ─────────────────────────────────────────────────────────
          LAYER 3 — Accent color glow pool (bottom-left)
      ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[50%] h-[55%] z-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 10% 100%, ${post.glow} 0%, transparent 70%)`,
          filter: "blur(1px)",
        }}
      />

      {/* ─────────────────────────────────────────────────────────
          LAYER 4 — Right-side featured image panel (decorative)
      ───────────────────────────────────────────────────────── */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%] z-[1]">
        <motion.div
          className="h-full w-full"
          style={{ scale: imgScale, y: imgY, transformOrigin: "center center" }}
        >
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="50vw"
            />
          ) : (
            <div className={`w-full h-full bg-linear-to-br ${post.gradient}`} />
          )}
        </motion.div>

        {/* Gradient mask: blend left edge into the dark panel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #0A0A0B 0%, #0A0A0B 8%, rgba(10,10,11,0.5) 35%, transparent 60%)",
          }}
        />
        {/* Gradient mask: blend bottom edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #0A0A0B 0%, rgba(10,10,11,0.4) 25%, transparent 55%)",
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #0A0A0B 0%, rgba(10,10,11,0.2) 20%, transparent 40%)",
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────
          CONTENT — Text always on guaranteed-dark surface
      ───────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-20 w-full lg:w-[58%] px-8 sm:px-12 md:px-16 xl:px-24 py-36 lg:py-40"
      >
        {/* Vertical accent stripe + category */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            className="w-0.5 h-7 rounded-full flex-shrink-0"
            style={{ background: post.glow }}
          />
          <span
            className="text-[11px] font-black uppercase tracking-[0.22em]"
            style={{ color: post.artColor }}
          >
            {post.category}
          </span>
          <span className="text-white/15 text-xs">—</span>
          <span className="text-[11px] text-white/35 font-mono flex items-center gap-1.5">
            <Clock size={9} aria-hidden="true" />
            {post.readTime} read
          </span>
          <span className="text-[11px] text-white/25 font-mono flex items-center gap-1.5">
            <Calendar size={9} aria-hidden="true" />
            {post.date}
          </span>
        </motion.div>

        {/* Giant title — word by word 3D entrance */}
        <div style={{ perspective: "1200px" }} className="mb-7">
          <h1 className="flex flex-wrap gap-x-[0.2em] gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 64, rotateX: -48 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.22 + i * 0.065,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block font-black leading-[0.9] tracking-[-0.03em] text-white"
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 6.5rem)",
                  transformOrigin: "50% 100%",
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.26 + words.length * 0.065,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-base md:text-lg leading-relaxed text-white/55 max-w-lg mb-10 font-light"
        >
          {post.excerpt}
        </motion.p>

        {/* Author + scroll cue row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.32 + words.length * 0.065,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-center justify-between"
        >
          {/* Author */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0"
              style={{
                background: `${post.glow}30`,
                border: `1.5px solid ${post.glow}60`,
                color: post.artColor,
              }}
            >
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="text-sm font-bold text-white/90">{post.author}</p>
              <p className="text-[10px] text-white/30 font-mono tracking-wide">
                {post.authorRole}
              </p>
            </div>
          </div>

          {/* Scroll mouse indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            aria-hidden="true"
            className="flex items-center gap-2.5"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.28em] text-white/20">
              Scroll
            </span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="text-white/20"
            >
              <rect
                x="1"
                y="1"
                width="14"
                height="22"
                rx="7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <motion.rect
                x="6.5"
                y="5"
                width="3"
                height="4"
                rx="1.5"
                fill="currentColor"
                animate={{ y: [5, 11, 5], opacity: [0.7, 0.15, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          Bottom fade: hero → body background
      ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 z-30 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0A0B)",
        }}
      />
    </section>
  );
}
