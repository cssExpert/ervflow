"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleHero from "@/components/blog/ArticleHero";
import ArticleContent from "@/components/blog/ArticleContent";
import ArticleSidebar from "@/components/blog/ArticleSidebar";
import ArticleFooter from "@/components/blog/ArticleFooter";
import { POSTS } from "@/lib/blog-data";
import type { Post } from "@/lib/blog-types";

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
}

function useScrollPast(threshold: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const fn = () => setPast(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return past;
}

export default function BlogPostClient({ post }: { post: Post }) {
  const progress = useReadingProgress();
  const showNav = useScrollPast(420);
  const related = POSTS.filter((p) =>
    post.relatedIds ? post.relatedIds.includes(p.id) : p.id !== post.id,
  ).slice(0, 3);

  return (
    <main className="relative bg-white dark:bg-[#080808] text-black dark:text-white">
      {/* Reading progress — colour-matched glowing rule */}
      <div className="fixed top-0 left-0 right-0 h-0.75 z-999999">
        <div
          className="h-full origin-left"
          style={{
            transform: `scaleX(${progress / 100})`,
            background: `linear-gradient(90deg, ${post.glow}, hsl(249 90% 65%))`,
            boxShadow: `0 0 10px ${post.glow}, 0 0 2px ${post.glow}`,
          }}
        />
      </div>

      {/* Floating back button */}
      <motion.div
        initial={false}
        animate={
          showNav
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: -10, pointerEvents: "none" }
        }
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed top-5 left-5 z-40"
      >
        <Link
          href="/blog"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          All Articles
        </Link>
      </motion.div>

      {/* Cinematic full-viewport hero — always dark */}
      <ArticleHero post={post} />

      {/* Bridge: hero #0A0A0B → body bg */}
      <div
        aria-hidden="true"
        className="h-28 -mt-28 relative z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #0A0A0B, var(--bridge-end, #fff))",
        }}
      >
        <style>{`
          :root { --bridge-end: #ffffff; }
          .dark { --bridge-end: #080808; }
        `}</style>
      </div>

      {/* Article body + sticky sidebar */}
      <div className="px-6 sm:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-12 xl:gap-20">
            <article className="w-full flex-1 min-w-0">
              <ArticleContent sections={post.sections} />
            </article>
            <aside className="hidden xl:block w-68 shrink-0 self-start sticky top-28">
              <ArticleSidebar post={post} />
            </aside>
          </div>
        </div>
      </div>

      <ArticleFooter post={post} related={related} />
    </main>
  );
}
