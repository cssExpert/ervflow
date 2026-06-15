"use client";

import { useState } from "react";
import { Tag, Mail, CheckCircle2 } from "lucide-react";

import type { Post } from "@/lib/blog-types";

function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div
      className="rounded-2xl p-8 bg-slate-100 dark:bg-white/7.5 border border-black/8 dark:border-white/8 text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.033) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.033) 1px, transparent 1px)",
        backgroundSize: "1.5vw 1.5vw",
      }}
    >
      <div className="inline-flex items-center gap-1.5 bg-primary-500/20 border border-black/10 text-primary-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
        <Mail size={11} aria-hidden="true" /> ERVFlow Newsletter
      </div>
      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-2">
        Stay ahead of the curve
      </p>
      <p className="text-sm text-neutral-700 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
        Deep-dives on Next.js, AI, TypeScript, and DevOps — straight to your
        inbox.
      </p>
      {sent ? (
        <p className="flex items-center gap-2 text-sm font-semibold text-white">
          <CheckCircle2 size={18} aria-hidden="true" />
          You&apos;re on the list — thanks for subscribing!
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
          className="mx-auto max-w-2xl flex flex-col sm:flex-row gap-2 sm:gap-0 sm:bg-white sm:rounded-sm p-1.5 md:p-2 border border-black/10"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Type your email address..."
            className="grow px-5 py-2.5 text-md text-zinc-800 placeholder:text-zinc-500 bg-white rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ring-0!"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2.5 md:py-3.5 md:px-8 text-sm md:text-base font-bold text-white bg-zinc-900 hover:bg-primary shadow-md rounded-sm transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Subscribe Free
          </button>
        </form>
      )}
    </div>
  );
}

export default function ArticleFooter({
  post,
}: {
  post: Post;
  related: Post[];
}) {
  return (
    <div className="px-6 pb-20 border-t border-black/8 dark:border-white/8">
      <div className="max-w-4xl mx-auto pt-8 space-y-12">
        {/* Tags + Share */}
        <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Tag
              size={13}
              className="text-zinc-400 dark:text-neutral-500"
              aria-hidden="true"
            />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-black/4 dark:bg-white/5 border border-black/8 dark:border-white/8 text-zinc-600 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <NewsletterBlock />
      </div>
    </div>
  );
}
