"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Mail, ChevronRight, User } from "lucide-react";
import type { Post, PostSection } from "@/lib/blog-types";
import { slugify } from "./ArticleContent";

function buildTOC(sections: PostSection[]) {
  return sections
    .filter((s) => s.type === "h2" || s.type === "h3")
    .map((s) => ({
      text: s.text,
      id: slugify(s.text),
      level: s.type === "h2" ? 2 : 3,
    }));
}

function TOC({ sections }: { sections: PostSection[] }) {
  const toc = useMemo(() => buildTOC(sections), [sections]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: "-18% 0px -70% 0px", threshold: 0 },
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  if (!toc.length) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/6 bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none p-5 overflow-hidden">
      <div className="flex items-center gap-2 mb-5">
        <BookOpen
          size={16}
          className="text-zinc-500 dark:text-neutral-500"
          aria-hidden="true"
        />
        <p className="text-sm font-bold uppercase tracking-[0.05rem] text-zinc-500 dark:text-neutral-500">
          Contents
        </p>
      </div>
      <nav aria-label="Table of contents">
        <ul className="space-y-0.5">
          {toc.map(({ text, id, level }) => {
            const isActive = activeId === id;
            return (
              <li
                key={id}
                className="relative flex items-center"
                style={{ paddingLeft: level === 3 ? "0.75rem" : 0 }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="toc-pill"
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-primary-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
                <a
                  href={`#${id}`}
                  className={`block text-xs md:text-sm py-1.5 pl-3 leading-snug transition-all duration-200 cursor-pointer rounded-sm ${
                    isActive
                      ? "text-primary-600 dark:text-primary-400 font-semibold"
                      : "text-zinc-500 dark:text-neutral-500 hover:text-zinc-800 dark:hover:text-neutral-200"
                  }`}
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function AuthorCard({ post }: { post: Post }) {
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/6 bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none p-5">
      <div className="flex items-center gap-2 mb-4">
        <User
          size={16}
          className="text-zinc-500 dark:text-neutral-500"
          aria-hidden="true"
        />
        <p className="text-sm font-bold uppercase tracking-[0.05rem] text-zinc-500 dark:text-neutral-500">
          Author
        </p>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full ring-2 ring-primary-500/20 bg-primary-500/10 flex items-center justify-center text-primary-700 dark:text-primary-400 font-black text-sm flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-zinc-800 dark:text-white">
            {post.author}
          </p>
          <p className="text-xs text-zinc-500 dark:text-neutral-500">
            {post.authorRole}
          </p>
        </div>
      </div>
      {post.bio && (
        <p className="text-xs md:text-sm text-zinc-500 dark:text-neutral-500 leading-relaxed">
          {post.bio}
        </p>
      )}
    </div>
  );
}

function CTAWidget() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 bg-zinc-900 dark:bg-black border border-white/8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-primary-600/25 to-indigo-700/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary-500/20 blur-2xl"
      />
      <div className="relative">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles size={16} className="text-primary-400" aria-hidden="true" />
          <p className="text-sm font-bold uppercase tracking-[0.05rem] text-primary-400">
            ERVFlow
          </p>
        </div>
        <p className="text-sm font-bold text-white leading-snug mb-4">
          Generate your first website in seconds
        </p>
        <div className="space-y-2">
          <Link
            href="/signup"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white text-zinc-900 font-bold text-xs hover:bg-white/90 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Try ERVFlow Free <ChevronRight size={12} aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs border border-white/15 hover:bg-white/18 transition-colors cursor-pointer"
          >
            Book a Demo <ChevronRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function NewsletterWidget() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/6 bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none p-5">
      <div className="flex items-center gap-2 mb-3">
        <Mail size={16} className="text-primary-500" aria-hidden="true" />
        <p className="text-sm font-bold uppercase tracking-[0.05rem] text-zinc-500 dark:text-neutral-500">
          Newsletter
        </p>
      </div>
      <p className="text-sm font-bold text-zinc-800 dark:text-white mb-1">
        Get articles like this
      </p>
      <p className="text-xs text-zinc-500 dark:text-neutral-500 mb-4 leading-relaxed">
        No spam, unsubscribe anytime.
      </p>
      {sent ? (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
          You&apos;re in — check your inbox!
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
          className="space-y-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-3 py-2 text-xs rounded-sm bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 text-zinc-800 dark:text-white placeholder-zinc-400 outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-sm bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 transition-colors cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

export default function ArticleSidebar({ post }: { post: Post }) {
  return (
    <div className="space-y-4">
      <TOC sections={post.sections} />
      <AuthorCard post={post} />
      <CTAWidget />
      <NewsletterWidget />
    </div>
  );
}
