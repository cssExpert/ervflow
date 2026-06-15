"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import type { Post } from "@/lib/blog-types";

export default function ArticleHero({ post }: { post: Post }) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Full-bleed reveal image: zooms throughout, starts blurred, sharpens mid-scroll
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const blurPx = useTransform(scrollYProgress, [0.15, 0.65], [18, 0]);
  const imgFilter = useMotionTemplate`blur(${blurPx}px)`;

  // Text: slower fade — gone by 38% scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.44], ["0%", "-20%"]);
  const contentScale = useTransform(scrollYProgress, [0, 0.38], [1, 1]);

  // Panels dissolve to reveal full-bleed image — no scrim (caused muddy shade)
  const curtainOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);
  const rightPanelOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);

  const dotOpacity = useTransform(contentOpacity, [0, 1], [0, 0.18]);

  const words = post.title.split(" ");

  return (
    <section
      ref={heroRef}
      className="relative flex items-center overflow-hidden bg-black"
    >
      {/* ── LAYER 0: Full-bleed image ─────────────────────────────
           Hidden behind everything at load. Revealed on scroll.
           Starts blurred (18px) → sharpens by 65% scroll.
           Zooms the whole time.
      ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imgScale, y: imgY, transformOrigin: "center center" }}
      >
        <motion.div className="absolute inset-0" style={{ filter: imgFilter }}>
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className={`w-full h-full bg-linear-to-br ${post.gradient}`} />
          )}
        </motion.div>
      </motion.div>

      {/* ── LAYER 2: Left dark curtain ────────────────────────────
           The solid panel the text sits on. Fades after text gone.
      ─────────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-full lg:w-[62%] z-2 pointer-events-none"
        style={{ opacity: curtainOpacity, background: "#0A0A0B" }}
      />

      {/* ── LAYER 3: Right decorative image panel ─────────────────
           The split-panel image the user liked at load.
           Sharp + masked. Fades on scroll to reveal layer 0 (blurred).
      ─────────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%] z-3"
        style={{ opacity: rightPanelOpacity }}
      >
        <div className="absolute inset-0 overflow-hidden">
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
        </div>
        {/* Left edge — blends into the dark curtain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #0A0A0B 0%, #0A0A0B 6%, rgba(10,10,11,0.55) 32%, transparent 58%)",
          }}
        />
        {/* Bottom edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #0A0A0B 0%, rgba(10,10,11,0.35) 22%, transparent 50%)",
          }}
        />
        {/* Top edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #0A0A0B 0%, rgba(10,10,11,0.15) 18%, transparent 38%)",
          }}
        />
      </motion.div>

      {/* ── LAYER 4: Dot-grid — fades with text ───────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-4 pointer-events-none"
        style={{
          opacity: dotOpacity,
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── LAYER 5: Film grain ────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-4 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* ── CONTENT ────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 w-full px-8 sm:px-12 md:px-16 xl:px-24 pt-32 lg:py-40 pb-10 lg:pb-15"
      >
        <div className="w-full lg:w-[58%]">
          {/* Category + meta */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div
              className="w-0.5 h-7 rounded-full shrink-0"
              style={{ background: post.glow }}
            />
            <span
              className="text-[11px] font-black uppercase tracking-[0.22em]"
              style={{ color: post.artColor }}
            >
              {post.category}
            </span>
            <span className="text-white/15 text-xs">—</span>
            <span className="text-[11px] text-white/35 dark:text-white/50 font-mono flex items-center gap-1.5">
              <Clock size={9} aria-hidden="true" />
              {post.readTime} read
            </span>
            <span className="text-[11px] text-white/35 dark:text-white/50 font-mono flex items-center gap-1.5">
              <Calendar size={9} aria-hidden="true" />
              {post.date}
            </span>
          </motion.div>

          {/* Title — word-by-word 3D entrance */}
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
            className="text-base md:text-lg leading-relaxed text-white/85 max-w-lg mb-10 font-light"
          >
            {post.excerpt}
          </motion.p>
        </div>

        {/* Author + scroll cue */}
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
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold shrink-0"
              style={{
                background: `${post.glow}30`,
                border: `1.5px solid ${post.glow}`,
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
              <p className="text-[10px] text-white/75 font-mono tracking-wide">
                {post.authorRole}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            aria-hidden="true"
            className="absolute bottom-5 w-screen-w left-1/2 flex items-center gap-2.5 z-40"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.28em] text-white/50">
              Scroll
            </span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="text-white/50"
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
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-28 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #000)",
        }}
      /> */}
    </section>
  );
}
