"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { m } from "framer-motion";
import { X, Clock, Calendar, Tag } from "lucide-react";
import type { Post, PostSection } from "@/lib/blog-data";

function renderSection(s: PostSection, i: number) {
  if (s.type === "h2")
    return (
      <h2
        key={i}
        className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white mt-8 mb-3"
      >
        {s.text}
      </h2>
    );
  if (s.type === "h3")
    return (
      <h3
        key={i}
        className="text-base font-semibold text-zinc-700 dark:text-neutral-200 mt-6 mb-2"
      >
        {s.text}
      </h3>
    );
  if (s.type === "p")
    return (
      <p
        key={i}
        className="text-zinc-600 dark:text-neutral-300 leading-relaxed mb-4"
      >
        {s.text}
      </p>
    );
  if (s.type === "quote")
    return (
      <blockquote
        key={i}
        className="border-l-[3px] border-primary-500/60 pl-4 my-5 italic text-zinc-600 dark:text-neutral-400"
      >
        {s.text}
      </blockquote>
    );
  if (s.type === "code")
    return (
      <pre
        key={i}
        className="bg-zinc-100 dark:bg-white/4 border border-black/8 dark:border-white/8 rounded-2xl p-4 my-5 overflow-x-auto text-sm font-mono text-zinc-800 dark:text-neutral-200 leading-relaxed whitespace-pre"
      >
        {s.text}
      </pre>
    );
  if (s.type === "ul")
    return (
      <ul key={i} className="list-none space-y-2 mb-5 pl-5">
        {(s.items ?? []).map((item, j) => (
          <li
            key={j}
            className="flex items-start gap-2.5 text-zinc-600 dark:text-neutral-300"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    );
  return null;
}

interface Props {
  post: Post;
  onClose: () => void;
}

export default function BlogExpanded({ post, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  /* Portaled to <body> so the sticky header's stacking context (z-9999)
     and the page wrapper's own z-index can't sit above the modal */
  return createPortal(
    <>
      {/* Backdrop */}
      <m.div
        className="fixed inset-0 z-99998 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Expanded card shell — uses same layoutId as grid card */}
      <m.div
        layoutId={`blog-card-${post.id}`}
        className="fixed z-99999"
        style={{ inset: "16px", borderRadius: 28 }}
        initial={false}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
      >
        <div
          className="absolute inset-0 flex flex-col overflow-hidden bg-white dark:bg-[#0a0a0a] border border-black/8 dark:border-white/8 shadow-2xl"
          style={{ borderRadius: 28 }}
        >
          {/* Top accent line */}
          <m.div
            layoutId={`blog-header-${post.id}`}
            className="h-0.75 w-full shrink-0"
            style={{
              background: `linear-gradient(90deg, ${post.glow}, transparent)`,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          />

          {/* Header bar */}
          <div className="shrink-0 px-6 sm:px-8 pt-6 pb-5 border-b border-black/6 dark:border-white/6">
            <div className="flex items-start justify-between gap-4 max-w-2xl mx-auto">
              <div className="space-y-2 flex-1">
                {/* Category */}
                <m.span
                  layoutId={`blog-badge-${post.id}`}
                  className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full border ${post.categoryBg} ${post.categoryText}`}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                >
                  {post.category}
                </m.span>
                {/* Title */}
                <m.h1
                  layoutId={`blog-title-${post.id}`}
                  className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-zinc-800 dark:text-white"
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                >
                  {post.title}
                </m.h1>
                {/* Meta */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-neutral-500 pt-1"
                >
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readTime} read
                  </span>
                  <span>&bull;</span>
                  <span className="font-medium text-zinc-700 dark:text-neutral-300">
                    {post.author}
                  </span>
                  <span>&bull;</span>
                  <span className="text-zinc-400 dark:text-neutral-600">
                    {post.authorRole}
                  </span>
                </m.div>
              </div>
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close article"
                className="absolute right-10 shrink-0 w-9 h-9 rounded-full border border-black/8 dark:border-white/8 bg-black/4 dark:bg-white/5 hover:bg-black/8 dark:hover:bg-white/10 text-zinc-600 dark:text-neutral-400 flex items-center justify-center transition-colors mt-0.5"
              >
                <X size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-6 sm:px-0 pt-8">
              {/* Excerpt */}
              <m.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="text-base text-zinc-700 dark:text-neutral-200 leading-relaxed font-medium mb-8"
              >
                {post.excerpt}
              </m.p>

              {/* Sections */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.24 }}
              >
                {post.sections.map(renderSection)}
              </m.div>

              {/* Tags */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                className="sticky bottom-0 flex flex-wrap gap-2 mt-10 py-4 border-t border-black/6 dark:border-white/6 bg-white/30 dark:bg-[#0a0a0a]/50 backdrop-blur-md"
              >
                <Tag
                  size={13}
                  className="text-zinc-400 dark:text-neutral-500 mt-0.5"
                />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-black/4 dark:bg-white/5 border border-black/8 dark:border-white/8 text-zinc-600 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </m.div>
            </div>
          </div>
        </div>
      </m.div>
    </>,
    document.body,
  );
}
