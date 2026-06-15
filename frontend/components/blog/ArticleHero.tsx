"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, X, Share2 } from "lucide-react";
import type { Post } from "@/lib/blog-types";
import Icon from "@/components/common/Icon";

export default function ArticleHero({ post }: { post: Post }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  //
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax — image drifts up as you scroll past it
  const imgY = useTransform(scrollYProgress, [0, 1], ["-26%", "26%"]);
  const blurValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(6px)"],
  );

  const words = post.title.split(" ");
  const half = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(" ");
  const line2 = words.slice(half).join(" ");

  return (
    <section className="w-full pt-36 md:pt-44">
      {/* ── Text block ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 pb-12">
        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-2.5">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border"
                style={{
                  color: post.artColor,
                  borderColor: `${post.glow}60`,
                  background: `${post.glow}12`,
                }}
              >
                {post.category}
              </span>
              <span className="text-zinc-400 dark:text-zinc-600 text-xs">
                &bull;
              </span>
              <span className="text-xs md:text-sm text-zinc-800 dark:text-neutral-500 flex items-center gap-1">
                <Calendar size={14} aria-hidden="true" />
                {post.date}
              </span>
            </div>
            <span className="hidden md:inline-flex text-xs md:text-sm text-zinc-600 dark:text-neutral-500 items-center gap-1.5 border-l pl-2">
              <Clock size={14} aria-hidden="true" />
              {post.readTime} read
            </span>
          </div>
          {/* Share Block — trigger stays in DOM; pill overlays absolutely (no layout shift) */}
          <div className="relative w-10 h-10 shrink-0">
            {/* Trigger button — always rendered, fades out when pill is open */}
            <button
              onClick={() => setShareOpen(true)}
              aria-label="Share article"
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 cursor-pointer ${
                shareOpen
                  ? "opacity-0 pointer-events-none scale-75"
                  : "opacity-100 scale-100"
              }`}
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Pill — absolute so it never affects layout */}
            <AnimatePresence>
              {shareOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, x: 12 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: 12 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-0.5 bg-zinc-900 rounded-full px-2.5 py-1 shadow-xl z-20 whitespace-nowrap"
                >
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    <Icon name="TwitterX" size="16" className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    <Icon name="LinkedIn" size="16" className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    <Icon name="Facebook" size="16" className="w-4 h-4" />
                  </a>
                  <div className="w-px h-4 bg-zinc-700 mx-1 shrink-0" />
                  <button
                    onClick={() => setShareOpen(false)}
                    aria-label="Close share menu"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-500 hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Top rule */}
        <div className="h-px bg-zinc-100 dark:bg-white/6 mb-10" />

        {/* ── Giant title ── */}
        <div className="mb-10 overflow-hidden">
          {[line1, line2].filter(Boolean).map((line, li) => (
            <div key={li} className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.1 + li * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white leading-[1.15] tracking-[-0.035em] block"
                // style={{ fontSize: "clamp(2.8rem, 5vw, 7rem)" }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* ── Excerpt + author ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end gap-8 pt-8 border-t border-zinc-100 dark:border-white/6 justify-between"
        >
          <p className="flex-1 text-base md:text-lg text-zinc-700 dark:text-neutral-400 leading-relaxed max-w-lg">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 shrink-0 sm:pb-0.5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-black shrink-0"
              style={{
                background: `${post.glow}20`,
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
              <p className="text-sm font-bold text-zinc-800 dark:text-white">
                {post.author}
              </p>
              <p className="text-xs md:text-sm text-zinc-400 dark:text-neutral-500">
                {post.authorRole}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Full-bleed image — clean, no overlays ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        ref={imgRef}
        className="relative w-full max-w-7xl rounded-0 lg:rounded-2xl mx-auto overflow-hidden aspect-4/3 lg:aspect-21/9"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: imgY,
            scale: 1.08,
            transformOrigin: "center center",
            filter: blurValue,
            willChange: "filter, transform", // Tells the browser to prep for these changes
          }}
        >
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              className="object-cover aspect-4/3 lg:aspect-21/9"
              sizes="100vw"
            />
          ) : (
            <div className={`w-full h-full bg-linear-to-br ${post.gradient}`} />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
