"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Zap } from "lucide-react";
import { POSTS } from "@/lib/blog-data";
import PostCard, { type PostCardVariant } from "@/components/blog/PostCard";
import NewsletterBanner from "@/components/blog/NewsletterBanner";
import BlogExpanded from "@/components/blog/BlogExpanded";
import GlowBlob from "@/components/common/GlowBlob";

const ALL_CATS = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

/* Shuffle-style slots: 1 featured, 2 half-width, rest one-third */
function variantFor(index: number): PostCardVariant {
  if (index === 0) return "featured";
  if (index <= 2) return "half";
  return "third";
}

export default function BlogPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const halves = filtered.slice(1, 3);
  const thirds = filtered.slice(3);

  const selectedPost = POSTS.find((p) => p.id === selectedId) ?? null;

  return (
    <main className="min-h-screen relative bg-[#F6FAFF] dark:bg-black text-black dark:text-white z-2">
      {/* Background glows */}
      <GlowBlob />

      {/* ── Header ────────────────────────────────────────────────── */}
      <section className="pt-40 md:pt-50 pb-12 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-700 dark:text-primary-300 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest"
          >
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            ERVFlow Blog · Ideas &amp; Insights
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-800 dark:text-white"
          >
            Built for{" "}
            <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
              Builders
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-10 text-lg text-slate-800 dark:text-neutral-300"
          >
            Deep dives into Next.js, TypeScript, AI integration, and modern
            DevOps — straight from the team building ERVFlow.
          </motion.p>
        </div>
      </section>

      {/* ── Posts ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-28">
        <LayoutGroup>
          <div className="max-w-6xl mx-auto">
            {/* Featured + half-width row */}
            <AnimatePresence mode="popLayout">
              {featured && (
                <div key={`featured-${featured.id}`} className="mb-8">
                  <PostCard
                    post={featured}
                    index={0}
                    variant="featured"
                    onSelect={setSelectedId}
                  />
                </div>
              )}
            </AnimatePresence>

            {halves.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <AnimatePresence mode="popLayout">
                  {halves.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={i + 1}
                      variant={variantFor(i + 1)}
                      onSelect={setSelectedId}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Newsletter CTA — mid-list, like Shuffle */}
            <div className="mb-8">
              <NewsletterBanner />
            </div>

            {/* One-third cards */}
            {thirds.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {thirds.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={i + 3}
                      variant={variantFor(i + 3)}
                      onSelect={setSelectedId}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <AnimatePresence>
            {selectedPost && (
              <BlogExpanded
                post={selectedPost}
                onClose={() => setSelectedId(null)}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </section>
    </main>
  );
}
