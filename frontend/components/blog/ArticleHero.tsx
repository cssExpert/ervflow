"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import type { Post } from "@/lib/blog-types";

const spring = { type: "spring", damping: 30, stiffness: 300 } as const;

export default function ArticleHero({ post }: { post: Post }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayO = useTransform(scrollYProgress, [0, 0.6], [0.82, 0.97]);

  const words = post.title.split(" ");
  const titleDelay = (i: number) => 0.28 + i * 0.075;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[75vh] max-h-[82.5vh] flex flex-col justify-end overflow-hidden bg-white dark:bg-black"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 20%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, #000 20%, transparent 100%)",
      }}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 scale-110 origin-center"
        style={{ y: imgY }}
      >
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

      {/* Film-grain noise */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Base dark layer — always on, ensures minimum legibility */}
      <div className="absolute inset-0 bg-white/80 dark:bg-black/50 backdrop-blur-xs dark:backdrop-blur-sm" />

      {/* Dark vignette overlay — strengthens on scroll */}
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/40"
        style={{ opacity: overlayO }}
      />

      {/* Category glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-125 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 15% 100%, ${post.glow} 0%, transparent 65%)`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 sm:px-10 md:px-16 pb-24 pt-44"
        style={{ y: contentY }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge + meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <motion.span
              layoutId={`blog-badge-${post.id}`}
              className={`inline-flex text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 dark:border-black/20 bg-black/20 dark:bg-white/10 backdrop-blur-sm ${post.categoryText} text-white`}
              // style={{ borderColor: `${post.glow}20` }}
              transition={spring}
            >
              {post.category}
            </motion.span>
            <span className="h-px w-5 bg-white/20" aria-hidden="true" />
            <span className="text-xs text-white/75 flex items-center gap-1.5">
              <Calendar size={11} aria-hidden="true" />
              {post.date}
            </span>
            <span className="text-xs text-white/75 flex items-center gap-1.5">
              <Clock size={11} aria-hidden="true" />
              {post.readTime} read
            </span>
          </motion.div>

          {/* Title — word-by-word 3D reveal */}
          <div className="mb-8" style={{ perspective: "1200px" }}>
            <h1 className="flex flex-wrap gap-x-[0.25em] gap-y-2">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 72, rotateX: -42 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: titleDelay(i),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[0.88]"
                  style={{
                    transformOrigin: "50% 100%",
                    textShadow:
                      "0 2px 24px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.4)",
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
              delay: titleDelay(words.length),
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-lg md:text-xl text-white leading-relaxed max-w-2xl mb-10 font-medium"
          >
            {post.excerpt}
          </motion.p>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: titleDelay(words.length) + 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <p className="text-xs text-white/60">{post.authorRole}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25">
          Scroll
        </span>
        {/* Mouse outline */}
        <svg
          width="18"
          height="26"
          viewBox="0 0 18 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/25"
        >
          <rect
            x="1"
            y="1"
            width="16"
            height="24"
            rx="8"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Scrolling dot */}
          <motion.rect
            x="7.5"
            y="5"
            width="3"
            height="5"
            rx="1.5"
            fill="currentColor"
            animate={{ y: [5, 11, 5], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
