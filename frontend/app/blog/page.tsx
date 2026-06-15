"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Zap, Search, X } from "lucide-react";
import { POSTS } from "@/lib/blog-data";
import PostCard, { type PostCardVariant } from "@/components/blog/PostCard";
import NewsletterBanner from "@/components/blog/NewsletterBanner";
import GlowBlob from "@/components/common/GlowBlob";

const CATEGORIES = [
  "All",
  ...Array.from(new Set(POSTS.map((p) => p.category))),
];

function variantFor(index: number): PostCardVariant {
  if (index === 0) return "featured";
  if (index <= 2) return "half";
  return "third";
}

export default function BlogPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let posts =
      activeCategory === "All"
        ? POSTS
        : POSTS.filter((p) => p.category === activeCategory);
    const q = search.trim().toLowerCase();
    if (q) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return posts;
  }, [activeCategory, search]);

  const featured = filtered[0];
  const halves = filtered.slice(1, 3);
  const thirds = filtered.slice(3);
  const selectedPost = POSTS.find((p) => p.id === selectedId) ?? null;

  return (
    <main className="min-h-screen relative bg-[#F6FAFF] dark:bg-black text-black dark:text-white z-2">
      <GlowBlob />

      {/* Header */}
      <section className="pt-40 md:pt-50 pb-12 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-[11px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-2"
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
            className="mb-6 text-lg text-slate-800 dark:text-neutral-300"
          >
            Deep dives into Next.js, TypeScript, AI integration, and modern
            DevOps — straight from the team building ERVFlow.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="relative max-w-md mx-auto"
          >
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, topics, tags…"
              className="w-full pl-10 pr-9 py-3 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-zinc-700 dark:text-neutral-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 shadow-xs"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="flex flex-wrap justify-center gap-2 pt-1"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary-500 text-white shadow-sm"
                    : "bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-neutral-300 hover:border-primary-500/40 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="px-4 sm:px-6 pb-28">
        <LayoutGroup>
          <div className="max-w-6xl mx-auto">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 text-zinc-400 dark:text-neutral-500"
              >
                <p className="text-lg font-semibold mb-2">No articles found</p>
                <p className="text-sm">
                  Try a different search term or category
                </p>
              </motion.div>
            ) : (
              <>
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

                <div className="mb-8">
                  <NewsletterBanner />
                </div>

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
              </>
            )}
          </div>
        </LayoutGroup>
      </section>
    </main>
  );
}
